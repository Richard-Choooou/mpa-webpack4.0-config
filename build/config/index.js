const path = require('path')
const basePath = path.resolve(__dirname, '../', '../')
module.exports = {
    basePath,
    pagesRootPath: path.resolve(basePath, 'src'),
    distRootPath: path.resolve(basePath, 'dist'),
}