$(function () {

    // 密码校验
    layui.form.verify({
        pass: [/^\w{6,12}$/, "密码必须在6 ~ 12 位之间"],
        confirmPass: function (val) {
            if (val !== $("#pass").val()) {
                return "两次密码不一致!";
            }
        }
    });

    $(".layui-form").submit(function (e) {
        e.preventDefault();

        axios.post("/my/updatepwd", $(this).serialize())
            .then(res => {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg("修改密码失败!", { icon: 2 });
                }

                layer.msg("修改密码成功!!", { icon: 1 });

                //清除token
                localStorage.removeItem("token");
                //修改密码成功,退出到登录页
                window.parent.location.href = "../../../login.html";
            });
    });

});