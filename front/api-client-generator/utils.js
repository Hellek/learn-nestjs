const heading = `/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

`

const addDefaultHeading = content => heading + content

const shortify = content => {
  const noLongMethodPrefix = content.replaceAll('tinkoffPublicInvestApiContractV1', '')
  return noLongMethodPrefix
}

module.exports = {
  addDefaultHeading,
  shortify,
}
