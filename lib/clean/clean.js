const nrc = require('node-run-cmd')

function clean () {
  var commands = [
    'rm -rf dist',
    'gh-pages-clean'
  ]

  var options = { cwd: process.cwd() }
  return nrc.run(commands, options)
}

exports = module.exports = clean
