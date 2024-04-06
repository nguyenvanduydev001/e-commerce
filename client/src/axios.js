import axios from 'axios';
const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URI,
});

// Thêm một interceptor cho request
instance.interceptors.request.use(function (config) {
    // Trước khi gửi request, thực hiện một số thao tác
    let localStorageData = window.localStorage.getItem('persist:shop/user')
    if (localStorageData && typeof localStorageData === 'string') {
        localStorageData = JSON.parse(localStorageData)
        const accessToken = JSON.parse(localStorageData?.token)
        config.headers = { authorization: `Bearer ${accessToken}` }
        return config
    } else return config;
}, function (error) {
    // Xử lý lỗi nếu có
    return Promise.reject(error);
});

// Thêm một interceptor cho response
instance.interceptors.response.use(function (response) {
    // Xử lý dữ liệu response nếu request thành công
    return response.data;
}, function (error) {
    // Xử lý lỗi nếu request không thành công
    return error.response.data;
});

export default instance;
