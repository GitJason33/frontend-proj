// this one is reponsible for the calculator's keyborad
import { isValidOperation } from "./validations.js";
import calculate from "./calculations.js";

// this adds characters into the equation
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
    if (input.val().length <= 200 && isValidOperation(buttonId, input))
      input.val(input.val() + buttonId);
  }
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

export default appendCharacter;