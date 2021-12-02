const nrc = require('node-run-cmd')
const fs = require('fs')
const path = require('path')

function expoExport () {
  const packageJson = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'UTF-8'))
  let homepage = packageJson.homepage
  if (homepage.charAt(homepage.length - 1) === '/') {
    homepage = homepage.slice(0, -1)
  }
  var commands = [
    `expo export --public-url ${homepage}`
  ]

  var options = { cwd: process.cwd() }
  return nrc.run(commands, options)
}

exports = module.exports = expoExport
