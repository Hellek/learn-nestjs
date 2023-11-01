import { paths } from './schema'

type ResponseType<T extends keyof paths> = paths[T]['post']['responses'][200]['content']['application/json']

class InvestAPIClient {
  fetch<T extends keyof paths>(path: T): Promise<ResponseType<T>> {
    return fetch(`http://localhost:${process.env.BACK_APP_PORT}/invest-api/${path}`, {
      method: 'POST',
    })
      .then(res => res.json())
  }
}

const api = new InvestAPIClient()

export {
  type ResponseType,
  api,
}
