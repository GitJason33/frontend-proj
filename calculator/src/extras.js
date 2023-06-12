function appendCharacter(buttonId){
  let input = $('.calc__input input');

  if( buttonId === 'del' ){
    button_del();
  }else if(buttonId === 'clr'){
    button_ac();
  }else{
    if(input.val().length <= 200){
      if( isValidOperation() ) input.val(input.val() + buttonId);
    }
  }
}
$('.calc__buttons button').on('click', (event) => appendCharacter(event.target.id));
// $(document).on('keyup', (event) => console.log(event.key);


function evalCharacter(buttonId){
  switch(buttonId){
    case '1': case '2': case '3': case '4': case '5': case '6': case '7': case '8': case '9': case '0':
      return buttonId;

    case 'add': return '+';
    case 'sub': return '-';
    case 'mul': return '*';
    case 'div': return '/';

    default: return '';
  }
}