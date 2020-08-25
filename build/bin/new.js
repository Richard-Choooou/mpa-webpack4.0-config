const fs = require('fs')
const path = require('path')
const fsExtra = require('fs-extra')
const fileSave = require('file-save')
const config = require('../config')

const pageName = process.argv[2]
const pageCnName = process.argv[3] || pageName
const pagefilesPath = config.pagesRootPath



// let pagesDir = fs.readdirSync(config.pagesRootPath)

// if(pagesDir.some(files => files == pageName)) {
//     console.error('文件夹已经存在')
//     process.exit(0)
// }

initDirs(pageName)


const pageFiles = [{
    name: `index.html`,
    type: 'html',
    path: path.join(pagefilesPath, pageName),
    content: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>${pageCnName}</title>
    </head>
    <body>
        <div class="${pageName}-container">${pageName}</div>
    </body>
</html>`
}, {
    name: 'entry.ts',
    type: 'js',
    content: `import './style/index.scss';`,
    path: path.join(pagefilesPath, pageName)
}, {
    name: 'index.scss',
    type: 'style',
    content: `.${pageName}-container {
    
}`,
    path: path.join(pagefilesPath, pageName, 'style')
}]

pageFiles.forEach(value => {
    let dir = ''
    fsExtra.ensureDirSync(value.path) 
    fs.writeFileSync(path.resolve(value.path, value.name), value.content)
})


console.log('创建成功')
process.exit()



function initDirs(pageName) {
    const dirs = [
        'src', 'src/pages' ,'src/pages/' + pageName + '/script/', 'src/pages/' + pageName + '/style/'
    ]

    dirs.forEach(dir => {
       fsExtra.ensureDirSync(path.resolve(config.basePath, dir)) 
    })
}