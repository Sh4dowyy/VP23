const monthNamesET = ['jaanuar', 'veebruar', 'märts', 'april', 'mai', 'juuni', 'juuli', 'august', 'september', 'oktoober', 'november', 'detsember'];

dateETformatted = function(){
	let timeNow = new Date();
	let dateNow = timeNow.getDate();
	let monthNow = timeNow.getMonth();
	let yearNow = timeNow.getFullYear();
	let dateET = dateNow + '. ' + monthNamesET[monthNow] + ' ' + yearNow;
	return dateET;
}

timeETformatted = function(){
  let timeNow = new Date();
  let hoursNow = String(timeNow.getHours()).padStart(2, '0');
  let minutesNow = String(timeNow.getMinutes()).padStart(2, '0');
  let secondsNow = String(timeNow.getSeconds()).padStart(2, '0');
  let timeET = hoursNow + ':' + minutesNow + ':' + secondsNow;
  return timeET;
}

const timeOfDayET = function(){
	let partOfDay = 'suvaline hetk';
	let hourNow = new Date().getHours();
	if(hourNow >= 6 && hourNow < 12){
		partOfDay = 'Hommik'
	}
	if(hourNow > 14 && hourNow < 18){
		partOfDay = 'pärast lõuna'
	}
	if(hourNow >= 18){
		partOfDay = 'Õhtu';
	}
	
	return partOfDay;
}

module.exports = {dateETformatted: dateETformatted, timeETformatted: timeETformatted, monthsET: monthNamesET, timeOfDayET: timeOfDayET};

