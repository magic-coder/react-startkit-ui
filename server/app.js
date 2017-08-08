const express = require('express');
const fs = require('fs');
const childProcess = require('child_process');
const app = express();
const port = 8080;


// Config
app.use(express.static(__dirname + '/public'));  // 静态资源目录


// Routers
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html')
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    //判断是主动导向404页面，还是传来的前端路由。
　　 //如果是前端路由则如下处理

    fs.readFile(__dirname + '/public/index.html', function(err, data){
        if(err){
            console.log(err);
            res.send('后台错误');
        } else {
            res.writeHead(200, {
                'Content-type': 'text/html',
                'Connection':'keep-alive'
            });
            res.end(data);
        }
    })
});



// Start server
if (!module.parent) {
    const server = app.listen(port);
    console.log('Express started on port ' + port);
    // 自动打开浏览器
    childProcess.exec('start http://localhost:' + port);
}

module.exports = app;