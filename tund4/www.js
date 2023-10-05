const http = require('http');

http.createServer(function(req, res){
	res.writeHead(200, {'Content-type': 'text/html'});
	res.write('<!DOCTYPE html><html><head><meta charset="utf-8"><title>Dmitrii Agarjov, veebiprogrameerimine 2023</title></head><body>');
	res.write("<h1>Dmitrii Agarjov</h1><p>See veebileht on valminud <a href='https://www.tlu.ee' target='_blank'>TLÜ<a/> Digitehnoloogiate instituudi informaatika eriala õppetöö raames</p>");
	res.write('<hr></body></html>');
	console.log('Keegi vaatab!')
	//valmis, saada ära
	return res.end();
}).listen(5105);

//rinde 5100
//dmirjov 5105
