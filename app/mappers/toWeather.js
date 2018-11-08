import get from 'lodash/get'

export default function ({ list = [] } = {}) {
  const threeDayForecast = list.filter((_, index) => index % 8 === 0).slice(0, 3)

  return threeDayForecast.map(dailyForecast => {
    return {
      temperature: get(dailyForecast, 'main.temp'),
      precipitation: get(dailyForecast, 'rain.3h'),
      humidity: get(dailyForecast, 'main.humidity'),
      wind: get(dailyForecast, 'wind.speed')
    }
  })
}
