import { useReducer } from 'react';
import { DigitButton } from './DigitButton';
import { OperationButton } from './OperationButton';
import { ClearButton } from './ClearButton';
import { DeleteButton } from './DeleteButton';
import { EvaluateButton } from './EvaluateButton';
// 此题其实着重于对模块的划分 以及useReducer的使用

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}

function reducer(state, {type, payload}) {
  switch(type) {
    case ACTIONS.ADD_DIGIT: 
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: ''
        }
      }
      if (payload.digit === '0' && state.currentOperand === "0") return state; 
      if (payload.digit === '.' && state.currentOperand?.includes('.')) return state;  // 这里的includes 方法挺有意思的
      return {
        ...state,  // state 代表了对象{currentOperand, previousOperand, operation}
        currentOperand: `${state.currentOperand || ''}${payload.digit}`
      }
    case ACTIONS.CHOOSE_OPERATION:
      if (!state.currentOperand) return {}
      return {
        ...state,
        operation: `${payload.operation}`,
        previousOperand: state.currentOperand,
        currentOperand: ''
      }
    case ACTIONS.CLEAR:
      return {}
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: ''
        }
      }
      return {
        ...state,
        currentOperand: state.currentOperand.substr(0, state.currentOperand.length - 1)
      }
    case ACTIONS.EVALUATE: {
      return {
        ...state,
        overwrite: true,
        previousOperand: '',
        operation: '',
        currentOperand: evaluateFunc(state.currentOperand, state.previousOperand, state.operation)
      }
    }
  }
}

function evaluateFunc(currentOperand, previousOperand, operation) {
  const current = parseFloat(currentOperand);   /* 将字符串解析为小数 */
  const prev = parseFloat(previousOperand);
  let computation = '';
  switch(operation) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '*':
      computation = prev * current;
      break;
    case '%':
      computation = prev / current;
      break;
  }
  return computation.toString();
}

// const INTEGER_FORMATTER = new Int1.NumberFormat("zh-cn", {  // Int1.NumberFormat用法有待研究
//   maximumSignificantDigits: 0
// })
// function formatOperand(operand) {
//   if (operand === '') return;
//   const [integer, decimal] = operand.split('.')


// }


function App() {

  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {});

  return (
    // 这里非常考验对于grid的操作
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{previousOperand} {operation}</div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <ClearButton dispatch={dispatch} clear="AC"/>   {/* AC 全称：All Clear */}
      <DeleteButton dispatch={dispatch} del="DEL"/>
      <OperationButton dispatch={dispatch} operation="%"/>
      <DigitButton dispatch={dispatch} digit="1"/>
      <DigitButton dispatch={dispatch} digit="2"/>
      <DigitButton dispatch={dispatch} digit="3"/>
      <OperationButton dispatch={dispatch} operation="*"/>
      <DigitButton dispatch={dispatch} digit="4"/>
      <DigitButton dispatch={dispatch} digit="5"/>
      <DigitButton dispatch={dispatch} digit="6"/>
      <OperationButton dispatch={dispatch} operation="+"/>
      <DigitButton dispatch={dispatch} digit="7"/>
      <DigitButton dispatch={dispatch} digit="8"/>
      <DigitButton dispatch={dispatch} digit="9"/>
      <OperationButton dispatch={dispatch} operation="-"/>
      <DigitButton dispatch={dispatch} digit="."/>
      <DigitButton dispatch={dispatch} digit="0"/>
      <EvaluateButton dispatch={dispatch} evaluate="=" />
    </div>
  );
}

export default App;
