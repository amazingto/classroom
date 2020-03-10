<template>
	<view class="register">
		<view class="content">
			<!-- 头部logo -->
			<view class="header"><image src="../../static/logo1.png"></image></view>
			<!-- 主体 -->
			<view class="main">
				<wInput v-model="phoneData" type="text" maxlength="11" placeholder="手机号"></wInput>
				<wInput v-model="verCode" type="text" placeholder="验证码" isShowCode ref="runCode" @setCode="getVerCode()"></wInput>
				<view class="uni-list" style="margin-top: 4px !important;">
					<view class="uni-list-cell">
						<picker @change="bindPickerChange" :value="index" :range="majordata" range-key="majorName">
							<view class="uni-input">{{ majordata[index].majorName }}</view>
						</picker>
					</view>
				</view>
				<wInput v-model="passData" type="password" placeholder="登录密码" isShowPass></wInput>
			</view>

			<wButton text="注 册" :rotate="isRotate" @click.native="startReg()"></wButton>

			<!-- 底部信息 -->
			<!-- <view class="footer">
				<text @tap="isShowAgree" class="cuIcon" :class="showAgree?'cuIcon-radiobox':'cuIcon-round'">同意</text>
				<navigator url="" open-type="navigate">《协议》</navigator>
			</view> -->
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
			phoneData: '', // 用户/电话
			passData: '', //密码
			verCode: '', //验证码
			showAgree: true, //协议是否选择
			isRotate: false, //是否加载旋转
			isShowSelect: false,
			majorid: '',
			majordata: {}, //专业名称
			index: 0,
			httpUrl: this.GLOBAL.httpUrl
		};
	},
	components: {
		wInput,
		wButton
	},
	mounted() {
		uni.request({
			url: this.httpUrl + '/major/operate/majorList',
			method: 'POST',
			data: {},
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			success: res => {
				if (res.data.code == 0) {
					this.majordata = res.data.list;
					// console.log(this.majordata);
				}
			}
		});
	},
	methods: {
		isShowAgree() {
			//是否选择协议
			this.showAgree = !this.showAgree;
		},
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
				url: this.httpUrl + '/student/operate/msgSend',
				method: 'POST',
				data: {
					phoneNum: this.phoneData
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: res => {
					if (res.data.code === 0) {
						uni.setStorageSync('textCode', res.data.verifyCode);
						uni.hideLoading();
						this.tui.toast('验证码发送成功');
						this.$refs.runCode.$emit('runCode');
					} else {
						uni.hideLoading();
						this.tui.toast('验证码发送失败');
					}
				}
			});
		},
		startReg: function() {
			//注册
			this.textCode = uni.getStorageSync('textCode');
			if (this.verCode != this.textCode) {
				this.tui.toast('验证码输入错误');
			}
			if (this.isRotate) {
				//判断是否加载中，避免重复点击请求
				return false;
			}
			if (this.passData.length < 6) {
				this.tui.toast('密码不能小于6位');
				return false;
			}
			uni.showLoading({
			    title: '请稍等'
			});
			uni.request({
				url: this.httpUrl + '/student/operate/register',
				method: 'POST',
				data: {
					majorId: this.majorid,
					password: this.passData,
					phoneNum: this.phoneData
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: res => {
					if (res.data.code === -2) {
						uni.hideLoading();
						this.isRotate = true;
						setTimeout(function() {
							this.isRotate = false;
						}, 1000);
						uni.setStorageSync('userID', res.data.userId);
						this.tui.toast('注册成功，请上传身份信息');
						setTimeout(function() {
							uni.navigateTo({
								url: '../identity/verification'
							});
						}, 1000);
					} else if (res.data.code === 0) {
						uni.hideLoading();
						this.tui.toast('该账号已经注册了，请直接登录');
						setTimeout(function() {
							uni.navigateTo({
								url: './login'
							});
						}, 1000);
					} else {
						uni.hideLoading();
						this.tui.toast('该专业人数已满，请选择其他专业');
					}
				}
			});

			// if (this.showAgree == false) {
			// 	uni.showToast({
			// 		icon: 'none',
			// 		position: 'bottom',
			// 		title: '请先同意《协议》'
			// 	});
			// 	return false;
			// }
		},
		bindPickerChange: function(e) {
			console.log('picker发送选择改变，携带值为：' + e.target.value);
			this.index = e.target.value;
			// console.log(this.majordata[this.index].id)
			this.majorid = this.majordata[this.index].id;
			uni.setStorageSync('MajorID', this.majordata[this.index].id); //注册时选择的专业的id
		}
	}
};
</script>

<style>
@import url('../../components/watch-login/css/icon.css');
@import url('./css/main.css');

.uni-list {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	height: 36upx;
	padding: 32upx;
	margin-top: 4px;
	margin-bottom: 24upx;
	border: none;
	border-radius: 2.5rem;
	-webkit-box-shadow: 0 0 60upx 0 rgba(43, 86, 112, 0.1);
	box-shadow: 0 0 60upx 0 rgba(43, 86, 112, 0.1);
}

.uni-list-cell {
	flex: 1;
	text-align: left;
	font-size: 28upx;
	padding-right: 10upx;
	margin-left: 20upx;
	color: #888888;
}
</style>
