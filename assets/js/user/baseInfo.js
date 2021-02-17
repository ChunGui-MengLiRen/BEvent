$(function () {

    function initUserInfo() {
        axios.get("/my/userinfo").then(res => {
            console.log(res);
            //获取失败
            if (res.status !== 0) {
                return layer.msg("获取用户信息失败!", { icon: 2 });
            }
            //自动填充到表单
            layui.form.val("edit", res.data);
        });
    }

    initUserInfo();

    //表单验证
    layui.form.verify({
        nick: [/^\S{1,6}$/, "长度在1-6个字符之间"]
    });


    //表单提交
    $(".submitUserInfo").submit(function (e) {
        //取消表单默认跳转事件
        e.preventDefault();
        console.log($(this).serialize());
        axios.post("/my/userinfo", $(this).serialize())
            .then(res => {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg("修改信息失败!", { icon: 2 });
                }

                layer.msg("修改信息成功!", { icon: 1 });
                // 修改昵称显示
                window.parent.getUserInfo();
            });

    });

    $("#reset-btn").click(function (e) {
        e.preventDefault();
        initUserInfo();
    });





})