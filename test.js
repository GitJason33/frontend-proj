// this file is for selection sort made in 4 versions
// functions that start with underscore '_' are subfunctions,
// not recommended for using alone

// loop way (return void)
function loopSort1(a){
  let len = a.length;
  if(len == 1 || len == 0) return;

  for(let i = 0; i < a.length-1; i++){
    _loopSort2(a, i);
  }
}
function _loopSort2(a, i){
  for(let j = i + 1; j < a.length; j++){
    _selectionSort("a", a, i, j);
  }
}

// recursion way (return void), i is the length
function recursionSort1(a, i) {
  if(i == 0) return;

  let j = i - 1;
  _recursionSort2(a, i, j);
  recursionSort1(a, i - 1);
}
function _recursionSort2(a, i, j){
  if(j == -1) return;

  _selectionSort("d", a, i, j);
  _recursionSort2(a, i, j - 1);
}

// common step
function _selectionSort(order, a, i, j){
  let bool = (order == "a") ? 
              a[i] > a[j] 
            : a[i] < a[j];
  if(bool){
    let t = a[i];
    a[i] = a[j];
    a[j] = t;
  }
}

// loop test
let arr = [4, 2, 3, 1];
console.log("no sort: \t[" + arr + "]");

loopSort1(arr)
console.log("sorted: \t[" + arr + "]\n");

// recursion test
let arr2 = [8, 4, 6, 2];
console.log("no sort: \t[" + arr2 + "]");

recursionSort1(arr2, arr2.length);
console.log("sorted: \t[" + arr2 + "]\n");

// big test:
let arr3 = generateArray(25);
console.log("no sort: \t[" + arr3 + "]");

loopSort1(arr3);
console.log("sorted: \t[" + arr3 + "]\n");

let arr4 = generateArray(40);
console.log("no sort: \t[" + arr4 + "]");

recursionSort1(arr4, arr4.length);
console.log("sorted: \t[" + arr4 + "]\n");

// function to generate big arrays randomly
function generateArray(len){
  let arr = [];
  for(let i = 0; i < len; i++){
    let rand = Math.floor(Math.random()*100 + 1);
    arr.push(rand);
  }
  return arr;
}
// function to clear duplications
function makeUnique(arr){
	for(let i = 0; i < arr.length-1; i++){
		_makeUnique2(arr, i)
	}
}
function _makeUnique2(arr, i){
	for(let j = i+1; j < arr.length; ){
		if(arr[i] === arr[j]){
			arr.splice(j, 1);
		} 
    else j++;
	}
}
/** very necessary to note in makeUnique(), the j++ place is weird because when you remove 
  * an element, either going forward or backwards will reduce the actual
  * 
  * size of the array, making the compiler read undefined values when the array 
  * shortens at some point. so to prevent that, j++ is placed only when the
  * condition is false, to let the index stay where it is in time of deleting.
  **/

// test unique
let un1 = [1, 0, 0, 2, 2, 1, 4, 5, 6, 6, 4, 1, 1, 0, 9];
// console.log("bad: \t[" + un1 + "]\n");

makeUnique(un1);
// console.log("good: \t[" + un1 + "]\n");