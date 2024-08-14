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

const removeLongServicePrefix = str => str.replaceAll('tinkoffPublicInvestApiContractV1', '')

const removeMethodServicePrefix = str => {
  const services = [
    'InstrumentsService',
    'MarketDataService',
    'MarketDataStreamService',
    'OperationsService',
    'OperationsStreamService',
    'OrdersService',
    'OrdersStreamService',
    'SandboxService',
    'StopOrdersService',
    'UsersService',
  ]

  // Remove service from @name
  const regVar1 = `\\* @name (${services.join('|')})([a-zA-Z]*)`
  const regExp1 = new RegExp(regVar1, 'g')
  const s1 = str.replace(regExp1, '* @name $2')

  // Remove service from methodName
  const regVar2 = ` (${services.join('|')})([a-zA-Z]*):`
  const regExp2 = new RegExp(regVar2, 'gi')
  const s2 = s1.replace(regExp2, ' $2:')

  return s2
}

const shortify = content => removeMethodServicePrefix(removeLongServicePrefix(content))

module.exports = {
  addDefaultHeading,
  shortify,
}
