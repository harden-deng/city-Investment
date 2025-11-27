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
	/* .uni-tabbar-border {
	    background-color: transparent !important; 
	    height: 0 !important; 
	    border: none !important;
	} */
	
	body, div, ul, li, h1, h2, h3, h4, p, span, input, dl, dt, dd, a, table, form {
	    margin: 0;
	    padding: 0;
	    list-style: none;
	    font-family: '微软雅黑', 'Arial', 'sans-serif';
		box-sizing: border-box;
	}

	/* @media (min-aspect-ratio: 13/20) { */
        /* ::v-deep .uni-tabbar-bottom {
          display: none !important;
          height: 0 !important;
        }
        ::v-deep .uni-tabbar{
          display: none !important;
          height: 0 !important;
        } */
      /* } */
	/* @media (min-aspect-ratio: 13/20) {
	  ::v-deep .uni-tabbar-bottom {
		display: none !important;
		height: 0 !important;
		background-color: #fff !important;
	  }
	  ::v-deep .uni-tabbar{
		  display: none !important;
		  height: 0 !important;
	  }
	} */

	/* H5 内置 tabbar 强制固定底部，避免被布局挤压 */
	/* ::v-deep .kb-open .uni-tabbar {
		transform: translateY(100%);
		transition: transform .15s ease;
	} */

</style>
