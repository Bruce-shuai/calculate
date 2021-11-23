import { ACTIONS } from './App';
import React from 'react'

export function EvaluateButton({dispatch, evaluate}) {
  return (
    <button 
      // 这里的() => something something 加不加大括号应该都无所谓
      onClick={() => {
        dispatch({type: ACTIONS.EVALUATE})
      }}
      className="span-2"
    >
      {evaluate}
    </button>
  )
}
