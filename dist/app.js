const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('bodyParser');
const cors = require('cors');
const morgan = require('morgan');
const methodOverride = require('methodOverride');
const errorhandler = require('errorhandler');
const isProd = process.env.NODE_ENV === 'production';
const app = express();
app.use(cors());
app.use(morgan()('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(__dirname + '/public'));
if (!isProd) {
    app.use(errorhandler());
}
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
//# sourceMappingURL=app.js.map