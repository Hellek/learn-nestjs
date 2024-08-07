const fs = require('node:fs')
const path = require('node:path')
const { generateApi } = require('swagger-typescript-api')

const generatedFilename = 'TinkoffInvest.ts'

// Docs https://www.npmjs.com/package/swagger-typescript-api
generateApi({
  name: generatedFilename,
  output: path.resolve('./src/app/api'),
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
    files.forEach(({ content }) => {
      fs.writeFile(path, content)
    })
  })
  // eslint-disable-next-line no-console
  .catch(console.error)
