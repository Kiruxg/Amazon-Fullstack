import axios from "axios";
/** base url to make requests to the movie database */
const instance = axios.create({
  baseURL: "https://us-central1-clone-9f846.cloudfunctions.net/api",
  //API cloud function URL
  //http://localhost:5001/clone-9f846/us-central1/api
});
export default instance;
