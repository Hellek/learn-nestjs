import { Injectable } from '@nestjs/common';

@Injectable()
export class InvestApiService {
  readonly isSandbox = process.env.authorizationToken_isSandbox === 'true';
  readonly isAuthRealTokenReadonly = process.env.authorizationToken_isAuthRealTokenReadonly === 'true';

  readonly baseUrl = this.isSandbox
    ? 'https://sandbox-invest-public-api.tinkoff.ru/rest/'
    : 'https://invest-public-api.tinkoff.ru/rest/';
  readonly contractUrl = 'tinkoff.public.invest.api.contract.v1.';

  readonly realToken = this.isAuthRealTokenReadonly
    ? process.env.authorizationToken_realReadonly
    : process.env.authorizationToken_realFullAccess;

  readonly authorizationToken = this.isSandbox ? process.env.authorizationToken_sandbox : this.realToken;
  readonly Authorization = `Bearer ${this.authorizationToken}`;

  readonly fetch = async (url: string, body: Record<string, never>) => {
    return fetch(this.baseUrl + this.contractUrl + url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        Authorization: this.Authorization,
        'content-type': 'application/json',
      },
    }).then((res) => res.json());
  };
}
