import applyCaseMiddleware from "axios-case-converter"
import axios from "axios"

const options = {
  ignoreHeaders: true 
}

const baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:3001/api/v1/"

const client = applyCaseMiddleware(axios.create({
  baseURL: baseURL
}), options)

export default client
