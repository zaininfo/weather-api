import toWeather from '../mappers/toWeather'
import service from '../service'

export default async function ({ city, country, lat, lon }, units) {
  let params

  if (city && country) {
    params = {
      q: [city, country].join(',')
    }
  } else {
    params = {
      lat,
      lon
    }
  }

  return toWeather(await service.getWeather(params, units))
}
