(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/login"],{"49b1":function(t,n,e){"use strict";(function(t){e("d6b1"),e("921b");a(e("66fd"));var n=a(e("8722"));function a(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("6e42")["createPage"])},8722:function(t,n,e){"use strict";e.r(n);var a=e("b1eb"),o=e("ca0d");for(var i in o)"default"!==i&&function(t){e.d(n,t,function(){return o[t]})}(i);e("b327");var u=e("2877"),c=Object(u["a"])(o["default"],a["a"],a["b"],!1,null,"16bdac3b",null);n["default"]=c.exports},9733:function(t,n,e){"use strict";(function(t,a){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=function(){return e.e("components/watch-login/watch-input").then(e.bind(null,"6d4d"))},i=function(){return e.e("components/watch-login/watch-button").then(e.bind(null,"321a"))},u=function(){return e.e("pages/component/unik-modal").then(e.bind(null,"9019"))},c={data:function(){return{modalTitle:"提示",phoneData:"",passData:"",isRotate:!1,StudentInfo:{},httpUrl:this.GLOBAL.httpUrl}},components:{wInput:o,wButton:i,unikModal:u},methods:{checkconfirm:function(){t.navigateTo({url:"../identity/verification"})},cancelModal:function(){console.log(a("您点击了关闭"," at pages/login/login.vue:67"))},isLogin:function(){},startLogin:function(n){var e=this;if(e.isRotate)return!1;""!=e.phoneData.length?""!=e.passData.length?(t.showLoading({title:"请稍等"}),t.request({url:e.httpUrl+"/student/operate/login",method:"POST",data:{userName:e.phoneData,password:e.passData},header:{"content-type":"application/x-www-form-urlencoded"},success:function(a){0===a.data.code?(t.hideLoading(),e.isRotate=!0,setTimeout(function(){e.isRotate=!1},1e3),e.tui.toast("登录成功"),e.StudentInfo=a.data.student,n=e.StudentInfo.id,t.setStorageSync("studentId",e.StudentInfo.id),setTimeout(function(){t.navigateTo({url:"../major/major?studentId="+n})},1e3)):-2===a.data.code?(t.hideLoading(),t.setStorageSync("userID",a.data.userId),e.tui.toast("未完善身份信息，请先上传身份证照片"),setTimeout(function(){t.navigateTo({url:"../identity/verification"})},2e3)):-3===a.data.code?(t.hideLoading(),e.tui.toast("您的信息暂未完成审核，请稍后再来")):-4===a.data.code?e.$refs.checkmodal.show():(t.hideLoading(),e.tui.toast("用户名或密码错误"))}})):e.tui.toast("密码不能为空"):e.tui.toast("用户名不能为空")}}};n.default=c}).call(this,e("6e42")["default"],e("0de9")["default"])},a08b:function(t,n,e){},b1eb:function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement;t._self._c},o=[];e.d(n,"a",function(){return a}),e.d(n,"b",function(){return o})},b327:function(t,n,e){"use strict";var a=e("a08b"),o=e.n(a);o.a},ca0d:function(t,n,e){"use strict";e.r(n);var a=e("9733"),o=e.n(a);for(var i in a)"default"!==i&&function(t){e.d(n,t,function(){return a[t]})}(i);n["default"]=o.a}},[["49b1","common/runtime","common/vendor"]]]);