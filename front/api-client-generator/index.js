const fs = require('node:fs')
const path = require('node:path')
const { generateApi } = require('swagger-typescript-api')

const generatedFilename = 'TinkoffInvestApi.ts'

// Docs https://www.npmjs.com/package/swagger-typescript-api
generateApi({
  name: generatedFilename,
  output: path.resolve('./src/app'),
  url: 'https://tinkoff.github.io/investAPI/swagger-ui/openapi.yaml',
  generateClient: true,
  generateResponses: true,
  toJS: false,
})
  .then(({ files }) => {
    files.forEach(({ content }) => {
      fs.writeFile(path, content)
    })
  })
  // eslint-disable-next-line no-console
  .catch(console.error)
