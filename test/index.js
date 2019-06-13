const fs = require('fs');
const swig = require('swig');

let content = swig.renderFile('templates/common/_package.json', {
  dependencies: {
    vue: '8.3.9',
    puta: '3.3.3'
  }
})

content = JSON.parse(content)
content = JSON.stringify(content, null,2)


fs.writeFileSync('./hode.json', content)