<template>
	<view>
		<view id="top-box" class="cu-bar bg-white solid-bottom">
			<view class="action text-black">
				<text v-if="currentType === '2'">判断题</text>
				<text v-else-if="currentType === '0'">单选题</text>
				<text v-else-if="currentType === '1'">多选题</text>
			</view>
			<view class="action">
				<view>{{ subjectIndex + 1 }}/{{ subjectList.length }}</view>
			</view>
		</view>
		<form>
			<swiper :current="subjectIndex" class="swiper-box" @change="SwiperChange" :style="{ height: swiperHeight }">
				<swiper-item v-for="(subject, Index) in subjectList" :key="Index">
					<!-- <view v-if="Index - subjectIndex >= -1 && Index - subjectIndex <= 1"> -->
					<view class="cu-bar bg-white solid-bottom">
						<view class="action text-black">
							<text class="cuIcon-title text-red"></text>
							{{ subject.questionDesc }}
						</view>
					</view>
					<view>
						<radio-group class="block" @change="RadioboxChange" v-if="subject.questionType === '0' || subject.questionType === '2'">
							<view class="cu-form-group" v-for="option in subject.answerList">
								<radio :value="option.index"></radio>
								<view class="title text-black">{{ option.index }}.{{ option.answer }}</view>
							</view>
						</radio-group>

						<checkbox-group class="block" @change="CheckboxChange" v-else-if="subject.questionType === '1'">
							<view class="cu-form-group" v-for="option in subject.answerList">
								<checkbox :value="option.index"></checkbox>
								<view class="title  text-black">{{ option.index }}.{{ option.answer }}</view>
							</view>
						</checkbox-group>
					</view>
					<!-- </view> -->
				</swiper-item>
			</swiper>
		</form>
		<view id="foot-box" class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="submit()"><view class="text-gray" style="font-size: 30upx;">提交</view></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userFavor: false, //是否已收藏
			currentType: 0, //当前题型
			subjectIndex: 0, //跳转索引
			autoShowAnswer: false, //答错是否显答案
			autoRadioNext: true, //判断题、单项题，自动移下一题
			swiperHeight: '800px', //
			title: '考试',
			checkedValue: '',
			subjectList: [],
			courseId: 0, //章节id
			majorId: 0, //专业id
			Value: '', //最后一道题选择的值
			rightAnswer: '', //最后一道题的正确答案
			httpUrl: this.GLOBAL.httpUrl
		};
	},
	onReady() {
		var tempHeight = 800;
		var _me = this;
		uni.getSystemInfo({
			//获取手机屏幕高度信息，让swiper的高度和手机屏幕一样高
			success: function(res) {
				// console.log(res.model);
				// console.log(res.pixelRatio);
				// console.log(res.windowWidth);
				// console.log(res.windowHeight);
				// //这里是手机屏幕高度
				// console.log(res.language);
				// console.log(res.version);
				// console.log(res.platform);
				tempHeight = res.windowHeight;
				console.log('屏幕可用高度 ' + tempHeight);

				uni.createSelectorQuery()
					.select('#top-box')
					.fields(
						{
							size: true,
							scrollOffset: true
						},
						data => {
							tempHeight -= data.height;
							console.log('减掉顶部后的高度 ' + tempHeight);

							uni.createSelectorQuery()
								.select('#foot-box')
								.fields(
									{
										size: true,
										scrollOffset: true
									},
									data => {
										tempHeight -= data.height;
										console.log('减掉底部后的高度 ' + tempHeight);
										_me.swiperHeight = tempHeight + 'px';
										console.log('滑屏最后高度 ' + _me.swiperHeight);
									}
								)
								.exec();
						}
					)
					.exec();
			}
		});
	},
	onLoad(option) {
		this.courseId = option.courseId;
		this.majorId = option.majorId;
		console.log('课程id：' + this.courseId);
		console.log('专业id：' + this.majorId);
	},
	mounted() {
		// var studentId = uni.getStorageSync('studentId');
		uni.request({
			url: this.httpUrl + '/exam/operate/Examwork',
			method: 'POST',
			data: {
				courseId: this.courseId
			},
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			success: res => {
				if (res.data.code === 0) {
					console.log('请求成功');
					this.subjectList = res.data.list;
					this.currentType = this.subjectList[0].questionType;
				}
			}
		});
	},
	methods: {
		SwiperChange: function(e) {
			//滑动事件
			let index = e.target.current;
			if (index != undefined) {
				this.subjectIndex = index;
				this.currentType = this.subjectList[index].questionType;
				this.userFavor = this.subjectList[index].userFavor;
			}
		},

		RadioboxChange: function(e) {
			//单选选中
			var items = this.subjectList[this.subjectIndex].answerList;
			var values = e.detail.value;
			console.log('我选中的：' + values);
			console.log('正确答案：' + this.subjectList[this.subjectIndex].rightList);
			if (values == this.subjectList[this.subjectIndex].rightList && this.autoRadioNext && this.subjectIndex < this.subjectList.length - 1) {
				this.subjectIndex += 1;
			} else if (this.subjectIndex != this.subjectList.length - 1) {
				this.tui.toast('答案错误请重新选择');
			}
			if (this.subjectIndex === this.subjectList.length - 1) {
				this.Value = values;
				this.rightAnswer = this.subjectList[this.subjectIndex].rightList;
			}
		},
		CheckboxChange: function(e) {
			//多选
			var items = this.subjectList[this.subjectIndex].answerList;
			console.log(items);
			var values = e.detail.value;
			var rightanswer = this.subjectList[this.subjectIndex].rightList.join(''); //将正确答案转换成字符串
			var value = values.join(''); //选中的数组转换成字符串
			console.log('我选中的：' + values);
			console.log('正确答案：' + this.subjectList[this.subjectIndex].rightList);
			for (var i = 0, lenI = items.length; i < lenI; ++i) {
				const item = items[i];
				console.log(item);
				if (values.includes(item.index)) {
					this.$set(item, 'checked', true);
				} else {
					this.$set(item, 'checked', false);
				}
			}
			if (value == rightanswer && this.autoRadioNext && this.subjectIndex < this.subjectList.length - 1) {
				this.subjectIndex += 1;
			}
			if (this.subjectIndex === this.subjectList.length - 1) {
				this.Value = value;
				this.rightAnswer = rightanswer;
			}
		},
		submit: function() {
			var studentId = uni.getStorageSync('studentId');
			uni.request({
				url: this.httpUrl + '/exam/operate/completeExam',
				method: 'POST',
				data: {
					msgId: this.courseId,
					studentId: studentId,
					majorId: this.majorId,
					type: 0
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: res => {
					if (res.data.code === 0 && this.subjectIndex + 1 === this.subjectList.length && this.Value == this.rightAnswer) {
						this.tui.toast('提交成功');
						var majorId = this.majorId;
						setTimeout(function() {
							uni.redirectTo({
								url: '../course/list?studentId=' + studentId + '&majorId=' + majorId
							});
						}, 500);
					} else {
						this.tui.toast('请您完成所有习题再提交');
					}
				}
			});
		}
	}
};
</script>

<style scoped>
@import '../../colorui/animation.css';
@import '../../colorui/main.css';
@import '../../colorui/icon.css';

page {
	background-color: #ffffff;
}

/* uni-radio::before,
uni-checkbox::before {
	content: '' !important;
} */

.cu-form-group {
	justify-content: flex-start;
}

.cu-form-group .title {
	padding-left: 30upx;
	padding-right: 0upx;
}

.cu-form-group + .cu-form-group {
	border-top: none;
}

.cu-bar-title {
	min-height: 50upx;
}

.cu-list.menu > .cu-item-error {
	justify-content: flex-start;
}
</style>
