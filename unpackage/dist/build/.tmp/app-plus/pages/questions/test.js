(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/questions/test"],{"0660":function(t,e,s){"use strict";var i=s("2f93"),o=s.n(i);o.a},"2b82":function(t,e,s){"use strict";s.r(e);var i=s("f9de"),o=s.n(i);for(var n in i)"default"!==n&&function(t){s.d(e,t,function(){return i[t]})}(n);e["default"]=o.a},"2f93":function(t,e,s){},accb:function(t,e,s){"use strict";s.r(e);var i=s("d8fe"),o=s("2b82");for(var n in o)"default"!==n&&function(t){s.d(e,t,function(){return o[t]})}(n);s("0660");var u=s("2877"),a=Object(u["a"])(o["default"],i["a"],i["b"],!1,null,"09eefd16",null);e["default"]=a.exports},d8fe:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement;t._self._c},o=[];s.d(e,"a",function(){return i}),s.d(e,"b",function(){return o})},e40c:function(t,e,s){"use strict";(function(t){s("d6b1"),s("921b");i(s("66fd"));var e=i(s("accb"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,s("6e42")["createPage"])},f9de:function(t,e,s){"use strict";(function(t,s){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{userFavor:!1,currentType:0,subjectIndex:0,autoShowAnswer:!1,autoRadioNext:!0,swiperHeight:"800px",title:"课后习题",checkedValue:"",subjectList:[],chapterId:0,Value:"",rightAnswer:"",majorId:0,httpUrl:this.GLOBAL.httpUrl}},onReady:function(){var e=800,i=this;t.getSystemInfo({success:function(o){e=o.windowHeight,console.log(s("屏幕可用高度 "+e," at pages/questions/test.vue:85")),t.createSelectorQuery().select("#top-box").fields({size:!0,scrollOffset:!0},function(o){e-=o.height,console.log(s("减掉顶部后的高度 "+e," at pages/questions/test.vue:96")),t.createSelectorQuery().select("#foot-box").fields({size:!0,scrollOffset:!0},function(t){e-=t.height,console.log(s("减掉底部后的高度 "+e," at pages/questions/test.vue:107")),i.swiperHeight=e+"px",console.log(s("滑屏最后高度 "+i.swiperHeight," at pages/questions/test.vue:109"))}).exec()}).exec()}})},onLoad:function(t){console.log(s(t," at pages/questions/test.vue:120")),this.chapterId=t.chapterId,this.majorId=t.majorId,console.log(s("章节id"+this.chapterId," at pages/questions/test.vue:123")),console.log(s("专业id"+this.majorId," at pages/questions/test.vue:124"))},mounted:function(){var e=this;t.request({url:this.httpUrl+"/exam/operate/homework",method:"POST",data:{chapterId:this.chapterId},header:{"content-type":"application/x-www-form-urlencoded"},success:function(t){0===t.data.code&&(console.log(s("请求成功"," at pages/questions/test.vue:140")),e.subjectList=t.data.list,e.currentType=e.subjectList[0].questionType)}})},methods:{SwiperChange:function(t){var e=t.target.current;void 0!=e&&(this.subjectIndex=e,this.currentType=this.subjectList[e].questionType,this.userFavor=this.subjectList[e].userFavor)},RadioboxChange:function(t){this.subjectList[this.subjectIndex].answerList;var e=t.detail.value;console.log(s("我选中的："+e," at pages/questions/test.vue:162")),console.log(s("正确答案："+this.subjectList[this.subjectIndex].rightList," at pages/questions/test.vue:163")),e==this.subjectList[this.subjectIndex].rightList&&this.autoRadioNext&&this.subjectIndex<this.subjectList.length-1?this.subjectIndex+=1:this.subjectIndex!=this.subjectList.length-1&&this.tui.toast("答案错误请重新选择"),this.subjectIndex===this.subjectList.length-1&&(this.Value=e,this.rightAnswer=this.subjectList[this.subjectIndex].rightList)},CheckboxChange:function(t){var e=this.subjectList[this.subjectIndex].answerList;console.log(s(e," at pages/questions/test.vue:177"));var i=t.detail.value,o=this.subjectList[this.subjectIndex].rightList.join(""),n=i.join("");console.log(s("我选中的："+i," at pages/questions/test.vue:181")),console.log(s("正确答案："+this.subjectList[this.subjectIndex].rightList," at pages/questions/test.vue:182"));for(var u=0,a=e.length;u<a;++u){var c=e[u];console.log(s(c," at pages/questions/test.vue:185")),i.includes(c.index)?this.$set(c,"checked",!0):this.$set(c,"checked",!1)}n==o&&this.autoRadioNext&&this.subjectIndex<this.subjectList.length-1&&(this.subjectIndex+=1),this.subjectIndex===this.subjectList.length-1&&(this.Value=n,this.rightAnswer=o)},submit:function(){var e=this;console.log(s(this.Value," at pages/questions/test.vue:201")),console.log(s(this.rightAnswer," at pages/questions/test.vue:202"));var i=t.getStorageSync("studentId");t.request({url:this.httpUrl+"/exam/operate/completeExam",method:"POST",data:{msgId:this.chapterId,studentId:i,majorId:this.majorId,type:1},header:{"content-type":"application/x-www-form-urlencoded"},success:function(i){if(0===i.data.code&&e.subjectIndex+1===e.subjectList.length&&e.Value==e.rightAnswer){e.tui.toast("提交成功");var o=i.data.id,n=e.majorId;console.log(s(n," at pages/questions/test.vue:221")),setTimeout(function(){t.redirectTo({url:"../course/detail?courseId="+o+"&majorId="+n})},1e3)}else e.subjectIndex+1!=e.subjectList.length?e.tui.toast("请您完成所有习题再提交"):e.tui.toast("答案错误请重新选择")}})}}};e.default=i}).call(this,s("6e42")["default"],s("0de9")["default"])}},[["e40c","common/runtime","common/vendor"]]]);