import React, { useEffect } from "react"
import "./App.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Header from "./Header"
import Home from "./Home"
import Checkout from "./Checkout"
import Login from "./Login"
import Orders from "./Orders"
import { useStateValue } from "./StateProvider"
import { auth } from "./firebase"
import Payment from "./Payment"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"

const promise = loadStripe("pk_test_51HQ5UXAOBzJpPKFIV5gh2vq1C6VJeVnXsCisgeiIp9WTZHarHSxiw5c78cvPGnHOKnIUTDQasR584uty4oEiNDhq00KkCHtBgH")

function App() {
  const [{}, dispatch] = useStateValue()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        //user is logged in

        localStorage.setItem("amazonToken", JSON.stringify(authUser))
        localStorage.setItem("emailToken", authUser.email)
        // localStorage.setItem("basketToken", JSON.stringify([]))

        dispatch({
          type: "SET_USER",
          user: {
            token: JSON.parse(localStorage.getItem("amazonToken")),
            email: localStorage.getItem("emailToken"),
            basket: JSON.parse(localStorage.getItem("basketToken"))
          }
        })
      } else {
        //user is logged out
        localStorage.removeItem("amazonToken")
        localStorage.removeItem("emailToken")
        dispatch({
          type: "SET_USER",
          user: null
        })
      }
    })
    return () => {
      unsubscribe() //detach listener
    }
  }, [])
  //BEM naming convention
  return (
    <Router>
      {/**initialize react router, powers up children components for csr */}
      <div className="app">
        <Switch>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            {/**Default path, incase of no matching route */}
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
