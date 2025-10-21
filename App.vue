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
	body, div, ul, li, h1, h2, h3, h4, p, span, input, dl, dt, dd, a, table, form {
	    margin: 0;
	    padding: 0;
	    list-style: none;
	    font-family: '微软雅黑', 'Arial', 'sans-serif';
		box-sizing: border-box;
	}

	/* H5 内置 tabbar 强制固定底部，避免被布局挤压 */
	::v-deep .kb-open .uni-tabbar {
		transform: translateY(100%);
		transition: transform .15s ease;
	}

</style>
