<template>
	<view class="container">
		<view class="video-container">
			<video
				class="myVideo"
				:initial-time="initialTime"
				id="myVideo"
				:src="src"
				:show-progress="false"
				:enable-progress-gesture="false"
				@timeupdate="timeupdate"
				@play="bindplay()"
				@pause="bindpause()"
			></video>
		</view>
		<scroll-view scroll-x scroll-with-animation class="tab-view" :scroll-left="scrollLeft">
			<view v-for="(item, index) in tabbar" :key="index" class="tab-bar-item" :class="[currentTab == index ? 'active' : '']" :data-current="index" @tap.stop="swichNav">
				<text class="tab-bar-title">{{ item }}</text>
			</view>
		</scroll-view>
		<swiper class="tab-content" :current="currentTab" duration="300" @change="switchTab" :style="{ height: winHeight + 'px' }">
			<view v-for="(item, index) in tabbar" :key="index"></view>
			<swiper-item>
				<scroll-view scroll-y class="scoll-y">
					<!-- <view class="card" v-for="(intros, i) in intro" :key="i">
						<view class="card-header" v-if="i == 0" style="font-size: 40upx;">{{ intros.title }}</view>
						<view v-else class="card-header">{{ intros.title }}</view>
						<view class="card-content">{{ intros.details }}</view>
					</view> -->
					<view class="card" style="height: 100px;">
						<view class="card-header" style="font-size: 40upx;">{{ intro.courseName}}</view>
						<view class="card-content">共有{{ intro.peopleSet }}人在学</view>
					</view>
					<view class="card" style="height: 100px;">
						<view class="card-header">课程类型</view>
						<view class="card-content">{{ intro.type }}</view>
					</view>
					<view class="card" style="height: 200px;">
						<view class="card-header">课程简介</view>
						<view class="card-content">{{ intro.introduce }}</view>
					</view>
					<!-- <view class="imagetext">
						<view class="title-box">课程内容</view>
						<view class="image-box">
							<image class="image-box-img" src="../../static/test-img.jpg"></image>
						</view>
					</view> -->
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y class="scoll-y">
					<view class="catalog-list" v-for="(item, i) in catalog" :key="i">
						<view class="catalog-title">{{ item.parentchapters.chaptername }}</view>
						<view class="catalog-section" v-for="(items, index) in item.chaptersList" :key="index">
							<image class="img" v-if="chapterId == items.id" src="../../static/mix-tree/video1.png" @click="show(items.id, items.vedioaddr)"></image>
							<image class="img" v-else src="../../static/mix-tree/video.png" @click="show(items.id, items.vedioaddr)"></image>
							<view class="catalog-section-subtitle" :class="[chapterId == items.id ? 'Changecolor' : '']" @click="show(items.id, items.vedioaddr)">
								{{ items.chaptername }}
							</view>
						</view>
					</view>
				</scroll-view>
				<unik-modal ref="unikModal" :modalTitle="modalTitle" @confirmModal="confirmModal" @cancelModal="cancelModal">开始播放</unik-modal>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import unikModal from '../component/unik-modal.vue';
