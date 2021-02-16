
//获取用户信息
function getUserInfo() {
    axios.get("/my/userinfo",).then(res => {
        console.log(res);
        if (res.status !== 0) {
            return layer.msg("获取用户信息失败!", { icon: 2 });
        }

        //获取昵称若昵称不存在获取用户名
        var name = res.data.nikename || res.data.username;
        //渲染用户名
        $(".nickname").text(name).show();
        //渲染头像
        // 若头像存在显示头像,不存在显示文字头像
        if (res.data.user_pic) {
            $(".avatar").prop("src", res.data.user_pic).show();
            $(".text-avatar").hide();
        } else {
            $(".text-avatar").text(name[0].toUpperCase()).show();
            $(".avatar").hide();
        }
    });
}

$(function () {
    getUserInfo();

    //退出
    $(".logout").click(function () {
        //清除token
        localStorage.removeItem("token");
        //跳转到登录页
        location.href = "login.html";
    });

});
