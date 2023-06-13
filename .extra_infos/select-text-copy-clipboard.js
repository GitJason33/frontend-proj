// select text within an input element
function selectText(element, limit){
  element.select();
  element.setSelectionRange(0, limit);
}


// copy to clipboard function
function copyToClipboard() {
  // Get the text field
  var copyText = document.querySelector("input");

  // Select the text field
  selectText(copyText, 99999);

  // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.value);

  // Alert the copied text
  alert("Copied the text: " + copyText.value);
}