import getWeather from '../queries/getWeather'
import log from '../logger'

export default async function (req, res) {
  const { city, country, lat, lon, units } = req.query

  const latitude = Number(lat)
  const longitude = Number(lon)

  let params

  if (city && country) {
    params = {
      city,
      country
    }
  } else if (!Number.isNaN(latitude) && !Number.isNaN(longitude)) {
    params = {
      lat: latitude,
      lon: longitude
    }
  } else {
    log.error(`Invalid names or coordinates provided.`)
    res.status(400).end()
    return
  }

  if (!['metric', 'imperial'].includes(units)) {
    log.error(`Invalid units provided.`)
    res.status(400).end()
    return
  }

  const weather = await getWeather(params, units)

  if (weather.length) {
    res.json(weather).end()
  } else {
    res.status(404).end()
  }
}
