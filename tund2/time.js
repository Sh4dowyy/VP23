exports.timeETformatted = function() {
  let timeNow = new Date();
  let hoursNow = String(timeNow.getHours()).padStart(2, '0');
  let minutesNow = String(timeNow.getMinutes()).padStart(2, '0');
  let secondsNow = String(timeNow.getSeconds()).padStart(2, '0');
  let timeET = hoursNow + ':' + minutesNow + ':' + secondsNow;
  return timeET;
}