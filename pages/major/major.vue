<template>
	<view class="container">
		<view class="my-segmented">
			<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="button" active-color="#0bc99d"></uni-segmented-control>
		</view>
		<view class="uni-list">
			<view v-show="current === 0">
				<majorlist :list="List" @detail="CourseList"></majorlist>
				<!-- <view class="btn-plusempty" hover-class="bottom-btn-hover" @click="choose"><image src="../../static/jiahao.png" class="plusempty-img"></image></view> -->
				<tui-fab :left="left" :right="right" :bottom="bottom" :bgColor="bgColor" :btnList="btnList" @click="onClick"></tui-fab>
				<specialityModal title="重新选择专业" :show="specialityModal" @cancel="cancel" @confirm="confirm" :loading="confirmLoading" />
			</view>
			<view v-show="current === 1"><majorlist :list="dataList" @detail="courselist"></majorlist></view>
			<!--加载loadding-->
			<tui-loadmore :visible="loadding"></tui-loadmore>
			<tui-nomore :visible="!pullUpOn"></tui-nomore>
			<!-- 加载loadding -->
		</view>
		<!-- <unik-modal ref="hint" :modalTitle="modalTitle" @confirmModal="hintconfirm" @cancelModal="cancelModal">退出登录</unik-modal> -->
		<tui-modal :show="modal" @click="handleClick" @cancel="hide" title="提示" content="确定退出登录吗？" color="#333" :size="32" :button="button"></tui-modal>
	</view>
</template>

<script>
import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue';
import majorlist from '../component/major-list.vue';
import specialityModal from '../component/speciality-modal.vue';
import tuiLoadmore from '../../components/loadmore/loadmore.vue';
import tuiNomore from '../../components/nomore/nomore.vue';
import tuiFab from '@/components/tui-fab/tui-fab';
import tuiModal from '@/components/modal/modal';

