import { version } from '../../package.json'

export default function (req, res) {
  res.json({ version }).end()
}
