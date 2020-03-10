<template>
	<view>
		<view class="grace-idcard-main">
			<view class="grace-idcard-desc">拍摄/上传您的二代身份证以及您的证件照</view>
			<view class="grace-idcard-items">
				<view class="grace-idcard-uper-btn" @tap="selectImg1">
					<view class="img"><image src="../../static/imgs/xiangji.png" mode="widthFix" /></view>
					<view class="text">点击拍摄/上传人像面</view>
				</view>
				<view class="grace-idcard-preview"><image :src="idfront" @tap="previewImg1"></image></view>
			</view>
			<view class="grace-idcard-items">
				<view class="grace-idcard-uper-btn" @tap="selectImg2">
					<view class="img"><image src="../../static/imgs/xiangji.png" mode="widthFix" /></view>
					<view class="text">点击拍摄/上传国徽面</view>
				</view>
				<view class="grace-idcard-preview"><image :src="idback" @tap="previewImg2" /></view>
			</view>
			<view class="grace-idphoto-items">
				<view class="grace-idphoto-uper-btn" @tap="show()">
					<view class="img"><image src="../../static/imgs/xiangji.png" mode="widthFix" /></view>
					<view class="text">点击上传证件照</view>
				</view>
				<view class="grace-idphoto-preview"><image :src="idphoto" @tap="previewImg3"></image></view>
			</view>
			<view style="margin-top:38upx;"><button type="primary" @tap="uploadCards">上传</button></view>
		</view>
		<unik-modal ref="unikModal" :modalTitle="modalTitle" @confirmModal="confirmModal" @cancelModal="cancelModal">请上传纯色的背景照片</unik-modal>
	</view>
</template>
<script>
import unikModal from '../component/unik-modal.vue';
var That;
export default {
	components: {
		unikModal
	},
	data() {
		return {
			modalTitle: '提示',
			idfront: '../../static/imgs/idcard1.png',
			idback: '../../static/imgs/idcard2.png',
			idphoto: '../../static/imgs/idphoto.jpg',
			httpUrl: this.GLOBAL.httpUrl
		};
	},
	onLoad: function() {
		That = this;
	},
	methods: {
		show() {
			That.$refs.unikModal.show();
		},
		confirmModal() {
			uni.chooseImage({
				count: 1,
				success: function(res) {
					That.idphoto = res.tempFilePaths[0];
				}
			});
		},
		cancelModal() {
			console.log('您点击了关闭');
		},
		selectImg1: function() {
			uni.chooseImage({
				count: 1,
				success: function(res) {
					That.idfront = res.tempFilePaths[0];
				}
			});
		},
		selectImg2: function() {
			uni.chooseImage({
				count: 1,
				success: function(res) {
					That.idback = res.tempFilePaths[0];
				}
			});
		},
		selectImg3: function() {
			uni.chooseImage({
				count: 1,
				success: function(res) {
					That.idphoto = res.tempFilePaths[0];
				}
			});
		},
		previewImg1: function() {
			uni.previewImage({
				urls: [That.idfront]
			});
		},
		previewImg2: function() {
			uni.previewImage({
				urls: [That.idback]
			});
		},
		previewImg3: function() {
			uni.previewImage({
				urls: [That.idphoto]
			});
		},
		uploadCards: function() {
			if (That.idfront == '../../static/imgs/idcard1.png' || That.idback == '../../static/imgs/idcard2.png') {
				uni.showToast({
					title: '请选择身份证照片',
					icon: 'none'
				});
				return;
			}
			if (That.idphoto == '../../static/imgs/idphoto.jpg') {
				uni.showToast({
					title: '请选择证件照',
					icon: 'none'
				});
				return;
			}
			// 因底层限制一次上传一个
			uni.showLoading({
				title: '上传中'
			});
			// 上传正面
			var majorID = uni.getStorageSync('MajorID');
			var userID = uni.getStorageSync('userID');
			var uploadTask1 = uni.uploadFile({
				url: That.httpUrl + '/student/operate/picUpload',
				filePath: That.idfront,
				fileType: 'image',
				name: 'file',
				formData: {
					userId: userID,
					majorId: majorID,
					type: 1
				},
				success: function(uploadFileRes) {
					// 上传成功后返回服务器端保存的路径
					uploadFileRes = JSON.parse(uploadFileRes.data);
					if (uploadFileRes.code === 0) {
						console.log('正面上传成功');
						// 上传背面
						var uploadTask2 = uni.uploadFile({
							url: That.httpUrl + '/student/operate/picUpload',
							filePath: That.idback,
							fileType: 'image',
							name: 'file',
							formData: {
								userId: userID,
								majorId: majorID,
								type: 0
							},
							success: function(uploadFileRes) {
								// 上传成功后返回服务器端保存的路径
								uploadFileRes = JSON.parse(uploadFileRes.data);
								if (uploadFileRes.code === 0) {
									console.log('背面上传成功');
									var uploadTask3 = uni.uploadFile({
										url: That.httpUrl + '/student/operate/picUpload',
										filePath: That.idphoto,
										fileType: 'image',
										name: 'file',
										formData: {
											userId: userID,
											majorId: majorID,
											type: 2
										},
										success: function(uploadFileRes) {
											// 上传成功后返回服务器端保存的路径
											uploadFileRes = JSON.parse(uploadFileRes.data);
											if (uploadFileRes.code === 0) {
												// 至此3张照片上传完毕
												console.log('全部上传成功');
												uni.hideLoading();
												// That.tui.toast('上传成功')
												setTimeout(function() {
													uni.navigateTo({
														url: './check'
													});
												}, 500);
											}
											else{
												uni.hideLoading();
												That.tui.toast('证件照上传失败，请重新上传')
											}
										}
									});
								}
								else{
									uni.hideLoading();
									That.tui.toast('身份证反面上传失败，请重新上传')
								}
							}
						});
					}
					else{
						uni.hideLoading();
						That.tui.toast('身份证正面上传失败，请重新上传')
					}
				},
				fail:function(uploadFileRes){
					That.tui.toast('请求失败，请稍后再试')
					uni.hideLoading();
				}
			});
		}
	}
};
</script>
<style>
page {
	background: #f1f1f1;
}

