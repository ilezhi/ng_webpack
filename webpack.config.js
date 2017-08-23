const config = require('./config');
const type = config.env === 'production' ? 'prod' : 'dev';
module.exports = require(`./config/webpack.${type}`);