import fs from 'fs'

const key = fs.readFileSync(`${import.meta.dirname}/key.pem`)
const cert = fs.readFileSync(`${import.meta.dirname}/cert.pem`)

export default {
  key,
  cert
}
