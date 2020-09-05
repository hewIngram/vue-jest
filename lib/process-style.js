const throwError = require('./throw-error')
const getVueJestConfig = require('./get-vue-jest-config')
const cssExtract = require('extract-from-css')
const path = require('path')
const fs = require('fs')

const loadSrc = (src, filePath) => {
  var dir = path.dirname(filePath)
  var srcPath = path.resolve(dir, src)
  try {
    return fs.readFileSync(srcPath, 'utf-8')
  } catch (e) {
    throwError(
      'Failed to load src: "' + src + '" from file: "' + filePath + '"'
    )
  }
}

module.exports = function processStyle (stylePart, filePath, jestConfig = {}) {
  const vueJestConfig = getVueJestConfig(jestConfig)

  if (!stylePart || vueJestConfig.experimentalCSSCompile === false) {
    return {}
  }

  const processStyleByLang = lang => require('./compilers/' + lang + '-compiler')(stylePart.content, filePath, jestConfig)

  let cssCode = (stylePart.src && !stylePart.content) ? loadSrc(stylePart.src, filePath) : stylePart.content
  switch (stylePart.lang) {
    case 'styl':
    case 'stylus':
      cssCode = processStyleByLang('stylus')
      break
    case 'scss':
      cssCode = processStyleByLang('scss')
      break
    case 'sass':
      cssCode = processStyleByLang('sass')
      break
    case 'pcss':
    case 'postcss':
      cssCode = processStyleByLang('postcss')
      break
  }

  const cssNames = cssExtract.extractClasses(cssCode)

  const obj = {}
  for (let i = 0, l = cssNames.length; i < l; i++) {
    obj[cssNames[i]] = cssNames[i]
  }

  return obj
}
