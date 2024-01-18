import axios from "axios";
const connectAxios =  axios.create({
    baseURL: `${import.meta.env.VITE_URL_API}/api`
})
export default connectAxios