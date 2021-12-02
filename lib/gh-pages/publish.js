const ghpages = require('gh-pages')

function publish () {
  return new Promise((resolve, reject) => {
    ghpages.publish('dist', function (err) {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

exports = module.exports = publish