export default {
	components: {
		unikModal
	},
	data() {
		return {
			modalTitle: '提示',
			src: '',
			tabbar: ['详情', '目录'],
			winHeight: '', //窗口高度
			currentTab: 0, //预设当前项的值
			scrollLeft: 0, //tab标题的滚动条位置
			currentTime: 0,
			seenTime: 0, //看过的时间
			videoContext: null,
			initialTime: 0,
			list: [],
			courseId: 0, //课程id
			chapterId: 0, //章节id
			majorId: 0, //现在正在学习的专业的id
			videoUrl: 0, //获取的视频路径
			// intro: [
			// 	{
			// 		title: 'VUE展示系统实战课程',
			// 		details: '52个人在学'
			// 	},
			// 	{
			// 		title: '课程简介',
			// 		details:
			// 			'课程主要包括十讲，涉及了：项目与技术的概述，开发环境的搭建，项目框架的搭建，路由的安装和使用，如果运用vue-trsouse与后台进行数据对接，element-ui的安装和使用，动态路由实现详情页面展示。vue打包编译常出现的问题和解决方法。'
			// 	},
			// 	{
			// 		title: '适用人群',
			// 		details: '适合有html/css/js，vue基础知识，但是没有用vue开发过的人群'
			// 	}
			// ],
			intro:[],
			catalog: [],
			timer: null, //定时器名称
			httpUrl: this.GLOBAL.httpUrl
		};
	},
	onLoad(option) {
		let that = this;
		console.log(option);
		that.courseId = option.fcourseId;
		that.majorId = option.fmajorId;
		//  高度自适应
		uni.getSystemInfo({
			success: function(res) {
				let calc = res.windowHeight;
				that.winHeight = calc - 50 - 230;
			}
		});
	},
	onReady: function(res) {
		this.videoContext = uni.createVideoContext('myVideo');
	},
	onHide() {
		if (this.timer) {
			clearInterval(this.timer);
			this.timer = null;
		}
	},
	onBackPress() {
		if (this.timer) {
			clearInterval(this.timer);
			this.timer = null;
		}
	},
	mounted() {
		var studentId = uni.getStorageSync('studentId');
		uni.request({
			url: this.httpUrl + '/course/operate/chapterGet',
			method: 'POST',
			data: {
				courseId: this.courseId
			},
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			success: data => {
				data = data.data;
				if (data.code === 0) {
					this.catalog = data.list;
					// console.log(this.catalog);
				}
			}
		});
		uni.request({
			url: this.httpUrl + '/course/operate/courseBaseMsgGet',
			method: 'POST',
			data: {
				courseId: this.courseId,
				studentId: studentId,
				majorId: this.majorId
			},
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			success: res => {
				if (res.data.code === 0) {
					this.chapterId = res.data.playEntity.chapterId;
					console.log('当前播放的章节id：' + this.chapterId);
					var str = res.data.path.substr(8, [res.data.path.length]);
					var str1 = str.replace(/\\/g, '/');
					// console.log(str1);
					this.src = this.httpUrl + str1;
					console.log(this.src);
					this.seenTime = res.data.playEntity.maxTime;
					this.videoContext.seek(Math.floor(res.data.playEntity.processTime));
					this.intro=res.data.entity
				}
			}
		});
	},
	methods: {
		show(chapterId, videoUrl) {
			this.$refs.unikModal.show();
			this.chapterId = chapterId;
			this.videoUrl = videoUrl;
			console.log('播放id=' + this.chapterId + '这章');
			console.log('视频路径为：' + this.videoUrl);
		},
		confirmModal() {
			var studentId = uni.getStorageSync('studentId');
			uni.request({
				url: this.httpUrl + '/vedio/operate/vedioPlay',
				method: 'POST',
				data: {
					chapterId: this.chapterId,
					studentId: studentId,
					majorId: this.majorId
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: res => {
					if (res.data.code === 0) {
						var str = this.videoUrl.substr(8, [this.videoUrl.length]);
						var str1 = str.replace(/\\/g, '/');
						// console.log(str1);
						this.src = this.httpUrl + str1;
						// console.log('视频地址为：' + this.src);
						this.seenTime = res.data.maxTime;
						this.videoContext.seek(Math.floor(res.data.currentTime));
					}
				}
			});
		},
		cancelModal() {
			console.log('您点击了关闭');
		},
		videoErrorCallback: function(e) {
			uni.showModal({
				content: e.target.errMsg,
				showCancel: false
			});
		},
		getRandomColor: function() {
			const rgb = [];
			for (let i = 0; i < 3; ++i) {
				let color = Math.floor(Math.random() * 256).toString(16);
				color = color.length == 1 ? '0' + color : color;
				rgb.push(color);
			}
			return '#' + rgb.join('');
		},
		// 滚动切换标签样式
		switchTab: function(e) {
			let that = this;
			this.currentTab = e.detail.current;
			this.checkCor();
		},
		// 点击标题切换当前页时改变样式
		swichNav: function(e) {
			let cur = e.currentTarget.dataset.current;
			if (this.currentTab == cur) {
				return false;
			} else {
				this.currentTab = cur;
			}
		},
		//判断当前滚动超过一屏时，设置tab标题滚动条。
		checkCor: function() {
			if (this.currentTab > 3) {
				//这里距离按实际计算
				this.scrollLeft = 300;
			} else {
				this.scrollLeft = 0;
			}
		},
		bindplay: function(e) {
			var that = this;
			var studentId = uni.getStorageSync('studentId');
			console.log('开始播放');
			uni.request({
				url: that.httpUrl + '/vedio/operate/insertMsgFirstTime',
				method: 'POST',
				data: {
					chapterId: that.chapterId,
					studentId: studentId,
					belongMajor: that.majorId
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: res => {
					if (res.data.code === 0) {
						console.log('请求成功');
					} 
					// else if (res.data.code === -1) {
					// 	that.tui.toast('您已看完视频，请及时完成习题');
					// } else {
					// 	that.tui.toast('您已经完成该课程，请及时完成考试');
					// }
				}
			});
			this.timer = setInterval(function() {
				uni.request({
					url: that.httpUrl + '/vedio/operate/timeSet',
					method: 'POST',
					data: {
						chapterId: that.chapterId,
						studentId: studentId,
						processTime: that.currentTime
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: res => {
						if (res.data.code === 0) {
							console.log('请求成功');
						}
					}
				});
			}, 2000);
		},
		bindpause: function(e) {
			if (this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			}
		},
		timeupdate: function(e) {
			if (e.detail.currentTime > this.seenTime) {
				//没看过直接快进
				// console.log(e.detail.currentTime - this.currentTime);
				if (e.detail.currentTime - this.currentTime > 3) {
					if (this.seenTime != 0) {
						// console.log('回退后快进');
						this.currentTime = e.detail.currentTime;
						this.videoContext.seek(Math.floor(this.seenTime));
						return false;
					} else {
						// console.log('你超长了');
						this.videoContext.seek(Math.floor(this.currentTime));
						return false;
					}
				}
			}
			this.currentTime = e.detail.currentTime;
			if (e.detail.currentTime - this.seenTime > 0.3) {
				//现在拉的进度条比所有看过的大，才记录seenTime
				this.seenTime = e.detail.currentTime;
			}
		}
	}
};
</script>

<style lang="less" scoped>
uni-page-body {
	height: 100%;
	width: 100%;
}

.container {
	height: 100%;
	width: 100%;

	.video-container {
		height: 230px;
		width: 100%;

		.myVideo {
			height: 100%;
			width: 100%;
		}
	}

	/*tabbar start*/
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

	.tab-view::before {
		content: '';
		position: absolute;
		border-bottom: 1upx solid #eaeef1;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		bottom: 0;
		right: 0;
		left: 0;
	}

	.tab-view {
		width: 100%;
		height: 100upx;
		overflow: hidden;
		box-sizing: border-box;
		/* #ifdef H5 */
		top: 44px;
		/* #endif */
		z-index: 99;
		background: #fff;
		white-space: nowrap;
	}

	.tab-bar-item {
		// width: 25.33%;
		width: 43%;
		padding: 0;
		height: 100upx;
		min-width: 80upx;
		line-height: 100upx;
		margin: 0 4%;
		display: inline-block;
		text-align: center;
		box-sizing: border-box;
	}

	.tab-bar-title {
		height: 100upx;
		line-height: 100upx;
		font-size: 32upx;
		color: #999;
		font-weight: 400;
	}

	.active {
		border-bottom: 6upx solid #5677fc;
	}

	.active .tab-bar-title {
		color: #5677fc !important;
		font-size: 36upx;
		font-weight: bold;
	}

	/*tabbar end*/
	.scoll-y {
		height: 100%;
	}

	.list-view {
		margin-bottom: 100upx;
		width: 100%;
		background: #fff;
		box-sizing: border-box;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.list-cell {
		padding: 30upx;
		box-sizing: border-box;
	}

	.cell-title-box {
		display: flex;
		justify-content: space-between;
	}

	.cell-title {
		font-size: 32upx;
		line-height: 56upx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		/* padding-bottom: 30upx; */
	}

	.img-container {
		width: 100%;
		padding-top: 24upx;
		display: flex;
		height: 160upx;
		justify-content: space-between;
	}

	.cell-img {
		width: 32%;
		overflow: hidden;
		position: relative;
	}

	.img {
		width: 100%;
		height: 160upx;
		display: block;
		/* position: absolute;
			  left: 50%;
			  top:50%;
			  transform: translate(-50%,-50%);
			*/
		border-radius: 4upx;
	}

	.sub-title {
		padding-top: 24upx;
		font-size: 28upx;
		color: #bcbcbc;
		display: flex;
		align-items: center;
	}

	.badge {
		padding: 5upx 10upx;
		font-size: 24upx;
		border-radius: 4upx;
		margin-right: 20upx;
	}

	.b-red {
		background: #fcebef;
		color: #8a5966;
	}

	.b-blue {
		background: #ecf6fd;
		color: #4dabeb;
	}

	.b-orange {
		background: #fef5eb;
		color: #faa851;
	}

	.b-green {
		background: #e8f6e8;
		color: #44cf85;
	}

	.card {
		width: 100%;
		background: #ffffff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-content: center;
		overflow: hidden;
		border-bottom: 6px #f5f5f5 solid;

		.card-header {
			position: relative;
			display: flex;
			flex-direction: row;
			align-items: center;
			line-height: 40upx;
			font-size: 32upx;
			color: #000000;
			padding: 34upx 24upx;
		}

		.card-content {
			line-height: 34upx;
			font-size: 28upx;
			color: #8f8f94;
			padding-left: 24upx;
			padding-bottom: 18upx;
		}
	}

	.imagetext {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 700upx;
		// background: #0BC99D;
		background: #999999;
	}

	.title-box {
		width: 80%;
		height: 60upx;
		font-size: 40upx;
		color: #ffffff;
		padding-top: 40upx;
		text-align: center;
	}

	.image-box {
		width: 80%;
		height: 850upx;
		margin-top: 40upx;
		margin-bottom: -100upx;
		background: #ffffff;
		border: 2px #ffffff solid;
		// box-shadow: 0px 2px 6px 0px rgba(11, 201, 157, 0.5);
		box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.5);
		border-radius: 20upx;

		.image-box-img {
			width: 100%;
			height: 100%;
		}
	}
	.catalog-list {
		display: flex;
		justify-content: center;
		flex-direction: column;
		width: 100%;

		.catalog-title {
			display: flex;
			margin: 5px;
			margin-top: 15px;
			padding: 5px;
			font-size: 35upx;
			line-height: 40upx;
			color: #999;
		}
		.catalog-section {
			width: 100%;
			display: flex;
			flex-direction: row;
			margin: 10px;

			.catalog-section-subtitle {
				width: 80%;
				padding-left: 15px;
				font-size: 30upx;
				line-height: 30upx;
				color: #999;
				// color:#DD524D
			}
			.img {
				left: 5px;
				width: 30upx;
				height: 30upx;
			}
			.img1 {
				margin-left: 10upx;
				width: 30upx;
				height: 30upx;
			}
		}
	}

	.catalog-list image {
		width: 100%;
		height: 100%;
	}
}
</style>
