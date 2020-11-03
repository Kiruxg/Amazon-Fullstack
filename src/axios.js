import axios from "axios"
const instance = axios.create({
  baseURL: "https://us-central1-clone-9f846.cloudfunctions.net/api"
  //API cloud function URL
  //http://localhost:5001/clone-9f846/us-central1/api
})
export default instance
