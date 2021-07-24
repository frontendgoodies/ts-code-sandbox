"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
var express_1 = __importDefault(require("express"));
var http_proxy_middleware_1 = require("http-proxy-middleware");
var path_1 = __importDefault(require("path"));
var open_1 = __importDefault(require("open"));
var cells_1 = require("./routes/cells");
var serve = function (port, filename, dir, useProxy) {
    var app = express_1.default();
    app.use(cells_1.createCellsRouter(filename, dir));
    if (useProxy) {
        app.use(http_proxy_middleware_1.createProxyMiddleware({
            target: 'http://localhost:3000',
            ws: true,
            logLevel: 'silent',
        }));
        open_1.default('http://localhost:3000');
    }
    else {
        var packagePath = require.resolve('local-client/build/index.html');
        app.use(express_1.default.static(path_1.default.dirname(packagePath)));
        open_1.default(packagePath);
    }
    return new Promise(function (resolve, reject) {
        app.listen(port, resolve).on('error', reject);
    });
};
exports.serve = serve;
