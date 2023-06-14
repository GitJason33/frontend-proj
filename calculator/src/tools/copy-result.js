function copyResultToClipboard(){
  let result = $('.calc__input h3').html();
  if(result === '') result = 0;

  // remove the commas made by toLocaleString()
  if(isNaN(result)) result = result.split(',').join('');

  // Copy the text into the clipboard
  navigator.clipboard.writeText(result)
    .then( () => {
      $('.calc__copy-result').html('copied!');
      setTimeout(() => $('.calc__copy-result').html('copy'), 3000);
    });
}

export default copyResultToClipboard;