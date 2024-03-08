import applyCaseMiddleware from "axios-case-converter"
import axios from "axios"

const options = {
  ignoreHeaders: true 
}

const client = applyCaseMiddleware(axios.create({
  baseURL:  'https://capitable-api-eb39432eaef1.herokuapp.com/api/v1/'
}), options)

export default client
