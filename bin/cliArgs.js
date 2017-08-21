const fs = require('fs')
const path = require('path')

const CWD = process.cwd()

const getFileContents = str =>
  fs.readFileSync(path.join(CWD, str), 'utf-8')

function args(str) {

  return str
    .reduce((acc, item, indx, ary) => {
      if (/^-/.test(item)) {
        acc[item.slice(1)] = getFileContents(ary[indx + 1])
      }

      return acc
    }, {})
}

module.exports = args
