<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	.uni-tabbar-border {
	    background-color: transparent !important; /* 移除背景色 */
	    height: 0 !important; /* 隐藏边框元素 */
	    border: none !important; /* 确保无边框 */
	}
</style>
