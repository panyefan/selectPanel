
/*
*四级联动选择面板插件，根据数据结构来动态展示一级或者二级等数据项
*潘业繁-2017-11-01
*/

; (function ($, window, document, undefined) {

    var cityObj = function (el, option) {
        //默认参数
        this.defaultOptions = {
            select1Field: 'select1',                                                //第1列字段名
            select2Field: 'select2',
            select3Field: 'select3',
            select4Field: 'select4',
            containerId: 'selectPanel',                                             //地址选择的容器id
            callback: function () { },                                              //选择完毕后的回调函数，回传选择完整的省市县数据
        };

        //合并默认参数和用户传入的参数
        var currentOptions = $.extend({}, this.defaultOptions, option);             // 两个对象合并到空的对象中
        this.currentOptions = currentOptions;

        //定义需要使用的变量
        var $el = $(el),                                                            //当前选择器选中的html元素
            $container = $("#" + this.currentOptions.containerId),                  //地址选择容器对象
            $select1 = $("#" + this.currentOptions.select1Field),
            $lastSelect1 = $("#last" + this.currentOptions.select1Field),
            $select2 = $("#" + this.currentOptions.select2Field),
            $lastSelect2 = $("#last" + this.currentOptions.select2Field),
            $select3 = $("#" + this.currentOptions.select3Field),
            $lastSelect3 = $("#last" + this.currentOptions.select3Field),
            $select4 = $("#" + this.currentOptions.select4Field),
            $lastSelect4 = $("#last" + this.currentOptions.select4Field),
            select1 = [],                                                           //所有的第一项数据
            select2 = [],                                                           //所有的第二项数据
            select3 = [],                                                           //所有的第三项数据
            select4 = [],                                                           //所有的第四项数据
            currentSelect1 = {},                                                    //当前第一列选择的数据项
            currentSelect2 = {},                                                    //当前第二列选择的数据项
            currentSelect3 = {},                                                    //当前第三列选择的数据项
            currentSelect4 = {};                                                    //当前第四列选择的数据项

        //数据处理
        var dataHanlder = {
            disposeSelect1: function () {
                try {
                    toolHanlder.showContent(1);
                    toolHanlder.showLoading();
                    toolHanlder.createHtml(1);

                    //第一个选择点击事件
                    $select1.find("li").click(function () {
                        var $this = $(this);
                        //选择后的样式
                        toolHanlder.liClick($this, 1);
                    });
                } catch (e) {
                    console.log(e.message);
                } finally {
                    toolHanlder.hideLoading();
                }

            },
            disposeSelect2: function () {
                try {
                    toolHanlder.showContent(2);
                    toolHanlder.showLoading();
                    toolHanlder.createHtml(2);

                    $select2.find("li").click(function () {
                        var $this = $(this);
                        toolHanlder.liClick($this, 2);
                    });
                } catch (e) {
                    console.log(e.message);
                } finally {
                    toolHanlder.hideLoading();
                }
            },
            disposeSelect3: function () {
                try {
                    toolHanlder.showContent(3);
                    toolHanlder.showLoading();
                    toolHanlder.createHtml(3);

                    $select3.find("li").click(function () {
                        var $this = $(this);
                        toolHanlder.liClick($this, 3);
                    });
                } catch (e) {
                    console.log(e.message);
                } finally {
                    toolHanlder.hideLoading();
                }
            },
            disposeSelect4: function () {
                try {
                    toolHanlder.showContent(4);
                    toolHanlder.showLoading();
                    toolHanlder.createHtml(4);

                    $select4.find("li").click(function () {
                        var $this = $(this);
                        toolHanlder.liClick($this, 4);
                    });
                } catch (e) {
                    console.log(e.message);
                } finally {
                    toolHanlder.hideLoading();
                }
            },

            //默认回显回显
            loadSelected: function () {
                // 回显第一个选项列
                currentSelect1.name && $lastSelect1.show().text(currentSelect1.name);
                // 将第一个选项之后的列隐藏掉
                $select1.find('li[id="' + currentSelect1.code + '"]').addClass("active");
            }
        };

        //格式化数据
        var loadDataHandler = {
            init: function () {
                var list = currentOptions.list;
                if (!list || list.constructor !== Array || list.length < 1) { return false; }
                select1 = list[0];
                select2 = list[1];
                select3 = list[2];
                select4 = list[3];
                // console.log(select1,select2,select3,select4);
            }
        };

        //工具
        var toolHanlder = {
            //绑定相关事件
            bindEvent: function () {

                //绑定元素点击事件
                $el.click(function () {
                    toolHanlder.show();
                });

                //已经选择的第一列点击事件
                $lastSelect1.click(function () {

                    if ($select1.find("li").length == 0) {
                        dataHanlder.disposeSelect1();
                    } else {
                        $select1.find('li[id="' + currentSelect1.code + '"]').addClass("active");
                    }

                    toolHanlder.showContent(1);
                });

                $lastSelect2.click(function () {

                    if ($select2.find("li").length == 0) {
                        dataHanlder.disposeSelect2();
                    }

                    toolHanlder.showContent(2);
                });

                $lastSelect3.click(function () {

                    if ($select3.find("li").length == 0) {
                        dataHanlder.disposeSelect3();
                    }

                    toolHanlder.showContent(3);
                });

                $lastSelect4.click(function () {
                    toolHanlder.showContent(4);
                });
            },
            //初始化
            init: function () {
                //相关事件绑定
                toolHanlder.bindEvent();
                //加载项目数据
                loadDataHandler.init();

                $lastSelect1.nextAll().text("请选择").hide();
            },
            liClick: function ($el, level) {
                //点击后的选中样式设置
                $el.siblings("li").removeClass("active");
                $el.addClass("active");

                switch (level) {
                    case 1:   //第1列选择面板
                        {
                            //将之后没有被选择的隐藏掉
                            $lastSelect1.nextAll().text("请选择").hide();

                            currentSelect1 = {
                                code: $el.data("code"),
                                name: $el.text()
                            };

                            $lastSelect1.text(currentSelect1.name);
                            // 判断选择的数据项是否还有子数据项
                            if (toolHanlder.isSubMenu(currentSelect1.code, select2)) {
                                $select1.hide();
                                dataHanlder.disposeSelect2();
                            } else {
                                toolHanlder.close();
                            }
                        }
                        break;
                    case 2: //第2列选择面板
                        {
                            $lastSelect2.nextAll().text("请选择").hide();

                            currentSelect2 = {
                                code: $el.data("code"),
                                name: $el.text()
                            };

                            $lastSelect2.text(currentSelect2.name);
                            // 判断选择的数据项是否还有子数据项
                            if (toolHanlder.isSubMenu(currentSelect2.code, select3)) {
                                $select2.hide();
                                dataHanlder.disposeSelect3();
                            } else {
                                toolHanlder.close();
                            }
                        }
                        break;
                    case 3://第3列选择面板
                        {
                            $lastSelect3.nextAll().text("请选择").hide();

                            currentSelect3 = {
                                code: $el.data("code"),
                                name: $el.text()
                            };

                            $lastSelect3.text(currentSelect3.name);
                            // 判断选择的数据项是否还有子数据项
                            if (toolHanlder.isSubMenu(currentSelect3.code, select4)) {
                                $select3.hide();
                                dataHanlder.disposeSelect4();
                            } else {
                                toolHanlder.close();
                            }
                        }
                        break;
                    case 4://第4列选择面板
                        {
                            $lastSelect4.nextAll().text("请选择").hide();

                            currentSelect4 = {
                                code: $el.data("code"),
                                name: $el.text()
                            };

                            $lastSelect4.text(currentSelect4.name);
                            toolHanlder.close();
                        }
                        break;
                };
            },
            // 判断是否有子菜单
            isSubMenu: function (parentId, list) {
                var flag = false;
                for (var i in list) {
                    if (parentId == list[i].parentId) {
                        flag = true;
                        break;
                    }
                }
                return flag;
            },
            //关闭地址选择窗体
            close: function () {
                if ($.isFunction(currentOptions.callback)) {
                    currentOptions.callback(toolHanlder.returnData());
                }

                currentSelect1 = {};
                currentSelect2 = {};
                currentSelect3 = {};
                currentSelect4 = {};

                $container.hide();
            },
            //显示地址选择窗体
            show: function () {

                //先让窗体显示出来
                $container.show();

                dataHanlder.disposeSelect1();
                //加载已经选择过的
                dataHanlder.loadSelected();
            },
            //组装返回数据
            returnData: function () {
                var rsData = {
                    'select1': currentSelect1,
                    'select2': currentSelect2,
                    'select3': currentSelect3,
                    'select4': currentSelect4
                };
                return rsData;
            },
            //显示加载动画
            showLoading: function () {
                $container.find("div.select-content").append('<div class="loading">加载中</div>');
            },
            //隐藏加载动画
            hideLoading: function () {
                $container.find("div.loading").remove();
            },
            //显示对应的区域选择框
            showContent: function (level) {
                $lastSelect1.siblings().addBack().removeClass('active'); //先移除所有的选择效果
                $select1.siblings().addBack().hide();    //将同级别的影藏

                switch (level) {
                    case 1:
                        {
                            $lastSelect1.addClass('active').show();
                            $select1.show();
                        }
                        break;
                    case 2:
                        {
                            $lastSelect2.addClass('active').show();
                            $select2.show();
                        }
                        break;
                    case 3:
                        {
                            $lastSelect3.addClass('active').show();
                            $select3.show();
                        }
                        break;
                    case 4:
                        {
                            $lastSelect4.addClass('active').show();
                            $select4.show();
                        }
                        break;
                }
            },
            //html组装
            createHtml: function (level, para) {
                switch (level) {
                    case 1:
                        {
                            $select1.empty();
                            // 组装第一项选项列
                            for (var p in select1) {
                                // 反显之前已经选择过的数据项
                                if (currentSelect1 && currentSelect1.name && select1[p].code == currentSelect1.code) {
                                    $select1.append('<li city class="active" id="' + select1[p].code + '" data-code="' + select1[p].code + '">' + select1[p].name + '</li>');
                                } else {
                                    $select1.append('<li city id="' + select1[p].code + '" data-code="' + select1[p].code + '">' + select1[p].name + '</li>');
                                }
                            }
                        } break;
                    case 2:
                        {
                            $select2.empty();
                            // 组装第二级选择列
                            for (var i in select2) {
                                if (currentSelect1 && currentSelect1.name) {
                                    // 反显之前已经选择过的数据项
                                    if (currentSelect2 && currentSelect2.name && currentSelect2.code == select2[i].parentId) {
                                        $select2.append('<li city class="active" id="' + select2[i].code + '" data-code="' + select2[i].code + '">' + select2[i].name + '</li>');
                                    } else if (select2[i].parentId == currentSelect1.code) { //筛选上一级选中数据的子项
                                        $select2.append('<li city id="' + select2[i].code + '" data-code="' + select2[i].code + '">' + select2[i].name + '</li>');
                                    }
                                }
                            }
                        } break;
                    case 3:
                        {
                            $select3.empty();
                            for (var i in select3) {
                                // 反显之前已经选择过的数据项
                                if (currentSelect3 && currentSelect3.name && currentSelect3.code == select3[i].parentId) {
                                    $select3.append('<li city class="active" id="' + select3[i].code + '" data-code="' + select3[i].code + '">' + select3[i].name + '</li>');
                                } else if (select3[i].parentId == currentSelect2.code) { //筛选上一级选中数据的子项
                                    $select3.append('<li city id="' + select3[i].code + '" data-code="' + select3[i].code + '">' + select3[i].name + '</li>');
                                }
                            }
                        } break;
                    case 4:
                        {
                            $select4.empty();
                            for (var i in select4) {
                                // 反显之前已经选择过的数据项
                                if (currentSelect4 && currentSelect4.name && currentSelect4.code == select4[i].parentId) {
                                    $select4.append('<li city class="active" id="' + select4[i].code + '" data-code="' + select4[i].code + '">' + select4[i].name + '</li>');
                                } else if (select4[i].parentId == currentSelect3.code) { //筛选上一级选中数据的子项
                                    $select4.append('<li city id="' + select4[i].code + '" data-code="' + select4[i].code + '">' + select4[i].name + '</li>');
                                }
                            }
                        } break;

                }
            }
        };

        toolHanlder.init();
    };

    //联动插件
    $.fn.selectPanel = function (options) {

        return this.each(function () {
            var $this = $(this);

            var data = $this.data("aec.city");

            if (!data) {
                data = new cityObj(this, options);
                $this.data("aec.city", data);
            }
            else if (typeof options == "string") {
                data[options].apply(this, Array.prototype.slice.call(arguments, 1));
            }
        });
    };

})(jQuery, window, document);