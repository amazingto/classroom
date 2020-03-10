<template>
	<view class="login">
		<view class="content">
			<!-- 头部logo -->
			<!-- <view class="header"><image :src="logoImage"></image></view> -->
			<view class="header"><image src="../../static/logo1.png"></image></view>
			<!-- 主体表单 -->
			<view class="main">
				<wInput v-model="phoneData" type="text" maxlength="11" placeholder="电话"></wInput>
				<wInput v-model="passData" type="password" placeholder="密码"></wInput>
			</view>
			<wButton text="登 录" :rotate="isRotate" @click.native="startLogin(StudentInfo.id)"></wButton>

			<!-- 其他登录 -->
			<!-- <view class="other_login cuIcon">
				<view class="login_icon">
					<view class="cuIcon-weixin" @tap="login_weixin"></view>
				</view>
				<view class="login_icon">
					<view class="cuIcon-weibo" @tap="login_weibo"></view>
				</view>
				<view class="login_icon">
					<view class="cuIcon-github" @tap="login_github"></view>
				</view>
			</view> -->

			<!-- 底部信息 -->
			<view class="footer">
				<navigator url="forget" open-type="navigate">找回密码</navigator>
				<text>|</text>
				<navigator url="register" open-type="navigate">注册账号</navigator>
			</view>
		</view>
		<unik-modal ref="checkmodal" :modalTitle="modalTitle" @confirmModal="checkconfirm" @cancelModal="cancelModal">您的审核未通过，请重新上传身份证</unik-modal>
	</view>
</template>

<script>
var _this;
import wInput from '../../components/watch-login/watch-input.vue'; //input
import wButton from '../../components/watch-login/watch-button.vue'; //button
import unikModal from '../component/unik-modal.vue';

export default {
	data() {
		return {
			modalTitle: '提示',
			phoneData: '', //用户/电话
			passData: '', //密码
			isRotate: false, //是否加载旋转
			StudentInfo: {},
			httpUrl: this.GLOBAL.httpUrl
		};
	},
	components: {
		wInput,
		wButton,
		unikModal
	},
	methods: {
		checkconfirm() {
			uni.navigateTo({
				url: '../identity/verification'
			});
		},
		cancelModal() {
			console.log('您点击了关闭');
		},
		isLogin() {
			//判断缓存中是否登录过，直接登录
			// try {
			// 	const value = uni.getStorageSync('setUserData');
			// 	if (value) {
			// 		//有登录信息
			// 		console.log("已登录用户：",value);
			// 		_this.$store.dispatch("setUserData",value); //存入状态
			// 		uni.reLaunch({
			// 			url: '../../../pages/index',
			// 		});
			// 	}
			// } catch (e) {
			// 	// error
			// }
		},
		startLogin: function(studentId) {
			//登录
			var that = this;
			if (that.isRotate) {
				//判断是否加载中，避免重复点击请求
				return false;
			}
			if (that.phoneData.length == '') {
				that.tui.toast('用户名不能为空');
				return;
			}
			if (that.passData.length == '') {
				that.tui.toast('密码不能为空');
				return;
			}
			uni.showLoading({
			    title: '请稍等'
			});
			uni.request({
				// url: 'http://schoolofagriculture.cn1.utools.club/student/operate/login',
				url: that.httpUrl + '/student/operate/login',
				method: 'POST',
				data: {
					userName: that.phoneData,
					password: that.passData
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: res => {
					if (res.data.code === 0) {
						uni.hideLoading();
						that.isRotate = true;
						setTimeout(function() {
							that.isRotate = false;
						}, 1000);
						that.tui.toast('登录成功');
						that.StudentInfo = res.data.student;
						studentId = that.StudentInfo.id;
						uni.setStorageSync('studentId', that.StudentInfo.id);
						setTimeout(function() {
							uni.navigateTo({
								url: '../major/major?studentId=' + studentId
							});
						}, 1000);
					} else if (res.data.code === -2) {
						uni.hideLoading();
						uni.setStorageSync('userID', res.data.userId);
						that.tui.toast('未完善身份信息，请先上传身份证照片');
						setTimeout(function() {
							uni.navigateTo({
								url: '../identity/verification'
							});
						}, 2000);
					} else if (res.data.code === -3) {
						uni.hideLoading();
						that.tui.toast('您的信息暂未完成审核，请稍后再来');
					} else if (res.data.code === -4) {
						that.$refs.checkmodal.show();
					} else {
						uni.hideLoading();
						that.tui.toast('用户名或密码错误');
					}
				}
			});
		}
		// login_weixin() {
		// 	//微信登录
		// 	uni.showToast({
		// 		icon: 'none',
		// 		position: 'bottom',
		// 		title: '...'
		// 	});
		// },
		// login_weibo() {
		// 	//微博登录
		// 	uni.showToast({
		// 		icon: 'none',
		// 		position: 'bottom',
		// 		title: '...'
		// 	});
		// },
		// login_github() {
		// 	//github登录
		// 	uni.showToast({
		// 		icon: 'none',
		// 		position: 'bottom',
		// 		title: '...'
		// 	});
		// }
	}
};
</script>

<style scoped>
@import url('../../components/watch-login/css/icon.css');
@import url('./css/main.css');
/* page{
	background-color: #A3A3A3;
} */
</style>
