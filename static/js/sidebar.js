/**
 * Created by chief on 16/7/15.
 */
define('sidebar',['./widget'],function(widget){
    var init = function (container){

        var template =  require('html!../../static/page/sidebar.html');

        $(container).html(template);




        widgetshow(container);

        //widgetContentShow();
    };

    var widgetshow = function(container){
        var widget  = $(container).find('.widget-type li');
        var widgetContent =  $(container).find('.sidebar-panels');
        var widgetContainer = $(container).find('.sidebar-panel-container');

        widget.on('click',function(e){
            var i = $(this).index();
            widgetContent.hide();
            widgetContent.eq(i).show();
            var widget = $(this).attr("widget");
            var type = $(this).attr("type");
            if($("#"+widget+"container").length === 0){
                var template = require('html!../../static/page/widget/'+widget+'.html');
                var secondWidgetContainer = "<div id='"+widget+"container'>"+template+"</div>";



                widgetContent.eq(i).find('.panel-body').html(secondWidgetContainer);

                if(widget === "checkbox" || widget == "radio"){
                    // 如果是checkbox或者radio需要调用样式方法初始化样式
                    u.compMgr.updateComp();
                }

                var widgetElement = widgetContent.eq(i).find(".u-drag");
                var defaultElement = widgetContent.eq(i).find('.lay-box');
                console.log(defaultElement);

                if(type=='layout'){
                    drag(widgetElement,'#container-content .widgetBox','layout');
                }
                else if(type=='widget') {
                    drag(widgetElement,'.layoutBox .widgetBox','widget');
                }
                drag(defaultElement,'#container-content .widgetBox','widget');
            }
            // $("#"+widget+"container").css("left","90px");
            // widgetContainer.show(");
            // $("#"+widget+"container").show();
            // widgetContainer.removeAttr("style").removeClass('collapse in').show();
        });

    };
    /*
        侧边工具二级菜单显示
    */
    var widgetContentShow = function(){
        var widgetContent = $(".widget-list li");
        var widgetContainer = $("#sidebar-container");

         widgetContent.on('mouseenter',function(){
            $(".second-widget").hide();
            var widget = $(this).attr("widget");
            if($("#"+widget+"container").length === 0){
                var template = require('html!../../static/page/widget/'+widget+'.html');
                var secondWidgetContainer = "<div id='"+widget+"container' class='second-widget'>"+template+"</div>";
                $(this).after(secondWidgetContainer);
                if(widget === "checkbox" || widget == "radio"){
                   // 如果是checkbox或者radio需要调用样式方法初始化样式
                    u.compMgr.updateComp();
                }
            }
            $("#"+widget+"container").show();
         })

         widgetContainer.on('mouseleave',function(){
            // $(".second-widget").css("left":"-170px");
         })

    }

    var drag = function(elements,place,type){
        require.ensure(['./../trd/jquery-ui/jquery-ui'],function() {

            var ui = require('./../trd/jquery-ui/jquery-ui');

            var helper = (type=='layout')?'clone':function(event, ui){
                var i = $(this).index(0)+1;
                var name = $(this).attr('widget');
                var template = require('html!../../static/page/widget/'+name+'.html');

                return $(template).addClass('u-drag');
            };

            $(elements).draggable({
                connectToSortable: place,
                helper: helper,
                start:function(event,ui){
                    ui.helper.css('width',"300px");
                    if(type=='widget'){
                        widget.init(ui.helper[0],$(this).attr('widget'));
                    }
                    

                },
                snapMode: "outer",
                stop: function (event, ui) {
                    ui.helper.removeAttr("style");
                    var target = $(event.target);
                    var html =
                        '<div class="widget-menubar"><ul>'+
                        '<li><i class="uf uf-reply btn btn-outline btn-pill-right icon-max" data-type="window" title="回退"></i></li>'+
                        '<li><i class="uf btn btn-outline btn-pill-right icon-max" data-type="window" title="回退" style="font-size:15px;">T</i></li>'+
                        '<li><i class="uf uf-pencil  btn btn-outline btn-pill-left icon-pencil" data-type="edit"  data-toggle="modal" data-target="#modalBlue" title="编辑"></i></li>' +
                        '<li><i class="uf uf-linksymbol btn btn-outline icon-unfold" data-type="collage" title="链接"></i></li>' +
                        '<li><i class="uf uf-trash  btn btn-outline icon-cancel02" data-type="del" title="删除"></i></a></li></ul></div>';

                    ui.helper.append(html);

                }
            });
        });
    };
    return {
        init:init
    }
});