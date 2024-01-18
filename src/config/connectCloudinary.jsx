import axios from "axios";
const connectCloudinary = axios.create({
    baseURL: `${import.meta.env.VITE_CLOUDINARY}`
})
export default connectCloudinary