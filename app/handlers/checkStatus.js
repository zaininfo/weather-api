import service from '../service'

export default async function (req, res) {
  await service.isUp()
  res.status(204).end()
}
