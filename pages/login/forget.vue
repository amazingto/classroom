<template>
	<view class="forget">
		<view class="content">
			<!-- 主体 -->
			<view class="main">
				<view class="tips">若你忘记了密码，可在此重置新密码。</view>
				<wInput v-model="phoneData" type="text" maxlength="11" placeholder="请输入手机号码"></wInput>
				<wInput v-model="newpassword" type="password" maxlength="11" placeholder="请输入新密码" isShowPass></wInput>

				<wInput
					v-model="verCode"
					type="number"
					maxlength="5"
					placeholder="验证码"
					isShowCode
					codeText="获取重置码"
					setTime="30"
					ref="runCode"
					@setCode="getVerCode()"
				></wInput>
			</view>

			<wButton text="重置密码" :rotate="isRotate" @click.native="startRePass()"></wButton>
		</view>
	</view>
</template>

<script>
var _this;
import wInput from '../../components/watch-login/watch-input.vue'; //input
import wButton from '../../components/watch-login/watch-button.vue'; //button

export default {
	data() {
		return {
			phoneData: '', //电话
			newpassword: '', //密码
			verCode: '', //验证码
			isRotate: false, //是否加载旋转
			httpUrl: this.GLOBAL.httpUrl
		};
	},
	components: {
		wInput,
		wButton
	},
	methods: {
		getVerCode: function() {
			//获取验证码
			var That = this;
			uni.showLoading({
			    title: '正在发送'
			});
			if (That.phoneData.length != 11) {
				That.tui.toast('手机号不正确');
				return false;
			}
			uni.request({
				url: That.httpUrl + '/student/operate/msgSend1',
				method: 'POST',
				data: {
					phoneNum: That.phoneData,
					userName: That.phoneData
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: res => {
					if (res.data.code === 0) {
						uni.hideLoading();
						uni.setStorageSync('textCode', res.data.verifyCode);
						That.tui.toast('验证码发送成功');
						That.$refs.runCode.$emit('runCode');
					} else {
						uni.hideLoading();
						That.tui.toast('验证码发送失败');
					}
				}
			});
		},
		startRePass() {
			//重置密码
			if (this.isRotate) {
				//判断是否加载中，避免重复点击请求
				return false;
			}
			this.textCode = uni.getStorageSync('textCode');
			if (this.verCode != this.textCode) {
				this.tui.toast('验证码输入错误');
			}
			if (this.newpassword.length < 6) {
				this.tui.toast('密码不能少于6位');
				return false;
			}
			uni.request({
				url: this.httpUrl + '/student/operate/forgetPassword',
				method: 'POST',
				data: {
					newPassword: this.newpassword,
					userName: this.phoneData
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: res => {
					if (res.data.code === 0) {
						this.tui.toast('修改密码成功');
						setTimeout(function() {
							uni.navigateTo({
								url: './login'
							});
						}, 1000);
					} else {
						this.tui.toast('修改密码失败');
					}
				}
			});
		}
	}
};
</script>

<style>
@import url('../../components/watch-login/css/icon.css');
@import url('./css/main.css');
</style>
