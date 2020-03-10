<template>
	<!-- <view :class="{ 'uni-card--full': isFull === true || isFull === 'true', 'uni-card--shadow': isShadow === true || isShadow === 'true' }" class="uni-card" @click="onClick"> -->
	<view class="uni-card" @click="onClick">
		<!-- 标题 -->
		<view class="uni-card__header">
			<view class="uni-card__title-logo">
				<image class="uni-card__title-logo-img" :src="thumbnail"></image>
			</view>
			<view class="uni-card__title-content">
				<view class="uni-card__title-content-title">{{ title }}</view>
				<view class="uni-card__title-content-extra">{{ extra }}</view>
			</view>
		</view>
		<!-- 内容 -->
		<view class="uni-card__content">
			<view class="uni-card__content-detial">{{ content }}</view>
		</view>
		<!-- 底部 -->
		<view v-if="note" class="uni-card__footer">
			<slot name="footer">
				<text>{{ note }}</text>
			</slot>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'UniCard',
		props: {
			title: {
				type: String,
				default: ''
			}, // 标题
			extra: {
				type: String,
				default: ''
			}, // 扩展信息
			note: {
				type: String,
				default: ''
			}, // Tips
			thumbnail: {
				type: String,
				default: ''
			}, // 缩略图
			// 卡片模式 ， 可选值 basic：基础卡片 ；style ：图文卡片 ； title ：标题卡片
			mode: {
				type: String,
				default: 'basic'
			},
			content:{
				type: String,
				default: ''
			},
			isFull: {
				// 内容区域是否通栏
				type: Boolean,
				default: false
			},
			isShadow: {
				// 是否开启阴影
				type: Boolean,
				default: false
			}
		},
		methods: {
			onClick() {
				this.$emit('click')
			},
			footerClick(types) {
				uni.showToast({
					title: types,
						icon: 'none'
				})
			}
		}
	}
</script>

<style>
/* 	@charset "UTF-8"; */
	
	.uni-card {
		background: #fff;
		margin-top: 20upx;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		overflow: hidden;
		border-bottom: 6px #F5F5F5 solid;
	}

	.uni-card__header {
		display: flex;
		box-sizing: border-box;
		flex-direction: row;
		padding: 14upx;
		flex: 3;
	}
	.uni-card__header:after {
		position: absolute;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc
	}
	.uni-card__title-logo {
		width: 80upx;
		height: 80upx;
	}
	.uni-card__title-logo-img {
		width: 100%;
		height: 100%;
		border-radius: 10upx;
	}
	.uni-card__title-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding-left: 20upx;
		height: 70upx;
		overflow: hidden
	}
	.uni-card__title-content-title {
		font-size: 30upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap
	}
	.uni-card__title-content-extra {
		font-size: 26upx;
		color: #999;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap
	}
	.uni-card__content {
		flex: 5;
		color: #555;
		padding: 14upx;
		height: 200upx;
	}
	.uni-card__content-detial {
		line-height: 35upx;
		font-size: 30upx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 4;
		-webkit-box-orient: vertical;
	}
	.uni-card__footer {
		flex: 2;
		padding: 12upx;
		color: #999;
		font-size: 24upx;
		flex: 2;
		display: flex;
		align-items: center;
	}
	.uni-card__footer image{
		width: 40upx;
		height: 40upx;
	}
</style>