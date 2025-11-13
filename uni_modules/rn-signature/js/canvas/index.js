class CanvasControl {
	drawCount = 0; //次数
	ctx = null;
	_this = null;
	context = null;
	dpr = 1;
	points = [];
	newPoint = {};
	lastSpeed = 0;
	lastWidth = 8;
	config = {
		windowWidth: null,
		windowHeight: null,
		art: {
			enable: false
		}, //艺术字
		ctx: {
			lineWidth: 8,
			lineCap: "round",
			lineJoin: "round"
		},
		placeholder: {
			content: "请设置个性签名",
			fontSize: 40,
			textBaseline: "middle",
			textAlign: "center",
			fillStyle: "#888"
		}
	};
	options = {
		canvas_id: ""
	};
	constructor(options, _this) {
		this._this = _this;
		this.options = {
			...this.config,
			...(options || {}),
			art: {
				...this.config.art,
				...(options.art || {})
			},
			ctx: {
				...this.config.ctx,
				...(options.ctx || {})
			},
			placeholder: {
				...this.config.placeholder,
				...(options.placeholder || {})
			}
		};
		this.initPage();
		this.initCanvas();
	}
	//触摸开始
	touchstart(e) {
		//第一次绘画，清除placeholder
		if (this.drawCount == 0) {
			// #ifndef UNI-APP-X
			this.ctx.draw();
			// #endif
			// #ifdef UNI-APP-X
			this.ctx.clearRect(
				0,
				0,
				this.options.windowWidth,
				this.options.windowHeight
			);
			// #endif
		}
		this.initPen();
		this.drawCount++;
		this.ctx.beginPath();
		let x, y;
		let obj = e.changedTouches[0];
		x = obj.x || obj.clientX;
		y = obj.y || obj.clientY;

		this.points = [{
			x,
			y,
			time: Date.now()
		}];
		this.ctx.moveTo(x, y);
	}
	//触摸移动
	touchmove(e) {
		let x, y;
		let obj = e.changedTouches[0];
		x = obj.x || obj.clientX;
		y = obj.y || obj.clientY;

		if (this.options.art.enable) {
			this.speedCalc({
				x,
				y
			});
		} else {
			this.ctx.lineTo(x, y);
		}
		this.ctx.stroke();
		// #ifndef UNI-APP-X
		this.ctx.draw(true);
		// #endif
		this.ctx.moveTo(x, y);
	}
	speedCalc({
		x,
		y
	}) {
		this.newPoint = {
			x,
			y,
			time: Date.now()
		};
		// 计算速度
		const prevPoint = this.points[this.points.length - 1];
		const distance = Math.hypot(
			this.newPoint.x - prevPoint.x,
			this.newPoint.y - prevPoint.y
		);
		const speed = distance / (this.newPoint.time - prevPoint.time);
		let currentSpeed = this.lastSpeed * 0.3 + speed * 0.7;
		let targetWidth = this.options.ctx.lineWidth / (currentSpeed * 0.3 + 1);
		// 动态线宽（基础宽度8px）
		const newWidth = Math.min(
			this.lastWidth + 0.5,
			Math.max(this.lastWidth - 0.5, targetWidth)
		);
		this.ctx.lineWidth = newWidth;
		this.ctx.setLineCap("round");
		this.lastWidth = targetWidth;
		this.lastSpeed = currentSpeed;
		const cpx = (prevPoint.x + this.newPoint.x) / 2;
		const cpy = (prevPoint.y + this.newPoint.y) / 2;
		this.ctx.quadraticCurveTo(cpx, cpy, this.newPoint.x, this.newPoint.y);
		this.points.push(this.newPoint);
	}
	//触摸结束
	touchend() {
		this.points = [];
	}

	//旋转画布
	rotateCanvas() {
		console.log("saveClick");
		return new Promise((resolve, reject) => {
			// #ifdef UNI-APP-X
			let url = this.ctx.canvas.toDataURL("image/png");
			// #ifdef MP-WEIXIN || APP-PLUS || APP-HARMONY
			resolve(url);
			// #endif
			// #ifndef MP-WEIXIN || APP-PLUS || APP-HARMONY
			const img = new Image();
			img.src = url;
			img.onload = () => {
				// 旋转后宽高互换
				this.ctx.canvas.width = img.height;
				this.ctx.canvas.height = img.width;

				// 移动坐标系原点至中心
				this.ctx.translate(
					this.ctx.canvas.width / 2,
					this.ctx.canvas.height / 2
				);
				this.ctx.rotate(-Math.PI / 2); // 逆时针90°

				// 绘制图片（偏移量为负的宽高一半）
				this.ctx.drawImage(img, -img.width / 2, -img.height / 2);
				this.ctx.restore();
				// 导出旋转后的图片（可选）
				const rotatedImageUrl = this.ctx.canvas.toDataURL("image/png");

				resolve(rotatedImageUrl);
			};
			// #endif

			// #endif
			// #ifndef UNI-APP-X
			uni.canvasToTempFilePath({
					canvasId: "canvas_container",
					success: (file) => {
						let {
							tempFilePath
						} = file;
						// console.log(file,'file---file')
						// #ifdef MP-WEIXIN || APP-PLUS || APP-HARMONY
						resolve(tempFilePath);
						// #endif

						// #ifndef MP-WEIXIN || APP-PLUS || APP-HARMONY
						uni.getImageInfo({
							src: tempFilePath,
							success: (imageInfo) => {
								this.ctx.save();
								let scr = this.options.windowWidth / imageInfo.height;
								let width = this.options.windowWidth;
								let height = scr * imageInfo.width;
								this.ctx.translate(0, height);
								this.ctx.rotate((-90 * Math.PI) / 180);
								this.ctx.drawImage(imageInfo.path, 0, 0, height, width);
								this.ctx.draw(false, () => {
									console.log("重新绘制成功！");
									this.ctx.restore();
									uni.canvasToTempFilePath({
											canvasId: "canvas_container",
											width: width,
											height: height,
											success: (tempFile) => {
												resolve(tempFile.tempFilePath);
												// this.data.url = tempFile.tempFilePath
												// uni.navigateBack(-1)
											},
											fail(error) {
												console.log("画布转文件error:", error);
											}
										},
										this._this
									);
								});
							}
						});

						// #endif
					},
					fail(error) {
						console.log("处理生成的画布error:", error);
					}
				},
				this._this
			);

			// #endif
		});
	}

	//初始化画笔
	initPen() {
		this.ctx.lineWidth = this.options.ctx.lineWidth; //画笔粗细
		this.ctx.lineCap = this.options.ctx.lineCap; //画笔圆滑
		this.ctx.lineJoin = this.options.ctx.lineJoin;
		// #ifndef UNI-APP-X
		this.ctx.setShadow(0, 0, 0.5, "#000000"); //设置阴影
		// #endif
		// #ifdef UNI-APP-X
		this.ctx.shadowBlur = 0.5;
		this.ctx.shadowColor = "#000000";
		this.ctx.shadowOffsetX = 0;
		this.ctx.shadowOffsetY = 0.5;
		// #endif
	}
	//初始化页面-获取宽高
	async initPage() {
		let windowConfig = uni.getSystemInfoSync();
		this.options.windowWidth = windowConfig.windowWidth;
		this.options.windowHeight = windowConfig.windowHeight;
		// #ifdef VUE2
		// #ifdef MP-WEIXIN
		this.options.windowWidth = Math.max(
			windowConfig.windowWidth,
			windowConfig.windowHeight
		);
		this.options.windowHeight = Math.min(
			windowConfig.windowWidth,
			windowConfig.windowHeight
		);
		// #endif
		// #endif

		// #ifdef UNI-APP-X
		// #ifdef APP-HARMONY
		this.dpr = windowConfig.pixelRatio || 1;
		// #endif
		// #endif
	}
	//初始化画布
	async initCanvas() {
		if (!this.options.canvas_id) {
			console.log("请配置 canvas_id");
			return;
		}
		this.ctx = await this.createCanvasInstance(); //创建画布
		//判断是否有地址
		if (!this.validatenull(this.options.data.url)) {
			//you
			console.log("绘制图像到画布");
			this.initImageToCanvas();
		} else {
			//wu
			console.log("展示提示消息");
			this.resetConfig(); //提示消息
		}
	}
	createCanvasInstance() {
		return new Promise((resolve, reject) => {
			// #ifdef UNI-APP-X
			uni.createCanvasContextAsync({
				id: this.options.canvas_id,
				component: this._this,
				success: (context) => {
					const canvasContext = context.getContext("2d");
					this.context = context;

					const canvas = canvasContext.canvas;
					canvas.width = this.options.windowWidth * this.dpr;
					canvas.height = this.options.windowHeight * this.dpr;
					// #ifdef APP-HARMONY
					canvasContext.scale(this.dpr, this.dpr);
					// #endif
					resolve(canvasContext);
				},
				fail(err) {
					console.log("创建canvas实例失败：--", err);
					resolve(err);
				}
			});

			// #endif
			// #ifndef UNI-APP-X
			resolve(uni.createCanvasContext(this.options.canvas_id, this._this));
			// #endif
		});
	}
	// 判断是否为空
	validatenull(val) {
		if (typeof val == "boolean" || typeof val == "number") return false;
		if (val instanceof Array) {
			if (val.length == 0) return true;
		} else if (val instanceof Object) {
			if (JSON.stringify(val) === "{}") return true;
		} else {
			if (
				val == "null" ||
				val == null ||
				val == "undefined" ||
				val == undefined ||
				val == ""
			)
				return true;
			return false;
		}
		return false;
	}
	// 重置配置
	resetConfig() {
		this.drawCount = 0; //重置绘画次数
		this.initPlaceholder();
	}
	//初始化 提示文字
	initPlaceholder() {
		this.ctx.save();
		let {
			content,
			fontSize,
			textBaseline,
			textAlign,
			fillStyle
		} =
		this.options.placeholder;
		// #ifndef UNI-APP-X
		this.ctx.setFontSize(fontSize); //设置字体的字号
		this.ctx.setTextBaseline(textBaseline); //提示文字的水平对齐
		this.ctx.setTextAlign(textAlign); //提示文字的对齐
		this.ctx.setFillStyle(fillStyle); //设置填充色

		//-恢复 旋转，位移
		this.ctx.translate(
			this.options.windowWidth / 2,
			this.options.windowHeight / 2
		);
		// #ifndef MP-WEIXIN || APP-PLUS|| APP-HARMONY
		this.ctx.rotate((2 * Math.PI) / 4);
		// #endif
		this.ctx.fillText(content, 0, 0); //填充的文本
		this.ctx.draw(false, () => {
			this.ctx.restore();
		});
		// #endif

		// #ifdef UNI-APP-X
		this.ctx.font = "30px Arial";
		this.ctx.fillStyle = fillStyle;
		this.ctx.textAlign = textAlign;
		this.ctx.textBaseline = textBaseline;
		// this.ctx.fillText(content, 0, 0); //填充的文本
		this.ctx.clearRect(
			0,
			0,
			this.options.windowWidth,
			this.options.windowHeight
		);
		// this.ctx.fillText(content, 0, 0);
		//-恢复 旋转，位移
		this.ctx.translate(
			this.options.windowWidth / 2,
			this.options.windowHeight / 2
		);
		// #ifndef MP-WEIXIN || APP-PLUS|| APP-HARMONY
		this.ctx.rotate((2 * Math.PI) / 4);
		// #endif
		this.ctx.fillText(content, 0, 0); //填充的文本

		this.ctx.restore();
		// #endif
	}
	// 初始化图片到画布上
	async initImageToCanvas() {
		this.drawCount = 1;
		this.ctx.save();
		let url = this.options.data.url;

		// #ifdef UNI-APP-X
		// #ifndef APP-HARMONY ||MP-WEIXIN
		let img = new Image();
		// #endif
		// #ifdef APP-HARMONY ||MP-WEIXIN
		let img = this.context.createImage();
		// #endif
		img.src = url;
		img.onload = () => {
			// #ifndef APP-HARMONY || MP-WEIXIN || APP-PLUS
			// 移动坐标系原点至中心
			this.ctx.translate(this.ctx.canvas.width / 2, this.ctx.canvas.height / 2);
			this.ctx.rotate(Math.PI / 2); // 顺时针90°
			// 绘制图片（偏移量为负的宽高一半）
			this.ctx.drawImage(img, -img.width / 2, -img.height / 2);
			// #endif
			// #ifdef APP-HARMONY || MP-WEIXIN || APP-PLUS
			this.ctx.drawImage(
				img,
				0,
				0,
				this.options.windowWidth,
				this.options.windowHeight
			);
			// #endif
			this.ctx.restore();
		};
		// #endif

		// #ifndef UNI-APP-X
		uni.getImageInfo({
			src: url,
			success: (imageInfo) => {
				// console.log('imageInfo:', imageInfo)

				// #ifndef MP-WEIXIN || APP-PLUS || APP-HARMONY
				this.ctx.translate(this.options.windowWidth, 0);
				this.ctx.rotate((90 * Math.PI) / 180);
				this.ctx.drawImage(
					imageInfo.path,
					0,
					0,
					this.options.windowHeight,
					this.options.windowWidth
				);
				// #endif
				// #ifdef MP-WEIXIN || APP-PLUS || APP-HARMONY
				this.ctx.drawImage(
					imageInfo.path,
					0,
					0,
					this.options.windowWidth,
					this.options.windowHeight
				);
				// #endif
				this.ctx.draw(false, () => {
					this.ctx.restore();
				});
			},
			fail(error) {
				console.log("初始化图片到画布上error:", error);
			}
		});
		// #endif
	}
	// base64 转 临时文件
	base64ToTempFile(base64Data) {
		const fs = uni.getFileSystemManager();
		const fileName = `temp_${Date.now()}.png`;
		const filePath = `${uni.env.USER_DATA_PATH}/${fileName}`;
		// console.log(base64Data, filePath, fs, 'base64Data')
		// 去除base64前缀（如存在）
		const cleanBase64 = base64Data.replace(/^data:\w+\/\w+;base64,/, "");

		return new Promise((resolve, reject) => {
			fs.writeFile({
				filePath,
				data: uni.base64ToArrayBuffer(cleanBase64),
				encoding: "binary",
				success: () => resolve(filePath),
				fail: () => resolve(filePath)
			});
		});
	}
}

export default CanvasControl;