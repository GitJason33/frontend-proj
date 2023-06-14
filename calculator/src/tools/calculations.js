import { hasSyntaxError, isOperator } from "./validations.js";

function calculate() {
  let equation = $(".calc__input input").val();
  let result, ops = evalEquation(equation);

  if (equation === "") 
    result = 0;

  else if (ops.operands.length === 1 && !/[a-z]+/i.test(equation)) 
    result = equation;
  
  else if(hasSyntaxError(equation))
    result = 'Syntax Error';
  
  else 
    result = calculatePrecedence(ops);

  if(!isNaN(result)) 
    $(".calc__input h3").html(parseInt(result).toLocaleString("en-US") );
  else
    $(".calc__input h3").html(result);
}

function evalEquation(equation) {
  // 12 + 4 - 77 * 10 / 543
  let len = equation.length;
  let operands = []; // [ 12, 4, 77, 10, 543 ]
  let operators = []; // [ +, -, *, / ]

  // opIdx will be used to switch onto the next operand and operator
  let opIdx = 0;

  for (let i = 0; i < len; i++) {
    if (!isOperator(equation[i])) {
      // should check if the var is defined to avoid 'undefined12' thingies
      if (operands[opIdx] === undefined) operands[opIdx] = "";

      operands[opIdx] += equation[i];
    } else {
      // trim extra spaces
      operands[opIdx] = operands[opIdx]?.trim();

      operators[opIdx] = equation[i];
      opIdx++;
    }

    if (i === len - 1) operands[opIdx] = operands[opIdx]?.trim(); // trim last's spaces
  }

  return { operands, operators };
}

// starts by chasing down the mul* and div/, when none are left, it calculates the add+ and sub-
// example: ["1", "44", "2"], ["+", "*"] -> ["1", 88], ["+"] -> final result = 89
function calculatePrecedence({ operands, operators }) {
  let i = 0;

  function resultHelper(operands, operators, index) {
    let replacementResult = calculateOperands(
      operands[index],
      operands[index + 1],
      operators[index]
    );

    // delete the 2 operands starting from 'i', replace them with result
    operands.splice(index, 2, replacementResult);

    // delete the operator
    operators.splice(index, 1);
  }

  while (operators.length !== 0) {
    if (operators[i] === "*" || operators[i] === "/") {
      resultHelper(operands, operators, i);
      i = 0; // reset i
    } 
    else if (i === operators.length) {
      // the i bumped into the wall not finding * or /
      while (operators.length !== 0) resultHelper(operands, operators, 0);
    } 
    else i++;
  }
  return operands[0];
}

// example: calculateOperands('12', '8', '+') -> 12 + 8 = 20
function calculateOperands(op1, op2, operator) {
  switch (operator) {
    case "+":
      return parseInt(op1) + parseInt(op2);
    case "-":
      return op1 - op2;
    case "*":
      return op1 * op2;
    case "/":
      return op1 / op2;
    default:
      return -1;
  }
}

export default calculate;