const config  = require('./config')
const globby = require('globby');

module.exports.resolveEntryFile = function () {
    const entrys = {}
    const paths = globby.sync(["**/entry.ts"], {
        cwd: config.basePath,
        ignore: ['./node_modules'],
        absolute: true
    })
    paths.forEach(path => {
        const key = path.match(/pages\/(.*)\/entry\.ts$/)[1]
        entrys[key] = path
    })
    
    return entrys
}

module.exports.resolveHtmlFile = function() {
    const entrys = {}
    const paths = globby.sync(["**/index.html"], {
        cwd: config.basePath,
        ignore: ['./node_modules'],
        absolute: true
    })
    paths.forEach(path => {
        const key = path.match(/pages\/(.*)\/index\.html$/)[1]
        entrys[key] = path
    })
    
    return entrys
}