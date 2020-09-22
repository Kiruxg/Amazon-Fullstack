//setup data layer
//Track basket count
import React from "react";
import { createContext, useContext, useReducer } from "react";

//Data layer
export const StateContext = createContext();

//Build a Provider
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);
//To use inside of a component
export const useStateValue = () => useContext(StateContext);
//useStateValue ==> const [state, dispatch]
