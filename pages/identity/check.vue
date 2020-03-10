<template>
	<view class="container">
		<view class="content">
			<tui-tips :fixed="false" imgUrl="/static/imgs/check.png">
				<view class="title">证件已成功提交</view>
				<view class="sub-title">我们将会在2个工作日内完成您的身份审核，请您耐心等待！</view>
			</tui-tips>
		</view>
	</view>
</template>

<script>
import tuiTips from '../../components/tips.vue';
export default {
	components: {
		tuiTips
	},
	data() {
		return {
			show: false
		};
	},
	onLoad() {
		setTimeout(function() {
			uni.redirectTo({
				url: '../login/login'
			});
		}, 2000);
	},
	// onBackPress() {
	// 	uni.redirectTo({
	// 		url: '../login/login'
	// 	});
	// },
	methods: {}
};
</script>

<style>
.container {
	padding: 20rpx 0 120rpx 0;
	box-sizing: border-box;
}

.content {
	margin-top: 250upx;
}

.header {
	padding: 80rpx 90rpx 60rpx 90rpx;
	box-sizing: border-box;
}

.title {
	font-size: 38rpx;
	color: #1296db;
	font-weight: 500;
}

.sub-title {
	font-size: 26rpx;
	color: #7a7a7a;
	padding-top: 18rpx;
}

.tui-btn-box {
	padding: 10rpx 40rpx;
	box-sizing: border-box;
}
</style>
