var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var archiver = require('archiver');

var zip_dst_name = 'zip.zip';
var json_file_name="json.json";
var unzip_source_name = 'unzip/*';

app.use(express.static('static'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

function toZip() {
    var output = fs.createWriteStream(__dirname + '/static/' + zip_dst_name);
    var archive = archiver('zip');
    archive.on('error', function (err) {
        throw err;
    });
    archive.pipe(output);
    archive.bulk([
        {src: [unzip_source_name]}
    ]);
    archive.finalize();
}


app.get('/to_zip', function (req, res) {
    toZip();
    res.end();

});


app.get('/download', function (req, res) {
    var zip_file = fs.createReadStream(zip_dst_name);
    res.writeHead(200, {
        'Content-Type': 'application/force-download',
        'Content-Disposition': 'attachment; filename='+zip_dst_name
    });
    zip_file.pipe(res);
});

app.get('/test_with_params', function(req, res) {
    console.log(req.query.name);
    console.log(req.query.email);
        res.send('test_with_params Over');    
});

app.get('/test_without_params', function(req, res) {
    //get query
    console.log("12121212 test_without_params:"+req.query.email);
    res.send('test_without_params Over:');    

});

app.post('/post_with_params', function(req, res) { 
    // post body
    var str = JSON.stringify(req.body);
    console.log(str); 
    //文件异步写入
    fs.writeFile(json_file_name, str,function (err) {
        console.log('It\'s file write successfully!');
    });
    res.send(str);
});  

var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port
    console.log("应用实例，访问地址为 http://%s:%s", host, port)

});
