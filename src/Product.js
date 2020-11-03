import React from "react"
import "./Product.css"
import { useStateValue } from "./StateProvider"

function Product({ id, title, image, price, rating }) {
  //es6 destructuring
  const [{ basket }, dispatch] = useStateValue()

  const addToBasket = () => {
    //Add item to basket
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id,
        title,
        image,
        price,
        rating
      }
    })
  }
  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {/**create an array, map each slot to a star */}
          {Array(rating)
            .fill()
            .map((_, key) => (
              <span key={key} role="img" aria-label="star-rating">
                ⭐
              </span>
            ))}
        </div>
      </div>

      <img src={image} alt="" />
      <button onClick={addToBasket}>Add to basket</button>
    </div>
  )
}

export default Product
