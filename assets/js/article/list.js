$(function () {

    getCateList();
    //获取文章类别
    function getCateList() {

        axios.get("/my/article/cates").then(res => {
            if (res.status !== 0) {
                return layer.msg("数据获取失败!", { icon: 2 });
            }
            //添加到下拉选择框中
            res.data.forEach(item => {
                $("#cate-select").append(`<option value="${item.Id}">${item.name}</option>`);
            });
            // 表单对于后添加的元素动态渲染
            layui.form.render();
        });
    }

    //请求参数
    var queryData = {
        pagenum: 1,//页码值
        pagesize: 8,//每页显示多少条数据
        cate_id: null,//文章分类的 Id
        state: null//文章的状态
    }
    // 渲染数据到表格
    function renderTable() {
        axios.get("/my/article/list", {
            params: queryData
        }).then(res => {
            // console.log(res);

            // 模板过滤器,格式化时间
            template.defaults.imports.dateFormat = function (date) {
                return moment().format("YYYY-MM-DD hh:mm:ss");
            };
            // 模板引擎
            var data = template("tpl", res);

            //tbody添加元素
            $("tbody").html(data);

            //调用构造分页器
            renderPage(res.total);
        });
    }

    renderTable();

    //构造分页器
    function renderPage(num) {
        layui.laypage.render({
            elem: 'pagination',//分页器id不用加#
            count: num,//数据总数
            limit: queryData.pagesize,//每一页显示的条数
            limits: [2, 3, 4, 5, 6, 7, 8],//每一页条数选择项
            curr: queryData.pagenum,//起始页
            layout: ["count", "limit", "prev", "page", "next", "skip"],//分页元素排序
            jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数
                queryData.pagenum = obj.curr;
                queryData.pagesize = obj.limit;
                //首次不执行
                if (!first) {
                    renderTable();
                }
            }
        });
    }

    // 文章列表筛选
    $(".select-form").submit(function (e) {
        e.preventDefault();
        // 获取下拉框的值
        queryData.cate_id = $("#cate-select").val();
        queryData.state = $("#state").val();
        // console.log(queryData);

        // 当前页码归为1
        queryData.pagenum = 1;
        renderTable();
    });

    // 删除文章
    $(document).on("click", "#del-btn", function () {

        var id = $(this).data("id");
        //删除提示
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {

            axios.get(`/my/article/delete/${id}`).then(res => {

                if (res.status !== 0) {
                    return layer.msg("删除失败!", { icon: 2 });
                }
                layer.msg("删除成功!", { icon: 1 });

                //若当前页面只有一条数据且不是第一页,那么删除当前页数据时更新上一页的数据
                if ($(this).length == 1 && queryData.pagenum != 1) {
                    queryData.pagenum--;
                }

                renderTable();
            });
            layer.close(index);
        });

    });


    //编辑文章
    $(document).on("click", "#edit-btn", function () {
        const id = $(this).data("id");
        // 页面跳转
        location.href = `./edit.html?id=${id}`;
        window.parent.$(".layui-this").next().find("a").click();
    });

});