export default {
	components: {
		majorlist,
		specialityModal,
		tuiLoadmore,
		tuiNomore,
		uniSegmentedControl,
		tuiFab,
		tuiModal
	},
	data() {
		return {
			left: 0,
			right: 80,
			items: ['待学专业', '已学专业'],
			current: 0,
			specialityModal: false,
			confirmLoading: false,
			List: [], //正在学习的数据列表
			dataList: [], //已经完成的数据列表
			studentId: 0, //学生id
			loadding: false,
			pullUpOn: true,
			totalPage: 1,
			pageIndex: 1,
			majorId: 0, //现在正在学习的专业的id
			fmajorId: 0, //已经完成的专业的id
			httpUrl: this.GLOBAL.httpUrl,
			bgColor: '#0bc99d',
			btnList: [
				{
					bgColor: '#16C2C2',
					//名称
					text: '退出登录',
					//字体大小
					fontSize: 20,
					//字体颜色
					color: '#fff'
				},
				{
					bgColor: '#64B532',
					//名称
					text: '选择专业',
					//字体大小
					fontSize: 20,
					//字体颜色
					color: '#fff'
				}
			],
			modal: false,
			button: [
				{
					text: '取消',
					type: 'gray'
				},
				{
					text: '确定'
				}
			]
		};
	},
	onLoad(option) {
		this.studentId = option.studentId;
	},
	mounted() {
		this.pullDownRefresh(false);
		// uni.request({
		// 	url: this.httpUrl + '/major/operate/belongMajor?currentPage=' + this.pageIndex + '&count=10&studentId=' + this.studentId + '&type=' + 0,
		// 	method: 'POST',
		// 	success: data => {
		// 		data = data.data;
		// 		if (data.code == 0) {
		// 			var majorinfo = data.pb;
		// 			// console.log(majorinfo);
		// 			this.List = majorinfo.list;
		// 		} else {
		// 			this.tui.toast('您的专业正在审核中，请稍等');
		// 		}
		// 	}
		// });
	},
	methods: {
		handleClick(e) {
			let index = e.index;
			if (index === 0) {
				// this.tui.toast('你点击了取消按钮');
			} else {
				// this.tui.toast('你点击了确定按钮');
				// uni.navigateTo({
				// 	url: '../login/login'
				// });
				uni.reLaunch({
				    url: '../login/login'
				});
			}
			this.hide();
		},
		// show() {
		// 	this.modal = true;
		// },
		hide() {
			this.modal = false;
		},
		onClick(e) {
			let index = e.index;
			switch (index) {
				case -1:
					this.tui.toast('您点击了悬浮按钮');
					break;
				case 0:
					// this.$refs.hint.show();
					this.modal = true;
					break;
				case 1:
					this.specialityModal = !this.specialityModal;
					break;
				default:
					break;
			}
		},
		cancelModal() {
			console.log('您点击了关闭');
		},
		hintconfirm() {
			uni.navigateTo({
				url: '../login/login'
			});
		},
		onClickItem(index) {
			if (this.current !== index) {
				this.current = index;
			}
		},
		CourseList(majorId) {
			console.log('该学生的id为：' + this.studentId + '该专业的id为：' + majorId);
			uni.navigateTo({
				url: '../course/list?studentId=' + this.studentId + '&majorId=' + majorId
			});
		},
		courselist: function(fmajorId) {
			console.log('该学生的id为：' + this.studentId + '该完成专业的id为：' + fmajorId);
			uni.navigateTo({
				url: '../course/finishlist?studentId=' + this.studentId + '&fmajorId=' + fmajorId
			});
		},
		choose: function() {
			this.specialityModal = !this.specialityModal;
		},
		cancel: function() {
			this.specialityModal = !this.specialityModal;
		},
		confirm: function(RemajorId) {
			console.log('重新选择的专业的id为：' + RemajorId);
			var That = this;
			uni.request({
				url: That.httpUrl + '/major/operate/majorenroll',
				method: 'POST',
				data: {
					majorId: RemajorId, //RemajorId重新选择的那个专业的id
					studentId: That.studentId
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: res => {
					if (res.data.code == 0) {
						That.tui.toast('选择成功，请等待审核');
						// That.confirmLoading = !That.confirmLoading;
						That.specialityModal = !That.specialityModal;
					} else if (res.data.code === -1) {
						That.specialityModal = !That.specialityModal;
						That.tui.toast('请先完成上一个专业的所有考试，再报名新专业');
					} else {
						That.specialityModal = !That.specialityModal;
						That.tui.toast('您重新选择的专业正在审核中，请稍等');
					}
				}
			});
		},
		/*上拉加载的回调*/
		pullDownRefresh(refresh) {
			uni.request({
				url: this.httpUrl + '/major/operate/belongMajor?currentPage=' + this.pageIndex + '&count=10&studentId=' + this.studentId + '&type=' + 0,
				method: 'POST',
				success: data => {
					data = data.data;
					if (data.code == 0) {
						var majorinfo = data.pb;
						// console.log(majorinfo);
						this.List = majorinfo.list;
					} else {
						this.tui.toast('您的专业正在审核中，请稍等');
					}
				}
			});
			// 此时mescroll会携带page的参数:
			uni.request({
				url: this.httpUrl + '/major/operate/belongMajor?currentPage=' + this.pageIndex + '&count=10&studentId=' + this.studentId + '&type=' + 1,
				method: 'POST',
				success: data => {
					data = data.data;
					if (data.code === 0) {
						var majorinfo = data.pb;
						// console.log(majorinfo);
						// 接口返回的当前页数据列表 (数组)
						let curPageData = majorinfo.list;
						// 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
						this.totalPage = majorinfo.totalPage;
						// 接口返回的总数据量(比如列表有26个数据,每页10条,共3页; 则totalSize值为26)
						// 接口返回的是否有下一页 (true/false)
						this.dataList = curPageData; //追加新数据
						if (this.dataList.length == 0 || this.totalPage == 1) {
							this.loadding = false;
							this.pullUpOn = false;
						}
						if (refresh) {
							this.pageIndex = 1;
							this.pullUpOn = true;
							this.loadding = false;
							uni.stopPullDownRefresh();
							this.tui.toast('刷新成功');
						}
					} else {
						this.pageIndex = 1;
						this.loadding = false;
						this.pullUpOn = false;
					}
				}
			});
			// uni.request({
			// 	url: this.httpUrl + '/major/operate/belongMajor?currentPage=' + this.pageIndex + '&count=10&studentId=' + this.studentId + '&type=' + 0,
			// 	method: 'POST',
			// 	success: data => {
			// 		data = data.data;
			// 		if (data.code === 0) {
			// 			var majorinfo = data.pb;
			// 			// console.log(majorinfo);
			// 			// 接口返回的当前页数据列表 (数组)
			// 			let curPageData = majorinfo.list;
			// 			// 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
			// 			this.totalPage = majorinfo.totalPage;
			// 			// 接口返回的总数据量(比如列表有26个数据,每页10条,共3页; 则totalSize值为26)
			// 			// 接口返回的是否有下一页 (true/false)
			// 			this.List = curPageData; //追加新数据

			// 			if (this.List.length == 0 || this.totalPage == 1) {
			// 				this.loadding = false;
			// 				this.pullUpOn = false;
			// 			}
			// 			if (refresh) {
			// 				this.pageIndex = 1;
			// 				this.pullUpOn = true;
			// 				this.loadding = false;
			// 				uni.stopPullDownRefresh();
			// 				this.tui.toast('刷新成功');
			// 			}
			// 		}
			// 		else {
			// 			this.pageIndex = 1;
			// 			this.loadding = false;
			// 			this.pullUpOn = false;
			// 		}
			// 	}
			// });
		},
		reachBottom() {
			uni.request({
				url:
					this.httpUrl +
					'/course/operate/courseGetOne?currentPage=' +
					this.pageIndex +
					'&count=10&studentId=' +
					this.studentId +
					'&type=' +
					0 +
					'&majorId=' +
					this.majorId,
				method: 'POST',
				success: data => {
					data = data.data;
					if (data.code == 0) {
						var majorinfo = data.pb;
						this.List = majorinfo.list;
					}
				}
			});

			uni.request({
				url: this.httpUrl + '/major/operate/belongMajor?currentPage=' + this.pageIndex + '&count=10&studentId=' + this.studentId + '&type=' + 1,
				method: 'POST',
				success: data => {
					data = data.data;
					if (data.code === 0) {
						var majorinfo = data.pb;
						let curPageData = majorinfo.list;
						this.dataList = this.dataList.concat(curPageData);
					} else {
						this.loadding = false;
						this.pullUpOn = false;
					}
				}
			});
			// uni.request({
			// 	url: this.httpUrl + '/major/operate/belongMajor?currentPage=' + this.pageIndex + '&count=10&studentId=' + this.studentId + '&type=' + 0,
			// 	method: 'POST',
			// 	success: data => {
			// 		data = data.data;
			// 		if (data.code === 0) {
			// 			var majorinfo = data.pb;
			// 			let curPageData = majorinfo.list;
			// 			this.List = this.List.concat(curPageData);
			// 		} else {
			// 			this.loadding = false;
			// 			this.pullUpOn = false;
			// 		}
			// 	}
			// });
		},
		// 页面上拉触底事件的处理函数
		onReachBottom: function() {
			if (!this.pullUpOn) return;
			this.loadding = true;
			if (this.pageIndex == this.totalPage) {
				this.loadding = false;
				this.pullUpOn = false;
			} else {
				this.pageIndex = this.pageIndex + 1;
				this.reachBottom();
			}
		},
		//页面相关事件处理函数--监听用户下拉动作
		onPullDownRefresh: function() {
			//延时为了看效果
			this.pullDownRefresh(true);
		}
	}
};
</script>

<style lang="less">
page {
	width: 100%;
	height: 100%;
}

uni-page-body {
	height: 100%;
	width: 100%;
}

.container {
	height: 100%;
	overflow: hidden;
	width: 100%;

	.my-segmented {
		height: 5%;
		width: 100%;
		padding-top: 15upx;
		max-height: 38px;
	}

	.uni-list {
		height: 95%;
		width: 100%;
		overflow-y: auto;
		margin-top: 20upx;
	}
	.btn-plusempty {
		width: 110upx;
		height: 110upx;
		// background: #007bfa;
		background: #0bc99d;
		position: fixed;
		bottom: 50upx;
		right: 50upx;
		border-radius: 100%;
		overflow: hidden;
		text-align: center;
		line-height: 110upx;
	}
	.bottom-btn-hover {
		// background: #0564c7!important;;
		background: #0bc99d !important;
	}
	.plusempty-img {
		width: 50upx;
		height: 50upx;
		margin-top: 30upx;
	}
	.tui-fab-box {
		bottom: 100upx;
	}
}
</style>
