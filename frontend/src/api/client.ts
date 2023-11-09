import applyCaseMiddleware from "axios-case-converter"
import axios from "axios"

const options = {
  ignoreHeaders: true 
}

const client = applyCaseMiddleware(axios.create({
  baseURL: "https://equity-api-c7b3f7cf04dc.herokuapp.com/api/v1"
}), options)

export default client
