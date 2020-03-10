import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
Vue.prototype.GLOBAL = App

App.mpType = 'app'

const tui = {
	toast: function(text, duration, success) {
		uni.showToast({
			title: text,
			icon: success ? 'success' : 'none',
			duration: duration || 2000
		})
	}
}

Vue.prototype.tui = tui

const app = new Vue({
    ...App
})
app.$mount()
