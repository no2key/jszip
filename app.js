// 初始化应用
var express = require('express'),
        app = express();

// 设置模板引擎
app.set('views', __dirname + '/');
app.set('view engine', 'ejs');

// 解析请求体
app.use(express.bodyParser());

// 入口页面
app.get('/', function(req, res)
{
    // 读取本文件
    var fs = require('fs');
    var code = fs.readFileSync(__dirname + '/app.js');

    // 加注释
    code = '/* \n  以下代码就是本站的 app.js 主要文件 \n  您可以直接 click 压缩代码试试看效果如何 \n*/ \n\n\n' + code;

    // 套模板
    res.render('index',
    {
        'title' : '在此处粘贴源代码',
        'code' : code
    });
});

// 提交页面
app.post('/', function(req, res)
{
    // 取得提交的源代码
    var code = req.body.code;

    // 压缩
    var uglify = require('uglify-js');
    try {var result = uglify.minify(code, { 'fromString':true });}
    catch(ex){ var result = { 'code': '压缩失败，或许你提交的不是 JavaScript 代码？' }; }

    // 输出结果
    res.render('index',
    {
        'title' : '压缩结果',
        'code' : result.code
    });
});

// 启动监听
app.listen(18080);