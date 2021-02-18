$(function () {

    getCateList();

    // 文章发表状态
    var state = null;

    //获取文章类别
    function getCateList() {

        axios.get("/my/article/cates").then(res => {
            if (res.status !== 0) {
                return layer.msg("数据获取失败!", { icon: 2 });
            }
            console.log(res);
            //添加到下拉选择框中
            res.data.forEach(item => {
                $("#cate-select").append(`<option value="${item.Id}">${item.name}</option>`);
            });
            // 表单对于后添加的元素动态渲染
            layui.form.render();

        });
    }

    //初始化富文本编辑器
    initEditor();


    var $image = $('#image');
    // 图片裁剪区域
    $image.cropper({
        // 长宽比
        aspectRatio: 400 / 280,
        // 预览区域
        preview: ".img-preview"
    });

    // 弹出文件选择框
    $("#upload-btn").click(function () {
        $("#file").click();
    });


    //文件框文件改变事件
    $("#file").change(function () {

        const file = this.files[0];
        // 未选中文件则返回
        if (file == null) {
            return;
        }
        // 图片转化为URL
        const imageURL = URL.createObjectURL(file);
        // 替换裁剪区图片
        $image.cropper("replace", imageURL);
    });

    //表单提交事件
    $(".publish-form").submit(function (e) {
        //取消默认跳转事件
        e.preventDefault();
        //实例化FormData
        const fd = new FormData(this);
        //添加状态信息
        fd.append("state", state);

        //把裁剪区域的图片转化为blob二进制数据
        $image.cropper("getCroppedCanvas", {
            width: 100,
            height: 100
        }).toBlob(blobImage => {
            //二进制图片添加到fd
            fd.append("cover_img", blobImage);
            // console.log(blobImage);

            //发送请求
            axios.post("/my/article/add", fd).then(res => {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(state == "草稿" ? "存为草稿失败" : "发布文章失败!", { icon: 2 });
                }

                layer.msg(state == "草稿" ? "存为草稿成功" : "发布文章成功!", { icon: 1 });

                // 页面跳转
                location.href = "list.html";
                window.parent.$(".layui-this").prev().find("a").click();
            });

        });




    });


    //单击提交按钮获取文章的状态 >> 已发布|草稿
    $(".btn-state button").click(function () {
        state = $(this).data("state")
        // console.log(state);
    });


});