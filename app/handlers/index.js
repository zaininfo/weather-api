import Cache from 'express-redis-cache'
import config from 'config'
import Router from 'express-promise-router'
import invariant from 'invariant'
import getWeather from './getWeather'
import getVersion from './getVersion'
import checkStatus from './checkStatus'
import { setCacheKey } from '../utils/middleware'

const prefix = config.cache && config.cache.prefix
invariant(prefix, 'Redis key prefix is required.')

const host = config.cache && config.cache.host
invariant(host, 'Redis host name is required.')

const port = config.cache && config.cache.port
invariant(port, 'Redis port number is required.')

const expiry = config.cache && config.cache.expiryInSec
invariant(expiry, 'Expiry time for cache is required.')

const handlers = Router()
const cache = Cache({ prefix, host, port, expire: expiry })

handlers.get('/weather', setCacheKey, cache.route(), getWeather)
handlers.get('/version', getVersion)
handlers.get('/health-check', checkStatus)

export default handlers
