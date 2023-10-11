dateENGformatted = function(){
	let timeNow = new Date();
	let dateNow = timeNow.getDate();
	let monthNow = timeNow.getMonth() + 1;
	let yearNow = timeNow.getFullYear();
	let dateENG = monthNow + ' ' + dateNow + ' ' + yearNow;
	return dateENG;
}

module.exports = {dateENGformatted: dateENGformatted};