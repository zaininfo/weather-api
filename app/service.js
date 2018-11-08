import config from 'config'
import got from 'got'
import invariant from 'invariant'
import log from './logger'

const url = config.service && config.service.url
invariant(url, 'Service URL is required.')

const appId = config.service && config.service.appId
invariant(appId, 'Service API key is required.')

class Service {
  constructor () {
    this.url = url
    this.appId = appId
  }

  async isUp () {
    try {
      await got(this.url, {
        query: {
          lat: 0,
          lon: 0,
          appId: this.appId
        },
        json: true
      })
    } catch (exception) {
      const reason = JSON.stringify(exception.body)
      throw new Error(`Service failed with ${reason}.`)
    }
  }

  async getWeather (params, units) {
    try {
      return (await got(this.url, {
        query: {
          ...params,
          units,
          appId: this.appId
        },
        json: true
      })).body
    } catch (exception) {
      const paramsId = JSON.stringify(params)

      if (exception instanceof got.HTTPError && exception.statusCode === 404) {
        log.info(`Weather for ${paramsId} not found.`)
      } else {
        const reason = JSON.stringify(exception.body)
        throw new Error(`Weather for ${paramsId} failed with ${reason}.`)
      }
    }
  }
}

export default new Service()
