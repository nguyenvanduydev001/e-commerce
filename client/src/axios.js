import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URI,
});

// Thêm một interceptor cho request
instance.interceptors.request.use(function (config) {
    // Trước khi gửi request, thực hiện một số thao tác
    return config;
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
    return error.data;
});

export default instance;
