const path = require('path')
const fs = require('fs')
const config  = require('./config')

module.exports.resolveEntryFile = function () {
    let entrys = {}
    let jsEntryDir = null
    let jsDirs = null

    try {
        jsEntryDir = path.join(config.pagesRootPath, 'js')
        fs.accessSync(jsEntryDir)
        jsDirs = fs.readdirSync(jsEntryDir)
    } catch(e) {
        console.error('未存在js入口文件')
        process.exit(0)
    }


    jsDirs.map(value => {
        let entryDirPath = path.resolve(jsEntryDir, value)

        try {
            let entryFilePath = path.join(entryDirPath, 'entry.js')
            fs.accessSync(entryFilePath)
            entrys[value] = {}
            entrys[value].path = entryFilePath
            entrys[value].dir = value
        } catch(e) {
            console.log(`${entryDirPath} 目录没有入口文件，不过也没啥关系`)
        }
        
    })
    
    return entrys
}

module.exports.resolveHtmlFile = function() {
    let entrys = {}
    let htmlEntryDir = path.join(config.pagesRootPath)
    let htmlDirs = fs.readdirSync(htmlEntryDir)

    try {
        fs.accessSync(htmlEntryDir)
    } catch(e) {
        console.error('未存在html文件')
        process.exit(0)
    }

    
    htmlDirs.map(value => {
        try {
            if(value.match(/\.html$/)) {
                let entryFilePath = path.join(htmlEntryDir, value)
                let pageName = value.replace('.html', '')
                entrys[pageName] = {}
                entrys[pageName].path = entryFilePath
                entrys[pageName].dir = pageName
            }
        } catch(e) {
            console.log('resolve html error')
        }
    })

    return entrys
}

const getEntrysDetails = function(type) {
    return function(entrys) {
        let obj = {}

        for(let i in entrys) {
            obj[i] = entrys[i][type]
        }

        return obj
    }
    
}

module.exports.getEntrysPath = getEntrysDetails('path')
module.exports.getEntrysDir = getEntrysDetails('dir')