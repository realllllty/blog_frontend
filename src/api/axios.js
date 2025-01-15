import axios from "axios";

const api = axios.create({
    baseURL: "",
    timeout: 10000
});

api.interceptors.response.use((res) => {
    if (res.data.code === 0) {
        return Promise.reject(res.msg)
    } else if (res.data.code === 1) {
        return res.data.data;
    }
})

export { api };