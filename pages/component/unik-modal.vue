<template>
	<transition name="fade">
		<view class="unik-modal" v-show="showModal">
			<view class="unik-modal-wrap">
				<view class="unik-modal-title">{{ modalTitle }}</view>
				<view class="unik-modal-content"><slot></slot></view>
				<view class="unik-modal-footer" v-show="showButton">
					<button type="default" v-if="sureButton" @click="confirm">{{ sureText }}</button>
					<button type="default" v-if="cancelButton" @click="close">{{ cancelText }}</button>
				</view>
			</view>
			<view class="background-shadow" v-if="shadow" @click="clickMask && closeModal()"></view>
		</view>
	</transition>
</template>

<script>
export default {
	data() {
		return {
			showModal: false
		};
	},
	props: {
		// title
		modalTitle: {
			type: String,
			default: ''
		},
		// 是否显示footer
		showButton: {
			type: Boolean,
			default: true
		},
		// 是否显示蒙层
		shadow: {
			type: Boolean,
			default: true
		},
		// 点击蒙层是否关闭模态框
		clickMask: {
			type: Boolean,
			default: true
		},
		// 确定按钮文字
		sureText: {
			type: String,
			default: '确定'
		},
		// 取消按钮文字
		cancelText: {
			type: String,
			default: '取消'
		},
		// 是否显示确定按钮
		sureButton: {
			type: Boolean,
			default: true
		},
		// 是否显示取消按钮
		cancelButton: {
			type: Boolean,
			default: true
		}
	},
	methods: {
		close() {
			this.$emit('cancelModal');
			this.showModal = false;
		},
		confirm() {
			this.$emit('confirmModal');
			this.showModal = false;
		},
		closeModal() {
			this.showModal = false;
		},
		show() {
			this.showModal = true;
		}
	}
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
.unik-modal {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	z-index: 1000;
}
.unik-modal-wrap {
	width: 400upx;
	height: max-content;
	position: fixed;
	background: #fff;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
	z-index: 10;
	border-radius: 10px;
	overflow: hidden;
}
.unik-modal-title {
	display: flex;
	justify-content: center;
	padding: 15upx 25upx;
	padding-bottom: 25upx;
	font-size: 25upx;
	height: 80upx;
	color: #333333;
}
.background-shadow {
	width: 100%;
	height: 100%;
	position: absolute;
	background: rgba(0, 0, 0, 0.3);
}
.unik-modal-footer {
	display: flex;
	/* border-top: 1px solid #ddd; */
	height: 75upx;
}
.unik-modal-footer button {
	background: #ffffff;
	font-size: 25upx;
	margin: 0;
	height: 75upx;
	line-height: 75upx;
	width: 100%;
	/* border-radius: 0; */
	padding: 0;
	text-align: center;
	overflow: inherit;
	color: #3b4144;
}
.unik-modal-footer button:after {
	display: none;
}
.unik-modal-content {
	display: flex;
	flex-grow: 1;
	padding: 15upx 45upx 25upx;
	max-height: 600upx;
	overflow: auto;
	justify-content: center;
	font-size: 30upx;
	color: #666666;
}
</style>
