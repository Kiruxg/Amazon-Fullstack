export const initialState = {
  // user: null,
  basket: JSON.parse(localStorage.getItem("basketToken")) || [],
  user: {
    token: JSON.parse(localStorage.getItem("amazonToken")),
    email: localStorage.getItem("emailToken")
  }
}
export const getBasketTotal = basket =>
  //iterates through basket, tallys up prices to initial amount
  basket?.reduce((amount, item) => item.price + amount, 0)

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user
      }
    case "ADD_TO_BASKET":
      //Logic for adding item to basket
      let updateBasket = [...state.basket, action.item]
      localStorage.setItem("basketToken", JSON.stringify(updateBasket))
      return {
        /*immutable update, return what new data layer looks like */
          ...state,
          basket: JSON.parse(localStorage.getItem("basketToken"))
        }
    case "REMOVE_FROM_BASKET":
      //filter method REMOVES everything if quantity is more than 1
      //cloned using destructuring
      let newBasket = [...state.basket]

      //find index of item to be removed
      const index = state.basket.findIndex(basketItem => basketItem.id === action.id)
      if (index >= 0) {
        //item exists in basket, remove it...
        newBasket.splice(index, 1)
      } else {
        console.warn(`Unable to remove product (id: ${action.id}) as it is not available in the shopping cart.`)
      }
      localStorage.setItem("basketToken", JSON.stringify(newBasket))
      return {
        ...state,
        basket: JSON.parse(localStorage.getItem("basketToken"))
      }
    case "EMPTY_BASKET":
      localStorage.removeItem("emailToken")
      return {
        ...state,
        basket: []
      }
    default:
      return state //No action, simply return state
  }
}
export default reducer
