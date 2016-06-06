const fs = require('fs');
const pageComponents = 'app/components';
const pageContainers = 'app/containers';

function componentExists(comp) {
  return fs.readdirSync(pageComponents).concat(fs.readdirSync(pageContainers)).indexOf(comp) >= 0;
}

module.exports = componentExists;
