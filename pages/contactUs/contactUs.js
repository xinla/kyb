require.config({
    waitSeconds: 0,
    paths: {
        "websiteService":"services/websiteService",
        "Vue":"js/vue.min",
        "util":"js/util"
    },
    shim: {},
});
define(["websiteService","Vue"], function(websiteService,Vue) {
    var vm = new Vue ({
        el:'#messageApp',
        data:{
            msgObj:{
                membername:'',
                mobile:'',
                content:''
            }
        },

        methods:{
            handleSubmit(){
                if(!vm.msgObj.membername){
                    alert("请输入会员名称");
                    vm.$refs.membername.focus();
                    return false;
                }
                else if(!vm.msgObj.mobile){
                    alert("请输入手机号码");
                    vm.$refs.mobile.focus();

                    return false;
                }
                else if(vm.msgObj.mobile){
                    let reg=/^1[3456789]\d{9}$/;
                    if(!reg.test(vm.msgObj.mobile)){
                        alert('请输入正确的手机号码');
                        vm.$refs.mobile.focus();
                        vm.msgObj.mobile = "";
                    }
                    else if(!vm.msgObj.content){
                        alert("请输入留言内容");
                        vm.$refs.content.focus();
                    }else{
                        websiteService.saveOnlinemessage(vm.msgObj.membername,vm.msgObj.mobile,vm.msgObj.content);
                        vm.msgObj.membername = "";
                        vm.msgObj.mobile="";
                        vm.msgObj.content="";
                        alert('留言成功，感谢您的留言！');
                    }
                }

            },
        },

    });

});


