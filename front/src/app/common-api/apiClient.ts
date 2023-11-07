class CommonAPIClient {
  fetch(input: RequestInfo, init?: RequestInit | undefined): Promise<Response> {
    const param1 = typeof input === 'string'
      ? `http://localhost:${process.env.BACK_APP_PORT}/${input}`
      : {
        ...input,
        url: `http://localhost:${process.env.BACK_APP_PORT}/${input.url}`,
      }

    return fetch(param1, init).then(res => res.json())
  }
}

const commonApi = new CommonAPIClient()

export {
  commonApi,
}
