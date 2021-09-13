var http = require('http');
const express = require('express')
const httpProxy = require('express-http-proxy')
const app = express()
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const helmet = require('helmet');

const produtosServiceProxy = httpProxy('http://localhost:3002');
const pessoasServiceProxy = httpProxy('http://localhost:3003');

// Proxy request
// rota para produtos e todos os métodos
app.all('/produtos', (req, res, next) => {
    produtosServiceProxy(req, res, next);
})
// rota para produtos e todos os métodos com um parâmetro ID
app.all('/produtos/:id', (req, res, next) => {
    produtosServiceProxy(req, res, next);
})
// rota para pessoas e todos os métodos
app.all('/pessoas', (req, res, next) => {
    pessoasServiceProxy(req, res, next);
})
// rota para pessoas e todos os métodos com um parâmetro ID
app.all('/pessoas/:id', (req, res, next) => {
    pessoasServiceProxy(req, res, next);
})

app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var server = http.createServer(app);
server.listen(3000);