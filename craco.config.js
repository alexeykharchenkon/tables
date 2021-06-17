const path = require('path');

const resolvePath = p => path.resolve(__dirname, p)

module.exports = {
    
    webpack: {
        alias: {
            '@stores': resolvePath('./src/app/stores'),
            '@common': resolvePath('./src/app/common'),
            '@pages': resolvePath('./src/app/pages'),
            '@services': resolvePath('./src/app/services'),
        }
    },
  
}