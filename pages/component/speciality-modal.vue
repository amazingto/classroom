<template>
	<view class="cu-modal" :class="show ? 'show' : ''">
		<view class="cu-dialog">
			<view class="cu-bar bg-white justify-end">
				<view class="content">{{ title }}</view>
				<view class="action" @tap="cancel"><text class="cuIcon-close text-red"></text></view>
			</view>
			<view style="height: 60%;background-color: #FFFFFF;">
				<view class="cu-form-group">
					<view style="width: 80%; margin: auto;margin-bottom: 20px;">
						<xfl-select
							:list="list"
							:clearable="true"
							:showItemNum="5"
							:isCanInput="true"
							:style_Container="listBoxStyle"
							:placeholder="'请选择专业'"
							@change="change"
						></xfl-select>
					</view>
				</view>
			</view>
			<view class="cu-bar bg-white justify-end">
				<view class="action">
					<button class="cu-btn line-green" style="background-color: rgba(0,0,0,0.2);color: white;" @tap="cancel">取消</button>
					<button class="cu-btn margin-left" style="background-color: #0BC99D;color: white;" @tap="confirm">
						<text class="cuIcon-loading2 cuIconfont-spin" v-if="loading"></text>
						确定
					</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import xflSelect from '../../components/xfl-select/xfl-select.vue';
export default {
	props: {
		show: {
			type: Boolean,
			required: true
		},
		loading: {
			type: Boolean,
			required: true
		},
		title: {
			type: String
		}
	},
	data() {
		return {
			listBoxStyle: `height: 40px; font-size: 16px;`,
			list: [],
			RemajorId: 0,
			httpUrl: this.GLOBAL.httpUrl
		};
	},
	components: {
		xflSelect
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
					this.list = res.data.list;
					console.log(this.list);
				}
			}
		});
	},
	methods: {
		cancel: function() {
			this.$emit('cancel');
		},
		confirm: function() {
			this.$emit('confirm', this.RemajorId);
		},
		visibleChange(isShow) {
			// 列表框的显示隐藏事件
			console.log('isShow::', isShow);
		},
		change({ newVal, oldVal, index, orignItem }) {
			// console.log(orignItem);
			this.RemajorId = orignItem.id;
			console.log('选择后的专业id为：' + this.RemajorId);
		}
	}
};
</script>

<style lang="less" scoped>
.cu-modal {
	.cu-form-group {
		min-height: 95px !important;
		uni-input {
			top: -2px;
		}
	}
	.cu-bar {
		min-height: 65px !important;
	}
	.cu-dialog {
		height: 45% !important;
	}
}
</style>
