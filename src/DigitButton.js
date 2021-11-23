import { ACTIONS } from './App';
import React from 'react'

export function DigitButton({dispatch, digit}) {
  return (
    <button 
      // 这里的() => something something 加不加大括号应该都无所谓
      onClick={() => {
        dispatch({type: ACTIONS.ADD_DIGIT, payload: { digit }})
      }}
    >
      {digit}
    </button>
  )
}
