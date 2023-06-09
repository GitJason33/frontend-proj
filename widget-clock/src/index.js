"use strict";
// take the current time for once
let { hour, minute, second } = TIME_NOW();

// add some automated html content for numbers and dashes on clock, put the initial time loading
(function () {
  // load current time
  updateClock({ hour, minute, second });

  // numbers
  for (let i = 1; i <= 12; i++)
    $(".numbering-modal").append(`
      <span style="--i: ${i}">
        <b>${i}</b>
      </span>
    `);

  // dashes
  for (let i = 0; i < 60; i++) {
    let html;
    i % 5 !== 0
      ? (html = `<span style="--j: ${i};"><b></b></span>`)
      : (html = `
        <span style="--j: ${i}; inset: 3px">
          <b style="width: 2.5px; height: 18px; opacity: 70%;"></b>
        </span>`);

    $(".dashing-modal").append(html);
  }
})();

// time interval to update time on clock
setInterval(() => {
  second++;
  if(second % 60 === 0) minute++;
  if(minute % 60 === 0 && second % 60 === 0) hour++;

  updateClock({ hour, second, minute });
}, 1000);

// function that manipulates time
function updateClock({ hour, minute, second }){
  // this will rotate the hour 6 degrees every 12 minutes (on next dash)
  const bonusHourRotation = 30 * hour + Math.floor(minute / 12) * 6;

  $(".second").css("transform", `rotate(${6 * second}deg)`);
  $(".minute").css("transform", `rotate(${6 * minute}deg)`);
  $(".hour").css("transform", `rotate(${bonusHourRotation}deg)`);
}

function fixClock(){
  let now = TIME_NOW();
  [ second, minute, hour ] = [ now.second, now.minute, now.hour ];
}

// function to get time right now for loading
function TIME_NOW() {
  const now = new Date();

  return {
    hour: now.getHours(),
    minute: now.getMinutes(),
    second: now.getSeconds(),
  };
}
