require.config({
    waitSeconds: 0,
    paths: {
        "teamService":"services/teamService",
        "Vue":"js/vue.min",
        "util":"js/util"
    },
    shim: {},
});
define(["teamService","Vue"], function(teamService,Vue) {
    let vm = new Vue ({
        el:'#teamApp',
        data:{
            teamList:[]
        },
        mounted(){
            this.$nextTick(()=>{
                let data = teamService.getTeamList();
                vm.teamList = data;
            });
        }

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
    let swiper = new Swiper('.aboutUs-second .content-wrap', {
        slidesPerView: 4,
        spaceBetween: 25,
        slidesPerGroup: 4,
        loop: true,
        loopFillGroupWithBlank: true,
        /* pagination: {
             el: '.swiper-pagination',
             clickable: true,
         },*/
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
});


