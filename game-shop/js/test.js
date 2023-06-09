// Run this code here, in a console or from any site:
//  fetch('https://jsonplaceholder.typicode.com/todos/1')
//       .then(response => response.json())
//       .then(json => response = json);

// setTimeout( () => console.log(response), 1000 )

async function getData(){
  let response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  let json = await response.json();
  console.log(json);
}
getData();