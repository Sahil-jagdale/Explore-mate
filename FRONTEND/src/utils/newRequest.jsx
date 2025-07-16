import axios from "axios";

const newRequests = axios.create({
    baseURL: "http://localhost:3000/api/",
    withCredentials: true,
});

export default newRequests;