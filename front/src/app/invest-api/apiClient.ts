import { paths } from './schema'

type RequestBody<T extends keyof paths> = paths[T]['post']['requestBody']['content']['application/json']

type ResponseType<T extends keyof paths> = paths[T]['post']['responses'][200]['content']['application/json']

class InvestAPIClient {
  fetch<T extends keyof paths>(path: T, body?: RequestBody<T>): Promise<ResponseType<T>> {
    return fetch(`http://localhost:${process.env.BACK_APP_PORT}/invest-api/${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(res => res.json())
  }
}

const investApi = new InvestAPIClient()

export {
  type ResponseType,
  investApi,
}
