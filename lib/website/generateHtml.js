function generateHtml ({ homepage, androidIndexJsonURI, androidQrCode, iosIndexJsonURI, iosQrCode, name }) {
  return `<!DOCTYPE html>
  <html>
  
  <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css"
          integrity="sha256-vK3UTo/8wHbaUn+dTQD0X6dzidqc5l7gczvH+Bnowwk=" crossorigin="anonymous" />
      <meta charset="UTF-8">
      <title>expo-gh-pages</title>
  </head>
      <body>
          <p>Hello World</p>
      </body>
  </html>`
}

exports = module.exports = generateHtml
