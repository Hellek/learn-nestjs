const fs = require('node:fs')
const path = require('node:path')
const { generateApi } = require('swagger-typescript-api')
const { shortify, addDefaultHeading } = require('./utils.js')

const generatedFilename = 'TinkoffInvest.ts'
const outputPath = path.resolve('./src/app/api')

// Docs https://www.npmjs.com/package/swagger-typescript-api
generateApi({
  name: generatedFilename,
  output: outputPath,
  url: 'https://tinkoff.github.io/investAPI/swagger-ui/openapi.yaml',
  httpClientType: 'fetch',
  // defaultResponseAsSuccess: false,
  generateClient: true,
  // generateRouteTypes: false,
  generateResponses: true,
  toJS: false,
  // extractRequestParams: false,
  // extractRequestBody: false,
  // extractEnums: false,
  // unwrapResponseData: false,
  // defaultResponseType: 'void',
  // singleHttpClient: true,
  // cleanOutput: false,
  // enumNamesAsValues: false,
  // moduleNameFirstTag: false,
  // generateUnionEnums: false,
  // addReadonly: false,
  // sortTypes: false,
  // sortRouters: false,
})
  .then(({ files }) => {
    files.forEach(file => {
      const filePath = `${outputPath}/${file.fileName}${file.fileExtension}`

      const data = addDefaultHeading(shortify(file.fileContent))

      fs.writeFile(filePath, data, error => {
        if (error) {
          // eslint-disable-next-line no-console
          console.error(error)
          return
        }

        console.log('Файл успешно записан')
      })
    })
  })
  // eslint-disable-next-line no-console
  .catch(console.error)
