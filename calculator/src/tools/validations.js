import { LEGAL_KEYS, OPERATORS } from "./rules.js";
import calculate from "./calculations.js";

function isValidCharacter(pressedButton, keys = LEGAL_KEYS) {
  let len = keys.length;

  for(let i = 0; i < len; i++)
    if(pressedButton === keys[i])
      return true;
    
  return false;
}


function isValidOperation(pressedButton) {
  let equation = $('.calc__input input').val();
  let equLen = equation.length;

  // example1: *124..., /1...
  // example2: ...23++, ...88-/
  // example3: ...33+44- then =
  if (
    equLen === 0 && isOperator(pressedButton) ||
    isOperator(equation[equLen - 1]) && isOperator(pressedButton) ||
    pressedButton === "=" && isOperator(equation[equLen - 1])
  ) return false;

  return true;
}


function isOperator(pressedButton, operators = OPERATORS) {
  return operators.includes(pressedButton);
}


function validateKeyClick(event){
  let key = event.key;

  if (!isValidCharacter(key) || !isValidOperation(key)) 
    event.preventDefault();

  if (key === "=" || key === "Enter") calculate();
}


function hasSyntaxError(equation){
  /* 
  should not have: 
    -> other than operators and numbers,
    -> 2 operators next to each other, 
    -> leading or trailing operator 
  */
  // this checks for 2 operators in a row
  let len = equation.length;
  for(let i = 0; i < len - 1; i++)
    if(isOperator(equation[i]) && isOperator(equation[i+1]))
      return true;

  // this checks: leading/trailing operators and for any letter
  return isOperator(equation[len - 1]) 
      || isOperator(equation[0]) 
      || /[a-z]+/i.test(equation);
}


export { 
  isValidCharacter, 
  isValidOperation,
  isOperator, 
  validateKeyClick, 
  hasSyntaxError 
};