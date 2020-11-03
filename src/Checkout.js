import React from "react"
import "./Checkout.css"
import { useStateValue } from "./StateProvider"
import CheckoutProduct from "./CheckoutProduct"
import Subtotal from "./Subtotal"

function Checkout() {
  const [{ user, basket }] = useStateValue()

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" alt="" className="checkout__ad" />
        {user?.basket?.length === 0 ? (
          <div>
            <h2>Your shopping basket is empty</h2>
            <p>You have no items in your basket. To buy one or more items, click "Add to basket" next to the item.</p>
          </div>
        ) : (
          <div>
            <h2 className="checkout__title">Your shopping basket</h2>
            {basket.map(item => (
              <CheckoutProduct key={item.id} id={item.id} title={item.title} image={item.image} price={item.price} rating={item.rating} />
            ))}
          </div>
        )}
      </div>
      {basket.length > 0 && (
        <div className="checkout__right">
          <Subtotal />
        </div>
      )}
    </div>
  )
}

export default Checkout
