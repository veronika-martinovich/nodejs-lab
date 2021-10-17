"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var product_router_1 = __importDefault(require("./resources/product/product.router"));
var mongoose = require('mongoose');
// App
var app = (0, express_1.default)();
var PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use('/', product_router_1.default);
// Invalid request
app.use(function (req, res) {
    res.json({
        error: {
            name: 'Error',
            status: 404,
            message: 'Invalid Request',
            statusCode: 404,
        },
        message: 'Route not found',
    });
});
// DB
var connectionUrl = 'mongodb://localhost:27017/game-store';
mongoose.connect(connectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
var db = mongoose.connection;
db.on('error', function (error) {
    console.error('MongoDB connection error:', error);
}).once('open', function () {
    app.listen(PORT, function () {
        console.log("Server is running on port " + PORT);
    });
});
