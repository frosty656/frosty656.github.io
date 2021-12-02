const path = require('path')
const fs = require('fs')

function createFavicon () {
  return new Promise((resolve, reject) => {
    fs.copyFile(path.resolve(__dirname, 'favicon.ico'), './dist/favicon.ico', err => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

exports = module.exports = createFavicon
