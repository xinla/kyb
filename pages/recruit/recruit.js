require.config({
    waitSeconds: 0,
    paths: {
        "Vue":"js/vue.min",

    },
    shim: {},
});
define(["Vue"], function(Vue) {
    let vm = new Vue({
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



