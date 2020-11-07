// const d = new Date(2020, 1, 10);
// console.log(d.parse("DD-MM-YYYY h:mm:ss"));

// // console.log(d.getTime("DD-MM-YYYY h:mm:ss"));

// var currentTimeInSeconds = Math.floor(Date.now() / 1000);
// // console.log(currentTimeInSeconds);
// let today = new Date();

// // today.setHours(0);
// // alert(today); // still today, but the hour is changed to 0
// console.log(today);
// today.setHours(0, 0, 0, 0);
// alert(today); // still today, now 00:00:00 sharp.
var d = new Date();
console.log(d);
let [month, date, year] = new Date().toLocaleDateString("en-US").split("/");
console.log(month, date, year);
console.log(d.toDateString());
