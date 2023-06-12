// this adds the onkeydown event and evaluates the keys that gets pressed
$(".calc__input input").on("keydown", (event) => {
  let key = event.key;

  if (!isValidCharacter(key) || !isValidOperation(key)) event.preventDefault();

  if (key === "=" || key === "Enter") calculate();
});

// this adds compability to use the designed buttons
$(".calc__buttons button").on("click", (event) =>
  appendCharacter(event.target.id)
);

function calculate() {
  let equation = $(".calc__input input").val();
  let len = equation.length;
  let result, ops = evalEquation(equation);

  if (equation === "") 
    result = 0;

  else if (ops.operands.length === 1) 
    result = equation;
  
  else if(isOperator(equation[len - 1]) || isOperator(equation[0]))
    result = 'Syntax Error';
  
  else 
    result = calculatePrecedence(ops);

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
    // if(replacementResult === Infinity){ 
    //   operands = [Infinity];
    //   operators = [];
    //   return;
    // }

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

// this adds characters into the equation using
function appendCharacter(buttonId) {
  let input = $(".calc__input input");

  // temporarily
  if(['Ans', '.', '%'].includes(buttonId)) return;

  if (buttonId === "del") {
    button_del();
  } else if (buttonId === "clr") {
    button_ac();
  } else if(buttonId === "="){
    calculate();
  } else {
    if (input.val().length <= 200 && isValidOperation(buttonId))
      input.val(input.val() + buttonId);
  }
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

function isValidCharacter(pressedButton) {
  if (/\d+/.test(pressedButton)) return true;

  switch (pressedButton) {
    case "ArrowUp":
    case "ArrowDown":
    case "ArrowLeft":
    case "ArrowRight":
    case "x":
    case "X":
    case "*":
    case "/":
    case "+":
    case "-":
    // case "a": case "A":
    // case ".":
    // case "^":
    // case "!":
    // case "(": case ")":
    case "Home":
    case "End":
    case "Backspace":
    case "Delete":
      return true;

    default:
      return false;
  }
}

function isValidOperation(pressedButton) {
  let equation = $(".calc__input input").val();
  let equLen = equation.length;

  // example: *124..., /1...
  if (equLen === 0 && isOperator(pressedButton)) 
    return false;

  // example: ...23++, ...88-/
  else if (isOperator(equation[equLen - 1]) && isOperator(pressedButton))
    return false;

  // example: ...33+44- then =
  else if (pressedButton === "=" && isOperator(equation[equLen - 1]))
    return false;

  else return true;
}

// clear all button
function button_ac() {
  $(".calc__input input").val("");
}

// delete 1 char
function button_del() {
  let input = $(".calc__input input");
  let v = input.val();

  if (v.length > 0) input.val(v.slice(0, v.length - 1));
}

function isOperator(char) {
  return ["+", "-", "*", "/"].includes(char);
}
