Schema is generated and formatted with

```
"generate:tinkoffApi:schema": "openapi-typescript https://tinkoff.github.io/investAPI/swagger-ui/openapi.yaml -o ./src/tinkoffApiClient/schema.d.ts",
"generate:formatted:schema": "npm run generate:tinkoffApi:schema & npm run format",
```

After this schema is manually adopted with moving of `tinkoff.public.invest.api.contract.v1.` from schema to variable.