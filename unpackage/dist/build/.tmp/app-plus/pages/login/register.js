(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/register"],{"0396":function(t,e,n){"use strict";n.r(e);var a=n("ac92"),o=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,function(){return a[t]})}(i);e["default"]=o.a},"70eb":function(t,e,n){"use strict";var a=n("9e1b"),o=n.n(a);o.a},7479:function(t,e,n){"use strict";(function(t){n("d6b1"),n("921b");a(n("66fd"));var e=a(n("bd65"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},"9e1b":function(t,e,n){},ac92:function(t,e,n){"use strict";(function(t,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=function(){return n.e("components/watch-login/watch-input").then(n.bind(null,"6d4d"))},i=function(){return n.e("components/watch-login/watch-button").then(n.bind(null,"321a"))},r={data:function(){return{phoneData:"",passData:"",verCode:"",showAgree:!0,isRotate:!1,isShowSelect:!1,majorid:"",majordata:{},index:0,httpUrl:this.GLOBAL.httpUrl}},components:{wInput:o,wButton:i},mounted:function(){var e=this;t.request({url:this.httpUrl+"/major/operate/majorList",method:"POST",data:{},header:{"content-type":"application/x-www-form-urlencoded"},success:function(t){0==t.data.code&&(e.majordata=t.data.list)}})},methods:{isShowAgree:function(){this.showAgree=!this.showAgree},getVerCode:function(){var e=this,n=this;if(t.showLoading({title:"正在发送"}),11!=n.phoneData.length)return n.tui.toast("手机号不正确"),!1;t.request({url:this.httpUrl+"/student/operate/msgSend",method:"POST",data:{phoneNum:this.phoneData},header:{"content-type":"application/x-www-form-urlencoded"},success:function(n){0===n.data.code?(t.setStorageSync("textCode",n.data.verifyCode),t.hideLoading(),e.tui.toast("验证码发送成功"),e.$refs.runCode.$emit("runCode")):(t.hideLoading(),e.tui.toast("验证码发送失败"))}})},startReg:function(){var e=this;return this.textCode=t.getStorageSync("textCode"),this.verCode!=this.textCode&&this.tui.toast("验证码输入错误"),!this.isRotate&&(this.passData.length<6?(this.tui.toast("密码不能小于6位"),!1):(t.showLoading({title:"请稍等"}),void t.request({url:this.httpUrl+"/student/operate/register",method:"POST",data:{majorId:this.majorid,password:this.passData,phoneNum:this.phoneData},header:{"content-type":"application/x-www-form-urlencoded"},success:function(n){-2===n.data.code?(t.hideLoading(),e.isRotate=!0,setTimeout(function(){this.isRotate=!1},1e3),t.setStorageSync("userID",n.data.userId),e.tui.toast("注册成功，请上传身份信息"),setTimeout(function(){t.navigateTo({url:"../identity/verification"})},1e3)):0===n.data.code?(t.hideLoading(),e.tui.toast("该账号已经注册了，请直接登录"),setTimeout(function(){t.navigateTo({url:"./login"})},1e3)):(t.hideLoading(),e.tui.toast("该专业人数已满，请选择其他专业"))}})))},bindPickerChange:function(e){console.log(a("picker发送选择改变，携带值为："+e.target.value," at pages/login/register.vue:175")),this.index=e.target.value,this.majorid=this.majordata[this.index].id,t.setStorageSync("MajorID",this.majordata[this.index].id)}}};e.default=r}).call(this,n("6e42")["default"],n("0de9")["default"])},bd65:function(t,e,n){"use strict";n.r(e);var a=n("d67b"),o=n("0396");for(var i in o)"default"!==i&&function(t){n.d(e,t,function(){return o[t]})}(i);n("70eb");var r=n("2877"),s=Object(r["a"])(o["default"],a["a"],a["b"],!1,null,null,null);e["default"]=s.exports},d67b:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return o})}},[["7479","common/runtime","common/vendor"]]]);