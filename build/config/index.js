const path = require('path')
const basePath = path.resolve(__dirname, '../', '../')
module.exports = {
    basePath,
    srcPath: path.resolve(basePath, 'src'),
    pagesRootPath: path.resolve(basePath, 'src/pages'),
    distRootPath: path.resolve(basePath, 'dist'),
}