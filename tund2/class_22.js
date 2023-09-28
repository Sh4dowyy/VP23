const firstName = 'Dmitrii';
const lastName = 'Agarjov';
const dateValue = require('./date_ee');
const timeValue = require('./time');

console.log('Programmi autor on: ' + firstName + ' ' + lastName);



//let dateETNow = dateValue.dateETformatted();

console.log('Täna on: ' + dateValue.dateETformatted() + ' ' +timeValue.timeETformatted());
