const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");
const querystring = require('querystring');
const dateTimeValue = require("./datetime_ee");
const dateTimeValueENG = require("./datetime_eng");
const back = '\n\t<hr>\n\t<p><a href="..">Tagasi algusesse!</a></p>';

const pageHead = '<!DOCTYPE html>\n<html>\n<head>\n\t<meta charset="utf-8"><title>Dmitrii Agarjov, veebiprogrameerimine 2023</title></head><body>';
const pageBanner = '\n\t<img src="banner.png" alt="Kursuse banner">';
const pageBody = "\n\t<h1>Dmitrii Agarjov</h1>\n\t<p>See veebileht on valminud <a href='https://www.tlu.ee' target='_blank'>TLÜ</a> Digitehnoloogiate instituudi informaatika eriala õppetöö raames</p>";
const pageFoot = '<hr></body></html>';



http.createServer(function(req, res){
	let currentURL = url.parse(req.url, true);
	//console.log(currentURL);
	if(req.method === 'POST'){
		collectRequestData(req, result => {
			console.log(result);
			//kirjutame andmeid tekstifailli
			fs.open('public/log.txt', 'a', (err, file)=>{
				if(err){
					throw err;
				}
				else{
					fs.appendFile('public/log.txt', result.firstNameInput + ', ' + result.lastNameInput + ', ' + dateTimeValueENG.dateENGformatted() + ';', (err)=>{
						if(err){
							throw err;
							}
							else {
								console.log('faili kirjutati');
							}
					});
				}
			});
			
			res.end(result.firstNameInput);
		});
	}
	if (currentURL.pathname === "/"){
		res.writeHead(200, {"Content-type": "text/html"});
		res.write(pageHead);
		res.write(pageBanner);
		res.write(pageBody);
		res.write('<p>Kell veebilehe avamisel oli: ' + dateTimeValue.timeETformatted() + '<\p>');
		res.write('\n\t<hr>\n\t<p><a href="addname">Lisa oma nimi!</a></p>');
		res.write('\n\t<hr>\n\t<p><a href="semesterprogress">Semestriprogress</a>!</p>');
		res.write('\n\t<hr>\n\t<p><a href="TLUpilt">TLÜ foto</a>!</p>');
		res.write(pageFoot);
		//console.log("Keegi Vaatab!");
		//valmis, saada ära
		return res.end();
	}
	else if (currentURL.pathname === "/addname"){
		res.writeHead(200, {"Content-type": "text/html"});
		res.write(pageHead);
		res.write(pageBanner);
		res.write(pageBody);
		res.write('\n\t<hr>\n\t<h2>Lisa palun oma nimi</h2>');
		res.write("<form method='POST'><label for='firstNameInput'>Eesnimi: </label><input type='text' name='firstNameInput' id='firstNameInput' placeholder='sinu eesnimi...'><br><label for='lastNameInput'>Perekonnanimi: </label><input type='text' name='lastNameInput' id='lastNameInput' placeholder='sinu perekonnanimi...'><br><input type='submit' name='nameSubmit' value='Salvesta'></form>");
		res.write(back);
		res.write(pageFoot);
		//console.log("Keegi Vaatab!");
		//valmis, saada ära
		return res.end();
	}	
	else if (currentURL.pathname === "/semesterprogress"){
		res.writeHead(200, {"Content-type": "text/html"});
		res.write(pageHead);
		res.write(pageBanner);
		res.write(pageBody);
		const semBegin = new Date('08/28/2023');
		const semEnd = new Date('01/28/2024');
		const sem = new Date();
		const semLeft = Math.round((sem - semBegin) / (1000 * 60 * 60 * 24))
		if (semBegin > sem){
			res.write('\n\t<hr>\n\t<p>2023/2024 õppeaasta sügissemester pole veel peale hakanud.</p>');
		}
		else if (semBegin < sem && semEnd > sem){
			res.write('\n\t<hr>\n\t<p>Semester on kestnud ' + semLeft + ' paeva</p>')
		}
		else if (semEnd < sem){
			res.write('\n\t<hr>\n\t<p>Semester on läbi!</p>');
		}
		const totalSem = Math.round((semEnd - semBegin) / (1000 * 60 * 60 * 24))
		res.write('<meter min="0" max="' + totalSem + '" value="' + semLeft+ '"></meter>');
		res.write(back);
		res.write(pageFoot);
		return res.end();
	}
	else if (currentURL.pathname === "/TLUpilt"){
		//loeme kataloogist fotode nimekirja ja loosime pildi
		let htmlOutput = '\n\t<p>Pilti ei saa näidata!<\p>';
		let listOutput = '';
		fs.readdir('public/tluphoto', (err, fileList)=>{
			if (err){
				throw err;
				tluPhotoPage(res, htmlOutput, listOutput);
			}
			else {
				let photoNum = Math.floor(Math.random() * fileList.length);
				htmlOutput = '\n\t<img src="' + fileList[photoNum] + '" alt="TLU pilt">';
				listOutput = '\n\t<ul>';
				for (fileName of fileList){
					listOutput += '\n\t<li>' + fileName + '</li>';
				}
				listOutput += '\n\t</ul>'
				tluPhotoPage(res, htmlOutput, listOutput);
			}
		});
	}
	//else if (currentURL.pathname === "/tlu_42.jpg"){
	else if (path.extname(currentURL.pathname) === ".jpg"){
		//console.log(path.extname(currentURL.pathname));
		let bannerPath = path.join(__dirname, "public", "tluphoto");
		fs.readFile(bannerPath + currentURL.pathname, (err, data)=>{
			if (err){
				throw err;
			}
			else if (data) {
				//console.log(currentURL.pathname);
				res.writeHead(200, {"Content-Type": "image/jpeg"});
				res.write(data);
				res.end();
			}
		});
	}
	else if (currentURL.pathname === "/banner.png"){
		//console.log("Tahame Pilti!");
		let bannerPath = path.join(__dirname, "public", "banners");
		
		fs.readFile(bannerPath + currentURL.pathname, (err, data)=>{
			if (err){
				throw err;
			}
			else if (data) {
				//console.log(bannerPath + currentURL.pathname);
				res.writeHead(200, {"Content-Type": "image/png"});
				res.write(data);
				res.end();
			}
		});
	}
	else {
		res.end("Error 404");
	}
}).listen(5105);


function tluPhotoPage(res, htmlOutput, listOutput){
	res.writeHead(200, {"Content-type": "text/html"});
	res.write(pageHead);
	res.write(pageBanner);
	res.write(pageBody);
	res.write(htmlOutput);
	//console.log(htmlOutput);
	//res.write('\t<img src="/tlu_42.jpg" alt="Pilt TLU-st">\n');
	res.write(pageFoot);
		//console.log("Keegi Vaatab!");
		//valmis, saada ära
	return res.end();
}

function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if(request.headers['content-type'] === FORM_URLENCODED) {
        let receivedData = '';
        request.on('data', chunk => {
            receivedData += chunk.toString();
        });
        request.on('end', () => {
            callback(querystring.decode(receivedData));
        });
    }
    else {
        callback(null);
    }
}
//rinde   5100
