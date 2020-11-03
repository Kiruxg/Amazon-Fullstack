import React, { useRef, useState, useEffect } from "react"
import CurrencyFormat from "react-currency-format"
import "./Payment.css"
import { useStateValue } from "./StateProvider"
import CheckoutProduct from "./CheckoutProduct"
import { Link, useHistory } from "react-router-dom"
import { getBasketTotal } from "./reducer"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import Axios from "./axios"
import { db } from "./firebase"

function Payment() {
  const [{ user, basket }, dispatch] = useStateValue()
  const history = useHistory()

  const [error, setError] = useState(null)
  const [disabled, setDisabled] = useState(true)
  const [processing, setProcessing] = useState(null)
  const [succeeded, setSucceeded] = useState(null)

  const stripe = useStripe()
  const elements = useElements()
  const [clientSecret, setClientSecret] = useState()

  useEffect(() => {
    //generate stripe secret allowing us to charge customer
    //create new key for every new basket
    const getClientSecret = async () => {
      const response = await Axios({
        method: "post",
        //Stripe expects the total in a currency's subunit (cents)
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`
      })
      setClientSecret(response.data.clientSecret)
    }
    getClientSecret()
  }, [basket])

  const handleChange = event => {
    setDisabled(event.empty)
    setError(event.error ? event.error.message : "")
  }
  const handleSubmit = async event => {
    event.preventDefault()
    if (user && user.basket.length) {
      setProcessing(true) //only click button once
      console.log("IN HERE")
      const payload = await stripe
        .confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement)
          }
        })
        .then(({ paymentIntent }) => {
          //paymentIntent == payment confirmation
          setSucceeded(true)
          setError(null)
          setProcessing(false)

          //push to db
          db.collection("users").doc(user?.token.uid).collection("orders").doc(paymentIntent.id).set({
            basket: user.basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created
          })

          dispatch({
            type: "EMPTY_BASKET"
          })
          //no push to prevent coming back to payment page
          //swap payment page with orders page
          history.replace("/orders")
        })
    } else if (!user) {
      alert("Please sign in to checkout.")
    } else if (!basket.length) {
      alert("Please add items to the basket before checkout.")
    }
  }
  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (
          <Link to="/checkout">
            {basket?.length} {basket?.length > 1 || !basket?.length ? "items" : "item"}
          </Link>
          )
        </h1>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map(item => (
              <CheckoutProduct key={item.id} id={item.id} title={item.title} image={item.image} price={item.price} rating={item.rating} />
            ))}
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={value => (
                    <>
                      <h3>Order Total: {value}</h3>
                    </>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {/*Errors*/}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
