<template>
	<view class="container">
		<view class="uni-list"><graphiclist :list="List" @detail="courseDetail"></graphiclist></view>
		<!-- 加载loadding -->
		<tui-loadmore :visible="loadding"></tui-loadmore>
		<tui-nomore :visible="!pullUpOn"></tui-nomore>
		<!-- 加载loadding -->
	</view>
</template>

<script>
import graphiclist from '../component/graphic-list.vue';
import specialityModal from '../component/speciality-modal.vue';
import tuiLoadmore from '../../components/loadmore/loadmore.vue';
import tuiNomore from '../../components/nomore/nomore.vue';

export default {
	components: {
		graphiclist,
		specialityModal,
		tuiLoadmore,
		tuiNomore
	},
	data() {
		return {
			List: [],
			studentId: 0,
			majorId: 0,
			loadding: false,
			pullUpOn: true,
			totalPage: 1,
			pageIndex: 1,
			httpUrl: this.GLOBAL.httpUrl
		};
	},
	onLoad(option) {
		this.studentId = option.studentId;
		this.fmajorId = option.fmajorId;
	},
	mounted() {
		this.pullDownRefresh(false);
	},
	methods: {
		courseDetail: function(fcourseId) {
			console.log('该课程所属的已经完成的专业的id为：' + this.fmajorId + '' + '该课程的id为：' + fcourseId);
			uni.navigateTo({
				url: './FinishDetail?fcourseId=' + fcourseId + '&fmajorId=' + this.fmajorId
			});
		},
		/*上拉加载的回调*/
		pullDownRefresh(refresh) {
			// 此时mescroll会携带page的参数:
			uni.request({
				url:
					this.httpUrl +
					'/course/operate/courseGetOne?currentPage=' +
					this.pageIndex +
					'&count=10&studentId=' +
					this.studentId +
					'&type=' +
					1 +
					'&majorId=' +
					this.fmajorId,
				method: 'POST',
				success: data => {
					data = data.data;
					if (data.code == 0) {
						var majorinfo = data.pb;
						// console.log(majorinfo);
						// 接口返回的当前页数据列表 (数组)
						let curPageData = majorinfo.list;
						// 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
						this.totalPage = majorinfo.totalPage;
						// 接口返回的总数据量(比如列表有26个数据,每页10条,共3页; 则totalSize值为26)
						// 接口返回的是否有下一页 (true/false)
						this.List = curPageData; //追加新数据
						if (this.List.length == 0 || this.totalPage == 1) {
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
					1 +
					'&majorId=' +
					this.fmajorId,
				method: 'POST',
				success: data => {
					data = data.data;
					if (data.code == 0) {
						var majorinfo = data.pblist;
						let curPageData = majorinfo.list;
						this.List = this.List.concat(curPageData);
					} else {
						this.loadding = false;
						this.pullUpOn = false;
					}
				}
			});
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
	// onNavigationBarButtonTap(e) {
	// 	uni.navigateTo({
	// 		url: '../classification/search'
	// 	})
	// }
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
}
</style>
