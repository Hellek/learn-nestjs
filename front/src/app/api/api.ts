import { Api } from './TinkoffInvest'

const baseUrl = 'https://invest-public-api.tinkoff.ru/rest'
const Authorization = `Bearer ${process.env.AUTHORIZATION_TOKEN_REAL_READONLY}`

export const api = new Api({
  baseUrl,
  baseApiParams: {
    headers: {
      Authorization,
    },
  },
})
