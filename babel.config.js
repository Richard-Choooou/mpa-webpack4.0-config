module.exports = {
    "presets": [
        "@babel/preset-env",
        ["@babel/preset-typescript", {
            "allExtensions": true,
            "isTSX": true
        }]
    ],
    "plugins": [
        "@babel/plugin-transform-typescript",
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-transform-react-jsx"
    ]
}