import { ACTIONS } from './App';
import React from 'react'

export function DeleteButton({dispatch, del}) {
  return (
    <button 
      // 这里的() => something something 加不加大括号应该都无所谓
      onClick={() => {
        dispatch({type: ACTIONS.DELETE_DIGIT})
      }}
    >
      {del}
    </button>
  )
}
