#!/usr/bin/env node
const chalk = require('chalk')

const clean = require('../lib/clean/clean')
const expoExport = require('../lib/expo/export')
const createPage = require('../lib/website/createPage')
const createFavicon = require('../lib/website/createFavicon')
const createCNAME = require('../lib/website/createCNAME')
const publish = require('../lib/gh-pages/publish')

const ProgressBar = require('progress')
let bar
const fns = [
  generateFunctionInformations(clean, bar),
  generateFunctionInformations(expoExport, bar),
  generateFunctionInformations(createPage, bar),
  generateFunctionInformations(createFavicon, bar),
  generateFunctionInformations(createCNAME, bar),
  generateFunctionInformations(publish, bar)
]
bar = new ProgressBar(':percent', { total: fns.length })

function generateFunctionInformations (functionArg) {
  return () => functionArg()
    .then(() => bar.tick())
    // .then(() => console.log(chalk.green(functionArg.name + ' done.')))
}

function main (args) {
  return fns.reduce((promiseChain, currentTask) => {
    return promiseChain.then(chainResults =>
      currentTask().then(currentResult =>
        [ ...chainResults, currentResult ]
      )
    )
  }, Promise.resolve([])).then(arrayOfResults => {
    console.log(chalk.green('\nFinished!\n'))
  })
}

if (require.main === module) {
  main(process.argv)
    .catch(err => {
      console.log(chalk.red(`${err.message}\n`))
      process.exit(1)
    })
}

exports = module.exports = main
