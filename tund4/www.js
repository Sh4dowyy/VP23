const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");
//const dateTimeValue = require("./datetime_et");

const pageHead = '<!DOCTYPE html>\n<html>\n<head>\n\t<meta charset="utf-8"><title>Dmitrii Agarjov, veebiprogrameerimine 2023</title></head><body>';
const pageBanner = '\n\t<img src="banner.png" alt="Kursuse banner">';
const pageBody = "\n\t<h1>Dmitrii Agarjov</h1>\n\t<p>See veebileht on valminud <a href='https://www.tlu.ee' target='_blank'>TLÜ</a> Digitehnoloogiate instituudi informaatika eriala õppetöö raames</p>";
const pageFoot = '<hr></body></html>';



http.createServer(function(req, res){
	let currentURL = url.parse(req.url, true);
	//console.log(currentURL);
	if (currentURL.pathname === "/"){
		res.writeHead(200, {"Content-type": "text/html"});
		res.write(pageHead);
		res.write(pageBanner);
		res.write(pageBody);
		//res.write('<p>Kell veebilehe avamisel oli: ' + dateTimeValue.timeETformated() + '<\p>');
		res.write('\n\t<hr>\n\t<p><a href="addname">Lisa oma nimi!</a></p>');
		//res.write('\n\t<hr>\n\t<p><a href="semesterprogress">Semestriprogress</a>!</p>');
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
		res.write('\n\t <p><a href="/">Tagasi avalehele</a>!</p>');
		res.write(pageFoot);
		//console.log("Keegi Vaatab!");
		//valmis, saada ära
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
		console.log(path.extname(currentURL.pathname));
		let bannerPath = path.join(__dirname, "public", "tluphoto");
		fs.readFile(bannerPath + currentURL.pathname, (err, data)=>{
			if (err){
				throw err;
			}
			else if (data) {
				console.log(currentURL.pathname);
				res.writeHead(200, {"Content-Type": "image/jpeg"});
				res.write(data);
				res.end();
			}
		});
	}
	else if (currentURL.pathname === "/banner.png"){
		console.log("Tahame Pilti!");
		let bannerPath = path.join(__dirname, "public", "banners");
		
		fs.readFile(bannerPath + currentURL.pathname, (err, data)=>{
			if (err){
				throw err;
			}
			else if (data) {
				console.log(bannerPath + currentURL.pathname);
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
	console.log(htmlOutput);
	//res.write('\t<img src="/tlu_42.jpg" alt="Pilt TLU-st">\n');
	res.write(pageFoot);
		//console.log("Keegi Vaatab!");
		//valmis, saada ära
	return res.end();
}
//rinde   5100
