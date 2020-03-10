(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/major/major"],{"0ee4":function(t,e,n){"use strict";(function(t,o){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=function(){return n.e("components/uni-segmented-control/uni-segmented-control").then(n.bind(null,"3c71"))},i=function(){return n.e("pages/component/major-list").then(n.bind(null,"b12c"))},s=function(){return n.e("pages/component/speciality-modal").then(n.bind(null,"8d32"))},l=function(){return n.e("components/loadmore/loadmore").then(n.bind(null,"cb1b"))},u=function(){return n.e("components/nomore/nomore").then(n.bind(null,"99d9"))},d=function(){return n.e("components/tui-fab/tui-fab").then(n.bind(null,"043b"))},r=function(){return n.e("components/modal/modal").then(n.bind(null,"c428"))},c={components:{majorlist:i,specialityModal:s,tuiLoadmore:l,tuiNomore:u,uniSegmentedControl:a,tuiFab:d,tuiModal:r},data:function(){return{left:0,right:80,items:["待学专业","已学专业"],current:0,specialityModal:!1,confirmLoading:!1,List:[],dataList:[],studentId:0,loadding:!1,pullUpOn:!0,totalPage:1,pageIndex:1,majorId:0,fmajorId:0,httpUrl:this.GLOBAL.httpUrl,bgColor:"#0bc99d",btnList:[{bgColor:"#16C2C2",text:"退出登录",fontSize:20,color:"#fff"},{bgColor:"#64B532",text:"选择专业",fontSize:20,color:"#fff"}],modal:!1,button:[{text:"取消",type:"gray"},{text:"确定"}]}},onLoad:function(t){this.studentId=t.studentId},mounted:function(){this.pullDownRefresh(!1)},methods:{handleClick:function(e){var n=e.index;0===n||t.reLaunch({url:"../login/login"}),this.hide()},hide:function(){this.modal=!1},onClick:function(t){var e=t.index;switch(e){case-1:this.tui.toast("您点击了悬浮按钮");break;case 0:this.modal=!0;break;case 1:this.specialityModal=!this.specialityModal;break;default:break}},cancelModal:function(){console.log(o("您点击了关闭"," at pages/major/major.vue:154"))},hintconfirm:function(){t.navigateTo({url:"../login/login"})},onClickItem:function(t){this.current!==t&&(this.current=t)},CourseList:function(e){console.log(o("该学生的id为："+this.studentId+"该专业的id为："+e," at pages/major/major.vue:167")),t.navigateTo({url:"../course/list?studentId="+this.studentId+"&majorId="+e})},courselist:function(e){console.log(o("该学生的id为："+this.studentId+"该完成专业的id为："+e," at pages/major/major.vue:173")),t.navigateTo({url:"../course/finishlist?studentId="+this.studentId+"&fmajorId="+e})},choose:function(){this.specialityModal=!this.specialityModal},cancel:function(){this.specialityModal=!this.specialityModal},confirm:function(e){console.log(o("重新选择的专业的id为："+e," at pages/major/major.vue:185"));var n=this;t.request({url:n.httpUrl+"/major/operate/majorenroll",method:"POST",data:{majorId:e,studentId:n.studentId},header:{"content-type":"application/x-www-form-urlencoded"},success:function(t){0==t.data.code?(n.tui.toast("选择成功，请等待审核"),n.specialityModal=!n.specialityModal):-1===t.data.code?(n.specialityModal=!n.specialityModal,n.tui.toast("请先完成上一个专业的所有考试，再报名新专业")):(n.specialityModal=!n.specialityModal,n.tui.toast("您重新选择的专业正在审核中，请稍等"))}})},pullDownRefresh:function(e){var n=this;t.request({url:this.httpUrl+"/major/operate/belongMajor?currentPage="+this.pageIndex+"&count=10&studentId="+this.studentId+"&type=0",method:"POST",success:function(t){if(t=t.data,0==t.code){var e=t.pb;n.List=e.list}else n.tui.toast("您的专业正在审核中，请稍等")}}),t.request({url:this.httpUrl+"/major/operate/belongMajor?currentPage="+this.pageIndex+"&count=10&studentId="+this.studentId+"&type=1",method:"POST",success:function(o){if(o=o.data,0===o.code){var a=o.pb,i=a.list;n.totalPage=a.totalPage,n.dataList=i,0!=n.dataList.length&&1!=n.totalPage||(n.loadding=!1,n.pullUpOn=!1),e&&(n.pageIndex=1,n.pullUpOn=!0,n.loadding=!1,t.stopPullDownRefresh(),n.tui.toast("刷新成功"))}else n.pageIndex=1,n.loadding=!1,n.pullUpOn=!1}})},reachBottom:function(){var e=this;t.request({url:this.httpUrl+"/course/operate/courseGetOne?currentPage="+this.pageIndex+"&count=10&studentId="+this.studentId+"&type=0&majorId="+this.majorId,method:"POST",success:function(t){if(t=t.data,0==t.code){var n=t.pb;e.List=n.list}}}),t.request({url:this.httpUrl+"/major/operate/belongMajor?currentPage="+this.pageIndex+"&count=10&studentId="+this.studentId+"&type=1",method:"POST",success:function(t){if(t=t.data,0===t.code){var n=t.pb,o=n.list;e.dataList=e.dataList.concat(o)}else e.loadding=!1,e.pullUpOn=!1}})},onReachBottom:function(){this.pullUpOn&&(this.loadding=!0,this.pageIndex==this.totalPage?(this.loadding=!1,this.pullUpOn=!1):(this.pageIndex=this.pageIndex+1,this.reachBottom()))},onPullDownRefresh:function(){this.pullDownRefresh(!0)}}};e.default=c}).call(this,n("6e42")["default"],n("0de9")["default"])},"14fc":function(t,e,n){"use strict";var o=n("8e87"),a=n.n(o);a.a},"631e":function(t,e,n){"use strict";(function(t){n("d6b1"),n("921b");o(n("66fd"));var e=o(n("df05"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},"7da4":function(t,e,n){"use strict";n.r(e);var o=n("0ee4"),a=n.n(o);for(var i in o)"default"!==i&&function(t){n.d(e,t,function(){return o[t]})}(i);e["default"]=a.a},"7dc4":function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"a",function(){return o}),n.d(e,"b",function(){return a})},"8e87":function(t,e,n){},df05:function(t,e,n){"use strict";n.r(e);var o=n("7dc4"),a=n("7da4");for(var i in a)"default"!==i&&function(t){n.d(e,t,function(){return a[t]})}(i);n("14fc");var s=n("2877"),l=Object(s["a"])(a["default"],o["a"],o["b"],!1,null,null,null);e["default"]=l.exports}},[["631e","common/runtime","common/vendor"]]]);