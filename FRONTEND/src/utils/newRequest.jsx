import axios from "axios";

const newRequests = axios.create({
    baseURL: "https://explore-mate.onrender.com/api/",
    withCredentials: true,
});

export default newRequests;
