// let domain = '47.115.212.1:5050'
let domain = process.env.NODE_ENV == 'development' ? '127.0.0.1:8000' : '47.115.212.1:5050'

export default {
  url: `http://${domain}/client`,
  o_url: `http://${domain}`,
  domain
}