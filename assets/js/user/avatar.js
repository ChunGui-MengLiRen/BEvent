$(function () {
    var $image = $("#image");
    $image.cropper({
        // 长宽比
        aspectRatio: 1,
        // 渲染到预览区
        preview: ".img-preview"
    });

    //单击按钮上传文件
    $("#upload").click(function () {
        $("#file").click();
    });

    // 文件框文件内容改变事件
    $("#file").change(function () {

        console.log(this.files);
        //文件未上传则返回
        if (this.files.length == 0) {
            return;
        }
        //图片转化为url
        const imgURL = URL.createObjectURL(this.files[0]);

        //替换图片区的图片
        $image.cropper("replace", imgURL);
    });

    //头像上传到服务器
    $("#save").click(function () {

        //把裁剪区域的图片转化为base64格式
        const dataURL = $image.cropper("getCroppedCanvas", {
            width: 100,
            height: 100
        }).toDataURL('image/jpeg');

        // 创建查询参数对象
        const avatar = new URLSearchParams();
        //向查询参数添加内容
        avatar.append('avatar', dataURL);

        //发送ajax请求
        axios.post("/my/update/avatar", avatar).then(res => {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg("更换头像失败!", { icon: 2 });
            }

            layer.msg("更换头像成功!", { icon: 1 });
            // 渲染头像信息
            window.parent.getUserInfo();
        });
    });


});