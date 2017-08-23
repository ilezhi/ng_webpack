const path = require('path');

const config = {};
const _root = path.resolve(__dirname, '../');

config.env = process.env.NODE_ENV || 'development';
config.env = config.env.trim();
config.cache = config.env === 'production';
config.port = process.env.PORT || 8888;

config.src_dir = 'src';
config.dist_dir = 'dist';

config.paths = (() => {
  const base = [_root];
  const resolve = path.resolve;

  const project = (...args) => resolve.apply(resolve, [...base, ...args]);

  return {
    root: project,
    src : project.bind(null, config.src_dir),
    dist: project.bind(null, config.dist_dir)
  }
})();


module.exports = config;