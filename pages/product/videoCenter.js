require.config({
    waitSeconds: 0,
    paths: {
        "Vue":"js/vue.min",
        "articleService":"services/articleService",
        "userService":"services/userService",
        "articleFileService":"services/article_fileService",
        "articleClassifyService":"services/article_classifyService",
        "videoService":"services/videoService"

    },
    shim: {},
});
define(["Vue","articleService","userService","articleFileService","articleClassifyService","videoService"], function(Vue,articleService,userService,articleFileService,articleClassifyService,videoService) {
    var vm = new Vue ({
        el:'#videoMount',
        data:{
            fileRoot: CONST.fileRoot + '/',
            videoFile:[],
            classify:7,
            videoList:[],
            page:1,
            lock:false,
            ifLoading:false,
            scrollTop:0,
            timer:null,
            tip:'正在加载...',
            nowIndex:0,
            newList:{}

        },
        mounted(){
            this.$nextTick(()=>{
                let data = videoService.getVideoList();
                vm.videoList = data;
                this.newList =this.videoList[0];
                this.nowIndex=0;
            })

        },
        methods:{
            init(){

            },
            handleVideo(item,index){
                this.newList = item;
                this.nowIndex=index;
            }
            /*init(){
                // 获取文章分类
                articleClassifyService.getArticleClassifyList((data)=>{
                    if(data && data.status == "success"){
                        vm.classify = data.result.classfyList;
                    }
                });
                // 获取文章视频列表
                let videoData = articleService.articleVideoPage(this.page,10,this.classify,2);
                if(videoData && videoData.status == "success"){
                    this.videoList = this.videoList.concat(videoData.recordPage.list);
                    if(videoData.recordPage.list.length) {
                        this.page++;
                    }else{
                        vm.ifLoading = true;
                        vm.tip="已加载全部"
                    }
                    for(let i = 0; i<this.videoList.length; i++){
                        // 获取视频发布人信息
                        let userInfoData = userService.getUserById(this.videoList[i].author);
                        if(userInfoData && userInfoData.status == "success"){
                            this.$set(this.videoList[i],'imageurl',userInfoData.result.user.imageurl);
                            this.$set(this.videoList[i],'username',userInfoData.result.user.username);
                        }
                        // 获取视频封面
                        articleFileService.getFileByArticle(this.videoList[i].id,(data)=>{
                            if(data && data.status == "success"){
                                this.$set(this.videoList[i],'thumbnail',data.result.filelist[0].thumbnail)
                                this.$set(this.videoList[i],'url',data.result.filelist[0].url);
                            }
                        })
                    }
                    articleFileService.getFileByArticle(926,(data)=>{
                        if(data && data.status == "success"){
                            console.log(data)
                            console.log(data.result.filelist[0].filename)
                            console.log(data.result.filelist[0].thumbnail)
                            console.log(data.result.filelist[0].url)
                        }
                    })
                    this.newList =this.videoList[0];
                    this.nowIndex=0;

                }
            },
            loadMore(e){
                this.throttle(this._loadMore,this,e);
            },
            // 函数节流控制
            throttle(method,context,arg){
                let cur = +new Date();
                if (cur - (method.last || 0) > 20) {
                    method.call(context,arg);
                    method.last = cur;
                }
            },
            _loadMore(e){
                this.scrollTop = $(e.target).scrollTop();
                clearTimeout(this.timer);
                this.timer = setTimeout(()=>{
                    if (!this.lock && ($(e.target).scrollTop() + $(e.target).height() + 10) >= e.target.scrollHeight) {
                        this.getMoreVideo();
                    }
                },150);
            },
            getMoreVideo(){
                this.lock = true;
                try{
                    this.init();
                }finally {
                    this.lock = false;
                }
            },
            handleVideo(item,index){
                this.newList = item;
                this.nowIndex=index;
            }*/
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





























