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
		},
		globalData: {
			statusBarHeight: 0
		}
	}
</script>

<style>
	body, div, ul, li, h1, h2, h3, h4, p, span, input, dl, dt, dd, a, table, form {
	    margin: 0;
	    padding: 0;
	    list-style: none;
	    font-family: '微软雅黑', 'Arial', 'sans-serif';
		box-sizing: border-box;
	}
	page {
		background: #f3f7ff;
	}
</style>
