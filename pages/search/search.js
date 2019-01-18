require.config({
    waitSeconds: 0,
    paths: {
        "Vue":"js/vue.min",
        "searchService":"services/searchService",
        "websiteService":"services/websiteService",
        "Tool":"utils/methodUtil",
        "util":"js/util"

    },
    shim: {},
});
define(["Vue","searchService","websiteService","Tool","util"], function(Vue,searchService,websiteService,Tool,util) {
    var vm = new Vue ({
        el:'#searchMount',
        data:{
            keyword:"",
            _keyword:"",
            page:1,
            searchResult:[],
            searchTip:"",
            fileRoot: CONST.fileRoot + '/',
            isLoad:false,
            keywordShow:false

        },
        mounted(){
            this.$nextTick(()=>{
                vm.keywordShow = false;
                let data = util.getQueryString("keyword");
                data = decodeURIComponent(data);
                vm.keyword = data;
                this.handleSearch();
            });
        },
        methods:{
            handleSearch(){
                if(!this.keyword){return;}
                if(!Tool.checkInput(this.keyword)){
                    this.keyword = Tool.replaceNo(this.keyword);
                    alert("搜索内容不合法，已为您删除，请重新输入！")
                    return;
                }
                this._keyword = this.keyword;
                this.searchResult = [];
                this.page =1;
                searchService.addSearchRecord(this.keyword);
                vm.keywordShow = true;
                this.search();
            },
            search(){
                this.isLoad = true;
                let data = websiteService.searchInfoPage(this.page,10,this._keyword);
                if(data && data.status == "success"){
                    let resData = data.recordPage.list;
                    let lenData = resData.length;
                    let regData = new RegExp(this._keyword, 'g');
                    if(!lenData && this.searchResult.length){
                        this.searchTip = "已加载全部";
                        return;
                    }

                    for(let i =0;i < lenData; i++){
                        let temp = resData[i];
                        this.searchResult.push({
                            id:temp.id,
                            title:temp.title,
                            content:temp.content,
                            imagepath:temp.imagepath,
                            createtime: temp.createtime

                        });
                    }
                    this.isLoad = false;
                    if (!this.searchResult.length) {
                        this.searchTip = '暂无相关数据';
                        return;
                    }else{
                        this.searchTip = '点击加载更多';
                    }
                    this.page++;
                }
            },
            handleDetail(item){
                let jsonItem = encodeURIComponent(encodeURIComponent(JSON.stringify(item)));
                // window.location.href="../detail/detail.html?item="+jsonItem;
                window.open("../detail/detail.html?item="+jsonItem,'_blank');
            },
        },
    });

});





























