// @ts-ignore
import ROUTER_NAME from '#/routes/config'
import axios from 'axios'

const HOST = 'http://192.168.31.11:3001'

function getUser() {
  axios.get(`${HOST}/${ROUTER_NAME.USER}`).then((response) => {
    console.log(response.data)
  })
}

export { getUser }