.grace-idcard-main {
	margin: 20upx 30upx;
	background: #f1f1f1;
}

.grace-idcard-desc {
	line-height: 2em;
	/* background:#FFFFFF; */
	padding-top: 30upx;
	border-radius: 10upx;
	text-align: center;
	font-size: 30upx;
}

.grace-idcard-text {
	line-height: 2em;
	margin-top: 30upx;
}

.grace-idcard-items {
	background: #f1f1f1;
	padding: 20upx 0;
	display: flex;
	margin: 36upx 0;
	border-radius: 10upx;
	align-items: flex-start;
	justify-content: space-between;
}

.grace-idcard-uper-btn {
	width: 50%;
	height: 188upx;
	margin: 0 30upx;
	background: #f1f1f1;
	/* 	padding-bottom:10upx; */
	border-radius: 20upx;
	border: 6upx #cdcdcd solid;
	box-shadow: 0upx, 2upx, 6upx, 0upx, rgba(255, 255, 255, 0.5);
	text-align: center;
}

.grace-idcard-uper-btn .img {
	width: 100upx;
	height: 100upx;
	margin: 0 auto;
	margin-top: 30upx;
}

.grace-idcard-uper-btn .img image {
	width: 100upx;
	height: 100upx;
}

.grace-idcard-uper-btn .text {
	width: 100%;
	margin-top: 10upx;
	text-align: center;
	line-height: 2em;
	font-size: 24upx;
}
.grace-idphoto-items {
	background: #f1f1f1;
	padding: 20upx 0;
	display: flex;
	margin: 36upx 0;
	border-radius: 10upx;
	align-items: flex-start;
	justify-content: space-between;
}

.grace-idphoto-uper-btn {
	/* width:276upx; */
	width: 40%;
	height: 188upx;
	margin: 0 30upx;
	background: #f1f1f1;
	border-radius: 20upx;
	border: 6upx #cdcdcd solid;
	box-shadow: 0upx, 2upx, 6upx, 0upx, rgba(255, 255, 255, 0.5);
	text-align: center;
}

.grace-idphoto-uper-btn .img {
	width: 100upx;
	height: 100upx;
	margin: 0 auto;
	margin-top: 30upx;
}

.grace-idphoto-uper-btn .img image {
	width: 100upx;
	height: 100upx;
}

.grace-idphoto-uper-btn .text {
	width: 100%;
	margin-top: 10upx;
	text-align: center;
	line-height: 2em;
	font-size: 24upx;
}
.grace-idcard-preview {
	display: flex;
	width: 50%;
	height: 200upx;
	margin: 0 30upx;
	/* padding-bottom: 10upx; */
}
.grace-idcard-preview image {
	width: 100%;
	height: 100%;
}

.grace-idphoto-preview {
	display: flex;
	width: 99px;
	height: 138px;
	margin: 0 70upx;
	border: 6upx #cdcdcd solid;
}

.grace-idphoto-preview image {
	width: 100%;
	height: 100%;
}
</style>
