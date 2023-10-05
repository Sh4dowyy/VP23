const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
//const datetimeValue = require('./date')

const pageHead = '<!DOCTYPE html>\n<html>\n<head>\n\t<meta charset="utf-8"><title>Dmitrii Agarjov, veebiprogrameerimine 2023</title></head><body>';
const pageBanner = '\n\t<img src="banner.png" alt="Kursuse banner">';
const pageBody = "\n\t<h1>Dmitrii Agarjov</h1>\n\t<p>See veebileht on valminud <a href='https://www.tlu.ee' target='_blank'>TLÜ</a> Digitehnoloogiate instituudi informaatika eriala õppetöö raames</p>";
const pageFoot = '<hr></body></html>';

http.createServer(function (req, res) {
    let currentURL = url.parse(req.url, true);
    //console.log(currentURL);
    if (currentURL.pathname === '/') {
        res.writeHead(200, { 'Content-type': 'text/html' });
        res.write(pageHead);
        res.write(pageBanner);
        res.write(pageBody);
        res.write('\n\t<hr><p><a href="addname">Lisa oma nimi</a></p>\n\t');
        res.write(pageFoot);
        return res.end();
    } else if (currentURL.pathname === '/addname') {
        res.writeHead(200, { 'Content-type': 'text/html' });
        res.write(pageHead);
        res.write(pageBanner);
        res.write(pageBody);
        res.write('\n\t<hr><h2>Lisa palun oma nimi</h2>\n\t');
        res.write(pageFoot);
        return res.end();
	} else if (currentURL.pathname === '/tluphoto') {
		//loeme kataloogist fotode nimekirja ja loosime ühe pildi
		let htmlOutput = '\n\t<p>Pilti ei saa näaidata</p>';
		fs.readdir('public/tluphoto', (err, fileList)=>{
		if(err){
			throw err;
			tluPhotoPage(res, htmlOutput);
		}
		else {
			console.log(fileList);
			let photoNum = Math.floor(Math.random() * fileList.length);
			htmlOutput = '\n\t<img src="' + fileList[photoNum] + '" alt="TLÜ pilt">';
			tluPhotoPage(res, htmlOutput);
			}
		});
        
		
        res.write(pageFoot);
        return res.end();
    } else if (currentURL.pathname === '/banner.png') {
        console.log('Tahame pilti!');
        let bannerPath = path.join(__dirname, 'public', 'banners', currentURL.pathname);
        fs.readFile(bannerPath, (err, data) => {
            if (err) {
                throw err;
            } else {
                res.writeHead(200, { 'Content-type': 'image/png' });
                res.end(data);
            }
        });
    } else {
        res.writeHead(404, { 'Content-type': 'text/html' });
        res.end('ERROR 404');
    }
}).listen(5105);

function tluPhotoPage(res, htmlOutput){
	res.writeHead(200, { 'Content-type': 'text/html' });
    res.write(pageHead);
    res.write(pageBanner);
    res.write(pageBody);
	res.write(htmlOutput);
	console.log(htmlOutput);
    res.write('\n\t<img src="tlu_42.jpg" alt="TLÜ foto">\n\t');
	res.write(pageFoot);
	return res.end();
}
