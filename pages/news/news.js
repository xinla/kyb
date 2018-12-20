require.config({
    waitSeconds: 0,
    paths: {
        "websiteService":"services/websiteService",
        "Vue":"js/vue.min",
        "DateUtil":"utils/DateUtil"
    },
    shim: {},
});
define(["websiteService","Vue","DateUtil"], function(websiteService,Vue,DateUtil) {
    console.log(Vue);
    var vm = new Vue ({
        el:'#newsMount',
        data:{
            recordList:[{
                title:'',
                content:'',
                imagepath:'',
                createtime:''
            }],
            fileRoot: CONST.fileRoot + '/',
            pageObj:{
                page:1,
                size:10,
                keyword:'',
                totalPage:'',
                changePage:'',
                next(){
                    this.page++;
                    newsPage();
                },
                prev(){
                    this.page--;
                    newsPage();
                },
                reset(){
                    this.page = 1;
                }
            }
        },
        mounted(){
            this.$nextTick(()=>{
                newsPage();
            })
        },

        computed:{
            showPage() {
                return this.pageObj.totalPage && this.pageObj.totalPage != 1;
                newsPage();
            },
            /*TODO---省略号的显示隐藏

            *如果总页数<=7 省略号不显示
            如果总页数>5 省略号显示
            */
            showPointer() {
                if(this.pageObj.totalPage <= 7) return false;
                return this.pageObj.page > 5;
                newsPage();
            },

            /*TODO---最后一个省略号的显示隐藏
            如果总页数==当前页，最后一个省略号隐藏
            反之亦然
            */
            showLastPointer() {
                if(this.pageObj.totalPage == this.pageObj.page) {
                    return false;
                }else {
                    return true;
                }
            },
            /*TODO---下一页显示隐藏
            如果总页数等于当前页数，下一页隐藏
            反之亦然*/
            showPrev() {
                if(this.pageObj.totalPage != this.pageObj.page) {
                    return true;
                }else {
                    return false;
                }
            },
            /*TODO---跳转页input的显示隐藏
            如果总页数<=7 隐藏
            反之亦然*/
            showTip() {
                if(this.pageObj.totalPage <= 7) {
                    return false;
                }else {
                    return true;
                }
            },
            /*TODO---判断当前数字*/

            indexs() {
                let prev = 1, next = this.pageObj.totalPage, pageArr = [];
                if (this.pageObj.totalPage >= 7) {
                    if (this.pageObj.page > 5 && this.pageObj.page < this.pageObj.totalPage - 4) {
                        prev = Number(this.pageObj.page) - 3;
                        next = Number(this.pageObj.page) + 3;
                    } else {
                        if (this.pageObj.page <= 5) {
                            prev = 1;
                            next = 7;
                        } else {
                            next = this.pageObj.totalPage;

                            prev = this.pageObj.totalPage - 6;
                        }
                    }
                }
                while (prev <= next) {
                    pageArr.push(prev);
                    prev++;
                }
                return pageArr;
            },
        },
        methods:{
            // 分页跳转
            jumpPage(val) {
                //如果当前值大于总数或者当前值小于0 reture
                conPage(val);
                newsPage();
            },
            jumpPageSure(val){
                if(!vm.pageObj.changePage){
                    alert('请输入页码');
                    return false;
                }
                conPage(val);
                newsPage();
            },
            handleDetail(item){
                let jsonItem = encodeURIComponent(encodeURIComponent(JSON.stringify(item)));
                window.location.href="../detail/detail.html?item="+jsonItem;
            },
        },


    });
    function newsPage() {
        let params = {
            page:vm.pageObj.page,
            size:vm.pageObj.size,
            keyword:""
        };
        let data = websiteService.getInformationPage(params);
        if(data && data.status == "success") {

            vm.recordList = data.recordPage.list;
            for(let i = 0;i<vm.recordList.length;i++){
                let dataitem = vm.recordList[i];
                let date = dataitem.createtime;
                let dateObj = DateUtil.toDateObj(date);
                Vue.set(dataitem,"dateObj",dateObj);

                //DateUtil.toDateObj(vm.recordList[i])
            }

            //分页---当前页
            let recordPageNum = data.recordPage.pageNumber;
            vm.pageObj.page = recordPageNum;
            //分页---总页数
            let recordTotalPage = data.recordPage.totalPage;
            vm.pageObj.totalPage = recordTotalPage;
        }
    }
    function conPage(val) {
        if(val > vm.pageObj.totalPage || val < 0){
            alert("请输入正确页码");
            vm.pageObj.changePage="";
            return false;
        }else{
            vm.pageObj.page = val;
        }
    }

    $(document).on("mousemove", ".news-item",function () {
        $(this).addClass("animated pulse active")
    }).on("mouseout",".news-item",function(){
        $(this).removeClass("animated pulse active")
    })

});


