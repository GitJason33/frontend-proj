"use strict";
// setup initial values for stopwatch
let [millis, seconds, minutes, hours] = [0, 0, 0];

// time marche
let marching;
let isMarching = false;

loadRecords();

// ----------------------- options -----------------------
function start() {
  if (!isMarching) {
    isMarching = true;

    marching = setInterval(() => {
      _incrementTime();

      updateTime();
    }, 50);
  }
}

function stop() {
  clearInterval(marching);
  isMarching = false;
}

function reset() {
  stop();
  [millis, seconds, minutes, hours] = [0, 0, 0, 0];
  updateTime(0, 0, 0, 0);
}


function saveRecord(){
  stop();
  let record_name = promptRecord();
  if(record_name === null) return;
  
  let time = `${$('.hour').html()}:${$('.minute').html()}:${$('.second').html()}:${$('.millis').html()}`;

  $('.stopwatch__records-container').append( htmlRecord(record_name, time) );
  storeRecord(record_name, time);
}
// ----------------------- options end -----------------------



// ---------------------- record-handler ----------------------
function loadRecords(){
  let records = JSON.parse(localStorage.getItem('records'));

  for(let x in records){
    $('.stopwatch__records-container').append( htmlRecord(x, records[x]) )
  }
}

function recordExists(name){
  let rec = JSON.parse(localStorage.getItem('records'));
  if(rec === null) return false;

  return rec[name] !== undefined;
}

function storeRecord(name, time){
  let record;

  // check if record list already exists
  if(localStorage.getItem('records') === null){
    record = { [name]: time }
  }else{
    record = JSON.parse(localStorage.getItem('records'));
    record[name] = time;
  }
  // save record in browser storage
  localStorage.setItem('records', JSON.stringify(record));
}

function clearRecords(){
  let response = confirm("Are you sure you want to delete all records?");

  response ? (
    localStorage.removeItem('records'),
    $('.stopwatch__records-container').html('')
  ) : null;
}

function promptRecord(){
  let record_name;
  do{
    record_name = prompt("enter the record name (under 40 characters)");
  }while(recordExists(record_name) || record_name?.length > 40 || record_name === '');

  return record_name;
}

function htmlRecord(name, time){
  return `
    <div class="stopwatch__single-record">
      <h3>${name}</h3>
      <p>${time}</p>
    </div>
  `;
}
// ---------------------- record-handler end ----------------------



// ------------------------- helpers -------------------------
function updateTime() {
  $(".millis").html(_formatMillis(millis));

  let oldSec = parseInt($('.second').html());
  let oldMin = parseInt($('.minute').html());
  let oldHr = parseInt($('.hour').html());
  
  if(_hasChanged(oldSec, seconds))
    $(".second").html(_formatNumber(seconds));

  if(_hasChanged(oldMin, minutes))
    $(".minute").html(_formatNumber(minutes));
  
  if(_hasChanged(oldHr, hours))
    $(".hour").html(_formatNumber(hours));
}


function _incrementTime() {
  millis += 50;
  if (millis % 1000 === 0) {
    millis = 0;
    seconds++;
  }
  if (seconds % 60 === 0 && millis % 1000 === 0) {
    seconds = 0;
    minutes++;
  }
  if (minutes % 60 === 0 && seconds % 60 === 0 && millis % 1000 === 0) {
    minutes = 0;
    hours++;
  }
}

function _hasChanged(oldNum, newNum) {
  return oldNum !== newNum;
}

function _formatNumber(n) {
  return n < 10 ? `0${n}` : n;
}

function _formatMillis(n) {
  if (n < 10) return "00" + n;
  else if (n < 100) return "0" + n;
  else return n;
}
// ------------------------- helpers end -------------------------