require.config({
    waitSeconds: 0,
    paths: {
        "websiteService":"services/websiteService",
        "Vue":"js/vue.min",
        "util":"js/util"
    },
    shim: {},
});
define(["websiteService","Vue","util"], function(websiteService,Vue,util) {
    var vm = new Vue ({
        el:'#detailMount',
        data:{
            detailObj:{},
            fileRoot: CONST.fileRoot + '/',
            nextObj:{},
            prevObj:{},
            noPrevNews:false,
            hasPrevNews:false,
            noNextNews:false,
            hasNextNews:false,
        },
        mounted(){
            this.$nextTick(()=>{
                // 获取当前新闻
                let data = util.getQueryString("item");
                data = JSON.parse(decodeURIComponent(data));
                vm.detailObj = data;


                // 下一条新闻
                let nextData = websiteService.getNextInformation(vm.detailObj.id);
                vm.nextObj = nextData.record;
                if(nextData.record == null){
                    vm.noNextNews = true;
                    vm.hasNextNews = false;
                }else{
                    vm.noNextNews = false;
                    vm.hasNextNews = true;
                }
                // 上一条新闻
                let prevData = websiteService.getLastInformation(vm.detailObj.id);
                vm.prevObj = prevData.record;
                if(prevData.record == null){
                    vm.noPrevNews = true;
                    vm.hasPrevNews = false;
                }else{
                    vm.noPrevNews = false;
                    vm.hasPrevNews = true;
                }

            });

        },

        methods:{
            handleDetail(item){
                let jsonItem = encodeURIComponent(encodeURIComponent(JSON.stringify(item)));
                window.location.href="../detail/detail.html?item="+jsonItem;
            }
        },

    });
    let vm1 = new Vue({
        el:"#searchMount",
        data:{
            keyword:""
        },
        methods:{
            search(keyword){
                if(!keyword){
                    alert("关键词不能为空");
                    return;
                }
                let item = encodeURIComponent(encodeURIComponent(keyword))
                window.open("../search/search.html?keyword="+item,"_blank");
            }
        }
    });

});


