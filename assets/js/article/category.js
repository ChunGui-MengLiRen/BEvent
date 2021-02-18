$(function () {

    // 弹出层返回值
    var indexAdd, indexEdit = null;

    //获取文章分类列表
    function getCateList() {
        axios.get("/my/article/cates").then(res => {
            console.log(res);

            if (res.status !== 0) {
                return layer.msg("获取文章分类列表失败!", { icon: 2 });
            }

            // 模板引擎
            var data = template("tel", res);
            // console.log(data);
            //添加到tbody
            $("tbody").html(data);

        });
    }

    getCateList();

    //添加文章类别
    $(".btnAdd").click(function () {
        indexAdd = layer.open({
            type: 1,
            title: '添加文章类别',
            content: $(".add-container").html(),
            area: ['500px', '250px'],
            skin: 'color-class'
        });

        //发送添加文章类别请求
        $(document).on("submit", "#add-form", function (e) {

            //取消表单默认跳转事件
            e.preventDefault();

            axios.post("/my/article/addcates", $(this).serialize()).then(res => {

                if (res.status !== 0) {
                    return layer.msg("添加失败!", { icon: 2 });
                }
                layer.msg("添加成功!", { icon: 1 });
                //关闭弹出层
                layer.close(indexAdd);
                // 渲染数据到页面
                getCateList();
            });

        });

    });


    //编辑文章类别
    $(document).on("click", "#edit-btn", function () {
        // 弹框
        indexEdit = layer.open({
            type: 1,
            title: '编辑文章类别',
            content: $(".edit-container").html(),
            area: ['500px', '250px'],
            skin: 'color-class'
        });

        var id = $(this).data("id");
        //获取数据填充到表单
        axios.get(`/my/article/cates/${id}`).then(res => {

            console.log(res);
            if (res.status !== 0) {
                return layer.msg("获取失败!", { icon: 2 });
            }

            //动态填充表单
            layui.form.val("edit-form", res.data);
        });

        $(document).on("submit", "#edit-form", function (e) {
            e.preventDefault();

            axios.post("/my/article/updatecate", $(this).serialize()).then(res => {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg("更新失败!", { icon: 2 });
                }
                //关闭弹窗
                layer.close(indexEdit);
                // 渲染数据
                getCateList();
            });
        });

    });


    //删除文章类别
    $(document).on("click", "#del-btn", function () {
        var id = $(this).data("id");
        //删除提示
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {

            axios.get(`/my/article/deletecate/${id}`).then(res => {

                if (res.status !== 0) {
                    return layer.msg("删除失败!", { icon: 2 });
                }
                layer.msg("删除成功!", { icon: 1 });
                getCateList();
            });
            layer.close(index);
        });

    });


});