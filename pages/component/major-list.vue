<template>
	<view>
		<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item, i) in list" :key="i">
			<view class="uni-media-list" @click="show(item.id)">
				<view class="uni-media-list-logo"><image class="uni-image" :style="{ backgroundImage: 'url(' + httpUrl + item.majorPic + ')' }"></image></view>
				<!-- <view class="uni-media-list-logo"><image class="uni-image" :style="{ backgroundImage: 'url(' + 'http://schoolofagriculture.utools.club' + item.majorPic + ')' }"></image></view> -->
				<view class="uni-media-list-body">
					<view class="uni-media-list-text-top">{{ item.majorName }}</view>
					<view class="uni-media-list-text-center">{{ item.majorDesc }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		list: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			httpUrl: this.GLOBAL.httpUrl
		};
	},
	methods: {
		show(id) {
			this.$emit('detail', id);
		}
	}
};
</script>

<style lang="less">
.uni-list-cell {
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	/* border-bottom-style:solid;
		border-bottom-width: 0.5px;
		border-bottom-color:#D9D9D9 */
	border-bottom: 0.5px solid #eaeef1;
}

.uni-list-cell-hover {
	background-color: #eee;
}

.uni-media-list {
	padding: 22upx 30upx;
	box-sizing: border-box;
	display: flex;
	width: 100%;
	flex-direction: row;
}

.uni-media-list-logo {
	height: 100upx;
	width: 100upx;
	margin-right: 20upx;
	
	.uni-image {
		border-radius: 10upx;
		box-shadow: 0px 2px 6px 0px rgba(103, 103, 103, 0.2);
		font-variant: small-caps;
		display: inline-flex;
		text-align: center;
		justify-content: center;
		align-items: center;
		white-space: nowrap;
		position: relative;
		width: 100upx;
		height: 100upx;
		background-size: cover;
		background-position: center;
		vertical-align: middle;
	}
}

.uni-media-list-body {
	height: 100upx;
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	overflow: hidden;
}

.uni-media-list-text-top {
	width: 100%;
	line-height: 36upx;
	font-size: 28upx;
	color: #000000;
}

.uni-media-list-text-center {
	width: 100%;
	line-height: 30upx;
	font-size: 24upx;
	color: #8f8f94;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}

.uni-media-list-text-bottom {
	width: 100%;
	line-height: 36upx;
	font-size: 26upx;
	/* color: #8f8f94; */
	color: #8f8f94;
	display: flex;
	justify-content: space-between;
}
</style>
