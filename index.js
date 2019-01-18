require.config({
    waitSeconds: 0,
    paths: {
        "websiteService":"services/websiteService",
        "Vue":"js/vue.min"
    },
    shim: {},
});
define(["websiteService","Vue"], function(websiteService,Vue) {
    let vm = new Vue ({
        el:'#indexMount',
        data:{
            newsList:[],
            fileRoot: CONST.fileRoot + '/',
        },
        mounted(){
            this.$nextTick(()=>{
                websiteService.getNewInformation(function(data){
                    if(data && data.status == "success"){
                        vm.newsList = data.recordList;
                    }
                });
            });
        },
        methods: {
            handleDetail(item){
                let jsonItem = encodeURIComponent(encodeURIComponent(JSON.stringify(item)));
                window.location.href="pages/detail/detail.html?item="+jsonItem;
            },
        }

    });
    let vm1 = new Vue({
        el:'#indexMount1',
        data:{
            msgObj:{
                membername:'',
                mobile:'',
                content:''
            }
        },
        methods:{

            handleSubmit(){
                // return;
                if(!vm1.msgObj.membername){
                    alert("请输入会员名称");
                    vm1.$refs.membername.focus();
                    return false;
                }
                else if(!vm1.msgObj.mobile){
                    alert("请输入手机号码");
                    vm1.$refs.mobile.focus();

                    return false;
                }
                else if(vm1.msgObj.mobile){
                    let reg=/^1[3456789]\d{9}$/;
                    if(!reg.test(vm1.msgObj.mobile)){
                        alert('请输入正确的手机号码');
                        vm1.$refs.mobile.focus();
                        vm1.msgObj.mobile = "";
                    }
                    else if(!vm1.msgObj.content){
                        alert("请输入留言内容");
                        vm1.$refs.content.focus();
                    }else{
                        websiteService.saveOnlinemessage(vm1.msgObj.membername,vm1.msgObj.mobile,vm1.msgObj.content);
                        vm1.msgObj.membername = "";
                        vm1.msgObj.mobile="";
                        vm1.msgObj.content="";
                        alert('留言成功，感谢您的留言！');
                    }
                }

            },
        },
    });
    let vm2 = new Vue({
        el:"#searchMount",
        data:{
            keyword:""
        },
        methods:{
            search(keyword){
                if(!keyword){
                    alert('关键词不能为空');
                    return;
                }
                let item = encodeURIComponent(encodeURIComponent(keyword));
                window.open("pages/search/search.html?keyword="+item,"_blank");
            }
        }
    });
    $(document).on("mousemove", ".item-bg",function () {
        $(this).addClass("animated pulse active")
    }).on("mouseout",".item-bg",function(){
        $(this).removeClass("animated pulse active")
    })

});


