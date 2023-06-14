import { validateKeyClick } from "./tools/validations.js";
import appendCharacter from "./tools/custom-keys.js";
import copyResultToClipboard from "./tools/copy-result.js";

// this adds the onkeydown event and evaluates the keys that gets pressed
$(".calc__input input").on("keydown", (event) => 
  validateKeyClick(event)
);

// this adds compability to use the designed buttons
$(".calc__buttons button").on("click", (event) =>
  appendCharacter(event.target.id)
);

// copy result to clipboard for usage
$('.calc__copy-result').on('click', copyResultToClipboard);