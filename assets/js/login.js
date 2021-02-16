$(function () {

    //点击链接切换表单注册和登录
    $(".link a").click(function () {
        $(".layui-form").toggle();
    });

    //表单验证方法 layui.form.verify
    layui.form.verify({
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [
            /^[\w]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 验证两次密码是否一致
        samePass: function (value) {
            if (value != $("#pass").val()) {
                return "两次密码不一致！";
            }
        }
    });



    // 账号注册
    $(".reg-form").submit(function (e) {
        // 取消表单默认跳转事件
        e.preventDefault();
        axios.post("/api/reguser", $(this).serialize())
            .then((res) => {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('注册失败!', { icon: 2 });
                }
                // 弹框
                layer.msg('注册成功', { icon: 1 });
                //跳转到登录界面
                $(".layui-form").toggle();
            });
    });


    // 登录
    $(".login-form").submit(function (e) {
        // 取消表单默认跳转事件
        e.preventDefault();

        axios.post("/api/login", $(this).serialize())
            .then(function (res) {
                console.log(res);

                if (res.status !== 0) {
                    return layer.msg("登录失败", { icon: 2 });
                }
                layer.msg("登录成功", { icon: 1 });
                // 把令牌添加到本地存储
                localStorage.setItem("token", res.token);
                // 跳转到主页
                location.href = "index.html";
            });
    });
});