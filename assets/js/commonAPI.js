axios.defaults.baseURL = "http://api-breakingnews-web.itheima.net";


// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // console.log("发送请求前>>>", config);

    // 判断请求是否是"/my"开头,是则添加headers请求头信息
    if (config.url.startsWith("/my")) {
        // 获取本地存储的token令牌
        var token = localStorage.getItem("token");
        config.headers.Authorization = token;
        // config.headers = { 'Authorization': token };
    }
    return config;

}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // console.log("接受响应前>>>", response);
    var { message, status } = response.data;
    if (message == "获取用户基本信息失败！" && status == 1) {
        localStorage.removeItem("token");
        location.href = "login.html";
    }
    // 对响应数据做点什么
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});