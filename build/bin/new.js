const fs = require('fs')
const path = require('path')
const config = require('../config')

const pageName = process.argv[2]
const pageCnName = process.argv[3] || pageName
const pagefilesPath = config.pagesRootPath

initDirs()
let pagesDir = fs.readdirSync(config.pagesRootPath)

if(pagesDir.some(files => files == pageName + '.html')) {
    console.error('文件或文件夹已经存在')
    process.exit(0)
}

const pageFiles = [{
    name: `${pageName}.html`,
    type: 'html',
    path: path.join(pagefilesPath),
    content: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>${pageCnName}</title>
    </head>
    <body>
        <div class="${pageName}-container"></div>
    </body>
</html>`
}, {
    name: 'entry.js',
    type: 'js',
    content: `import '@/style/${pageName}/index.scss';`,
    path: path.join(pagefilesPath, 'js', pageName)
}, {
    name: 'index.scss',
    type: 'style',
    content: `.${pageName}-container {
    
}`,
    path: path.join(pagefilesPath, 'style', pageName)
}]

pageFiles.forEach(value => {
    let dir = ''

    try {
        fs.accessSync(value.path)
    } catch(e) {
        fs.mkdirSync(value.path)
    }
    

    fs.writeFileSync(path.resolve(value.path, value.name), value.content)
})


console.log('创建成功')
process.exit()

function initDirs() {
    try {
        fs.accessSync(path.resolve(config.basePath, 'src'))
    } catch(e) {
        fs.mkdirSync(path.resolve(config.basePath, 'src'))
    }

    try {
        fs.accessSync(path.resolve(config.basePath, 'src', 'js'))
    } catch(e) {
        fs.mkdirSync(path.resolve(config.basePath, 'src', 'js'))
    }

    try {
        fs.accessSync(path.resolve(config.basePath, 'src', 'style'))
    } catch(e) {
        fs.mkdirSync(path.resolve(config.basePath, 'src', 'style'))
    }

    // try {
    //     fs.accessSync(config.pagesRootPath)
    // } catch(e) {
    //     fs.mkdirSync(config.pagesRootPath)
    // }
}