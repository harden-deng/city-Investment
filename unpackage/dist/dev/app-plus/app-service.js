var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global2 = uni.requireGlobal();
  ArrayBuffer = global2.ArrayBuffer;
  Int8Array = global2.Int8Array;
  Uint8Array = global2.Uint8Array;
  Uint8ClampedArray = global2.Uint8ClampedArray;
  Int16Array = global2.Int16Array;
  Uint16Array = global2.Uint16Array;
  Int32Array = global2.Int32Array;
  Uint32Array = global2.Uint32Array;
  Float32Array = global2.Float32Array;
  Float64Array = global2.Float64Array;
  BigInt64Array = global2.BigInt64Array;
  BigUint64Array = global2.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  const ON_SHOW = "onShow";
  const ON_HIDE = "onHide";
  const ON_LOAD = "onLoad";
  const ON_UNLOAD = "onUnload";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return typeof component === "string" ? easycom : component;
  }
  const createLifeCycleHook = (lifecycle, flag = 0) => (hook, target = vue.getCurrentInstance()) => {
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  };
  const onShow = /* @__PURE__ */ createLifeCycleHook(
    ON_SHOW,
    1 | 2
    /* HookFlags.PAGE */
  );
  const onHide = /* @__PURE__ */ createLifeCycleHook(
    ON_HIDE,
    1 | 2
    /* HookFlags.PAGE */
  );
  const onLoad = /* @__PURE__ */ createLifeCycleHook(
    ON_LOAD,
    2
    /* HookFlags.PAGE */
  );
  const onUnload = /* @__PURE__ */ createLifeCycleHook(
    ON_UNLOAD,
    2
    /* HookFlags.PAGE */
  );
  const fontData = [
    {
      "font_class": "arrow-down",
      "unicode": ""
    },
    {
      "font_class": "arrow-left",
      "unicode": ""
    },
    {
      "font_class": "arrow-right",
      "unicode": ""
    },
    {
      "font_class": "arrow-up",
      "unicode": ""
    },
    {
      "font_class": "auth",
      "unicode": ""
    },
    {
      "font_class": "auth-filled",
      "unicode": ""
    },
    {
      "font_class": "back",
      "unicode": ""
    },
    {
      "font_class": "bars",
      "unicode": ""
    },
    {
      "font_class": "calendar",
      "unicode": ""
    },
    {
      "font_class": "calendar-filled",
      "unicode": ""
    },
    {
      "font_class": "camera",
      "unicode": ""
    },
    {
      "font_class": "camera-filled",
      "unicode": ""
    },
    {
      "font_class": "cart",
      "unicode": ""
    },
    {
      "font_class": "cart-filled",
      "unicode": ""
    },
    {
      "font_class": "chat",
      "unicode": ""
    },
    {
      "font_class": "chat-filled",
      "unicode": ""
    },
    {
      "font_class": "chatboxes",
      "unicode": ""
    },
    {
      "font_class": "chatboxes-filled",
      "unicode": ""
    },
    {
      "font_class": "chatbubble",
      "unicode": ""
    },
    {
      "font_class": "chatbubble-filled",
      "unicode": ""
    },
    {
      "font_class": "checkbox",
      "unicode": ""
    },
    {
      "font_class": "checkbox-filled",
      "unicode": ""
    },
    {
      "font_class": "checkmarkempty",
      "unicode": ""
    },
    {
      "font_class": "circle",
      "unicode": ""
    },
    {
      "font_class": "circle-filled",
      "unicode": ""
    },
    {
      "font_class": "clear",
      "unicode": ""
    },
    {
      "font_class": "close",
      "unicode": ""
    },
    {
      "font_class": "closeempty",
      "unicode": ""
    },
    {
      "font_class": "cloud-download",
      "unicode": ""
    },
    {
      "font_class": "cloud-download-filled",
      "unicode": ""
    },
    {
      "font_class": "cloud-upload",
      "unicode": ""
    },
    {
      "font_class": "cloud-upload-filled",
      "unicode": ""
    },
    {
      "font_class": "color",
      "unicode": ""
    },
    {
      "font_class": "color-filled",
      "unicode": ""
    },
    {
      "font_class": "compose",
      "unicode": ""
    },
    {
      "font_class": "contact",
      "unicode": ""
    },
    {
      "font_class": "contact-filled",
      "unicode": ""
    },
    {
      "font_class": "down",
      "unicode": ""
    },
    {
      "font_class": "bottom",
      "unicode": ""
    },
    {
      "font_class": "download",
      "unicode": ""
    },
    {
      "font_class": "download-filled",
      "unicode": ""
    },
    {
      "font_class": "email",
      "unicode": ""
    },
    {
      "font_class": "email-filled",
      "unicode": ""
    },
    {
      "font_class": "eye",
      "unicode": ""
    },
    {
      "font_class": "eye-filled",
      "unicode": ""
    },
    {
      "font_class": "eye-slash",
      "unicode": ""
    },
    {
      "font_class": "eye-slash-filled",
      "unicode": ""
    },
    {
      "font_class": "fire",
      "unicode": ""
    },
    {
      "font_class": "fire-filled",
      "unicode": ""
    },
    {
      "font_class": "flag",
      "unicode": ""
    },
    {
      "font_class": "flag-filled",
      "unicode": ""
    },
    {
      "font_class": "folder-add",
      "unicode": ""
    },
    {
      "font_class": "folder-add-filled",
      "unicode": ""
    },
    {
      "font_class": "font",
      "unicode": ""
    },
    {
      "font_class": "forward",
      "unicode": ""
    },
    {
      "font_class": "gear",
      "unicode": ""
    },
    {
      "font_class": "gear-filled",
      "unicode": ""
    },
    {
      "font_class": "gift",
      "unicode": ""
    },
    {
      "font_class": "gift-filled",
      "unicode": ""
    },
    {
      "font_class": "hand-down",
      "unicode": ""
    },
    {
      "font_class": "hand-down-filled",
      "unicode": ""
    },
    {
      "font_class": "hand-up",
      "unicode": ""
    },
    {
      "font_class": "hand-up-filled",
      "unicode": ""
    },
    {
      "font_class": "headphones",
      "unicode": ""
    },
    {
      "font_class": "heart",
      "unicode": ""
    },
    {
      "font_class": "heart-filled",
      "unicode": ""
    },
    {
      "font_class": "help",
      "unicode": ""
    },
    {
      "font_class": "help-filled",
      "unicode": ""
    },
    {
      "font_class": "home",
      "unicode": ""
    },
    {
      "font_class": "home-filled",
      "unicode": ""
    },
    {
      "font_class": "image",
      "unicode": ""
    },
    {
      "font_class": "image-filled",
      "unicode": ""
    },
    {
      "font_class": "images",
      "unicode": ""
    },
    {
      "font_class": "images-filled",
      "unicode": ""
    },
    {
      "font_class": "info",
      "unicode": ""
    },
    {
      "font_class": "info-filled",
      "unicode": ""
    },
    {
      "font_class": "left",
      "unicode": ""
    },
    {
      "font_class": "link",
      "unicode": ""
    },
    {
      "font_class": "list",
      "unicode": ""
    },
    {
      "font_class": "location",
      "unicode": ""
    },
    {
      "font_class": "location-filled",
      "unicode": ""
    },
    {
      "font_class": "locked",
      "unicode": ""
    },
    {
      "font_class": "locked-filled",
      "unicode": ""
    },
    {
      "font_class": "loop",
      "unicode": ""
    },
    {
      "font_class": "mail-open",
      "unicode": ""
    },
    {
      "font_class": "mail-open-filled",
      "unicode": ""
    },
    {
      "font_class": "map",
      "unicode": ""
    },
    {
      "font_class": "map-filled",
      "unicode": ""
    },
    {
      "font_class": "map-pin",
      "unicode": ""
    },
    {
      "font_class": "map-pin-ellipse",
      "unicode": ""
    },
    {
      "font_class": "medal",
      "unicode": ""
    },
    {
      "font_class": "medal-filled",
      "unicode": ""
    },
    {
      "font_class": "mic",
      "unicode": ""
    },
    {
      "font_class": "mic-filled",
      "unicode": ""
    },
    {
      "font_class": "micoff",
      "unicode": ""
    },
    {
      "font_class": "micoff-filled",
      "unicode": ""
    },
    {
      "font_class": "minus",
      "unicode": ""
    },
    {
      "font_class": "minus-filled",
      "unicode": ""
    },
    {
      "font_class": "more",
      "unicode": ""
    },
    {
      "font_class": "more-filled",
      "unicode": ""
    },
    {
      "font_class": "navigate",
      "unicode": ""
    },
    {
      "font_class": "navigate-filled",
      "unicode": ""
    },
    {
      "font_class": "notification",
      "unicode": ""
    },
    {
      "font_class": "notification-filled",
      "unicode": ""
    },
    {
      "font_class": "paperclip",
      "unicode": ""
    },
    {
      "font_class": "paperplane",
      "unicode": ""
    },
    {
      "font_class": "paperplane-filled",
      "unicode": ""
    },
    {
      "font_class": "person",
      "unicode": ""
    },
    {
      "font_class": "person-filled",
      "unicode": ""
    },
    {
      "font_class": "personadd",
      "unicode": ""
    },
    {
      "font_class": "personadd-filled",
      "unicode": ""
    },
    {
      "font_class": "personadd-filled-copy",
      "unicode": ""
    },
    {
      "font_class": "phone",
      "unicode": ""
    },
    {
      "font_class": "phone-filled",
      "unicode": ""
    },
    {
      "font_class": "plus",
      "unicode": ""
    },
    {
      "font_class": "plus-filled",
      "unicode": ""
    },
    {
      "font_class": "plusempty",
      "unicode": ""
    },
    {
      "font_class": "pulldown",
      "unicode": ""
    },
    {
      "font_class": "pyq",
      "unicode": ""
    },
    {
      "font_class": "qq",
      "unicode": ""
    },
    {
      "font_class": "redo",
      "unicode": ""
    },
    {
      "font_class": "redo-filled",
      "unicode": ""
    },
    {
      "font_class": "refresh",
      "unicode": ""
    },
    {
      "font_class": "refresh-filled",
      "unicode": ""
    },
    {
      "font_class": "refreshempty",
      "unicode": ""
    },
    {
      "font_class": "reload",
      "unicode": ""
    },
    {
      "font_class": "right",
      "unicode": ""
    },
    {
      "font_class": "scan",
      "unicode": ""
    },
    {
      "font_class": "search",
      "unicode": ""
    },
    {
      "font_class": "settings",
      "unicode": ""
    },
    {
      "font_class": "settings-filled",
      "unicode": ""
    },
    {
      "font_class": "shop",
      "unicode": ""
    },
    {
      "font_class": "shop-filled",
      "unicode": ""
    },
    {
      "font_class": "smallcircle",
      "unicode": ""
    },
    {
      "font_class": "smallcircle-filled",
      "unicode": ""
    },
    {
      "font_class": "sound",
      "unicode": ""
    },
    {
      "font_class": "sound-filled",
      "unicode": ""
    },
    {
      "font_class": "spinner-cycle",
      "unicode": ""
    },
    {
      "font_class": "staff",
      "unicode": ""
    },
    {
      "font_class": "staff-filled",
      "unicode": ""
    },
    {
      "font_class": "star",
      "unicode": ""
    },
    {
      "font_class": "star-filled",
      "unicode": ""
    },
    {
      "font_class": "starhalf",
      "unicode": ""
    },
    {
      "font_class": "trash",
      "unicode": ""
    },
    {
      "font_class": "trash-filled",
      "unicode": ""
    },
    {
      "font_class": "tune",
      "unicode": ""
    },
    {
      "font_class": "tune-filled",
      "unicode": ""
    },
    {
      "font_class": "undo",
      "unicode": ""
    },
    {
      "font_class": "undo-filled",
      "unicode": ""
    },
    {
      "font_class": "up",
      "unicode": ""
    },
    {
      "font_class": "top",
      "unicode": ""
    },
    {
      "font_class": "upload",
      "unicode": ""
    },
    {
      "font_class": "upload-filled",
      "unicode": ""
    },
    {
      "font_class": "videocam",
      "unicode": ""
    },
    {
      "font_class": "videocam-filled",
      "unicode": ""
    },
    {
      "font_class": "vip",
      "unicode": ""
    },
    {
      "font_class": "vip-filled",
      "unicode": ""
    },
    {
      "font_class": "wallet",
      "unicode": ""
    },
    {
      "font_class": "wallet-filled",
      "unicode": ""
    },
    {
      "font_class": "weibo",
      "unicode": ""
    },
    {
      "font_class": "weixin",
      "unicode": ""
    }
  ];
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const getVal$1 = (val) => {
    const reg = /^[0-9]*$/g;
    return typeof val === "number" || reg.test(val) ? val + "px" : val;
  };
  const _sfc_main$z = {
    name: "UniIcons",
    emits: ["click"],
    props: {
      type: {
        type: String,
        default: ""
      },
      color: {
        type: String,
        default: "#333333"
      },
      size: {
        type: [Number, String],
        default: 16
      },
      customPrefix: {
        type: String,
        default: ""
      },
      fontFamily: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        icons: fontData
      };
    },
    computed: {
      unicode() {
        let code = this.icons.find((v) => v.font_class === this.type);
        if (code) {
          return code.unicode;
        }
        return "";
      },
      iconSize() {
        return getVal$1(this.size);
      },
      styleObj() {
        if (this.fontFamily !== "") {
          return `color: ${this.color}; font-size: ${this.iconSize}; font-family: ${this.fontFamily};`;
        }
        return `color: ${this.color}; font-size: ${this.iconSize};`;
      }
    },
    methods: {
      _onClick(e) {
        this.$emit("click", e);
      }
    }
  };
  function _sfc_render$y(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "text",
      {
        style: vue.normalizeStyle($options.styleObj),
        class: vue.normalizeClass(["uni-icons", ["uniui-" + $props.type, $props.customPrefix, $props.customPrefix ? $props.type : ""]]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options._onClick && $options._onClick(...args))
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$6 = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["render", _sfc_render$y], ["__scopeId", "data-v-d31e1c47"], ["__file", "E:/cityInvestment02/city-Investment/uni_modules/uni-icons/components/uni-icons/uni-icons.vue"]]);
  function obj2strClass(obj) {
    let classess = "";
    for (let key in obj) {
      const val = obj[key];
      if (val) {
        classess += `${key} `;
      }
    }
    return classess;
  }
  function obj2strStyle(obj) {
    let style = "";
    for (let key in obj) {
      const val = obj[key];
      style += `${key}:${val};`;
    }
    return style;
  }
  const _sfc_main$y = {
    name: "uni-easyinput",
    emits: [
      "click",
      "iconClick",
      "update:modelValue",
      "input",
      "focus",
      "blur",
      "confirm",
      "clear",
      "eyes",
      "change",
      "keyboardheightchange"
    ],
    model: {
      prop: "modelValue",
      event: "update:modelValue"
    },
    options: {
      virtualHost: true
    },
    inject: {
      form: {
        from: "uniForm",
        default: null
      },
      formItem: {
        from: "uniFormItem",
        default: null
      }
    },
    props: {
      name: String,
      value: [Number, String],
      modelValue: [Number, String],
      type: {
        type: String,
        default: "text"
      },
      clearable: {
        type: Boolean,
        default: true
      },
      autoHeight: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: " "
      },
      placeholderStyle: String,
      focus: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      maxlength: {
        type: [Number, String],
        default: 140
      },
      confirmType: {
        type: String,
        default: "done"
      },
      clearSize: {
        type: [Number, String],
        default: 24
      },
      inputBorder: {
        type: Boolean,
        default: true
      },
      prefixIcon: {
        type: String,
        default: ""
      },
      suffixIcon: {
        type: String,
        default: ""
      },
      trim: {
        type: [Boolean, String],
        default: false
      },
      cursorSpacing: {
        type: Number,
        default: 0
      },
      passwordIcon: {
        type: Boolean,
        default: true
      },
      adjustPosition: {
        type: Boolean,
        default: true
      },
      primaryColor: {
        type: String,
        default: "#2979ff"
      },
      styles: {
        type: Object,
        default() {
          return {
            color: "#333",
            backgroundColor: "#fff",
            disableColor: "#F7F6F6",
            borderColor: "#e5e5e5"
          };
        }
      },
      errorMessage: {
        type: [String, Boolean],
        default: ""
      }
    },
    data() {
      return {
        focused: false,
        val: "",
        showMsg: "",
        border: false,
        isFirstBorder: false,
        showClearIcon: false,
        showPassword: false,
        focusShow: false,
        localMsg: "",
        isEnter: false
        // 用于判断当前是否是使用回车操作
      };
    },
    computed: {
      // 输入框内是否有值
      isVal() {
        const val = this.val;
        if (val || val === 0) {
          return true;
        }
        return false;
      },
      msg() {
        return this.localMsg || this.errorMessage;
      },
      // 因为uniapp的input组件的maxlength组件必须要数值，这里转为数值，用户可以传入字符串数值
      inputMaxlength() {
        return Number(this.maxlength);
      },
      // 处理外层样式的style
      boxStyle() {
        return `color:${this.inputBorder && this.msg ? "#e43d33" : this.styles.color};`;
      },
      // input 内容的类和样式处理
      inputContentClass() {
        return obj2strClass({
          "is-input-border": this.inputBorder,
          "is-input-error-border": this.inputBorder && this.msg,
          "is-textarea": this.type === "textarea",
          "is-disabled": this.disabled,
          "is-focused": this.focusShow
        });
      },
      inputContentStyle() {
        const focusColor = this.focusShow ? this.primaryColor : this.styles.borderColor;
        const borderColor = this.inputBorder && this.msg ? "#dd524d" : focusColor;
        return obj2strStyle({
          "border-color": borderColor || "#e5e5e5",
          "background-color": this.disabled ? this.styles.disableColor : this.styles.backgroundColor
        });
      },
      // input右侧样式
      inputStyle() {
        const paddingRight = this.type === "password" || this.clearable || this.prefixIcon ? "" : "10px";
        return obj2strStyle({
          "padding-right": paddingRight,
          "padding-left": this.prefixIcon ? "" : "10px"
        });
      }
    },
    watch: {
      value(newVal) {
        if (newVal === null) {
          this.val = "";
          return;
        }
        this.val = newVal;
      },
      modelValue(newVal) {
        if (newVal === null) {
          this.val = "";
          return;
        }
        this.val = newVal;
      },
      focus(newVal) {
        this.$nextTick(() => {
          this.focused = this.focus;
          this.focusShow = this.focus;
        });
      }
    },
    created() {
      this.init();
      if (this.form && this.formItem) {
        this.$watch("formItem.errMsg", (newVal) => {
          this.localMsg = newVal;
        });
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.focused = this.focus;
        this.focusShow = this.focus;
      });
    },
    methods: {
      /**
       * 初始化变量值
       */
      init() {
        if (this.value || this.value === 0) {
          this.val = this.value;
        } else if (this.modelValue || this.modelValue === 0 || this.modelValue === "") {
          this.val = this.modelValue;
        } else {
          this.val = "";
        }
      },
      /**
       * 点击图标时触发
       * @param {Object} type
       */
      onClickIcon(type) {
        this.$emit("iconClick", type);
      },
      /**
       * 显示隐藏内容，密码框时生效
       */
      onEyes() {
        this.showPassword = !this.showPassword;
        this.$emit("eyes", this.showPassword);
      },
      /**
       * 输入时触发
       * @param {Object} event
       */
      onInput(event) {
        let value = event.detail.value;
        if (this.trim) {
          if (typeof this.trim === "boolean" && this.trim) {
            value = this.trimStr(value);
          }
          if (typeof this.trim === "string") {
            value = this.trimStr(value, this.trim);
          }
        }
        if (this.errMsg)
          this.errMsg = "";
        this.val = value;
        this.$emit("update:modelValue", value);
        this.$emit("input", value);
      },
      /**
       * 外部调用方法
       * 获取焦点时触发
       * @param {Object} event
       */
      onFocus() {
        this.$nextTick(() => {
          this.focused = true;
        });
        this.$emit("focus", null);
      },
      _Focus(event) {
        this.focusShow = true;
        this.$emit("focus", event);
      },
      /**
       * 外部调用方法
       * 失去焦点时触发
       * @param {Object} event
       */
      onBlur() {
        this.focused = false;
        this.$emit("blur", null);
      },
      _Blur(event) {
        event.detail.value;
        this.focusShow = false;
        this.$emit("blur", event);
        if (this.isEnter === false) {
          this.$emit("change", this.val);
        }
        if (this.form && this.formItem) {
          const { validateTrigger } = this.form;
          if (validateTrigger === "blur") {
            this.formItem.onFieldChange();
          }
        }
      },
      /**
       * 按下键盘的发送键
       * @param {Object} e
       */
      onConfirm(e) {
        this.$emit("confirm", this.val);
        this.isEnter = true;
        this.$emit("change", this.val);
        this.$nextTick(() => {
          this.isEnter = false;
        });
      },
      /**
       * 清理内容
       * @param {Object} event
       */
      onClear(event) {
        this.val = "";
        this.$emit("input", "");
        this.$emit("update:modelValue", "");
        this.$emit("clear");
      },
      /**
       * 键盘高度发生变化的时候触发此事件
       * 兼容性：微信小程序2.7.0+、App 3.1.0+
       * @param {Object} event
       */
      onkeyboardheightchange(event) {
        this.$emit("keyboardheightchange", event);
      },
      /**
       * 去除空格
       */
      trimStr(str, pos = "both") {
        if (pos === "both") {
          return str.trim();
        } else if (pos === "left") {
          return str.trimLeft();
        } else if (pos === "right") {
          return str.trimRight();
        } else if (pos === "start") {
          return str.trimStart();
        } else if (pos === "end") {
          return str.trimEnd();
        } else if (pos === "all") {
          return str.replace(/\s+/g, "");
        } else if (pos === "none") {
          return str;
        }
        return str;
      }
    }
  };
  function _sfc_render$x(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$6);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-easyinput", { "uni-easyinput-error": $options.msg }]),
        style: vue.normalizeStyle($options.boxStyle)
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["uni-easyinput__content", $options.inputContentClass]),
            style: vue.normalizeStyle($options.inputContentStyle)
          },
          [
            $props.prefixIcon ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
              key: 0,
              class: "content-clear-icon",
              type: $props.prefixIcon,
              color: "#c0c4cc",
              onClick: _cache[0] || (_cache[0] = ($event) => $options.onClickIcon("prefix")),
              size: "22"
            }, null, 8, ["type"])) : vue.createCommentVNode("v-if", true),
            vue.renderSlot(_ctx.$slots, "left", {}, void 0, true),
            $props.type === "textarea" ? (vue.openBlock(), vue.createElementBlock("textarea", {
              key: 1,
              class: vue.normalizeClass(["uni-easyinput__content-textarea", { "input-padding": $props.inputBorder }]),
              name: $props.name,
              value: $data.val,
              placeholder: $props.placeholder,
              placeholderStyle: $props.placeholderStyle,
              disabled: $props.disabled,
              "placeholder-class": "uni-easyinput__placeholder-class",
              maxlength: $options.inputMaxlength,
              focus: $data.focused,
              autoHeight: $props.autoHeight,
              "cursor-spacing": $props.cursorSpacing,
              "adjust-position": $props.adjustPosition,
              onInput: _cache[1] || (_cache[1] = (...args) => $options.onInput && $options.onInput(...args)),
              onBlur: _cache[2] || (_cache[2] = (...args) => $options._Blur && $options._Blur(...args)),
              onFocus: _cache[3] || (_cache[3] = (...args) => $options._Focus && $options._Focus(...args)),
              onConfirm: _cache[4] || (_cache[4] = (...args) => $options.onConfirm && $options.onConfirm(...args)),
              onKeyboardheightchange: _cache[5] || (_cache[5] = (...args) => $options.onkeyboardheightchange && $options.onkeyboardheightchange(...args))
            }, null, 42, ["name", "value", "placeholder", "placeholderStyle", "disabled", "maxlength", "focus", "autoHeight", "cursor-spacing", "adjust-position"])) : (vue.openBlock(), vue.createElementBlock("input", {
              key: 2,
              type: $props.type === "password" ? "text" : $props.type,
              class: "uni-easyinput__content-input",
              style: vue.normalizeStyle($options.inputStyle),
              name: $props.name,
              value: $data.val,
              password: !$data.showPassword && $props.type === "password",
              placeholder: $props.placeholder,
              placeholderStyle: $props.placeholderStyle,
              "placeholder-class": "uni-easyinput__placeholder-class",
              disabled: $props.disabled,
              maxlength: $options.inputMaxlength,
              focus: $data.focused,
              confirmType: $props.confirmType,
              "cursor-spacing": $props.cursorSpacing,
              "adjust-position": $props.adjustPosition,
              onFocus: _cache[6] || (_cache[6] = (...args) => $options._Focus && $options._Focus(...args)),
              onBlur: _cache[7] || (_cache[7] = (...args) => $options._Blur && $options._Blur(...args)),
              onInput: _cache[8] || (_cache[8] = (...args) => $options.onInput && $options.onInput(...args)),
              onConfirm: _cache[9] || (_cache[9] = (...args) => $options.onConfirm && $options.onConfirm(...args)),
              onKeyboardheightchange: _cache[10] || (_cache[10] = (...args) => $options.onkeyboardheightchange && $options.onkeyboardheightchange(...args))
            }, null, 44, ["type", "name", "value", "password", "placeholder", "placeholderStyle", "disabled", "maxlength", "focus", "confirmType", "cursor-spacing", "adjust-position"])),
            $props.type === "password" && $props.passwordIcon ? (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 3 },
              [
                $options.isVal ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
                  key: 0,
                  class: vue.normalizeClass(["content-clear-icon", { "is-textarea-icon": $props.type === "textarea" }]),
                  type: $data.showPassword ? "eye-slash-filled" : "eye-filled",
                  size: 22,
                  color: $data.focusShow ? $props.primaryColor : "#c0c4cc",
                  onClick: $options.onEyes
                }, null, 8, ["class", "type", "color", "onClick"])) : vue.createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            )) : vue.createCommentVNode("v-if", true),
            $props.suffixIcon ? (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 4 },
              [
                $props.suffixIcon ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
                  key: 0,
                  class: "content-clear-icon",
                  type: $props.suffixIcon,
                  color: "#c0c4cc",
                  onClick: _cache[11] || (_cache[11] = ($event) => $options.onClickIcon("suffix")),
                  size: "22"
                }, null, 8, ["type"])) : vue.createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            )) : (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 5 },
              [
                $props.clearable && $options.isVal && !$props.disabled && $props.type !== "textarea" ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
                  key: 0,
                  class: vue.normalizeClass(["content-clear-icon", { "is-textarea-icon": $props.type === "textarea" }]),
                  type: "clear",
                  size: $props.clearSize,
                  color: $options.msg ? "#dd524d" : $data.focusShow ? $props.primaryColor : "#c0c4cc",
                  onClick: $options.onClear
                }, null, 8, ["class", "size", "color", "onClick"])) : vue.createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            )),
            vue.renderSlot(_ctx.$slots, "right", {}, void 0, true)
          ],
          6
          /* CLASS, STYLE */
        )
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$5 = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["render", _sfc_render$x], ["__scopeId", "data-v-09fd5285"], ["__file", "E:/cityInvestment02/city-Investment/uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.vue"]]);
  const setStorage = (key, value, expireSeconds) => {
    try {
      const data = { value };
      if (expireSeconds && expireSeconds > 0) {
        data.expire = Date.now() + expireSeconds * 1e3;
      }
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      formatAppLog("warn", "at utils/storage.js:10", "localStorage set error:", e);
    }
  };
  const getStorage = (key) => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw)
        return null;
      const { value, expire } = JSON.parse(raw);
      if (expire && Date.now() > expire) {
        localStorage.removeItem(key);
        return null;
      }
      return value;
    } catch (e) {
      formatAppLog("warn", "at utils/storage.js:26", "localStorage get error:", e);
      return null;
    }
  };
  const removeStorage = (key) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      formatAppLog("warn", "at utils/storage.js:36", "localStorage remove error:", e);
    }
  };
  const myconfig = {
    // 开发环境使用代理，生产环境使用真实地址
    base_url: "/WebApi/api"
    // base_url: '/WebApi/api'
  };
  const http = {
    config: {
      baseUrl: myconfig.base_url,
      header: {
        "Content-Type": "application/json;charset=UTF-8"
        // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      data: {},
      method: "POST",
      dataType: "json",
      responseType: "text",
      success() {
      },
      fail() {
      },
      complete() {
      }
    },
    // 拦截器
    // interceptor: {
    // 	request: null, //请求
    // 	response: null //响应
    // },
    request(options) {
      if (!options) {
        options = {};
      }
      options.baseUrl = options.baseUrl || this.config.baseUrl;
      options.dataType = options.dataType || this.config.dataType;
      options.url = options.baseUrl + options.url;
      options.sslVerify = false;
      options.data = options.data || {};
      options.method = options.method || this.config.method;
      if (options.dataType === "json") {
        options.header = {
          ...options.header,
          "Content-Type": "application/json;charset=UTF-8"
        };
      } else {
        options.header = {
          ...options.header,
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        };
      }
      if (uni.getStorageSync("token")) {
        options.header = {
          ...options.header,
          "Authorization": "Bearer " + uni.getStorageSync("token") || ""
        };
      } else {
        options.header = {
          ...options.header
        };
      }
      return new Promise((resolve, reject) => {
        let _config = null;
        options.complete = (response) => {
          let statusCode = response.statusCode;
          response.config = _config;
          if (statusCode === 200) {
            resolve(response.data);
          } else if (statusCode === 401) {
            uni.clearStorageSync();
            uni.setStorageSync("token", "");
            uni.reLaunch({
              url: "/pages/index/index"
            });
          } else {
            reject(response);
          }
        };
        _config = Object.assign({}, this.config, options);
        _config.requestId = (/* @__PURE__ */ new Date()).getTime();
        {
          formatAppLog("log", "at utils/request.js:91", "请求_config:", _config);
          formatAppLog("log", "at utils/request.js:92", "请求URL:", _config.url);
          formatAppLog("log", "at utils/request.js:93", "请求方法:", _config.method);
          formatAppLog("log", "at utils/request.js:94", "请求头:", _config.header);
          formatAppLog("log", "at utils/request.js:95", "请求数据:", _config.data);
        }
        uni.request(_config);
      });
    },
    get(url, data, options) {
      if (!options) {
        options = {};
      }
      options.url = url;
      options.data = data;
      options.method = "GET";
      return this.request(options);
    },
    post(url, data, options) {
      if (!options) {
        options = {};
      }
      options.url = url;
      options.data = data;
      options.method = "POST";
      return this.request(options);
    },
    put(url, data, options) {
      if (!options) {
        options = {};
      }
      options.url = url;
      options.data = data;
      options.method = "PUT";
      return this.request(options);
    },
    delete(url, data, options) {
      if (!options) {
        options = {};
      }
      options.url = url;
      options.data = data;
      options.method = "DELETE";
      return this.request(options);
    }
  };
  const _imports_0$5 = "/static/images/login.png";
  const _sfc_main$x = {
    __name: "index",
    setup(__props, { expose: __expose }) {
      __expose();
      const styles = {
        placeholderColor: "#999999"
      };
      const statusBarHeight = vue.ref(0);
      const phoneNumber = vue.ref("sybjbro");
      const password = vue.ref(123);
      onLoad(() => {
        const statusBarHeightNew = getStorage("statusBarHeight");
        if (Number(statusBarHeightNew) != 0) {
          statusBarHeight.value = Number(statusBarHeightNew);
        }
      });
      const handleLogin = () => {
        if (!phoneNumber.value || !password.value) {
          uni.showToast({
            title: "请输入账号和密码",
            icon: "none"
          });
          return;
        }
        if (uni.getStorageSync("token")) {
          uni.switchTab({
            url: "/pages/nav/home"
          });
          return;
        }
        http.post("/Auth/accountlogin", {
          userAccount: phoneNumber.value,
          userPassword: password.value
        }).then((res) => {
          formatAppLog("log", "at pages/index/index.vue:84", "登录成功", res);
          if (res.code == 0) {
            uni.setStorageSync("token", res.data.accessToken);
            uni.setStorageSync("userFullName", res.data.userFullName);
            getUserInfo();
            uni.switchTab({
              url: "/pages/nav/home"
            });
          } else {
            uni.showToast({
              title: res.msg,
              icon: "none"
            });
          }
        }).catch((err) => {
          formatAppLog("log", "at pages/index/index.vue:99", "登录失败", err);
        });
      };
      const getUserInfo = () => {
        http.get("/Users/GetUserInfo").then((res) => {
          if (res.code == 0) {
            uni.setStorageSync("userInfo", res.data);
          }
        });
      };
      const __returned__ = { styles, statusBarHeight, phoneNumber, password, handleLogin, getUserInfo, get onLoad() {
        return onLoad;
      }, ref: vue.ref, onMounted: vue.onMounted, computed: vue.computed, get setStorage() {
        return setStorage;
      }, get getStorage() {
        return getStorage;
      }, get removeStorage() {
        return removeStorage;
      }, get http() {
        return http;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$w(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0$5);
    return vue.openBlock(), vue.createElementBlock("view", { class: "login-container" }, [
      vue.createElementVNode(
        "view",
        {
          class: "status_bar",
          style: vue.normalizeStyle({ height: `${$setup.statusBarHeight * 2}rpx` })
        },
        null,
        4
        /* STYLE */
      ),
      vue.createElementVNode("view", { class: "header-section" }, [
        vue.createElementVNode("image", {
          class: "login-image",
          src: _imports_0$5,
          mode: ""
        })
      ]),
      vue.createElementVNode("view", { class: "form-container" }, [
        vue.createElementVNode("view", { class: "input-group" }, [
          vue.createVNode(_component_uni_easyinput, {
            border: false,
            height: "150px",
            styles: $setup.styles,
            modelValue: $setup.phoneNumber,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.phoneNumber = $event),
            placeholder: "请输入您的平台账号"
          }, null, 8, ["modelValue"])
        ]),
        vue.createElementVNode("view", { class: "input-group" }, [
          vue.createVNode(_component_uni_easyinput, {
            type: "password",
            modelValue: $setup.password,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.password = $event),
            placeholder: "请输入您的密码"
          }, null, 8, ["modelValue"])
        ]),
        vue.createElementVNode("button", {
          class: "login-btn",
          onClick: $setup.handleLogin
        }, " 登录 ")
      ])
    ]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["render", _sfc_render$w], ["__scopeId", "data-v-1cf27b2a"], ["__file", "E:/cityInvestment02/city-Investment/pages/index/index.vue"]]);
  const _imports_0$4 = "/static/images/ib_1.jpg";
  const _imports_1$1 = "/static/images/ib_2.jpg";
  const _sfc_main$w = {
    __name: "home",
    setup(__props, { expose: __expose }) {
      __expose();
      const statusBarHeight = vue.ref(0);
      const tabBarHeight = vue.ref(0);
      const windowHeight = vue.ref(0);
      const announcements = vue.ref("");
      onLoad(() => {
        const statusBarHeightNew = getStorage("statusBarHeight");
        if (Number(statusBarHeightNew) != 0) {
          statusBarHeight.value = Number(statusBarHeightNew);
        }
      });
      onShow(() => {
        vue.nextTick(() => {
          getAnnouncements();
        });
      });
      const getAnnouncements = () => {
        http.get("/WF/GetAnnouncements").then((res) => {
          if (res.code == 0) {
            announcements.value = res.data;
          }
        });
      };
      const quickAccessList = vue.ref([
        {
          label: "待办流程",
          imgUrl: "../../static/images/index_menu_1.svg",
          path: "/pages/nav/pending",
          bjColor: "#6599ff",
          isTab: true
        },
        {
          label: "已办流程",
          imgUrl: "../../static/images/index_menu_2.svg",
          path: "/pages/nav/completed",
          bjColor: "#9933ff",
          isTab: true
        },
        {
          label: "掌上看板",
          imgUrl: "../../static/images/index_menu_3.svg",
          path: "",
          bjColor: "#65cb33",
          isTab: false
        },
        {
          label: "在线帮助",
          imgUrl: "../../static/images/index_menu_4.svg",
          path: "/pages/info/help",
          bjColor: "#33cb99",
          isTab: false
        }
      ]);
      const handleQuickAccess = (item) => {
        if (!item.path) {
          uni.showToast({
            title: `${item.label}功能开发中`,
            icon: "none"
          });
          return;
        }
        item.isTab ? uni.switchTab({
          url: item.path
        }) : uni.navigateTo({
          url: item.path
        });
      };
      const handleNotification = () => {
        uni.navigateTo({
          url: "/pages/info/msg"
        });
      };
      const scrollViewHeight = vue.computed(() => {
        return `${Math.max(0, windowHeight.value - tabBarHeight.value)}px`;
      });
      vue.onMounted(() => {
        var _a;
        try {
          const sys = uni.getSystemInfoSync();
          formatAppLog("log", "at pages/nav/home.vue:149", "sys=>", sys);
          windowHeight.value = sys.windowHeight;
        } catch (e) {
          windowHeight.value = 600;
        }
        (_a = uni.onWindowResize) == null ? void 0 : _a.call(uni, () => {
          var _a2;
          const sys = (_a2 = uni.getSystemInfoSync) == null ? void 0 : _a2.call(uni);
          if (sys == null ? void 0 : sys.windowHeight)
            windowHeight.value = sys.windowHeight;
        });
      });
      const __returned__ = { statusBarHeight, tabBarHeight, windowHeight, announcements, getAnnouncements, quickAccessList, handleQuickAccess, handleNotification, scrollViewHeight, get onLoad() {
        return onLoad;
      }, get onShow() {
        return onShow;
      }, ref: vue.ref, onMounted: vue.onMounted, computed: vue.computed, nextTick: vue.nextTick, get getStorage() {
        return getStorage;
      }, get http() {
        return http;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$v(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "workplace-container" }, [
      vue.createElementVNode(
        "scroll-view",
        {
          "scroll-y": "true",
          class: "scroller",
          style: vue.normalizeStyle({ height: $setup.scrollViewHeight })
        },
        [
          vue.createElementVNode("view", { class: "header-stickt" }, [
            vue.createElementVNode(
              "view",
              {
                class: "status_bar",
                style: vue.normalizeStyle({ height: `${$setup.statusBarHeight * 2}rpx` })
              },
              null,
              4
              /* STYLE */
            ),
            vue.createElementVNode("view", { class: "header-banner" }, [
              vue.createElementVNode("view", { class: "banner-bg" })
            ]),
            vue.createElementVNode("view", { class: "notification-bar" }, [
              vue.createElementVNode("view", {
                class: "notification-content",
                onClick: $setup.handleNotification,
                role: "button",
                tabindex: "0"
              }, [
                vue.createElementVNode("view", { class: "speaker-icon" }),
                vue.createElementVNode(
                  "text",
                  { class: "notification-text" },
                  "·" + vue.toDisplayString($setup.announcements || "暂无公告"),
                  1
                  /* TEXT */
                )
              ])
            ])
          ]),
          vue.createElementVNode("view", { class: "main-content" }, [
            vue.createElementVNode("view", { class: "quick-access" }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($setup.quickAccessList, (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "access-item",
                    key: index,
                    onClick: ($event) => $setup.handleQuickAccess(item)
                  }, [
                    vue.createElementVNode(
                      "view",
                      {
                        class: "access-icon",
                        style: vue.normalizeStyle({ backgroundColor: item.bjColor })
                      },
                      [
                        vue.createElementVNode("image", {
                          src: item.imgUrl,
                          mode: "aspectFit",
                          style: { "width": "59%", "height": "59%" }
                        }, null, 8, ["src"])
                      ],
                      4
                      /* STYLE */
                    ),
                    vue.createElementVNode(
                      "text",
                      { class: "access-label" },
                      vue.toDisplayString(item.label),
                      1
                      /* TEXT */
                    )
                  ], 8, ["onClick"]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ]),
            vue.createElementVNode("view", { class: "announcement-section" }, [
              vue.createElementVNode("view", { class: "section-title" }, [
                vue.createElementVNode("view", { class: "section-title-text" }, "在线公示"),
                vue.createElementVNode("text", { class: "section-title-bj" })
              ]),
              vue.createElementVNode("view", { class: "announcement-banner" }, [
                vue.createElementVNode("image", {
                  class: "announcement-img",
                  src: _imports_0$4,
                  loading: "lazy",
                  "aria-label": "在线公示"
                })
              ])
            ]),
            vue.createElementVNode("view", { class: "help-section" }, [
              vue.createElementVNode("image", {
                src: _imports_1$1,
                mode: "",
                "aria-label": "在线帮助",
                loading: "lazy",
                style: { "width": "100%", "height": "100%", "border-radius": "24rpx" }
              })
            ])
          ])
        ],
        4
        /* STYLE */
      )
    ]);
  }
  const PagesNavHome = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["render", _sfc_render$v], ["__scopeId", "data-v-5095b4b9"], ["__file", "E:/cityInvestment02/city-Investment/pages/nav/home.vue"]]);
  const _sfc_main$v = {
    name: "UniStatusBar",
    data() {
      return {
        statusBarHeight: uni.getSystemInfoSync().statusBarHeight + "px"
      };
    }
  };
  function _sfc_render$u(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        style: vue.normalizeStyle({ height: $data.statusBarHeight }),
        class: "uni-status-bar"
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      4
      /* STYLE */
    );
  }
  const statusBar = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["render", _sfc_render$u], ["__scopeId", "data-v-7920e3e0"], ["__file", "E:/cityInvestment02/city-Investment/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-status-bar.vue"]]);
  const getVal = (val) => typeof val === "number" ? val + "px" : val;
  const _sfc_main$u = {
    name: "UniNavBar",
    components: {
      statusBar
    },
    emits: ["clickLeft", "clickRight", "clickTitle"],
    props: {
      dark: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ""
      },
      leftText: {
        type: String,
        default: ""
      },
      rightText: {
        type: String,
        default: ""
      },
      leftIcon: {
        type: String,
        default: ""
      },
      rightIcon: {
        type: String,
        default: ""
      },
      fixed: {
        type: [Boolean, String],
        default: false
      },
      color: {
        type: String,
        default: ""
      },
      backgroundColor: {
        type: String,
        default: ""
      },
      statusBar: {
        type: [Boolean, String],
        default: false
      },
      shadow: {
        type: [Boolean, String],
        default: false
      },
      border: {
        type: [Boolean, String],
        default: true
      },
      height: {
        type: [Number, String],
        default: 44
      },
      leftWidth: {
        type: [Number, String],
        default: 60
      },
      rightWidth: {
        type: [Number, String],
        default: 60
      },
      showMenuButtonWidth: {
        type: Boolean,
        default: false
      },
      stat: {
        type: [Boolean, String],
        default: ""
      }
    },
    data() {
      return {
        navWidth: "auto"
      };
    },
    computed: {
      themeBgColor() {
        if (this.dark) {
          if (this.backgroundColor) {
            return this.backgroundColor;
          } else {
            return this.dark ? "#333" : "#FFF";
          }
        }
        return this.backgroundColor || "#FFF";
      },
      themeColor() {
        if (this.dark) {
          if (this.color) {
            return this.color;
          } else {
            return this.dark ? "#fff" : "#333";
          }
        }
        return this.color || "#333";
      },
      navbarHeight() {
        if (this.fixed && this.height === 0) {
          return getVal(44);
        }
        return getVal(this.height);
      },
      leftIconWidth() {
        return getVal(this.leftWidth);
      },
      rightIconWidth() {
        return getVal(this.rightWidth);
      }
    },
    created() {
    },
    mounted() {
      if (uni.report && this.stat && this.title !== "") {
        uni.report("title", this.title);
      }
    },
    methods: {
      onClickLeft() {
        this.$emit("clickLeft");
      },
      onClickRight() {
        this.$emit("clickRight");
      },
      onClickTitle() {
        this.$emit("clickTitle");
      }
    }
  };
  function _sfc_render$t(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_status_bar = vue.resolveComponent("status-bar");
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$6);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-navbar", { "uni-dark": $props.dark, "uni-nvue-fixed": $props.fixed }])
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["uni-navbar__content", { "uni-navbar--fixed": $props.fixed, "uni-navbar--shadow": $props.shadow, "uni-navbar--border": $props.border }]),
            style: vue.normalizeStyle({ "background-color": $options.themeBgColor })
          },
          [
            $props.statusBar ? (vue.openBlock(), vue.createBlock(_component_status_bar, { key: 0 })) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode(
              "view",
              {
                style: vue.normalizeStyle({ color: $options.themeColor, backgroundColor: $options.themeBgColor, height: $options.navbarHeight, width: $props.showMenuButtonWidth ? $data.navWidth + "px" : "100%" }),
                class: "uni-navbar__header"
              },
              [
                vue.createElementVNode(
                  "view",
                  {
                    onClick: _cache[0] || (_cache[0] = (...args) => $options.onClickLeft && $options.onClickLeft(...args)),
                    class: "uni-navbar__header-btns uni-navbar__header-btns-left",
                    style: vue.normalizeStyle({ width: $options.leftIconWidth })
                  },
                  [
                    vue.renderSlot(_ctx.$slots, "left", {}, () => [
                      $props.leftIcon.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 0,
                        class: "uni-navbar__content_view"
                      }, [
                        vue.createVNode(_component_uni_icons, {
                          color: $options.themeColor,
                          type: $props.leftIcon,
                          size: "20"
                        }, null, 8, ["color", "type"])
                      ])) : vue.createCommentVNode("v-if", true),
                      $props.leftText.length ? (vue.openBlock(), vue.createElementBlock(
                        "view",
                        {
                          key: 1,
                          class: vue.normalizeClass([{ "uni-navbar-btn-icon-left": !$props.leftIcon.length > 0 }, "uni-navbar-btn-text"])
                        },
                        [
                          vue.createElementVNode(
                            "text",
                            {
                              style: vue.normalizeStyle({ color: $options.themeColor, fontSize: "12px" })
                            },
                            vue.toDisplayString($props.leftText),
                            5
                            /* TEXT, STYLE */
                          )
                        ],
                        2
                        /* CLASS */
                      )) : vue.createCommentVNode("v-if", true)
                    ], true)
                  ],
                  4
                  /* STYLE */
                ),
                vue.createElementVNode("view", {
                  class: "uni-navbar__header-container",
                  onClick: _cache[1] || (_cache[1] = (...args) => $options.onClickTitle && $options.onClickTitle(...args))
                }, [
                  vue.renderSlot(_ctx.$slots, "default", {}, () => [
                    $props.title.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 0,
                      class: "uni-navbar__header-container-inner"
                    }, [
                      vue.createElementVNode(
                        "text",
                        {
                          class: "uni-nav-bar-text uni-ellipsis-1",
                          style: vue.normalizeStyle({ color: $options.themeColor })
                        },
                        vue.toDisplayString($props.title),
                        5
                        /* TEXT, STYLE */
                      )
                    ])) : vue.createCommentVNode("v-if", true)
                  ], true)
                ]),
                vue.createElementVNode(
                  "view",
                  {
                    onClick: _cache[2] || (_cache[2] = (...args) => $options.onClickRight && $options.onClickRight(...args)),
                    class: "uni-navbar__header-btns uni-navbar__header-btns-right",
                    style: vue.normalizeStyle({ width: $options.rightIconWidth })
                  },
                  [
                    vue.renderSlot(_ctx.$slots, "right", {}, () => [
                      $props.rightIcon.length ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
                        vue.createVNode(_component_uni_icons, {
                          color: $options.themeColor,
                          type: $props.rightIcon,
                          size: "22"
                        }, null, 8, ["color", "type"])
                      ])) : vue.createCommentVNode("v-if", true),
                      $props.rightText.length && !$props.rightIcon.length ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 1,
                        class: "uni-navbar-btn-text"
                      }, [
                        vue.createElementVNode(
                          "text",
                          {
                            class: "uni-nav-bar-right-text",
                            style: vue.normalizeStyle({ color: $options.themeColor })
                          },
                          vue.toDisplayString($props.rightText),
                          5
                          /* TEXT, STYLE */
                        )
                      ])) : vue.createCommentVNode("v-if", true)
                    ], true)
                  ],
                  4
                  /* STYLE */
                )
              ],
              4
              /* STYLE */
            )
          ],
          6
          /* CLASS, STYLE */
        ),
        $props.fixed ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "uni-navbar__placeholder"
        }, [
          $props.statusBar ? (vue.openBlock(), vue.createBlock(_component_status_bar, { key: 0 })) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode(
            "view",
            {
              class: "uni-navbar__placeholder-view",
              style: vue.normalizeStyle({ height: $options.navbarHeight })
            },
            null,
            4
            /* STYLE */
          )
        ])) : vue.createCommentVNode("v-if", true)
      ],
      2
      /* CLASS */
    );
  }
  const __easycom_0$4 = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["render", _sfc_render$t], ["__scopeId", "data-v-26544265"], ["__file", "E:/cityInvestment02/city-Investment/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue"]]);
  const zStatic = {
    base64Arrow: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkBAMAAACCzIhnAAAAD1BMVEVHcExRUVFMTExRUVFRUVE9CdWsAAAABHRSTlMAjjrY9ZnUjwAAAQFJREFUWMPt2MsNgzAMgGEEE1B1gKJmAIRYoCH7z9RCXrabh33iYktcIv35EEg5ZBh07pvxJU6MFSPOSRnjnBUjUsaciRUjMsb4xIoRCWNiYsUInzE5sWKEyxiYWDbyefqHx1zIeiYTk7mQYziTYecxHvEJjwmIT3hMQELCYSISEg4TkZj0mYTEpM8kJCU9JiMp6TEZyUmbAUhO2gxAQNJiIAKSFgMRmNQZhMCkziAEJTUGIyipMRjBSZkhCE7KDEFIUmTeGCHJxWz0zXaE0GTCG8ZFtEaS347r/1fe11YyHYVfubxayfjoHmc0YYwmmmiiiSaaaKLJ7ckyz5ve+dw3Xw2emdwm9xSbAAAAAElFTkSuQmCC",
    base64ArrowWhite: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkBAMAAACCzIhnAAAAElBMVEVHcEz///////////////////+IGTx/AAAABnRSTlMA/dAkXZOhASU/AAABYElEQVRYw+2YwXLCIBCGsdAHWGbyAKZ4zxi9O017rxLf/1UaWFAgA1m8dcpedNSPf/l/Vh0Ya/Wn6hN0JcGvoCqRM4C8VBFiDwBqqNuJKV0rAnCgy3AUqZE57x0iqTL8Br4U3WBf/YWaIlTKfAcELU/h9w72CSVPa3C3OCDvhpHbRp/s2vq4fHhCeiCl2A3m4Qd71DQR257mFBlMcTlbFnFWzNtHxewYEfSiaLS4el8d8nyhmKJd1CF4eOS0keLMAuSxubLBIeIGQW8YHCFFo7EH9+YDcQt9FMZEswTheaNxTHwHT8SZorJjMrEVwo4Zo0U8HSEyZvJMOg4RjnmmRr8nDYeIz3OMkbfE/QhBo+U9RnZJxjGCRh/WKmHEMWLNkfPKsGh/CWJk1JjG0kcuJggTt34VDP8aWAFhp4nybVb5+9qQhjSkIQ1pSEMa8k+Q5U9rV3dF8MpFBK+/7miVq1/HZ2qmo9D+pAAAAABJRU5ErkJggg==",
    base64Flower: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkBAMAAACCzIhnAAAAKlBMVEVHcEzDw8Ovr6+pqamUlJTCwsKenp61tbWxsbGysrLNzc2bm5u5ubmjo6MpovhuAAAACnRSTlMA/P79/sHDhiZS0DxZowAABBBJREFUWMPtl89rE0EUx7ctTXatB3MI1SWnDbUKPUgXqh4ED8Uf7KUVSm3ooVSpSii0Fn/gD4j4o+APiEoVmos9FO2celiqZVgwgaKHPQiCCkv+F99kM7Ozm5kxq1dfD91k9pPve9/3ZjbRNHHok/mKli4eIPNgSuRObuN9SqSEzM20iGnm0yIbqCuV7NSSSIV7uyPM6JMBYdeTOanh/QihJYZsUCSby+VkMj2AvOt0rAeQAwqE3lfKMZVlQCZk1QOCKkkVPadITCfIRNKxfoJI5+0OIFtJx14CMSg1mRSDko7VAfksRQzEbGYqxOJcVTWMCH2I1/IACNW0PWU2M8cmAVHtnH5mM1VRWtwKZjOd5JbF6s1IbaYqaotjNlPHgDAnlAizubTR6ovMYn052g/U5qcmOpi0WL8xTS/3IfSet5m8MEr5ajjF5le6dq/OJpobrdY0t3i9QgefWrxW9/1BLhk0E9m8FeUMhhXal499iD0eQRfDF+ts/tttORRerfp+oV7f4xJj82iUYm1Yzod+ZQEAlS/8mMBwKebVmCVp1f0JLS6zKd17+iwRKTARVg2SHtz3iEbBH+Q+U28zW2Jiza8Tjb1YFoYZMsJyjDqp3M9XBQdSdPLFdxEpvOB37JrHcmR/y9+LgoTlCFGZEa2sc6d4PGlweEa2JSVPoVm+IfGG3ZL037iV9oH+P+Jxc4HGVflNq1M0pivao/EopO4b/ojVCP9GjmiXOeS0DOn1o/iiccT4ORnyvBGF3yUywkQajW4Ti0SGuiy/wVSg/L8w+X/8Q+hvUx8Xd90z4oV5a1i88MbFWHz0WZZ1UrTwBGPX3Rat9AFiXRMRjoMdIdJLEOt2h7jrYOzgOamKZSWSNspOS0X8SAqRYmxRL7sg4eLzYmNehcxh3uoyud/BH2Udux4ywxFTc1xC7Mgf4vMhc5S+kSH3Y7yj+qpwIWSoPTVCOOPVthGx9FbGqrwFw6wSFxJr+17zeKcztt3u+2roAEVgUjDd+AHGuxHy2rZHaa8JMkTHEeyi85ANPO9j9BVuBRD2FY5LDMo/Sz/2hReqGIs/KiFin+CsPsYO/yvM3jL2vE8EbX7/Bf8ejtr2GLN65bioAdgLd8Bis/mD5GmP2qeqyo2ZwQEOtAjRIDH7mBKpUcMoApbZJ5UIxkEwxyMZyMxW/uKFvHCFR3SSmerHyDNQ2dF4JG6zIMpBgLfjSF9x1D6smFcYnGApjmSLICO3ecCDWrQ48geba9DI3STy2i7ax6WIB62fSyIZIiO3GFQqSURp8wCo7GhJBGwuSovJBNjb7kT6FPVnIa9qJ2Ko+l9mefGIdinaMp0yC1URYiwsdfNE45EuA5Cx9EhalfvN5s+UyItm81vaB3p4joniN+SCP7Qc1hblAAAAAElFTkSuQmCC",
    base64FlowerWhite: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkBAMAAACCzIhnAAAAElBMVEX///9HcEz///////////////84chYNAAAABnRSTlP/AGzCOYZj5g1nAAACfklEQVRYw+2YTVPDIBCGtza9Jw25a0bvcax30o73OOr//yvma2F3YWlpPTijXNpAHrK8LLALVPFium2vNIFSbwGKTGQA2GUiHcD29yDNy3sMIdUBQl7r2H8mOEVqAHgPkYZUS6Qc2zYhQqtjyDZEximCZwWZLIBeIgYShs2NzxKpSUehYpMJhURGb+O+w5BpMCAREKPnCDHbIY20SzhM5yxziAXpOiBXydrekT9i5XDEq4NIIHHgyU5mRGqviII4mREJJA4QJzMiILwlRJzpKxJKvCBm8OsBBbLux0tsPl4RKYm5aPu6jw1U4mGxEUR9g8M1PcqBEp/WJliNgYOXueBzS4jZSIcgY5lCtevgDSgyzE+rAfuOTQMq0yzvoGH18qju27Mayzs4fPyMziCx81NJa5RNfW7vPYK9KOfDiVkBxFHG8hAj9txuoBuSWORsFfkpBf7xKFLSeaOefEojh5jz22DJEqMP8fUyaKdQx+RnG+yXMpe8Aars8ueR1pVH/bW3FyyvPRw90upLDHwpgBDtg4aUBNkxRLXMAi03IhcZtr1m+FeI/O/JNyDmmL1djLOauSlNflBpW18RQ2bPqXI22MXXEk75KRHTnkPkYbESbdKP2ZFk0r5sIwffAjy1lx+vx7NLjB6/E7Jfv5ERKhzpN0w8IDE8IGFDv5dhz10s7GFiXRZcUeLCEG5P5nDq9k4PFDcoMpE3GY4OuxuCXhmuyNB6k0RsLIAvqp9NE5r8ZCSS8gxnUp7ODdYhZTqxuiJ9uyJJtPmpqJ7wVj+XVieS903iViHziqAhchLEJAyb7jWU647EpUofQ0ziUuXXXhDddtlllSwjgSQu7r4BRWhQqfDPMVwAAAAASUVORK5CYII=",
    base64Success: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkBAMAAACCzIhnAAAAElBMVEVRUVFHcExTU1NRUVFRUVFRUVFOSlSUAAAABnRSTlP/AI6+VySB3ZENAAACcElEQVRYw+2YyYKCMAyGI8hdpdxdZu7gcpdZ7jL6/s8yYheSNi0aPdqbwOffpGmaFOYPD3gj4bisN7vddv17N/JVgxn5x12IWgIaWTuO/IE3PseQbwjGPo2cgRmHFLJwdm/X643zwiqOKPPJ1nj3sjEP2iiifZWj5bhopSyGaEO2HX5fbQJzwJ+W7x/jw5ZFjsEU0PMph9xE8i5EqprKALW95eJQURkgzw98uJ/JvwGecR7bIjWWsUgVrrIfFZ2HlLy3sKETD1mmRLRMRhGVssRa0xJkdn3SpJBymBkM8+pSSDXMDNyDaToVHd2fgpNt0sjwiUZO19+jGQ+gQEg9Oq+bufmAVGihomNmjQG7UG3020vrlm7lkFnKFGU3kZ0KGAdmKe821pipQ+qEKcrZeTL2g5FsUks4cStjEZWwXg0b0n4GxmEpkWwIs5VBynjgK7xZaz1/0D7OxkVuLpsY5BQNFyLS84VBjjbg0iL2r2EQHBOxBhikuUOkdxODVF1cxHoWtPPsiyXO455Iv34hssCO8EV4ZIYTjS8SR4qYSHRiTiYQ4ZFbHi0iIhhBTi6dTCgSWRcnw4h4yGTuyTAiOGBIWGoZTgSHJQl+LcOJ4OCnW6yX2bMnJ9pidCOXtkTkTrIGpYuOynAiOF14SamMiOCk5Ke+mq8BcOrrvym8d0zKIQnWT+M1WwOQNO4fFiWb18hhERxJPx2fblbPHHyC41VyiAtKBUFBIih7JMWVoIQTFIr3lKPN80WvoLSWFPC653ioTZA0I0FrQ7qU6asaK0H7JmkSJa2ooOGVtNUsc3j9FYHkIkJy3SG6VHnfXKXGP9t4N9Q4Ye98AAAAAElFTkSuQmCC",
    base64SuccessWhite: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkBAMAAACCzIhnAAAAGFBMVEVHcEz///////////////////////////8dS1W+AAAAB3RSTlMAiVYk6KvDHLfaegAAAo1JREFUWMPtWEtzmzAQNhCTq910ytXpiyvxTNOr60zrayepx9d02gnX4sTm7xcEiJX2gdnkGJ1A4tOnfWqXyeR1vMRYzrcPD9v5h5MBl3/Ldvx4cxIg/FWC8X0xjLjalM54uhhCfCrRuJURX0pi3EmIqZV7O59vrRZmguStHL9b7S7ftfLwOtiZDw7AHMtmquAQ12b5Wwbnordm8g9zLLO49qc/m2n6aKnhwPOGZ08hAiNHhheiHae1lOUPGZpQkPKa3q0mOUjaRzSRaGUjpy/mmWSwySSpllcEteBKAT52KEnSbblA51pJEPxBQoiH1FP4E3s5+FJv07h6/ylD6ui7B+9fq/ehrFB98ghec9EoVtyjK8pqCHLmCBOwMWSCeWFNN4MbPAk55NhsvoFHSSVR0k5TCTTEzlUGcqV/nVp7n9oIVkmtaqbAEqEgfdgHJPwsEAyZ9r4VAZXFjpEwyaw3+H2v42KYxKhs1XvY/gSSGv+IHyUSuHXCeZhLAgVI3EjgSGo1Fb3xO0tGGU9S2/KAIbtjxpJASG73qox6w5LUq0cEOa+iIONIWIilQSQ0pPa2jgaRQAgQP7c0mITRWGxpMAmEQFN2NAQJNCV0mI6GIIEO47hlQ0ORQLd0nL+hoUjg1m6I1TRr8uYEAriBHLcVFQ5UEMiBe3XkTBEG04WXlGKGxPnMS305XQPA1Ocn2JiuAZwE66fxnKwBnDTuXxZTMq85lwW6kt5ndLqZPefiU1yvmktcUSooChJF2aMprhQlnKJQ5FxRKkcVRa+itNYU8Io2oVkY14w0NMWYlqft91Bj9VHq+ca3b43BxjWJmla0sfKohlfTVpPN+93L/yLQ/IjQ/O5Q/VR5HdL4D7mlxmjwVdELAAAAAElFTkSuQmCC",
    base64Empty: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAMAAAAL34HQAAALeGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDIgNzkuMTY0NDg4LCAyMDIwLzA3LzEwLTIyOjA2OjUzICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIiB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIyLTAyLTIyVDIxOjIxOjQ1KzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDI0LTAxLTEzVDE5OjA5OjQwKzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyNC0wMS0xM1QxOTowOTo0MCswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ZWQwMWYzNWQtOWRjOC00MDBiLWEyMmQtNjM5OGZiNzVhNGRiIiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6ZDhlMzQ3ZmEtMDY2My1jYTRiLTgzNTctNTk4YjBkNGIzOTU2IiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6ZDA4MDI4MDItMzUyYS04NTRhLTkxYjctNmRlNmQ1MmViM2QwIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHRpZmY6T3JpZW50YXRpb249IjEiIHRpZmY6WFJlc29sdXRpb249IjMwMDAwMDAvMTAwMDAiIHRpZmY6WVJlc29sdXRpb249IjMwMDAwMDAvMTAwMDAiIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiIGV4aWY6Q29sb3JTcGFjZT0iMSIgZXhpZjpQaXhlbFhEaW1lbnNpb249IjMwMCIgZXhpZjpQaXhlbFlEaW1lbnNpb249IjMwMCI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZDA4MDI4MDItMzUyYS04NTRhLTkxYjctNmRlNmQ1MmViM2QwIiBzdEV2dDp3aGVuPSIyMDIyLTAyLTIyVDIxOjIxOjQ1KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjQwNjg2NzJkLWY5NDMtOTU0Mi1iMDBiLTVlMDExNmE1NmIzZSIgc3RFdnQ6d2hlbj0iMjAyNC0wMS0xM1QxMDoyNjoxNiswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDphYmJkZmUyZC0xY2Q2LTJiNDgtYjUyNS05YzlhZjdlNjA4NDMiIHN0RXZ0OndoZW49IjIwMjQtMDEtMTNUMTE6MjM6NDArMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY29udmVydGVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJkZXJpdmVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJjb252ZXJ0ZWQgZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YTQ5MjM5MDAtNDhiZC03YTQ1LWI4NGItYmVlZTVjOWUxYTM1IiBzdEV2dDp3aGVuPSIyMDI0LTAxLTEzVDExOjIzOjQwKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmVkMDFmMzVkLTlkYzgtNDAwYi1hMjJkLTYzOThmYjc1YTRkYiIgc3RFdnQ6d2hlbj0iMjAyNC0wMS0xM1QxOTowOTo0MCswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmFiYmRmZTJkLTFjZDYtMmI0OC1iNTI1LTljOWFmN2U2MDg0MyIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjM2ZGQ4NTQxLWQ0MWEtYmY0Yy1iZjA3LWNmNjZhNjZhMDg2MSIgc3RSZWY6b3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmQwODAyODAyLTM1MmEtODU0YS05MWI3LTZkZTZkNTJlYjNkMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pm30U/gAAAAJcEhZcwAALiMAAC4jAXilP3YAAAA/UExURUdwTODg4O3t7e7u7unp6d7e3uTk5M/Pz8nJyePj4+jo6Pj4+MrKyszMzO7u7unp6fb29vLy8vr6+v7+/sHBweag3xAAAAAOdFJOUwAxia5pF0n+/vzX3KbULQ2DYQAACG1JREFUeNrtm4l2o7gShi20IWFrAd7/WUc7EosDWKZ976Hc7WTmdMKXv0qlqpLyeNx222233Xbbbbfddtv/mOHn8xexSNsiRH5PrbFtW4p+DetpsF4v8Gs+HA3WEwOAfwzriYxaLTVsP8X1QK0z+vqQCzewYogi60aL9SEX5oyxphYVCFTGjfSJCTmN1jBruN5KTGCUS8bhySQGHRaohmW4glwtldbOeYJYKlgvbyUuA8aFFEKc++aIM4hrRnyiMnIZKq1PrihcM3GNKboMF1Naa9X9+8T1KrxIlVbGjv3cAEHOYYMqqgUsVuJqqehV3+sjDwB+DTJp0lYtMCyZpxqjF4e+74+sRcQSFZO8UonUSEFzuUY+DKo59A2kZDatGCjzCauy/2AmhSyCq0WHEj0KTNJDmVeNhErMt1Q8W4xti4/FwMJ4jaxl05TKFiNtD3kBGrHnhiph9V0eXQc6DkyE2xX830AlKshFTErXeuCZXK/9m41wFsGSfZ4lcGeyZ98PrylJ7MWCojQZ3qSukL2QslgdngqJnTEPdTJhXvbNBoR/+7wabIxWduN/Ja5dWEivm4XSZ2uQckNzmRlHrn2lc6eiafvS4V2Hd12tesau8toZW0CtWoZYb9t+OqxdCYKYjVPF16pVbILIy/gR7MVaWMHYPCoa2VkzkX4Iry2rirXbumGyAjGC1h62YLw6ApsNKZph3fpIWHt08JovRWD62sejpXhTrhWrPpl6zZ6PW2oTG5ltlvgtF6weNYCWKeJJSfg4W6PNJlj3sVZgOXV4lc8n4RlkMTLEBDVoYc3nI09kpyzzfgWsjyzBZSNDKF2/wjh+sxYvn8Y1scxlfLF9T1RBO3wVHsnq8Fk4oGkEh/0KJPSa8T2CeWE5X9BPmgLsaRIGeNL2kshCsWoLBmdPJW5Wbz1ndAKUXjPwxXYAUpSV3fy5BJg1aa1tyVXHHMgVH31ewDVrleHr9XqC684SUF4mecR3+wW5SC2QNvxUizRv98mLDhPgYiMDb+v8g0OADxqxcnf9w01mZYJF0fUVP5LcdswbsMmy1DVs5PlE5NpNiTR8M8qAWZkOy6aN13VcoOF2/s3xn3Mes8Xza05tgR/BuNz69nlNzMR0fH45p+G4R9oxh2mKt9MF4J7K/lvWUojwF5nCgCpuRUptnZMQ3au0nSo2UsHgV3xpmeLYzGml3ZFBBzYGPCpOQRwXs1/GG1J74dlZc6JKUOtjBAz9XjVxucGWHbZVJDPJQGYDRl1Qmf1ovk2Sbghb6MQlnF7mBzM1bgOqJAPpoOQaVe+4Skcit3uqHMyG/Sh1rHNN0gAfM0nnPrmulfLVBSm20TSZSdWa0LJl2ukVyE4vTYCgP3uQkwv1TKtQWgxDzBSg80OQjCs4klKvuUzHLCfIbDKIE/S5VIGqD1iD2819pkAqTWdmeina+oZABi7X5B1MGoTJqJSchuk6JNHcgUPAcsVFk0+N0oDN68Vo7FQSmCXjx46OEtUk1lpY2ZFQGr/AcpqVato4wPUD+RhfAeyQI5sJ6l2sDwnKqNFSJvpiyJbFl3kTOjZ2ievwCR7hkUoWeV2vOLAXvB39AJoyqYa81A5cvaAidXYTFTycKDBcalVK5f3XS89kzLVl9txfL+K+p6NUnitz5KkKm7D3DrRPNq4bk7l20aFRppNilmuQI+uzTtj9wPBkTsVwM7HbJ5pwGgujyRyZDzQLNoiRFluRtQ+GzEguqRxUL+ZMFqulMzIfaP3ARj2k/txB8c+2HyjmDizCaVWtNoE5MvMlKs/4VQ7HUJZCrU6qCKcNJ2aSWUZhJZu4VI0LB4CHFdj77DRuGi28WKAxoRyZyzGVrmc0jmk1nP5QaxZo1puqq1YIAqgZb8e/rABZJWNCNxV7DSTpOO7Aail9J9nYHtua/4ouE/aS0X1qtXQzwGx+rnbi2vhF/TfZG52oc6DPo1WCi3RTDnRk7TEntoEp38gg+DjYs2opkR3JW5EpL9rU0XSK5/6LOTAVS+72x7pm60zSf5HMdldjhzJqw1FRcxXdS3ZNZp0s92FiyluUvBPoD9ynZNkBiu2NF11ofnlnQbZgKqvusj9R/f6DOzgVsahbNlXxlsxU8y7qrbTupitRyxFBKG6H3aEPUqj7YrzAymq41FXlZLlO4WLbvG2Kg4vYB+wPfWS2B5Rq8TW9ROpAZbiF6MmCTsx1NLLsx7NOoOiZup2CNbZ36xc96ErcxzuILGrmmFhimjtwKo/yTm7feTVwB61IzbnW4967Kt3cDDotGt8JKrTiUyO3Uy2PZZt9tapXEfXhWmTgcoB+JchFWsiCKvYnhmn/tKuJDbgly897FnFfkE1rQLKy810OU7xW3bEJHCD5gERtuTGuxoJqA6qI9TNMa6MbvZomsiubbPYx78YXDaaRqqsyqfSaLZdjYGHLu65rDgydXCWm1P5EvcQ828f9pcBapTILSMv1nZCAc0WzFIFsGfUi/kmAxc6cFqDSYuPSMIbs1OVrwITTQM9HVRFJ5JL56qcoFzzT1uVcd2v9jFw8BHlcWtmEI86hp5Dy/zOlK8cUp/rVseRUBqawz6kmAcPLM9l5m8h4V53Iz/2mFJaTCvF8JbsMvPjU/7crbUXart0v4WyE0LnDPcAX95Knj4VUE8HCdNdUP8BDcOXKdPl4uSWbh4LfOV0HDdfipOmu+eIRrDsNPkIT7np/8ZAzVdOd1u8wHIqeXt8VqtgiO50ePeNaGG+uO9rHiKdL71pnIun8jxEKXv2r2HYBzO/mz96vFKoMM5WLk7tQXS9U5kwCu5lk7n6++kdCFWRaTUzm0/5fClWGWTrM/AGhCrJO/ZBQhTPFLwmV7ebgcdttt91222233Xbbbf+H9h+2WEtdHVinLAAAAABJRU5ErkJggg==",
    base64Error: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAMAAAAL34HQAAALeGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDIgNzkuMTY0NDg4LCAyMDIwLzA3LzEwLTIyOjA2OjUzICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIiB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIyLTAyLTIyVDIxOjIxOjQ1KzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDI0LTAxLTEzVDE5OjEwOjEwKzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyNC0wMS0xM1QxOToxMDoxMCswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTQ3NTExNjAtZDY5MC00ZTkzLWFhNGUtNGMwYTViNGU1ZGFjIiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6YzRiNzlkYWMtZTJmYS1iNzQ0LWIxM2ItOWU1N2VjMDhhM2YwIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6ZDA4MDI4MDItMzUyYS04NTRhLTkxYjctNmRlNmQ1MmViM2QwIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHRpZmY6T3JpZW50YXRpb249IjEiIHRpZmY6WFJlc29sdXRpb249IjMwMDAwMDAvMTAwMDAiIHRpZmY6WVJlc29sdXRpb249IjMwMDAwMDAvMTAwMDAiIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiIGV4aWY6Q29sb3JTcGFjZT0iMSIgZXhpZjpQaXhlbFhEaW1lbnNpb249IjMwMCIgZXhpZjpQaXhlbFlEaW1lbnNpb249IjMwMCI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZDA4MDI4MDItMzUyYS04NTRhLTkxYjctNmRlNmQ1MmViM2QwIiBzdEV2dDp3aGVuPSIyMDIyLTAyLTIyVDIxOjIxOjQ1KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjQwNjg2NzJkLWY5NDMtOTU0Mi1iMDBiLTVlMDExNmE1NmIzZSIgc3RFdnQ6d2hlbj0iMjAyNC0wMS0xM1QxMDoyNjoxNiswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpjZjk1NTE1OC04MjFiLTA4NDUtYWJmNS05YTE1NGM1ZTY4NjEiIHN0RXZ0OndoZW49IjIwMjQtMDEtMTNUMTE6MDQ6MDQrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY29udmVydGVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJkZXJpdmVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJjb252ZXJ0ZWQgZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZGM1Y2IyNWItZDZlNC0yZjQ2LTgyODQtZmUwOTNlY2M2ZTkxIiBzdEV2dDp3aGVuPSIyMDI0LTAxLTEzVDExOjA0OjA0KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjE0NzUxMTYwLWQ2OTAtNGU5My1hYTRlLTRjMGE1YjRlNWRhYyIgc3RFdnQ6d2hlbj0iMjAyNC0wMS0xM1QxOToxMDoxMCswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmNmOTU1MTU4LTgyMWItMDg0NS1hYmY1LTlhMTU0YzVlNjg2MSIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjM2ZGQ4NTQxLWQ0MWEtYmY0Yy1iZjA3LWNmNjZhNjZhMDg2MSIgc3RSZWY6b3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmQwODAyODAyLTM1MmEtODU0YS05MWI3LTZkZTZkNTJlYjNkMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Ph2LDQsAAAAJcEhZcwAACxMAAAsTAQCanBgAAAA5UExURUdwTNra2s7Ozq2tre3t7dPT087OzuPj4+3t7dbW1u/v79bW1vz8/MrKytDQ0Nzc3MPDw/X19bi4uMZQDnEAAAAKdFJOUwBqEPywotz+wzqApqiTAAAHW0lEQVR42u1b25akIAwcbx2UFoj//7HLTQVBRcSZfTDnbM/uTl/KSlEkwf75eeONN95444033njjjTduR9/0/yOsbqoevObL7101tYX1HFs9QFtfZalRP+rpQVgdAFx990ZnT8L6eZItUl99jeGpf1DxdV/VP9fV1f/PFlF1bYHoVFSRC60IyVjrFRnuB8IoxpExSrstsErKHpJw1eqybNLbAQvAYkKjUrjoBgKRqAaeIjG5+qaps6hKcMWmcdSwqAJWBbAgCZZaIYbsqggqqlHNbFFa5yVR4jKvrKEErOEjNCqNSwHrfE8lpLsod/u+cOPPMPBJ+Gz5dM0cXNgclre+pSxhYI1WW5Tf9ENSMIdLCiWs6q9hwQprBVYKFqyPlx4WtoSvrT9lC/wkGt8qlkQooC3hi6sgW3Bb8gtdpSV/za/mn49pC0oYhONbfyd5hzDLFivKFpTS1gKM0we0tQCEncfgQn7Rt+DC/299i1MSRJcBC0r7VviG5KZvwV5WIUobxHyrJKy8VRjXVgFYsPu5kOtbxdhycCDuihziXVLoW7xwEiUmDgd544B46luWLW+nugMLB2BimmC3cxTNxCDg8xFtuUSNqoFsDKzY8psa+XtBNWXr74N6qxwsS5T6VL5robKl10+ZRu5S9qBvUYuJwVHzjwjrE3G33qKh+WXBgmkmCvHYquTvZ8oo7rLFA4PJgYW0MdePIRQIGUPNbSMw5lubJMKtJI6+Wk6cVFMmACO+VVryeL7ZgI8MhwS2fnNPPK0geHBRd11eJSiyL4KjrL2umm1XIpRii1MKB/mU/iCZwF+pt5z3UJ7UiF3nQqadAXC3T3xEW2IyuDBe3yDTe0+A64it2WTyYSGVHymUI/EduvSWKJ80Dtv2NbYSoQxbMkVC7yzNGIWFvDF7gRD79RYrWW/BDGti4wwLtgvO7gWKUZ8Mt94qX8vLJE70+xVNwzDm9ghNM+FX7p/jlZUId2HJD+Tf79hMe3WNrAK/30E+C8/6xOCqbqxE5JNMYrNbnaLUvJAewfCg8zF0Ba/tbviWLvPYfsGFA1PVD8ZdnjlVc/DS/o7LK4NHjOjKKbfCTSCo5XmwKbaZM4jlc9NGEYd9Ijd0QS5ZGaOR2O+DPlGyRb2nXZzgnI1GdFWF+0gh3ifyTRqvzpXI2eElk58FeHziCF5hY+hSMV9Ge/mohUTGuQ4vzHYe8bW5sNdFQ58St22Vcf5zzJbtcGT4iYQ7iz8dFuxoWRYMjAM7KCnypHOTLSqdUwYIFpndOD/6B2FBzNQxYmW/zxYE4j8yLHga1s2Rbm/O5PXtGcuNDIW1dTj5hpjGsO+7z2Kk9NP1JWDlnWKAM4H6zCUNM05KyVPHBclYzUbgjE3N3tP2JWHBmbqD4GLeCs2jhMT13lMVljwcEbetwZgtHUxVQ21ho3fE7inf2s8vzMWq0EWpfOBg5hcDSGwaF2+LaysRIzNFqRgBv2sMhi/Ix0WiW8rBKNBv4ExBI7eorx9ANazsPCb5FkSNH+Reacos+AYxaFzX76KMH65c8ytzZ40YvpFAqtgC/otn1eCmMI5K8yVRQVVwq3aVtU+jJktwjyP7x+BKv8vtoH098vXYSJcrWGJcAW11r8WVRxe5vgcuFbXqwnaEZejS6mrLwYKUg1ch2RJswTFYgMOwoau+AQsSp/FuDhVZi7J402ifgGla/GJIzGLYG5H4rnKMCUydL9wcsmZSuPikR2QmjQbWqaV2ob2RdMvaLEvFlRiXpYeTwqVOtMZF+qi0dS4uEjJKMvWuYK3S0jHZwaq7BylYp/O2uu3q04lNqudLWEJQd/3paTBz12IaLIPtzE5P1AUuW9TB8NVzaG9/TIfV+eXsWeezz6HWlptEbo4SIAeWur/Y/RZC/gmZTiLzUY2j5ct6fjKsFvxqgyQxE9sbmfYtnJMIciEKo6+FL0wziJmtkzspIcUl0PgWrL7VCKP7hl61U4WLeN+7Ieli2vZhmq0VgjDOgIyhJ62sSpDkWNZa1wiB8WoLlxzy29XpGVPgn1ut5VYcGyRLK7OCiJaDYMrAneJUkZWdw0yDgNm5nDowqLc0Kp581FO7QS4pC9S/YRW9xkVdNOj0ZHCp9anEZw3VEK/fopiDrkMObkcdJtT1g6+uzQ60bIdUPztdWZWy53m+v/zFYPOGHO4AZsalmtJNkyHrCAx1RXX7mt5g1L1pDezpkXv8wJwpVRSSaf2c26Y0rrXXxyWBptu/ovdak+VhkqjGBZUdvKygqANKA/MqZ/36kcGwFn90RnWp66ksKuHgitLFY8BU+F2ZvqpxpMY9qR3YwOUJ12fc0KUHVKdswcKXuwetErCnwvMKuXxfc/3RVJ2yFc+iosQd3X+WGSVz1UiuN2J156FyVyHbsOUp3krezaPUT/VxXqdfwvknb/Zgp+idTxTbrkLqYuKreRnhy65Gf4W0NsDoYiqf6uZsvr8V9eo6XWc5+3TVf/3N1TfeeOONN95444033njjjTfeSI1/IeOYOeO4fGAAAAAASUVORK5CYII=",
    base64BackToTop: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAElBMVEVRUVH+/v5HcEyZmZlRUVFRUVGm1ByOAAAABnRSTlPMzADMTZAJBBGsAAAEnElEQVR42t2cS27jMAyGf7/2U+QCQeDsbeQCgZDujaC5/1UmkzaJn+JDFGcw3LdfflKibJkkDnxrL7dbg7sNt6+L4O8OYBM+B0ys+QrGkHZG+OEEQ8g6go8Bx1GIGMdpNOQyIG6XdMgnSPtKhLQDGEZFBgYMkhKFtGBb0EIEjDgFRowoBVaMGAWpMedEfxMiZtwpUsgZCqtlkCNUdpVAWigtCCCDFtLwIWeoreZCWiRYYEKGFEjDg+yRZCUH0iLRAgNyToXUNCRZyMqWhGnUN2IPm3wSlwJ7IUspyCBkIQUZhCykIIeQuRTkEDKXAuM9srrtYbrZN7Y98giZSoFd+t1OxmMITG0dcrSFXFchZ1tIvQZpYWxhBbK3hpQrkMEa0iwh5t4a+QvZvDXyF7J5a+Qv5PPW21/I5623v5DPW29/IaO3Xv5Clrw1y1/Ikrdm+Qs5svw83yNnSJ5BQb4F/F7EIEJSnThGBAXxkFQfLOviQUE8JAUPsosHBfGQfDAtHhREQ1JxIV00KIgmrnRI84S0yAd5BAXxxJUck0f6Qnwr9qmr6xF5xLMjcwn/iudIEAdWnyjkEXlQKZiRVzoqRyLbgeUKKR8Q4alY7cSnoxzSf2ggsqehKr6YVpcXpOd7H93f60cKhOd7Re2LteUF4eLqiVS1mr0ge4io6C2+soaFkJ7MuuuQs1yITEp9hwwKISIpzR2iESKSIoT0rLNwuVHQqoSIpAQJpGce60vIUSdEIuUqgPTsJ5QFZK8UIpBS8iG94GFrDjlrhfCl8CG96Llxmle4kEr6vKWBPIVo9kqDQSRk9/3cWoikcCFPAd33v4dIChPyEvLzBA6RlEYWke4JEUnhKXkLeUEKxRHJFfKCQHGucIW8IdZSRkLeEGMpYyEjiK2UsZARxFTKRMgYYillImQMMZQyFTKB2EmZCplAuFLIHT8TMoWwpQwiIVMIUwqpZP5bp5CCvCTiQKr5f5lCQN+tPCBn2ZvVDFJwIDUP0m1BYAfZYRNSsCB7BqTbhoARePIxtZ9tgwWkoJcwCalmv3MBAemtO4R6dah2HaKQqj8Zvp9sQDjvJ21+SPCBHPJDDk6QITekEV7gqCC19CpKAym9IMfckKv4olMBCeIrWwVEfvkshzQekO9r9P1/ALk+IG1eSPCDiCJfyG+FyU+A6ZCa/piZDinpz7LpkCv5gdkAEshP5emQhv7onw6pGeULyZCSUYiRDAmMkpJkCKs4JhFSq8p8hJBSVbAkhARV6ZUQoisik0FqXTmcDHLVFfbJIEFXoiiCNMpiSxGkVJaNiiBBWQArgTTaUl4JpNQWJUsgQVteXQg+AKkLxQWFGKW+5J2+eVp4S168X3CF1CltCKdTJ8lb84YK2bUBO+wZW0Pqv9nk4tKu49N45NJC5dMM5tLW5tOg59Jq6NM06dL+abFXwr/RkuvTXJwae1abtE/Dt0/ruksTvs84AZ/BCC4jHnyGVfiM3VBQFANEXEah+Ax18RlP4zNox2dkkM/wI58xTn8yDCXGYCDV3W5RGSajtXyGhG1jbpbjzpwGt/0MJft8jqC7iUbQ/QZaxdnKqcIftwAAAABJRU5ErkJggg=="
  };
  const _sfc_main$t = {
    name: "z-paging-empty-view",
    data() {
      return {};
    },
    props: {
      // 空数据描述文字
      emptyViewText: {
        type: String,
        default: "没有数据哦~"
      },
      // 空数据图片
      emptyViewImg: {
        type: String,
        default: ""
      },
      // 是否显示空数据图重新加载按钮
      showEmptyViewReload: {
        type: Boolean,
        default: false
      },
      // 空数据点击重新加载文字
      emptyViewReloadText: {
        type: String,
        default: "重新加载"
      },
      // 是否是加载失败
      isLoadFailed: {
        type: Boolean,
        default: false
      },
      // 空数据图样式
      emptyViewStyle: {
        type: Object,
        default: function() {
          return {};
        }
      },
      // 空数据图img样式
      emptyViewImgStyle: {
        type: Object,
        default: function() {
          return {};
        }
      },
      // 空数据图描述文字样式
      emptyViewTitleStyle: {
        type: Object,
        default: function() {
          return {};
        }
      },
      // 空数据图重新加载按钮样式
      emptyViewReloadStyle: {
        type: Object,
        default: function() {
          return {};
        }
      },
      // 空数据图z-index
      emptyViewZIndex: {
        type: Number,
        default: 9
      },
      // 空数据图片是否使用fixed布局并铺满z-paging
      emptyViewFixed: {
        type: Boolean,
        default: true
      },
      // 空数据图中布局的单位，默认为rpx
      unit: {
        type: String,
        default: "rpx"
      }
    },
    computed: {
      emptyImg() {
        return this.isLoadFailed ? zStatic.base64Error : zStatic.base64Empty;
      },
      finalEmptyViewStyle() {
        this.emptyViewStyle["z-index"] = this.emptyViewZIndex;
        return this.emptyViewStyle;
      }
    },
    methods: {
      // 点击了reload按钮
      reloadClick() {
        this.$emit("reload");
      },
      // 点击了空数据view
      emptyViewClick() {
        this.$emit("viewClick");
      }
    }
  };
  function _sfc_render$s(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass({ "zp-container": true, "zp-container-fixed": $props.emptyViewFixed }),
        style: vue.normalizeStyle([$options.finalEmptyViewStyle]),
        onClick: _cache[1] || (_cache[1] = (...args) => $options.emptyViewClick && $options.emptyViewClick(...args))
      },
      [
        vue.createElementVNode("view", { class: "zp-main" }, [
          !$props.emptyViewImg.length ? (vue.openBlock(), vue.createElementBlock("image", {
            key: 0,
            class: vue.normalizeClass({ "zp-main-image-rpx": $props.unit === "rpx", "zp-main-image-px": $props.unit === "px" }),
            style: vue.normalizeStyle([$props.emptyViewImgStyle]),
            src: $options.emptyImg
          }, null, 14, ["src"])) : (vue.openBlock(), vue.createElementBlock("image", {
            key: 1,
            class: vue.normalizeClass({ "zp-main-image-rpx": $props.unit === "rpx", "zp-main-image-px": $props.unit === "px" }),
            mode: "aspectFit",
            style: vue.normalizeStyle([$props.emptyViewImgStyle]),
            src: $props.emptyViewImg
          }, null, 14, ["src"])),
          vue.createElementVNode(
            "text",
            {
              class: vue.normalizeClass(["zp-main-title", { "zp-main-title-rpx": $props.unit === "rpx", "zp-main-title-px": $props.unit === "px" }]),
              style: vue.normalizeStyle([$props.emptyViewTitleStyle])
            },
            vue.toDisplayString($props.emptyViewText),
            7
            /* TEXT, CLASS, STYLE */
          ),
          $props.showEmptyViewReload ? (vue.openBlock(), vue.createElementBlock(
            "text",
            {
              key: 2,
              class: vue.normalizeClass({ "zp-main-error-btn": true, "zp-main-error-btn-rpx": $props.unit === "rpx", "zp-main-error-btn-px": $props.unit === "px" }),
              style: vue.normalizeStyle([$props.emptyViewReloadStyle]),
              onClick: _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.reloadClick && $options.reloadClick(...args), ["stop"]))
            },
            vue.toDisplayString($props.emptyViewReloadText),
            7
            /* TEXT, CLASS, STYLE */
          )) : vue.createCommentVNode("v-if", true)
        ])
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["render", _sfc_render$s], ["__scopeId", "data-v-b7999e14"], ["__file", "E:/cityInvestment02/city-Investment/uni_modules/z-paging/components/z-paging-empty-view/z-paging-empty-view.vue"]]);
  const c = {
    // 当前版本号
    version: "2.8.8",
    // 延迟操作的通用时间
    delayTime: 100,
    // 请求失败时候全局emit使用的key
    errorUpdateKey: "z-paging-error-emit",
    // 全局emit complete的key
    completeUpdateKey: "z-paging-complete-emit",
    // z-paging缓存的前缀key
    cachePrefixKey: "z-paging-cache",
    // 虚拟列表中列表index的key
    listCellIndexKey: "zp_index",
    // 虚拟列表中列表的唯一key
    listCellIndexUniqueKey: "zp_unique_index"
  };
  const zLocalConfig = {};
  const storageKey = "Z-PAGING-REFRESHER-TIME-STORAGE-KEY";
  let config = null;
  let configLoaded = false;
  let cachedSystemInfo = null;
  const timeoutMap = {};
  function gc(key, defaultValue) {
    return () => {
      _handleDefaultConfig();
      if (!config)
        return defaultValue;
      const value = config[key];
      return value === void 0 ? defaultValue : value;
    };
  }
  function getTouch(e) {
    let touch = null;
    if (e.touches && e.touches.length) {
      touch = e.touches[0];
    } else if (e.changedTouches && e.changedTouches.length) {
      touch = e.changedTouches[0];
    } else if (e.datail && e.datail != {}) {
      touch = e.datail;
    } else {
      return { touchX: 0, touchY: 0 };
    }
    return {
      touchX: touch.clientX,
      touchY: touch.clientY
    };
  }
  function getTouchFromZPaging(target) {
    if (target && target.tagName && target.tagName !== "BODY" && target.tagName !== "UNI-PAGE-BODY") {
      const classList = target.classList;
      if (classList && classList.contains("z-paging-content")) {
        return {
          isFromZp: true,
          isPageScroll: classList.contains("z-paging-content-page"),
          isReachedTop: classList.contains("z-paging-reached-top"),
          isUseChatRecordMode: classList.contains("z-paging-use-chat-record-mode")
        };
      } else {
        return getTouchFromZPaging(target.parentNode);
      }
    } else {
      return { isFromZp: false };
    }
  }
  function getParent(parent) {
    if (!parent)
      return null;
    if (parent.$refs.paging)
      return parent;
    return getParent(parent.$parent);
  }
  function consoleErr(err) {
    formatAppLog("error", "at uni_modules/z-paging/components/z-paging/js/z-paging-utils.js:73", `[z-paging]${err}`);
  }
  function delay(callback, ms = c.delayTime, key) {
    const timeout = setTimeout(callback, ms);
    if (!!key) {
      timeoutMap[key] && clearTimeout(timeoutMap[key]);
      timeoutMap[key] = timeout;
    }
    return timeout;
  }
  function setRefesrherTime(time, key) {
    const datas = getRefesrherTime() || {};
    datas[key] = time;
    uni.setStorageSync(storageKey, datas);
  }
  function getRefesrherTime() {
    return uni.getStorageSync(storageKey);
  }
  function getRefesrherTimeByKey(key) {
    const datas = getRefesrherTime();
    return datas && datas[key] ? datas[key] : null;
  }
  function getRefesrherFormatTimeByKey(key, textMap) {
    const time = getRefesrherTimeByKey(key);
    const timeText = time ? _timeFormat(time, textMap) : textMap.none;
    return `${textMap.title}${timeText}`;
  }
  function convertToPx(text) {
    const dataType = Object.prototype.toString.call(text);
    if (dataType === "[object Number]")
      return text;
    let isRpx = false;
    if (text.indexOf("rpx") !== -1 || text.indexOf("upx") !== -1) {
      text = text.replace("rpx", "").replace("upx", "");
      isRpx = true;
    } else if (text.indexOf("px") !== -1) {
      text = text.replace("px", "");
    }
    if (!isNaN(text)) {
      if (isRpx)
        return Number(rpx2px(text));
      return Number(text);
    }
    return 0;
  }
  function rpx2px(rpx) {
    return uni.upx2px(rpx);
  }
  function getSystemInfoSync(useCache = false) {
    if (useCache && cachedSystemInfo) {
      return cachedSystemInfo;
    }
    const infoTypes = ["DeviceInfo", "AppBaseInfo", "WindowInfo"];
    const { deviceInfo, appBaseInfo, windowInfo } = infoTypes.reduce((acc, key) => {
      const method = `get${key}`;
      if (uni[method] && uni.canIUse(method)) {
        acc[key.charAt(0).toLowerCase() + key.slice(1)] = uni[method]();
      }
      return acc;
    }, {});
    if (deviceInfo && appBaseInfo && windowInfo) {
      cachedSystemInfo = { ...deviceInfo, ...appBaseInfo, ...windowInfo };
    } else {
      cachedSystemInfo = uni.getSystemInfoSync();
    }
    return cachedSystemInfo;
  }
  function getTime() {
    return (/* @__PURE__ */ new Date()).getTime();
  }
  function getInstanceId() {
    const s = [];
    const hexDigits = "0123456789abcdef";
    for (let i = 0; i < 10; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 16), 1);
    }
    return s.join("") + getTime();
  }
  function wait(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  function isPromise(func) {
    return Object.prototype.toString.call(func) === "[object Promise]";
  }
  function addUnit(value, unit) {
    if (Object.prototype.toString.call(value) === "[object String]") {
      let tempValue = value;
      tempValue = tempValue.replace("rpx", "").replace("upx", "").replace("px", "");
      if (value.indexOf("rpx") === -1 && value.indexOf("upx") === -1 && value.indexOf("px") !== -1) {
        tempValue = parseFloat(tempValue) * 2;
      }
      value = tempValue;
    }
    return unit === "rpx" ? value + "rpx" : value / 2 + "px";
  }
  function deepCopy(obj) {
    if (typeof obj !== "object" || obj === null)
      return obj;
    let newObj = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = deepCopy(obj[key]);
      }
    }
    return newObj;
  }
  function useBufferedInsert(fn, delay2 = 50) {
    let buffer = [];
    let timer = null;
    let latestArgs = [];
    return function insertBuffered(data, ...args) {
      const newData = Object.prototype.toString.call(data) !== "[object Array]" ? [data] : data;
      buffer.push(...newData);
      latestArgs = args;
      if (!timer) {
        timer = setTimeout(() => {
          fn(buffer.length === 1 ? buffer[0] : buffer, ...latestArgs);
          buffer = [];
          timer = null;
        }, buffer.length === 1 ? 10 : delay2);
      }
    };
  }
  function _handleDefaultConfig() {
    if (configLoaded)
      return;
    if (zLocalConfig && Object.keys(zLocalConfig).length) {
      config = zLocalConfig;
    }
    if (!config && uni.$zp) {
      config = uni.$zp.config;
    }
    config = config ? Object.keys(config).reduce((result, key) => {
      result[_toCamelCase(key)] = config[key];
      return result;
    }, {}) : null;
    configLoaded = true;
  }
  function _timeFormat(time, textMap) {
    const date = new Date(time);
    const currentDate = /* @__PURE__ */ new Date();
    const dateDay = new Date(time).setHours(0, 0, 0, 0);
    const currentDateDay = (/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0);
    const disTime = dateDay - currentDateDay;
    let dayStr = "";
    const timeStr = _dateTimeFormat(date);
    if (disTime === 0) {
      dayStr = textMap.today;
    } else if (disTime === -864e5) {
      dayStr = textMap.yesterday;
    } else {
      dayStr = _dateDayFormat(date, date.getFullYear() !== currentDate.getFullYear());
    }
    return `${dayStr} ${timeStr}`;
  }
  function _dateDayFormat(date, showYear = true) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return showYear ? `${year}-${_fullZeroToTwo(month)}-${_fullZeroToTwo(day)}` : `${_fullZeroToTwo(month)}-${_fullZeroToTwo(day)}`;
  }
  function _dateTimeFormat(date) {
    const hour = date.getHours();
    const minute = date.getMinutes();
    return `${_fullZeroToTwo(hour)}:${_fullZeroToTwo(minute)}`;
  }
  function _fullZeroToTwo(str) {
    str = str.toString();
    return str.length === 1 ? "0" + str : str;
  }
  function _toCamelCase(value) {
    return value.replace(/-([a-z])/g, (_, group1) => group1.toUpperCase());
  }
  const u = {
    gc,
    setRefesrherTime,
    getRefesrherFormatTimeByKey,
    getTouch,
    getTouchFromZPaging,
    getParent,
    convertToPx,
    getTime,
    getInstanceId,
    consoleErr,
    delay,
    wait,
    isPromise,
    addUnit,
    deepCopy,
    rpx2px,
    getSystemInfoSync,
    useBufferedInsert
  };
  const Enum = {
    // 当前加载类型 refresher:下拉刷新 load-more:上拉加载更多
    LoadingType: {
      Refresher: "refresher",
      LoadMore: "load-more"
    },
    // 下拉刷新状态 default:默认状态 release-to-refresh:松手立即刷新 loading:刷新中 complete:刷新结束 go-f2:松手进入二楼
    Refresher: {
      Default: "default",
      ReleaseToRefresh: "release-to-refresh",
      Loading: "loading",
      Complete: "complete",
      GoF2: "go-f2"
    },
    // 底部加载更多状态 default:默认状态 loading:加载中 no-more:没有更多数据 fail:加载失败
    More: {
      Default: "default",
      Loading: "loading",
      NoMore: "no-more",
      Fail: "fail"
    },
    // @query触发来源 user-pull-down:用户主动下拉刷新 reload:通过reload触发 refresh:通过refresh触发 load-more:通过滚动到底部加载更多或点击底部加载更多触发
    QueryFrom: {
      UserPullDown: "user-pull-down",
      Reload: "reload",
      Refresh: "refresh",
      LoadMore: "load-more"
    },
    // 虚拟列表cell高度模式
    CellHeightMode: {
      // 固定高度
      Fixed: "fixed",
      // 动态高度
      Dynamic: "dynamic"
    },
    // 列表缓存模式
    CacheMode: {
      // 默认模式，只会缓存一次
      Default: "default",
      // 总是缓存，每次列表刷新(下拉刷新、调用reload等)都会更新缓存
      Always: "always"
    }
  };
  const _sfc_main$s = {
    name: "z-paging-refresh",
    data() {
      return {
        R: Enum.Refresher,
        refresherTimeText: "",
        zTheme: {
          title: { white: "#efefef", black: "#666" },
          arrow: { white: zStatic.base64ArrowWhite, black: zStatic.base64Arrow },
          flower: { white: zStatic.base64FlowerWhite, black: zStatic.base64Flower },
          success: { white: zStatic.base64SuccessWhite, black: zStatic.base64Success },
          indicator: { white: "#eeeeee", black: "#777777" }
        }
      };
    },
    props: [
      "status",
      "defaultThemeStyle",
      "defaultText",
      "pullingText",
      "refreshingText",
      "completeText",
      "goF2Text",
      "defaultImg",
      "pullingImg",
      "refreshingImg",
      "completeImg",
      "refreshingAnimated",
      "showUpdateTime",
      "updateTimeKey",
      "imgStyle",
      "titleStyle",
      "updateTimeStyle",
      "updateTimeTextMap",
      "unit",
      "isIos"
    ],
    computed: {
      ts() {
        return this.defaultThemeStyle;
      },
      // 当前状态Map
      statusTextMap() {
        this.updateTime();
        const { R, defaultText, pullingText, refreshingText, completeText, goF2Text } = this;
        return {
          [R.Default]: defaultText,
          [R.ReleaseToRefresh]: pullingText,
          [R.Loading]: refreshingText,
          [R.Complete]: completeText,
          [R.GoF2]: goF2Text
        };
      },
      // 当前状态文字
      currentTitle() {
        return this.statusTextMap[this.status] || this.defaultText;
      },
      // 左侧图片class
      leftImageClass() {
        const preSizeClass = `zp-r-left-image-pre-size-${this.unit}`;
        if (this.status === this.R.Complete)
          return preSizeClass;
        return `zp-r-left-image ${preSizeClass} ${this.status === this.R.Default ? "zp-r-arrow-down" : "zp-r-arrow-top"}`;
      },
      // 左侧图片style
      leftImageStyle() {
        const showUpdateTime = this.showUpdateTime;
        const size = showUpdateTime ? u.addUnit(26, this.unit) : u.addUnit(24, this.unit);
        return { width: size, height: size, "margin-right": showUpdateTime ? u.addUnit(20, this.unit) : u.addUnit(9, this.unit) };
      },
      // 左侧图片src
      leftImageSrc() {
        const R = this.R;
        const status = this.status;
        if (status === R.Default) {
          if (!!this.defaultImg)
            return this.defaultImg;
          return this.zTheme.arrow[this.ts];
        } else if (status === R.ReleaseToRefresh) {
          if (!!this.pullingImg)
            return this.pullingImg;
          if (!!this.defaultImg)
            return this.defaultImg;
          return this.zTheme.arrow[this.ts];
        } else if (status === R.Loading) {
          if (!!this.refreshingImg)
            return this.refreshingImg;
          return this.zTheme.flower[this.ts];
        } else if (status === R.Complete) {
          if (!!this.completeImg)
            return this.completeImg;
          return this.zTheme.success[this.ts];
        } else if (status === R.GoF2) {
          return this.zTheme.arrow[this.ts];
        }
        return "";
      },
      // 右侧文字style
      rightTextStyle() {
        let stl = {};
        stl["color"] = this.zTheme.title[this.ts];
        stl["font-size"] = u.addUnit(24, this.unit);
        return stl;
      }
    },
    methods: {
      // 添加单位
      addUnit(value, unit) {
        return u.addUnit(value, unit);
      },
      // 更新下拉刷新时间
      updateTime() {
        if (this.showUpdateTime) {
          this.refresherTimeText = u.getRefesrherFormatTimeByKey(this.updateTimeKey, this.updateTimeTextMap);
        }
      }
    }
  };
  function _sfc_render$r(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { style: { "height": "100%" } }, [
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass($props.showUpdateTime ? "zp-r-container zp-r-container-padding" : "zp-r-container")
        },
        [
          vue.createElementVNode("view", { class: "zp-r-left" }, [
            $props.status !== $data.R.Loading ? (vue.openBlock(), vue.createElementBlock("image", {
              key: 0,
              class: vue.normalizeClass($options.leftImageClass),
              style: vue.normalizeStyle([$options.leftImageStyle, $props.imgStyle]),
              src: $options.leftImageSrc
            }, null, 14, ["src"])) : (vue.openBlock(), vue.createElementBlock("image", {
              key: 1,
              class: vue.normalizeClass({ "zp-line-loading-image": $props.refreshingAnimated, "zp-r-left-image": true, "zp-r-left-image-pre-size-rpx": $props.unit === "rpx", "zp-r-left-image-pre-size-px": $props.unit === "px" }),
              style: vue.normalizeStyle([$options.leftImageStyle, $props.imgStyle]),
              src: $options.leftImageSrc
            }, null, 14, ["src"]))
          ]),
          vue.createElementVNode("view", { class: "zp-r-right" }, [
            vue.createElementVNode(
              "text",
              {
                class: "zp-r-right-text",
                style: vue.normalizeStyle([$options.rightTextStyle, $props.titleStyle])
              },
              vue.toDisplayString($options.currentTitle),
              5
              /* TEXT, STYLE */
            ),
            $props.showUpdateTime && $data.refresherTimeText.length ? (vue.openBlock(), vue.createElementBlock(
              "text",
              {
                key: 0,
                class: vue.normalizeClass(["zp-r-right-text", { "zp-r-right-time-text-rpx": $props.unit === "rpx", "zp-r-right-time-text-px": $props.unit === "px" }]),
                style: vue.normalizeStyle([{ color: $data.zTheme.title[$options.ts] }, $props.updateTimeStyle])
              },
              vue.toDisplayString($data.refresherTimeText),
              7
              /* TEXT, CLASS, STYLE */
            )) : vue.createCommentVNode("v-if", true)
          ])
        ],
        2
        /* CLASS */
      )
    ]);
  }
  const zPagingRefresh = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["render", _sfc_render$r], ["__scopeId", "data-v-00a16504"], ["__file", "E:/cityInvestment02/city-Investment/uni_modules/z-paging/components/z-paging/components/z-paging-refresh.vue"]]);
  const _sfc_main$r = {
    name: "z-paging-load-more",
    data() {
      return {
        M: Enum.More,
        zTheme: {
          title: { white: "#efefef", black: "#666" },
          line: { white: "#efefef", black: "#eeeeee" },
          circleBorder: { white: "#aaaaaa", black: "#c8c8c8" },
          circleBorderTop: { white: "#ffffff", black: "#444444" },
          flower: { white: zStatic.base64FlowerWhite, black: zStatic.base64Flower },
          indicator: { white: "#eeeeee", black: "#777777" }
        }
      };
    },
    props: ["zConfig"],
    computed: {
      ts() {
        return this.c.defaultThemeStyle;
      },
      // 底部加载更多配置
      c() {
        return this.zConfig || {};
      },
      // 底部加载更多文字
      ownLoadingMoreText() {
        return {
          [this.M.Default]: this.c.defaultText,
          [this.M.Loading]: this.c.loadingText,
          [this.M.NoMore]: this.c.noMoreText,
          [this.M.Fail]: this.c.failText
        }[this.finalStatus];
      },
      // 底部加载更多状态
      finalStatus() {
        if (this.c.defaultAsLoading && this.c.status === this.M.Default)
          return this.M.Loading;
        return this.c.status;
      },
      // 加载更多icon类型
      finalLoadingIconType() {
        return this.c.loadingIconType;
      }
    },
    methods: {
      // 点击了加载更多
      doClick() {
        this.$emit("doClick");
      }
    }
  };
  function _sfc_render$q(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["zp-l-container", { "zp-l-container-rpx": $options.c.unit === "rpx", "zp-l-container-px": $options.c.unit === "px" }]),
        style: vue.normalizeStyle([$options.c.customStyle]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options.doClick && $options.doClick(...args))
      },
      [
        !$options.c.hideContent ? (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          { key: 0 },
          [
            $options.c.showNoMoreLine && $options.finalStatus === $data.M.NoMore ? (vue.openBlock(), vue.createElementBlock(
              "text",
              {
                key: 0,
                class: vue.normalizeClass({ "zp-l-line-rpx": $options.c.unit === "rpx", "zp-l-line-px": $options.c.unit === "px" }),
                style: vue.normalizeStyle([{ backgroundColor: $data.zTheme.line[$options.ts] }, $options.c.noMoreLineCustomStyle])
              },
              null,
              6
              /* CLASS, STYLE */
            )) : vue.createCommentVNode("v-if", true),
            $options.finalStatus === $data.M.Loading && !!$options.c.loadingIconCustomImage ? (vue.openBlock(), vue.createElementBlock("image", {
              key: 1,
              src: $options.c.loadingIconCustomImage,
              style: vue.normalizeStyle([$options.c.iconCustomStyle]),
              class: vue.normalizeClass({ "zp-l-line-loading-custom-image": true, "zp-l-line-loading-custom-image-animated": $options.c.loadingAnimated, "zp-l-line-loading-custom-image-rpx": $options.c.unit === "rpx", "zp-l-line-loading-custom-image-px": $options.c.unit === "px" })
            }, null, 14, ["src"])) : vue.createCommentVNode("v-if", true),
            $options.finalStatus === $data.M.Loading && $options.finalLoadingIconType === "flower" && !$options.c.loadingIconCustomImage.length ? (vue.openBlock(), vue.createElementBlock("image", {
              key: 2,
              class: vue.normalizeClass({ "zp-line-loading-image": true, "zp-line-loading-image-rpx": $options.c.unit === "rpx", "zp-line-loading-image-px": $options.c.unit === "px" }),
              style: vue.normalizeStyle([$options.c.iconCustomStyle]),
              src: $data.zTheme.flower[$options.ts]
            }, null, 14, ["src"])) : vue.createCommentVNode("v-if", true),
            $options.finalStatus === $data.M.Loading && $options.finalLoadingIconType === "circle" && !$options.c.loadingIconCustomImage.length ? (vue.openBlock(), vue.createElementBlock(
              "text",
              {
                key: 3,
                class: vue.normalizeClass(["zp-l-circle-loading-view", { "zp-l-circle-loading-view-rpx": $options.c.unit === "rpx", "zp-l-circle-loading-view-px": $options.c.unit === "px" }]),
                style: vue.normalizeStyle([{ borderColor: $data.zTheme.circleBorder[$options.ts], borderTopColor: $data.zTheme.circleBorderTop[$options.ts] }, $options.c.iconCustomStyle])
              },
              null,
              6
              /* CLASS, STYLE */
            )) : vue.createCommentVNode("v-if", true),
            !$options.c.isChat || !$options.c.chatDefaultAsLoading && $options.finalStatus === $data.M.Default || $options.finalStatus === $data.M.Fail ? (vue.openBlock(), vue.createElementBlock(
              "text",
              {
                key: 4,
                class: vue.normalizeClass({ "zp-l-text-rpx": $options.c.unit === "rpx", "zp-l-text-px": $options.c.unit === "px" }),
                style: vue.normalizeStyle([{ color: $data.zTheme.title[$options.ts] }, $options.c.titleCustomStyle])
              },
              vue.toDisplayString($options.ownLoadingMoreText),
              7
              /* TEXT, CLASS, STYLE */
            )) : vue.createCommentVNode("v-if", true),
            $options.c.showNoMoreLine && $options.finalStatus === $data.M.NoMore ? (vue.openBlock(), vue.createElementBlock(
              "text",
              {
                key: 5,
                class: vue.normalizeClass({ "zp-l-line-rpx": $options.c.unit === "rpx", "zp-l-line-px": $options.c.unit === "px" }),
                style: vue.normalizeStyle([{ backgroundColor: $data.zTheme.line[$options.ts] }, $options.c.noMoreLineCustomStyle])
              },
              null,
              6
              /* CLASS, STYLE */
            )) : vue.createCommentVNode("v-if", true)
          ],
          64
          /* STABLE_FRAGMENT */
        )) : vue.createCommentVNode("v-if", true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const zPagingLoadMore = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["render", _sfc_render$q], ["__scopeId", "data-v-8cc5c400"], ["__file", "E:/cityInvestment02/city-Investment/uni_modules/z-paging/components/z-paging/components/z-paging-load-more.vue"]]);
  const commonLayoutModule = {
    data() {
      return {
        systemInfo: null,
        cssSafeAreaInsetBottom: -1,
        isReadyDestroy: false
      };
    },
    computed: {
      // 顶部可用距离
      windowTop() {
        if (!this.systemInfo)
          return 0;
        return this.systemInfo.windowTop || 0;
      },
      // 底部安全区域高度
      safeAreaBottom() {
        if (!this.systemInfo)
          return 0;
        let safeAreaBottom = 0;
        safeAreaBottom = this.systemInfo.safeAreaInsets.bottom || 0;
        return safeAreaBottom;
      },
      // 是否是比较老的webview，在一些老的webview中，需要进行一些特殊处理
      isOldWebView() {
        try {
          const systemInfos = u.getSystemInfoSync(true).system.split(" ");
          const deviceType = systemInfos[0];
          const version = parseInt(systemInfos[1]);
          if (deviceType === "iOS" && version <= 10 || deviceType === "Android" && version <= 6) {
            return true;
          }
        } catch (e) {
          return false;
        }
        return false;
      },
      // 当前组件的$slots，兼容不同平台
      zSlots() {
        return this.$slots;
      }
    },
    beforeDestroy() {
      this.isReadyDestroy = true;
    },
    unmounted() {
      this.isReadyDestroy = true;
    },
    methods: {
      // 更新fixed模式下z-paging的布局
      updateFixedLayout() {
        this.fixed && this.$nextTick(() => {
          this.systemInfo = u.getSystemInfoSync();
        });
      },
      // 获取节点尺寸
      _getNodeClientRect(select, inDom = true, scrollOffset = false) {
        if (this.isReadyDestroy) {
          return Promise.resolve(false);
        }
        let res = !!inDom ? uni.createSelectorQuery().in(inDom === true ? this : inDom) : uni.createSelectorQuery();
        scrollOffset ? res.select(select).scrollOffset() : res.select(select).boundingClientRect();
        return new Promise((resolve, reject) => {
          res.exec((data) => {
            resolve(data && data != "" && data != void 0 && data.length ? data : false);
          });
        });
      },
      // 获取slot="left"和slot="right"宽度并且更新布局
      _updateLeftAndRightWidth(targetStyle, parentNodePrefix) {
        this.$nextTick(() => {
          let delayTime = 0;
          setTimeout(() => {
            ["left", "right"].map((position) => {
              this._getNodeClientRect(`.${parentNodePrefix}-${position}`).then((res) => {
                this.$set(targetStyle, position, res ? res[0].width + "px" : "0px");
              });
            });
          }, delayTime);
        });
      },
      // 通过获取css设置的底部安全区域占位view高度设置bottom距离（直接通过systemInfo在部分平台上无法获取到底部安全区域）
      _getCssSafeAreaInsetBottom(success) {
        this._getNodeClientRect(".zp-safe-area-inset-bottom").then((res) => {
          this.cssSafeAreaInsetBottom = res ? res[0].height : -1;
          res && success && success();
        });
      },
      // 同步获取系统信息，兼容不同平台（供z-paging-swiper使用）
      _getSystemInfoSync(useCache = false) {
        return u.getSystemInfoSync(useCache);
      }
    }
  };
  const queryKey = "Query";
  const fetchParamsKey = "FetchParams";
  const fetchResultKey = "FetchResult";
  const language2LocalKey = "Language2Local";
  function handleQuery(callback) {
    _addHandleByKey(queryKey, callback);
    return this;
  }
  function _handleQuery(pageNo, pageSize, from, lastItem) {
    const callback = _getHandleByKey(queryKey);
    return callback ? callback(pageNo, pageSize, from, lastItem) : [pageNo, pageSize, from];
  }
  function handleFetchParams(callback) {
    _addHandleByKey(fetchParamsKey, callback);
    return this;
  }
  function _handleFetchParams(parmas, extraParams) {
    const callback = _getHandleByKey(fetchParamsKey);
    return callback ? callback(parmas, extraParams || {}) : { pageNo: parmas.pageNo, pageSize: parmas.pageSize, ...extraParams || {} };
  }
  function handleFetchResult(callback) {
    _addHandleByKey(fetchResultKey, callback);
    return this;
  }
  function _handleFetchResult(result, paging, params) {
    const callback = _getHandleByKey(fetchResultKey);
    callback && callback(result, paging, params);
    return callback ? true : false;
  }
  function handleLanguage2Local(callback) {
    _addHandleByKey(language2LocalKey, callback);
    return this;
  }
  function _handleLanguage2Local(language, local) {
    const callback = _getHandleByKey(language2LocalKey);
    return callback ? callback(language, local) : local;
  }
  function _getApp() {
    return getApp();
  }
  function _hasGlobalData() {
    return _getApp() && _getApp().globalData;
  }
  function _addHandleByKey(key, callback) {
    try {
      setTimeout(function() {
        if (_hasGlobalData()) {
          _getApp().globalData[`zp_handle${key}Callback`] = callback;
        }
      }, 1);
    } catch (_) {
    }
  }
  function _getHandleByKey(key) {
    return _hasGlobalData() ? _getApp().globalData[`zp_handle${key}Callback`] : null;
  }
  const interceptor = {
    handleQuery,
    _handleQuery,
    handleFetchParams,
    _handleFetchParams,
    handleFetchResult,
    _handleFetchResult,
    handleLanguage2Local,
    _handleLanguage2Local
  };
  const dataHandleModule = {
    props: {
      // 自定义初始的pageNo，默认为1
      defaultPageNo: {
        type: Number,
        default: u.gc("defaultPageNo", 1),
        observer: function(newVal) {
          this.pageNo = newVal;
        }
      },
      // 自定义pageSize，默认为10
      defaultPageSize: {
        type: Number,
        default: u.gc("defaultPageSize", 10),
        validator: (value) => {
          if (value <= 0)
            u.consoleErr("default-page-size必须大于0！");
          return value > 0;
        }
      },
      // 为保证数据一致，设置当前tab切换时的标识key，并在complete中传递相同key，若二者不一致，则complete将不会生效
      dataKey: {
        type: [Number, String, Object],
        default: u.gc("dataKey", null)
      },
      // 使用缓存，若开启将自动缓存第一页的数据，默认为否。请注意，因考虑到切换tab时不同tab数据不同的情况，默认仅会缓存组件首次加载时第一次请求到的数据，后续的下拉刷新操作不会更新缓存。
      useCache: {
        type: Boolean,
        default: u.gc("useCache", false)
      },
      // 使用缓存时缓存的key，用于区分不同列表的缓存数据，useCache为true时必须设置，否则缓存无效
      cacheKey: {
        type: String,
        default: u.gc("cacheKey", null)
      },
      // 缓存模式，默认仅会缓存组件首次加载时第一次请求到的数据，可设置为always，即代表总是缓存，每次列表刷新(下拉刷新、调用reload等)都会更新缓存
      cacheMode: {
        type: String,
        default: u.gc("cacheMode", Enum.CacheMode.Default)
      },
      // 自动注入的list名，可自动修改父view(包含ref="paging")中对应name的list值
      autowireListName: {
        type: String,
        default: u.gc("autowireListName", "")
      },
      // 自动注入的query名，可自动调用父view(包含ref="paging")中的query方法
      autowireQueryName: {
        type: String,
        default: u.gc("autowireQueryName", "")
      },
      // 获取分页数据Function，功能与@query类似。若设置了fetch则@query将不再触发
      fetch: {
        type: Function,
        default: null
      },
      // fetch的附加参数，fetch配置后有效
      fetchParams: {
        type: Object,
        default: u.gc("fetchParams", null)
      },
      // z-paging mounted后自动调用reload方法(mounted后自动调用接口)，默认为是
      auto: {
        type: Boolean,
        default: u.gc("auto", true)
      },
      // 用户下拉刷新时是否触发reload方法，默认为是
      reloadWhenRefresh: {
        type: Boolean,
        default: u.gc("reloadWhenRefresh", true)
      },
      // reload时自动滚动到顶部，默认为是
      autoScrollToTopWhenReload: {
        type: Boolean,
        default: u.gc("autoScrollToTopWhenReload", true)
      },
      // reload时立即自动清空原list，默认为是，若立即自动清空，则在reload之后、请求回调之前页面是空白的
      autoCleanListWhenReload: {
        type: Boolean,
        default: u.gc("autoCleanListWhenReload", true)
      },
      // 列表刷新时自动显示下拉刷新view，默认为否
      showRefresherWhenReload: {
        type: Boolean,
        default: u.gc("showRefresherWhenReload", false)
      },
      // 列表刷新时自动显示加载更多view，且为加载中状态，默认为否
      showLoadingMoreWhenReload: {
        type: Boolean,
        default: u.gc("showLoadingMoreWhenReload", false)
      },
      // 组件created时立即触发reload(可解决一些情况下先看到页面再看到loading的问题)，auto为true时有效。为否时将在mounted+nextTick后触发reload，默认为否
      createdReload: {
        type: Boolean,
        default: u.gc("createdReload", false)
      },
      // 本地分页时上拉加载更多延迟时间，单位为毫秒，默认200毫秒
      localPagingLoadingTime: {
        type: [Number, String],
        default: u.gc("localPagingLoadingTime", 200)
      },
      // 自动拼接complete中传过来的数组(使用聊天记录模式时无效)
      concat: {
        type: Boolean,
        default: u.gc("concat", true)
      },
      // 请求失败是否触发reject，默认为是
      callNetworkReject: {
        type: Boolean,
        default: u.gc("callNetworkReject", true)
      },
      // 父组件v-model所绑定的list的值
      value: {
        type: Array,
        default: function() {
          return [];
        }
      },
      modelValue: {
        type: Array,
        default: function() {
          return [];
        }
      }
    },
    data() {
      return {
        currentData: [],
        totalData: [],
        realTotalData: [],
        totalLocalPagingList: [],
        dataPromiseResultMap: {
          reload: null,
          complete: null,
          localPaging: null
        },
        isSettingCacheList: false,
        pageNo: 1,
        currentRefreshPageSize: 0,
        isLocalPaging: false,
        isAddedData: false,
        isTotalChangeFromAddData: false,
        privateConcat: true,
        myParentQuery: -1,
        firstPageLoaded: false,
        pagingLoaded: false,
        loaded: false,
        isUserReload: true,
        fromEmptyViewReload: false,
        queryFrom: "",
        listRendering: false,
        isHandlingRefreshToPage: false,
        isFirstPageAndNoMore: false,
        totalDataChangeThrow: true,
        addDataFromTopBufferedInsert: u.useBufferedInsert(this._addDataFromTop)
      };
    },
    computed: {
      pageSize() {
        return this.defaultPageSize;
      },
      finalConcat() {
        return this.concat && this.privateConcat;
      },
      finalUseCache() {
        if (this.useCache && !this.cacheKey) {
          u.consoleErr("use-cache为true时，必须设置cache-key，否则缓存无效！");
        }
        return this.useCache && !!this.cacheKey;
      },
      finalCacheKey() {
        return this.cacheKey ? `${c.cachePrefixKey}-${this.cacheKey}` : null;
      },
      isFirstPage() {
        return this.pageNo === this.defaultPageNo;
      }
    },
    watch: {
      totalData(newVal, oldVal) {
        const eventThrow = this.isSettingCacheList ? true : this.totalDataChangeThrow;
        this._totalDataChange(newVal, oldVal, eventThrow);
        this.totalDataChangeThrow = true;
      },
      currentData(newVal, oldVal) {
        this._currentDataChange(newVal, oldVal);
      },
      useChatRecordMode(newVal, oldVal) {
        if (newVal) {
          this.nLoadingMoreFixedHeight = false;
        }
      },
      value: {
        handler(newVal) {
          if (newVal !== this.totalData) {
            this.totalDataChangeThrow = false;
            this.totalData = newVal;
          }
        },
        immediate: true
      },
      modelValue: {
        handler(newVal) {
          if (newVal !== this.totalData) {
            this.totalDataChangeThrow = false;
            this.totalData = newVal;
          }
        },
        immediate: true
      }
    },
    methods: {
      // 请求结束(成功或者失败)调用此方法，将请求的结果传递给z-paging处理，第一个参数为请求结果数组，第二个参数为是否成功(默认为是）
      complete(data, success = true) {
        this.customNoMore = -1;
        return this.addData(data, success);
      },
      //【保证数据一致】请求结束(成功或者失败)调用此方法，将请求的结果传递给z-paging处理，第一个参数为请求结果数组，第二个参数为dataKey，需与:data-key绑定的一致，第三个参数为是否成功(默认为是）
      completeByKey(data, dataKey = null, success = true) {
        if (dataKey !== null && this.dataKey !== null && dataKey !== this.dataKey) {
          this.isFirstPage && this.endRefresh();
          return new Promise((resolve) => resolve());
        }
        this.customNoMore = -1;
        return this.addData(data, success);
      },
      //【通过total判断是否有更多数据】请求结束(成功或者失败)调用此方法，将请求的结果传递给z-paging处理，第一个参数为请求结果数组，第二个参数为total(列表总数)，第三个参数为是否成功(默认为是）
      completeByTotal(data, total, success = true) {
        if (total == "undefined") {
          this.customNoMore = -1;
        } else {
          const dataTypeRes = this._checkDataType(data, success, false);
          data = dataTypeRes.data;
          success = dataTypeRes.success;
          if (total >= 0 && success) {
            return new Promise((resolve, reject) => {
              this.$nextTick(() => {
                let nomore = false;
                const realTotalDataCount = this.pageNo == this.defaultPageNo ? 0 : this.realTotalData.length;
                const dataLength = this.privateConcat ? data.length : 0;
                let exceedCount = realTotalDataCount + dataLength - total;
                if (exceedCount >= 0) {
                  nomore = true;
                  exceedCount = this.defaultPageSize - exceedCount;
                  if (this.privateConcat && exceedCount > 0 && exceedCount < data.length) {
                    data = data.splice(0, exceedCount);
                  }
                }
                this.completeByNoMore(data, nomore, success).then((res) => resolve(res)).catch(() => reject());
              });
            });
          }
        }
        return this.addData(data, success);
      },
      //【自行判断是否有更多数据】请求结束(成功或者失败)调用此方法，将请求的结果传递给z-paging处理，第一个参数为请求结果数组，第二个参数为是否没有更多数据，第三个参数为是否成功(默认是是）
      completeByNoMore(data, nomore, success = true) {
        if (nomore != "undefined") {
          this.customNoMore = nomore == true ? 1 : 0;
        }
        return this.addData(data, success);
      },
      // 请求结束且请求失败时调用，支持传入请求失败原因
      completeByError(errorMsg) {
        this.customerEmptyViewErrorText = errorMsg;
        return this.complete(false);
      },
      // 与上方complete方法功能一致，新版本中设置服务端回调数组请使用complete方法
      addData(data, success = true) {
        if (!this.fromCompleteEmit) {
          this.disabledCompleteEmit = true;
          this.fromCompleteEmit = false;
        }
        const currentTimeStamp = u.getTime();
        const disTime = currentTimeStamp - this.requestTimeStamp;
        let minDelay = this.minDelay;
        if (this.isFirstPage && this.finalShowRefresherWhenReload) {
          minDelay = Math.max(400, minDelay);
        }
        const addDataDalay = this.requestTimeStamp > 0 && disTime < minDelay ? minDelay - disTime : 0;
        this.$nextTick(() => {
          u.delay(() => {
            this._addData(data, success, false);
          }, this.delay > 0 ? this.delay : addDataDalay);
        });
        return new Promise((resolve, reject) => {
          this.dataPromiseResultMap.complete = { resolve, reject };
        });
      },
      // 从顶部添加数据，不会影响分页的pageNo和pageSize
      addDataFromTop(data, toTop = true, toTopWithAnimate = true) {
        (this.finalUseVirtualList ? this.addDataFromTopBufferedInsert : this._addDataFromTop)(
          data,
          toTop,
          toTopWithAnimate
        );
      },
      // 重新设置列表数据，调用此方法不会影响pageNo和pageSize，也不会触发请求。适用场景：当需要删除列表中某一项时，将删除对应项后的数组通过此方法传递给z-paging。(当出现类似的需要修改列表数组的场景时，请使用此方法，请勿直接修改page中:list.sync绑定的数组)
      resetTotalData(data) {
        this.isTotalChangeFromAddData = true;
        data = Object.prototype.toString.call(data) !== "[object Array]" ? [data] : data;
        this.totalData = data;
      },
      // 设置本地分页数据，请求结束(成功或者失败)调用此方法，将请求的结果传递给z-paging作分页处理（若调用了此方法，则上拉加载更多时内部会自动分页，不会触发@query所绑定的事件）
      setLocalPaging(data, success = true) {
        this.isLocalPaging = true;
        this.$nextTick(() => {
          this._addData(data, success, true);
        });
        return new Promise((resolve, reject) => {
          this.dataPromiseResultMap.localPaging = { resolve, reject };
        });
      },
      // 重新加载分页数据，pageNo会恢复为默认值，相当于下拉刷新的效果(animate为true时会展示下拉刷新动画，默认为false)
      reload(animate = this.showRefresherWhenReload) {
        if (animate) {
          this.privateShowRefresherWhenReload = animate;
          this.isUserPullDown = true;
        }
        if (!this.showLoadingMoreWhenReload) {
          this.listRendering = true;
        }
        this.$nextTick(() => {
          this._preReload(animate, false);
        });
        return new Promise((resolve, reject) => {
          this.dataPromiseResultMap.reload = { resolve, reject };
        });
      },
      // 刷新列表数据，pageNo和pageSize不会重置，列表数据会重新从服务端获取。必须保证@query绑定的方法中的pageNo和pageSize和传给服务端的一致
      refresh() {
        return this._handleRefreshWithDisPageNo(this.pageNo - this.defaultPageNo + 1);
      },
      // 刷新列表数据至指定页，例如pageNo=5时则代表刷新列表至第5页，此时pageNo会变为5，列表会展示前5页的数据。必须保证@query绑定的方法中的pageNo和pageSize和传给服务端的一致
      refreshToPage(pageNo) {
        this.isHandlingRefreshToPage = true;
        return this._handleRefreshWithDisPageNo(pageNo + this.defaultPageNo - 1);
      },
      // 手动更新列表缓存数据，将自动截取v-model绑定的list中的前pageSize条覆盖缓存，请确保在list数据更新到预期结果后再调用此方法
      updateCache() {
        if (this.finalUseCache && this.totalData.length) {
          this._saveLocalCache(this.totalData.slice(0, Math.min(this.totalData.length, this.pageSize)));
        }
      },
      // 清空分页数据
      clean() {
        this._reload(true);
        this._addData([], true, false);
      },
      // 清空分页数据
      clear() {
        this.clean();
      },
      // reload之前的一些处理
      _preReload(animate = this.showRefresherWhenReload, isFromMounted = true, retryCount = 0) {
        const showRefresher = this.finalRefresherEnabled && this.useCustomRefresher;
        if (this.customRefresherHeight === -1 && showRefresher) {
          u.delay(() => {
            retryCount++;
            if (retryCount % 10 === 0) {
              this._updateCustomRefresherHeight();
            }
            this._preReload(animate, isFromMounted, retryCount);
          }, c.delayTime / 2);
          return;
        }
        this.isUserReload = true;
        this.loadingType = Enum.LoadingType.Refresher;
        if (animate) {
          this.privateShowRefresherWhenReload = animate;
          if (this.useCustomRefresher) {
            this._doRefresherRefreshAnimate();
          } else {
            this.refresherTriggered = true;
          }
        } else {
          this._refresherEnd(false, false, false, false);
        }
        this._reload(false, isFromMounted);
      },
      // 重新加载分页数据
      _reload(isClean = false, isFromMounted = false, isUserPullDown = false) {
        this.isAddedData = false;
        this.insideOfPaging = -1;
        this.cacheScrollNodeHeight = -1;
        this.pageNo = this.defaultPageNo;
        this._cleanRefresherEndTimeout();
        !this.privateShowRefresherWhenReload && !isClean && this._startLoading(true);
        this.firstPageLoaded = true;
        this.isTotalChangeFromAddData = false;
        if (!this.isSettingCacheList) {
          this.totalData = [];
        }
        if (!isClean) {
          this._emitQuery(this.pageNo, this.defaultPageSize, isUserPullDown ? Enum.QueryFrom.UserPullDown : Enum.QueryFrom.Reload);
          let delay2 = 0;
          u.delay(this._callMyParentQuery, delay2);
          if (!isFromMounted && this.autoScrollToTopWhenReload) {
            this._scrollToTop(false);
          }
        }
      },
      // 处理服务端返回的数组
      _addData(data, success, isLocal) {
        this.isAddedData = true;
        this.fromEmptyViewReload = false;
        this.isTotalChangeFromAddData = true;
        this.refresherTriggered = false;
        this._endSystemLoadingAndRefresh();
        const tempIsUserPullDown = this.isUserPullDown;
        if (this.showRefresherUpdateTime && this.isFirstPage) {
          u.setRefesrherTime(u.getTime(), this.refresherUpdateTimeKey);
          this.$refs.refresh && this.$refs.refresh.updateTime();
        }
        if (!isLocal && tempIsUserPullDown && this.isFirstPage) {
          this.isUserPullDown = false;
        }
        this.listRendering = true;
        this.$nextTick(() => {
          u.delay(() => this.listRendering = false);
        });
        let dataTypeRes = this._checkDataType(data, success, isLocal);
        data = dataTypeRes.data;
        success = dataTypeRes.success;
        let delayTime = c.delayTime;
        if (this.useChatRecordMode)
          delayTime = 0;
        this.loadingForNow = false;
        u.delay(() => {
          this.pagingLoaded = true;
          this.$nextTick(() => {
            !isLocal && this._refresherEnd(delayTime > 0, true, tempIsUserPullDown);
          });
        });
        if (this.isFirstPage) {
          this.isLoadFailed = !success;
          this.$emit("isLoadFailedChange", this.isLoadFailed);
          if (this.finalUseCache && success && (this.cacheMode === Enum.CacheMode.Always ? true : this.isSettingCacheList)) {
            this._saveLocalCache(data);
          }
        }
        this.isSettingCacheList = false;
        if (success) {
          if (!(this.privateConcat === false && !this.isHandlingRefreshToPage && this.loadingStatus === Enum.More.NoMore)) {
            this.loadingStatus = Enum.More.Default;
          }
          if (isLocal) {
            this.totalLocalPagingList = data;
            const localPageNo = this.defaultPageNo;
            const localPageSize = this.queryFrom !== Enum.QueryFrom.Refresh ? this.defaultPageSize : this.currentRefreshPageSize;
            this._localPagingQueryList(localPageNo, localPageSize, 0, (res) => {
              u.delay(() => {
                this.completeByTotal(res, this.totalLocalPagingList.length);
              }, 0);
            });
          } else {
            let dataChangeDelayTime = 0;
            u.delay(() => {
              this._currentDataChange(data, this.currentData);
              this._callDataPromise(true, this.totalData);
            }, dataChangeDelayTime);
          }
          if (this.isHandlingRefreshToPage) {
            this.isHandlingRefreshToPage = false;
            this.pageNo = this.defaultPageNo + Math.ceil(data.length / this.pageSize) - 1;
            if (data.length % this.pageSize !== 0) {
              this.customNoMore = 1;
            }
          }
        } else {
          this._currentDataChange(data, this.currentData);
          this._callDataPromise(false);
          this.loadingStatus = Enum.More.Fail;
          this.isHandlingRefreshToPage = false;
          if (this.loadingType === Enum.LoadingType.LoadMore) {
            this.pageNo--;
          }
        }
      },
      // 所有数据改变时调用
      _totalDataChange(newVal, oldVal, eventThrow = true) {
        if ((!this.isUserReload || !this.autoCleanListWhenReload) && this.firstPageLoaded && !newVal.length && oldVal.length) {
          return;
        }
        this._doCheckScrollViewShouldFullHeight(newVal);
        if (!this.realTotalData.length && !newVal.length) {
          eventThrow = false;
        }
        this.realTotalData = newVal;
        if (eventThrow) {
          this.$emit("input", newVal);
          this.$emit("update:modelValue", newVal);
          this.$emit("update:list", newVal);
          this.$emit("listChange", newVal);
          this._callMyParentList(newVal);
        }
        this.firstPageLoaded = false;
        this.isTotalChangeFromAddData = false;
        this.$nextTick(() => {
          u.delay(() => {
            this._getNodeClientRect(".zp-paging-container-content").then((res) => {
              res && this.$emit("contentHeightChanged", res[0].height);
            });
          }, c.delayTime * (this.isIos ? 1 : 3));
        });
      },
      // 当前数据改变时调用
      _currentDataChange(newVal, oldVal) {
        newVal = [...newVal];
        this.finalUseVirtualList && this._setCellIndex(newVal, "bottom");
        if (this.isFirstPage && this.finalConcat) {
          this.totalData = [];
        }
        if (this.customNoMore !== -1) {
          if (this.customNoMore === 1 || this.customNoMore !== 0 && !newVal.length) {
            this.loadingStatus = Enum.More.NoMore;
          }
        } else {
          if (!newVal.length || newVal.length && newVal.length < this.defaultPageSize) {
            this.loadingStatus = Enum.More.NoMore;
          }
        }
        if (!this.totalData.length) {
          this.totalData = newVal;
        } else {
          if (this.finalConcat) {
            this.oldScrollTop;
            this.totalData = [...this.totalData, ...newVal];
          } else {
            this.totalData = newVal;
          }
        }
        this.privateConcat = true;
      },
      // 根据pageNo处理refresh操作
      _handleRefreshWithDisPageNo(pageNo) {
        if (!this.isHandlingRefreshToPage && !this.realTotalData.length)
          return this.reload();
        if (pageNo >= 1) {
          this.loading = true;
          this.privateConcat = false;
          const totalPageSize = pageNo * this.pageSize;
          this.currentRefreshPageSize = totalPageSize;
          if (this.isLocalPaging && this.isHandlingRefreshToPage) {
            this._localPagingQueryList(this.defaultPageNo, totalPageSize, 0, (res) => {
              this.complete(res);
            });
          } else {
            this._emitQuery(this.defaultPageNo, totalPageSize, Enum.QueryFrom.Refresh);
            this._callMyParentQuery(this.defaultPageNo, totalPageSize);
          }
        }
        return new Promise((resolve, reject) => {
          this.dataPromiseResultMap.reload = { resolve, reject };
        });
      },
      // 本地分页请求
      _localPagingQueryList(pageNo, pageSize, localPagingLoadingTime, callback) {
        pageNo = Math.max(1, pageNo);
        pageSize = Math.max(1, pageSize);
        const totalPagingList = [...this.totalLocalPagingList];
        const pageNoIndex = (pageNo - 1) * pageSize;
        const finalPageNoIndex = Math.min(totalPagingList.length, pageNoIndex + pageSize);
        const resultPagingList = totalPagingList.splice(pageNoIndex, finalPageNoIndex - pageNoIndex);
        u.delay(() => callback(resultPagingList), localPagingLoadingTime);
      },
      // 从顶部添加数据，不会影响分页的pageNo和pageSize
      _addDataFromTop(data, toTop = true, toTopWithAnimate = true) {
        let addFromTop = !this.isChatRecordModeAndNotInversion;
        data = Object.prototype.toString.call(data) !== "[object Array]" ? [data] : addFromTop ? data.reverse() : data;
        this.finalUseVirtualList && this._setCellIndex(data, "top");
        this.totalData = addFromTop ? [...data, ...this.totalData] : [...this.totalData, ...data];
        if (toTop) {
          u.delay(() => this.useChatRecordMode ? this.scrollToBottom(toTopWithAnimate) : this.scrollToTop(toTopWithAnimate));
        }
      },
      // 存储列表缓存数据
      _saveLocalCache(data) {
        uni.setStorageSync(this.finalCacheKey, data);
      },
      // 通过缓存数据填充列表数据
      _setListByLocalCache() {
        this.totalData = uni.getStorageSync(this.finalCacheKey) || [];
        this.isSettingCacheList = true;
      },
      // 修改父view的list
      _callMyParentList(newVal) {
        if (this.autowireListName.length) {
          const myParent = u.getParent(this.$parent);
          if (myParent && myParent[this.autowireListName]) {
            myParent[this.autowireListName] = newVal;
          }
        }
      },
      // 调用父view的query
      _callMyParentQuery(customPageNo = 0, customPageSize = 0) {
        if (this.autowireQueryName) {
          if (this.myParentQuery === -1) {
            const myParent = u.getParent(this.$parent);
            if (myParent && myParent[this.autowireQueryName]) {
              this.myParentQuery = myParent[this.autowireQueryName];
            }
          }
          if (this.myParentQuery !== -1) {
            customPageSize > 0 ? this.myParentQuery(customPageNo, customPageSize) : this.myParentQuery(this.pageNo, this.defaultPageSize);
          }
        }
      },
      // emit query事件
      _emitQuery(pageNo, pageSize, from) {
        this.queryFrom = from;
        this.requestTimeStamp = u.getTime();
        const [lastItem] = this.realTotalData.slice(-1);
        if (this.fetch) {
          const fetchParams = interceptor._handleFetchParams({ pageNo, pageSize, from, lastItem: lastItem || null }, this.fetchParams);
          const fetchResult = this.fetch(fetchParams);
          if (!interceptor._handleFetchResult(fetchResult, this, fetchParams)) {
            u.isPromise(fetchResult) ? fetchResult.then((res) => {
              this.complete(res);
            }).catch((err) => {
              this.complete(false);
            }) : this.complete(fetchResult);
          }
        } else {
          this.$emit("query", ...interceptor._handleQuery(pageNo, pageSize, from, lastItem || null));
        }
      },
      // 触发数据改变promise
      _callDataPromise(success, totalList) {
        for (const key in this.dataPromiseResultMap) {
          const obj = this.dataPromiseResultMap[key];
          if (!obj)
            continue;
          success ? obj.resolve({ totalList, noMore: this.loadingStatus === Enum.More.NoMore }) : this.callNetworkReject && obj.reject(`z-paging-${key}-error`);
        }
      },
      // 检查complete data的类型
      _checkDataType(data, success, isLocal) {
        const dataType = Object.prototype.toString.call(data);
        if (dataType === "[object Boolean]") {
          success = data;
          data = [];
        } else if (dataType !== "[object Array]") {
          data = [];
          if (dataType !== "[object Undefined]" && dataType !== "[object Null]") {
            u.consoleErr(`${isLocal ? "setLocalPaging" : "complete"}参数类型不正确，第一个参数类型必须为Array!`);
          }
        }
        return { data, success };
      }
    }
  };
  const isObject = (val) => val !== null && typeof val === "object";
  const defaultDelimiters = ["{", "}"];
  class BaseFormatter {
    constructor() {
      this._caches = /* @__PURE__ */ Object.create(null);
    }
    interpolate(message, values, delimiters = defaultDelimiters) {
      if (!values) {
        return [message];
      }
      let tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    }
  }
  const RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
  const RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
  function parse(format, [startDelimiter, endDelimiter]) {
    const tokens = [];
    let position = 0;
    let text = "";
    while (position < format.length) {
      let char = format[position++];
      if (char === startDelimiter) {
        if (text) {
          tokens.push({ type: "text", value: text });
        }
        text = "";
        let sub = "";
        char = format[position++];
        while (char !== void 0 && char !== endDelimiter) {
          sub += char;
          char = format[position++];
        }
        const isClosed = char === endDelimiter;
        const type = RE_TOKEN_LIST_VALUE.test(sub) ? "list" : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? "named" : "unknown";
        tokens.push({ value: sub, type });
      } else {
        text += char;
      }
    }
    text && tokens.push({ type: "text", value: text });
    return tokens;
  }
  function compile(tokens, values) {
    const compiled = [];
    let index = 0;
    const mode = Array.isArray(values) ? "list" : isObject(values) ? "named" : "unknown";
    if (mode === "unknown") {
      return compiled;
    }
    while (index < tokens.length) {
      const token = tokens[index];
      switch (token.type) {
        case "text":
          compiled.push(token.value);
          break;
        case "list":
          compiled.push(values[parseInt(token.value, 10)]);
          break;
        case "named":
          if (mode === "named") {
            compiled.push(values[token.value]);
          } else {
            {
              console.warn(`Type of token '${token.type}' and format of value '${mode}' don't match!`);
            }
          }
          break;
        case "unknown":
          {
            console.warn(`Detect 'unknown' type of token!`);
          }
          break;
      }
      index++;
    }
    return compiled;
  }
  const LOCALE_ZH_HANS = "zh-Hans";
  const LOCALE_ZH_HANT = "zh-Hant";
  const LOCALE_EN = "en";
  const LOCALE_FR = "fr";
  const LOCALE_ES = "es";
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  const hasOwn = (val, key) => hasOwnProperty.call(val, key);
  const defaultFormatter = new BaseFormatter();
  function include(str, parts) {
    return !!parts.find((part) => str.indexOf(part) !== -1);
  }
  function startsWith(str, parts) {
    return parts.find((part) => str.indexOf(part) === 0);
  }
  function normalizeLocale(locale, messages2) {
    if (!locale) {
      return;
    }
    locale = locale.trim().replace(/_/g, "-");
    if (messages2 && messages2[locale]) {
      return locale;
    }
    locale = locale.toLowerCase();
    if (locale === "chinese") {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf("zh") === 0) {
      if (locale.indexOf("-hans") > -1) {
        return LOCALE_ZH_HANS;
      }
      if (locale.indexOf("-hant") > -1) {
        return LOCALE_ZH_HANT;
      }
      if (include(locale, ["-tw", "-hk", "-mo", "-cht"])) {
        return LOCALE_ZH_HANT;
      }
      return LOCALE_ZH_HANS;
    }
    let locales = [LOCALE_EN, LOCALE_FR, LOCALE_ES];
    if (messages2 && Object.keys(messages2).length > 0) {
      locales = Object.keys(messages2);
    }
    const lang = startsWith(locale, locales);
    if (lang) {
      return lang;
    }
  }
  class I18n {
    constructor({ locale, fallbackLocale, messages: messages2, watcher, formater: formater2 }) {
      this.locale = LOCALE_EN;
      this.fallbackLocale = LOCALE_EN;
      this.message = {};
      this.messages = {};
      this.watchers = [];
      if (fallbackLocale) {
        this.fallbackLocale = fallbackLocale;
      }
      this.formater = formater2 || defaultFormatter;
      this.messages = messages2 || {};
      this.setLocale(locale || LOCALE_EN);
      if (watcher) {
        this.watchLocale(watcher);
      }
    }
    setLocale(locale) {
      const oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      if (oldLocale !== this.locale) {
        this.watchers.forEach((watcher) => {
          watcher(this.locale, oldLocale);
        });
      }
    }
    getLocale() {
      return this.locale;
    }
    watchLocale(fn) {
      const index = this.watchers.push(fn) - 1;
      return () => {
        this.watchers.splice(index, 1);
      };
    }
    add(locale, message, override = true) {
      const curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else {
          Object.keys(message).forEach((key) => {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else {
        this.messages[locale] = message;
      }
    }
    f(message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join("");
    }
    t(key, locale, values) {
      let message = this.message;
      if (typeof locale === "string") {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn(`Cannot translate the value of keypath ${key}. Use the value of keypath as default.`);
        return key;
      }
      return this.formater.interpolate(message[key], values).join("");
    }
  }
  function watchAppLocale(appVm, i18n) {
    if (appVm.$watchLocale) {
      appVm.$watchLocale((newLocale) => {
        i18n.setLocale(newLocale);
      });
    } else {
      appVm.$watch(() => appVm.$locale, (newLocale) => {
        i18n.setLocale(newLocale);
      });
    }
  }
  function getDefaultLocale() {
    if (typeof uni !== "undefined" && uni.getLocale) {
      return uni.getLocale();
    }
    if (typeof global !== "undefined" && global.getLocale) {
      return global.getLocale();
    }
    return LOCALE_EN;
  }
  function initVueI18n(locale, messages2 = {}, fallbackLocale, watcher) {
    if (typeof locale !== "string") {
      const options = [
        messages2,
        locale
      ];
      locale = options[0];
      messages2 = options[1];
    }
    if (typeof locale !== "string") {
      locale = getDefaultLocale();
    }
    if (typeof fallbackLocale !== "string") {
      fallbackLocale = typeof __uniConfig !== "undefined" && __uniConfig.fallbackLocale || LOCALE_EN;
    }
    const i18n = new I18n({
      locale,
      fallbackLocale,
      messages: messages2,
      watcher
    });
    let t2 = (key, values) => {
      if (typeof getApp !== "function") {
        t2 = function(key2, values2) {
          return i18n.t(key2, values2);
        };
      } else {
        let isWatchedAppLocale = false;
        t2 = function(key2, values2) {
          const appVm = getApp().$vm;
          if (appVm) {
            appVm.$locale;
            if (!isWatchedAppLocale) {
              isWatchedAppLocale = true;
              watchAppLocale(appVm, i18n);
            }
          }
          return i18n.t(key2, values2);
        };
      }
      return t2(key, values);
    };
    return {
      i18n,
      f(message, values, delimiters) {
        return i18n.f(message, values, delimiters);
      },
      t(key, values) {
        return t2(key, values);
      },
      add(locale2, message, override = true) {
        return i18n.add(locale2, message, override);
      },
      watch(fn) {
        return i18n.watchLocale(fn);
      },
      getLocale() {
        return i18n.getLocale();
      },
      setLocale(newLocale) {
        return i18n.setLocale(newLocale);
      }
    };
  }
  const en$1 = {
    "zp.refresher.default": "Pull down to refresh",
    "zp.refresher.pulling": "Release to refresh",
    "zp.refresher.refreshing": "Refreshing...",
    "zp.refresher.complete": "Refresh succeeded",
    "zp.refresher.f2": "Refresh to enter 2f",
    "zp.loadingMore.default": "Click to load more",
    "zp.loadingMore.loading": "Loading...",
    "zp.loadingMore.noMore": "No more data",
    "zp.loadingMore.fail": "Load failed,click to reload",
    "zp.emptyView.title": "No data",
    "zp.emptyView.reload": "Reload",
    "zp.emptyView.error": "Sorry,load failed",
    "zp.refresherUpdateTime.title": "Last update: ",
    "zp.refresherUpdateTime.none": "None",
    "zp.refresherUpdateTime.today": "Today",
    "zp.refresherUpdateTime.yesterday": "Yesterday",
    "zp.systemLoading.title": "Loading..."
  };
  const zhHans$1 = {
    "zp.refresher.default": "继续下拉刷新",
    "zp.refresher.pulling": "松开立即刷新",
    "zp.refresher.refreshing": "正在刷新...",
    "zp.refresher.complete": "刷新成功",
    "zp.refresher.f2": "松手进入二楼",
    "zp.loadingMore.default": "点击加载更多",
    "zp.loadingMore.loading": "正在加载...",
    "zp.loadingMore.noMore": "没有更多了",
    "zp.loadingMore.fail": "加载失败，点击重新加载",
    "zp.emptyView.title": "没有数据哦~",
    "zp.emptyView.reload": "重新加载",
    "zp.emptyView.error": "很抱歉，加载失败",
    "zp.refresherUpdateTime.title": "最后更新：",
    "zp.refresherUpdateTime.none": "无",
    "zp.refresherUpdateTime.today": "今天",
    "zp.refresherUpdateTime.yesterday": "昨天",
    "zp.systemLoading.title": "加载中..."
  };
  const zhHant$1 = {
    "zp.refresher.default": "繼續下拉重繪",
    "zp.refresher.pulling": "鬆開立即重繪",
    "zp.refresher.refreshing": "正在重繪...",
    "zp.refresher.complete": "重繪成功",
    "zp.refresher.f2": "鬆手進入二樓",
    "zp.loadingMore.default": "點擊加載更多",
    "zp.loadingMore.loading": "正在加載...",
    "zp.loadingMore.noMore": "沒有更多了",
    "zp.loadingMore.fail": "加載失敗，點擊重新加載",
    "zp.emptyView.title": "沒有數據哦~",
    "zp.emptyView.reload": "重新加載",
    "zp.emptyView.error": "很抱歉，加載失敗",
    "zp.refresherUpdateTime.title": "最後更新：",
    "zp.refresherUpdateTime.none": "無",
    "zp.refresherUpdateTime.today": "今天",
    "zp.refresherUpdateTime.yesterday": "昨天",
    "zp.systemLoading.title": "加載中..."
  };
  const messages$1 = {
    en: en$1,
    "zh-Hans": zhHans$1,
    "zh-Hant": zhHant$1
  };
  const { t: t$1 } = initVueI18n(messages$1);
  const i18nModule = {
    computed: {
      finalLanguage() {
        try {
          const local = uni.getLocale();
          const language = this.systemInfo.appLanguage;
          return local === "auto" ? interceptor._handleLanguage2Local(language, this._language2Local(language)) : local;
        } catch (e) {
          return "zh-Hans";
        }
      },
      // 最终的下拉刷新默认状态的文字
      finalRefresherDefaultText() {
        return this._getI18nText("zp.refresher.default", this.refresherDefaultText);
      },
      // 最终的下拉刷新下拉中的文字
      finalRefresherPullingText() {
        return this._getI18nText("zp.refresher.pulling", this.refresherPullingText);
      },
      // 最终的下拉刷新中文字
      finalRefresherRefreshingText() {
        return this._getI18nText("zp.refresher.refreshing", this.refresherRefreshingText);
      },
      // 最终的下拉刷新完成文字
      finalRefresherCompleteText() {
        return this._getI18nText("zp.refresher.complete", this.refresherCompleteText);
      },
      // 最终的下拉刷新上次更新时间文字
      finalRefresherUpdateTimeTextMap() {
        return {
          title: t$1("zp.refresherUpdateTime.title"),
          none: t$1("zp.refresherUpdateTime.none"),
          today: t$1("zp.refresherUpdateTime.today"),
          yesterday: t$1("zp.refresherUpdateTime.yesterday")
        };
      },
      // 最终的继续下拉进入二楼文字
      finalRefresherGoF2Text() {
        return this._getI18nText("zp.refresher.f2", this.refresherGoF2Text);
      },
      // 最终的底部加载更多默认状态文字
      finalLoadingMoreDefaultText() {
        return this._getI18nText("zp.loadingMore.default", this.loadingMoreDefaultText);
      },
      // 最终的底部加载更多加载中文字
      finalLoadingMoreLoadingText() {
        return this._getI18nText("zp.loadingMore.loading", this.loadingMoreLoadingText);
      },
      // 最终的底部加载更多没有更多数据文字
      finalLoadingMoreNoMoreText() {
        return this._getI18nText("zp.loadingMore.noMore", this.loadingMoreNoMoreText);
      },
      // 最终的底部加载更多加载失败文字
      finalLoadingMoreFailText() {
        return this._getI18nText("zp.loadingMore.fail", this.loadingMoreFailText);
      },
      // 最终的空数据图title
      finalEmptyViewText() {
        return this.isLoadFailed ? this.finalEmptyViewErrorText : this._getI18nText("zp.emptyView.title", this.emptyViewText);
      },
      // 最终的空数据图reload title
      finalEmptyViewReloadText() {
        return this._getI18nText("zp.emptyView.reload", this.emptyViewReloadText);
      },
      // 最终的空数据图加载失败文字
      finalEmptyViewErrorText() {
        return this.customerEmptyViewErrorText || this._getI18nText("zp.emptyView.error", this.emptyViewErrorText);
      },
      // 最终的系统loading title
      finalSystemLoadingText() {
        return this._getI18nText("zp.systemLoading.title", this.systemLoadingText);
      }
    },
    methods: {
      // 获取当前z-paging的语言
      getLanguage() {
        return this.finalLanguage;
      },
      // 获取国际化转换后的文本
      _getI18nText(key, value) {
        const dataType = Object.prototype.toString.call(value);
        if (dataType === "[object Object]") {
          const nextValue = value[this.finalLanguage];
          if (nextValue)
            return nextValue;
        } else if (dataType === "[object String]") {
          return value;
        }
        return t$1(key);
      },
      // 系统language转i18n local
      _language2Local(language) {
        const formatedLanguage = language.toLowerCase().replace(new RegExp("_", ""), "-");
        if (formatedLanguage.indexOf("zh") !== -1) {
          if (formatedLanguage === "zh" || formatedLanguage === "zh-cn" || formatedLanguage.indexOf("zh-hans") !== -1) {
            return "zh-Hans";
          }
          return "zh-Hant";
        }
        if (formatedLanguage.indexOf("en") !== -1)
          return "en";
        return language;
      }
    }
  };
  const nvueModule = {
    props: {},
    data() {
      return {
        nRefresherLoading: false,
        nListIsDragging: false,
        nShowBottom: true,
        nFixFreezing: false,
        nShowRefresherReveal: false,
        nLoadingMoreFixedHeight: false,
        nShowRefresherRevealHeight: 0,
        nOldShowRefresherRevealHeight: -1,
        nRefresherWidth: u.rpx2px(750),
        nListHeight: 0,
        nF2Opacity: 0
      };
    },
    computed: {},
    mounted() {
    },
    methods: {}
  };
  const emptyModule = {
    props: {
      // 是否强制隐藏空数据图，默认为否
      hideEmptyView: {
        type: Boolean,
        default: u.gc("hideEmptyView", false)
      },
      // 空数据图描述文字，默认为“没有数据哦~”
      emptyViewText: {
        type: [String, Object],
        default: u.gc("emptyViewText", null)
      },
      // 是否显示空数据图重新加载按钮(无数据时)，默认为否
      showEmptyViewReload: {
        type: Boolean,
        default: u.gc("showEmptyViewReload", false)
      },
      // 加载失败时是否显示空数据图重新加载按钮，默认为是
      showEmptyViewReloadWhenError: {
        type: Boolean,
        default: u.gc("showEmptyViewReloadWhenError", true)
      },
      // 空数据图点击重新加载文字，默认为“重新加载”
      emptyViewReloadText: {
        type: [String, Object],
        default: u.gc("emptyViewReloadText", null)
      },
      // 空数据图图片，默认使用z-paging内置的图片
      emptyViewImg: {
        type: String,
        default: u.gc("emptyViewImg", "")
      },
      // 空数据图“加载失败”描述文字，默认为“很抱歉，加载失败”
      emptyViewErrorText: {
        type: [String, Object],
        default: u.gc("emptyViewErrorText", null)
      },
      // 空数据图“加载失败”图片，默认使用z-paging内置的图片
      emptyViewErrorImg: {
        type: String,
        default: u.gc("emptyViewErrorImg", "")
      },
      // 空数据图样式
      emptyViewStyle: {
        type: Object,
        default: u.gc("emptyViewStyle", {})
      },
      // 空数据图容器样式
      emptyViewSuperStyle: {
        type: Object,
        default: u.gc("emptyViewSuperStyle", {})
      },
      // 空数据图img样式
      emptyViewImgStyle: {
        type: Object,
        default: u.gc("emptyViewImgStyle", {})
      },
      // 空数据图描述文字样式
      emptyViewTitleStyle: {
        type: Object,
        default: u.gc("emptyViewTitleStyle", {})
      },
      // 空数据图重新加载按钮样式
      emptyViewReloadStyle: {
        type: Object,
        default: u.gc("emptyViewReloadStyle", {})
      },
      // 空数据图片是否铺满z-paging，默认为否，即填充满z-paging内列表(滚动区域)部分。若设置为否，则为填铺满整个z-paging
      emptyViewFixed: {
        type: Boolean,
        default: u.gc("emptyViewFixed", false)
      },
      // 空数据图片是否垂直居中，默认为是，若设置为否即为从空数据容器顶部开始显示。emptyViewFixed为false时有效
      emptyViewCenter: {
        type: Boolean,
        default: u.gc("emptyViewCenter", true)
      },
      // 加载中时是否自动隐藏空数据图，默认为是
      autoHideEmptyViewWhenLoading: {
        type: Boolean,
        default: u.gc("autoHideEmptyViewWhenLoading", true)
      },
      // 用户下拉列表触发下拉刷新加载中时是否自动隐藏空数据图，默认为是
      autoHideEmptyViewWhenPull: {
        type: Boolean,
        default: u.gc("autoHideEmptyViewWhenPull", true)
      },
      // 空数据view的z-index，默认为9
      emptyViewZIndex: {
        type: Number,
        default: u.gc("emptyViewZIndex", 9)
      }
    },
    data() {
      return {
        customerEmptyViewErrorText: ""
      };
    },
    computed: {
      finalEmptyViewImg() {
        return this.isLoadFailed ? this.emptyViewErrorImg : this.emptyViewImg;
      },
      finalShowEmptyViewReload() {
        return this.isLoadFailed ? this.showEmptyViewReloadWhenError : this.showEmptyViewReload;
      },
      // 是否展示空数据图
      showEmpty() {
        if (this.isOnly || this.hideEmptyView || this.realTotalData.length)
          return false;
        if (this.autoHideEmptyViewWhenLoading) {
          if (this.isAddedData && !this.firstPageLoaded && !this.loading)
            return true;
        } else {
          return true;
        }
        return !this.autoHideEmptyViewWhenPull && !this.isUserReload;
      }
    },
    methods: {
      // 点击了空数据view重新加载按钮
      _emptyViewReload() {
        let callbacked = false;
        this.$emit("emptyViewReload", (reload) => {
          if (reload === void 0 || reload === true) {
            this.fromEmptyViewReload = true;
            this.reload().catch(() => {
            });
          }
          callbacked = true;
        });
        this.$nextTick(() => {
          if (!callbacked) {
            this.fromEmptyViewReload = true;
            this.reload().catch(() => {
            });
          }
        });
      },
      // 点击了空数据view
      _emptyViewClick() {
        this.$emit("emptyViewClick");
      }
    }
  };
  const refresherModule = {
    props: {
      // 下拉刷新的主题样式，支持black，white，默认black
      refresherThemeStyle: {
        type: String,
        default: u.gc("refresherThemeStyle", "")
      },
      // 自定义下拉刷新中左侧图标的样式
      refresherImgStyle: {
        type: Object,
        default: u.gc("refresherImgStyle", {})
      },
      // 自定义下拉刷新中右侧状态描述文字的样式
      refresherTitleStyle: {
        type: Object,
        default: u.gc("refresherTitleStyle", {})
      },
      // 自定义下拉刷新中右侧最后更新时间文字的样式(show-refresher-update-time为true时有效)
      refresherUpdateTimeStyle: {
        type: Object,
        default: u.gc("refresherUpdateTimeStyle", {})
      },
      // 在微信小程序和QQ小程序中，是否实时监听下拉刷新中进度，默认为否
      watchRefresherTouchmove: {
        type: Boolean,
        default: u.gc("watchRefresherTouchmove", false)
      },
      // 底部加载更多的主题样式，支持black，white，默认black
      loadingMoreThemeStyle: {
        type: String,
        default: u.gc("loadingMoreThemeStyle", "")
      },
      // 是否只使用下拉刷新，设置为true后将关闭mounted自动请求数据、关闭滚动到底部加载更多，强制隐藏空数据图。默认为否
      refresherOnly: {
        type: Boolean,
        default: u.gc("refresherOnly", false)
      },
      // 自定义下拉刷新默认状态下回弹动画时间，单位为毫秒，默认为100毫秒，nvue无效
      refresherDefaultDuration: {
        type: [Number, String],
        default: u.gc("refresherDefaultDuration", 100)
      },
      // 自定义下拉刷新结束以后延迟回弹的时间，单位为毫秒，默认为0
      refresherCompleteDelay: {
        type: [Number, String],
        default: u.gc("refresherCompleteDelay", 0)
      },
      // 自定义下拉刷新结束回弹动画时间，单位为毫秒，默认为300毫秒(refresherEndBounceEnabled为false时，refresherCompleteDuration为设定值的1/3)，nvue无效
      refresherCompleteDuration: {
        type: [Number, String],
        default: u.gc("refresherCompleteDuration", 300)
      },
      // 自定义下拉刷新中是否允许列表滚动，默认为是
      refresherRefreshingScrollable: {
        type: Boolean,
        default: u.gc("refresherRefreshingScrollable", true)
      },
      // 自定义下拉刷新结束状态下是否允许列表滚动，默认为否
      refresherCompleteScrollable: {
        type: Boolean,
        default: u.gc("refresherCompleteScrollable", false)
      },
      // 是否使用自定义的下拉刷新，默认为是，即使用z-paging的下拉刷新。设置为false即代表使用uni scroll-view自带的下拉刷新，h5、App、微信小程序以外的平台不支持uni scroll-view自带的下拉刷新
      useCustomRefresher: {
        type: Boolean,
        default: u.gc("useCustomRefresher", true)
      },
      // 自定义下拉刷新下拉帧率，默认为40，过高可能会出现抖动问题
      refresherFps: {
        type: [Number, String],
        default: u.gc("refresherFps", 40)
      },
      // 自定义下拉刷新允许触发的最大下拉角度，默认为40度，当下拉角度小于设定值时，自定义下拉刷新动画不会被触发
      refresherMaxAngle: {
        type: [Number, String],
        default: u.gc("refresherMaxAngle", 40)
      },
      // 自定义下拉刷新的角度由未达到最大角度变到达到最大角度时，是否继续下拉刷新手势，默认为否
      refresherAngleEnableChangeContinued: {
        type: Boolean,
        default: u.gc("refresherAngleEnableChangeContinued", false)
      },
      // 自定义下拉刷新默认状态下的文字
      refresherDefaultText: {
        type: [String, Object],
        default: u.gc("refresherDefaultText", null)
      },
      // 自定义下拉刷新松手立即刷新状态下的文字
      refresherPullingText: {
        type: [String, Object],
        default: u.gc("refresherPullingText", null)
      },
      // 自定义下拉刷新刷新中状态下的文字
      refresherRefreshingText: {
        type: [String, Object],
        default: u.gc("refresherRefreshingText", null)
      },
      // 自定义下拉刷新刷新结束状态下的文字
      refresherCompleteText: {
        type: [String, Object],
        default: u.gc("refresherCompleteText", null)
      },
      // 自定义继续下拉进入二楼文字
      refresherGoF2Text: {
        type: [String, Object],
        default: u.gc("refresherGoF2Text", null)
      },
      // 自定义下拉刷新默认状态下的图片
      refresherDefaultImg: {
        type: String,
        default: u.gc("refresherDefaultImg", null)
      },
      // 自定义下拉刷新松手立即刷新状态下的图片，默认与refresherDefaultImg一致
      refresherPullingImg: {
        type: String,
        default: u.gc("refresherPullingImg", null)
      },
      // 自定义下拉刷新刷新中状态下的图片
      refresherRefreshingImg: {
        type: String,
        default: u.gc("refresherRefreshingImg", null)
      },
      // 自定义下拉刷新刷新结束状态下的图片
      refresherCompleteImg: {
        type: String,
        default: u.gc("refresherCompleteImg", null)
      },
      // 自定义下拉刷新刷新中状态下是否展示旋转动画
      refresherRefreshingAnimated: {
        type: Boolean,
        default: u.gc("refresherRefreshingAnimated", true)
      },
      // 是否开启自定义下拉刷新刷新结束回弹效果，默认为是
      refresherEndBounceEnabled: {
        type: Boolean,
        default: u.gc("refresherEndBounceEnabled", true)
      },
      // 是否开启自定义下拉刷新，默认为是
      refresherEnabled: {
        type: Boolean,
        default: u.gc("refresherEnabled", true)
      },
      // 设置自定义下拉刷新阈值，默认为80rpx
      refresherThreshold: {
        type: [Number, String],
        default: u.gc("refresherThreshold", "80rpx")
      },
      // 设置系统下拉刷新默认样式，支持设置 black，white，none，none 表示不使用默认样式，默认为black
      refresherDefaultStyle: {
        type: String,
        default: u.gc("refresherDefaultStyle", "black")
      },
      // 设置自定义下拉刷新区域背景
      refresherBackground: {
        type: String,
        default: u.gc("refresherBackground", "transparent")
      },
      // 设置固定的自定义下拉刷新区域背景
      refresherFixedBackground: {
        type: String,
        default: u.gc("refresherFixedBackground", "transparent")
      },
      // 设置固定的自定义下拉刷新区域高度，默认为0
      refresherFixedBacHeight: {
        type: [Number, String],
        default: u.gc("refresherFixedBacHeight", 0)
      },
      // 设置自定义下拉刷新下拉超出阈值后继续下拉位移衰减的比例，范围0-1，值越大代表衰减越多。默认为0.65(nvue无效)
      refresherOutRate: {
        type: Number,
        default: u.gc("refresherOutRate", 0.65)
      },
      // 是否开启下拉进入二楼功能，默认为否
      refresherF2Enabled: {
        type: Boolean,
        default: u.gc("refresherF2Enabled", false)
      },
      // 下拉进入二楼阈值，默认为200rpx
      refresherF2Threshold: {
        type: [Number, String],
        default: u.gc("refresherF2Threshold", "200rpx")
      },
      // 下拉进入二楼动画时间，单位为毫秒，默认为200毫秒
      refresherF2Duration: {
        type: [Number, String],
        default: u.gc("refresherF2Duration", 200)
      },
      // 下拉进入二楼状态松手后是否弹出二楼，默认为是
      showRefresherF2: {
        type: Boolean,
        default: u.gc("showRefresherF2", true)
      },
      // 设置自定义下拉刷新下拉时实际下拉位移与用户下拉距离的比值，默认为0.75，即代表若用户下拉10px，则实际位移为7.5px(nvue无效)
      refresherPullRate: {
        type: Number,
        default: u.gc("refresherPullRate", 0.75)
      },
      // 是否显示最后更新时间，默认为否
      showRefresherUpdateTime: {
        type: Boolean,
        default: u.gc("showRefresherUpdateTime", false)
      },
      // 如果需要区别不同页面的最后更新时间，请为不同页面的z-paging的`refresher-update-time-key`设置不同的字符串
      refresherUpdateTimeKey: {
        type: String,
        default: u.gc("refresherUpdateTimeKey", "default")
      },
      // 下拉刷新时下拉到“松手立即刷新”或“松手进入二楼”状态时是否使手机短振动，默认为否（h5无效）
      refresherVibrate: {
        type: Boolean,
        default: u.gc("refresherVibrate", false)
      },
      // 下拉刷新时是否禁止下拉刷新view跟随用户触摸竖直移动，默认为否。注意此属性只是禁止下拉刷新view移动，其他下拉刷新逻辑依然会正常触发
      refresherNoTransform: {
        type: Boolean,
        default: u.gc("refresherNoTransform", false)
      },
      // 是否开启下拉刷新状态栏占位，适用于隐藏导航栏时，下拉刷新需要避开状态栏高度的情况，默认为否
      useRefresherStatusBarPlaceholder: {
        type: Boolean,
        default: u.gc("useRefresherStatusBarPlaceholder", false)
      }
    },
    data() {
      return {
        R: Enum.Refresher,
        //下拉刷新状态
        refresherStatus: Enum.Refresher.Default,
        refresherTouchstartY: 0,
        lastRefresherTouchmove: null,
        refresherReachMaxAngle: true,
        refresherTransform: "translateY(0px)",
        refresherTransition: "",
        finalRefresherDefaultStyle: "black",
        refresherRevealStackCount: 0,
        refresherCompleteTimeout: null,
        refresherCompleteSubTimeout: null,
        refresherEndTimeout: null,
        isTouchmovingTimeout: null,
        refresherTriggered: false,
        isTouchmoving: false,
        isTouchEnded: false,
        isUserPullDown: false,
        privateRefresherEnabled: -1,
        privateShowRefresherWhenReload: false,
        customRefresherHeight: -1,
        showCustomRefresher: false,
        doRefreshAnimateAfter: false,
        isRefresherInComplete: false,
        showF2: false,
        f2Transform: "",
        pullDownTimeStamp: 0,
        moveDis: 0,
        oldMoveDis: 0,
        currentDis: 0,
        oldCurrentMoveDis: 0,
        oldRefresherTouchmoveY: 0,
        oldTouchDirection: "",
        oldEmitedTouchDirection: "",
        oldPullingDistance: -1,
        refresherThresholdUpdateTag: 0
      };
    },
    watch: {
      refresherDefaultStyle: {
        handler(newVal) {
          if (newVal.length) {
            this.finalRefresherDefaultStyle = newVal;
          }
        },
        immediate: true
      },
      refresherStatus(newVal) {
        newVal === Enum.Refresher.Loading && this._cleanRefresherEndTimeout();
        this.refresherVibrate && (newVal === Enum.Refresher.ReleaseToRefresh || newVal === Enum.Refresher.GoF2) && this._doVibrateShort();
        this.$emit("refresherStatusChange", newVal);
        this.$emit("update:refresherStatus", newVal);
      },
      // 监听当前下拉刷新启用/禁用状态
      refresherEnabled(newVal) {
        !newVal && this.endRefresh();
      }
    },
    computed: {
      pullDownDisTimeStamp() {
        return 1e3 / this.refresherFps;
      },
      refresherThresholdUnitConverted() {
        return u.addUnit(this.refresherThreshold, this.unit);
      },
      finalRefresherEnabled() {
        if (this.layoutOnly || this.useChatRecordMode)
          return false;
        if (this.privateRefresherEnabled === -1)
          return this.refresherEnabled;
        return this.privateRefresherEnabled === 1;
      },
      finalRefresherThreshold() {
        let refresherThreshold = this.refresherThresholdUnitConverted;
        let idDefault = false;
        if (refresherThreshold === u.addUnit(80, this.unit)) {
          idDefault = true;
          if (this.showRefresherUpdateTime) {
            refresherThreshold = u.addUnit(120, this.unit);
          }
        }
        if (idDefault && this.customRefresherHeight > 0)
          return this.customRefresherHeight + this.finalRefresherThresholdPlaceholder;
        return u.convertToPx(refresherThreshold) + this.finalRefresherThresholdPlaceholder;
      },
      finalRefresherF2Threshold() {
        return u.convertToPx(u.addUnit(this.refresherF2Threshold, this.unit));
      },
      finalRefresherThresholdPlaceholder() {
        return this.useRefresherStatusBarPlaceholder ? this.statusBarHeight : 0;
      },
      finalRefresherFixedBacHeight() {
        return u.convertToPx(this.refresherFixedBacHeight);
      },
      finalRefresherThemeStyle() {
        return this.refresherThemeStyle.length ? this.refresherThemeStyle : this.defaultThemeStyle;
      },
      finalRefresherOutRate() {
        let rate = this.refresherOutRate;
        rate = Math.max(0, rate);
        rate = Math.min(1, rate);
        return rate;
      },
      finalRefresherPullRate() {
        let rate = this.refresherPullRate;
        rate = Math.max(0, rate);
        return rate;
      },
      finalRefresherTransform() {
        if (this.refresherNoTransform || this.refresherTransform === "translateY(0px)")
          return "none";
        return this.refresherTransform;
      },
      finalShowRefresherWhenReload() {
        return this.showRefresherWhenReload || this.privateShowRefresherWhenReload;
      },
      finalRefresherTriggered() {
        if (!(this.finalRefresherEnabled && !this.useCustomRefresher))
          return false;
        return this.refresherTriggered;
      },
      showRefresher() {
        const showRefresher = this.finalRefresherEnabled || this.useCustomRefresher && !this.useChatRecordMode;
        this.active && this.customRefresherHeight === -1 && showRefresher && this.updateCustomRefresherHeight();
        return showRefresher;
      },
      hasTouchmove() {
        return this.watchRefresherTouchmove;
      }
    },
    methods: {
      // 终止下拉刷新状态
      endRefresh() {
        this.totalData = this.realTotalData;
        this._refresherEnd();
        this._endSystemLoadingAndRefresh();
        this._handleScrollViewBounce({ bounce: true });
        this.$nextTick(() => {
          this.refresherTriggered = false;
        });
      },
      // 手动更新自定义下拉刷新view高度
      updateCustomRefresherHeight() {
        u.delay(() => this.$nextTick(this._updateCustomRefresherHeight));
      },
      // 进入二楼
      goF2() {
        this._handleGoF2();
      },
      // 关闭二楼
      closeF2() {
        this._handleCloseF2();
      },
      // 自定义下拉刷新被触发
      _onRefresh(fromScrollView = false, isUserPullDown = true) {
        if (fromScrollView && !(this.finalRefresherEnabled && !this.useCustomRefresher))
          return;
        this.$emit("onRefresh");
        this.$emit("Refresh");
        if (this.loading || this.isRefresherInComplete)
          return;
        this.loadingType = Enum.LoadingType.Refresher;
        if (this.nShowRefresherReveal)
          return;
        this.isUserPullDown = isUserPullDown;
        this.isUserReload = !isUserPullDown;
        this._startLoading(true);
        this.refresherTriggered = true;
        if (this.reloadWhenRefresh && isUserPullDown) {
          this.useChatRecordMode ? this._onLoadingMore("click") : this._reload(false, false, isUserPullDown);
        }
      },
      // 自定义下拉刷新被复位
      _onRestore() {
        this.refresherTriggered = "restore";
        this.$emit("onRestore");
        this.$emit("Restore");
      },
      // 进一步处理touch开始结果
      _handleRefresherTouchstart(touch) {
        if (!this.loading && this.isTouchEnded) {
          this.isTouchmoving = false;
        }
        this.loadingType = Enum.LoadingType.Refresher;
        this.isTouchmovingTimeout && clearTimeout(this.isTouchmovingTimeout);
        this.isTouchEnded = false;
        this.refresherTransition = "";
        this.refresherTouchstartY = touch.touchY;
        this.$emit("refresherTouchstart", this.refresherTouchstartY);
        this.lastRefresherTouchmove = touch;
        this._cleanRefresherCompleteTimeout();
        this._cleanRefresherEndTimeout();
      },
      // 非app-vue或微信小程序或QQ小程序或h5平台，使用js控制下拉刷新
      // 进一步处理touch中结果
      _handleRefresherTouchmove(moveDis, touch) {
        this.refresherReachMaxAngle = true;
        this.isTouchmovingTimeout && clearTimeout(this.isTouchmovingTimeout);
        this.isTouchmoving = true;
        this.isTouchEnded = false;
        if (moveDis >= this.finalRefresherThreshold) {
          this.refresherStatus = this.refresherF2Enabled && moveDis >= this.finalRefresherF2Threshold ? Enum.Refresher.GoF2 : Enum.Refresher.ReleaseToRefresh;
        } else {
          this.refresherStatus = Enum.Refresher.Default;
        }
        this.moveDis = moveDis;
      },
      // 进一步处理touch结束结果
      _handleRefresherTouchend(moveDis) {
        this.isTouchmovingTimeout && clearTimeout(this.isTouchmovingTimeout);
        this.refresherReachMaxAngle = true;
        this.isTouchEnded = true;
        const refresherThreshold = this.finalRefresherThreshold;
        if (moveDis >= refresherThreshold && [Enum.Refresher.ReleaseToRefresh, Enum.Refresher.GoF2].indexOf(this.refresherStatus) >= 0) {
          if (this.refresherStatus === Enum.Refresher.GoF2) {
            this._handleGoF2();
            this._refresherEnd();
          } else {
            u.delay(() => {
              this._emitTouchmove({ pullingDistance: refresherThreshold, dy: this.moveDis - refresherThreshold });
            }, 0.1);
            this.moveDis = refresherThreshold;
            this.refresherStatus = Enum.Refresher.Loading;
            this._doRefresherLoad();
          }
        } else {
          this._refresherEnd();
          this.isTouchmovingTimeout = u.delay(() => {
            this.isTouchmoving = false;
          }, this.refresherDefaultDuration);
        }
        this.scrollEnable = true;
        this.$emit("refresherTouchend", moveDis);
      },
      // 处理列表触摸开始事件
      _handleListTouchstart() {
        if (this.useChatRecordMode && this.autoHideKeyboardWhenChat) {
          uni.hideKeyboard();
          this.$emit("hidedKeyboard");
        }
      },
      // 处理scroll-view bounce是否生效
      _handleScrollViewBounce({ bounce }) {
        if (!this.usePageScroll && !this.scrollToTopBounceEnabled) {
          if (this.wxsScrollTop <= 5) {
            this.refresherTransition = "";
            this.scrollEnable = bounce;
          } else if (bounce) {
            this.scrollEnable = bounce;
          }
        }
      },
      // wxs正在下拉状态改变处理
      _handleWxsPullingDownStatusChange(onPullingDown) {
        this.wxsOnPullingDown = onPullingDown;
        if (onPullingDown && !this.useChatRecordMode) {
          this.renderPropScrollTop = 0;
        }
      },
      // wxs正在下拉处理
      _handleWxsPullingDown({ moveDis, diffDis }) {
        this._emitTouchmove({ pullingDistance: moveDis, dy: diffDis });
      },
      // wxs触摸方向改变
      _handleTouchDirectionChange({ direction }) {
        this.$emit("touchDirectionChange", direction);
      },
      // wxs通知更新其props
      _handlePropUpdate() {
        this.wxsPropType = u.getTime().toString();
      },
      // 下拉刷新结束
      _refresherEnd(shouldEndLoadingDelay = true, fromAddData = false, isUserPullDown = false, setLoading = true) {
        if (this.loadingType === Enum.LoadingType.Refresher) {
          const refresherCompleteDelay = fromAddData && (isUserPullDown || this.finalShowRefresherWhenReload) ? this.refresherCompleteDelay : 0;
          const refresherStatus = refresherCompleteDelay > 0 ? Enum.Refresher.Complete : Enum.Refresher.Default;
          if (this.finalShowRefresherWhenReload) {
            const stackCount = this.refresherRevealStackCount;
            this.refresherRevealStackCount--;
            if (stackCount > 1)
              return;
          }
          this._cleanRefresherEndTimeout();
          this.refresherEndTimeout = u.delay(() => {
            this.refresherStatus = refresherStatus;
            if (refresherStatus !== Enum.Refresher.Complete) {
              this.isRefresherInComplete = false;
            }
          }, this.refresherStatus !== Enum.Refresher.Default && refresherStatus === Enum.Refresher.Default ? this.refresherCompleteDuration : 0);
          if (refresherCompleteDelay > 0) {
            this.isRefresherInComplete = true;
          }
          this._cleanRefresherCompleteTimeout();
          this.refresherCompleteTimeout = u.delay(() => {
            let animateDuration = 1;
            const animateType = this.refresherEndBounceEnabled && fromAddData ? "cubic-bezier(0.19,1.64,0.42,0.72)" : "linear";
            if (fromAddData) {
              animateDuration = this.refresherEndBounceEnabled ? this.refresherCompleteDuration / 1e3 : this.refresherCompleteDuration / 3e3;
            }
            this.refresherTransition = `transform ${fromAddData ? animateDuration : this.refresherDefaultDuration / 1e3}s ${animateType}`;
            this.wxsPropType = this.refresherTransition + "end" + u.getTime();
            this.moveDis = 0;
            if (refresherStatus === Enum.Refresher.Complete) {
              if (this.refresherCompleteSubTimeout) {
                clearTimeout(this.refresherCompleteSubTimeout);
                this.refresherCompleteSubTimeout = null;
              }
              this.refresherCompleteSubTimeout = u.delay(() => {
                this.$nextTick(() => {
                  this.refresherStatus = Enum.Refresher.Default;
                  this.isRefresherInComplete = false;
                });
              }, animateDuration * 800);
            }
            this._emitTouchmove({ pullingDistance: 0, dy: this.moveDis });
          }, refresherCompleteDelay);
        }
        if (setLoading) {
          u.delay(() => this.loading = false, shouldEndLoadingDelay ? 10 : 0);
          isUserPullDown && this._onRestore();
        }
      },
      // 处理进入二楼
      _handleGoF2() {
        if (this.showF2 || !this.refresherF2Enabled)
          return;
        this.$emit("refresherF2Change", "go");
        if (!this.showRefresherF2)
          return;
        this.f2Transform = `translateY(${-this.superContentHeight}px)`;
        this.showF2 = true;
        u.delay(() => {
          this.f2Transform = "translateY(0px)";
        }, 100, "f2ShowDelay");
      },
      // 处理退出二楼
      _handleCloseF2() {
        if (!this.showF2 || !this.refresherF2Enabled)
          return;
        this.$emit("refresherF2Change", "close");
        if (!this.showRefresherF2)
          return;
        this.f2Transform = `translateY(${-this.superContentHeight}px)`;
        u.delay(() => {
          this.showF2 = false;
          this.nF2Opacity = 0;
        }, this.refresherF2Duration, "f2CloseDelay");
      },
      // 模拟用户手动触发下拉刷新
      _doRefresherRefreshAnimate() {
        this._cleanRefresherCompleteTimeout();
        const doRefreshAnimateAfter = !this.doRefreshAnimateAfter && this.finalShowRefresherWhenReload && this.customRefresherHeight === -1 && this.refresherThreshold === u.addUnit(80, this.unit);
        if (doRefreshAnimateAfter) {
          this.doRefreshAnimateAfter = true;
          return;
        }
        this.refresherRevealStackCount++;
        this.wxsPropType = "begin" + u.getTime();
        this.moveDis = this.finalRefresherThreshold;
        this.refresherStatus = Enum.Refresher.Loading;
        this.isTouchmoving = true;
        this.isTouchmovingTimeout && clearTimeout(this.isTouchmovingTimeout);
        this._doRefresherLoad(false);
      },
      // 触发下拉刷新
      _doRefresherLoad(isUserPullDown = true) {
        this._onRefresh(false, isUserPullDown);
        this.loading = true;
      },
      // 更新自定义下拉刷新view高度
      _updateCustomRefresherHeight() {
        this._getNodeClientRect(".zp-custom-refresher-slot-view").then((res) => {
          this.customRefresherHeight = res ? res[0].height : 0;
          this.showCustomRefresher = this.customRefresherHeight > 0;
          if (this.doRefreshAnimateAfter) {
            this.doRefreshAnimateAfter = false;
            this._doRefresherRefreshAnimate();
          }
        });
      },
      // emit pullingDown事件
      _emitTouchmove(e) {
        e.viewHeight = this.finalRefresherThreshold;
        e.rate = e.viewHeight > 0 ? e.pullingDistance / e.viewHeight : 0;
        this.hasTouchmove && this.oldPullingDistance !== e.pullingDistance && this.$emit("refresherTouchmove", e);
        this.oldPullingDistance = e.pullingDistance;
      },
      // 清除refresherCompleteTimeout
      _cleanRefresherCompleteTimeout() {
        this.refresherCompleteTimeout = this._cleanTimeout(this.refresherCompleteTimeout);
      },
      // 清除refresherEndTimeout
      _cleanRefresherEndTimeout() {
        this.refresherEndTimeout = this._cleanTimeout(this.refresherEndTimeout);
      }
    }
  };
  const loadMoreModule = {
    props: {
      // 自定义底部加载更多样式
      loadingMoreCustomStyle: {
        type: Object,
        default: u.gc("loadingMoreCustomStyle", {})
      },
      // 自定义底部加载更多文字样式
      loadingMoreTitleCustomStyle: {
        type: Object,
        default: u.gc("loadingMoreTitleCustomStyle", {})
      },
      // 自定义底部加载更多加载中动画样式
      loadingMoreLoadingIconCustomStyle: {
        type: Object,
        default: u.gc("loadingMoreLoadingIconCustomStyle", {})
      },
      // 自定义底部加载更多加载中动画图标类型，可选flower或circle，默认为flower
      loadingMoreLoadingIconType: {
        type: String,
        default: u.gc("loadingMoreLoadingIconType", "flower")
      },
      // 自定义底部加载更多加载中动画图标图片
      loadingMoreLoadingIconCustomImage: {
        type: String,
        default: u.gc("loadingMoreLoadingIconCustomImage", "")
      },
      // 底部加载更多加载中view是否展示旋转动画，默认为是
      loadingMoreLoadingAnimated: {
        type: Boolean,
        default: u.gc("loadingMoreLoadingAnimated", true)
      },
      // 是否启用加载更多数据(含滑动到底部加载更多数据和点击加载更多数据)，默认为是
      loadingMoreEnabled: {
        type: Boolean,
        default: u.gc("loadingMoreEnabled", true)
      },
      // 是否启用滑动到底部加载更多数据，默认为是
      toBottomLoadingMoreEnabled: {
        type: Boolean,
        default: u.gc("toBottomLoadingMoreEnabled", true)
      },
      // 滑动到底部状态为默认状态时，以加载中的状态展示，默认为否。若设置为是，可避免滚动到底部看到默认状态然后立刻变为加载中状态的问题，但分页数量未超过一屏时，不会显示【点击加载更多】
      loadingMoreDefaultAsLoading: {
        type: Boolean,
        default: u.gc("loadingMoreDefaultAsLoading", false)
      },
      // 滑动到底部"默认"文字，默认为【点击加载更多】
      loadingMoreDefaultText: {
        type: [String, Object],
        default: u.gc("loadingMoreDefaultText", null)
      },
      // 滑动到底部"加载中"文字，默认为【正在加载...】
      loadingMoreLoadingText: {
        type: [String, Object],
        default: u.gc("loadingMoreLoadingText", null)
      },
      // 滑动到底部"没有更多"文字，默认为【没有更多了】
      loadingMoreNoMoreText: {
        type: [String, Object],
        default: u.gc("loadingMoreNoMoreText", null)
      },
      // 滑动到底部"加载失败"文字，默认为【加载失败，点击重新加载】
      loadingMoreFailText: {
        type: [String, Object],
        default: u.gc("loadingMoreFailText", null)
      },
      // 当没有更多数据且分页内容未超出z-paging时是否隐藏没有更多数据的view，默认为否
      hideNoMoreInside: {
        type: Boolean,
        default: u.gc("hideNoMoreInside", false)
      },
      // 当没有更多数据且分页数组长度少于这个值时，隐藏没有更多数据的view，默认为0，代表不限制。
      hideNoMoreByLimit: {
        type: Number,
        default: u.gc("hideNoMoreByLimit", 0)
      },
      // 是否显示默认的加载更多text，默认为是
      showDefaultLoadingMoreText: {
        type: Boolean,
        default: u.gc("showDefaultLoadingMoreText", true)
      },
      // 是否显示没有更多数据的view
      showLoadingMoreNoMoreView: {
        type: Boolean,
        default: u.gc("showLoadingMoreNoMoreView", true)
      },
      // 是否显示没有更多数据的分割线，默认为是
      showLoadingMoreNoMoreLine: {
        type: Boolean,
        default: u.gc("showLoadingMoreNoMoreLine", true)
      },
      // 自定义底部没有更多数据的分割线样式
      loadingMoreNoMoreLineCustomStyle: {
        type: Object,
        default: u.gc("loadingMoreNoMoreLineCustomStyle", {})
      },
      // 当分页未满一屏时，是否自动加载更多，默认为否(nvue无效)
      insideMore: {
        type: Boolean,
        default: u.gc("insideMore", false)
      },
      // 距底部/右边多远时（单位px），触发 scrolltolower 事件，默认为100rpx
      lowerThreshold: {
        type: [Number, String],
        default: u.gc("lowerThreshold", "100rpx")
      }
    },
    data() {
      return {
        M: Enum.More,
        // 底部加载更多状态
        loadingStatus: Enum.More.Default,
        // 在渲染之后的底部加载更多状态
        loadingStatusAfterRender: Enum.More.Default,
        // 底部加载更多时间戳
        loadingMoreTimeStamp: 0,
        // 底部加载更多slot
        loadingMoreDefaultSlot: null,
        // 是否展示底部加载更多
        showLoadingMore: false,
        // 是否是开发者自定义的加载更多，-1代表交由z-paging自行判断；1代表没有更多了；0代表还有更多数据
        customNoMore: -1
      };
    },
    computed: {
      // 底部加载更多配置
      zLoadMoreConfig() {
        return {
          status: this.loadingStatusAfterRender,
          defaultAsLoading: this.loadingMoreDefaultAsLoading || this.useChatRecordMode && this.chatLoadingMoreDefaultAsLoading,
          defaultThemeStyle: this.finalLoadingMoreThemeStyle,
          customStyle: this.loadingMoreCustomStyle,
          titleCustomStyle: this.loadingMoreTitleCustomStyle,
          iconCustomStyle: this.loadingMoreLoadingIconCustomStyle,
          loadingIconType: this.loadingMoreLoadingIconType,
          loadingIconCustomImage: this.loadingMoreLoadingIconCustomImage,
          loadingAnimated: this.loadingMoreLoadingAnimated,
          showNoMoreLine: this.showLoadingMoreNoMoreLine,
          noMoreLineCustomStyle: this.loadingMoreNoMoreLineCustomStyle,
          defaultText: this.finalLoadingMoreDefaultText,
          loadingText: this.finalLoadingMoreLoadingText,
          noMoreText: this.finalLoadingMoreNoMoreText,
          failText: this.finalLoadingMoreFailText,
          hideContent: !this.loadingMoreDefaultAsLoading && this.listRendering,
          unit: this.unit,
          isChat: this.useChatRecordMode,
          chatDefaultAsLoading: this.chatLoadingMoreDefaultAsLoading
        };
      },
      // 最终的底部加载更多主题
      finalLoadingMoreThemeStyle() {
        return this.loadingMoreThemeStyle.length ? this.loadingMoreThemeStyle : this.defaultThemeStyle;
      },
      // 最终的底部加载更多触发阈值
      finalLowerThreshold() {
        return u.convertToPx(this.lowerThreshold);
      },
      // 是否显示默认状态下的底部加载更多
      showLoadingMoreDefault() {
        return this._showLoadingMore("Default");
      },
      // 是否显示加载中状态下的底部加载更多
      showLoadingMoreLoading() {
        return this._showLoadingMore("Loading");
      },
      // 是否显示没有更多了状态下的底部加载更多
      showLoadingMoreNoMore() {
        return this._showLoadingMore("NoMore");
      },
      // 是否显示加载失败状态下的底部加载更多
      showLoadingMoreFail() {
        return this._showLoadingMore("Fail");
      },
      // 是否显示自定义状态下的底部加载更多
      showLoadingMoreCustom() {
        return this._showLoadingMore("Custom");
      },
      // 底部加载更多固定高度
      loadingMoreFixedHeight() {
        return u.addUnit("80rpx", this.unit);
      }
    },
    methods: {
      // 页面滚动到底部时通知z-paging进行进一步处理
      pageReachBottom() {
        !this.useChatRecordMode && this.toBottomLoadingMoreEnabled && this._onLoadingMore("toBottom");
      },
      // 手动触发上拉加载更多(非必须，可依据具体需求使用)
      doLoadMore(type) {
        this._onLoadingMore(type);
      },
      // 通过@scroll事件检测是否滚动到了底部(顺带检测下是否滚动到了顶部)
      _checkScrolledToBottom(scrollDiff, checked = false) {
        if (this.cacheScrollNodeHeight === -1) {
          this._getNodeClientRect(".zp-scroll-view").then((res) => {
            if (res) {
              const scrollNodeHeight = res[0].height;
              this.cacheScrollNodeHeight = scrollNodeHeight;
              if (scrollDiff - scrollNodeHeight <= this.finalLowerThreshold) {
                this._onLoadingMore("toBottom");
              }
            }
          });
        } else {
          if (scrollDiff - this.cacheScrollNodeHeight <= this.finalLowerThreshold) {
            this._onLoadingMore("toBottom");
          } else if (scrollDiff - this.cacheScrollNodeHeight <= 500 && !checked) {
            u.delay(() => {
              this._getNodeClientRect(".zp-scroll-view", true, true).then((res) => {
                if (res) {
                  this.oldScrollTop = res[0].scrollTop;
                  const newScrollDiff = res[0].scrollHeight - this.oldScrollTop;
                  this._checkScrolledToBottom(newScrollDiff, true);
                }
              });
            }, 150, "checkScrolledToBottomDelay");
          }
          if (this.oldScrollTop <= 150 && this.oldScrollTop !== 0) {
            u.delay(() => {
              if (this.oldScrollTop !== 0) {
                this._getNodeClientRect(".zp-scroll-view", true, true).then((res) => {
                  if (res && res[0].scrollTop === 0 && this.oldScrollTop !== 0) {
                    this._onScrollToUpper();
                  }
                });
              }
            }, 150, "checkScrolledToTopDelay");
          }
        }
      },
      // 触发加载更多时调用,from:toBottom-滑动到底部触发；click-点击加载更多触发
      _onLoadingMore(from = "click") {
        if (this.isIos && from === "toBottom" && !this.scrollToBottomBounceEnabled && this.scrollEnable) {
          this.scrollEnable = false;
          this.$nextTick(() => {
            this.scrollEnable = true;
          });
        }
        this._emitScrollEvent("scrolltolower");
        if (this.isOnly || !this.loadingMoreEnabled || !(this.loadingStatus === Enum.More.Default || this.loadingStatus === Enum.More.Fail) || this.loading || this.showEmpty)
          return;
        this._doLoadingMore();
      },
      // 处理开始加载更多
      _doLoadingMore() {
        if (this.pageNo >= this.defaultPageNo && this.loadingStatus !== Enum.More.NoMore) {
          this.pageNo++;
          this._startLoading(false);
          if (this.isLocalPaging) {
            this._localPagingQueryList(this.pageNo, this.defaultPageSize, this.localPagingLoadingTime, (res) => {
              this.completeByTotal(res, this.totalLocalPagingList.length);
              this.queryFrom = Enum.QueryFrom.LoadMore;
            });
          } else {
            this._emitQuery(this.pageNo, this.defaultPageSize, Enum.QueryFrom.LoadMore);
            this._callMyParentQuery();
          }
          this.loadingType = Enum.LoadingType.LoadMore;
        }
      },
      // (预处理)判断当没有更多数据且分页内容未超出z-paging时是否显示没有更多数据的view
      _preCheckShowNoMoreInside(newVal, scrollViewNode, pagingContainerNode) {
        if (this.loadingStatus === Enum.More.NoMore && this.hideNoMoreByLimit > 0 && newVal.length) {
          this.showLoadingMore = newVal.length > this.hideNoMoreByLimit;
        } else if (this.loadingStatus === Enum.More.NoMore && this.hideNoMoreInside && newVal.length || this.insideMore && this.insideOfPaging !== false && newVal.length) {
          this.$nextTick(() => {
            this._checkShowNoMoreInside(newVal, scrollViewNode, pagingContainerNode);
          });
          if (this.insideMore && this.insideOfPaging !== false && newVal.length) {
            this.showLoadingMore = newVal.length;
          }
        } else {
          this.showLoadingMore = newVal.length;
        }
      },
      // 判断当没有更多数据且分页内容未超出z-paging时是否显示没有更多数据的view
      async _checkShowNoMoreInside(totalData, oldScrollViewNode, oldPagingContainerNode) {
        try {
          const scrollViewNode = oldScrollViewNode || await this._getNodeClientRect(".zp-scroll-view");
          if (this.usePageScroll) {
            if (scrollViewNode) {
              const scrollViewTotalH = scrollViewNode[0].top + scrollViewNode[0].height;
              this.insideOfPaging = scrollViewTotalH < this.windowHeight;
              if (this.hideNoMoreInside) {
                this.showLoadingMore = !this.insideOfPaging;
              }
              this._updateInsideOfPaging();
            }
          } else {
            const pagingContainerNode = oldPagingContainerNode || await this._getNodeClientRect(".zp-paging-container-content");
            const pagingContainerH = pagingContainerNode ? pagingContainerNode[0].height : 0;
            const scrollViewH = scrollViewNode ? scrollViewNode[0].height : 0;
            this.insideOfPaging = pagingContainerH < scrollViewH;
            if (this.hideNoMoreInside) {
              this.showLoadingMore = !this.insideOfPaging;
            }
            this._updateInsideOfPaging();
          }
        } catch (e) {
          this.insideOfPaging = !totalData.length;
          if (this.hideNoMoreInside) {
            this.showLoadingMore = !this.insideOfPaging;
          }
          this._updateInsideOfPaging();
        }
      },
      // 是否要展示上拉加载更多view
      _showLoadingMore(type) {
        if (!this.showLoadingMoreWhenReload && (!(this.loadingStatus === Enum.More.Default ? this.nShowBottom : true) || !this.realTotalData.length))
          return false;
        if ((!this.showLoadingMoreWhenReload || this.isUserPullDown || this.loadingStatus !== Enum.More.Loading) && !this.showLoadingMore || !this.loadingMoreEnabled && (!this.showLoadingMoreWhenReload || this.isUserPullDown || this.loadingStatus !== Enum.More.Loading) || this.isOnly) {
          return false;
        }
        if (this.useChatRecordMode && type !== "Loading")
          return false;
        if (!this.zSlots)
          return false;
        if (type === "Custom") {
          return this.showDefaultLoadingMoreText && !(this.loadingStatus === Enum.More.NoMore && !this.showLoadingMoreNoMoreView);
        }
        const res = this.loadingStatus === Enum.More[type] && this.zSlots[`loadingMore${type}`] && (type === "NoMore" ? this.showLoadingMoreNoMoreView : true);
        return res;
      }
    }
  };
  const loadingModule = {
    props: {
      // 第一次加载后自动隐藏loading slot，默认为是
      autoHideLoadingAfterFirstLoaded: {
        type: Boolean,
        default: u.gc("autoHideLoadingAfterFirstLoaded", true)
      },
      // loading slot是否铺满屏幕并固定，默认为否
      loadingFullFixed: {
        type: Boolean,
        default: u.gc("loadingFullFixed", false)
      },
      // 是否自动显示系统Loading：即uni.showLoading，若开启则将在刷新列表时(调用reload、refresh时)显示，下拉刷新和滚动到底部加载更多不会显示，默认为false。
      autoShowSystemLoading: {
        type: Boolean,
        default: u.gc("autoShowSystemLoading", false)
      },
      // 显示系统Loading时是否显示透明蒙层，防止触摸穿透，默认为是(H5、App、微信小程序、百度小程序有效)
      systemLoadingMask: {
        type: Boolean,
        default: u.gc("systemLoadingMask", true)
      },
      // 显示系统Loading时显示的文字，默认为"加载中"
      systemLoadingText: {
        type: [String, Object],
        default: u.gc("systemLoadingText", null)
      }
    },
    data() {
      return {
        loading: false,
        loadingForNow: false
      };
    },
    watch: {
      // loading状态
      loadingStatus(newVal) {
        this.$emit("loadingStatusChange", newVal);
        this.$nextTick(() => {
          this.loadingStatusAfterRender = newVal;
        });
        if (this.useChatRecordMode) {
          if (this.isFirstPage && (newVal === Enum.More.NoMore || newVal === Enum.More.Fail)) {
            this.isFirstPageAndNoMore = true;
            return;
          }
        }
        this.isFirstPageAndNoMore = false;
      },
      loading(newVal) {
        if (newVal) {
          this.loadingForNow = newVal;
        }
      }
    },
    computed: {
      // 是否显示loading
      showLoading() {
        if (this.firstPageLoaded || !this.loading || !this.loadingForNow)
          return false;
        if (this.finalShowSystemLoading) {
          uni.showLoading({
            title: this.finalSystemLoadingText,
            mask: this.systemLoadingMask
          });
        }
        return this.autoHideLoadingAfterFirstLoaded ? this.fromEmptyViewReload ? true : !this.pagingLoaded : this.loadingType === Enum.LoadingType.Refresher;
      },
      // 最终的是否显示系统loading
      finalShowSystemLoading() {
        return this.autoShowSystemLoading && this.loadingType === Enum.LoadingType.Refresher;
      }
    },
    methods: {
      // 处理开始加载更多状态
      _startLoading(isReload = false) {
        if (this.showLoadingMoreWhenReload && !this.isUserPullDown || !isReload) {
          this.loadingStatus = Enum.More.Loading;
        }
        this.loading = true;
      },
      // 停止系统loading和refresh
      _endSystemLoadingAndRefresh() {
        this.finalShowSystemLoading && uni.hideLoading();
        !this.useCustomRefresher && uni.stopPullDownRefresh();
      }
    }
  };
  const chatRecordModerModule = {
    props: {
      // 使用聊天记录模式，默认为否
      useChatRecordMode: {
        type: Boolean,
        default: u.gc("useChatRecordMode", false)
      },
      // 使用聊天记录模式时滚动到顶部后，列表垂直移动偏移距离。默认0rpx。单位px（暂时无效）
      chatRecordMoreOffset: {
        type: [Number, String],
        default: u.gc("chatRecordMoreOffset", "0rpx")
      },
      // 使用聊天记录模式时是否自动隐藏键盘：在用户触摸列表时候自动隐藏键盘，默认为是
      autoHideKeyboardWhenChat: {
        type: Boolean,
        default: u.gc("autoHideKeyboardWhenChat", true)
      },
      // 使用聊天记录模式中键盘弹出时是否自动调整slot="bottom"高度，默认为是
      autoAdjustPositionWhenChat: {
        type: Boolean,
        default: u.gc("autoAdjustPositionWhenChat", true)
      },
      // 使用聊天记录模式中键盘弹出时占位高度偏移距离。默认0rpx。单位px
      chatAdjustPositionOffset: {
        type: [Number, String],
        default: u.gc("chatAdjustPositionOffset", "0rpx")
      },
      // 使用聊天记录模式中键盘弹出时是否自动滚动到底部，默认为否
      autoToBottomWhenChat: {
        type: Boolean,
        default: u.gc("autoToBottomWhenChat", false)
      },
      // 使用聊天记录模式中reload时是否显示chatLoading，默认为否
      showChatLoadingWhenReload: {
        type: Boolean,
        default: u.gc("showChatLoadingWhenReload", false)
      },
      // 在聊天记录模式中滑动到顶部状态为默认状态时，以加载中的状态展示，默认为是。若设置为否，则默认会显示【点击加载更多】，然后才会显示loading
      chatLoadingMoreDefaultAsLoading: {
        type: Boolean,
        default: u.gc("chatLoadingMoreDefaultAsLoading", true)
      }
    },
    data() {
      return {
        // 键盘高度
        keyboardHeight: 0,
        // 键盘高度是否未改变，此时占位高度变化不需要动画效果
        isKeyboardHeightChanged: false
      };
    },
    computed: {
      finalChatRecordMoreOffset() {
        return u.convertToPx(this.chatRecordMoreOffset);
      },
      finalChatAdjustPositionOffset() {
        return u.convertToPx(this.chatAdjustPositionOffset);
      },
      // 聊天记录模式旋转180度style
      chatRecordRotateStyle() {
        let cellStyle;
        cellStyle = this.useChatRecordMode ? { transform: "scaleY(-1)" } : {};
        this.$emit("update:cellStyle", cellStyle);
        this.$emit("cellStyleChange", cellStyle);
        this.$nextTick(() => {
          if (this.isFirstPage && this.isChatRecordModeAndNotInversion) {
            this.$nextTick(() => {
              this._scrollToBottom(false);
              u.delay(() => {
                this._scrollToBottom(false);
                u.delay(() => {
                  this._scrollToBottom(false);
                }, 50);
              }, 50);
            });
          }
        });
        return cellStyle;
      },
      // 是否是聊天记录列表并且有配置transform
      isChatRecordModeHasTransform() {
        return this.useChatRecordMode && this.chatRecordRotateStyle && this.chatRecordRotateStyle.transform;
      },
      // 是否是聊天记录列表并且列表未倒置
      isChatRecordModeAndNotInversion() {
        return this.isChatRecordModeHasTransform && this.chatRecordRotateStyle.transform === "scaleY(1)";
      },
      // 是否是聊天记录列表并且列表倒置
      isChatRecordModeAndInversion() {
        return this.isChatRecordModeHasTransform && this.chatRecordRotateStyle.transform === "scaleY(-1)";
      },
      // 最终的聊天记录模式中底部安全区域的高度，如果开启了底部安全区域并且键盘未弹出，则添加底部区域高度
      chatRecordModeSafeAreaBottom() {
        return this.safeAreaInsetBottom && !this.keyboardHeight ? this.safeAreaBottom : 0;
      }
    },
    mounted() {
      this.addKeyboardHeightChangeListener();
    },
    methods: {
      // 添加聊天记录
      addChatRecordData(data, toBottom = true, toBottomWithAnimate = true) {
        if (!this.useChatRecordMode)
          return;
        this.isTotalChangeFromAddData = true;
        this.addDataFromTop(data, toBottom, toBottomWithAnimate);
      },
      // 手动触发滚动到顶部加载更多，聊天记录模式时有效
      doChatRecordLoadMore() {
        this.useChatRecordMode && this._onLoadingMore("click");
      },
      // 手动添加键盘高度变化监听
      addKeyboardHeightChangeListener() {
        if (this.useChatRecordMode) {
          uni.onKeyboardHeightChange(this._handleKeyboardHeightChange);
        }
      },
      // 处理键盘高度变化
      _handleKeyboardHeightChange(res) {
        this.$emit("keyboardHeightChange", res);
        if (this.autoAdjustPositionWhenChat) {
          this.isKeyboardHeightChanged = true;
          this.keyboardHeight = res.height > 0 ? res.height + this.finalChatAdjustPositionOffset : res.height;
        }
        if (this.autoToBottomWhenChat && this.keyboardHeight > 0) {
          u.delay(() => {
            this.scrollToBottom(false);
            u.delay(() => {
              this.scrollToBottom(false);
            });
          });
        }
      }
    }
  };
  const scrollerModule = {
    props: {
      // 使用页面滚动，默认为否，当设置为是时则使用页面的滚动而非此组件内部的scroll-view的滚动，使用页面滚动时z-paging无需设置确定的高度且对于长列表展示性能更高，但配置会略微繁琐
      usePageScroll: {
        type: Boolean,
        default: u.gc("usePageScroll", false)
      },
      // 是否可以滚动，使用内置scroll-view和nvue时有效，默认为是
      scrollable: {
        type: Boolean,
        default: u.gc("scrollable", true)
      },
      // 控制是否出现滚动条，默认为是
      showScrollbar: {
        type: Boolean,
        default: u.gc("showScrollbar", true)
      },
      // 是否允许横向滚动，默认为否
      scrollX: {
        type: Boolean,
        default: u.gc("scrollX", false)
      },
      // iOS设备上滚动到顶部时是否允许回弹效果，默认为否。关闭回弹效果后可使滚动到顶部与下拉刷新更连贯，但是有吸顶view时滚动到顶部时可能出现抖动。
      scrollToTopBounceEnabled: {
        type: Boolean,
        default: u.gc("scrollToTopBounceEnabled", false)
      },
      // iOS设备上滚动到底部时是否允许回弹效果，默认为是。
      scrollToBottomBounceEnabled: {
        type: Boolean,
        default: u.gc("scrollToBottomBounceEnabled", true)
      },
      // 在设置滚动条位置时使用动画过渡，默认为否
      scrollWithAnimation: {
        type: Boolean,
        default: u.gc("scrollWithAnimation", false)
      },
      // 值应为某子元素id（id不能以数字开头）。设置哪个方向可滚动，则在哪个方向滚动到该元素
      scrollIntoView: {
        type: String,
        default: u.gc("scrollIntoView", "")
      },
      // z-paging是否使用swiper-item或其他父组件包裹，默认为否，此属性为了解决vue3+(微信小程序或QQ小程序)中，scrollIntoViewById和scrollIntoViewByIndex因无法获取节点信息导致滚动到指定view无效的问题
      inSwiperSlot: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scrollTop: 0,
        oldScrollTop: 0,
        scrollLeft: 0,
        oldScrollLeft: 0,
        scrollViewStyle: {},
        scrollViewContainerStyle: {},
        scrollViewInStyle: {},
        pageScrollTop: -1,
        scrollEnable: true,
        privateScrollWithAnimation: -1,
        cacheScrollNodeHeight: -1,
        superContentHeight: 0,
        lastScrollHeight: 0,
        lastScrollDirection: "",
        setContentHeightPending: false
      };
    },
    watch: {
      oldScrollTop(newVal) {
        !this.usePageScroll && this._scrollTopChange(newVal, false);
      },
      pageScrollTop(newVal) {
        this.usePageScroll && this._scrollTopChange(newVal, true);
      },
      usePageScroll: {
        handler(newVal) {
          this.loaded && this.autoHeight && this._setAutoHeight(!newVal);
        },
        immediate: true
      },
      finalScrollTop(newVal) {
        this.renderPropScrollTop = newVal < 6 ? 0 : 10;
      }
    },
    computed: {
      finalScrollWithAnimation() {
        if (this.privateScrollWithAnimation !== -1) {
          return this.privateScrollWithAnimation === 1;
        }
        return this.scrollWithAnimation;
      },
      finalScrollViewStyle() {
        if (this.superContentZIndex != 1) {
          this.scrollViewStyle["z-index"] = this.superContentZIndex;
          this.scrollViewStyle["position"] = "relative";
        }
        return this.scrollViewStyle;
      },
      finalScrollTop() {
        return this.usePageScroll ? this.pageScrollTop : this.oldScrollTop;
      },
      // 当前是否是旧版webview
      finalIsOldWebView() {
        return this.isOldWebView && !this.usePageScroll;
      },
      // 当前scroll-view/list-view是否允许滚动
      finalScrollable() {
        return this.scrollable && !this.usePageScroll && this.scrollEnable && (this.refresherCompleteScrollable ? true : this.refresherStatus !== Enum.Refresher.Complete) && (this.refresherRefreshingScrollable ? true : this.refresherStatus !== Enum.Refresher.Loading);
      }
    },
    methods: {
      // 滚动到顶部，animate为是否展示滚动动画，默认为是
      scrollToTop(animate, checkReverse = true) {
        if (this.useChatRecordMode && checkReverse && !this.isChatRecordModeAndNotInversion) {
          this.scrollToBottom(animate, false);
          return;
        }
        this.$nextTick(() => {
          this._scrollToTop(animate, false);
        });
      },
      // 滚动到底部，animate为是否展示滚动动画，默认为是
      scrollToBottom(animate, checkReverse = true) {
        if (this.useChatRecordMode && checkReverse && !this.isChatRecordModeAndNotInversion) {
          this.scrollToTop(animate, false);
          return;
        }
        this.$nextTick(() => {
          this._scrollToBottom(animate);
        });
      },
      // 滚动到指定view(vue中有效)。sel为需要滚动的view的id值，不包含"#"；offset为偏移量，单位为px；animate为是否展示滚动动画，默认为否
      scrollIntoViewById(sel, offset, animate) {
        this._scrollIntoView(sel, offset, animate);
      },
      // 滚动到指定view(vue中有效)。nodeTop为需要滚动的view的top值(通过uni.createSelectorQuery()获取)；offset为偏移量，单位为px；animate为是否展示滚动动画，默认为否
      scrollIntoViewByNodeTop(nodeTop, offset, animate) {
        this.scrollTop = this.oldScrollTop;
        this.$nextTick(() => {
          this._scrollIntoViewByNodeTop(nodeTop, offset, animate);
        });
      },
      // y轴滚动到指定位置(vue中有效)。y为与顶部的距离，单位为px；offset为偏移量，单位为px；animate为是否展示滚动动画，默认为否
      scrollToY(y, offset, animate) {
        this.scrollTop = this.oldScrollTop;
        this.$nextTick(() => {
          this._scrollToY(y, offset, animate);
        });
      },
      // x轴滚动到指定位置(非页面滚动且在vue中有效)。x为与左侧的距离，单位为px；offset为偏移量，单位为px；animate为是否展示滚动动画，默认为否
      scrollToX(x, offset, animate) {
        this.scrollLeft = this.oldScrollLeft;
        this.$nextTick(() => {
          this._scrollToX(x, offset, animate);
        });
      },
      // 滚动到指定view(nvue中和虚拟列表中有效)。index为需要滚动的view的index(第几个，从0开始)；offset为偏移量，单位为px；animate为是否展示滚动动画，默认为否
      scrollIntoViewByIndex(index, offset, animate) {
        if (index >= this.realTotalData.length) {
          u.consoleErr("当前滚动的index超出已渲染列表长度，请先通过refreshToPage加载到对应index页并等待渲染成功后再调用此方法！");
          return;
        }
        this.$nextTick(() => {
          if (this.finalUseVirtualList) {
            const isCellFixed = this.cellHeightMode === Enum.CellHeightMode.Fixed;
            u.delay(() => {
              if (this.finalUseVirtualList) {
                const scrollTop = isCellFixed ? this.virtualCellHeight * index : this.virtualHeightCacheList[index].lastTotalHeight;
                this.scrollToY(scrollTop, offset, animate);
              }
            }, isCellFixed ? 0 : 100);
          }
        });
      },
      // 滚动到指定view(nvue中有效)。view为需要滚动的view(通过`this.$refs.xxx`获取)，不包含"#"；offset为偏移量，单位为px；animate为是否展示滚动动画，默认为否
      scrollIntoViewByView(view, offset, animate) {
        this._scrollIntoView(view, offset, animate);
      },
      // 当使用页面滚动并且自定义下拉刷新时，请在页面的onPageScroll中调用此方法，告知z-paging当前的pageScrollTop，否则会导致在任意位置都可以下拉刷新
      updatePageScrollTop(value) {
        this.pageScrollTop = value;
      },
      // 当使用页面滚动并且设置了slot="top"时，默认初次加载会自动获取其高度，并使内部容器下移，当slot="top"的view高度动态改变时，在其高度需要更新时调用此方法
      updatePageScrollTopHeight() {
        this._updatePageScrollTopOrBottomHeight("top");
      },
      // 当使用页面滚动并且设置了slot="bottom"时，默认初次加载会自动获取其高度，并使内部容器下移，当slot="bottom"的view高度动态改变时，在其高度需要更新时调用此方法
      updatePageScrollBottomHeight() {
        this._updatePageScrollTopOrBottomHeight("bottom");
      },
      // 更新slot="left"和slot="right"宽度，当slot="left"或slot="right"宽度动态改变时调用
      updateLeftAndRightWidth() {
        if (!this.finalIsOldWebView)
          return;
        this.$nextTick(() => this._updateLeftAndRightWidth(this.scrollViewContainerStyle, "zp-page"));
      },
      // 更新z-paging内置scroll-view的scrollTop
      updateScrollViewScrollTop(scrollTop, animate = true) {
        this._updatePrivateScrollWithAnimation(animate);
        this.scrollTop = this.oldScrollTop;
        this.$nextTick(() => {
          this.scrollTop = scrollTop;
          this.oldScrollTop = this.scrollTop;
        });
      },
      // 当滚动到顶部时
      _onScrollToUpper() {
        this._emitScrollEvent("scrolltoupper");
        this.$emit("scrollTopChange", 0);
        this.$nextTick(() => {
          this.oldScrollTop = 0;
        });
      },
      // 当滚动到底部时
      _onScrollToLower(e) {
        (!e.detail || !e.detail.direction || e.detail.direction === "bottom") && this.toBottomLoadingMoreEnabled && this._onLoadingMore(this.useChatRecordMode ? "click" : "toBottom");
      },
      // 滚动到顶部
      _scrollToTop(animate = true, isPrivate = true) {
        if (this.usePageScroll) {
          this.$nextTick(() => {
            uni.pageScrollTo({
              scrollTop: 0,
              duration: animate ? 100 : 0
            });
          });
          return;
        }
        this._updatePrivateScrollWithAnimation(animate);
        this.scrollTop = this.oldScrollTop;
        this.$nextTick(() => {
          this.scrollTop = 0;
          this.oldScrollTop = this.scrollTop;
        });
        u.delay(() => {
          this.scrollTop = this.oldScrollTop;
          this.$nextTick(() => {
            this.scrollTop = 0;
            this.oldScrollTop = this.scrollTop;
          });
        }, 500);
      },
      // 滚动到底部
      async _scrollToBottom(animate = true) {
        if (this.usePageScroll) {
          this.$nextTick(() => {
            uni.pageScrollTo({
              scrollTop: Number.MAX_VALUE,
              duration: animate ? 100 : 0
            });
          });
          return;
        }
        try {
          this._updatePrivateScrollWithAnimation(animate);
          const pagingContainerNode = await this._getNodeClientRect(".zp-paging-container");
          const scrollViewNode = await this._getNodeClientRect(".zp-scroll-view");
          const pagingContainerH = pagingContainerNode ? pagingContainerNode[0].height : 0;
          const scrollViewH = scrollViewNode ? scrollViewNode[0].height : 0;
          if (pagingContainerH > scrollViewH) {
            this.scrollTop = this.oldScrollTop;
            this.$nextTick(() => {
              this.scrollTop = pagingContainerH - scrollViewH + this.virtualPlaceholderTopHeight;
              this.oldScrollTop = this.scrollTop;
            });
          }
        } catch (e) {
        }
      },
      // 滚动到指定view
      _scrollIntoView(sel, offset = 0, animate = false, finishCallback) {
        try {
          this.scrollTop = this.oldScrollTop;
          this.$nextTick(() => {
            let inDom = false;
            this._getNodeClientRect("#" + sel.replace("#", ""), inDom).then((node) => {
              if (node) {
                this._getNodeClientRect(".zp-scroll-view-container").then((svContainerNode) => {
                  if (svContainerNode) {
                    this._scrollIntoViewByNodeTop(node[0].top - svContainerNode[0].top, offset, animate);
                    finishCallback && finishCallback();
                  }
                });
              } else {
                u.consoleErr(`无法获取${sel}的节点信息，请检查！`);
              }
            });
          });
        } catch (e) {
        }
      },
      // 通过nodeTop滚动到指定view
      _scrollIntoViewByNodeTop(nodeTop, offset = 0, animate = false) {
        if (this.isChatRecordModeAndInversion) {
          this._getNodeClientRect(".zp-scroll-view").then((sNode) => {
            if (sNode) {
              this._scrollToY(sNode[0].height - nodeTop, offset, animate, true);
            }
          });
        } else {
          this._scrollToY(nodeTop, offset, animate, true);
        }
      },
      // y轴滚动到指定位置
      _scrollToY(y, offset = 0, animate = false, addScrollTop = false) {
        this._updatePrivateScrollWithAnimation(animate);
        u.delay(() => {
          if (this.usePageScroll) {
            if (addScrollTop && this.pageScrollTop !== -1) {
              y += this.pageScrollTop;
            }
            const scrollTop = y - offset;
            uni.pageScrollTo({
              scrollTop,
              duration: animate ? 100 : 0
            });
          } else {
            if (addScrollTop) {
              y += this.oldScrollTop;
            }
            this.scrollTop = y - offset;
          }
        }, 10);
      },
      // x轴滚动到指定位置
      _scrollToX(x, offset = 0, animate = false) {
        this._updatePrivateScrollWithAnimation(animate);
        u.delay(() => {
          if (!this.usePageScroll) {
            this.scrollLeft = x - offset;
          } else {
            u.consoleErr("使用页面滚动时不支持scrollToX");
          }
        }, 10);
      },
      // scroll-view滚动中
      _scroll(e) {
        this.$emit("scroll", e);
        const { scrollTop, scrollLeft, scrollHeight } = e.detail;
        if (this.watchScrollDirectionChange) {
          let direction = this.oldScrollTop > scrollTop ? "top" : "bottom";
          if (scrollTop <= 0 || !this.scrollEnable) {
            direction = "top";
          }
          if (scrollTop > this.lastScrollHeight - this.scrollViewHeight - 1 && this.scrollEnable) {
            direction = "bottom";
          }
          if (direction !== this.lastScrollDirection) {
            this.$emit("scrollDirectionChange", direction);
            this.lastScrollDirection = direction;
          }
          if (this.lastScrollHeight !== scrollHeight && !this.setContentHeightPending) {
            this.setContentHeightPending = true;
            u.delay(() => {
              this.lastScrollHeight = scrollHeight;
              this.setContentHeightPending = false;
            });
          }
        }
        this.finalUseVirtualList && this._updateVirtualScroll(scrollTop, this.oldScrollTop - scrollTop);
        this.oldScrollTop = scrollTop;
        this.oldScrollLeft = scrollLeft;
        if (!this.isIos) {
          const scrollDiff = e.detail.scrollHeight - this.oldScrollTop;
          this._checkScrolledToBottom(scrollDiff);
        }
      },
      // emit scrolltolower/scrolltoupper事件
      _emitScrollEvent(type) {
        const reversedType = type === "scrolltolower" ? "scrolltoupper" : "scrolltolower";
        const eventType = this.useChatRecordMode && !this.isChatRecordModeAndNotInversion ? reversedType : type;
        this.$emit(eventType);
      },
      // 更新内置的scroll-view是否启用滚动动画
      _updatePrivateScrollWithAnimation(animate) {
        this.privateScrollWithAnimation = animate ? 1 : 0;
        u.delay(() => this.$nextTick(() => {
          this.privateScrollWithAnimation = -1;
        }), 100, "updateScrollWithAnimationDelay");
      },
      // 检测scrollView是否要铺满屏幕
      _doCheckScrollViewShouldFullHeight(totalData) {
        if (this.autoFullHeight && this.usePageScroll && this.isTotalChangeFromAddData) {
          this.$nextTick(() => {
            this._checkScrollViewShouldFullHeight((scrollViewNode, pagingContainerNode) => {
              this._preCheckShowNoMoreInside(totalData, scrollViewNode, pagingContainerNode);
            });
          });
        } else {
          this._preCheckShowNoMoreInside(totalData);
        }
      },
      // 检测z-paging是否要全屏覆盖(当使用页面滚动并且不满全屏时，默认z-paging需要铺满全屏，避免数据过少时内部的empty-view无法正确展示)
      async _checkScrollViewShouldFullHeight(callback) {
        try {
          const scrollViewNode = await this._getNodeClientRect(".zp-scroll-view");
          const pagingContainerNode = await this._getNodeClientRect(".zp-paging-container-content");
          if (!scrollViewNode || !pagingContainerNode)
            return;
          const scrollViewHeight = pagingContainerNode[0].height;
          const scrollViewTop = scrollViewNode[0].top;
          if (this.isAddedData && scrollViewHeight + scrollViewTop <= this.windowHeight) {
            this._setAutoHeight(true, scrollViewNode);
            callback(scrollViewNode, pagingContainerNode);
          } else {
            this._setAutoHeight(false);
            callback(null, null);
          }
        } catch (e) {
          callback(null, null);
        }
      },
      // 更新缓存中z-paging整个内容容器高度
      async _updateCachedSuperContentHeight() {
        const superContentNode = await this._getNodeClientRect(".z-paging-content");
        if (superContentNode) {
          this.superContentHeight = superContentNode[0].height;
        }
      },
      // scrollTop改变时触发
      _scrollTopChange(newVal, isPageScrollTop) {
        this.$emit("scrollTopChange", newVal);
        this.$emit("update:scrollTop", newVal);
        this._checkShouldShowBackToTop(newVal);
        const scrollTop = newVal > 5 ? 6 : 0;
        if (isPageScrollTop && this.wxsPageScrollTop !== scrollTop) {
          this.wxsPageScrollTop = scrollTop;
        } else if (!isPageScrollTop && this.wxsScrollTop !== scrollTop) {
          this.wxsScrollTop = scrollTop;
          if (scrollTop > 6) {
            this.scrollEnable = true;
          }
        }
      },
      // 更新使用页面滚动时slot="top"或"bottom"插入view的高度
      _updatePageScrollTopOrBottomHeight(type) {
        if (!this.usePageScroll)
          return;
        this._doCheckScrollViewShouldFullHeight(this.realTotalData);
        const node = `.zp-page-${type}`;
        const marginText = `margin${type.slice(0, 1).toUpperCase() + type.slice(1)}`;
        const safeAreaInsetBottomAdd = this.safeAreaInsetBottom && !this.zSlots.bottom && !this.useSafeAreaPlaceholder;
        this.$nextTick(() => {
          let delayTime = 0;
          u.delay(() => {
            this._getNodeClientRect(node).then((res) => {
              if (res) {
                let pageScrollNodeHeight = res[0].height;
                if (type === "bottom") {
                  if (safeAreaInsetBottomAdd) {
                    pageScrollNodeHeight += this.safeAreaBottom;
                  }
                } else {
                  this.cacheTopHeight = pageScrollNodeHeight;
                }
                this.$set(this.scrollViewStyle, marginText, `${pageScrollNodeHeight}px`);
              } else if (safeAreaInsetBottomAdd) {
                this.$set(this.scrollViewStyle, marginText, `${this.safeAreaBottom}px`);
              }
            });
          }, delayTime);
        });
      }
    }
  };
  const backToTopModule = {
    props: {
      // 自动显示点击返回顶部按钮，默认为否
      autoShowBackToTop: {
        type: Boolean,
        default: u.gc("autoShowBackToTop", false)
      },
      // 点击返回顶部按钮显示/隐藏的阈值(滚动距离)，单位为px，默认为400rpx
      backToTopThreshold: {
        type: [Number, String],
        default: u.gc("backToTopThreshold", "400rpx")
      },
      // 点击返回顶部按钮的自定义图片地址，默认使用z-paging内置的图片
      backToTopImg: {
        type: String,
        default: u.gc("backToTopImg", "")
      },
      // 点击返回顶部按钮返回到顶部时是否展示过渡动画，默认为是
      backToTopWithAnimate: {
        type: Boolean,
        default: u.gc("backToTopWithAnimate", true)
      },
      // 点击返回顶部按钮与底部的距离，注意添加单位px或rpx，默认为160rpx
      backToTopBottom: {
        type: [Number, String],
        default: u.gc("backToTopBottom", "160rpx")
      },
      // 点击返回顶部按钮的自定义样式
      backToTopStyle: {
        type: Object,
        default: u.gc("backToTopStyle", {})
      },
      // iOS点击顶部状态栏、安卓双击标题栏时，滚动条返回顶部，只支持竖向，默认为是
      enableBackToTop: {
        type: Boolean,
        default: u.gc("enableBackToTop", true)
      }
    },
    data() {
      return {
        // 点击返回顶部的class
        backToTopClass: "zp-back-to-top zp-back-to-top-hide",
        // 上次点击返回顶部的时间
        lastBackToTopShowTime: 0,
        // 点击返回顶部显示的class是否在展示中，使得按钮展示/隐藏过度效果更自然
        showBackToTopClass: false
      };
    },
    computed: {
      backToTopThresholdUnitConverted() {
        return u.addUnit(this.backToTopThreshold, this.unit);
      },
      backToTopBottomUnitConverted() {
        return u.addUnit(this.backToTopBottom, this.unit);
      },
      finalEnableBackToTop() {
        return this.usePageScroll ? false : this.enableBackToTop;
      },
      finalBackToTopThreshold() {
        return u.convertToPx(this.backToTopThresholdUnitConverted);
      },
      finalBackToTopStyle() {
        const backToTopStyle = this.backToTopStyle;
        if (!backToTopStyle.bottom) {
          backToTopStyle.bottom = this.windowBottom + u.convertToPx(this.backToTopBottomUnitConverted) + "px";
        }
        if (!backToTopStyle.position) {
          backToTopStyle.position = this.usePageScroll ? "fixed" : "absolute";
        }
        return backToTopStyle;
      },
      finalBackToTopClass() {
        return `${this.backToTopClass} zp-back-to-top-${this.unit}`;
      }
    },
    methods: {
      // 点击了返回顶部
      _backToTopClick() {
        let callbacked = false;
        this.$emit("backToTopClick", (toTop) => {
          (toTop === void 0 || toTop === true) && this._handleToTop();
          callbacked = true;
        });
        this.$nextTick(() => {
          !callbacked && this._handleToTop();
        });
      },
      // 处理滚动到顶部（聊天记录模式中为滚动到底部）
      _handleToTop() {
        !this.backToTopWithAnimate && this._checkShouldShowBackToTop(0);
        !this.useChatRecordMode ? this.scrollToTop(this.backToTopWithAnimate) : this.scrollToBottom(this.backToTopWithAnimate);
      },
      // 判断是否要显示返回顶部按钮
      _checkShouldShowBackToTop(scrollTop) {
        if (!this.autoShowBackToTop) {
          this.showBackToTopClass = false;
          return;
        }
        if (scrollTop > this.finalBackToTopThreshold) {
          if (!this.showBackToTopClass) {
            this.showBackToTopClass = true;
            this.lastBackToTopShowTime = (/* @__PURE__ */ new Date()).getTime();
            u.delay(() => {
              this.backToTopClass = "zp-back-to-top zp-back-to-top-show";
            }, 300);
          }
        } else {
          if (this.showBackToTopClass) {
            this.backToTopClass = "zp-back-to-top zp-back-to-top-hide";
            u.delay(() => {
              this.showBackToTopClass = false;
            }, (/* @__PURE__ */ new Date()).getTime() - this.lastBackToTopShowTime < 500 ? 0 : 300);
          }
        }
      }
    }
  };
  const virtualListModule = {
    props: {
      // 是否使用虚拟列表，默认为否
      useVirtualList: {
        type: Boolean,
        default: u.gc("useVirtualList", false)
      },
      // 在使用虚拟列表时，是否使用兼容模式，默认为否
      useCompatibilityMode: {
        type: Boolean,
        default: u.gc("useCompatibilityMode", false)
      },
      // 使用兼容模式时传递的附加数据
      extraData: {
        type: Object,
        default: u.gc("extraData", {})
      },
      // 是否在z-paging内部循环渲染列表(内置列表)，默认为否。若use-virtual-list为true，则此项恒为true
      useInnerList: {
        type: Boolean,
        default: u.gc("useInnerList", false)
      },
      // 强制关闭inner-list，默认为false，如果为true将强制关闭innerList，适用于开启了虚拟列表后需要强制关闭inner-list的情况
      forceCloseInnerList: {
        type: Boolean,
        default: u.gc("forceCloseInnerList", false)
      },
      // 内置列表cell的key名称，仅nvue有效，在nvue中开启use-inner-list时必须填此项
      cellKeyName: {
        type: String,
        default: u.gc("cellKeyName", "")
      },
      // innerList样式
      innerListStyle: {
        type: Object,
        default: u.gc("innerListStyle", {})
      },
      // innerCell样式
      innerCellStyle: {
        type: Object,
        default: u.gc("innerCellStyle", {})
      },
      // 预加载的列表可视范围(列表高度)页数，默认为12，即预加载当前页及上下各12页的cell。此数值越大，则虚拟列表中加载的dom越多，内存消耗越大(会维持在一个稳定值)，但增加预加载页面数量可缓解快速滚动短暂白屏问题
      preloadPage: {
        type: [Number, String],
        default: u.gc("preloadPage", 12),
        validator: (value) => {
          if (value <= 0)
            u.consoleErr("preload-page必须大于0！");
          return value > 0;
        }
      },
      // 虚拟列表cell高度模式，默认为fixed，也就是每个cell高度完全相同，将以第一个cell高度为准进行计算。可选值【dynamic】，即代表高度是动态非固定的，【dynamic】性能低于【fixed】。
      cellHeightMode: {
        type: String,
        default: u.gc("cellHeightMode", Enum.CellHeightMode.Fixed)
      },
      // 固定的cell高度，cellHeightMode=fixed才有效，若设置了值，则不计算第一个cell高度而使用设置的cell高度
      fixedCellHeight: {
        type: [Number, String],
        default: u.gc("fixedCellHeight", 0)
      },
      // 虚拟列表列数，默认为1。常用于每行有多列的情况，例如每行有2列数据，需要将此值设置为2
      virtualListCol: {
        type: [Number, String],
        default: u.gc("virtualListCol", 1)
      },
      // 虚拟列表scroll取样帧率，默认为80，过低容易出现白屏问题，过高容易出现卡顿问题
      virtualScrollFps: {
        type: [Number, String],
        default: u.gc("virtualScrollFps", 80)
      },
      // 虚拟列表cell id的前缀，适用于一个页面有多个虚拟列表的情况，用以区分不同虚拟列表cell的id，注意：请勿传数字或以数字开头的字符串。如设置为list1，则cell的id应为：list1-zp-id-${item.zp_index}
      virtualCellIdPrefix: {
        type: String,
        default: u.gc("virtualCellIdPrefix", "")
      },
      // 虚拟列表是否使用swiper-item或其他父组件包裹，默认为否，此属性为了解决vue3+(微信小程序或QQ小程序)中，使用非内置列表写法时，若z-paging在swiper-item内存在无法获取slot插入的cell高度进而导致虚拟列表失败的问题
      // 仅vue3+(微信小程序或QQ小程序)+非内置列表写法虚拟列表有效，其他情况此属性设置任何值都无效，所以如果您在swiper-item内使用z-paging的非内置虚拟列表写法，将此属性设置为true即可
      virtualInSwiperSlot: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        virtualListKey: u.getInstanceId(),
        virtualCellHeight: 0,
        virtualScrollTimeStamp: 0,
        virtualList: [],
        virtualPlaceholderTopHeight: 0,
        virtualPlaceholderBottomHeight: 0,
        virtualTopRangeIndex: 0,
        virtualBottomRangeIndex: 0,
        lastVirtualTopRangeIndex: 0,
        lastVirtualBottomRangeIndex: 0,
        virtualItemInsertedCount: 0,
        virtualHeightCacheList: [],
        getCellHeightRetryCount: {
          fixed: 0,
          dynamic: 0
        },
        updateVirtualListFromDataChange: false
      };
    },
    watch: {
      // 监听总数据的改变，刷新虚拟列表布局
      realTotalData() {
        this.updateVirtualListRender();
      },
      // 监听虚拟列表渲染数组的改变并emit
      virtualList(newVal) {
        this.$emit("update:virtualList", newVal);
        this.$emit("virtualListChange", newVal);
      },
      // 监听虚拟列表顶部占位高度改变并emit
      virtualPlaceholderTopHeight(newVal) {
        this.$emit("virtualTopHeightChange", newVal);
      }
    },
    computed: {
      virtualCellIndexKey() {
        return c.listCellIndexKey;
      },
      finalUseVirtualList() {
        if (this.useVirtualList && this.usePageScroll) {
          u.consoleErr("使用页面滚动时，开启虚拟列表无效！");
        }
        return this.useVirtualList && !this.usePageScroll;
      },
      finalUseInnerList() {
        return this.useInnerList || this.finalUseVirtualList && !this.forceCloseInnerList;
      },
      finalCellKeyName() {
        return this.cellKeyName;
      },
      finalVirtualPageHeight() {
        return this.scrollViewHeight > 0 ? this.scrollViewHeight : this.windowHeight;
      },
      finalFixedCellHeight() {
        return u.convertToPx(this.fixedCellHeight);
      },
      fianlVirtualCellIdPrefix() {
        const prefix = this.virtualCellIdPrefix ? this.virtualCellIdPrefix + "-" : "";
        return prefix + "zp-id";
      },
      finalPlaceholderTopHeightStyle() {
        return {};
      },
      virtualRangePageHeight() {
        return this.finalVirtualPageHeight * this.preloadPage;
      },
      virtualScrollDisTimeStamp() {
        return 1e3 / this.virtualScrollFps;
      }
    },
    methods: {
      // 在使用动态高度虚拟列表时，若在列表数组中需要插入某个item，需要调用此方法；item:需要插入的item，index:插入的cell位置，若index为2，则插入的item在原list的index=1之后，index从0开始
      doInsertVirtualListItem(item, index) {
        if (this.cellHeightMode !== Enum.CellHeightMode.Dynamic)
          return;
        this.realTotalData.splice(index, 0, item);
        this.realTotalData = [...this.realTotalData];
        this.virtualItemInsertedCount++;
        if (!item || Object.prototype.toString.call(item) !== "[object Object]") {
          item = { item };
        }
        const cellIndexKey = this.virtualCellIndexKey;
        item[cellIndexKey] = `custom-${this.virtualItemInsertedCount}`;
        item[c.listCellIndexUniqueKey] = `${this.virtualListKey}-${item[cellIndexKey]}`;
        this.$nextTick(async () => {
          let retryCount = 0;
          while (retryCount <= 10) {
            await u.wait(c.delayTime);
            const cellNode = await this._getVirtualCellNodeByIndex(item[cellIndexKey]);
            if (!cellNode) {
              retryCount++;
              continue;
            }
            const currentHeight = cellNode ? cellNode[0].height : 0;
            const lastHeightCache = this.virtualHeightCacheList[index - 1];
            const lastTotalHeight = lastHeightCache ? lastHeightCache.totalHeight : 0;
            this.virtualHeightCacheList.splice(index, 0, {
              height: currentHeight,
              lastTotalHeight,
              totalHeight: lastTotalHeight + currentHeight
            });
            for (let i = index + 1; i < this.virtualHeightCacheList.length; i++) {
              const thisNode = this.virtualHeightCacheList[i];
              thisNode.lastTotalHeight += currentHeight;
              thisNode.totalHeight += currentHeight;
            }
            this._updateVirtualScroll(this.oldScrollTop);
            break;
          }
        });
      },
      // 在使用动态高度虚拟列表时，手动更新指定cell的缓存高度(当cell高度在初始化之后再次改变后调用)；index:需要更新的cell在列表中的位置，从0开始
      didUpdateVirtualListCell(index) {
        if (this.cellHeightMode !== Enum.CellHeightMode.Dynamic)
          return;
        const currentNode = this.virtualHeightCacheList[index];
        this.$nextTick(() => {
          this._getVirtualCellNodeByIndex(index).then((cellNode) => {
            const cellNodeHeight = cellNode ? cellNode[0].height : 0;
            const heightDis = cellNodeHeight - currentNode.height;
            currentNode.height = cellNodeHeight;
            currentNode.totalHeight = currentNode.lastTotalHeight + cellNodeHeight;
            for (let i = index + 1; i < this.virtualHeightCacheList.length; i++) {
              const thisNode = this.virtualHeightCacheList[i];
              thisNode.totalHeight += heightDis;
              thisNode.lastTotalHeight += heightDis;
            }
          });
        });
      },
      // 在使用动态高度虚拟列表时，若删除了列表数组中的某个item，需要调用此方法以更新高度缓存数组；index:删除的cell在列表中的位置，从0开始
      didDeleteVirtualListCell(index) {
        if (this.cellHeightMode !== Enum.CellHeightMode.Dynamic)
          return;
        const currentNode = this.virtualHeightCacheList[index];
        for (let i = index + 1; i < this.virtualHeightCacheList.length; i++) {
          const thisNode = this.virtualHeightCacheList[i];
          thisNode.totalHeight -= currentNode.height;
          thisNode.lastTotalHeight -= currentNode.height;
        }
        this.virtualHeightCacheList.splice(index, 1);
      },
      // 手动触发虚拟列表渲染更新，可用于解决例如修改了虚拟列表数组中元素，但展示未更新的情况
      updateVirtualListRender() {
        if (this.finalUseVirtualList) {
          this.updateVirtualListFromDataChange = true;
          this.$nextTick(() => {
            this.getCellHeightRetryCount.fixed = 0;
            if (this.realTotalData.length) {
              this.cellHeightMode === Enum.CellHeightMode.Fixed && this.isFirstPage && this._updateFixedCellHeight();
            } else {
              this._resetDynamicListState(!this.isUserPullDown);
            }
            this._updateVirtualScroll(this.oldScrollTop);
          });
        }
      },
      // cellHeightMode为fixed时获取第一个cell高度
      _updateFixedCellHeight() {
        if (!this.finalFixedCellHeight) {
          this.$nextTick(() => {
            u.delay(() => {
              this._getVirtualCellNodeByIndex(0).then((cellNode) => {
                if (!cellNode) {
                  if (this.getCellHeightRetryCount.fixed > 10)
                    return;
                  this.getCellHeightRetryCount.fixed++;
                  this._updateFixedCellHeight();
                } else {
                  this.virtualCellHeight = cellNode[0].height;
                  this._updateVirtualScroll(this.oldScrollTop);
                }
              });
            }, c.delayTime, "updateFixedCellHeightDelay");
          });
        } else {
          this.virtualCellHeight = this.finalFixedCellHeight;
        }
      },
      // cellHeightMode为dynamic时获取每个cell高度
      _updateDynamicCellHeight(list, dataFrom = "bottom") {
        const dataFromTop = dataFrom === "top";
        const heightCacheList = this.virtualHeightCacheList;
        const currentCacheList = dataFromTop ? [] : heightCacheList;
        let listTotalHeight = 0;
        this.$nextTick(() => {
          u.delay(async () => {
            for (let i = 0; i < list.length; i++) {
              const cellNode = await this._getVirtualCellNodeByIndex(list[i][this.virtualCellIndexKey]);
              const currentHeight = cellNode ? cellNode[0].height : 0;
              if (!cellNode) {
                if (this.getCellHeightRetryCount.dynamic <= 10) {
                  heightCacheList.splice(heightCacheList.length - i, i);
                  this.getCellHeightRetryCount.dynamic++;
                  this._updateDynamicCellHeight(list, dataFrom);
                }
                return;
              }
              const lastHeightCache = currentCacheList.length ? currentCacheList.slice(-1)[0] : null;
              const lastTotalHeight = lastHeightCache ? lastHeightCache.totalHeight : 0;
              currentCacheList.push({
                height: currentHeight,
                lastTotalHeight,
                totalHeight: lastTotalHeight + currentHeight
              });
              if (dataFromTop) {
                listTotalHeight += currentHeight;
              }
            }
            if (dataFromTop && list.length) {
              for (let i = 0; i < heightCacheList.length; i++) {
                const heightCacheItem = heightCacheList[i];
                heightCacheItem.lastTotalHeight += listTotalHeight;
                heightCacheItem.totalHeight += listTotalHeight;
              }
              this.virtualHeightCacheList = currentCacheList.concat(heightCacheList);
            }
            this._updateVirtualScroll(this.oldScrollTop);
          }, c.delayTime, "updateDynamicCellHeightDelay");
        });
      },
      // 设置cellItem的index
      _setCellIndex(list, dataFrom = "bottom") {
        let currentItemIndex = 0;
        const cellIndexKey = this.virtualCellIndexKey;
        dataFrom === "bottom" && [Enum.QueryFrom.Refresh, Enum.QueryFrom.Reload].indexOf(this.queryFrom) >= 0 && this._resetDynamicListState();
        if (this.totalData.length && this.queryFrom !== Enum.QueryFrom.Refresh) {
          if (dataFrom === "bottom") {
            currentItemIndex = this.realTotalData.length;
            const lastItem = this.realTotalData.length ? this.realTotalData.slice(-1)[0] : null;
            if (lastItem && lastItem[cellIndexKey] !== void 0) {
              currentItemIndex = lastItem[cellIndexKey] + 1;
            }
          } else if (dataFrom === "top") {
            const firstItem = this.realTotalData.length ? this.realTotalData[0] : null;
            if (firstItem && firstItem[cellIndexKey] !== void 0) {
              currentItemIndex = firstItem[cellIndexKey] - list.length;
            }
          }
        } else {
          this._resetDynamicListState();
        }
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          if (!item || Object.prototype.toString.call(item) !== "[object Object]") {
            item = { item };
          }
          if (item[c.listCellIndexUniqueKey]) {
            item = u.deepCopy(item);
          }
          item[cellIndexKey] = currentItemIndex + i;
          item[c.listCellIndexUniqueKey] = `${this.virtualListKey}-${item[cellIndexKey]}`;
          list[i] = item;
        }
        this.getCellHeightRetryCount.dynamic = 0;
        this.cellHeightMode === Enum.CellHeightMode.Dynamic && this._updateDynamicCellHeight(list, dataFrom);
      },
      // 更新scroll滚动（虚拟列表滚动时触发）
      _updateVirtualScroll(scrollTop, scrollDiff = 0) {
        const currentTimeStamp = u.getTime();
        scrollTop === 0 && this._resetTopRange();
        if (scrollTop !== 0 && this.virtualScrollTimeStamp && currentTimeStamp - this.virtualScrollTimeStamp <= this.virtualScrollDisTimeStamp) {
          return;
        }
        this.virtualScrollTimeStamp = currentTimeStamp;
        let scrollIndex = 0;
        const cellHeightMode = this.cellHeightMode;
        if (cellHeightMode === Enum.CellHeightMode.Fixed) {
          scrollIndex = parseInt(scrollTop / this.virtualCellHeight) || 0;
          this._updateFixedTopRangeIndex(scrollIndex);
          this._updateFixedBottomRangeIndex(scrollIndex);
        } else if (cellHeightMode === Enum.CellHeightMode.Dynamic) {
          const scrollDirection = scrollDiff > 0 ? "top" : "bottom";
          const rangePageHeight = this.virtualRangePageHeight;
          const topRangePageOffset = scrollTop - rangePageHeight;
          const bottomRangePageOffset = scrollTop + this.finalVirtualPageHeight + rangePageHeight;
          let virtualBottomRangeIndex = 0;
          let virtualPlaceholderBottomHeight = 0;
          let reachedLimitBottom = false;
          const heightCacheList = this.virtualHeightCacheList;
          const lastHeightCache = !!heightCacheList ? heightCacheList.slice(-1)[0] : null;
          let startTopRangeIndex = this.virtualTopRangeIndex;
          if (scrollDirection === "bottom") {
            for (let i = startTopRangeIndex; i < heightCacheList.length; i++) {
              const heightCacheItem = heightCacheList[i];
              if (heightCacheItem && heightCacheItem.totalHeight > topRangePageOffset) {
                this.virtualTopRangeIndex = i;
                this.virtualPlaceholderTopHeight = heightCacheItem.lastTotalHeight;
                break;
              }
            }
          } else {
            let topRangeMatched = false;
            for (let i = startTopRangeIndex; i >= 0; i--) {
              const heightCacheItem = heightCacheList[i];
              if (heightCacheItem && heightCacheItem.totalHeight < topRangePageOffset) {
                this.virtualTopRangeIndex = i;
                this.virtualPlaceholderTopHeight = heightCacheItem.lastTotalHeight;
                topRangeMatched = true;
                break;
              }
            }
            !topRangeMatched && this._resetTopRange();
          }
          for (let i = this.virtualTopRangeIndex; i < heightCacheList.length; i++) {
            const heightCacheItem = heightCacheList[i];
            if (heightCacheItem && heightCacheItem.totalHeight > bottomRangePageOffset) {
              virtualBottomRangeIndex = i;
              virtualPlaceholderBottomHeight = lastHeightCache.totalHeight - heightCacheItem.totalHeight;
              reachedLimitBottom = true;
              break;
            }
          }
          if (!reachedLimitBottom || this.virtualBottomRangeIndex === 0) {
            this.virtualBottomRangeIndex = this.realTotalData.length ? this.realTotalData.length - 1 : this.pageSize;
            this.virtualPlaceholderBottomHeight = 0;
          } else {
            this.virtualBottomRangeIndex = virtualBottomRangeIndex;
            this.virtualPlaceholderBottomHeight = virtualPlaceholderBottomHeight;
          }
          this._updateVirtualList();
        }
      },
      // 更新fixedCell模式下topRangeIndex&placeholderTopHeight
      _updateFixedTopRangeIndex(scrollIndex) {
        let virtualTopRangeIndex = this.virtualCellHeight === 0 ? 0 : scrollIndex - (parseInt(this.finalVirtualPageHeight / this.virtualCellHeight) || 1) * this.preloadPage;
        virtualTopRangeIndex *= this.virtualListCol;
        virtualTopRangeIndex = Math.max(0, virtualTopRangeIndex);
        this.virtualTopRangeIndex = virtualTopRangeIndex;
        this.virtualPlaceholderTopHeight = virtualTopRangeIndex / this.virtualListCol * this.virtualCellHeight;
      },
      // 更新fixedCell模式下bottomRangeIndex&placeholderBottomHeight
      _updateFixedBottomRangeIndex(scrollIndex) {
        let virtualBottomRangeIndex = this.virtualCellHeight === 0 ? this.pageSize : scrollIndex + (parseInt(this.finalVirtualPageHeight / this.virtualCellHeight) || 1) * (this.preloadPage + 1);
        virtualBottomRangeIndex *= this.virtualListCol;
        virtualBottomRangeIndex = Math.min(this.realTotalData.length, virtualBottomRangeIndex);
        this.virtualBottomRangeIndex = virtualBottomRangeIndex;
        this.virtualPlaceholderBottomHeight = (this.realTotalData.length - virtualBottomRangeIndex) * this.virtualCellHeight / this.virtualListCol;
        this._updateVirtualList();
      },
      // 更新virtualList
      _updateVirtualList() {
        const shouldUpdateList = this.updateVirtualListFromDataChange || (this.lastVirtualTopRangeIndex !== this.virtualTopRangeIndex || this.lastVirtualBottomRangeIndex !== this.virtualBottomRangeIndex);
        if (shouldUpdateList) {
          this.updateVirtualListFromDataChange = false;
          this.lastVirtualTopRangeIndex = this.virtualTopRangeIndex;
          this.lastVirtualBottomRangeIndex = this.virtualBottomRangeIndex;
          this.virtualList = this.realTotalData.slice(this.virtualTopRangeIndex, this.virtualBottomRangeIndex + 1);
        }
      },
      // 重置动态cell模式下的高度缓存数据、虚拟列表和滚动状态
      _resetDynamicListState(resetVirtualList = false) {
        this.virtualHeightCacheList = [];
        if (resetVirtualList) {
          this.virtualList = [];
        }
        this.virtualTopRangeIndex = 0;
        this.virtualPlaceholderTopHeight = 0;
      },
      // 重置topRangeIndex和placeholderTopHeight
      _resetTopRange() {
        this.virtualTopRangeIndex = 0;
        this.virtualPlaceholderTopHeight = 0;
        this._updateVirtualList();
      },
      // 检测虚拟列表当前滚动位置，如发现滚动位置不正确则重新计算虚拟列表相关参数(为解决在App中可能出现的长时间进入后台后打开App白屏的问题)
      _checkVirtualListScroll() {
        if (this.finalUseVirtualList) {
          this.$nextTick(() => {
            this._getNodeClientRect(".zp-paging-touch-view").then((node) => {
              const currentTop = node ? node[0].top : 0;
              if (!node || currentTop === this.pagingOrgTop && this.virtualPlaceholderTopHeight !== 0) {
                this._updateVirtualScroll(0);
              }
            });
          });
        }
      },
      // 获取对应index的虚拟列表cell节点信息
      _getVirtualCellNodeByIndex(index) {
        let inDom = this.finalUseInnerList;
        return this._getNodeClientRect(`#${this.fianlVirtualCellIdPrefix}-${index}`, inDom);
      },
      // 处理使用内置列表时点击了cell事件
      _innerCellClick(item, index) {
        this.$emit("innerCellClick", item, index);
      }
    }
  };
  const systemInfo = u.getSystemInfoSync();
  const _sfc_main$q = {
    name: "z-paging",
    components: {
      zPagingRefresh,
      zPagingLoadMore,
      zPagingEmptyView: __easycom_0$3
    },
    mixins: [
      commonLayoutModule,
      dataHandleModule,
      i18nModule,
      nvueModule,
      emptyModule,
      refresherModule,
      loadMoreModule,
      loadingModule,
      chatRecordModerModule,
      scrollerModule,
      backToTopModule,
      virtualListModule
    ],
    data() {
      return {
        // --------------静态资源---------------
        base64BackToTop: zStatic.base64BackToTop,
        // -------------全局数据相关--------------
        // 当前加载类型
        loadingType: Enum.LoadingType.Refresher,
        requestTimeStamp: 0,
        wxsPropType: "",
        renderPropScrollTop: -1,
        checkScrolledToBottomTimeOut: null,
        cacheTopHeight: -1,
        statusBarHeight: systemInfo.statusBarHeight,
        scrollViewHeight: 0,
        pagingOrgTop: -1,
        // --------------状态&判断---------------
        insideOfPaging: -1,
        isLoadFailed: false,
        isIos: systemInfo.platform === "ios",
        disabledBounce: false,
        fromCompleteEmit: false,
        disabledCompleteEmit: false,
        pageLaunched: false,
        active: false,
        // ---------------wxs相关---------------
        wxsIsScrollTopInTopRange: true,
        wxsScrollTop: 0,
        wxsPageScrollTop: 0,
        wxsOnPullingDown: false
      };
    },
    props: {
      // 调用complete后延迟处理的时间，单位为毫秒，默认0毫秒，优先级高于minDelay
      delay: {
        type: [Number, String],
        default: u.gc("delay", 0)
      },
      // 触发@query后最小延迟处理的时间，单位为毫秒，默认0毫秒，优先级低于delay（假设设置为300毫秒，若分页请求时间小于300毫秒，则在调用complete后延迟[300毫秒-请求时长]；若请求时长大于300毫秒，则不延迟），当show-refresher-when-reload为true或reload(true)时，其最小值为400
      minDelay: {
        type: [Number, String],
        default: u.gc("minDelay", 0)
      },
      // 设置z-paging的style，部分平台(如微信小程序)无法直接修改组件的style，可使用此属性代替
      pagingStyle: {
        type: Object,
        default: u.gc("pagingStyle", {})
      },
      // 设置z-paging的class，优先级低于pagingStyle和height、width、maxWidth、bgColor
      pagingClass: {
        type: [String, Array, Object],
        default: u.gc("pagingClass", "")
      },
      // z-paging的高度，优先级低于pagingStyle中设置的height；传字符串，如100px、100rpx、100%
      height: {
        type: String,
        default: u.gc("height", "")
      },
      // z-paging的宽度，优先级低于pagingStyle中设置的width；传字符串，如100px、100rpx、100%
      width: {
        type: String,
        default: u.gc("width", "")
      },
      // z-paging的最大宽度，优先级低于pagingStyle中设置的max-width；传字符串，如100px、100rpx、100%。默认为空，也就是铺满窗口宽度，若设置了特定值则会自动添加margin: 0 auto
      maxWidth: {
        type: String,
        default: u.gc("maxWidth", "")
      },
      // z-paging的背景色，优先级低于pagingStyle中设置的background。传字符串，如"#ffffff"
      bgColor: {
        type: String,
        default: u.gc("bgColor", "")
      },
      // 设置z-paging的容器(插槽的父view)的style
      pagingContentStyle: {
        type: Object,
        default: u.gc("pagingContentStyle", {})
      },
      // z-paging是否自动高度，若自动高度则会自动铺满屏幕
      autoHeight: {
        type: Boolean,
        default: u.gc("autoHeight", false)
      },
      // z-paging是否自动高度时，附加的高度，注意添加单位px或rpx，若需要减少高度，则传负数
      autoHeightAddition: {
        type: [Number, String],
        default: u.gc("autoHeightAddition", "0px")
      },
      // loading(下拉刷新、上拉加载更多)的主题样式，支持black，white，默认black
      defaultThemeStyle: {
        type: String,
        default: u.gc("defaultThemeStyle", "black")
      },
      // z-paging是否使用fixed布局，若使用fixed布局，则z-paging的父view无需固定高度，z-paging高度默认为100%，默认为是(当使用内置scroll-view滚动时有效)
      fixed: {
        type: Boolean,
        default: u.gc("fixed", true)
      },
      // 是否开启底部安全区域适配
      safeAreaInsetBottom: {
        type: Boolean,
        default: u.gc("safeAreaInsetBottom", false)
      },
      // 开启底部安全区域适配后，是否使用placeholder形式实现，默认为否。为否时滚动区域会自动避开底部安全区域，也就是所有滚动内容都不会挡住底部安全区域，若设置为是，则滚动时滚动内容会挡住底部安全区域，但是当滚动到底部时才会避开底部安全区域
      useSafeAreaPlaceholder: {
        type: Boolean,
        default: u.gc("useSafeAreaPlaceholder", false)
      },
      // z-paging bottom的背景色，默认透明，传字符串，如"#ffffff"
      bottomBgColor: {
        type: String,
        default: u.gc("bottomBgColor", "")
      },
      // slot="top"的view的z-index，默认为99，仅使用页面滚动时有效
      topZIndex: {
        type: Number,
        default: u.gc("topZIndex", 99)
      },
      // z-paging内容容器父view的z-index，默认为1
      superContentZIndex: {
        type: Number,
        default: u.gc("superContentZIndex", 1)
      },
      // z-paging内容容器部分的z-index，默认为1
      contentZIndex: {
        type: Number,
        default: u.gc("contentZIndex", 1)
      },
      // z-paging二楼的z-index，默认为100
      f2ZIndex: {
        type: Number,
        default: u.gc("f2ZIndex", 100)
      },
      // 使用页面滚动时，是否在不满屏时自动填充满屏幕，默认为是
      autoFullHeight: {
        type: Boolean,
        default: u.gc("autoFullHeight", true)
      },
      // 是否监听列表触摸方向改变，默认为否
      watchTouchDirectionChange: {
        type: Boolean,
        default: u.gc("watchTouchDirectionChange", false)
      },
      // 是否监听列表滚动方向改变，默认为否
      watchScrollDirectionChange: {
        type: Boolean,
        default: u.gc("watchScrollDirectionChange", false)
      },
      // 是否只使用基础布局，设置为true后将关闭mounted自动请求数据、关闭下拉刷新和滚动到底部加载更多，强制隐藏空数据图。默认为否
      layoutOnly: {
        type: Boolean,
        default: u.gc("layoutOnly", false)
      },
      // z-paging中布局的单位，默认为rpx
      unit: {
        type: String,
        default: u.gc("unit", "rpx")
      }
    },
    created() {
      if (this.createdReload && !this.isOnly && this.auto) {
        this._startLoading();
        this.$nextTick(this._preReload);
      }
    },
    mounted() {
      this.active = true;
      this.wxsPropType = u.getTime().toString();
      this.renderJsIgnore;
      if (!this.createdReload && !this.isOnly && this.auto) {
        u.delay(() => this.$nextTick(this._preReload), 0);
      }
      this.finalUseCache && this._setListByLocalCache();
      this.systemInfo = u.getSystemInfoSync();
      this.$nextTick(() => {
        this.systemInfo = u.getSystemInfoSync();
        !this.usePageScroll && this.autoHeight && this._setAutoHeight();
        this.loaded = true;
        u.delay(() => {
          this.updateFixedLayout();
          this._updateCachedSuperContentHeight();
          this._updateScrollViewHeight();
        });
      });
      this.updatePageScrollTopHeight();
      this.updatePageScrollBottomHeight();
      this.updateLeftAndRightWidth();
      if (this.finalRefresherEnabled && this.useCustomRefresher) {
        this.$nextTick(() => {
          this.isTouchmoving = true;
        });
      }
      if (!this.layoutOnly) {
        this._onEmit();
      }
    },
    destroyed() {
      this._handleUnmounted();
    },
    unmounted() {
      this._handleUnmounted();
    },
    watch: {
      defaultThemeStyle: {
        handler(newVal) {
          if (newVal.length) {
            this.finalRefresherDefaultStyle = newVal;
          }
        },
        immediate: true
      },
      autoHeight(newVal) {
        this.loaded && !this.usePageScroll && this._setAutoHeight(newVal);
      },
      autoHeightAddition(newVal) {
        this.loaded && !this.usePageScroll && this.autoHeight && this._setAutoHeight(newVal);
      }
    },
    computed: {
      // 当前z-paging的内置样式
      finalPagingStyle() {
        const pagingStyle = { ...this.pagingStyle };
        if (!this.systemInfo)
          return pagingStyle;
        const { windowTop, windowBottom } = this;
        if (!this.usePageScroll && this.fixed) {
          if (windowTop && !pagingStyle.top) {
            pagingStyle.top = windowTop + "px";
          }
          if (windowBottom && !pagingStyle.bottom) {
            pagingStyle.bottom = windowBottom + "px";
          }
        }
        if (this.bgColor.length && !pagingStyle["background"]) {
          pagingStyle["background"] = this.bgColor;
        }
        if (this.height.length && !pagingStyle["height"]) {
          pagingStyle["height"] = this.height;
        }
        if (this.width.length && !pagingStyle["width"]) {
          pagingStyle["width"] = this.width;
        }
        if (this.maxWidth.length && !pagingStyle["max-width"]) {
          pagingStyle["max-width"] = this.maxWidth;
          pagingStyle["margin"] = "0 auto";
        }
        return pagingStyle;
      },
      // 当前z-paging内容的样式
      finalPagingContentStyle() {
        if (this.contentZIndex != 1) {
          this.pagingContentStyle["z-index"] = this.contentZIndex;
          this.pagingContentStyle["position"] = "relative";
        }
        return this.pagingContentStyle;
      },
      // 最终的当前开启安全区域适配后，是否使用placeholder形式实现。如果slot=bottom存在，则应当交由固定在底部的view处理，因此需排除此情况
      finalUseSafeAreaPlaceholder() {
        return this.useSafeAreaPlaceholder && !this.zSlots.bottom;
      },
      renderJsIgnore() {
        if (this.usePageScroll && this.useChatRecordMode || !this.refresherEnabled && this.scrollable || !this.useCustomRefresher) {
          this.$nextTick(() => {
            this.renderPropScrollTop = 10;
          });
        }
        return 0;
      },
      windowHeight() {
        if (!this.systemInfo)
          return 0;
        return this.systemInfo.windowHeight || 0;
      },
      windowBottom() {
        if (!this.systemInfo)
          return 0;
        return this.systemInfo.windowBottom || 0;
      },
      // 是否是ios+h5
      isIosAndH5() {
        return false;
      },
      // 是否是只使用基础布局或者只使用下拉刷新
      isOnly() {
        return this.layoutOnly || this.refresherOnly;
      }
    },
    methods: {
      // 当前版本号
      getVersion() {
        return `z-paging v${c.version}`;
      },
      // 设置nvue List的specialEffects
      setSpecialEffects(args) {
        this.setListSpecialEffects(args);
      },
      // 与setSpecialEffects等效，兼容旧版本
      setListSpecialEffects(args) {
        this.nFixFreezing = args && Object.keys(args).length;
        if (this.isIos) {
          this.privateRefresherEnabled = 0;
        }
        !this.usePageScroll && this.$refs["zp-n-list"].setSpecialEffects(args);
      },
      // 当app长时间进入后台后进入前台，因系统内存管理导致app重新加载时，进行一些适配处理
      _handlePageLaunch() {
        if (this.pageLaunched) {
          this.refresherThresholdUpdateTag = 1;
          this.$nextTick(() => {
            this.refresherThresholdUpdateTag = 0;
          });
          this._checkVirtualListScroll();
        }
        this.pageLaunched = true;
      },
      // 使手机发生较短时间的振动（15ms）
      _doVibrateShort() {
        if (this.isIos) {
          const UISelectionFeedbackGenerator = plus.ios.importClass("UISelectionFeedbackGenerator");
          const feedbackGenerator = new UISelectionFeedbackGenerator();
          feedbackGenerator.init();
          setTimeout(() => {
            feedbackGenerator.selectionChanged();
          }, 0);
        } else {
          plus.device.vibrate(15);
        }
      },
      // 设置z-paging高度
      async _setAutoHeight(shouldFullHeight = true, scrollViewNode = null) {
        const heightKey = "min-height";
        try {
          if (shouldFullHeight) {
            let finalScrollViewNode = scrollViewNode || await this._getNodeClientRect(".zp-scroll-view");
            let finalScrollBottomNode = await this._getNodeClientRect(".zp-page-bottom");
            if (finalScrollViewNode) {
              const scrollViewTop = finalScrollViewNode[0].top;
              let scrollViewHeight = this.windowHeight - scrollViewTop;
              scrollViewHeight -= finalScrollBottomNode ? finalScrollBottomNode[0].height : 0;
              const additionHeight = u.convertToPx(this.autoHeightAddition);
              let importantSuffix = " !important";
              const finalHeight = scrollViewHeight + additionHeight - (this.insideMore ? 1 : 0) + "px" + importantSuffix;
              this.$set(this.scrollViewStyle, heightKey, finalHeight);
              this.$set(this.scrollViewInStyle, heightKey, finalHeight);
            }
          } else {
            this.$delete(this.scrollViewStyle, heightKey);
            this.$delete(this.scrollViewInStyle, heightKey);
          }
        } catch (e) {
        }
      },
      // 更新scroll-view高度
      async _updateScrollViewHeight() {
        const scrollViewNode = await this._getNodeClientRect(".zp-scroll-view");
        if (scrollViewNode) {
          const scrollViewNodeHeight = scrollViewNode[0].height;
          this.scrollViewHeight = scrollViewNodeHeight;
          this.pagingOrgTop = scrollViewNode[0].top;
        }
      },
      // 组件销毁后续处理
      _handleUnmounted() {
        this.active = false;
        if (!this.layoutOnly) {
          this._offEmit();
        }
        this.useChatRecordMode && uni.offKeyboardHeightChange(this._handleKeyboardHeightChange);
      },
      // 触发更新是否超出页面状态
      _updateInsideOfPaging() {
        this.insideMore && this.insideOfPaging === true && setTimeout(this.doLoadMore, 200);
      },
      // 清除timeout
      _cleanTimeout(timeout) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        return timeout;
      },
      // 添加全局emit监听
      _onEmit() {
        uni.$on(c.errorUpdateKey, (errorMsg) => {
          if (this.loading) {
            if (!!errorMsg) {
              this.customerEmptyViewErrorText = errorMsg;
            }
            this.complete(false).catch(() => {
            });
          }
        });
        uni.$on(c.completeUpdateKey, (data) => {
          setTimeout(() => {
            if (this.loading) {
              if (!this.disabledCompleteEmit) {
                const type = data.type || "normal";
                const list = data.list || data;
                const rule = data.rule;
                this.fromCompleteEmit = true;
                switch (type) {
                  case "normal":
                    this.complete(list);
                    break;
                  case "total":
                    this.completeByTotal(list, rule);
                    break;
                  case "nomore":
                    this.completeByNoMore(list, rule);
                    break;
                  case "key":
                    this.completeByKey(list, rule);
                    break;
                }
              } else {
                this.disabledCompleteEmit = false;
              }
            }
          }, 1);
        });
      },
      // 销毁全局emit和listener监听
      _offEmit() {
        uni.$off(c.errorUpdateKey);
        uni.$off(c.completeUpdateKey);
      }
    }
  };
  const block0 = (Comp) => {
    (Comp.$renderjs || (Comp.$renderjs = [])).push("pagingRenderjs");
    (Comp.$renderjsModules || (Comp.$renderjsModules = {}))["pagingRenderjs"] = "463e3cc3";
  };
  const block1 = (Comp) => {
    (Comp.$wxs || (Comp.$wxs = [])).push("pagingWxs");
    (Comp.$wxsModules || (Comp.$wxsModules = {}))["pagingWxs"] = "42613348";
  };
  function _sfc_render$p(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_z_paging_refresh = vue.resolveComponent("z-paging-refresh");
    const _component_z_paging_load_more = vue.resolveComponent("z-paging-load-more");
    const _component_z_paging_empty_view = resolveEasycom(vue.resolveDynamicComponent("z-paging-empty-view"), __easycom_0$3);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass([{ "z-paging-content": true, "z-paging-content-full": !_ctx.usePageScroll, "z-paging-content-fixed": !_ctx.usePageScroll && _ctx.fixed, "z-paging-content-page": _ctx.usePageScroll, "z-paging-reached-top": _ctx.renderPropScrollTop < 1, "z-paging-use-chat-record-mode": _ctx.useChatRecordMode }, _ctx.pagingClass]),
        style: vue.normalizeStyle([_ctx.finalPagingStyle])
      },
      [
        _ctx.showF2 && _ctx.showRefresherF2 ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            onTouchmove: _cache[0] || (_cache[0] = vue.withModifiers(() => {
            }, ["stop", "prevent"])),
            class: "zp-f2-content",
            style: vue.normalizeStyle([{ "transform": _ctx.f2Transform, "transition": `transform .2s linear`, "height": _ctx.superContentHeight + "px", "z-index": _ctx.f2ZIndex }])
          },
          [
            vue.renderSlot(_ctx.$slots, "f2", {}, void 0, true)
          ],
          36
          /* STYLE, NEED_HYDRATION */
        )) : vue.createCommentVNode("v-if", true),
        _ctx.zSlots.top ? (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          { key: 1 },
          [
            !_ctx.usePageScroll ? vue.renderSlot(_ctx.$slots, "top", { key: 0 }, void 0, true) : (vue.openBlock(), vue.createElementBlock(
              "view",
              {
                key: 1,
                class: "zp-page-top",
                onTouchmove: _cache[1] || (_cache[1] = vue.withModifiers(() => {
                }, ["stop", "prevent"])),
                style: vue.normalizeStyle([{ "top": `${_ctx.windowTop}px`, "z-index": _ctx.topZIndex }])
              },
              [
                vue.renderSlot(_ctx.$slots, "top", {}, void 0, true)
              ],
              36
              /* STYLE, NEED_HYDRATION */
            ))
          ],
          64
          /* STABLE_FRAGMENT */
        )) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass({ "zp-view-super": true, "zp-scroll-view-super": !_ctx.usePageScroll }),
            style: vue.normalizeStyle([_ctx.finalScrollViewStyle])
          },
          [
            _ctx.zSlots.left ? (vue.openBlock(), vue.createElementBlock(
              "view",
              {
                key: 0,
                class: vue.normalizeClass({ "zp-page-left": true, "zp-absoulte": _ctx.finalIsOldWebView })
              },
              [
                vue.renderSlot(_ctx.$slots, "left", {}, void 0, true)
              ],
              2
              /* CLASS */
            )) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass({ "zp-scroll-view-container": true, "zp-absoulte": _ctx.finalIsOldWebView }),
                style: vue.normalizeStyle([_ctx.scrollViewContainerStyle])
              },
              [
                vue.createElementVNode("scroll-view", {
                  ref: "zp-scroll-view",
                  class: vue.normalizeClass({ "zp-scroll-view": true, "zp-scroll-view-absolute": !_ctx.usePageScroll, "zp-scroll-view-hide-scrollbar": !_ctx.showScrollbar }),
                  style: vue.normalizeStyle([_ctx.chatRecordRotateStyle]),
                  "scroll-top": _ctx.scrollTop,
                  "scroll-left": _ctx.scrollLeft,
                  "scroll-x": _ctx.scrollX,
                  "scroll-y": _ctx.finalScrollable,
                  "enable-back-to-top": _ctx.finalEnableBackToTop,
                  "show-scrollbar": _ctx.showScrollbar,
                  "scroll-with-animation": _ctx.finalScrollWithAnimation,
                  "scroll-into-view": _ctx.scrollIntoView,
                  "lower-threshold": _ctx.finalLowerThreshold,
                  "upper-threshold": 5,
                  "refresher-enabled": _ctx.finalRefresherEnabled && !_ctx.useCustomRefresher,
                  "refresher-threshold": _ctx.finalRefresherThreshold,
                  "refresher-default-style": _ctx.finalRefresherDefaultStyle,
                  "refresher-background": _ctx.refresherBackground,
                  "refresher-triggered": _ctx.finalRefresherTriggered,
                  onScroll: _cache[12] || (_cache[12] = (...args) => _ctx._scroll && _ctx._scroll(...args)),
                  onScrolltolower: _cache[13] || (_cache[13] = (...args) => _ctx._onScrollToLower && _ctx._onScrollToLower(...args)),
                  onScrolltoupper: _cache[14] || (_cache[14] = (...args) => _ctx._onScrollToUpper && _ctx._onScrollToUpper(...args)),
                  onRefresherrestore: _cache[15] || (_cache[15] = (...args) => _ctx._onRestore && _ctx._onRestore(...args)),
                  onRefresherrefresh: _cache[16] || (_cache[16] = ($event) => _ctx._onRefresh(true))
                }, [
                  vue.createElementVNode(
                    "view",
                    {
                      class: "zp-paging-touch-view",
                      onTouchstart: _cache[4] || (_cache[4] = (...args) => _ctx.pagingWxs.touchstart && _ctx.pagingWxs.touchstart(...args)),
                      onTouchmove: _cache[5] || (_cache[5] = (...args) => _ctx.pagingWxs.touchmove && _ctx.pagingWxs.touchmove(...args)),
                      onTouchend: _cache[6] || (_cache[6] = (...args) => _ctx.pagingWxs.touchend && _ctx.pagingWxs.touchend(...args)),
                      onTouchcancel: _cache[7] || (_cache[7] = (...args) => _ctx.pagingWxs.touchend && _ctx.pagingWxs.touchend(...args)),
                      onMousedown: _cache[8] || (_cache[8] = (...args) => _ctx.pagingWxs.mousedown && _ctx.pagingWxs.mousedown(...args)),
                      onMousemove: _cache[9] || (_cache[9] = (...args) => _ctx.pagingWxs.mousemove && _ctx.pagingWxs.mousemove(...args)),
                      onMouseup: _cache[10] || (_cache[10] = (...args) => _ctx.pagingWxs.mouseup && _ctx.pagingWxs.mouseup(...args)),
                      onMouseleave: _cache[11] || (_cache[11] = (...args) => _ctx.pagingWxs.mouseleave && _ctx.pagingWxs.mouseleave(...args))
                    },
                    [
                      _ctx.finalRefresherFixedBacHeight > 0 ? (vue.openBlock(), vue.createElementBlock(
                        "view",
                        {
                          key: 0,
                          class: "zp-fixed-bac-view",
                          style: vue.normalizeStyle([{ "background": _ctx.refresherFixedBackground, "height": `${_ctx.finalRefresherFixedBacHeight}px` }])
                        },
                        null,
                        4
                        /* STYLE */
                      )) : vue.createCommentVNode("v-if", true),
                      vue.createElementVNode("view", {
                        class: "zp-paging-main",
                        style: vue.normalizeStyle([_ctx.scrollViewInStyle, { "transform": _ctx.finalRefresherTransform, "transition": _ctx.refresherTransition }]),
                        "change:prop": _ctx.pagingWxs.propObserver,
                        prop: vue.wp(_ctx.wxsPropType),
                        "data-refresherThreshold": _ctx.finalRefresherThreshold,
                        "data-refresherF2Enabled": _ctx.refresherF2Enabled,
                        "data-refresherF2Threshold": _ctx.finalRefresherF2Threshold,
                        "data-isIos": _ctx.isIos,
                        "data-loading": _ctx.loading || _ctx.isRefresherInComplete,
                        "data-useChatRecordMode": _ctx.useChatRecordMode,
                        "data-refresherEnabled": _ctx.finalRefresherEnabled,
                        "data-useCustomRefresher": _ctx.useCustomRefresher,
                        "data-pageScrollTop": _ctx.wxsPageScrollTop,
                        "data-scrollTop": _ctx.wxsScrollTop,
                        "data-refresherMaxAngle": _ctx.refresherMaxAngle,
                        "data-refresherNoTransform": _ctx.refresherNoTransform,
                        "data-refresherAecc": _ctx.refresherAngleEnableChangeContinued,
                        "data-usePageScroll": _ctx.usePageScroll,
                        "data-watchTouchDirectionChange": _ctx.watchTouchDirectionChange,
                        "data-oldIsTouchmoving": _ctx.isTouchmoving,
                        "data-refresherOutRate": _ctx.finalRefresherOutRate,
                        "data-refresherPullRate": _ctx.finalRefresherPullRate,
                        "data-hasTouchmove": _ctx.hasTouchmove,
                        "change:renderPropIsIosAndH5": _ctx.pagingRenderjs.renderPropIsIosAndH5Change,
                        renderPropIsIosAndH5: vue.wp(_ctx.isIosAndH5)
                      }, [
                        _ctx.showRefresher ? (vue.openBlock(), vue.createElementBlock(
                          "view",
                          {
                            key: 0,
                            class: "zp-custom-refresher-view",
                            style: vue.normalizeStyle([{ "margin-top": `-${_ctx.finalRefresherThreshold + _ctx.refresherThresholdUpdateTag}px`, "background": _ctx.refresherBackground, "opacity": _ctx.isTouchmoving ? 1 : 0 }])
                          },
                          [
                            vue.createElementVNode(
                              "view",
                              {
                                class: "zp-custom-refresher-container",
                                style: vue.normalizeStyle([{ "height": `${_ctx.finalRefresherThreshold}px`, "background": _ctx.refresherBackground }])
                              },
                              [
                                _ctx.useRefresherStatusBarPlaceholder ? (vue.openBlock(), vue.createElementBlock(
                                  "view",
                                  {
                                    key: 0,
                                    class: "zp-custom-refresher-status-bar-placeholder",
                                    style: vue.normalizeStyle([{ "height": `${_ctx.statusBarHeight}px` }])
                                  },
                                  null,
                                  4
                                  /* STYLE */
                                )) : vue.createCommentVNode("v-if", true),
                                vue.createElementVNode("view", { class: "zp-custom-refresher-slot-view" }, [
                                  !(_ctx.zSlots.refresherComplete && _ctx.refresherStatus === _ctx.R.Complete) && !(_ctx.zSlots.refresherF2 && _ctx.refresherStatus === _ctx.R.GoF2) ? vue.renderSlot(_ctx.$slots, "refresher", {
                                    key: 0,
                                    refresherStatus: _ctx.refresherStatus
                                  }, void 0, true) : vue.createCommentVNode("v-if", true)
                                ]),
                                _ctx.zSlots.refresherComplete && _ctx.refresherStatus === _ctx.R.Complete ? vue.renderSlot(_ctx.$slots, "refresherComplete", { key: 1 }, void 0, true) : _ctx.zSlots.refresherF2 && _ctx.refresherStatus === _ctx.R.GoF2 ? vue.renderSlot(_ctx.$slots, "refresherF2", { key: 2 }, void 0, true) : !_ctx.showCustomRefresher ? (vue.openBlock(), vue.createBlock(_component_z_paging_refresh, {
                                  key: 3,
                                  ref: "refresh",
                                  class: "zp-custom-refresher-refresh",
                                  style: vue.normalizeStyle([{ "height": `${_ctx.finalRefresherThreshold - _ctx.finalRefresherThresholdPlaceholder}px` }]),
                                  status: _ctx.refresherStatus,
                                  defaultThemeStyle: _ctx.finalRefresherThemeStyle,
                                  defaultText: _ctx.finalRefresherDefaultText,
                                  isIos: _ctx.isIos,
                                  pullingText: _ctx.finalRefresherPullingText,
                                  refreshingText: _ctx.finalRefresherRefreshingText,
                                  completeText: _ctx.finalRefresherCompleteText,
                                  goF2Text: _ctx.finalRefresherGoF2Text,
                                  defaultImg: _ctx.refresherDefaultImg,
                                  pullingImg: _ctx.refresherPullingImg,
                                  refreshingImg: _ctx.refresherRefreshingImg,
                                  completeImg: _ctx.refresherCompleteImg,
                                  refreshingAnimated: _ctx.refresherRefreshingAnimated,
                                  showUpdateTime: _ctx.showRefresherUpdateTime,
                                  updateTimeKey: _ctx.refresherUpdateTimeKey,
                                  updateTimeTextMap: _ctx.finalRefresherUpdateTimeTextMap,
                                  imgStyle: _ctx.refresherImgStyle,
                                  titleStyle: _ctx.refresherTitleStyle,
                                  updateTimeStyle: _ctx.refresherUpdateTimeStyle,
                                  unit: _ctx.unit
                                }, null, 8, ["style", "status", "defaultThemeStyle", "defaultText", "isIos", "pullingText", "refreshingText", "completeText", "goF2Text", "defaultImg", "pullingImg", "refreshingImg", "completeImg", "refreshingAnimated", "showUpdateTime", "updateTimeKey", "updateTimeTextMap", "imgStyle", "titleStyle", "updateTimeStyle", "unit"])) : vue.createCommentVNode("v-if", true)
                              ],
                              4
                              /* STYLE */
                            )
                          ],
                          4
                          /* STYLE */
                        )) : vue.createCommentVNode("v-if", true),
                        vue.createElementVNode(
                          "view",
                          {
                            class: "zp-paging-container",
                            style: vue.normalizeStyle([{ justifyContent: _ctx.useChatRecordMode ? "flex-end" : "flex-start" }])
                          },
                          [
                            _ctx.showLoading && _ctx.zSlots.loading && !_ctx.loadingFullFixed ? vue.renderSlot(_ctx.$slots, "loading", { key: 0 }, void 0, true) : vue.createCommentVNode("v-if", true),
                            vue.createElementVNode(
                              "view",
                              {
                                class: "zp-paging-container-content",
                                style: vue.normalizeStyle([_ctx.finalPlaceholderTopHeightStyle, _ctx.finalPagingContentStyle])
                              },
                              [
                                _ctx.useVirtualList ? (vue.openBlock(), vue.createElementBlock(
                                  "view",
                                  {
                                    key: 0,
                                    class: "zp-virtual-placeholder",
                                    style: vue.normalizeStyle([{ height: _ctx.virtualPlaceholderTopHeight + "px" }])
                                  },
                                  null,
                                  4
                                  /* STYLE */
                                )) : vue.createCommentVNode("v-if", true),
                                vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
                                _ctx.finalUseInnerList ? (vue.openBlock(), vue.createElementBlock(
                                  vue.Fragment,
                                  { key: 1 },
                                  [
                                    vue.renderSlot(_ctx.$slots, "header", {}, void 0, true),
                                    vue.createElementVNode(
                                      "view",
                                      {
                                        class: "zp-list-container",
                                        style: vue.normalizeStyle([_ctx.innerListStyle])
                                      },
                                      [
                                        _ctx.finalUseVirtualList ? (vue.openBlock(true), vue.createElementBlock(
                                          vue.Fragment,
                                          { key: 0 },
                                          vue.renderList(_ctx.virtualList, (item, index) => {
                                            return vue.openBlock(), vue.createElementBlock("view", {
                                              class: "zp-list-cell",
                                              style: vue.normalizeStyle([_ctx.innerCellStyle]),
                                              id: `${_ctx.fianlVirtualCellIdPrefix}-${item[_ctx.virtualCellIndexKey]}`,
                                              key: item["zp_unique_index"],
                                              onClick: ($event) => _ctx._innerCellClick(item, _ctx.virtualTopRangeIndex + index)
                                            }, [
                                              _ctx.useCompatibilityMode ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, "使用兼容模式请在组件源码z-paging.vue第105行中注释这一行，并打开下面一行注释")) : vue.renderSlot(_ctx.$slots, "cell", {
                                                key: 1,
                                                item,
                                                index: _ctx.virtualTopRangeIndex + index
                                              }, void 0, true)
                                            ], 12, ["id", "onClick"]);
                                          }),
                                          128
                                          /* KEYED_FRAGMENT */
                                        )) : (vue.openBlock(true), vue.createElementBlock(
                                          vue.Fragment,
                                          { key: 1 },
                                          vue.renderList(_ctx.realTotalData, (item, index) => {
                                            return vue.openBlock(), vue.createElementBlock("view", {
                                              class: "zp-list-cell",
                                              key: index,
                                              onClick: ($event) => _ctx._innerCellClick(item, index)
                                            }, [
                                              vue.renderSlot(_ctx.$slots, "cell", {
                                                item,
                                                index
                                              }, void 0, true)
                                            ], 8, ["onClick"]);
                                          }),
                                          128
                                          /* KEYED_FRAGMENT */
                                        ))
                                      ],
                                      4
                                      /* STYLE */
                                    ),
                                    vue.renderSlot(_ctx.$slots, "footer", {}, void 0, true)
                                  ],
                                  64
                                  /* STABLE_FRAGMENT */
                                )) : vue.createCommentVNode("v-if", true),
                                _ctx.useChatRecordMode && _ctx.realTotalData.length >= _ctx.defaultPageSize && (_ctx.loadingStatus !== _ctx.M.NoMore || _ctx.zSlots.chatNoMore) && (_ctx.realTotalData.length || _ctx.showChatLoadingWhenReload && _ctx.showLoading) && !_ctx.isFirstPageAndNoMore ? (vue.openBlock(), vue.createElementBlock(
                                  "view",
                                  {
                                    key: 2,
                                    style: vue.normalizeStyle([_ctx.chatRecordRotateStyle])
                                  },
                                  [
                                    _ctx.loadingStatus === _ctx.M.NoMore && _ctx.zSlots.chatNoMore ? vue.renderSlot(_ctx.$slots, "chatNoMore", { key: 0 }, void 0, true) : (vue.openBlock(), vue.createElementBlock(
                                      vue.Fragment,
                                      { key: 1 },
                                      [
                                        _ctx.zSlots.chatLoading ? vue.renderSlot(_ctx.$slots, "chatLoading", {
                                          key: 0,
                                          loadingMoreStatus: _ctx.loadingStatus
                                        }, void 0, true) : (vue.openBlock(), vue.createBlock(_component_z_paging_load_more, {
                                          key: 1,
                                          onDoClick: _cache[2] || (_cache[2] = ($event) => _ctx._onLoadingMore("click")),
                                          zConfig: _ctx.zLoadMoreConfig
                                        }, null, 8, ["zConfig"]))
                                      ],
                                      64
                                      /* STABLE_FRAGMENT */
                                    ))
                                  ],
                                  4
                                  /* STYLE */
                                )) : vue.createCommentVNode("v-if", true),
                                _ctx.useVirtualList ? (vue.openBlock(), vue.createElementBlock(
                                  "view",
                                  {
                                    key: 3,
                                    class: "zp-virtual-placeholder",
                                    style: vue.normalizeStyle([{ height: _ctx.virtualPlaceholderBottomHeight + "px" }])
                                  },
                                  null,
                                  4
                                  /* STYLE */
                                )) : vue.createCommentVNode("v-if", true),
                                _ctx.showLoadingMoreDefault ? vue.renderSlot(_ctx.$slots, "loadingMoreDefault", { key: 4 }, void 0, true) : _ctx.showLoadingMoreLoading ? vue.renderSlot(_ctx.$slots, "loadingMoreLoading", { key: 5 }, void 0, true) : _ctx.showLoadingMoreNoMore ? vue.renderSlot(_ctx.$slots, "loadingMoreNoMore", { key: 6 }, void 0, true) : _ctx.showLoadingMoreFail ? vue.renderSlot(_ctx.$slots, "loadingMoreFail", { key: 7 }, void 0, true) : _ctx.showLoadingMoreCustom ? (vue.openBlock(), vue.createBlock(_component_z_paging_load_more, {
                                  key: 8,
                                  onDoClick: _cache[3] || (_cache[3] = ($event) => _ctx._onLoadingMore("click")),
                                  zConfig: _ctx.zLoadMoreConfig
                                }, null, 8, ["zConfig"])) : vue.createCommentVNode("v-if", true),
                                _ctx.safeAreaInsetBottom && _ctx.finalUseSafeAreaPlaceholder && !_ctx.useChatRecordMode ? (vue.openBlock(), vue.createElementBlock(
                                  "view",
                                  {
                                    key: 9,
                                    class: "zp-safe-area-placeholder",
                                    style: vue.normalizeStyle([{ height: _ctx.safeAreaBottom + "px" }])
                                  },
                                  null,
                                  4
                                  /* STYLE */
                                )) : vue.createCommentVNode("v-if", true)
                              ],
                              4
                              /* STYLE */
                            ),
                            _ctx.showEmpty ? (vue.openBlock(), vue.createElementBlock(
                              "view",
                              {
                                key: 1,
                                class: vue.normalizeClass({ "zp-empty-view": true, "zp-empty-view-center": _ctx.emptyViewCenter }),
                                style: vue.normalizeStyle([_ctx.emptyViewSuperStyle, _ctx.chatRecordRotateStyle])
                              },
                              [
                                _ctx.zSlots.empty ? vue.renderSlot(_ctx.$slots, "empty", {
                                  key: 0,
                                  isLoadFailed: _ctx.isLoadFailed
                                }, void 0, true) : (vue.openBlock(), vue.createBlock(_component_z_paging_empty_view, {
                                  key: 1,
                                  emptyViewImg: _ctx.finalEmptyViewImg,
                                  emptyViewText: _ctx.finalEmptyViewText,
                                  showEmptyViewReload: _ctx.finalShowEmptyViewReload,
                                  emptyViewReloadText: _ctx.finalEmptyViewReloadText,
                                  isLoadFailed: _ctx.isLoadFailed,
                                  emptyViewStyle: _ctx.emptyViewStyle,
                                  emptyViewTitleStyle: _ctx.emptyViewTitleStyle,
                                  emptyViewImgStyle: _ctx.emptyViewImgStyle,
                                  emptyViewReloadStyle: _ctx.emptyViewReloadStyle,
                                  emptyViewZIndex: _ctx.emptyViewZIndex,
                                  emptyViewFixed: _ctx.emptyViewFixed,
                                  unit: _ctx.unit,
                                  onReload: _ctx._emptyViewReload,
                                  onViewClick: _ctx._emptyViewClick
                                }, null, 8, ["emptyViewImg", "emptyViewText", "showEmptyViewReload", "emptyViewReloadText", "isLoadFailed", "emptyViewStyle", "emptyViewTitleStyle", "emptyViewImgStyle", "emptyViewReloadStyle", "emptyViewZIndex", "emptyViewFixed", "unit", "onReload", "onViewClick"]))
                              ],
                              6
                              /* CLASS, STYLE */
                            )) : vue.createCommentVNode("v-if", true)
                          ],
                          4
                          /* STYLE */
                        )
                      ], 12, ["change:prop", "prop", "data-refresherThreshold", "data-refresherF2Enabled", "data-refresherF2Threshold", "data-isIos", "data-loading", "data-useChatRecordMode", "data-refresherEnabled", "data-useCustomRefresher", "data-pageScrollTop", "data-scrollTop", "data-refresherMaxAngle", "data-refresherNoTransform", "data-refresherAecc", "data-usePageScroll", "data-watchTouchDirectionChange", "data-oldIsTouchmoving", "data-refresherOutRate", "data-refresherPullRate", "data-hasTouchmove", "change:renderPropIsIosAndH5", "renderPropIsIosAndH5"])
                    ],
                    32
                    /* NEED_HYDRATION */
                  )
                ], 46, ["scroll-top", "scroll-left", "scroll-x", "scroll-y", "enable-back-to-top", "show-scrollbar", "scroll-with-animation", "scroll-into-view", "lower-threshold", "refresher-enabled", "refresher-threshold", "refresher-default-style", "refresher-background", "refresher-triggered"])
              ],
              6
              /* CLASS, STYLE */
            ),
            _ctx.zSlots.right ? (vue.openBlock(), vue.createElementBlock(
              "view",
              {
                key: 1,
                class: vue.normalizeClass({ "zp-page-right": true, "zp-absoulte zp-right": _ctx.finalIsOldWebView })
              },
              [
                vue.renderSlot(_ctx.$slots, "right", {}, void 0, true)
              ],
              2
              /* CLASS */
            )) : vue.createCommentVNode("v-if", true)
          ],
          6
          /* CLASS, STYLE */
        ),
        vue.createElementVNode(
          "view",
          {
            class: "zp-page-bottom-container",
            style: vue.normalizeStyle({ "background": _ctx.bottomBgColor })
          },
          [
            _ctx.zSlots.bottom ? (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 0 },
              [
                !_ctx.usePageScroll ? vue.renderSlot(_ctx.$slots, "bottom", { key: 0 }, void 0, true) : (vue.openBlock(), vue.createElementBlock(
                  "view",
                  {
                    key: 1,
                    class: "zp-page-bottom",
                    onTouchmove: _cache[17] || (_cache[17] = vue.withModifiers(() => {
                    }, ["stop", "prevent"])),
                    style: vue.normalizeStyle([{ "bottom": `${_ctx.windowBottom}px`, "background": _ctx.bottomBgColor }])
                  },
                  [
                    vue.renderSlot(_ctx.$slots, "bottom", {}, void 0, true),
                    _ctx.safeAreaInsetBottom ? (vue.openBlock(), vue.createElementBlock(
                      "view",
                      {
                        key: 0,
                        style: vue.normalizeStyle([{ height: _ctx.safeAreaBottom + "px" }])
                      },
                      null,
                      4
                      /* STYLE */
                    )) : vue.createCommentVNode("v-if", true)
                  ],
                  36
                  /* STYLE, NEED_HYDRATION */
                ))
              ],
              64
              /* STABLE_FRAGMENT */
            )) : vue.createCommentVNode("v-if", true),
            _ctx.safeAreaInsetBottom && !_ctx.usePageScroll && !_ctx.finalUseSafeAreaPlaceholder && !_ctx.useChatRecordMode ? (vue.openBlock(), vue.createElementBlock(
              "view",
              {
                key: 1,
                style: vue.normalizeStyle([{ height: _ctx.safeAreaBottom + "px" }])
              },
              null,
              4
              /* STYLE */
            )) : vue.createCommentVNode("v-if", true),
            _ctx.useChatRecordMode && _ctx.autoAdjustPositionWhenChat ? (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 2 },
              [
                vue.createElementVNode(
                  "view",
                  {
                    style: vue.normalizeStyle([{ height: _ctx.chatRecordModeSafeAreaBottom + "px" }])
                  },
                  null,
                  4
                  /* STYLE */
                ),
                vue.createElementVNode(
                  "view",
                  {
                    class: "zp-page-bottom-keyboard-placeholder-animate",
                    style: vue.normalizeStyle([{ height: _ctx.keyboardHeight + "px" }])
                  },
                  null,
                  4
                  /* STYLE */
                )
              ],
              64
              /* STABLE_FRAGMENT */
            )) : vue.createCommentVNode("v-if", true)
          ],
          4
          /* STYLE */
        ),
        _ctx.showBackToTopClass ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 2,
            class: vue.normalizeClass(_ctx.finalBackToTopClass),
            style: vue.normalizeStyle([_ctx.finalBackToTopStyle]),
            onClick: _cache[18] || (_cache[18] = vue.withModifiers((...args) => _ctx._backToTopClick && _ctx._backToTopClick(...args), ["stop"]))
          },
          [
            _ctx.zSlots.backToTop ? vue.renderSlot(_ctx.$slots, "backToTop", { key: 0 }, void 0, true) : (vue.openBlock(), vue.createElementBlock("image", {
              key: 1,
              class: vue.normalizeClass(["zp-back-to-top-img", { "zp-back-to-top-img-inversion": _ctx.useChatRecordMode && !_ctx.backToTopImg.length }]),
              src: _ctx.backToTopImg.length ? _ctx.backToTopImg : _ctx.base64BackToTop
            }, null, 10, ["src"]))
          ],
          6
          /* CLASS, STYLE */
        )) : vue.createCommentVNode("v-if", true),
        _ctx.showLoading && _ctx.zSlots.loading && _ctx.loadingFullFixed ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 3,
          class: "zp-loading-fixed"
        }, [
          vue.renderSlot(_ctx.$slots, "loading", {}, void 0, true)
        ])) : vue.createCommentVNode("v-if", true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  if (typeof block0 === "function")
    block0(_sfc_main$q);
  if (typeof block1 === "function")
    block1(_sfc_main$q);
  const __easycom_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["render", _sfc_render$p], ["__scopeId", "data-v-1aa372d7"], ["__file", "E:/cityInvestment02/city-Investment/uni_modules/z-paging/components/z-paging/z-paging.vue"]]);
  function throttle(fn, gapTime) {
    if (gapTime == null || gapTime == void 0) {
      gapTime = 1500;
    }
    let _lastTime = null;
    return function() {
      let _nowTime = +/* @__PURE__ */ new Date();
      if (_nowTime - _lastTime > gapTime || !_lastTime) {
        fn.apply(this, arguments);
        _lastTime = _nowTime;
      }
    };
  }
  function formatRelativeTime(dateString) {
    if (!dateString)
      return "";
    const now = /* @__PURE__ */ new Date();
    const targetDate = new Date(dateString);
    if (isNaN(targetDate.getTime())) {
      return dateString;
    }
    const diffInSeconds = Math.floor((now - targetDate) / 1e3);
    if (diffInSeconds < 60) {
      return "刚刚";
    }
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes}分钟前`;
    }
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours}小时前`;
    }
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return `${diffInDays}天前`;
    }
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return `${diffInMonths}个月前`;
    }
    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears}年前`;
  }
  function formatNumber(num) {
    if (num === null || num === void 0 || isNaN(num)) {
      return "0.00";
    }
    return Number(num).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
  function formatDateTime(dateString) {
    if (!dateString)
      return "";
    return dateString.substring(0, 16);
  }
  function formatDateTimeMinute(dateString) {
    if (!dateString)
      return "";
    return dateString.substring(0, 10);
  }
  class MPAnimation {
    constructor(options, _this) {
      this.options = options;
      this.animation = uni.createAnimation({
        ...options
      });
      this.currentStepAnimates = {};
      this.next = 0;
      this.$ = _this;
    }
    _nvuePushAnimates(type, args) {
      let aniObj = this.currentStepAnimates[this.next];
      let styles = {};
      if (!aniObj) {
        styles = {
          styles: {},
          config: {}
        };
      } else {
        styles = aniObj;
      }
      if (animateTypes1.includes(type)) {
        if (!styles.styles.transform) {
          styles.styles.transform = "";
        }
        let unit = "";
        if (type === "rotate") {
          unit = "deg";
        }
        styles.styles.transform += `${type}(${args + unit}) `;
      } else {
        styles.styles[type] = `${args}`;
      }
      this.currentStepAnimates[this.next] = styles;
    }
    _animateRun(styles = {}, config2 = {}) {
      let ref = this.$.$refs["ani"].ref;
      if (!ref)
        return;
      return new Promise((resolve, reject) => {
        nvueAnimation.transition(ref, {
          styles,
          ...config2
        }, (res) => {
          resolve();
        });
      });
    }
    _nvueNextAnimate(animates, step = 0, fn) {
      let obj = animates[step];
      if (obj) {
        let {
          styles,
          config: config2
        } = obj;
        this._animateRun(styles, config2).then(() => {
          step += 1;
          this._nvueNextAnimate(animates, step, fn);
        });
      } else {
        this.currentStepAnimates = {};
        typeof fn === "function" && fn();
        this.isEnd = true;
      }
    }
    step(config2 = {}) {
      this.animation.step(config2);
      return this;
    }
    run(fn) {
      this.$.animationData = this.animation.export();
      this.$.timer = setTimeout(() => {
        typeof fn === "function" && fn();
      }, this.$.durationTime);
    }
  }
  const animateTypes1 = [
    "matrix",
    "matrix3d",
    "rotate",
    "rotate3d",
    "rotateX",
    "rotateY",
    "rotateZ",
    "scale",
    "scale3d",
    "scaleX",
    "scaleY",
    "scaleZ",
    "skew",
    "skewX",
    "skewY",
    "translate",
    "translate3d",
    "translateX",
    "translateY",
    "translateZ"
  ];
  const animateTypes2 = ["opacity", "backgroundColor"];
  const animateTypes3 = ["width", "height", "left", "right", "top", "bottom"];
  animateTypes1.concat(animateTypes2, animateTypes3).forEach((type) => {
    MPAnimation.prototype[type] = function(...args) {
      this.animation[type](...args);
      return this;
    };
  });
  function createAnimation(option, _this) {
    if (!_this)
      return;
    clearTimeout(_this.timer);
    return new MPAnimation(option, _this);
  }
  const _sfc_main$p = {
    name: "uniTransition",
    emits: ["click", "change"],
    props: {
      show: {
        type: Boolean,
        default: false
      },
      modeClass: {
        type: [Array, String],
        default() {
          return "fade";
        }
      },
      duration: {
        type: Number,
        default: 300
      },
      styles: {
        type: Object,
        default() {
          return {};
        }
      },
      customClass: {
        type: String,
        default: ""
      },
      onceRender: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isShow: false,
        transform: "",
        opacity: 0,
        animationData: {},
        durationTime: 300,
        config: {}
      };
    },
    watch: {
      show: {
        handler(newVal) {
          if (newVal) {
            this.open();
          } else {
            if (this.isShow) {
              this.close();
            }
          }
        },
        immediate: true
      }
    },
    computed: {
      // 生成样式数据
      stylesObject() {
        let styles = {
          ...this.styles,
          "transition-duration": this.duration / 1e3 + "s"
        };
        let transform = "";
        for (let i in styles) {
          let line = this.toLine(i);
          transform += line + ":" + styles[i] + ";";
        }
        return transform;
      },
      // 初始化动画条件
      transformStyles() {
        return "transform:" + this.transform + ";opacity:" + this.opacity + ";" + this.stylesObject;
      }
    },
    created() {
      this.config = {
        duration: this.duration,
        timingFunction: "ease",
        transformOrigin: "50% 50%",
        delay: 0
      };
      this.durationTime = this.duration;
    },
    methods: {
      /**
       *  ref 触发 初始化动画
       */
      init(obj = {}) {
        if (obj.duration) {
          this.durationTime = obj.duration;
        }
        this.animation = createAnimation(Object.assign(this.config, obj), this);
      },
      /**
       * 点击组件触发回调
       */
      onClick() {
        this.$emit("click", {
          detail: this.isShow
        });
      },
      /**
       * ref 触发 动画分组
       * @param {Object} obj
       */
      step(obj, config2 = {}) {
        if (!this.animation)
          return this;
        Object.keys(obj).forEach((key) => {
          const value = obj[key];
          if (typeof this.animation[key] === "function") {
            Array.isArray(value) ? this.animation[key](...value) : this.animation[key](value);
          }
        });
        this.animation.step(config2);
        return this;
      },
      /**
       *  ref 触发 执行动画
       */
      run(fn) {
        if (!this.animation)
          return;
        this.animation.run(fn);
      },
      // 开始过度动画
      open() {
        clearTimeout(this.timer);
        this.isShow = true;
        this.transform = this.styleInit(false).transform || "";
        this.opacity = this.styleInit(false).opacity || 0;
        this.$nextTick(() => {
          this.timer = setTimeout(() => {
            this.animation = createAnimation(this.config, this);
            this.tranfromInit(false).step();
            this.animation.run(() => {
              this.transform = "";
              this.opacity = this.styleInit(false).opacity || 1;
              this.$emit("change", {
                detail: this.isShow
              });
            });
          }, 80);
        });
      },
      // 关闭过度动画
      close(type) {
        if (!this.animation)
          return;
        this.tranfromInit(true).step().run(() => {
          this.isShow = false;
          this.animationData = null;
          this.animation = null;
          let { opacity, transform } = this.styleInit(false);
          this.opacity = opacity || 1;
          this.transform = transform;
          this.$emit("change", {
            detail: this.isShow
          });
        });
      },
      // 处理动画开始前的默认样式
      styleInit(type) {
        let styles = { transform: "", opacity: 1 };
        const buildStyle = (type2, mode) => {
          const value = this.animationType(type2)[mode];
          if (mode.startsWith("fade")) {
            styles.opacity = value;
          } else {
            styles.transform += value + " ";
          }
        };
        if (typeof this.modeClass === "string") {
          buildStyle(type, this.modeClass);
        } else {
          this.modeClass.forEach((mode) => buildStyle(type, mode));
        }
        return styles;
      },
      // 处理内置组合动画
      tranfromInit(type) {
        let buildTranfrom = (type2, mode) => {
          let aniNum = null;
          if (mode === "fade") {
            aniNum = type2 ? 0 : 1;
          } else {
            aniNum = type2 ? "-100%" : "0";
            if (mode === "zoom-in") {
              aniNum = type2 ? 0.8 : 1;
            }
            if (mode === "zoom-out") {
              aniNum = type2 ? 1.2 : 1;
            }
            if (mode === "slide-right") {
              aniNum = type2 ? "100%" : "0";
            }
            if (mode === "slide-bottom") {
              aniNum = type2 ? "100%" : "0";
            }
          }
          this.animation[this.animationMode()[mode]](aniNum);
        };
        if (typeof this.modeClass === "string") {
          buildTranfrom(type, this.modeClass);
        } else {
          this.modeClass.forEach((mode) => {
            buildTranfrom(type, mode);
          });
        }
        return this.animation;
      },
      animationType(type) {
        return {
          fade: type ? 1 : 0,
          "slide-top": `translateY(${type ? "0" : "-100%"})`,
          "slide-right": `translateX(${type ? "0" : "100%"})`,
          "slide-bottom": `translateY(${type ? "0" : "100%"})`,
          "slide-left": `translateX(${type ? "0" : "-100%"})`,
          "zoom-in": `scaleX(${type ? 1 : 0.8}) scaleY(${type ? 1 : 0.8})`,
          "zoom-out": `scaleX(${type ? 1 : 1.2}) scaleY(${type ? 1 : 1.2})`
        };
      },
      // 内置动画类型与实际动画对应字典
      animationMode() {
        return {
          fade: "opacity",
          "slide-top": "translateY",
          "slide-right": "translateX",
          "slide-bottom": "translateY",
          "slide-left": "translateX",
          "zoom-in": "scale",
          "zoom-out": "scale"
        };
      },
      // 驼峰转中横线
      toLine(name) {
        return name.replace(/([A-Z])/g, "-$1").toLowerCase();
      }
    }
  };
  function _sfc_render$o(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.withDirectives((vue.openBlock(), vue.createElementBlock("view", {
      ref: "ani",
      animation: $data.animationData,
      class: vue.normalizeClass($props.customClass),
      style: vue.normalizeStyle($options.transformStyles),
      onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 14, ["animation"])), [
      [vue.vShow, $data.isShow]
    ]);
  }
  const __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$o], ["__file", "E:/cityInvestment02/city-Investment/uni_modules/uni-transition/components/uni-transition/uni-transition.vue"]]);
  const _sfc_main$o = {
    name: "uniPopup",
    components: {},
    emits: ["change", "maskClick"],
    props: {
      // 开启动画
      animation: {
        type: Boolean,
        default: true
      },
      // 弹出层类型，可选值，top: 顶部弹出层；bottom：底部弹出层；center：全屏弹出层
      // message: 消息提示 ; dialog : 对话框
      type: {
        type: String,
        default: "center"
      },
      // maskClick
      isMaskClick: {
        type: Boolean,
        default: null
      },
      // TODO 2 个版本后废弃属性 ，使用 isMaskClick
      maskClick: {
        type: Boolean,
        default: null
      },
      backgroundColor: {
        type: String,
        default: "none"
      },
      safeArea: {
        type: Boolean,
        default: true
      },
      maskBackgroundColor: {
        type: String,
        default: "rgba(0, 0, 0, 0.4)"
      },
      borderRadius: {
        type: String
      }
    },
    watch: {
      /**
       * 监听type类型
       */
      type: {
        handler: function(type) {
          if (!this.config[type])
            return;
          this[this.config[type]](true);
        },
        immediate: true
      },
      isDesktop: {
        handler: function(newVal) {
          if (!this.config[newVal])
            return;
          this[this.config[this.type]](true);
        },
        immediate: true
      },
      /**
       * 监听遮罩是否可点击
       * @param {Object} val
       */
      maskClick: {
        handler: function(val) {
          this.mkclick = val;
        },
        immediate: true
      },
      isMaskClick: {
        handler: function(val) {
          this.mkclick = val;
        },
        immediate: true
      },
      // H5 下禁止底部滚动
      showPopup(show) {
      }
    },
    data() {
      return {
        duration: 300,
        ani: [],
        showPopup: false,
        showTrans: false,
        popupWidth: 0,
        popupHeight: 0,
        config: {
          top: "top",
          bottom: "bottom",
          center: "center",
          left: "left",
          right: "right",
          message: "top",
          dialog: "center",
          share: "bottom"
        },
        maskClass: {
          position: "fixed",
          bottom: 0,
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)"
        },
        transClass: {
          backgroundColor: "transparent",
          borderRadius: this.borderRadius || "0",
          position: "fixed",
          left: 0,
          right: 0
        },
        maskShow: true,
        mkclick: true,
        popupstyle: "top"
      };
    },
    computed: {
      getStyles() {
        let res = { backgroundColor: this.bg };
        if (this.borderRadius || "0") {
          res = Object.assign(res, { borderRadius: this.borderRadius });
        }
        return res;
      },
      isDesktop() {
        return this.popupWidth >= 500 && this.popupHeight >= 500;
      },
      bg() {
        if (this.backgroundColor === "" || this.backgroundColor === "none") {
          return "transparent";
        }
        return this.backgroundColor;
      }
    },
    mounted() {
      const fixSize = () => {
        const {
          windowWidth,
          windowHeight,
          windowTop,
          safeArea,
          screenHeight,
          safeAreaInsets
        } = uni.getSystemInfoSync();
        this.popupWidth = windowWidth;
        this.popupHeight = windowHeight + (windowTop || 0);
        if (safeArea && this.safeArea) {
          this.safeAreaInsets = safeAreaInsets.bottom;
        } else {
          this.safeAreaInsets = 0;
        }
      };
      fixSize();
    },
    // TODO vue3
    unmounted() {
      this.setH5Visible();
    },
    activated() {
      this.setH5Visible(!this.showPopup);
    },
    deactivated() {
      this.setH5Visible(true);
    },
    created() {
      if (this.isMaskClick === null && this.maskClick === null) {
        this.mkclick = true;
      } else {
        this.mkclick = this.isMaskClick !== null ? this.isMaskClick : this.maskClick;
      }
      if (this.animation) {
        this.duration = 300;
      } else {
        this.duration = 0;
      }
      this.messageChild = null;
      this.clearPropagation = false;
      this.maskClass.backgroundColor = this.maskBackgroundColor;
    },
    methods: {
      setH5Visible(visible = true) {
      },
      /**
       * 公用方法，不显示遮罩层
       */
      closeMask() {
        this.maskShow = false;
      },
      /**
       * 公用方法，遮罩层禁止点击
       */
      disableMask() {
        this.mkclick = false;
      },
      // TODO nvue 取消冒泡
      clear(e) {
        e.stopPropagation();
        this.clearPropagation = true;
      },
      open(direction) {
        if (this.showPopup) {
          return;
        }
        let innerType = ["top", "center", "bottom", "left", "right", "message", "dialog", "share"];
        if (!(direction && innerType.indexOf(direction) !== -1)) {
          direction = this.type;
        }
        if (!this.config[direction]) {
          formatAppLog("error", "at uni_modules/uni-popup/components/uni-popup/uni-popup.vue:310", "缺少类型：", direction);
          return;
        }
        this[this.config[direction]]();
        this.$emit("change", {
          show: true,
          type: direction
        });
      },
      close(type) {
        this.showTrans = false;
        this.$emit("change", {
          show: false,
          type: this.type
        });
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.showPopup = false;
        }, 300);
      },
      // TODO 处理冒泡事件，头条的冒泡事件有问题 ，先这样兼容
      touchstart() {
        this.clearPropagation = false;
      },
      onTap() {
        if (this.clearPropagation) {
          this.clearPropagation = false;
          return;
        }
        this.$emit("maskClick");
        if (!this.mkclick)
          return;
        this.close();
      },
      /**
       * 顶部弹出样式处理
       */
      top(type) {
        this.popupstyle = this.isDesktop ? "fixforpc-top" : "top";
        this.ani = ["slide-top"];
        this.transClass = {
          position: "fixed",
          left: 0,
          right: 0,
          backgroundColor: this.bg,
          borderRadius: this.borderRadius || "0"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
        this.$nextTick(() => {
          this.showPoptrans();
          if (this.messageChild && this.type === "message") {
            this.messageChild.timerClose();
          }
        });
      },
      /**
       * 底部弹出样式处理
       */
      bottom(type) {
        this.popupstyle = "bottom";
        this.ani = ["slide-bottom"];
        this.transClass = {
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          paddingBottom: this.safeAreaInsets + "px",
          backgroundColor: this.bg,
          borderRadius: this.borderRadius || "0"
        };
        if (type)
          return;
        this.showPoptrans();
      },
      /**
       * 中间弹出样式处理
       */
      center(type) {
        this.popupstyle = "center";
        this.ani = ["zoom-out", "fade"];
        this.transClass = {
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: this.borderRadius || "0"
        };
        if (type)
          return;
        this.showPoptrans();
      },
      left(type) {
        this.popupstyle = "left";
        this.ani = ["slide-left"];
        this.transClass = {
          position: "fixed",
          left: 0,
          bottom: 0,
          top: 0,
          backgroundColor: this.bg,
          borderRadius: this.borderRadius || "0",
          display: "flex",
          flexDirection: "column"
        };
        if (type)
          return;
        this.showPoptrans();
      },
      right(type) {
        this.popupstyle = "right";
        this.ani = ["slide-right"];
        this.transClass = {
          position: "fixed",
          bottom: 0,
          right: 0,
          top: 0,
          backgroundColor: this.bg,
          borderRadius: this.borderRadius || "0",
          display: "flex",
          flexDirection: "column"
        };
        if (type)
          return;
        this.showPoptrans();
      },
      showPoptrans() {
        this.$nextTick(() => {
          this.showPopup = true;
          this.showTrans = true;
        });
      }
    }
  };
  function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_transition = resolveEasycom(vue.resolveDynamicComponent("uni-transition"), __easycom_0$2);
    return $data.showPopup ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["uni-popup", [$data.popupstyle, $options.isDesktop ? "fixforpc-z-index" : ""]])
      },
      [
        vue.createElementVNode(
          "view",
          {
            onTouchstart: _cache[1] || (_cache[1] = (...args) => $options.touchstart && $options.touchstart(...args))
          },
          [
            $data.maskShow ? (vue.openBlock(), vue.createBlock(_component_uni_transition, {
              key: "1",
              name: "mask",
              "mode-class": "fade",
              styles: $data.maskClass,
              duration: $data.duration,
              show: $data.showTrans,
              onClick: $options.onTap
            }, null, 8, ["styles", "duration", "show", "onClick"])) : vue.createCommentVNode("v-if", true),
            vue.createVNode(_component_uni_transition, {
              key: "2",
              "mode-class": $data.ani,
              name: "content",
              styles: $data.transClass,
              duration: $data.duration,
              show: $data.showTrans,
              onClick: $options.onTap
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["uni-popup__wrapper", [$data.popupstyle]]),
                    style: vue.normalizeStyle($options.getStyles),
                    onClick: _cache[0] || (_cache[0] = (...args) => $options.clear && $options.clear(...args))
                  },
                  [
                    vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
                  ],
                  6
                  /* CLASS, STYLE */
                )
              ]),
              _: 3
              /* FORWARDED */
            }, 8, ["mode-class", "styles", "duration", "show", "onClick"])
          ],
          32
          /* NEED_HYDRATION */
        )
      ],
      2
      /* CLASS */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$n], ["__scopeId", "data-v-4dd3c44b"], ["__file", "E:/cityInvestment02/city-Investment/uni_modules/uni-popup/components/uni-popup/uni-popup.vue"]]);
  const _sfc_main$n = {
    __name: "filterPopup",
    props: {
      category1Options: {
        type: Array,
        default: () => []
      },
      category2Options: {
        type: Array,
        default: () => []
      }
    },
    emits: ["confirm", "reset"],
    setup(__props, { expose: __expose, emit: __emit }) {
      const handleReset = throttle(() => {
        onReset();
      }, 500);
      const handleConfirm = throttle(() => {
        onConfirm();
      }, 1e3);
      const props = __props;
      const emit = __emit;
      const popupRef = vue.ref(null);
      const category1Options = vue.computed(
        () => [
          { label: "筛选条件一", value: "filter1_1" },
          { label: "筛选条件二", value: "filter1_2" },
          { label: "筛选条件三", value: "filter1_3" },
          { label: "筛选条件四", value: "filter1_4" },
          { label: "筛选条件五", value: "filter1_5" },
          { label: "筛选条件六", value: "filter1_6" },
          { label: "筛选条件七", value: "filter1_7" },
          { label: "筛选条件八", value: "filter1_8" },
          { label: "筛选条件九", value: "filter1_9" }
        ]
      );
      const category2Options = vue.computed(
        () => [
          { label: "筛选条件一", value: "filter2_1" },
          { label: "筛选条件二", value: "filter2_2" },
          { label: "筛选条件三", value: "filter2_3" },
          { label: "筛选条件四", value: "filter2_4" },
          { label: "筛选条件五", value: "filter2_5" },
          { label: "筛选条件六", value: "filter2_6" },
          { label: "筛选条件七", value: "filter2_7" },
          { label: "筛选条件八", value: "filter2_8" },
          { label: "筛选条件九", value: "filter2_9" }
        ]
      );
      const state = vue.reactive({
        category1: /* @__PURE__ */ new Set([]),
        // 默认选中筛选条件一和筛选条件四
        category2: /* @__PURE__ */ new Set([])
        // 默认选中筛选条件一
      });
      function toggleFilter(set, value) {
        if (set.has(value)) {
          set.delete(value);
        } else {
          set.add(value);
        }
      }
      function onReset() {
        state.category1.clear();
        state.category2.clear();
        emit("reset");
      }
      function onConfirm() {
        const payload = {
          category1: Array.from(state.category1),
          category2: Array.from(state.category2)
        };
        emit("confirm", payload);
        close();
      }
      function open() {
        var _a, _b;
        (_b = (_a = popupRef.value) == null ? void 0 : _a.open) == null ? void 0 : _b.call(_a);
      }
      function close() {
        var _a, _b;
        (_b = (_a = popupRef.value) == null ? void 0 : _a.close) == null ? void 0 : _b.call(_a);
      }
      __expose({ open, close });
      const __returned__ = { handleReset, handleConfirm, props, emit, popupRef, category1Options, category2Options, state, toggleFilter, onReset, onConfirm, open, close, ref: vue.ref, reactive: vue.reactive, computed: vue.computed, watch: vue.watch, get throttle() {
        return throttle;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_1);
    return vue.openBlock(), vue.createBlock(
      _component_uni_popup,
      {
        ref: "popupRef",
        type: "bottom",
        "safe-area": true,
        "mask-click": true
      },
      {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", { class: "filter-popup" }, [
            vue.createElementVNode("view", { class: "filter-title" }, " 选择筛选条件 "),
            vue.createElementVNode("scroll-view", {
              "scroll-y": "true",
              style: { "height": "calc(100% - 120rpx)" }
            }, [
              vue.createElementVNode("view", { class: "filter-category" }, [
                vue.createElementVNode("view", { class: "category-title" }, "筛选分类一"),
                vue.createElementVNode("view", { class: "filter-grid" }, [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList($setup.category1Options, (item, index) => {
                      return vue.openBlock(), vue.createElementBlock("view", {
                        key: item.value,
                        class: vue.normalizeClass(["filter-item", { active: $setup.state.category1.has(item.value) }]),
                        onClick: ($event) => $setup.toggleFilter($setup.state.category1, item.value)
                      }, vue.toDisplayString(item.label), 11, ["onClick"]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
              ]),
              vue.createElementVNode("view", { class: "filter-category" }, [
                vue.createElementVNode("view", { class: "category-title" }, "筛选分类二"),
                vue.createElementVNode("view", { class: "filter-grid" }, [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList($setup.category2Options, (item, index) => {
                      return vue.openBlock(), vue.createElementBlock("view", {
                        key: item.value,
                        class: vue.normalizeClass(["filter-item", { active: $setup.state.category2.has(item.value) }]),
                        onClick: ($event) => $setup.toggleFilter($setup.state.category2, item.value)
                      }, vue.toDisplayString(item.label), 11, ["onClick"]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
              ]),
              vue.createElementVNode("view", { style: { "height": "120rpx" } })
            ]),
            vue.createElementVNode("view", { class: "fp-footer" }, [
              vue.createElementVNode("view", {
                class: "btn reset",
                onClick: _cache[0] || (_cache[0] = (...args) => $setup.handleReset && $setup.handleReset(...args))
              }, "重置"),
              vue.createElementVNode("view", {
                class: "btn confirm",
                onClick: _cache[1] || (_cache[1] = (...args) => $setup.handleConfirm && $setup.handleConfirm(...args))
              }, "完成")
            ])
          ])
        ]),
        _: 1
        /* STABLE */
      },
      512
      /* NEED_PATCH */
    );
  }
  const FilterPopup = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$m], ["__scopeId", "data-v-d7b5608e"], ["__file", "E:/cityInvestment02/city-Investment/components/filterPopup/filterPopup.vue"]]);
  const _imports_0$3 = "/static/images/search.svg";
  const _sfc_main$m = {
    __name: "pending",
    setup(__props, { expose: __expose }) {
      __expose();
      vue.useCssVars((_ctx) => ({
        "48068cc9-orderListHeight": orderListHeight.value
      }));
      const statusBarHeight = vue.ref(0);
      onLoad(() => {
        const statusBarHeightNew = getStorage("statusBarHeight");
        if (Number(statusBarHeightNew) != 0) {
          statusBarHeight.value = Number(statusBarHeightNew);
        }
        uni.$on("refresh-pending", () => {
          onRefresh();
        });
      });
      onUnload(() => {
        uni.$off("refresh-pending");
      });
      const paging = vue.ref(null);
      const searchKeyword = vue.ref("");
      const currentTab = vue.ref(0);
      const tabs = [
        { label: "所有", wf: "" },
        { label: "工程类款项", wf: "GC01" },
        { label: "其他类", wf: "QT01" }
      ];
      const procDefCodeUrlObj = vue.ref({
        "GC01": "/pages/detail/gcfk",
        //工程类款项
        "SG01": "/pages/detail/sgjf",
        //三公经费
        "KY01": "/pages/detail/kyjf",
        //科研经费
        "DB01": "/pages/detail/zjdb",
        //资金调拨
        "SR01": "/pages/detail/srqr",
        //收入确认
        "QT01": "/pages/detail/qtjf",
        //其他
        "ZC01": "/pages/detail/zcys"
        //支出预算
      });
      const wfstatusArr = vue.ref(tabs.map((t2) => t2.wf));
      const tabValues = vue.ref(tabs.map((t2) => t2.label));
      const filterRef = vue.ref(null);
      function openFilter() {
        var _a;
        (_a = filterRef.value) == null ? void 0 : _a.open();
      }
      function onConfirm(payload) {
        formatAppLog("log", "at pages/nav/pending.vue:145", "筛选结果", payload);
      }
      function onReset() {
        formatAppLog("log", "at pages/nav/pending.vue:149", "重置筛选");
      }
      const doSearch = () => {
        uni.hideKeyboard();
        onRefresh();
      };
      const onTabChange = (val) => {
        currentTab.value = val;
        onRefresh();
        formatAppLog("log", "at pages/nav/pending.vue:170", "切换到:", tabValues.value[val]);
      };
      const onRefresh = () => {
        paging.value.reload();
      };
      const onRefreshWatch = () => {
        formatAppLog("log", "at pages/nav/pending.vue:179", "下拉刷新触发");
      };
      const dataList = vue.ref([]);
      const queryList = (pageNo, pageSize) => {
        http.get("/WF/GetToDoTask", {
          Page: pageNo,
          Limit: pageSize,
          ProcDefId: wfstatusArr.value[currentTab.value],
          RequestFormNo: searchKeyword.value
        }).then((res) => {
          paging.value.complete(res.data.data || []);
        }).catch(() => {
          paging.value.complete(false);
          uni.showToast({ title: "加载失败", icon: "none" });
        });
      };
      const toDetail = (order) => {
        uni.navigateTo({
          url: procDefCodeUrlObj.value[order.procDefCode],
          success(res) {
            res.eventChannel.emit("open-detail", {
              type: "pending",
              order
              // 也可直接传整条数据
            });
          }
        });
      };
      onShow(() => {
        formatAppLog("log", "at pages/nav/pending.vue:223", "页面显示，重新计算高度");
        vue.nextTick(() => {
          computeOrderListHeight();
        });
      });
      onHide(() => {
        formatAppLog("log", "at pages/nav/pending.vue:230", "页面隐藏");
      });
      const orderListHeight = vue.ref("");
      const computeOrderListHeight = () => {
        try {
          const {
            windowHeight
          } = uni.getSystemInfoSync();
          const inst = vue.getCurrentInstance();
          const q = uni.createSelectorQuery().in(inst == null ? void 0 : inst.proxy);
          q.select(".header-stickt").boundingClientRect((rect) => {
            const headerH = (rect == null ? void 0 : rect.height) || 0;
            const h = Math.max(0, windowHeight - headerH);
            orderListHeight.value = `${h}px`;
          }).exec();
        } catch (e) {
          orderListHeight.value = "calc(100vh - 50px)";
        }
      };
      vue.onMounted(() => {
        var _a;
        formatAppLog("log", "at pages/nav/pending.vue:252", "订单页面加载完成");
        vue.nextTick(() => computeOrderListHeight());
        (_a = uni.onWindowResize) == null ? void 0 : _a.call(uni, () => computeOrderListHeight());
      });
      const __returned__ = { statusBarHeight, paging, searchKeyword, currentTab, tabs, procDefCodeUrlObj, wfstatusArr, tabValues, filterRef, openFilter, onConfirm, onReset, doSearch, onTabChange, onRefresh, onRefreshWatch, dataList, queryList, toDetail, orderListHeight, computeOrderListHeight, get onLoad() {
        return onLoad;
      }, get onUnload() {
        return onUnload;
      }, get onShow() {
        return onShow;
      }, get onHide() {
        return onHide;
      }, ref: vue.ref, onMounted: vue.onMounted, nextTick: vue.nextTick, getCurrentInstance: vue.getCurrentInstance, get getStorage() {
        return getStorage;
      }, get http() {
        return http;
      }, get formatNumber() {
        return formatNumber;
      }, get formatRelativeTime() {
        return formatRelativeTime;
      }, FilterPopup };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_nav_bar = resolveEasycom(vue.resolveDynamicComponent("uni-nav-bar"), __easycom_0$4);
    const _component_z_paging = resolveEasycom(vue.resolveDynamicComponent("z-paging"), __easycom_1$1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "order-page" }, [
      vue.createElementVNode("view", { class: "header-stickt" }, [
        vue.createElementVNode(
          "view",
          {
            class: "status_bar",
            style: vue.normalizeStyle({ height: `${$setup.statusBarHeight * 2}rpx` })
          },
          null,
          4
          /* STYLE */
        ),
        vue.createVNode(_component_uni_nav_bar, { class: "nav-bar-top" }, {
          left: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "nav-bar-title" }, " 待办流程 ")
          ]),
          right: vue.withCtx(() => [
            vue.createElementVNode("view", {
              onClick: $setup.openFilter,
              class: "nav-bar-filter"
            }, " 筛选 ")
          ]),
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "nav-input-view" }, [
              vue.createElementVNode("image", {
                class: "input-seach",
                src: _imports_0$3,
                mode: "",
                onClick: vue.withModifiers($setup.doSearch, ["stop"])
              }),
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  class: "input-view",
                  placeholder: "搜索",
                  type: "text",
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.searchKeyword = $event),
                  "confirm-type": "search",
                  onConfirm: $setup.doSearch,
                  onKeyup: vue.withKeys($setup.doSearch, ["enter"])
                },
                null,
                544
                /* NEED_HYDRATION, NEED_PATCH */
              ), [
                [vue.vModelText, $setup.searchKeyword]
              ])
            ])
          ]),
          _: 1
          /* STABLE */
        }),
        vue.createElementVNode("view", { class: "segmented-section" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.tabValues, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "segmented-section-item",
                key: index,
                onClick: ($event) => $setup.onTabChange(index)
              }, [
                vue.createElementVNode("text", {
                  class: "section-item-0",
                  style: { "height": "0" }
                }),
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["section-item-1", { "section-item-1-active": index === $setup.currentTab }])
                  },
                  vue.toDisplayString(item),
                  3
                  /* TEXT, CLASS */
                ),
                vue.createElementVNode(
                  "text",
                  {
                    class: vue.normalizeClass(["section-item-0", { "section-item-0-active": index === $setup.currentTab }])
                  },
                  null,
                  2
                  /* CLASS */
                )
              ], 8, ["onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ]),
      vue.createElementVNode("view", { class: "order-list" }, [
        vue.createVNode(_component_z_paging, {
          ref: "paging",
          modelValue: $setup.dataList,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.dataList = $event),
          onOnRefresh: $setup.onRefreshWatch,
          onQuery: $setup.queryList,
          fixed: false
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { style: { "height": "30rpx" } }),
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.dataList, (order) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: "order-card",
                  key: order.id || order.requestFormNo,
                  onClick: ($event) => $setup.toDetail(order)
                }, [
                  vue.withDirectives(vue.createElementVNode(
                    "view",
                    { class: "approved-view" },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [vue.vShow, (order == null ? void 0 : order.wfStatus) === "Completed"]
                  ]),
                  vue.createElementVNode("view", { class: "order-header" }, [
                    vue.createElementVNode(
                      "text",
                      { class: "order-id" },
                      vue.toDisplayString(order.requestFormNo),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode("view", { class: "order-time" }, [
                      vue.createElementVNode(
                        "text",
                        { class: "time-text" },
                        vue.toDisplayString($setup.formatRelativeTime(order.submittedDate)),
                        1
                        /* TEXT */
                      )
                    ])
                  ]),
                  vue.createElementVNode("view", { class: "order-content" }, [
                    vue.createElementVNode("view", { class: "quote-section" }, [
                      vue.createElementVNode("text", { class: "quote-label" }, "申请费用："),
                      vue.createElementVNode(
                        "text",
                        { class: "quote-price" },
                        "¥" + vue.toDisplayString($setup.formatNumber(order.planToPayTotal) || "--"),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "quote-section" }, [
                      vue.createElementVNode("text", { class: "quote-label" }, "申请单位："),
                      vue.createElementVNode(
                        "text",
                        { class: "description-text" },
                        vue.toDisplayString(order.procDefName) + " | " + vue.toDisplayString(order.submittedByName),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "quote-section" }, [
                      vue.createElementVNode("text", { class: "quote-label" }, "关键信息："),
                      vue.createElementVNode(
                        "text",
                        { class: "description-text" },
                        vue.toDisplayString(order.taskName),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "quote-section" }, [
                      vue.createElementVNode("text", { class: "quote-label" }, "业务摘要："),
                      vue.createElementVNode(
                        "text",
                        { class: "description-text" },
                        vue.toDisplayString(order.stepName),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "label-view" }, [
                      (vue.openBlock(true), vue.createElementBlock(
                        vue.Fragment,
                        null,
                        vue.renderList((order == null ? void 0 : order.labelArr) || [], (item, index) => {
                          return vue.openBlock(), vue.createElementBlock("view", {
                            class: "label-item",
                            key: index
                          }, [
                            vue.createElementVNode("text", { class: "point-icon" }),
                            vue.createElementVNode(
                              "text",
                              { class: "label-text" },
                              vue.toDisplayString(item.label),
                              1
                              /* TEXT */
                            )
                          ]);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ])
                  ])
                ], 8, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ]),
          _: 1
          /* STABLE */
        }, 8, ["modelValue"])
      ]),
      vue.createVNode(
        $setup["FilterPopup"],
        {
          ref: "filterRef",
          onConfirm: $setup.onConfirm,
          onReset: $setup.onReset
        },
        null,
        512
        /* NEED_PATCH */
      )
    ]);
  }
  const PagesNavPending = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$l], ["__scopeId", "data-v-48068cc9"], ["__file", "E:/cityInvestment02/city-Investment/pages/nav/pending.vue"]]);
  const _sfc_main$l = {
    __name: "completed",
    setup(__props, { expose: __expose }) {
      __expose();
      vue.useCssVars((_ctx) => ({
        "3e80a563-orderListHeight": orderListHeight.value
      }));
      const statusBarHeight = vue.ref(0);
      onLoad(() => {
        const statusBarHeightNew = getStorage("statusBarHeight");
        if (Number(statusBarHeightNew) != 0) {
          statusBarHeight.value = Number(statusBarHeightNew);
        }
        uni.$on("refresh-completed", () => {
          onRefresh();
        });
      });
      onUnload(() => {
        uni.$off("refresh-completed");
      });
      const paging = vue.ref(null);
      const searchKeyword = vue.ref("");
      const currentTab = vue.ref(0);
      const tabs = [
        { label: "所有", wf: "" },
        { label: "流转中", wf: "Running" },
        { label: "已审核", wf: "Completed" }
      ];
      const procDefCodeUrlObj = vue.ref({
        "GC01": "/pages/detail/gcfk",
        "SG01": "/pages/detail/sgjf",
        "KY01": "/pages/detail/kyjf",
        "DB01": "/pages/detail/zjdb",
        "SR01": "/pages/detail/srqr",
        "QT01": "/pages/detail/qtjf",
        "ZC01": "/pages/detail/zcys"
      });
      const wfstatusArr = vue.ref(tabs.map((t2) => t2.wf));
      const tabValues = vue.ref(tabs.map((t2) => t2.label));
      const filterRef = vue.ref(null);
      function openFilter() {
        var _a;
        (_a = filterRef.value) == null ? void 0 : _a.open();
      }
      function onConfirm(payload) {
        formatAppLog("log", "at pages/nav/completed.vue:146", "筛选结果", payload);
      }
      function onReset() {
        formatAppLog("log", "at pages/nav/completed.vue:150", "重置筛选");
      }
      const doSearch = () => {
        uni.hideKeyboard();
        onRefresh();
      };
      const onTabChange = (val) => {
        currentTab.value = val;
        onRefresh();
        formatAppLog("log", "at pages/nav/completed.vue:171", "切换到:", tabValues.value[val]);
      };
      const onRefresh = () => {
        paging.value.reload();
      };
      const onRefreshWatch = () => {
        formatAppLog("log", "at pages/nav/completed.vue:180", "下拉刷新触发");
      };
      const dataList = vue.ref([]);
      const queryList = (pageNo, pageSize) => {
        http.get("/WF/GetInvolvedProcess", {
          Page: pageNo,
          Limit: pageSize,
          Wfstatus: wfstatusArr.value[currentTab.value],
          RequestFormNo: searchKeyword.value
        }).then((res) => {
          paging.value.complete(res.data.data || []);
        }).catch(() => {
          paging.value.complete(false);
          uni.showToast({ title: "加载失败", icon: "none" });
        });
      };
      const toDetail = (order) => {
        uni.navigateTo({
          url: procDefCodeUrlObj.value[order.procDefCode],
          success(res) {
            res.eventChannel.emit("open-detail", {
              type: "completed",
              order
              // 也可直接传整条数据
            });
          }
        });
      };
      onShow(() => {
        formatAppLog("log", "at pages/nav/completed.vue:225", "页面显示，重新计算高度");
        vue.nextTick(() => {
          computeOrderListHeight();
        });
      });
      onHide(() => {
        formatAppLog("log", "at pages/nav/completed.vue:232", "页面隐藏");
      });
      const orderListHeight = vue.ref("");
      const computeOrderListHeight = () => {
        try {
          const {
            windowHeight
          } = uni.getSystemInfoSync();
          const inst = vue.getCurrentInstance();
          const q = uni.createSelectorQuery().in(inst == null ? void 0 : inst.proxy);
          q.select(".header-stickt").boundingClientRect((rect) => {
            const headerH = (rect == null ? void 0 : rect.height) || 0;
            const h = Math.max(0, windowHeight - headerH);
            orderListHeight.value = `${h}px`;
          }).exec();
        } catch (e) {
          orderListHeight.value = "calc(100vh - 100rpx)";
        }
      };
      vue.onMounted(() => {
        var _a;
        formatAppLog("log", "at pages/nav/completed.vue:254", "订单页面加载完成");
        vue.nextTick(() => computeOrderListHeight());
        (_a = uni.onWindowResize) == null ? void 0 : _a.call(uni, () => computeOrderListHeight());
      });
      const __returned__ = { statusBarHeight, paging, searchKeyword, currentTab, tabs, procDefCodeUrlObj, wfstatusArr, tabValues, filterRef, openFilter, onConfirm, onReset, doSearch, onTabChange, onRefresh, onRefreshWatch, dataList, queryList, toDetail, orderListHeight, computeOrderListHeight, get onLoad() {
        return onLoad;
      }, get onUnload() {
        return onUnload;
      }, get onShow() {
        return onShow;
      }, get onHide() {
        return onHide;
      }, ref: vue.ref, reactive: vue.reactive, onMounted: vue.onMounted, nextTick: vue.nextTick, getCurrentInstance: vue.getCurrentInstance, get getStorage() {
        return getStorage;
      }, get http() {
        return http;
      }, get formatNumber() {
        return formatNumber;
      }, get formatRelativeTime() {
        return formatRelativeTime;
      }, FilterPopup };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_nav_bar = resolveEasycom(vue.resolveDynamicComponent("uni-nav-bar"), __easycom_0$4);
    const _component_z_paging = resolveEasycom(vue.resolveDynamicComponent("z-paging"), __easycom_1$1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "order-page" }, [
      vue.createElementVNode("view", { class: "header-stickt" }, [
        vue.createElementVNode(
          "view",
          {
            class: "status_bar",
            style: vue.normalizeStyle({ height: `${$setup.statusBarHeight * 2}rpx` })
          },
          null,
          4
          /* STYLE */
        ),
        vue.createVNode(_component_uni_nav_bar, { class: "nav-bar-top" }, {
          left: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "nav-bar-title" }, " 已办流程 ")
          ]),
          right: vue.withCtx(() => [
            vue.createElementVNode("view", {
              onClick: $setup.openFilter,
              class: "nav-bar-filter"
            }, " 筛选 ")
          ]),
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "nav-input-view" }, [
              vue.createElementVNode("image", {
                class: "input-seach",
                src: _imports_0$3,
                mode: "",
                onClick: vue.withModifiers($setup.doSearch, ["stop"])
              }),
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  "adjust-position": false,
                  "hold-keyboard": true,
                  class: "input-view",
                  placeholder: "搜索",
                  type: "text",
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.searchKeyword = $event),
                  "confirm-type": "search",
                  onConfirm: $setup.doSearch,
                  onKeyup: vue.withKeys($setup.doSearch, ["enter"])
                },
                null,
                544
                /* NEED_HYDRATION, NEED_PATCH */
              ), [
                [vue.vModelText, $setup.searchKeyword]
              ])
            ])
          ]),
          _: 1
          /* STABLE */
        }),
        vue.createElementVNode("view", { class: "segmented-section" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.tabValues, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "segmented-section-item",
                key: index,
                onClick: ($event) => $setup.onTabChange(index)
              }, [
                vue.createElementVNode("text", {
                  class: "section-item-0",
                  style: { "height": "0" }
                }),
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["section-item-1", { "section-item-1-active": index === $setup.currentTab }])
                  },
                  vue.toDisplayString(item),
                  3
                  /* TEXT, CLASS */
                ),
                vue.createElementVNode(
                  "text",
                  {
                    class: vue.normalizeClass(["section-item-0", { "section-item-0-active": index === $setup.currentTab }])
                  },
                  null,
                  2
                  /* CLASS */
                )
              ], 8, ["onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ]),
      vue.createElementVNode("view", { class: "order-list" }, [
        vue.createVNode(_component_z_paging, {
          ref: "paging",
          modelValue: $setup.dataList,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.dataList = $event),
          onOnRefresh: $setup.onRefreshWatch,
          onQuery: $setup.queryList,
          fixed: false
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { style: { "height": "30rpx" } }),
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.dataList, (order) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: "order-card",
                  key: order.id || order.requestFormNo,
                  onClick: ($event) => $setup.toDetail(order)
                }, [
                  vue.withDirectives(vue.createElementVNode(
                    "view",
                    { class: "approved-view" },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [vue.vShow, (order == null ? void 0 : order.wfStatus) === "Completed"]
                  ]),
                  vue.createElementVNode("view", { class: "order-header" }, [
                    vue.createElementVNode(
                      "text",
                      { class: "order-id" },
                      vue.toDisplayString(order.requestFormNo),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode("view", { class: "order-time" }, [
                      vue.createElementVNode(
                        "text",
                        { class: "time-text" },
                        vue.toDisplayString($setup.formatRelativeTime(order.submittedDate)),
                        1
                        /* TEXT */
                      )
                    ])
                  ]),
                  vue.createElementVNode("view", { class: "order-content" }, [
                    vue.createElementVNode("view", { class: "quote-section" }, [
                      vue.createElementVNode("text", { class: "quote-label" }, "申请费用："),
                      vue.createElementVNode(
                        "text",
                        { class: "quote-price" },
                        "¥" + vue.toDisplayString($setup.formatNumber(order.planToPayTotal) || "--"),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "quote-section" }, [
                      vue.createElementVNode("text", { class: "quote-label" }, "申请单位："),
                      vue.createElementVNode(
                        "text",
                        { class: "description-text" },
                        vue.toDisplayString(order.procDefName) + " | " + vue.toDisplayString(order.submittedByName),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "quote-section" }, [
                      vue.createElementVNode("text", { class: "quote-label" }, "关键信息："),
                      vue.createElementVNode(
                        "text",
                        { class: "description-text" },
                        vue.toDisplayString(order.taskName),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "quote-section" }, [
                      vue.createElementVNode("text", { class: "quote-label" }, "业务摘要："),
                      vue.createElementVNode(
                        "text",
                        { class: "description-text" },
                        vue.toDisplayString(order.stepName),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "label-view" }, [
                      (vue.openBlock(true), vue.createElementBlock(
                        vue.Fragment,
                        null,
                        vue.renderList((order == null ? void 0 : order.labelArr) || [], (item, index) => {
                          return vue.openBlock(), vue.createElementBlock("view", {
                            class: "label-item",
                            key: index
                          }, [
                            vue.createElementVNode("text", { class: "point-icon" }),
                            vue.createElementVNode(
                              "text",
                              { class: "label-text" },
                              vue.toDisplayString(item.label),
                              1
                              /* TEXT */
                            )
                          ]);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ])
                  ])
                ], 8, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ]),
          _: 1
          /* STABLE */
        }, 8, ["modelValue"])
      ]),
      vue.createVNode(
        $setup["FilterPopup"],
        {
          ref: "filterRef",
          onConfirm: $setup.onConfirm,
          onReset: $setup.onReset
        },
        null,
        512
        /* NEED_PATCH */
      )
    ]);
  }
  const PagesNavCompleted = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$k], ["__scopeId", "data-v-3e80a563"], ["__file", "E:/cityInvestment02/city-Investment/pages/nav/completed.vue"]]);
  const popup = {
    data() {
      return {};
    },
    created() {
      this.popup = this.getParent();
    },
    methods: {
      /**
       * 获取父元素实例
       */
      getParent(name = "uniPopup") {
        let parent = this.$parent;
        let parentName = parent.$options.name;
        while (parentName !== name) {
          parent = parent.$parent;
          if (!parent)
            return false;
          parentName = parent.$options.name;
        }
        return parent;
      }
    }
  };
  const en = {
    "uni-popup.cancel": "cancel",
    "uni-popup.ok": "ok",
    "uni-popup.placeholder": "pleace enter",
    "uni-popup.title": "Hint",
    "uni-popup.shareTitle": "Share to"
  };
  const zhHans = {
    "uni-popup.cancel": "取消",
    "uni-popup.ok": "确定",
    "uni-popup.placeholder": "请输入",
    "uni-popup.title": "提示",
    "uni-popup.shareTitle": "分享到"
  };
  const zhHant = {
    "uni-popup.cancel": "取消",
    "uni-popup.ok": "確定",
    "uni-popup.placeholder": "請輸入",
    "uni-popup.title": "提示",
    "uni-popup.shareTitle": "分享到"
  };
  const messages = {
    en,
    "zh-Hans": zhHans,
    "zh-Hant": zhHant
  };
  const {
    t
  } = initVueI18n(messages);
  const _sfc_main$k = {
    name: "uniPopupDialog",
    mixins: [popup],
    emits: ["confirm", "close", "update:modelValue", "input"],
    props: {
      inputType: {
        type: String,
        default: "text"
      },
      showClose: {
        type: Boolean,
        default: true
      },
      modelValue: {
        type: [Number, String],
        default: ""
      },
      placeholder: {
        type: [String, Number],
        default: ""
      },
      type: {
        type: String,
        default: "error"
      },
      mode: {
        type: String,
        default: "base"
      },
      title: {
        type: String,
        default: ""
      },
      content: {
        type: String,
        default: ""
      },
      beforeClose: {
        type: Boolean,
        default: false
      },
      cancelText: {
        type: String,
        default: ""
      },
      confirmText: {
        type: String,
        default: ""
      },
      maxlength: {
        type: Number,
        default: -1
      },
      focus: {
        type: Boolean,
        default: true
      },
      borderRadius: {
        type: String,
        default: "11px"
      }
    },
    data() {
      return {
        dialogType: "error",
        val: ""
      };
    },
    computed: {
      okText() {
        return this.confirmText || t("uni-popup.ok");
      },
      closeText() {
        return this.cancelText || t("uni-popup.cancel");
      },
      placeholderText() {
        return this.placeholder || t("uni-popup.placeholder");
      },
      titleText() {
        return this.title || t("uni-popup.title");
      }
    },
    watch: {
      type(val) {
        this.dialogType = val;
      },
      mode(val) {
        if (val === "input") {
          this.dialogType = "info";
        }
      },
      value(val) {
        this.setVal(val);
      },
      modelValue(val) {
        this.setVal(val);
      },
      val(val) {
        this.$emit("update:modelValue", val);
      }
    },
    created() {
      this.popup.disableMask();
      if (this.mode === "input") {
        this.dialogType = "info";
        this.val = this.value;
        this.val = this.modelValue;
      } else {
        this.dialogType = this.type;
      }
    },
    methods: {
      /**
       * 给val属性赋值
       */
      setVal(val) {
        if (this.maxlength != -1 && this.mode === "input") {
          this.val = val.slice(0, this.maxlength);
        } else {
          this.val = val;
        }
      },
      /**
       * 点击确认按钮
       */
      onOk() {
        if (this.mode === "input") {
          this.$emit("confirm", this.val);
        } else {
          this.$emit("confirm");
        }
        if (this.beforeClose)
          return;
        this.popup.close();
      },
      /**
       * 点击取消按钮
       */
      closeDialog() {
        this.$emit("close");
        if (this.beforeClose)
          return;
        this.popup.close();
      },
      close() {
        this.popup.close();
      }
    }
  };
  function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "uni-popup-dialog",
        style: vue.normalizeStyle({ borderRadius: $props.borderRadius })
      },
      [
        vue.createElementVNode("view", { class: "uni-dialog-title" }, [
          vue.createElementVNode(
            "text",
            {
              class: vue.normalizeClass(["uni-dialog-title-text", ["uni-popup__" + $data.dialogType]])
            },
            vue.toDisplayString($options.titleText),
            3
            /* TEXT, CLASS */
          )
        ]),
        $props.mode === "base" ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "uni-dialog-content"
        }, [
          vue.renderSlot(_ctx.$slots, "default", {}, () => [
            vue.createElementVNode(
              "text",
              { class: "uni-dialog-content-text" },
              vue.toDisplayString($props.content),
              1
              /* TEXT */
            )
          ], true)
        ])) : (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: "uni-dialog-content"
        }, [
          vue.renderSlot(_ctx.$slots, "default", {}, () => [
            vue.withDirectives(vue.createElementVNode("input", {
              class: "uni-dialog-input",
              maxlength: $props.maxlength,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.val = $event),
              type: $props.inputType,
              placeholder: $options.placeholderText,
              focus: $props.focus
            }, null, 8, ["maxlength", "type", "placeholder", "focus"]), [
              [vue.vModelDynamic, $data.val]
            ])
          ], true)
        ])),
        vue.createElementVNode("view", { class: "uni-dialog-button-group" }, [
          $props.showClose ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "uni-dialog-button",
            onClick: _cache[1] || (_cache[1] = (...args) => $options.closeDialog && $options.closeDialog(...args))
          }, [
            vue.createElementVNode(
              "text",
              { class: "uni-dialog-button-text" },
              vue.toDisplayString($options.closeText),
              1
              /* TEXT */
            )
          ])) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["uni-dialog-button", $props.showClose ? "uni-border-left" : ""]),
              onClick: _cache[2] || (_cache[2] = (...args) => $options.onOk && $options.onOk(...args))
            },
            [
              vue.createElementVNode(
                "text",
                { class: "uni-dialog-button-text uni-button-color" },
                vue.toDisplayString($options.okText),
                1
                /* TEXT */
              )
            ],
            2
            /* CLASS */
          )
        ])
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$j], ["__scopeId", "data-v-d78c88b7"], ["__file", "E:/cityInvestment02/city-Investment/uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.vue"]]);
  const _sfc_main$j = /* @__PURE__ */ Object.assign({
    name: "confirmDialog"
  }, {
    __name: "confirmDialog",
    props: {
      content: {
        type: String,
        default: ""
      },
      msgType: {
        type: String,
        default: ""
      }
    },
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props;
      const content = props.content ?? "";
      const msgType = props.msgType ?? "";
      const alertDialog = vue.ref();
      const emit = __emit;
      const dialogConfirm = () => {
        emit("confirm");
      };
      const dialogClose = () => {
      };
      function open(position) {
        var _a, _b;
        (_b = (_a = alertDialog.value) == null ? void 0 : _a.open) == null ? void 0 : _b.call(_a, position || "center");
      }
      __expose({
        open
      });
      const __returned__ = { props, content, msgType, alertDialog, emit, dialogConfirm, dialogClose, open, ref: vue.ref };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_popup_dialog = resolveEasycom(vue.resolveDynamicComponent("uni-popup-dialog"), __easycom_0$1);
    const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_1);
    return vue.openBlock(), vue.createBlock(
      _component_uni_popup,
      {
        ref: "alertDialog",
        type: "dialog"
      },
      {
        default: vue.withCtx(() => [
          vue.createVNode(_component_uni_popup_dialog, {
            content: $setup.content,
            type: $setup.msgType,
            cancelText: "关闭",
            confirmText: "确定",
            onConfirm: $setup.dialogConfirm,
            onClose: $setup.dialogClose
          }, null, 8, ["content", "type"])
        ]),
        _: 1
        /* STABLE */
      },
      512
      /* NEED_PATCH */
    );
  }
  const confirmDialog = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$i], ["__scopeId", "data-v-dc30d0f8"], ["__file", "E:/cityInvestment02/city-Investment/components/confirmDialog/confirmDialog.vue"]]);
  const _imports_0$2 = "/static/images/user.jpg";
  const _imports_0$1 = "/static/images/ucicon_1.svg";
  const _imports_1 = "/static/images/arrow-right-s-line.svg";
  const _imports_3 = "/static/images/ucicon_2.svg";
  const _imports_0 = "/static/images/ucicon_3.svg";
  const _imports_5 = "/static/images/ucicon_4.svg";
  const _sfc_main$i = {
    __name: "profile",
    setup(__props, { expose: __expose }) {
      __expose();
      const confirmRef = vue.ref(null);
      const userInfo = vue.ref({});
      vue.onMounted(() => {
        const userInfos = uni.getStorageSync("userInfo");
        if (userInfos) {
          userInfo.value = userInfos;
        } else {
          getUserInfo();
        }
        getUserSignature();
      });
      const getUserInfo = () => {
        http.get("/Users/GetUserInfo").then((res) => {
          if (res.code == 0) {
            userInfo.value = res.data;
            uni.setStorageSync("userInfo", res.data);
          }
        });
      };
      const getUserSignature = () => {
        http.get("/Users/GetUserSignature").then((res) => {
          if (res.code == 0) {
            uni.setStorageSync("userSignature", res.data);
          }
        });
      };
      const goMessage = () => {
        uni.navigateTo({
          url: "/pages/info/msg"
        });
      };
      const goSign = () => {
        uni.navigateTo({
          url: "/pages/signature/index"
        });
      };
      const goHelp = () => {
        uni.navigateTo({
          url: "/pages/info/help"
        });
      };
      const goLogout = () => {
        var _a;
        (_a = confirmRef.value) == null ? void 0 : _a.open();
      };
      const doLogout = () => {
        try {
          uni.clearStorageSync();
        } catch (e) {
        }
        uni.reLaunch({
          url: "/pages/index/index"
        });
      };
      const __returned__ = { confirmRef, userInfo, getUserInfo, getUserSignature, goMessage, goSign, goHelp, goLogout, doLogout, ref: vue.ref, onMounted: vue.onMounted, get http() {
        return http;
      }, confirmDialog };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
    var _a, _b;
    return vue.openBlock(), vue.createElementBlock("view", { class: "profile" }, [
      vue.createElementVNode("view", { class: "card" }, [
        vue.createElementVNode("view", { class: "card__header" }, [
          vue.createElementVNode("text", { class: "card__company" }, "上海公路投资建设发展有限公司"),
          vue.createElementVNode("view", { class: "card__body" }, [
            vue.createElementVNode(
              "text",
              { class: "card__name" },
              vue.toDisplayString(((_a = $setup.userInfo) == null ? void 0 : _a.userFullName) || ""),
              1
              /* TEXT */
            ),
            vue.createElementVNode(
              "text",
              { class: "card__dept" },
              vue.toDisplayString(((_b = $setup.userInfo) == null ? void 0 : _b.departmentName) || ""),
              1
              /* TEXT */
            )
          ])
        ]),
        vue.createElementVNode("image", {
          class: "card__avatar",
          src: _imports_0$2,
          mode: "aspectFill",
          loading: "lazy"
        })
      ]),
      vue.createElementVNode("view", { class: "list" }, [
        vue.createElementVNode("view", {
          class: "list__item",
          "hover-class": "list__item--hover",
          onClick: $setup.goMessage
        }, [
          vue.createElementVNode("view", { class: "item-icon item-icon-1" }, [
            vue.createElementVNode("image", {
              class: "list__icon",
              src: _imports_0$1,
              mode: "widthFix"
            })
          ]),
          vue.createElementVNode("text", { class: "list__text" }, "消息中心"),
          vue.createElementVNode("image", {
            class: "arrow-right-icon",
            src: _imports_1,
            mode: ""
          })
        ]),
        vue.createElementVNode("view", {
          class: "list__item merge-1",
          "hover-class": "list__item--hover",
          onClick: $setup.goSign
        }, [
          vue.createElementVNode("view", { class: "item-icon item-icon-2" }, [
            vue.createElementVNode("image", {
              class: "list__icon",
              src: _imports_3,
              mode: "widthFix"
            })
          ]),
          vue.createElementVNode("text", { class: "list__text" }, "签名维护"),
          vue.createElementVNode("image", {
            class: "arrow-right-icon",
            src: _imports_1,
            mode: ""
          }),
          vue.createElementVNode("view", { class: "merge-1-across" })
        ]),
        vue.createElementVNode("view", {
          class: "list__item merge-2",
          "hover-class": "list__item--hover",
          onClick: $setup.goHelp
        }, [
          vue.createElementVNode("view", { class: "item-icon item-icon-3" }, [
            vue.createElementVNode("image", {
              class: "list__icon",
              src: _imports_0,
              mode: "widthFix"
            })
          ]),
          vue.createElementVNode("text", { class: "list__text" }, "在线帮助"),
          vue.createElementVNode("image", {
            class: "arrow-right-icon",
            src: _imports_1,
            mode: ""
          })
        ]),
        vue.createElementVNode("view", {
          class: "list__item list__item--danger",
          "hover-class": "list__item--hover",
          onClick: $setup.goLogout
        }, [
          vue.createElementVNode("view", { class: "item-icon item-icon-4" }, [
            vue.createElementVNode("image", {
              class: "list__icon",
              src: _imports_5,
              mode: "widthFix"
            })
          ]),
          vue.createElementVNode("text", { class: "list__text" }, "安全登出"),
          vue.createElementVNode("image", {
            class: "arrow-right-icon",
            src: _imports_1,
            mode: ""
          })
        ])
      ]),
      vue.createVNode(
        $setup["confirmDialog"],
        {
          ref: "confirmRef",
          content: "确定退出吗？",
          onConfirm: $setup.doLogout
        },
        null,
        512
        /* NEED_PATCH */
      )
    ]);
  }
  const PagesNavProfile = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$h], ["__scopeId", "data-v-0c1eee4a"], ["__file", "E:/cityInvestment02/city-Investment/pages/nav/profile.vue"]]);
  const _sfc_main$h = {
    __name: "index",
    setup(__props, { expose: __expose }) {
      __expose();
      const searchVal = vue.ref("");
      const category1Options = vue.computed(() => [
        {
          label: "筛选条件一",
          value: "filter1_1"
        },
        {
          label: "筛选条件二",
          value: "filter1_2"
        },
        {
          label: "筛选条件三",
          value: "filter1_3"
        },
        {
          label: "筛选条件四",
          value: "filter1_4"
        },
        {
          label: "筛选条件五",
          value: "filter1_5"
        },
        {
          label: "筛选条件六",
          value: "filter1_6"
        },
        {
          label: "筛选条件七",
          value: "filter1_7"
        },
        {
          label: "筛选条件八",
          value: "filter1_8"
        },
        {
          label: "筛选条件九",
          value: "filter1_9"
        }
      ]);
      const category2Options = vue.computed(() => [
        {
          label: "筛选条件一",
          value: "filter2_1"
        },
        {
          label: "筛选条件二",
          value: "filter2_2"
        },
        {
          label: "筛选条件三",
          value: "filter2_3"
        },
        {
          label: "筛选条件四",
          value: "filter2_4"
        },
        {
          label: "筛选条件五",
          value: "filter2_5"
        },
        {
          label: "筛选条件六",
          value: "filter2_6"
        },
        {
          label: "筛选条件七",
          value: "filter2_7"
        },
        {
          label: "筛选条件八",
          value: "filter2_8"
        },
        {
          label: "筛选条件九",
          value: "filter2_9"
        }
      ]);
      const state = vue.reactive({
        category1: /* @__PURE__ */ new Set(["filter1_1", "filter1_4"]),
        // 默认选中筛选条件一和筛选条件四
        category2: /* @__PURE__ */ new Set(["filter2_1"])
        // 默认选中筛选条件一
      });
      function toggleFilter(set, value) {
        if (set.has(value)) {
          set.delete(value);
        } else {
          set.add(value);
        }
      }
      function onReset() {
        state.category1.clear();
        state.category2.clear();
      }
      function onConfirm() {
        ({
          category1: Array.from(state.category1),
          category2: Array.from(state.category2)
        });
      }
      function inputChange(e) {
        formatAppLog("log", "at pages/search/index.vue:165", "输入内容：", e);
        doBack();
      }
      const doSeach = () => {
        formatAppLog("log", "at pages/search/index.vue:169", "搜索：");
        doBack();
      };
      const doBack = () => {
        uni.navigateBack({});
      };
      const __returned__ = { searchVal, category1Options, category2Options, state, toggleFilter, onReset, onConfirm, inputChange, doSeach, doBack, ref: vue.ref, reactive: vue.reactive, computed: vue.computed, watch: vue.watch };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$6);
    const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0$5);
    const _component_uni_nav_bar = resolveEasycom(vue.resolveDynamicComponent("uni-nav-bar"), __easycom_0$4);
    return vue.openBlock(), vue.createElementBlock("view", { class: "filter-search" }, [
      vue.createElementVNode("view", { class: "header-stickt" }, [
        vue.createVNode(_component_uni_nav_bar, {
          border: false,
          class: "nav-bar-top"
        }, {
          left: vue.withCtx(() => [
            vue.createElementVNode("view", {
              class: "nav-bar-title",
              onClick: $setup.doBack
            }, [
              vue.createVNode(_component_uni_icons, {
                type: "left",
                size: "25",
                color: "#231815"
              })
            ])
          ]),
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "nav-input-view" }, [
              vue.createElementVNode("image", {
                class: "input-uni-icon",
                src: _imports_0$3,
                style: { "width": "32rpx", "height": "32rpx" },
                mode: ""
              }),
              vue.createVNode(_component_uni_easyinput, {
                height: "30px",
                modelValue: $setup.searchVal,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.searchVal = $event),
                placeholder: "搜索",
                onConfirm: $setup.inputChange
              }, null, 8, ["modelValue"]),
              vue.createElementVNode("view", { class: "verticle-view" }),
              vue.createElementVNode("text", {
                class: "search-bar",
                onClick: $setup.doSeach
              }, "搜索")
            ])
          ]),
          _: 1
          /* STABLE */
        })
      ]),
      vue.createElementVNode("scroll-view", {
        "scroll-y": "true",
        style: { "height": "100%", "margin-top": "36rpx" }
      }, [
        vue.createElementVNode("view", { class: "filter-category" }, [
          vue.createElementVNode("view", { class: "category-title" }, "筛选分类一"),
          vue.createElementVNode("view", { class: "filter-grid" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.category1Options, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: item.value,
                  class: vue.normalizeClass(["filter-item", { active: $setup.state.category1.has(item.value) }]),
                  onClick: ($event) => $setup.toggleFilter($setup.state.category1, item.value)
                }, vue.toDisplayString(item.label), 11, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ]),
        vue.createElementVNode("view", { class: "filter-category" }, [
          vue.createElementVNode("view", { class: "category-title" }, "筛选分类二"),
          vue.createElementVNode("view", { class: "filter-grid" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.category2Options, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: item.value,
                  class: vue.normalizeClass(["filter-item", { active: $setup.state.category2.has(item.value) }]),
                  onClick: ($event) => $setup.toggleFilter($setup.state.category2, item.value)
                }, vue.toDisplayString(item.label), 11, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ]),
        vue.createElementVNode("view", { style: { "height": "900rpx" } })
      ])
    ]);
  }
  const PagesSearchIndex = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$g], ["__scopeId", "data-v-2dab939d"], ["__file", "E:/cityInvestment02/city-Investment/pages/search/index.vue"]]);
  const FUND_USAGE_STATUS = `fund_usage_status`;
  const PAYMENT_ACCOUNT_INFORMATION = `payment_account_information`;
  const COLLECTION_ACCOUNT_INFORMATION = `collection_account_information`;
  const APPROVAL_RECORD = `approval_record`;
  const ATTACHMENT_LIST = `attachment_list`;
  const _sfc_main$g = {
    __name: "inputDialog",
    props: {
      modelValue: {
        type: Boolean,
        default: void 0
      },
      title: {
        type: String,
        default: void 0
      },
      placeholder: {
        type: String,
        default: void 0
      },
      maxlength: {
        type: Number,
        default: void 0
      },
      required: {
        type: Boolean,
        default: void 0
      },
      validator: {
        type: Function,
        default: void 0
      }
    },
    emits: ["confirm", "cancel"],
    setup(__props, { expose: __expose, emit: __emit }) {
      const handleConfirm = throttle(() => {
        doConfirm();
      }, 1e3);
      const props = __props;
      const emit = __emit;
      const popupRef = vue.ref(null);
      const innerValue = vue.ref("");
      const title = vue.computed(() => props.title ?? "输入内容");
      const placeholder = vue.computed(() => props.placeholder ?? "请输入内容");
      const inputType = vue.computed(() => props.inputType ?? "text");
      const maxlength = vue.computed(() => props.maxlength ?? 140);
      const dialogTypeObj = vue.reactive({ "打回原因": false, "通过原因": true });
      const confirmDisabled = vue.computed(() => {
        if (props.required && !innerValue.value)
          return true;
        const r = props.validator ? props.validator(innerValue.value) : true;
        return r !== true;
      });
      function open() {
        var _a, _b;
        (_b = (_a = popupRef.value) == null ? void 0 : _a.open) == null ? void 0 : _b.call(_a, "center");
      }
      function close() {
        var _a, _b;
        (_b = (_a = popupRef.value) == null ? void 0 : _a.close) == null ? void 0 : _b.call(_a);
      }
      function handleCancel() {
        emit("cancel");
        innerValue.value = "";
        close();
      }
      function doConfirm() {
        if (confirmDisabled.value)
          return;
        let dialogType = dialogTypeObj[props.title];
        emit("confirm", innerValue.value, dialogType);
        innerValue.value = "";
        close();
      }
      __expose({
        open,
        close
      });
      const __returned__ = { handleConfirm, props, emit, popupRef, innerValue, title, placeholder, inputType, maxlength, dialogTypeObj, confirmDisabled, open, close, handleCancel, doConfirm, get throttle() {
        return throttle;
      }, ref: vue.ref, watch: vue.watch, computed: vue.computed, reactive: vue.reactive };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0$5);
    const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_1);
    return vue.openBlock(), vue.createBlock(
      _component_uni_popup,
      {
        ref: "popupRef",
        type: "center",
        "mask-click": false
      },
      {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", { class: "idlg" }, [
            vue.createElementVNode(
              "text",
              { class: "idlg-title" },
              vue.toDisplayString($setup.title),
              1
              /* TEXT */
            ),
            vue.createElementVNode("view", { class: "idlg-input-wrap" }, [
              vue.createVNode(_component_uni_easyinput, {
                type: "textarea",
                placeholder: $setup.placeholder,
                clearable: true,
                maxlength: $setup.maxlength,
                autoHeight: "",
                modelValue: $setup.innerValue,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.innerValue = $event)
              }, null, 8, ["placeholder", "maxlength", "modelValue"])
            ]),
            vue.createElementVNode("view", { class: "idlg-footer" }, [
              vue.createElementVNode("view", {
                class: "btn cancel",
                onClick: $setup.handleCancel
              }, "取消"),
              vue.createElementVNode("view", { class: "divider" }),
              vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass(["btn confirm", { disabled: $setup.confirmDisabled }]),
                  onClick: _cache[1] || (_cache[1] = (...args) => $setup.handleConfirm && $setup.handleConfirm(...args))
                },
                "确定",
                2
                /* CLASS */
              )
            ])
          ])
        ]),
        _: 1
        /* STABLE */
      },
      512
      /* NEED_PATCH */
    );
  }
  const InputDialog = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$f], ["__scopeId", "data-v-ac9eec70"], ["__file", "E:/cityInvestment02/city-Investment/components/inputDialog/inputDialog.vue"]]);
  const _sfc_main$f = {
    __name: "approvalTimeline",
    props: {
      list: {
        type: Array,
        default: () => []
      }
    },
    setup(__props, { expose: __expose }) {
      __expose();
      const __returned__ = { get formatDateTime() {
        return formatDateTime;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$6);
    return vue.openBlock(), vue.createElementBlock("view", { class: "approval-timeline" }, [
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($props.list, (item, index) => {
          return vue.openBlock(), vue.createElementBlock("view", {
            class: "approval-item",
            key: index
          }, [
            vue.createElementVNode("view", { class: "timeline-indicator-container" }, [
              vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass(["timeline-indicator", {
                    "status-pending": item.approvalActionType === "vmPending",
                    "status-approved": item.approvalActionType === "已审批" && item.approvalResult == "批准",
                    "status-rejected": item.approvalActionType === "已审批" && (item.approvalResult == "驳回" || item.approvalResult == "已拒绝"),
                    "status-successed": item.approvalResult == "完成" || item.approvalResult === "处理完成",
                    "status-submitted": item.approvalActionType === "提交"
                  }])
                },
                [
                  item.approvalResult == "完成" || item.approvalResult === "处理完成" ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "indicator-checkmark"
                  }, [
                    vue.createVNode(_component_uni_icons, {
                      type: "smallcircle-filled",
                      size: "12",
                      color: "#07c160"
                    })
                  ])) : vue.createCommentVNode("v-if", true),
                  item.approvalActionType === "已审批" && item.approvalResult == "批准" ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 1,
                    class: "indicator-checkmark"
                  }, [
                    vue.createVNode(_component_uni_icons, {
                      type: "checkmarkempty",
                      size: "10",
                      color: "#07c160"
                    })
                  ])) : vue.createCommentVNode("v-if", true),
                  item.approvalActionType === "已审批" && (item.approvalResult == "驳回" || item.approvalResult == "已拒绝") ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 2,
                    class: "indicator-checkmark"
                  }, [
                    vue.createVNode(_component_uni_icons, {
                      type: "checkmarkempty",
                      size: "10",
                      color: "#ffb800"
                    })
                  ])) : item.approvalActionType === "vmPending" ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 3,
                    class: "indicator-loading"
                  })) : item.approvalActionType === "提交" ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 4,
                    class: "indicator-empty"
                  })) : vue.createCommentVNode("v-if", true)
                ],
                2
                /* CLASS */
              )
            ]),
            vue.createElementVNode("view", { class: "approval-content" }, [
              vue.createElementVNode("view", { class: "approval-header" }, [
                vue.createElementVNode("view", { class: "approval-title" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "title-text" },
                    vue.toDisplayString(item.stepName),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    {
                      class: vue.normalizeClass(["title-status", {
                        "status-text-green": item.approvalActionType === "已审批" || item.approvalActionType === "vmPending" || item.approvalActionType === "提交"
                      }])
                    },
                    vue.toDisplayString(item.approvalActionType == "vmPending" ? "审批中" : item.approvalActionType),
                    3
                    /* TEXT, CLASS */
                  )
                ])
              ]),
              vue.createElementVNode("view", { class: "approval-body" }, [
                vue.createElementVNode("view", {
                  class: "approval-info",
                  style: { "display": "flex", "justify-content": "flex-start", "gap": "10rpx" }
                }, [
                  vue.createElementVNode(
                    "text",
                    { class: "approver-name" },
                    vue.toDisplayString(item.approverDisplayName),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "view",
                    {
                      class: vue.normalizeClass(["action-btn", {
                        "btn-approved": item.approvalResult == "批准" || item.approvalResult == "提交" || item.approvalResult == "完成" || item.approvalResult === "处理完成",
                        "btn-pending": item.approvalResult == "待审批",
                        "btn-rejected": item.approvalResult == "驳回" || item.approvalResult == "已拒绝"
                      }])
                    },
                    vue.toDisplayString(item.approvalResult),
                    3
                    /* TEXT, CLASS */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "approval-time" },
                    vue.toDisplayString($setup.formatDateTime(item.approvalResult == "待审批" ? item.approvalTime : item.createdDate)),
                    1
                    /* TEXT */
                  )
                ]),
                item.approvalComment ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "approval-remark"
                }, [
                  vue.createElementVNode("text", { class: "remark-label" }, "备注:"),
                  vue.createElementVNode(
                    "text",
                    { class: "remark-text" },
                    vue.toDisplayString(item.approvalComment),
                    1
                    /* TEXT */
                  )
                ])) : vue.createCommentVNode("v-if", true)
              ])
            ])
          ]);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ]);
  }
  const approvalTimeline = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$e], ["__scopeId", "data-v-55629a9e"], ["__file", "E:/cityInvestment02/city-Investment/components/approvalTimeline/approvalTimeline.vue"]]);
  const _sfc_main$e = {
    __name: "attachmentList",
    props: {
      list: {
        type: Array,
        default: () => []
      }
    },
    setup(__props, { expose: __expose }) {
      __expose();
      const props = __props;
      const lists = vue.computed(() => {
        return props.list;
      });
      const previewPopupRef = vue.ref(null);
      const currentAttachment = vue.ref(null);
      const isImage = vue.computed(() => {
        const file = currentAttachment.value;
        if (!file)
          return false;
        return ["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(getFileExt(file));
      });
      const resolveIcon = (item) => {
        const ext = getFileExt(item);
        if (["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(ext)) {
          return "../../static/images/pic.png";
        }
        if (ext === "pdf") {
          return "../../static/images/pdf.png";
        }
        if (["xls", "xlsx", "csv"].includes(ext)) {
          return "../../static/images/excel.png";
        }
        if (["doc", "docx"].includes(ext)) {
          return "../../static/images/docx.png";
        }
        return "../../static/images/file.png";
      };
      const handlePreview = (item) => {
        currentAttachment.value = item;
        vue.nextTick(() => {
          var _a;
          (_a = previewPopupRef.value) == null ? void 0 : _a.open();
        });
      };
      const closePopup = () => {
        var _a;
        (_a = previewPopupRef.value) == null ? void 0 : _a.close();
      };
      const openAttachment = () => {
        var _a;
        const url = (_a = currentAttachment.value) == null ? void 0 : _a.fileUrl;
        if (!url) {
          uni.showToast({ title: "暂无附件地址", icon: "none" });
          return;
        }
        uni.showLoading({ title: "加载中", mask: true });
        uni.downloadFile({
          url,
          success(res) {
            if (res.statusCode === 200) {
              uni.openDocument({
                filePath: res.tempFilePath,
                showMenu: true,
                complete() {
                  uni.hideLoading();
                }
              });
            } else {
              uni.hideLoading();
              uni.showToast({ title: "文件下载失败", icon: "none" });
            }
          },
          fail() {
            uni.hideLoading();
            uni.showToast({ title: "文件打开失败", icon: "none" });
          }
        });
      };
      const getFileExt = (item) => {
        const url = (item == null ? void 0 : item.fileName) || (item == null ? void 0 : item.fileUrl) || "";
        const source = url;
        const match = /\.([a-zA-Z0-9]+)(?:\?|#|$)/.exec(source);
        return match ? match[1].toLowerCase() : "";
      };
      const __returned__ = { props, lists, previewPopupRef, currentAttachment, isImage, resolveIcon, handlePreview, closePopup, openAttachment, getFileExt, ref: vue.ref, computed: vue.computed, nextTick: vue.nextTick };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$6);
    const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "attachment-wrapper" }, [
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($setup.lists, (item) => {
          return vue.openBlock(), vue.createElementBlock("view", {
            class: "attachment-list",
            key: item.fileTagName
          }, [
            vue.createElementVNode("view", { class: "attachment-header" }, [
              vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass(["attachment-header-bar", { "attachment-header-bar-2": item.children.length > 0 }])
                },
                null,
                2
                /* CLASS */
              ),
              vue.createElementVNode(
                "text",
                { class: "attachment-header-text" },
                vue.toDisplayString(item.fileTagName),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "attachment-item-list" }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(item.children, (items) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "attachment-item",
                    key: items.id,
                    onClick: ($event) => $setup.handlePreview(items)
                  }, [
                    vue.createElementVNode("view", { class: "attachment-item-icon" }, [
                      vue.createElementVNode("image", {
                        src: $setup.resolveIcon(items),
                        mode: "aspectFit",
                        class: "attachment-icon-image"
                      }, null, 8, ["src"])
                    ]),
                    vue.createElementVNode(
                      "view",
                      { class: "attachment-item-text" },
                      vue.toDisplayString(items.fileName),
                      1
                      /* TEXT */
                    )
                  ], 8, ["onClick"]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])
          ]);
        }),
        128
        /* KEYED_FRAGMENT */
      )),
      vue.createVNode(
        _component_uni_popup,
        {
          ref: "previewPopupRef",
          type: "bottom",
          "mask-click": true
        },
        {
          default: vue.withCtx(() => {
            var _a;
            return [
              vue.createElementVNode(
                "view",
                {
                  class: "preview-popup",
                  onTouchmove: _cache[0] || (_cache[0] = vue.withModifiers(() => {
                  }, ["stop", "prevent"]))
                },
                [
                  vue.createElementVNode("view", { class: "preview-header" }, [
                    vue.createElementVNode(
                      "text",
                      { class: "preview-title" },
                      vue.toDisplayString(((_a = $setup.currentAttachment) == null ? void 0 : _a.fileTagName) || "附件预览"),
                      1
                      /* TEXT */
                    ),
                    vue.createVNode(_component_uni_icons, {
                      type: "closeempty",
                      size: "30",
                      color: "#666",
                      onClick: $setup.closePopup
                    })
                  ]),
                  $setup.currentAttachment ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "preview-body"
                  }, [
                    $setup.isImage ? (vue.openBlock(), vue.createElementBlock("image", {
                      key: 0,
                      class: "preview-image",
                      src: $setup.currentAttachment.fileUrl || $setup.currentAttachment.url,
                      mode: "aspectFit",
                      "show-menu-by-longpress": ""
                    }, null, 8, ["src"])) : (vue.openBlock(), vue.createElementBlock("view", {
                      key: 1,
                      class: "preview-file"
                    }, [
                      vue.createElementVNode("image", {
                        src: $setup.resolveIcon($setup.currentAttachment),
                        mode: "aspectFit",
                        class: "preview-file-icon"
                      }, null, 8, ["src"]),
                      vue.createElementVNode(
                        "text",
                        { class: "preview-file-name" },
                        vue.toDisplayString($setup.currentAttachment.fileName || $setup.currentAttachment.fileUrl || "无文件名称"),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode("view", { class: "preview-actions" }, [
                        vue.createElementVNode("view", {
                          class: "preview-action-btn",
                          onClick: $setup.openAttachment
                        }, [
                          vue.createVNode(_component_uni_icons, {
                            type: "download",
                            size: "28",
                            color: "#3C6CFE"
                          }),
                          vue.createElementVNode("text", { class: "preview-action-text" }, "打开附件")
                        ])
                      ])
                    ]))
                  ])) : vue.createCommentVNode("v-if", true)
                ],
                32
                /* NEED_HYDRATION */
              )
            ];
          }),
          _: 1
          /* STABLE */
        },
        512
        /* NEED_PATCH */
      )
    ]);
  }
  const attachmentList = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$d], ["__scopeId", "data-v-7889ef35"], ["__file", "E:/cityInvestment02/city-Investment/components/attachmentList/attachmentList.vue"]]);
  const ROW_H = 60;
  const _sfc_main$d = {
    __name: "gcfk",
    setup(__props, { expose: __expose }) {
      __expose();
      vue.useCssVars((_ctx) => ({
        "7292c938-scrollerHeight": scrollerHeight.value
      }));
      const statusBarHeight = vue.ref(0);
      let eventChannel;
      onLoad(() => {
        var _a, _b, _c;
        const h = getStorage("statusBarHeight");
        if (Number(h))
          statusBarHeight.value = Number(h);
        eventChannel = (_c = (_b = (_a = vue.getCurrentInstance()) == null ? void 0 : _a.proxy) == null ? void 0 : _b.getOpenerEventChannel) == null ? void 0 : _c.call(_b);
        eventChannel.on("open-detail", (data) => {
          formatAppLog("log", "at pages/detail/gcfk.vue:762", "open-detail", data);
          currentType.value = data.type;
          itemDetail.value = data.order;
          getFormDataApproval();
          getApprovalRecord();
        });
      });
      const currentType = vue.ref("");
      const currentUrlObj = vue.reactive({
        pending: "/WF/GetFormDataApproval",
        completed: "/WF/GetFormDataView"
      });
      const inputDialogRef = vue.ref(null);
      const inputDialogRequired = vue.ref(false);
      const inputDialogTitle = vue.ref("");
      const inputDialogPlaceholder = vue.ref("");
      const inputDialogValue = vue.ref("");
      const scrollerHeight = vue.ref("0px");
      const itemDetail = vue.ref({});
      const stageTags = vue.ref([]);
      const amountColumns = vue.ref(["总金额", "总金额"]);
      const wfstatusText = vue.computed(() => {
        return itemDatas.value.wfstatus == "Running" ? "流转中" : itemDatas.value.wfstatus == "Completed" ? "已审批" : "";
      });
      const attachmentData = vue.ref([]);
      const categories = vue.computed(() => [
        {
          name: "城投拨付资金",
          items: [
            {
              label: "市财力",
              key: "planToPayCtfundCityPr"
            },
            {
              label: "土地出让金",
              key: "planToPayCtfundLandTransferFeePr"
            },
            {
              label: "专项债",
              key: "planToPayCtfundSpecialPurposeBondPr"
            },
            {
              label: "城投其他资金",
              key: "planToPayCtfundOtherPr"
            },
            {
              label: "资本金",
              key: "planToPayCtfundCapitalPr"
            }
          ]
        },
        {
          name: "非城投拨付资金",
          items: [
            {
              label: "市级财力",
              key: "planToPayNonCtfundCityPr"
            },
            {
              label: "区县财力",
              key: "planToPayNonCtfundDistrictPr"
            },
            {
              label: "自筹资金",
              key: "planToPayNonCtfundSelfPr"
            },
            {
              label: "其他",
              key: "planToPayNonCtfundOtherPr"
            }
          ]
        },
        {
          name: "直拨(无资金流入)",
          items: [
            {
              label: "交通专项",
              key: "planToPayDirectFundTransportationSpecialPr"
            },
            {
              label: "超长期国债",
              key: "planToPayDirectFundUltraTbpr"
            },
            {
              label: "其他",
              key: "planToPayDirectFundOtherPr"
            }
          ]
        }
      ]);
      const pullDownObj = vue.reactive({
        [FUND_USAGE_STATUS]: true,
        [PAYMENT_ACCOUNT_INFORMATION]: true,
        [COLLECTION_ACCOUNT_INFORMATION]: true,
        [APPROVAL_RECORD]: true,
        [ATTACHMENT_LIST]: true
      });
      const setOptions = (name) => {
        pullDownObj[name] = pullDownObj[name] ? false : true;
      };
      const getOptions = (name) => {
        return pullDownObj[name];
      };
      const urlParams = vue.computed(() => {
        let params = {
          pending: {
            procCode: itemDetail.value.procDefCode,
            workitemid: itemDetail.value.workItemId
          },
          completed: {
            procCode: itemDetail.value.procDefCode,
            wfInstanceId: itemDetail.value.wfinstanceId
          }
        };
        return params[currentType.value];
      });
      const infoRows = vue.ref([
        {
          label: "项目名称",
          value: "",
          key: "projectName"
        },
        {
          label: "项目阶段/预算事项",
          value: "",
          key: "budgetContent"
        },
        {
          label: "付款单位",
          value: "",
          key: "companyName"
        },
        {
          label: "合同名称",
          value: "",
          key: "contractName"
        },
        {
          label: "合同编号",
          value: "",
          key: "contractNo"
        },
        // {
        // 	label: '收款单位',
        // 	value: '',
        // 	key: 'payToCompany' //deng
        // },
        {
          label: "具体事项",
          value: "",
          key: "detailedDescription"
        },
        {
          label: "业务性质",
          value: "",
          key: "businessNature"
        },
        {
          label: "业务类别",
          value: "",
          key: "businessCategory"
        },
        {
          label: "付款内容",
          value: "",
          key: "contentDescription"
        },
        {
          label: "预算事项",
          value: "",
          key: "lv1AccountName"
          //deng 潜在bug
        },
        {
          label: "支付节点",
          value: "",
          // key: 'budgetCategoryId'
          key: "budgetCategoryName"
        },
        // {
        // 	label: '业务备注',
        // 	value: '',
        // 	key: '' //deng
        // },
        // {
        // 	label: '备注',
        // 	value: '',
        // 	key: '' //deng
        // },
        {
          label: "保函有效期",
          value: "",
          key: "guaranteeLetterValidTo"
        },
        {
          label: "业务摘要",
          value: "",
          key: "businessRemarkPr"
        }
      ]);
      function goBack() {
        uni.navigateBack();
      }
      const itemDatas = vue.ref({});
      const roadSectionList = vue.ref([]);
      const getFormDataApproval = () => {
        http.get(currentUrlObj[currentType.value], urlParams.value).then((res) => {
          var _a;
          let data = res.data || {};
          itemDatas.value = (data == null ? void 0 : data.itemdata) || {};
          infoRows.value.forEach((item) => {
            item.value = itemDatas.value[item.key] || "";
            if (item.key === "lv1AccountName") {
              item.value = itemDatas.value.lv3AccountName || itemDatas.value.lv2AccountName || itemDatas.value.lv1AccountName || "";
            }
          });
          if (itemDatas.value.businessCategory) {
            stageTags.value.push(itemDatas.value.businessCategory);
          }
          if (itemDatas.value.businessUnitName) {
            stageTags.value.push(itemDatas.value.businessUnitName);
          }
          if (itemDatas.value.budgetCategoryName) {
            stageTags.value.push(itemDatas.value.budgetCategoryName);
          }
          if (itemDatas.value.roadSectionList && itemDatas.value.roadSectionList.length > 0) {
            roadSectionList.value = itemDatas.value.roadSectionList;
          }
          let arr1 = (((_a = itemDatas.value) == null ? void 0 : _a.attachmentList) || []).map((item) => {
            return {
              fileTagName: item.fileTagName,
              fileName: item.fileName,
              fileUrl: item.fileUrl,
              id: item.attachmentId
            };
          });
          attachmentData.value = [
            { fileTagName: "工程付款申请单", children: [] },
            { fileTagName: "工程费用支付申请表", children: [] },
            { fileTagName: "发票", children: [] },
            { fileTagName: "财务监理付款意见书", children: [] },
            { fileTagName: "合同要求其他资料", children: [] }
          ];
          const attachmentMap = /* @__PURE__ */ new Map();
          attachmentData.value.forEach((item) => {
            attachmentMap.set(item.fileTagName, item);
          });
          formatAppLog("log", "at pages/detail/gcfk.vue:1130", "attachmentMap=>", attachmentMap);
          arr1.forEach((childItem) => {
            const parent = attachmentMap.get(childItem.fileTagName);
            if (parent) {
              parent.children.push(childItem);
            }
          });
        });
      };
      const onReject = () => {
        inputDialogRequired.value = true;
        openInputDialog("打回原因", "请输入打回原因");
      };
      const onApprove = () => {
        inputDialogRequired.value = false;
        openInputDialog("通过原因", "请输入通过原因");
      };
      const openInputDialog = (title, placeholder) => {
        inputDialogTitle.value = title;
        inputDialogPlaceholder.value = placeholder;
        inputDialogRef.value.open();
      };
      const handleInputConfirm = (value, dialogType) => {
        inputDialogValue.value = value;
        inputDialogRef.value.close();
        doSubmitApproval(dialogType);
      };
      const handleInputCancel = () => {
        inputDialogRef.value.close();
        inputDialogValue.value = "";
      };
      const doSubmitApproval = (dialogType) => {
        let params = {
          wfInstanceId: itemDetail.value.wfinstanceId,
          workItemId: itemDetail.value.workItemId,
          approvalComment: inputDialogValue.value,
          annotationComment: "",
          pictureBaseData: "",
          isApproval: dialogType,
          procDefCode: itemDetail.value.procDefCode
          //ZC01和GC01两个类型的可以了
        };
        http.post("/WF/SubmitApproval", params).then((res) => {
          if (res.code === 0) {
            uni.showToast({
              title: "已审批",
              icon: "success"
            });
            setTimeout(() => {
              if (currentType.value === "pending") {
                uni.$emit("refresh-pending");
                uni.$emit("refresh-completed");
              }
              goBack();
            }, 1e3);
          } else {
            uni.showToast({
              title: res.message,
              icon: "none"
            });
          }
        });
      };
      const approvalRecordList = vue.ref([]);
      const getApprovalRecord = () => {
        http.get("/WF/GetApprovalHistory", {
          wfinstanceId: itemDetail.value.wfinstanceId
        }).then((res) => {
          formatAppLog("log", "at pages/detail/gcfk.vue:1208", res);
          approvalRecordList.value = res.data || [];
        });
      };
      function computeScrollHeight() {
        try {
          const {
            windowHeight
          } = uni.getSystemInfoSync();
          const inst = vue.getCurrentInstance();
          const q = uni.createSelectorQuery().in(inst == null ? void 0 : inst.proxy);
          q.select(".header-stickt").boundingClientRect((data) => {
            const headerH = (data == null ? void 0 : data.height) || 0;
            const h = Math.max(0, windowHeight - headerH);
            scrollerHeight.value = `${h}px`;
          }).exec();
        } catch (e) {
          scrollerHeight.value = "calc(100vh - 88rpx)";
        }
      }
      vue.onMounted(() => {
        var _a;
        vue.nextTick(() => {
          computeScrollHeight();
        });
        const systemInfo2 = uni.getSystemInfoSync();
        const isIOS = systemInfo2.platform === "ios";
        const isH5 = systemInfo2.platform === "h5" || false;
        if (isIOS && isH5) {
          formatAppLog("log", "at pages/detail/gcfk.vue:1254", "检测到 iOS H5 环境，添加滚动修复");
          document.addEventListener("focusout", () => {
            setTimeout(() => {
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: "instant"
              });
            }, 20);
          });
        } else {
          (_a = window.visualViewport) == null ? void 0 : _a.addEventListener("resize", onResize);
          window.addEventListener("resize", onResize);
        }
      });
      function onResize() {
        setTimeout(() => {
          computeScrollHeight();
        }, 100);
      }
      const __returned__ = { statusBarHeight, get eventChannel() {
        return eventChannel;
      }, set eventChannel(v) {
        eventChannel = v;
      }, currentType, currentUrlObj, inputDialogRef, inputDialogRequired, inputDialogTitle, inputDialogPlaceholder, inputDialogValue, scrollerHeight, itemDetail, stageTags, amountColumns, wfstatusText, attachmentData, ROW_H, categories, pullDownObj, setOptions, getOptions, urlParams, infoRows, goBack, itemDatas, roadSectionList, getFormDataApproval, onReject, onApprove, openInputDialog, handleInputConfirm, handleInputCancel, doSubmitApproval, approvalRecordList, getApprovalRecord, computeScrollHeight, onResize, get onLoad() {
        return onLoad;
      }, ref: vue.ref, reactive: vue.reactive, onMounted: vue.onMounted, nextTick: vue.nextTick, getCurrentInstance: vue.getCurrentInstance, computed: vue.computed, get getStorage() {
        return getStorage;
      }, get FUND_USAGE_STATUS() {
        return FUND_USAGE_STATUS;
      }, get PAYMENT_ACCOUNT_INFORMATION() {
        return PAYMENT_ACCOUNT_INFORMATION;
      }, get COLLECTION_ACCOUNT_INFORMATION() {
        return COLLECTION_ACCOUNT_INFORMATION;
      }, get APPROVAL_RECORD() {
        return APPROVAL_RECORD;
      }, get ATTACHMENT_LIST() {
        return ATTACHMENT_LIST;
      }, get http() {
        return http;
      }, get formatNumber() {
        return formatNumber;
      }, get formatDateTime() {
        return formatDateTime;
      }, InputDialog, approvalTimeline, attachmentList };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_nav_bar = resolveEasycom(vue.resolveDynamicComponent("uni-nav-bar"), __easycom_0$4);
    return vue.openBlock(), vue.createElementBlock("view", { class: "detail-page" }, [
      vue.createElementVNode("view", { class: "header-stickt" }, [
        vue.createElementVNode(
          "view",
          {
            class: "status_bar",
            style: vue.normalizeStyle({ height: `${$setup.statusBarHeight * 2}rpx` })
          },
          null,
          4
          /* STYLE */
        ),
        vue.createVNode(_component_uni_nav_bar, { class: "nav-bar-top" }, {
          left: vue.withCtx(() => [
            vue.createElementVNode("view", {
              class: "back-btn",
              onClick: $setup.goBack
            })
          ]),
          right: vue.withCtx(() => [
            vue.createElementVNode("view", { style: { "width": "40rpx" } })
          ]),
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "nav-title" }, "审批详情")
          ]),
          _: 1
          /* STABLE */
        }),
        vue.createElementVNode("view", { class: "hero-card" }, [
          vue.createElementVNode("view", { class: "hero-header" }, [
            vue.createElementVNode("view", { class: "project-name" }, [
              vue.createElementVNode(
                "view",
                { class: "project-name-1" },
                vue.toDisplayString($setup.itemDetail.taskName),
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "view",
                { class: "project-name-1" },
                vue.toDisplayString($setup.itemDatas.projectName),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "amount-box" }, [
              vue.createElementVNode("view", { class: "amount-label" }, "申请支付总金额"),
              vue.createElementVNode("view", { class: "amount-value" }, [
                vue.createElementVNode("text", { class: "amount-value-symbol" }, "¥"),
                vue.createElementVNode(
                  "text",
                  { class: "amount-value-number" },
                  vue.toDisplayString($setup.formatNumber($setup.itemDatas.planToPayTotalPr)),
                  1
                  /* TEXT */
                )
              ])
            ])
          ]),
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["hero-tags", { "hero-tags-width": $setup.currentType != "pending" }])
            },
            [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($setup.stageTags, (t2, i) => {
                  return vue.openBlock(), vue.createElementBlock(
                    "view",
                    {
                      class: "tag",
                      key: i
                    },
                    vue.toDisplayString(t2),
                    1
                    /* TEXT */
                  );
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ],
            2
            /* CLASS */
          ),
          vue.withDirectives(vue.createElementVNode(
            "view",
            { class: "hero-actions" },
            [
              vue.createElementVNode("view", {
                class: "btn outline",
                onClick: $setup.onReject
              }, "打回"),
              vue.createElementVNode("view", {
                class: "btn primary",
                onClick: $setup.onApprove
              }, "通过")
            ],
            512
            /* NEED_PATCH */
          ), [
            [vue.vShow, $setup.currentType === "pending"]
          ]),
          vue.withDirectives(vue.createElementVNode(
            "view",
            { class: "wfstatus-actions" },
            vue.toDisplayString($setup.wfstatusText),
            513
            /* TEXT, NEED_PATCH */
          ), [
            [vue.vShow, $setup.currentType === "completed" && ($setup.itemDatas.wfstatus == "Running" || $setup.itemDatas.wfstatus == "Completed")]
          ])
        ])
      ]),
      vue.createElementVNode("scroll-view", {
        "scroll-y": "true",
        class: "scroller"
      }, [
        vue.createElementVNode("view", { class: "section" }, [
          vue.createElementVNode("view", { class: "section-title" }, [
            vue.createElementVNode("text", { class: "section-title-vertical" }),
            vue.createElementVNode("text", { class: "section-title-text" }, "基本信息")
          ]),
          vue.createElementVNode("view", { class: "info-list" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.infoRows, (row, idx) => {
                return vue.openBlock(), vue.createElementBlock(
                  "view",
                  {
                    class: vue.normalizeClass(["info-item", { "info-item-column": row.value?.length > 34 }]),
                    key: idx
                  },
                  [
                    vue.createElementVNode(
                      "text",
                      { class: "info-label" },
                      vue.toDisplayString(row.label),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "text",
                      {
                        class: vue.normalizeClass(["info-value", { "info-value-left": row.value?.length > 34 }])
                      },
                      vue.toDisplayString(row.value || "--"),
                      3
                      /* TEXT, CLASS */
                    )
                  ],
                  2
                  /* CLASS */
                );
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ]),
        vue.createElementVNode("view", { class: "section" }, [
          vue.createElementVNode("view", {
            class: "section-title-2",
            onClick: _cache[0] || (_cache[0] = ($event) => $setup.setOptions($setup.FUND_USAGE_STATUS))
          }, [
            vue.createElementVNode("view", { class: "section-title-2-left" }, [
              vue.createElementVNode("text", { class: "section-title-vertical" }),
              vue.createElementVNode("text", { class: "section-title-text" }, "用款情况")
            ]),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["section-title-2-right", { "active": $setup.getOptions($setup.FUND_USAGE_STATUS) }])
              },
              null,
              2
              /* CLASS */
            )
          ]),
          vue.createVNode(vue.Transition, { name: "collapse" }, {
            default: vue.withCtx(() => [
              $setup.getOptions($setup.FUND_USAGE_STATUS) ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "usage-details"
              }, [
                vue.createElementVNode("view", { class: "contract-section" }, [
                  vue.createElementVNode("view", { class: "contract-header" }, " 整体合同 "),
                  vue.createElementVNode("view", { class: "contract-details" }, [
                    vue.createElementVNode("view", { class: "detail-row" }, [
                      vue.createElementVNode("text", { class: "detail-label" }, "合同价/审定价"),
                      vue.createElementVNode(
                        "text",
                        { class: "detail-value" },
                        vue.toDisplayString($setup.formatNumber($setup.itemDatas.contractPrice)),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "detail-row" }, [
                      vue.createElementVNode("text", { class: "detail-label" }, "累计付款 含本次"),
                      vue.createElementVNode(
                        "text",
                        { class: "detail-value" },
                        vue.toDisplayString($setup.formatNumber($setup.itemDatas.contractPaymentTotalIncludeCurrentPr)),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "detail-row" }, [
                      vue.createElementVNode("text", { class: "detail-label" }, "累计付款 不含本次"),
                      vue.createElementVNode(
                        "text",
                        { class: "detail-value" },
                        vue.toDisplayString($setup.formatNumber($setup.itemDatas.contractPaymentTotalExcludeCurrentPr)),
                        1
                        /* TEXT */
                      )
                    ])
                  ]),
                  vue.createElementVNode(
                    "view",
                    { class: "contract-header" },
                    " 其中" + vue.toDisplayString($setup.itemDatas.highlightPartName || ""),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("view", { class: "contract-details" }, [
                    vue.createElementVNode("view", { class: "detail-row" }, [
                      vue.createElementVNode("text", { class: "detail-label" }, "合同价/审定价"),
                      vue.createElementVNode(
                        "text",
                        { class: "detail-value" },
                        vue.toDisplayString($setup.formatNumber($setup.itemDatas.highlightPartPrice)),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "detail-row" }, [
                      vue.createElementVNode("text", { class: "detail-label" }, "累计付款 含本次"),
                      vue.createElementVNode(
                        "text",
                        { class: "detail-value" },
                        vue.toDisplayString($setup.formatNumber($setup.itemDatas.highlightPaymentTotalIncludeCurrent2Pr)),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "detail-row" }, [
                      vue.createElementVNode("text", { class: "detail-label" }, "累计付款 不含本次"),
                      vue.createElementVNode(
                        "text",
                        { class: "detail-value" },
                        vue.toDisplayString($setup.formatNumber($setup.itemDatas.highlightPaymentTotalExcludeCurrent2Pr)),
                        1
                        /* TEXT */
                      )
                    ])
                  ])
                ]),
                vue.createElementVNode("view", { class: "other-info" }, [
                  vue.createElementVNode("view", { class: "detail-row" }, [
                    vue.createElementVNode("text", { class: "detail-label" }, "验工计价年月"),
                    vue.createElementVNode(
                      "text",
                      { class: "detail-value" },
                      vue.toDisplayString($setup.itemDatas.settlementYearMonth || "0.00"),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode("view", { class: "detail-row" }, [
                    vue.createElementVNode("text", { class: "detail-label" }, "验工计价期数"),
                    vue.createElementVNode(
                      "text",
                      { class: "detail-value" },
                      vue.toDisplayString($setup.itemDatas.settlementPhase || "0.00"),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode("view", { class: "detail-row" }, [
                    vue.createElementVNode("text", { class: "detail-label" }, "对应工作量"),
                    vue.createElementVNode(
                      "text",
                      { class: "detail-value" },
                      vue.toDisplayString($setup.formatNumber($setup.itemDatas.settlementWorkload)),
                      1
                      /* TEXT */
                    )
                  ])
                ]),
                vue.createElementVNode("view", { class: "contract-section" }, [
                  $setup.roadSectionList.length === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "contract-header"
                  }, " 用款性质 ")) : vue.createCommentVNode("v-if", true),
                  $setup.roadSectionList.length === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 1,
                    class: "contract-details"
                  }, [
                    vue.createElementVNode("view", { class: "detail-row" }, [
                      vue.createElementVNode("text", { class: "detail-label" }, "确定性"),
                      vue.createElementVNode(
                        "text",
                        { class: "detail-value" },
                        vue.toDisplayString($setup.formatNumber($setup.itemDatas.planToPayConfirmedPr)),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "detail-row" }, [
                      vue.createElementVNode("text", { class: "detail-label" }, "预估性"),
                      vue.createElementVNode(
                        "text",
                        { class: "detail-value" },
                        vue.toDisplayString($setup.formatNumber($setup.itemDatas.planToPayEstimatedPr)),
                        1
                        /* TEXT */
                      )
                    ])
                  ])) : vue.createCommentVNode("v-if", true),
                  $setup.roadSectionList.length > 0 ? (vue.openBlock(), vue.createElementBlock("scroll-view", {
                    key: 2,
                    "scroll-x": "",
                    class: "table-scroll-x"
                  }, [
                    vue.createElementVNode("table", {
                      cellspacing: "0",
                      cellpadding: "0",
                      class: "table1 table2"
                    }, [
                      vue.createElementVNode("tbody", null, [
                        vue.createElementVNode("tr", null, [
                          vue.createElementVNode("td", {
                            colspan: "2",
                            class: "type font_w sticky-xz-1"
                          }, "用款性质"),
                          (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList($setup.roadSectionList, (value) => {
                              return vue.openBlock(), vue.createElementBlock(
                                "td",
                                {
                                  class: "type font_w text_right",
                                  key: value.id
                                },
                                vue.toDisplayString(value.roadName),
                                1
                                /* TEXT */
                              );
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ]),
                        vue.createElementVNode("tr", null, [
                          vue.createElementVNode("td", { class: "text sticky-xz-1" }, "确定性"),
                          vue.createElementVNode(
                            "td",
                            { class: "info sticky-xz-2" },
                            vue.toDisplayString($setup.formatNumber($setup.itemDatas.planToPayConfirmedPr)),
                            1
                            /* TEXT */
                          ),
                          (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList($setup.roadSectionList, (value) => {
                              return vue.openBlock(), vue.createElementBlock(
                                "td",
                                {
                                  class: "info",
                                  key: value.id
                                },
                                vue.toDisplayString($setup.formatNumber(value.confirmed)),
                                1
                                /* TEXT */
                              );
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ]),
                        vue.createElementVNode("tr", null, [
                          vue.createElementVNode("td", { class: "text sticky-xz-1" }, "预估性"),
                          vue.createElementVNode(
                            "td",
                            { class: "info sticky-xz-2" },
                            vue.toDisplayString($setup.formatNumber($setup.itemDatas.planToPayEstimatedPr)),
                            1
                            /* TEXT */
                          ),
                          (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList($setup.roadSectionList, (value) => {
                              return vue.openBlock(), vue.createElementBlock(
                                "td",
                                {
                                  class: "info",
                                  key: value.id
                                },
                                vue.toDisplayString($setup.formatNumber(value.estimated)),
                                1
                                /* TEXT */
                              );
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ])
                      ])
                    ])
                  ])) : vue.createCommentVNode("v-if", true),
                  $setup.roadSectionList.length === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 3,
                    class: "contract-header"
                  }, " 款项类型 ")) : vue.createCommentVNode("v-if", true),
                  $setup.roadSectionList.length === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 4,
                    class: "contract-details"
                  }, [
                    vue.createElementVNode("view", { class: "detail-row" }, [
                      vue.createElementVNode("text", { class: "detail-label" }, "工程费用"),
                      vue.createElementVNode(
                        "text",
                        { class: "detail-value" },
                        vue.toDisplayString($setup.formatNumber($setup.itemDatas.planToPayConstructionAmountPr)),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "detail-row" }, [
                      vue.createElementVNode("text", { class: "detail-label" }, "农民工工资"),
                      vue.createElementVNode(
                        "text",
                        { class: "detail-value" },
                        vue.toDisplayString($setup.formatNumber($setup.itemDatas.planToPayRuralLaborsSalaryPr)),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "detail-row" }, [
                      vue.createElementVNode("text", { class: "detail-label" }, "材料款"),
                      vue.createElementVNode(
                        "text",
                        { class: "detail-value" },
                        vue.toDisplayString($setup.formatNumber($setup.itemDatas.planToPayMaterialAmountPr)),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "detail-row" }, [
                      vue.createElementVNode("text", { class: "detail-label" }, "前期费用"),
                      vue.createElementVNode(
                        "text",
                        { class: "detail-value" },
                        vue.toDisplayString($setup.formatNumber($setup.itemDatas.planToPayProphaseAmountPr)),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "detail-row" }, [
                      vue.createElementVNode("text", { class: "detail-label" }, "其他"),
                      vue.createElementVNode(
                        "text",
                        { class: "detail-value" },
                        vue.toDisplayString($setup.formatNumber($setup.itemDatas.planToPayOtherAmountPr)),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "detail-row summary-row" }, [
                      vue.createElementVNode("text", { class: "detail-label summary-label" }, "本次用款小计"),
                      vue.createElementVNode(
                        "text",
                        { class: "detail-value summary-value" },
                        vue.toDisplayString($setup.formatNumber($setup.itemDatas.planToPayTotalPr)),
                        1
                        /* TEXT */
                      )
                    ])
                  ])) : vue.createCommentVNode("v-if", true),
                  $setup.roadSectionList.length > 0 ? (vue.openBlock(), vue.createElementBlock("scroll-view", {
                    key: 5,
                    "scroll-x": "",
                    class: "table-scroll-x"
                  }, [
                    vue.createElementVNode("table", {
                      cellspacing: "0",
                      cellpadding: "0",
                      class: "table1 table2"
                    }, [
                      vue.createElementVNode("tbody", null, [
                        vue.createElementVNode("tr", null, [
                          vue.createElementVNode("td", {
                            colspan: "2",
                            class: "type font_w sticky-lx-1"
                          }, "款项类型"),
                          (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList($setup.roadSectionList, (value) => {
                              return vue.openBlock(), vue.createElementBlock(
                                "td",
                                {
                                  class: "type font_w text_right",
                                  key: value.id
                                },
                                vue.toDisplayString(value.roadName),
                                1
                                /* TEXT */
                              );
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ]),
                        vue.createElementVNode("tr", null, [
                          vue.createElementVNode("td", { class: "text sticky-lx-1" }, "工程费用"),
                          vue.createElementVNode(
                            "td",
                            { class: "info sticky-lx-2" },
                            vue.toDisplayString($setup.formatNumber($setup.itemDatas.planToPayConstructionAmountPr)),
                            1
                            /* TEXT */
                          ),
                          (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList($setup.roadSectionList, (value) => {
                              return vue.openBlock(), vue.createElementBlock(
                                "td",
                                {
                                  class: "info",
                                  key: value.id
                                },
                                vue.toDisplayString($setup.formatNumber(value.constructionAmount)),
                                1
                                /* TEXT */
                              );
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ]),
                        vue.createElementVNode("tr", null, [
                          vue.createElementVNode("td", { class: "text sticky-lx-1" }, "农民工工资"),
                          vue.createElementVNode(
                            "td",
                            { class: "info sticky-lx-2" },
                            vue.toDisplayString($setup.formatNumber($setup.itemDatas.planToPayRuralLaborsSalaryPr)),
                            1
                            /* TEXT */
                          ),
                          (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList($setup.roadSectionList, (value) => {
                              return vue.openBlock(), vue.createElementBlock(
                                "td",
                                {
                                  class: "info",
                                  key: value.id
                                },
                                vue.toDisplayString($setup.formatNumber(value.ruralLaborsSalary)),
                                1
                                /* TEXT */
                              );
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ]),
                        vue.createElementVNode("tr", null, [
                          vue.createElementVNode("td", { class: "text sticky-lx-1" }, "材料款"),
                          vue.createElementVNode(
                            "td",
                            { class: "info sticky-lx-2" },
                            vue.toDisplayString($setup.formatNumber($setup.itemDatas.planToPayMaterialAmountPr)),
                            1
                            /* TEXT */
                          ),
                          (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList($setup.roadSectionList, (value) => {
                              return vue.openBlock(), vue.createElementBlock(
                                "td",
                                {
                                  class: "info",
                                  key: value.id
                                },
                                vue.toDisplayString($setup.formatNumber(value.materialAmount)),
                                1
                                /* TEXT */
                              );
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ]),
                        vue.createElementVNode("tr", null, [
                          vue.createElementVNode("td", { class: "text sticky-lx-1" }, "前期费用"),
                          vue.createElementVNode(
                            "td",
                            { class: "info sticky-lx-2" },
                            vue.toDisplayString($setup.formatNumber($setup.itemDatas.planToPayProphaseAmountPr)),
                            1
                            /* TEXT */
                          ),
                          (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList($setup.roadSectionList, (value) => {
                              return vue.openBlock(), vue.createElementBlock(
                                "td",
                                {
                                  class: "info",
                                  key: value.id
                                },
                                vue.toDisplayString($setup.formatNumber(value.prophaseAmount)),
                                1
                                /* TEXT */
                              );
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ]),
                        vue.createElementVNode("tr", null, [
                          vue.createElementVNode("td", { class: "text sticky-lx-1" }, "其他"),
                          vue.createElementVNode(
                            "td",
                            { class: "info sticky-lx-2" },
                            vue.toDisplayString($setup.formatNumber($setup.itemDatas.planToPayOtherAmountPr)),
                            1
                            /* TEXT */
                          ),
                          (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList($setup.roadSectionList, (value) => {
                              return vue.openBlock(), vue.createElementBlock(
                                "td",
                                {
                                  class: "info",
                                  key: value.id
                                },
                                vue.toDisplayString($setup.formatNumber(value.otherAmount)),
                                1
                                /* TEXT */
                              );
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ])
                      ])
                    ])
                  ])) : vue.createCommentVNode("v-if", true),
                  $setup.roadSectionList.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 6,
                    class: "detail-row summary-row"
                  }, [
                    vue.createElementVNode("text", { class: "detail-label summary-label" }, "本次用款小计"),
                    vue.createElementVNode(
                      "text",
                      { class: "detail-value summary-value" },
                      vue.toDisplayString($setup.formatNumber($setup.itemDatas.planToPayTotalPr)),
                      1
                      /* TEXT */
                    )
                  ])) : vue.createCommentVNode("v-if", true)
                ]),
                $setup.roadSectionList.length == 0 ? (vue.openBlock(), vue.createElementBlock("scroll-view", {
                  key: 0,
                  "scroll-x": "",
                  class: "table-scroll-x"
                }, [
                  vue.createElementVNode("table", {
                    cellspacing: "0",
                    cellpadding: "0",
                    class: "table1 margin_1 table1—left-border"
                  }, [
                    vue.createElementVNode("tbody", null, [
                      vue.createElementVNode("tr", null, [
                        vue.createElementVNode("td", {
                          colspan: "2",
                          class: "type font_w sticky-1"
                        }, "支付渠道"),
                        vue.createElementVNode("td", { class: "type font_w text_right" }, "总金额"),
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList($setup.roadSectionList, (value) => {
                            return vue.openBlock(), vue.createElementBlock(
                              "td",
                              {
                                class: "type font_w text_right",
                                key: value.id
                              },
                              vue.toDisplayString(value.roadName),
                              1
                              /* TEXT */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ]),
                      vue.createElementVNode("tr", null, [
                        vue.createElementVNode("td", {
                          rowspan: "5",
                          class: "type td_w1 sticky-1"
                        }, "城投拨付资金"),
                        vue.createElementVNode("td", { class: "type td_w2 sticky-2" }, "市财力"),
                        vue.createElementVNode(
                          "td",
                          { class: "info" },
                          vue.toDisplayString($setup.formatNumber($setup.itemDatas.planToPayCtfundCityPr)),
                          1
                          /* TEXT */
                        ),
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList($setup.roadSectionList, (value) => {
                            return vue.openBlock(), vue.createElementBlock(
                              "td",
                              {
                                class: "info",
                                key: value.id
                              },
                              vue.toDisplayString($setup.formatNumber(value.roadSectionPlanToPayInfo.planToPayCtfundCity)),
                              1
                              /* TEXT */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ]),
                      vue.createElementVNode("tr", null, [
                        vue.createElementVNode("td", { class: "type sticky-2" }, "土地出让金"),
                        vue.createElementVNode(
                          "td",
                          { class: "info" },
                          vue.toDisplayString($setup.formatNumber($setup.itemDatas.planToPayCtfundLandTransferFeePr)),
                          1
                          /* TEXT */
                        ),
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList($setup.roadSectionList, (value) => {
                            return vue.openBlock(), vue.createElementBlock(
                              "td",
                              {
                                class: "info",
                                key: value.id
                              },
                              vue.toDisplayString($setup.formatNumber(value.roadSectionPlanToPayInfo.planToPayCtfundLandTransferFee)),
                              1
                              /* TEXT */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ]),
                      vue.createElementVNode("tr", null, [
                        vue.createElementVNode("td", { class: "type sticky-2" }, "专项债"),
                        vue.createElementVNode(
                          "td",
                          { class: "info" },
                          vue.toDisplayString($setup.formatNumber($setup.itemDatas.planToPayCtfundSpecialPurposeBondPr)),
                          1
                          /* TEXT */
                        ),
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList($setup.roadSectionList, (value) => {
                            return vue.openBlock(), vue.createElementBlock(
                              "td",
                              {
                                class: "info",
                                key: value.id
                              },
                              vue.toDisplayString($setup.formatNumber(value.roadSectionPlanToPayInfo.planToPayCtfundSpecialPurposeBond)),
                              1
                              /* TEXT */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ]),
                      vue.createElementVNode("tr", null, [
                        vue.createElementVNode("td", { class: "type sticky-2" }, "城投其他资金"),
                        vue.createElementVNode(
                          "td",
                          { class: "info" },
                          vue.toDisplayString($setup.formatNumber($setup.itemDatas.planToPayCtfundOtherPr)),
                          1
                          /* TEXT */
                        ),
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList($setup.roadSectionList, (value) => {
                            return vue.openBlock(), vue.createElementBlock(
                              "td",
                              {
                                class: "info",
                                key: value.id
                              },
                              vue.toDisplayString($setup.formatNumber(value.roadSectionPlanToPayInfo.planToPayCtfundOther)),
                              1
                              /* TEXT */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ]),
                      vue.createElementVNode("tr", null, [
                        vue.createElementVNode("td", { class: "type sticky-2" }, "资本金"),
                        vue.createElementVNode(
                          "td",
                          { class: "info" },
                          vue.toDisplayString($setup.formatNumber($setup.itemDatas.planToPayCtfundCapitalPr)),
                          1
                          /* TEXT */
                        ),
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList($setup.roadSectionList, (value) => {
                            return vue.openBlock(), vue.createElementBlock(
                              "td",
                              {
                                class: "info",
                                key: value.id
                              },
                              vue.toDisplayString($setup.formatNumber(value.roadSectionPlanToPayInfo.planToPayCtfundCapital)),
                              1
                              /* TEXT */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ]),
                      vue.createElementVNode("tr", null, [
                        vue.createElementVNode("td", {
                          rowspan: "4",
                          class: "type sticky-1"
                        }, "城投拨付资金"),
                        vue.createElementVNode("td", { class: "type sticky-2" }, "市财力"),
                        vue.createElementVNode(
                          "td",
                          { class: "info" },
                          vue.toDisplayString($setup.formatNumber($setup.itemDatas.planToPayNonCtfundCityPr)),
                          1
                          /* TEXT */
                        ),
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList($setup.roadSectionList, (value) => {
                            return vue.openBlock(), vue.createElementBlock(
                              "td",
                              {
                                class: "info",
                                key: value.id
                              },
                              vue.toDisplayString($setup.formatNumber(value.roadSectionPlanToPayInfo.planToPayNonCtfundCity)),
                              1
                              /* TEXT */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ]),
                      vue.createElementVNode("tr", null, [
                        vue.createElementVNode("td", { class: "type sticky-2" }, "区县财力"),
                        vue.createElementVNode(
                          "td",
                          { class: "info" },
                          vue.toDisplayString($setup.formatNumber($setup.itemDatas.planToPayNonCtfundDistrictPr)),
                          1
                          /* TEXT */
                        ),
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList($setup.roadSectionList, (value) => {
                            return vue.openBlock(), vue.createElementBlock(
                              "td",
                              {
                                class: "info",
                                key: value.id
                              },
                              vue.toDisplayString($setup.formatNumber(value.roadSectionPlanToPayInfo.planToPayNonCtfundDistrict)),
                              1
                              /* TEXT */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ]),
                      vue.createElementVNode("tr", null, [
                        vue.createElementVNode("td", { class: "type sticky-2" }, "自筹资金"),
                        vue.createElementVNode(
                          "td",
                          { class: "info" },
                          vue.toDisplayString($setup.formatNumber($setup.itemDatas.planToPayNonCtfundSelfPr)),
                          1
                          /* TEXT */
                        ),
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList($setup.roadSectionList, (value) => {
                            return vue.openBlock(), vue.createElementBlock(
                              "td",
                              {
                                class: "info",
                                key: value.id
                              },
                              vue.toDisplayString($setup.formatNumber(value.roadSectionPlanToPayInfo.planToPayNonCtfundSelf)),
                              1
                              /* TEXT */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ]),
                      vue.createElementVNode("tr", null, [
                        vue.createElementVNode("td", { class: "type sticky-2" }, "其他"),
                        vue.createElementVNode(
                          "td",
                          { class: "info" },
                          vue.toDisplayString($setup.formatNumber($setup.itemDatas.planToPayNonCtfundOtherPr)),
                          1
                          /* TEXT */
                        ),
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList($setup.roadSectionList, (value) => {
                            return vue.openBlock(), vue.createElementBlock(
                              "td",
                              {
                                class: "info",
                                key: value.id
                              },
                              vue.toDisplayString($setup.formatNumber(value.roadSectionPlanToPayInfo.planToPayNonCtfundOther)),
                              1
                              /* TEXT */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ]),
                      vue.createElementVNode("tr", null, [
                        vue.createElementVNode("td", {
                          rowspan: "3",
                          class: "type sticky-1"
                        }, "直拨(无资金流入)"),
                        vue.createElementVNode("td", { class: "type sticky-2" }, "交通专项"),
                        vue.createElementVNode(
                          "td",
                          { class: "info" },
                          vue.toDisplayString($setup.formatNumber($setup.itemDatas.planToPayDirectFundTransportationSpecialPr)),
                          1
                          /* TEXT */
                        ),
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList($setup.roadSectionList, (value) => {
                            return vue.openBlock(), vue.createElementBlock(
                              "td",
                              {
                                class: "info",
                                key: value.id
                              },
                              vue.toDisplayString($setup.formatNumber(value.roadSectionPlanToPayInfo.planToPayDirectFundTransportationSpecial)),
                              1
                              /* TEXT */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ]),
                      vue.createElementVNode("tr", null, [
                        vue.createElementVNode("td", { class: "type sticky-2" }, "超长期国债"),
                        vue.createElementVNode(
                          "td",
                          { class: "info" },
                          vue.toDisplayString($setup.formatNumber($setup.itemDatas.planToPayDirectFundUltraTbpr)),
                          1
                          /* TEXT */
                        ),
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList($setup.roadSectionList, (value) => {
                            return vue.openBlock(), vue.createElementBlock(
                              "td",
                              {
                                class: "info",
                                key: value.id
                              },
                              vue.toDisplayString($setup.formatNumber(value.roadSectionPlanToPayInfo.planToPayDirectFundUltraTb)),
                              1
                              /* TEXT */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ]),
                      vue.createElementVNode("tr", null, [
                        vue.createElementVNode("td", { class: "type sticky-2" }, "其他"),
                        vue.createElementVNode(
                          "td",
                          { class: "info" },
                          vue.toDisplayString($setup.formatNumber($setup.itemDatas.planToPayDirectFundOtherPr)),
                          1
                          /* TEXT */
                        ),
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList($setup.roadSectionList, (value) => {
                            return vue.openBlock(), vue.createElementBlock(
                              "td",
                              {
                                class: "info",
                                key: value.id
                              },
                              vue.toDisplayString($setup.formatNumber(value.roadSectionPlanToPayInfo.planToPayDirectFundOther)),
                              1
                              /* TEXT */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ]),
                      vue.createElementVNode("tr", null, [
                        vue.createElementVNode("td", {
                          colspan: "2",
                          class: "type sticky-1"
                        }, "开具银票(无资金流出)"),
                        vue.createElementVNode(
                          "td",
                          { class: "info" },
                          vue.toDisplayString($setup.formatNumber($setup.itemDatas.planToPayBankNotePr)),
                          1
                          /* TEXT */
                        ),
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList($setup.roadSectionList, (value) => {
                            return vue.openBlock(), vue.createElementBlock(
                              "td",
                              {
                                class: "info",
                                key: value.id
                              },
                              vue.toDisplayString($setup.formatNumber(value.roadSectionPlanToPayInfo.planToPayBankNote)),
                              1
                              /* TEXT */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ])
                    ])
                  ])
                ])) : vue.createCommentVNode("v-if", true),
                $setup.roadSectionList.length > 0 ? (vue.openBlock(), vue.createElementBlock("scroll-view", {
                  key: 1,
                  "scroll-x": "",
                  class: "table-scroll-x"
                }, [
                  vue.createElementVNode("table", {
                    cellspacing: "0",
                    cellpadding: "0",
                    class: "table1 margin_1"
                  }, [
                    vue.createElementVNode("tbody", null, [
                      vue.createElementVNode("tr", null, [
                        vue.createElementVNode("td", {
                          colspan: "2",
                          class: "type font_w sticky-1-plus"
                        }, "支付渠道"),
                        vue.createElementVNode("td", { class: "type font_w text_right sticky-3-plus" }, "总金额"),
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList($setup.roadSectionList, (value) => {
                            return vue.openBlock(), vue.createElementBlock(
                              "td",
                              {
                                class: "type font_w text_right",
                                key: value.id
                              },
                              vue.toDisplayString(value.roadName),
                              1
                              /* TEXT */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ]),
                      vue.createElementVNode("tr", null, [
                        vue.createElementVNode("td", {
                          rowspan: "6",
                          class: "type td_w1 sticky-1-plus"
                        }, "城投拨付资金"),
                        vue.createElementVNode("td", { class: "type td_w2 sticky-2-plus" }, "市财力城区"),
                        vue.createElementVNode(
                          "td",
                          { class: "info sticky-3-plus" },
                          vue.toDisplayString($setup.formatNumber($setup.itemDatas.planToPayCtfundCityDistrictPr)),
                          1
                          /* TEXT */
                        ),
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList($setup.roadSectionList, (value) => {
                            return vue.openBlock(), vue.createElementBlock(
                              "td",
                              {
                                class: "info",
                                key: value.id
                              },
                              vue.toDisplayString($setup.formatNumber(value.roadSectionPlanToPayInfo.planToPayCtfundCityDistrict)),
                              1
                              /* TEXT */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ]),
                      vue.createElementVNode("tr", null, [
                        vue.createElementVNode("td", { class: "type sticky-2-plus" }, "市财力"),
                        vue.createElementVNode(
                          "td",
                          { class: "info sticky-3-plus" },
                          vue.toDisplayString($setup.formatNumber($setup.itemDatas.planToPayCtfundCityPr)),
                          1
                          /* TEXT */
                        ),
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList($setup.roadSectionList, (value) => {
                            return vue.openBlock(), vue.createElementBlock(
                              "td",
                              {
                                class: "info",
                                key: value.id
                              },
                              vue.toDisplayString($setup.formatNumber(value.roadSectionPlanToPayInfo.planToPayCtfundCity)),
                              1
                              /* TEXT */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ]),
                      vue.createElementVNode("tr", null, [
                        vue.createElementVNode("td", { class: "type sticky-2-plus" }, "土地出让金"),
                        vue.createElementVNode(
                          "td",
                          { class: "info sticky-3-plus" },
                          vue.toDisplayString($setup.formatNumber($setup.itemDatas.planToPayCtfundLandTransferFeePr)),
                          1
                          /* TEXT */
                        ),
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList($setup.roadSectionList, (value) => {
                            return vue.openBlock(), vue.createElementBlock(
                              "td",
                              {
                                class: "info",
                                key: value.id
                              },
                              vue.toDisplayString($setup.formatNumber(value.roadSectionPlanToPayInfo.planToPayCtfundLandTransferFee)),
                              1
                              /* TEXT */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ]),
                      vue.createElementVNode("tr", null, [
                        vue.createElementVNode("td", { class: "type sticky-2-plus" }, "专项债"),
                        vue.createElementVNode(
                          "td",
                          { class: "info sticky-3-plus" },
                          vue.toDisplayString($setup.formatNumber($setup.itemDatas.planToPayCtfundSpecialPurposeBondPr)),
                          1
                          /* TEXT */
                        ),
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList($setup.roadSectionList, (value) => {
                            return vue.openBlock(), vue.createElementBlock(
                              "td",
                              {
                                class: "info",
                                key: value.id
                              },
                              vue.toDisplayString($setup.formatNumber(value.roadSectionPlanToPayInfo.planToPayCtfundSpecialPurposeBond)),
                              1
                              /* TEXT */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ]),
                      vue.createElementVNode("tr", null, [
                        vue.createElementVNode("td", { class: "type sticky-2-plus" }, "城投其他资金"),
                        vue.createElementVNode(
                          "td",
                          { class: "info sticky-3-plus" },
                          vue.toDisplayString($setup.formatNumber($setup.itemDatas.planToPayCtfundOtherPr)),
                          1
                          /* TEXT */
                        ),
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList($setup.roadSectionList, (value) => {
                            return vue.openBlock(), vue.createElementBlock(
                              "td",
                              {
                                class: "info",
                                key: value.id
                              },
                              vue.toDisplayString($setup.formatNumber(value.roadSectionPlanToPayInfo.planToPayCtfundOther)),
                              1
                              /* TEXT */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ]),
                      vue.createElementVNode("tr", null, [
                        vue.createElementVNode("td", { class: "type sticky-2-plus" }, "资本金"),
                        vue.createElementVNode(
                          "td",
                          { class: "info sticky-3-plus" },
                          vue.toDisplayString($setup.formatNumber($setup.itemDatas.planToPayCtfundCapitalPr)),
                          1
                          /* TEXT */
                        ),
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList($setup.roadSectionList, (value) => {
                            return vue.openBlock(), vue.createElementBlock(
                              "td",
                              {
                                class: "info",
                                key: value.id
                              },
                              vue.toDisplayString($setup.formatNumber(value.roadSectionPlanToPayInfo.planToPayCtfundCapital)),
                              1
                              /* TEXT */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ]),
                      vue.createElementVNode("tr", null, [
                        vue.createElementVNode("td", {
                          rowspan: "4",
                          class: "type sticky-1-plus"
                        }, "城投拨付资金"),
                        vue.createElementVNode("td", { class: "type sticky-2-plus" }, "市财力"),
                        vue.createElementVNode(
                          "td",
                          { class: "info sticky-3-plus" },
                          vue.toDisplayString($setup.formatNumber($setup.itemDatas.planToPayNonCtfundCityPr)),
                          1
                          /* TEXT */
                        ),
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList($setup.roadSectionList, (value) => {
                            return vue.openBlock(), vue.createElementBlock(
                              "td",
                              {
                                class: "info",
                                key: value.id
                              },
                              vue.toDisplayString($setup.formatNumber(value.roadSectionPlanToPayInfo.planToPayNonCtfundCity)),
                              1
                              /* TEXT */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ]),
                      vue.createElementVNode("tr", null, [
                        vue.createElementVNode("td", { class: "type sticky-2-plus" }, "区县财力"),
                        vue.createElementVNode(
                          "td",
                          { class: "info sticky-3-plus" },
                          vue.toDisplayString($setup.formatNumber($setup.itemDatas.planToPayNonCtfundDistrictPr)),
                          1
                          /* TEXT */
                        ),
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList($setup.roadSectionList, (value) => {
                            return vue.openBlock(), vue.createElementBlock(
                              "td",
                              {
                                class: "info",
                                key: value.id
                              },
                              vue.toDisplayString($setup.formatNumber(value.roadSectionPlanToPayInfo.planToPayNonCtfundDistrict)),
                              1
                              /* TEXT */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ]),
                      vue.createElementVNode("tr", null, [
                        vue.createElementVNode("td", { class: "type sticky-2-plus" }, "自筹资金"),
                        vue.createElementVNode(
                          "td",
                          { class: "info sticky-3-plus" },
                          vue.toDisplayString($setup.formatNumber($setup.itemDatas.planToPayNonCtfundSelfPr)),
                          1
                          /* TEXT */
                        ),
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList($setup.roadSectionList, (value) => {
                            return vue.openBlock(), vue.createElementBlock(
                              "td",
                              {
                                class: "info",
                                key: value.id
                              },
                              vue.toDisplayString($setup.formatNumber(value.roadSectionPlanToPayInfo.planToPayNonCtfundSelf)),
                              1
                              /* TEXT */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ]),
                      vue.createElementVNode("tr", null, [
                        vue.createElementVNode("td", { class: "type sticky-2-plus" }, "其他"),
                        vue.createElementVNode(
                          "td",
                          { class: "info sticky-3-plus" },
                          vue.toDisplayString($setup.formatNumber($setup.itemDatas.planToPayNonCtfundOtherPr)),
                          1
                          /* TEXT */
                        ),
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList($setup.roadSectionList, (value) => {
                            return vue.openBlock(), vue.createElementBlock(
                              "td",
                              {
                                class: "info",
                                key: value.id
                              },
                              vue.toDisplayString($setup.formatNumber(value.roadSectionPlanToPayInfo.planToPayNonCtfundOther)),
                              1
                              /* TEXT */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ]),
                      vue.createElementVNode("tr", null, [
                        vue.createElementVNode("td", {
                          rowspan: "3",
                          class: "type sticky-1-plus"
                        }, "直拨(无资金流入)"),
                        vue.createElementVNode("td", { class: "type sticky-2-plus" }, "交通专项"),
                        vue.createElementVNode(
                          "td",
                          { class: "info sticky-3-plus" },
                          vue.toDisplayString($setup.formatNumber($setup.itemDatas.planToPayDirectFundTransportationSpecialPr)),
                          1
                          /* TEXT */
                        ),
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList($setup.roadSectionList, (value) => {
                            return vue.openBlock(), vue.createElementBlock(
                              "td",
                              {
                                class: "info",
                                key: value.id
                              },
                              vue.toDisplayString($setup.formatNumber(value.roadSectionPlanToPayInfo.planToPayDirectFundTransportationSpecial)),
                              1
                              /* TEXT */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ]),
                      vue.createElementVNode("tr", null, [
                        vue.createElementVNode("td", { class: "type sticky-2-plus" }, "超长期国债"),
                        vue.createElementVNode(
                          "td",
                          { class: "info sticky-3-plus" },
                          vue.toDisplayString($setup.formatNumber($setup.itemDatas.planToPayDirectFundUltraTbpr)),
                          1
                          /* TEXT */
                        ),
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList($setup.roadSectionList, (value) => {
                            return vue.openBlock(), vue.createElementBlock(
                              "td",
                              {
                                class: "info",
                                key: value.id
                              },
                              vue.toDisplayString($setup.formatNumber(value.roadSectionPlanToPayInfo.planToPayDirectFundUltraTb)),
                              1
                              /* TEXT */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ]),
                      vue.createElementVNode("tr", null, [
                        vue.createElementVNode("td", { class: "type sticky-2-plus" }, "其他"),
                        vue.createElementVNode(
                          "td",
                          { class: "info sticky-3-plus" },
                          vue.toDisplayString($setup.formatNumber($setup.itemDatas.planToPayDirectFundOtherPr)),
                          1
                          /* TEXT */
                        ),
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList($setup.roadSectionList, (value) => {
                            return vue.openBlock(), vue.createElementBlock(
                              "td",
                              {
                                class: "info",
                                key: value.id
                              },
                              vue.toDisplayString($setup.formatNumber(value.roadSectionPlanToPayInfo.planToPayDirectFundOther)),
                              1
                              /* TEXT */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ]),
                      vue.createElementVNode("tr", null, [
                        vue.createElementVNode("td", {
                          colspan: "2",
                          class: "type sticky-1-plus"
                        }, "开具银票(无资金流出)"),
                        vue.createElementVNode(
                          "td",
                          { class: "info sticky-3-plus" },
                          vue.toDisplayString($setup.formatNumber($setup.itemDatas.planToPayBankNotePr)),
                          1
                          /* TEXT */
                        ),
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList($setup.roadSectionList, (value) => {
                            return vue.openBlock(), vue.createElementBlock(
                              "td",
                              {
                                class: "info",
                                key: value.id
                              },
                              vue.toDisplayString($setup.formatNumber(value.roadSectionPlanToPayInfo.planToPayBankNote)),
                              1
                              /* TEXT */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ])
                    ])
                  ])
                ])) : vue.createCommentVNode("v-if", true)
              ])) : vue.createCommentVNode("v-if", true)
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        vue.createElementVNode("view", { class: "section" }, [
          vue.createElementVNode("view", {
            class: "section-title-2",
            onClick: _cache[1] || (_cache[1] = ($event) => $setup.setOptions($setup.PAYMENT_ACCOUNT_INFORMATION))
          }, [
            vue.createElementVNode("view", { class: "section-title-2-left" }, [
              vue.createElementVNode("text", { class: "section-title-vertical" }),
              vue.createElementVNode("text", { class: "section-title-text" }, "付款账户信息")
            ]),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["section-title-2-right", { "active": $setup.getOptions($setup.PAYMENT_ACCOUNT_INFORMATION) }])
              },
              null,
              2
              /* CLASS */
            )
          ]),
          vue.createVNode(vue.Transition, { name: "collapse" }, {
            default: vue.withCtx(() => {
              var _a, _b;
              return [
                $setup.getOptions($setup.PAYMENT_ACCOUNT_INFORMATION) ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "account-info-section"
                }, [
                  vue.createElementVNode("view", { style: { "height": "10rpx" } }),
                  ((_b = (_a = $setup.itemDatas) == null ? void 0 : _a.roadSectionList) == null ? void 0 : _b.length) > 0 ? (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    { key: 0 },
                    vue.renderList($setup.itemDatas.roadSectionList, (item) => {
                      return vue.openBlock(), vue.createElementBlock("view", {
                        class: "account-card",
                        key: item.id
                      }, [
                        vue.createElementVNode(
                          "view",
                          { class: "account-company-title" },
                          vue.toDisplayString(item.roadName || ""),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode("view", { class: "account-info-block" }, [
                          vue.createElementVNode("view", { class: "account-info-row" }, [
                            vue.createElementVNode("text", { class: "account-info-label" }, "付款银行(资金)"),
                            vue.createElementVNode(
                              "text",
                              { class: "account-info-value" },
                              vue.toDisplayString(item.paymentBank || ""),
                              1
                              /* TEXT */
                            )
                          ]),
                          vue.createElementVNode("view", { class: "account-info-row" }, [
                            vue.createElementVNode("text", { class: "account-info-label" }, "付款账号(资金)"),
                            vue.createElementVNode(
                              "text",
                              { class: "account-info-value" },
                              vue.toDisplayString(item.paymentAccount || ""),
                              1
                              /* TEXT */
                            )
                          ]),
                          vue.createElementVNode("view", { class: "account-info-row" }, [
                            vue.createElementVNode("text", { class: "account-info-label" }, "付款银行(银票)"),
                            vue.createElementVNode(
                              "text",
                              { class: "account-info-value" },
                              vue.toDisplayString(item.paymentBankNote || ""),
                              1
                              /* TEXT */
                            )
                          ]),
                          vue.createElementVNode("view", { class: "account-info-row" }, [
                            vue.createElementVNode("text", { class: "account-info-label" }, "付款账号(银票)"),
                            vue.createElementVNode(
                              "text",
                              { class: "account-info-value" },
                              vue.toDisplayString(item.paymentAccountNote || ""),
                              1
                              /* TEXT */
                            )
                          ])
                        ])
                      ]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  )) : (vue.openBlock(), vue.createElementBlock("view", {
                    key: 1,
                    class: "account-card"
                  }, [
                    vue.createElementVNode(
                      "view",
                      { class: "account-company-title" },
                      vue.toDisplayString($setup.itemDatas.companyName || ""),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode("view", { class: "account-info-block" }, [
                      vue.createElementVNode("view", { class: "account-info-row" }, [
                        vue.createElementVNode("text", { class: "account-info-label" }, "付款银行(资金)"),
                        vue.createElementVNode(
                          "text",
                          { class: "account-info-value" },
                          vue.toDisplayString($setup.itemDatas.paymentBank || ""),
                          1
                          /* TEXT */
                        )
                      ]),
                      vue.createElementVNode("view", { class: "account-info-row" }, [
                        vue.createElementVNode("text", { class: "account-info-label" }, "付款账号(资金)"),
                        vue.createElementVNode(
                          "text",
                          { class: "account-info-value" },
                          vue.toDisplayString($setup.itemDatas.paymentAccount || ""),
                          1
                          /* TEXT */
                        )
                      ]),
                      vue.createElementVNode("view", { class: "account-info-row" }, [
                        vue.createElementVNode("text", { class: "account-info-label" }, "付款银行(银票)"),
                        vue.createElementVNode(
                          "text",
                          { class: "account-info-value" },
                          vue.toDisplayString($setup.itemDatas.paymentBankNote || ""),
                          1
                          /* TEXT */
                        )
                      ]),
                      vue.createElementVNode("view", { class: "account-info-row" }, [
                        vue.createElementVNode("text", { class: "account-info-label" }, "付款账号(银票)"),
                        vue.createElementVNode(
                          "text",
                          { class: "account-info-value" },
                          vue.toDisplayString($setup.itemDatas.paymentAccountBankNote || ""),
                          1
                          /* TEXT */
                        )
                      ])
                    ])
                  ]))
                ])) : vue.createCommentVNode("v-if", true)
              ];
            }),
            _: 1
            /* STABLE */
          })
        ]),
        vue.createElementVNode("view", { class: "section" }, [
          vue.createElementVNode("view", {
            class: "section-title-2",
            onClick: _cache[2] || (_cache[2] = ($event) => $setup.setOptions($setup.COLLECTION_ACCOUNT_INFORMATION))
          }, [
            vue.createElementVNode("view", { class: "section-title-2-left" }, [
              vue.createElementVNode("text", { class: "section-title-vertical" }),
              vue.createElementVNode("text", { class: "section-title-text" }, "收款账户信息")
            ]),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["section-title-2-right", { "active": $setup.getOptions($setup.COLLECTION_ACCOUNT_INFORMATION) }])
              },
              null,
              2
              /* CLASS */
            )
          ]),
          vue.createVNode(vue.Transition, { name: "collapse" }, {
            default: vue.withCtx(() => [
              $setup.getOptions($setup.COLLECTION_ACCOUNT_INFORMATION) ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "account-info-section"
              }, [
                vue.createElementVNode("view", { style: { "height": "10rpx" } }),
                vue.createElementVNode("view", { class: "account-card" }, [
                  vue.createElementVNode("view", { class: "account-company-title" }, "农民工工资"),
                  vue.createElementVNode("view", { class: "account-info-block" }, [
                    vue.createElementVNode("view", { class: "account-info-row" }, [
                      vue.createElementVNode("text", { class: "account-info-label" }, "收款单位"),
                      vue.createElementVNode(
                        "text",
                        { class: "account-info-value" },
                        vue.toDisplayString($setup.itemDatas.receiverAccountNameRuralLaborPr || ""),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "account-info-row" }, [
                      vue.createElementVNode("text", { class: "account-info-label" }, "开户行"),
                      vue.createElementVNode(
                        "text",
                        { class: "account-info-value" },
                        vue.toDisplayString($setup.itemDatas.receiverBankNameRuralLaborPr || ""),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "account-info-row" }, [
                      vue.createElementVNode("text", { class: "account-info-label" }, "账号"),
                      vue.createElementVNode(
                        "text",
                        { class: "account-info-value" },
                        vue.toDisplayString($setup.itemDatas.receiverAccountNumberRuralLaborPr || ""),
                        1
                        /* TEXT */
                      )
                    ])
                  ])
                ]),
                vue.createElementVNode("view", { class: "account-card" }, [
                  vue.createElementVNode("view", { class: "account-company-title" }, "材料款、其他工程款"),
                  vue.createElementVNode("view", { class: "account-info-block" }, [
                    vue.createElementVNode("view", { class: "account-info-row" }, [
                      vue.createElementVNode("text", { class: "account-info-label" }, "收款单位"),
                      vue.createElementVNode(
                        "text",
                        { class: "account-info-value" },
                        vue.toDisplayString($setup.itemDatas.receiverAccountNameMncpr || ""),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "account-info-row" }, [
                      vue.createElementVNode("text", { class: "account-info-label" }, "开户行"),
                      vue.createElementVNode(
                        "text",
                        { class: "account-info-value" },
                        vue.toDisplayString($setup.itemDatas.receiverBankNameMncpr || ""),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "account-info-row" }, [
                      vue.createElementVNode("text", { class: "account-info-label" }, "帐号"),
                      vue.createElementVNode(
                        "text",
                        { class: "account-info-value" },
                        vue.toDisplayString($setup.itemDatas.receiverAccountNumberMncpr || ""),
                        1
                        /* TEXT */
                      )
                    ])
                  ])
                ])
              ])) : vue.createCommentVNode("v-if", true)
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        vue.createElementVNode("view", { class: "section" }, [
          vue.createElementVNode("view", {
            class: "section-title-2",
            onClick: _cache[3] || (_cache[3] = ($event) => $setup.setOptions($setup.ATTACHMENT_LIST))
          }, [
            vue.createElementVNode("view", { class: "section-title-2-left" }, [
              vue.createElementVNode("text", { class: "section-title-vertical" }),
              vue.createElementVNode("text", { class: "section-title-text" }, "附件")
            ]),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["section-title-2-right", { "active": $setup.getOptions($setup.ATTACHMENT_LIST) }])
              },
              null,
              2
              /* CLASS */
            )
          ]),
          vue.createVNode(vue.Transition, { name: "collapse" }, {
            default: vue.withCtx(() => [
              $setup.getOptions($setup.ATTACHMENT_LIST) ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "attachment-section"
              }, [
                vue.createElementVNode("view", { style: { "height": "10rpx" } }),
                vue.createVNode($setup["attachmentList"], { list: $setup.attachmentData }, null, 8, ["list"])
              ])) : vue.createCommentVNode("v-if", true)
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        vue.createElementVNode("view", { class: "section" }, [
          vue.createElementVNode("view", {
            class: "section-title-2",
            onClick: _cache[4] || (_cache[4] = ($event) => $setup.setOptions($setup.APPROVAL_RECORD))
          }, [
            vue.createElementVNode("view", { class: "section-title-2-left" }, [
              vue.createElementVNode("text", { class: "section-title-vertical" }),
              vue.createElementVNode("text", { class: "section-title-text" }, "审批记录")
            ]),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["section-title-2-right", { "active": $setup.getOptions($setup.APPROVAL_RECORD) }])
              },
              null,
              2
              /* CLASS */
            )
          ]),
          vue.createVNode(vue.Transition, { name: "collapse" }, {
            default: vue.withCtx(() => [
              $setup.getOptions($setup.APPROVAL_RECORD) ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "approval-record-section"
              }, [
                vue.createVNode($setup["approvalTimeline"], { list: $setup.approvalRecordList }, null, 8, ["list"])
              ])) : vue.createCommentVNode("v-if", true)
            ]),
            _: 1
            /* STABLE */
          })
        ])
      ]),
      vue.createVNode($setup["InputDialog"], {
        ref: "inputDialogRef",
        required: $setup.inputDialogRequired,
        title: $setup.inputDialogTitle,
        placeholder: $setup.inputDialogPlaceholder,
        onConfirm: $setup.handleInputConfirm,
        onCancel: $setup.handleInputCancel
      }, null, 8, ["required", "title", "placeholder"])
    ]);
  }
  const PagesDetailGcfk = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$c], ["__scopeId", "data-v-7292c938"], ["__file", "E:/cityInvestment02/city-Investment/pages/detail/gcfk.vue"]]);
  const _sfc_main$c = {
    __name: "sgjf",
    setup(__props, { expose: __expose }) {
      __expose();
      vue.useCssVars((_ctx) => ({
        "4fe8957f-scrollerHeight": scrollerHeight.value
      }));
      const statusBarHeight = vue.ref(0);
      let eventChannel;
      onLoad(() => {
        var _a, _b, _c;
        const h = getStorage("statusBarHeight");
        if (Number(h))
          statusBarHeight.value = Number(h);
        eventChannel = (_c = (_b = (_a = vue.getCurrentInstance()) == null ? void 0 : _a.proxy) == null ? void 0 : _b.getOpenerEventChannel) == null ? void 0 : _c.call(_b);
        eventChannel.on("open-detail", (data) => {
          formatAppLog("log", "at pages/detail/sgjf.vue:348", "open-detail", data);
          currentType.value = data.type;
          itemDetail.value = data.order;
          getFormDataApproval();
          getApprovalRecord();
        });
      });
      const currentType = vue.ref("");
      const currentUrlObj = vue.reactive({
        pending: "/WF/GetFormDataApproval",
        completed: "/WF/GetFormDataView"
      });
      const requestTypeObj = vue.reactive({
        "Vehicle": "公务用车报销单",
        "GnE": "业务招待报销单",
        "Travel": "差旅报销单"
      });
      const requestTypeSel = vue.reactive({
        "Vehicle": ["etc", "parking", "toll", "fuel", "repair", "insurance", "renting", "wash", "others"],
        "GnE": ["gnEtype", "content"],
        "Travel": ["travelExpense", "accommodationFee", "missedMealFee", "meetingExpense", "travelPeopleCount", "travelDays", "transportationMethod", "content"]
      });
      const inputDialogRef = vue.ref(null);
      const inputDialogRequired = vue.ref(false);
      const inputDialogTitle = vue.ref("");
      const inputDialogPlaceholder = vue.ref("");
      const inputDialogValue = vue.ref("");
      const scrollerHeight = vue.ref("0px");
      const itemDetail = vue.ref({});
      const stageTags = vue.ref([]);
      const wfstatusText = vue.computed(() => {
        return itemDatas.value.wfstatus == "Running" ? "流转中" : itemDatas.value.wfstatus == "Completed" ? "已审批" : "";
      });
      const attachmentData = vue.ref([]);
      const pullDownObj = vue.reactive({
        [FUND_USAGE_STATUS]: true,
        [PAYMENT_ACCOUNT_INFORMATION]: true,
        [APPROVAL_RECORD]: true,
        [ATTACHMENT_LIST]: true
      });
      const setOptions = (name) => {
        pullDownObj[name] = pullDownObj[name] ? false : true;
      };
      const getOptions = (name) => {
        return pullDownObj[name];
      };
      const urlParams = vue.computed(() => {
        let params = {
          pending: {
            procCode: itemDetail.value.procDefCode,
            workitemid: itemDetail.value.workItemId
          },
          completed: {
            procCode: itemDetail.value.procDefCode,
            wfInstanceId: itemDetail.value.wfinstanceId
          }
        };
        return params[currentType.value];
      });
      const infoRows = vue.ref([
        {
          label: "报销类型",
          value: "",
          key: "requestType"
        },
        {
          label: "付款单位",
          value: "",
          key: "paymentCompanyName"
        },
        {
          label: "报销金额",
          value: "",
          key: "claimAmount"
        },
        {
          label: "支付金额",
          value: "",
          key: "paymentAmount"
        },
        {
          label: "用款部门",
          value: "",
          key: "companyName"
        },
        {
          label: "收款名称",
          value: "",
          key: "receivingBankName"
        },
        {
          label: "收款开户银行",
          value: "",
          key: "receivingBankAccountName"
        },
        {
          label: "收款账号",
          value: "",
          key: "receivingBankAccountNumber"
        }
      ]);
      function goBack() {
        uni.navigateBack();
      }
      const itemDatas = vue.ref({});
      const vehiclePaymentContentList = vue.ref([]);
      const vehiclePaymentContentObj = vue.reactive({});
      const getFormDataApproval = () => {
        http.get(currentUrlObj[currentType.value], urlParams.value).then((res) => {
          var _a, _b;
          let data = ((_a = res.data) == null ? void 0 : _a.data) || {};
          itemDatas.value = data.wfrequestexpenseclaim || {};
          infoRows.value.forEach((item) => {
            item.value = typeof itemDatas.value[item.key] === "number" || item.key === "claimAmount" || item.key === "paymentAmount" ? formatNumber(itemDatas.value[item.key]) : itemDatas.value[item.key] || "";
          });
          if (infoRows.value[0].value) {
            infoRows.value[0].value = requestTypeObj[infoRows.value[0].value] || "";
          }
          let arr = requestTypeSel[itemDatas.value.requestType] || [];
          if (data.wfrequestexpenseclaimvehicleitems) {
            vehiclePaymentContentList.value = data.wfrequestexpenseclaimvehicleitems || [];
            vehiclePaymentContentList.value.forEach((item) => {
              item.total = sumNestedProperties(item, arr);
            });
            arr.forEach((item) => {
              vehiclePaymentContentObj[item] = totalNestedValue(vehiclePaymentContentList.value, item);
            });
          }
          if (itemDatas.value.requestType === "Travel") {
            arr.forEach((item) => {
              vehiclePaymentContentObj[item] = itemDatas.value[item] || 0;
            });
          }
          if (itemDatas.value.requestType === "GnE") {
            arr.forEach((item) => {
              vehiclePaymentContentObj[item] = itemDatas.value[item] || 0;
            });
          }
          vehiclePaymentContentObj["total"] = itemDatas.value.paymentAmount || 0;
          if (itemDatas.value.requestType != "Vehicle") {
            vehiclePaymentContentList.value.unshift({ ...vehiclePaymentContentObj });
          }
          if (infoRows.value[0].value) {
            stageTags.value.push(infoRows.value[0].value);
          }
          if (itemDatas.value.receivingBankName) {
            stageTags.value.push(itemDatas.value.receivingBankName);
          }
          let arr1 = (_b = data == null ? void 0 : data.attachementList) == null ? void 0 : _b.map((item) => {
            return {
              fileTagName: item.fileTagName,
              fileName: item.fileName,
              fileUrl: item.fileUrl,
              id: item.attachmentId
            };
          });
          attachmentData.value = [{ fileTagName: "合同", children: [] }, { fileTagName: "发票/收据", children: [] }, { fileTagName: "其他", children: [] }];
          const attachmentMap = /* @__PURE__ */ new Map();
          attachmentData.value.forEach((item) => {
            attachmentMap.set(item.fileTagName, item);
          });
          arr1.forEach((childItem) => {
            const parent = attachmentMap.get(childItem.fileTagName);
            if (parent) {
              parent.children.push(childItem);
            }
          });
        });
      };
      const sumNestedProperties = (obj, properties) => {
        return properties.reduce((sum, prop) => sum + (obj[prop] || 0), 0);
      };
      const totalNestedValue = (array, properties) => {
        return array.reduce((accumulator, currentValue) => {
          return accumulator + currentValue[properties];
        }, 0);
      };
      const onReject = () => {
        inputDialogRequired.value = true;
        openInputDialog("打回原因", "请输入打回原因");
      };
      const onApprove = () => {
        inputDialogRequired.value = false;
        openInputDialog("通过原因", "请输入通过原因");
      };
      const openInputDialog = (title, placeholder) => {
        inputDialogTitle.value = title;
        inputDialogPlaceholder.value = placeholder;
        inputDialogRef.value.open();
      };
      const handleInputConfirm = (value, dialogType) => {
        inputDialogValue.value = value;
        inputDialogRef.value.close();
        doSubmitApproval(dialogType);
      };
      const handleInputCancel = () => {
        inputDialogRef.value.close();
        inputDialogValue.value = "";
      };
      const doSubmitApproval = (dialogType) => {
        let params = {
          wfInstanceId: itemDetail.value.wfinstanceId,
          workItemId: itemDetail.value.workItemId,
          approvalComment: inputDialogValue.value,
          annotationComment: "",
          pictureBaseData: "",
          isApproval: dialogType,
          procDefCode: itemDetail.value.procDefCode
        };
        http.post("/WF/SubmitApproval", params).then((res) => {
          if (res.code === 0) {
            uni.showToast({
              title: "已审批",
              icon: "success"
            });
            setTimeout(() => {
              if (currentType.value === "pending") {
                uni.$emit("refresh-pending");
                uni.$emit("refresh-completed");
              }
              goBack();
            }, 1e3);
          } else {
            uni.showToast({
              title: res.message,
              icon: "none"
            });
          }
        });
      };
      const approvalRecordList = vue.ref([]);
      const getApprovalRecord = () => {
        http.get("/WF/GetApprovalHistory", {
          wfinstanceId: itemDetail.value.wfinstanceId
        }).then((res) => {
          formatAppLog("log", "at pages/detail/sgjf.vue:687", res);
          approvalRecordList.value = res.data || [];
        });
      };
      function computeScrollHeight() {
        try {
          const {
            windowHeight
          } = uni.getSystemInfoSync();
          const inst = vue.getCurrentInstance();
          const q = uni.createSelectorQuery().in(inst == null ? void 0 : inst.proxy);
          q.select(".header-stickt").boundingClientRect((data) => {
            const headerH = (data == null ? void 0 : data.height) || 0;
            const h = Math.max(0, windowHeight - headerH);
            scrollerHeight.value = `${h}px`;
          }).exec();
        } catch (e) {
          scrollerHeight.value = "calc(100vh - 88rpx)";
        }
      }
      vue.onMounted(() => {
        var _a;
        vue.nextTick(() => {
          computeScrollHeight();
        });
        const systemInfo2 = uni.getSystemInfoSync();
        const isIOS = systemInfo2.platform === "ios";
        const isH5 = systemInfo2.platform === "h5" || false;
        if (isIOS && isH5) {
          formatAppLog("log", "at pages/detail/sgjf.vue:720", "检测到 iOS H5 环境，添加滚动修复");
          document.addEventListener("focusout", () => {
            setTimeout(() => {
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: "instant"
              });
            }, 20);
          });
        } else {
          (_a = window.visualViewport) == null ? void 0 : _a.addEventListener("resize", onResize);
          window.addEventListener("resize", onResize);
        }
      });
      function onResize() {
        setTimeout(() => {
          computeScrollHeight();
        }, 100);
      }
      const __returned__ = { statusBarHeight, get eventChannel() {
        return eventChannel;
      }, set eventChannel(v) {
        eventChannel = v;
      }, currentType, currentUrlObj, requestTypeObj, requestTypeSel, inputDialogRef, inputDialogRequired, inputDialogTitle, inputDialogPlaceholder, inputDialogValue, scrollerHeight, itemDetail, stageTags, wfstatusText, attachmentData, pullDownObj, setOptions, getOptions, urlParams, infoRows, goBack, itemDatas, vehiclePaymentContentList, vehiclePaymentContentObj, getFormDataApproval, sumNestedProperties, totalNestedValue, onReject, onApprove, openInputDialog, handleInputConfirm, handleInputCancel, doSubmitApproval, approvalRecordList, getApprovalRecord, computeScrollHeight, onResize, get onLoad() {
        return onLoad;
      }, ref: vue.ref, reactive: vue.reactive, onMounted: vue.onMounted, nextTick: vue.nextTick, getCurrentInstance: vue.getCurrentInstance, computed: vue.computed, get getStorage() {
        return getStorage;
      }, get FUND_USAGE_STATUS() {
        return FUND_USAGE_STATUS;
      }, get PAYMENT_ACCOUNT_INFORMATION() {
        return PAYMENT_ACCOUNT_INFORMATION;
      }, get APPROVAL_RECORD() {
        return APPROVAL_RECORD;
      }, get ATTACHMENT_LIST() {
        return ATTACHMENT_LIST;
      }, get http() {
        return http;
      }, get formatNumber() {
        return formatNumber;
      }, InputDialog, approvalTimeline, attachmentList };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    var _a, _b, _c;
    const _component_uni_nav_bar = resolveEasycom(vue.resolveDynamicComponent("uni-nav-bar"), __easycom_0$4);
    return vue.openBlock(), vue.createElementBlock("view", { class: "detail-page" }, [
      vue.createElementVNode("view", { class: "header-stickt" }, [
        vue.createElementVNode(
          "view",
          {
            class: "status_bar",
            style: vue.normalizeStyle({ height: `${$setup.statusBarHeight * 2}rpx` })
          },
          null,
          4
          /* STYLE */
        ),
        vue.createVNode(_component_uni_nav_bar, { class: "nav-bar-top" }, {
          left: vue.withCtx(() => [
            vue.createElementVNode("view", {
              class: "back-btn",
              onClick: $setup.goBack
            })
          ]),
          right: vue.withCtx(() => [
            vue.createElementVNode("view", { style: { "width": "40rpx" } })
          ]),
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "nav-title" }, "审批详情")
          ]),
          _: 1
          /* STABLE */
        }),
        vue.createElementVNode("view", { class: "hero-card" }, [
          vue.createElementVNode("view", { class: "hero-header" }, [
            vue.createElementVNode("view", { class: "project-name" }, [
              vue.createElementVNode(
                "view",
                { class: "project-name-1" },
                vue.toDisplayString($setup.itemDetail.taskName),
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "view",
                { class: "project-name-1" },
                vue.toDisplayString($setup.itemDatas.companyName),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "amount-box" }, [
              vue.createElementVNode("view", { class: "amount-label" }, "申请支付总金额"),
              vue.createElementVNode("view", { class: "amount-value" }, [
                vue.createElementVNode("text", { class: "amount-value-symbol" }, "¥"),
                vue.createElementVNode(
                  "text",
                  { class: "amount-value-number" },
                  vue.toDisplayString($setup.formatNumber($setup.itemDatas.paymentAmount)),
                  1
                  /* TEXT */
                )
              ])
            ])
          ]),
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["hero-tags", { "hero-tags-width": $setup.currentType != "pending" }])
            },
            [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($setup.stageTags, (t2, i) => {
                  return vue.openBlock(), vue.createElementBlock(
                    "view",
                    {
                      class: "tag",
                      key: i
                    },
                    vue.toDisplayString(t2),
                    1
                    /* TEXT */
                  );
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ],
            2
            /* CLASS */
          ),
          vue.withDirectives(vue.createElementVNode(
            "view",
            { class: "hero-actions" },
            [
              vue.createElementVNode("view", {
                class: "btn outline",
                onClick: $setup.onReject
              }, "打回"),
              vue.createElementVNode("view", {
                class: "btn primary",
                onClick: $setup.onApprove
              }, "通过")
            ],
            512
            /* NEED_PATCH */
          ), [
            [vue.vShow, $setup.currentType === "pending"]
          ]),
          vue.withDirectives(vue.createElementVNode(
            "view",
            { class: "wfstatus-actions" },
            vue.toDisplayString($setup.wfstatusText),
            513
            /* TEXT, NEED_PATCH */
          ), [
            [vue.vShow, $setup.currentType === "completed" && ($setup.itemDatas.wfstatus == "Running" || $setup.itemDatas.wfstatus == "Completed")]
          ])
        ])
      ]),
      vue.createElementVNode("scroll-view", {
        "scroll-y": "true",
        class: "scroller"
      }, [
        vue.createElementVNode("view", { class: "section" }, [
          vue.createElementVNode("view", { class: "section-title" }, [
            vue.createElementVNode("text", { class: "section-title-vertical" }),
            vue.createElementVNode("text", { class: "section-title-text" }, "基本信息")
          ]),
          vue.createElementVNode("view", { class: "info-list" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.infoRows, (row, idx) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: "info-item",
                  key: idx
                }, [
                  vue.createElementVNode(
                    "text",
                    { class: "info-label" },
                    vue.toDisplayString(row.label),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "info-value" },
                    vue.toDisplayString(row.value || "--"),
                    1
                    /* TEXT */
                  )
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            )),
            $setup.itemDatas.requestType === "Travel" || $setup.itemDatas.requestType === "GnE" ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "info-item"
            }, [
              vue.createElementVNode("text", { class: "info-label info-label-width" }, "预算栏目"),
              vue.createElementVNode(
                "text",
                { class: "info-value" },
                vue.toDisplayString($setup.itemDatas.budgetCategoryName || "--"),
                1
                /* TEXT */
              )
            ])) : vue.createCommentVNode("v-if", true),
            $setup.itemDatas.requestType === "GnE" ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "info-item"
            }, [
              vue.createElementVNode("text", { class: "info-label" }, "招待方式"),
              vue.createElementVNode(
                "text",
                { class: "info-value" },
                vue.toDisplayString(((_b = (_a = $setup.vehiclePaymentContentList[0]) == null ? void 0 : _a.gnEtype) == null ? void 0 : _b.replace("|", ",")) || "--"),
                1
                /* TEXT */
              )
            ])) : vue.createCommentVNode("v-if", true),
            $setup.itemDatas.requestType === "GnE" ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 2,
              class: "info-item"
            }, [
              vue.createElementVNode("text", { class: "info-label" }, "内容"),
              vue.createElementVNode(
                "text",
                { class: "info-value" },
                vue.toDisplayString(((_c = $setup.vehiclePaymentContentList[0]) == null ? void 0 : _c.content) || "--"),
                1
                /* TEXT */
              )
            ])) : vue.createCommentVNode("v-if", true),
            $setup.itemDatas.requestType === "Vehicle" ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 3,
              class: "info-item"
            }, [
              vue.createElementVNode("text", { class: "info-label" }, "内容"),
              vue.createElementVNode(
                "text",
                { class: "info-value" },
                vue.toDisplayString($setup.itemDatas.content || "--"),
                1
                /* TEXT */
              )
            ])) : vue.createCommentVNode("v-if", true),
            $setup.itemDatas.requestType === "GnE" ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 4,
              class: "usage-details",
              style: { "padding": "0" }
            }, [
              vue.createElementVNode("view", {
                class: "detail-row summary-row",
                style: { "padding": "20rpx 0 20rpx" }
              }, [
                vue.createElementVNode("text", { class: "detail-label summary-label" }, "本次用款小计"),
                vue.createElementVNode(
                  "text",
                  { class: "detail-value summary-value" },
                  vue.toDisplayString($setup.formatNumber($setup.itemDatas.paymentAmount)),
                  1
                  /* TEXT */
                )
              ])
            ])) : vue.createCommentVNode("v-if", true)
          ])
        ]),
        $setup.vehiclePaymentContentList.length > 0 && $setup.itemDatas.requestType != "GnE" ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "section"
        }, [
          vue.createElementVNode("view", {
            class: "section-title-2",
            onClick: _cache[0] || (_cache[0] = ($event) => $setup.setOptions($setup.FUND_USAGE_STATUS))
          }, [
            vue.createElementVNode("view", { class: "section-title-2-left" }, [
              vue.createElementVNode("text", { class: "section-title-vertical" }),
              vue.createElementVNode("text", { class: "section-title-text" }, "用款情况")
            ]),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["section-title-2-right", { "active": $setup.getOptions($setup.FUND_USAGE_STATUS) }])
              },
              null,
              2
              /* CLASS */
            )
          ]),
          vue.createVNode(vue.Transition, { name: "collapse" }, {
            default: vue.withCtx(() => [
              $setup.getOptions($setup.FUND_USAGE_STATUS) ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "usage-details"
              }, [
                vue.createElementVNode("view", { class: "contract-section" }, [
                  $setup.vehiclePaymentContentList.length > 1 && $setup.itemDatas.requestType === "Vehicle" ? (vue.openBlock(), vue.createElementBlock("scroll-view", {
                    key: 0,
                    "scroll-x": "",
                    class: "table-scroll-x"
                  }, [
                    vue.createElementVNode("table", {
                      cellspacing: "0",
                      cellpadding: "0",
                      class: "table1 table2"
                    }, [
                      vue.createElementVNode("tbody", null, [
                        vue.createElementVNode("tr", null, [
                          vue.createElementVNode(
                            "td",
                            { class: "type font_w sticky-xz-1 bordr-none" },
                            vue.toDisplayString($setup.infoRows[0].value.slice(0, -3)) + "明细",
                            1
                            /* TEXT */
                          ),
                          vue.createElementVNode("td", { class: "type font_w text_right sticky-xz-2 bordr-none" }, "合计"),
                          (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList($setup.itemDatas.vehiclePlateNo.split(";"), (value, index) => {
                              return vue.openBlock(), vue.createElementBlock(
                                "td",
                                {
                                  class: "type font_w text_right bordr-none",
                                  key: index
                                },
                                vue.toDisplayString(value || ""),
                                1
                                /* TEXT */
                              );
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ]),
                        vue.createElementVNode("tr", null, [
                          vue.createElementVNode("td", { class: "text sticky-xz-1 bordr-none" }, "ETC充值"),
                          vue.createElementVNode(
                            "td",
                            { class: "info sticky-xz-2 bordr-none" },
                            vue.toDisplayString($setup.formatNumber($setup.vehiclePaymentContentObj.etc)),
                            1
                            /* TEXT */
                          ),
                          (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList($setup.vehiclePaymentContentList, (value) => {
                              return vue.openBlock(), vue.createElementBlock(
                                "td",
                                {
                                  class: "info bordr-none",
                                  key: value.id
                                },
                                vue.toDisplayString($setup.formatNumber(value.etc)),
                                1
                                /* TEXT */
                              );
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ]),
                        vue.createElementVNode("tr", null, [
                          vue.createElementVNode("td", { class: "text sticky-xz-1" }, "停车费"),
                          vue.createElementVNode(
                            "td",
                            { class: "info sticky-xz-2" },
                            vue.toDisplayString($setup.formatNumber($setup.vehiclePaymentContentObj.parking)),
                            1
                            /* TEXT */
                          ),
                          (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList($setup.vehiclePaymentContentList, (value) => {
                              return vue.openBlock(), vue.createElementBlock(
                                "td",
                                {
                                  class: "info",
                                  key: value.id
                                },
                                vue.toDisplayString($setup.formatNumber(value.parking)),
                                1
                                /* TEXT */
                              );
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ]),
                        vue.createElementVNode("tr", null, [
                          vue.createElementVNode("td", { class: "text sticky-xz-1" }, "过路费"),
                          vue.createElementVNode(
                            "td",
                            { class: "info sticky-xz-2" },
                            vue.toDisplayString($setup.formatNumber($setup.vehiclePaymentContentObj.toll)),
                            1
                            /* TEXT */
                          ),
                          (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList($setup.vehiclePaymentContentList, (value) => {
                              return vue.openBlock(), vue.createElementBlock(
                                "td",
                                {
                                  class: "info",
                                  key: value.id
                                },
                                vue.toDisplayString($setup.formatNumber(value.toll)),
                                1
                                /* TEXT */
                              );
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ]),
                        vue.createElementVNode("tr", null, [
                          vue.createElementVNode("td", { class: "text sticky-xz-1" }, "加油费"),
                          vue.createElementVNode(
                            "td",
                            { class: "info sticky-xz-2" },
                            vue.toDisplayString($setup.formatNumber($setup.vehiclePaymentContentObj.fuel)),
                            1
                            /* TEXT */
                          ),
                          (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList($setup.vehiclePaymentContentList, (value) => {
                              return vue.openBlock(), vue.createElementBlock(
                                "td",
                                {
                                  class: "info",
                                  key: value.id
                                },
                                vue.toDisplayString($setup.formatNumber(value.fuel)),
                                1
                                /* TEXT */
                              );
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ]),
                        vue.createElementVNode("tr", null, [
                          vue.createElementVNode("td", { class: "text sticky-xz-1" }, "修理费"),
                          vue.createElementVNode(
                            "td",
                            { class: "info sticky-xz-2" },
                            vue.toDisplayString($setup.formatNumber($setup.vehiclePaymentContentObj.repair)),
                            1
                            /* TEXT */
                          ),
                          (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList($setup.vehiclePaymentContentList, (value) => {
                              return vue.openBlock(), vue.createElementBlock(
                                "td",
                                {
                                  class: "info",
                                  key: value.id
                                },
                                vue.toDisplayString($setup.formatNumber(value.repair)),
                                1
                                /* TEXT */
                              );
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ]),
                        vue.createElementVNode("tr", null, [
                          vue.createElementVNode("td", { class: "text sticky-xz-1" }, "保险费"),
                          vue.createElementVNode(
                            "td",
                            { class: "info sticky-xz-2" },
                            vue.toDisplayString($setup.formatNumber($setup.vehiclePaymentContentObj.insurance)),
                            1
                            /* TEXT */
                          ),
                          (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList($setup.vehiclePaymentContentList, (value) => {
                              return vue.openBlock(), vue.createElementBlock(
                                "td",
                                {
                                  class: "info",
                                  key: value.id
                                },
                                vue.toDisplayString($setup.formatNumber(value.insurance)),
                                1
                                /* TEXT */
                              );
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ]),
                        vue.createElementVNode("tr", null, [
                          vue.createElementVNode("td", { class: "text sticky-xz-1" }, "租车费"),
                          vue.createElementVNode(
                            "td",
                            { class: "info sticky-xz-2" },
                            vue.toDisplayString($setup.formatNumber($setup.vehiclePaymentContentObj.renting)),
                            1
                            /* TEXT */
                          ),
                          (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList($setup.vehiclePaymentContentList, (value) => {
                              return vue.openBlock(), vue.createElementBlock(
                                "td",
                                {
                                  class: "info",
                                  key: value.id
                                },
                                vue.toDisplayString($setup.formatNumber(value.renting)),
                                1
                                /* TEXT */
                              );
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ]),
                        vue.createElementVNode("tr", null, [
                          vue.createElementVNode("td", { class: "text sticky-xz-1" }, "洗车费"),
                          vue.createElementVNode(
                            "td",
                            { class: "info sticky-xz-2" },
                            vue.toDisplayString($setup.formatNumber($setup.vehiclePaymentContentObj.wash)),
                            1
                            /* TEXT */
                          ),
                          (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList($setup.vehiclePaymentContentList, (value) => {
                              return vue.openBlock(), vue.createElementBlock(
                                "td",
                                {
                                  class: "info",
                                  key: value.id
                                },
                                vue.toDisplayString($setup.formatNumber(value.wash)),
                                1
                                /* TEXT */
                              );
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ]),
                        vue.createElementVNode("tr", null, [
                          vue.createElementVNode("td", { class: "text sticky-xz-1" }, "其他"),
                          vue.createElementVNode(
                            "td",
                            { class: "info sticky-xz-2" },
                            vue.toDisplayString($setup.formatNumber($setup.vehiclePaymentContentObj.others)),
                            1
                            /* TEXT */
                          ),
                          (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList($setup.vehiclePaymentContentList, (value) => {
                              return vue.openBlock(), vue.createElementBlock(
                                "td",
                                {
                                  class: "info",
                                  key: value.id
                                },
                                vue.toDisplayString($setup.formatNumber(value.others)),
                                1
                                /* TEXT */
                              );
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ]),
                        vue.createElementVNode("tr", null, [
                          vue.createElementVNode("td", { class: "text sticky-xz-1" }, "合计"),
                          vue.createElementVNode(
                            "td",
                            { class: "info sticky-xz-2" },
                            vue.toDisplayString($setup.formatNumber($setup.vehiclePaymentContentObj.total)),
                            1
                            /* TEXT */
                          ),
                          (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList($setup.vehiclePaymentContentList, (value) => {
                              return vue.openBlock(), vue.createElementBlock(
                                "td",
                                {
                                  class: "info",
                                  key: value.id
                                },
                                vue.toDisplayString($setup.formatNumber(value.total)),
                                1
                                /* TEXT */
                              );
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ])
                      ])
                    ])
                  ])) : vue.createCommentVNode("v-if", true),
                  $setup.vehiclePaymentContentList.length > 0 && $setup.itemDatas.requestType === "Travel" ? (vue.openBlock(), vue.createElementBlock("scroll-view", {
                    key: 1,
                    "scroll-x": "",
                    class: "table-scroll-x"
                  }, [
                    vue.createElementVNode("table", {
                      cellspacing: "0",
                      cellpadding: "0",
                      class: "table1 table2"
                    }, [
                      vue.createElementVNode("tbody", null, [
                        vue.createElementVNode("tr", null, [
                          vue.createElementVNode(
                            "td",
                            { class: "type font_w sticky-xz-1 bordr-none" },
                            vue.toDisplayString($setup.infoRows[0].value.slice(0, -3)) + "明细",
                            1
                            /* TEXT */
                          ),
                          (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList($setup.vehiclePaymentContentList, (value, index) => {
                              return vue.openBlock(), vue.createElementBlock("td", {
                                class: "type font_w text_right bordr-none",
                                key: index
                              });
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ]),
                        vue.createElementVNode("tr", null, [
                          vue.createElementVNode("td", { class: "text sticky-xz-1 bordr-none" }, "出差人数"),
                          (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList($setup.vehiclePaymentContentList, (value, index) => {
                              return vue.openBlock(), vue.createElementBlock(
                                "td",
                                {
                                  class: "info bordr-none",
                                  key: index
                                },
                                vue.toDisplayString($setup.formatNumber(value.travelPeopleCount)),
                                1
                                /* TEXT */
                              );
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ]),
                        vue.createElementVNode("tr", null, [
                          vue.createElementVNode("td", { class: "text sticky-xz-1 bordr-none" }, "出差天数"),
                          (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList($setup.vehiclePaymentContentList, (value, index) => {
                              return vue.openBlock(), vue.createElementBlock(
                                "td",
                                {
                                  class: "info bordr-none",
                                  key: index
                                },
                                vue.toDisplayString($setup.formatNumber(value.travelDays)),
                                1
                                /* TEXT */
                              );
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ]),
                        vue.createElementVNode("tr", null, [
                          vue.createElementVNode("td", { class: "text sticky-xz-1 bordr-none" }, "交通方式"),
                          (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList($setup.vehiclePaymentContentList, (value, index) => {
                              var _a2;
                              return vue.openBlock(), vue.createElementBlock(
                                "td",
                                {
                                  class: "info bordr-none",
                                  key: index
                                },
                                vue.toDisplayString(((_a2 = value.transportationMethod) == null ? void 0 : _a2.replace("|", ",")) || "--"),
                                1
                                /* TEXT */
                              );
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ]),
                        vue.createElementVNode("tr", null, [
                          vue.createElementVNode("td", { class: "text sticky-xz-1 bordr-none" }, "内容"),
                          (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList($setup.vehiclePaymentContentList, (value, index) => {
                              return vue.openBlock(), vue.createElementBlock(
                                "td",
                                {
                                  class: "info bordr-none",
                                  key: index
                                },
                                vue.toDisplayString(value.content),
                                1
                                /* TEXT */
                              );
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ])
                      ])
                    ]),
                    vue.createElementVNode("view", { style: { "width": "100%", "border-bottom": "2rpx dashed #ddd", "margin": "10rpx 0" } }),
                    vue.createElementVNode("table", {
                      cellspacing: "0",
                      cellpadding: "0",
                      class: "table1 table2"
                    }, [
                      vue.createElementVNode("tbody", null, [
                        vue.createElementVNode("tr", null, [
                          vue.createElementVNode("td", { class: "text sticky-xz-1 bordr-none" }, "交通费"),
                          (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList($setup.vehiclePaymentContentList, (value, index) => {
                              return vue.openBlock(), vue.createElementBlock(
                                "td",
                                {
                                  class: "info bordr-none",
                                  key: index
                                },
                                vue.toDisplayString($setup.formatNumber(value.travelExpense)),
                                1
                                /* TEXT */
                              );
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ]),
                        vue.createElementVNode("tr", null, [
                          vue.createElementVNode("td", { class: "text sticky-xz-1 bordr-none" }, "住宿费"),
                          (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList($setup.vehiclePaymentContentList, (value, index) => {
                              return vue.openBlock(), vue.createElementBlock(
                                "td",
                                {
                                  class: "info bordr-none",
                                  key: index
                                },
                                vue.toDisplayString($setup.formatNumber(value.accommodationFee)),
                                1
                                /* TEXT */
                              );
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ]),
                        vue.createElementVNode("tr", null, [
                          vue.createElementVNode("td", { class: "text sticky-xz-1 bordr-none" }, "误餐费"),
                          (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList($setup.vehiclePaymentContentList, (value, index) => {
                              return vue.openBlock(), vue.createElementBlock(
                                "td",
                                {
                                  class: "info bordr-none",
                                  key: index
                                },
                                vue.toDisplayString($setup.formatNumber(value.missedMealFee)),
                                1
                                /* TEXT */
                              );
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ]),
                        vue.createElementVNode("tr", null, [
                          vue.createElementVNode("td", { class: "text sticky-xz-1 bordr-none" }, "会务费"),
                          (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList($setup.vehiclePaymentContentList, (value, index) => {
                              return vue.openBlock(), vue.createElementBlock(
                                "td",
                                {
                                  class: "info bordr-none",
                                  key: index
                                },
                                vue.toDisplayString($setup.formatNumber(value.meetingExpense)),
                                1
                                /* TEXT */
                              );
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ])
                      ])
                    ])
                  ])) : vue.createCommentVNode("v-if", true),
                  $setup.vehiclePaymentContentList.length > 0 && $setup.itemDatas.requestType != "GnE" ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 2,
                    class: "detail-row summary-row"
                  }, [
                    vue.createElementVNode("text", { class: "detail-label summary-label" }, "本次用款小计"),
                    vue.createElementVNode(
                      "text",
                      { class: "detail-value summary-value" },
                      vue.toDisplayString($setup.formatNumber($setup.itemDatas.paymentAmount)),
                      1
                      /* TEXT */
                    )
                  ])) : vue.createCommentVNode("v-if", true)
                ])
              ])) : vue.createCommentVNode("v-if", true)
            ]),
            _: 1
            /* STABLE */
          })
        ])) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("view", { class: "section" }, [
          vue.createElementVNode("view", {
            class: "section-title-2",
            onClick: _cache[1] || (_cache[1] = ($event) => $setup.setOptions($setup.PAYMENT_ACCOUNT_INFORMATION))
          }, [
            vue.createElementVNode("view", { class: "section-title-2-left" }, [
              vue.createElementVNode("text", { class: "section-title-vertical" }),
              vue.createElementVNode("text", { class: "section-title-text" }, "补充信息")
            ]),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["section-title-2-right", { "active": $setup.getOptions($setup.PAYMENT_ACCOUNT_INFORMATION) }])
              },
              null,
              2
              /* CLASS */
            )
          ]),
          vue.createVNode(vue.Transition, { name: "collapse" }, {
            default: vue.withCtx(() => [
              $setup.getOptions($setup.PAYMENT_ACCOUNT_INFORMATION) ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "account-info-section"
              }, [
                vue.createElementVNode("view", { class: "account-card" }, [
                  vue.createElementVNode("view", { class: "account-info-block" }, [
                    vue.createElementVNode("view", { class: "account-info-row" }, [
                      vue.createElementVNode("text", { class: "account-info-label" }, "发票系统编号"),
                      vue.createElementVNode(
                        "text",
                        { class: "account-info-value" },
                        vue.toDisplayString($setup.itemDatas.invoiceCloudId || ""),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "account-info-row" }, [
                      vue.createElementVNode("text", { class: "account-info-label" }, "普票金额"),
                      vue.createElementVNode(
                        "text",
                        { class: "account-info-value" },
                        vue.toDisplayString($setup.formatNumber($setup.itemDatas.vatoamount) || ""),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "account-info-row" }, [
                      vue.createElementVNode("text", { class: "account-info-label" }, "可抵扣票据"),
                      vue.createElementVNode(
                        "text",
                        { class: "account-info-value" },
                        vue.toDisplayString($setup.formatNumber($setup.itemDatas.vatamountNet) || ""),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "account-info-row" }, [
                      vue.createElementVNode("text", { class: "account-info-label" }, "进项税额"),
                      vue.createElementVNode(
                        "text",
                        { class: "account-info-value" },
                        vue.toDisplayString($setup.formatNumber($setup.itemDatas.vattaxAmount) || ""),
                        1
                        /* TEXT */
                      )
                    ])
                  ])
                ])
              ])) : vue.createCommentVNode("v-if", true)
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        vue.createElementVNode("view", { class: "section" }, [
          vue.createElementVNode("view", {
            class: "section-title-2",
            onClick: _cache[2] || (_cache[2] = ($event) => $setup.setOptions($setup.ATTACHMENT_LIST))
          }, [
            vue.createElementVNode("view", { class: "section-title-2-left" }, [
              vue.createElementVNode("text", { class: "section-title-vertical" }),
              vue.createElementVNode("text", { class: "section-title-text" }, "附件")
            ]),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["section-title-2-right", { "active": $setup.getOptions($setup.ATTACHMENT_LIST) }])
              },
              null,
              2
              /* CLASS */
            )
          ]),
          vue.createVNode(vue.Transition, { name: "collapse" }, {
            default: vue.withCtx(() => [
              $setup.getOptions($setup.ATTACHMENT_LIST) ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "attachment-section"
              }, [
                vue.createVNode($setup["attachmentList"], { list: $setup.attachmentData }, null, 8, ["list"])
              ])) : vue.createCommentVNode("v-if", true)
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        vue.createElementVNode("view", { class: "section" }, [
          vue.createElementVNode("view", {
            class: "section-title-2",
            onClick: _cache[3] || (_cache[3] = ($event) => $setup.setOptions($setup.APPROVAL_RECORD))
          }, [
            vue.createElementVNode("view", { class: "section-title-2-left" }, [
              vue.createElementVNode("text", { class: "section-title-vertical" }),
              vue.createElementVNode("text", { class: "section-title-text" }, "审批记录")
            ]),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["section-title-2-right", { "active": $setup.getOptions($setup.APPROVAL_RECORD) }])
              },
              null,
              2
              /* CLASS */
            )
          ]),
          vue.createVNode(vue.Transition, { name: "collapse" }, {
            default: vue.withCtx(() => [
              $setup.getOptions($setup.APPROVAL_RECORD) ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "approval-record-section"
              }, [
                vue.createVNode($setup["approvalTimeline"], { list: $setup.approvalRecordList }, null, 8, ["list"])
              ])) : vue.createCommentVNode("v-if", true)
            ]),
            _: 1
            /* STABLE */
          })
        ])
      ]),
      vue.createVNode($setup["InputDialog"], {
        ref: "inputDialogRef",
        required: $setup.inputDialogRequired,
        title: $setup.inputDialogTitle,
        placeholder: $setup.inputDialogPlaceholder,
        onConfirm: $setup.handleInputConfirm,
        onCancel: $setup.handleInputCancel
      }, null, 8, ["required", "title", "placeholder"])
    ]);
  }
  const PagesDetailSgjf = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$b], ["__scopeId", "data-v-4fe8957f"], ["__file", "E:/cityInvestment02/city-Investment/pages/detail/sgjf.vue"]]);
  const _sfc_main$b = {
    __name: "kyjf",
    setup(__props, { expose: __expose }) {
      __expose();
      vue.useCssVars((_ctx) => ({
        "f9f247ce-scrollerHeight": scrollerHeight.value
      }));
      const statusBarHeight = vue.ref(0);
      let eventChannel;
      onLoad(() => {
        var _a, _b, _c;
        const h = getStorage("statusBarHeight");
        if (Number(h))
          statusBarHeight.value = Number(h);
        eventChannel = (_c = (_b = (_a = vue.getCurrentInstance()) == null ? void 0 : _a.proxy) == null ? void 0 : _b.getOpenerEventChannel) == null ? void 0 : _c.call(_b);
        eventChannel.on("open-detail", (data) => {
          formatAppLog("log", "at pages/detail/kyjf.vue:251", "open-detail", data);
          currentType.value = data.type;
          itemDetail.value = data.order;
          getFormDataApproval();
          getApprovalRecord();
        });
      });
      const currentType = vue.ref("");
      const currentUrlObj = vue.reactive({
        pending: "/WF/GetFormDataApproval",
        completed: "/WF/GetFormDataView"
      });
      const inputDialogRef = vue.ref(null);
      const inputDialogRequired = vue.ref(false);
      const inputDialogTitle = vue.ref("");
      const inputDialogPlaceholder = vue.ref("");
      const inputDialogValue = vue.ref("");
      const scrollerHeight = vue.ref("0px");
      const itemDetail = vue.ref({});
      const stageTags = vue.ref([]);
      const wfstatusText = vue.computed(() => {
        return itemDatas.value.wfstatus == "Running" ? "流转中" : itemDatas.value.wfstatus == "Completed" ? "已审批" : "";
      });
      const attachmentData = vue.ref([]);
      const pullDownObj = vue.reactive({
        [FUND_USAGE_STATUS]: true,
        [APPROVAL_RECORD]: true,
        [PAYMENT_ACCOUNT_INFORMATION]: true,
        [ATTACHMENT_LIST]: true
      });
      const setOptions = (name) => {
        pullDownObj[name] = pullDownObj[name] ? false : true;
      };
      const getOptions = (name) => {
        return pullDownObj[name];
      };
      const urlParams = vue.computed(() => {
        let params = {
          pending: {
            procCode: itemDetail.value.procDefCode,
            workitemid: itemDetail.value.workItemId
          },
          completed: {
            procCode: itemDetail.value.procDefCode,
            wfInstanceId: itemDetail.value.wfinstanceId
          }
        };
        return params[currentType.value];
      });
      const infoRows = vue.ref([
        {
          label: "用款部门",
          value: "",
          key: "businessUnitName"
        },
        {
          label: "申请人",
          value: "",
          key: "submittedByName"
          //deng 潜在bug
        },
        {
          label: "付款单位",
          value: "",
          key: "projecCompany"
        },
        {
          label: "付款帐号",
          value: "",
          key: "paymentAccount"
        },
        {
          label: "付款银行",
          value: "",
          key: "paymentBank"
        },
        {
          label: "收款单位",
          value: "",
          key: "receiverCompany"
        },
        {
          label: "收款帐号",
          value: "",
          key: "receiverAccountNumber"
        },
        {
          label: "收款银行",
          value: "",
          key: "receiverBankName"
        }
      ]);
      const infoRows2 = vue.ref([
        {
          label: "课题名称",
          value: "",
          key: "projectTopicName"
        },
        {
          label: "立项单位",
          value: "",
          key: "projectApprovalUnit"
        },
        {
          label: "立项预算科目名称",
          value: "",
          key: "budgetAccountName"
        },
        {
          label: "资金来源",
          value: "",
          key: "fundSource"
        },
        {
          label: "总经费余额（不含本次）",
          value: "",
          key: "remainFundExcludeCurrent"
        },
        {
          label: "科目余额（不含本次）",
          value: "",
          key: "remainAccountFundExcludeCurrent"
        },
        {
          label: "预算金额",
          value: "",
          key: "planToPayTotal"
        },
        {
          label: "已使用/占用金额",
          value: "",
          key: "occBudgetAmount"
        },
        {
          label: "可用预算金额",
          value: "",
          key: "availableBudgetAmount"
        },
        {
          label: "计划支付金额",
          value: "",
          key: "planToPay"
        },
        {
          label: "支付内容",
          value: "",
          key: "paymentContent"
        }
      ]);
      const infoRows2Flag = vue.ref(["remainFundExcludeCurrent", "remainAccountFundExcludeCurrent", "planToPay", "planToPayTotal", "occBudgetAmount", "availableBudgetAmount"]);
      function goBack() {
        uni.navigateBack();
      }
      const itemDatas = vue.ref({});
      const getFormDataApproval = () => {
        http.get(currentUrlObj[currentType.value], urlParams.value).then((res) => {
          var _a, _b;
          let data = ((_a = res.data) == null ? void 0 : _a.data) || {};
          itemDatas.value = data || {};
          infoRows.value.forEach((item) => {
            item.value = typeof itemDatas.value[item.key] === "number" ? formatNumber(itemDatas.value[item.key]) : itemDatas.value[item.key] || "";
          });
          infoRows2.value.forEach((item) => {
            item.value = typeof itemDatas.value[item.key] === "number" || infoRows2Flag.value.includes(item.key) ? formatNumber(itemDatas.value[item.key]) : itemDatas.value[item.key] || "";
          });
          if (itemDatas.value.projectApprovalUnit) {
            stageTags.value.push(itemDatas.value.projectApprovalUnit);
          }
          if (itemDatas.value.budgetAccountName) {
            stageTags.value.push(itemDatas.value.budgetAccountName);
          }
          let arr1 = (((_b = itemDatas.value) == null ? void 0 : _b.attachmentList) || []).map((item) => {
            return {
              fileTagName: item.fileTagName,
              fileName: item.fileName,
              fileUrl: item.fileUrl,
              id: item.attachmentId
            };
          });
          attachmentData.value = [{ fileTagName: "合同", children: [] }, { fileTagName: "课题预算表", children: [] }, { fileTagName: "发票", children: [] }];
          const attachmentMap = /* @__PURE__ */ new Map();
          attachmentData.value.forEach((item) => {
            attachmentMap.set(item.fileTagName, item);
          });
          arr1.forEach((childItem) => {
            const parent = attachmentMap.get(childItem.fileTagName);
            if (parent) {
              parent.children.push(childItem);
            }
          });
        });
      };
      const onReject = () => {
        inputDialogRequired.value = true;
        openInputDialog("打回原因", "请输入打回原因");
      };
      const onApprove = () => {
        inputDialogRequired.value = false;
        openInputDialog("通过原因", "请输入通过原因");
      };
      const openInputDialog = (title, placeholder) => {
        inputDialogTitle.value = title;
        inputDialogPlaceholder.value = placeholder;
        inputDialogRef.value.open();
      };
      const handleInputConfirm = (value, dialogType) => {
        inputDialogValue.value = value;
        inputDialogRef.value.close();
        doSubmitApproval(dialogType);
      };
      const handleInputCancel = () => {
        inputDialogRef.value.close();
        inputDialogValue.value = "";
      };
      const doSubmitApproval = (dialogType) => {
        let params = {
          wfInstanceId: itemDetail.value.wfinstanceId,
          workItemId: itemDetail.value.workItemId,
          approvalComment: inputDialogValue.value,
          annotationComment: "",
          pictureBaseData: "",
          isApproval: dialogType,
          procDefCode: itemDetail.value.procDefCode
          //ZC01和GC01两个类型的可以了
        };
        http.post("/WF/SubmitApproval", params).then((res) => {
          if (res.code === 0) {
            uni.showToast({
              title: "已审批",
              icon: "success"
            });
            setTimeout(() => {
              if (currentType.value === "pending") {
                uni.$emit("refresh-pending");
                uni.$emit("refresh-completed");
              }
              goBack();
            }, 1e3);
          } else {
            uni.showToast({
              title: res.message,
              icon: "none"
            });
          }
        });
      };
      const approvalRecordList = vue.ref([]);
      const getApprovalRecord = () => {
        http.get("/WF/GetApprovalHistory", {
          wfinstanceId: itemDetail.value.wfinstanceId
        }).then((res) => {
          formatAppLog("log", "at pages/detail/kyjf.vue:508", res);
          approvalRecordList.value = res.data || [];
        });
      };
      function computeScrollHeight() {
        try {
          const {
            windowHeight
          } = uni.getSystemInfoSync();
          const inst = vue.getCurrentInstance();
          const q = uni.createSelectorQuery().in(inst == null ? void 0 : inst.proxy);
          q.select(".header-stickt").boundingClientRect((data) => {
            const headerH = (data == null ? void 0 : data.height) || 0;
            const h = Math.max(0, windowHeight - headerH);
            scrollerHeight.value = `${h}px`;
          }).exec();
        } catch (e) {
          scrollerHeight.value = "calc(100vh - 88rpx)";
        }
      }
      vue.onMounted(() => {
        var _a;
        vue.nextTick(() => {
          computeScrollHeight();
        });
        const systemInfo2 = uni.getSystemInfoSync();
        const isIOS = systemInfo2.platform === "ios";
        const isH5 = systemInfo2.platform === "h5" || false;
        if (isIOS && isH5) {
          formatAppLog("log", "at pages/detail/kyjf.vue:544", "检测到 iOS H5 环境，添加滚动修复");
          document.addEventListener("focusout", () => {
            setTimeout(() => {
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: "instant"
              });
            }, 20);
          });
        } else {
          (_a = window.visualViewport) == null ? void 0 : _a.addEventListener("resize", onResize);
          window.addEventListener("resize", onResize);
        }
      });
      function onResize() {
        setTimeout(() => {
          computeScrollHeight();
        }, 100);
      }
      const __returned__ = { statusBarHeight, get eventChannel() {
        return eventChannel;
      }, set eventChannel(v) {
        eventChannel = v;
      }, currentType, currentUrlObj, inputDialogRef, inputDialogRequired, inputDialogTitle, inputDialogPlaceholder, inputDialogValue, scrollerHeight, itemDetail, stageTags, wfstatusText, attachmentData, pullDownObj, setOptions, getOptions, urlParams, infoRows, infoRows2, infoRows2Flag, goBack, itemDatas, getFormDataApproval, onReject, onApprove, openInputDialog, handleInputConfirm, handleInputCancel, doSubmitApproval, approvalRecordList, getApprovalRecord, computeScrollHeight, onResize, get onLoad() {
        return onLoad;
      }, ref: vue.ref, reactive: vue.reactive, onMounted: vue.onMounted, nextTick: vue.nextTick, getCurrentInstance: vue.getCurrentInstance, computed: vue.computed, get getStorage() {
        return getStorage;
      }, get FUND_USAGE_STATUS() {
        return FUND_USAGE_STATUS;
      }, get APPROVAL_RECORD() {
        return APPROVAL_RECORD;
      }, get PAYMENT_ACCOUNT_INFORMATION() {
        return PAYMENT_ACCOUNT_INFORMATION;
      }, get ATTACHMENT_LIST() {
        return ATTACHMENT_LIST;
      }, get http() {
        return http;
      }, get formatNumber() {
        return formatNumber;
      }, InputDialog, approvalTimeline, attachmentList };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_nav_bar = resolveEasycom(vue.resolveDynamicComponent("uni-nav-bar"), __easycom_0$4);
    return vue.openBlock(), vue.createElementBlock("view", { class: "detail-page" }, [
      vue.createElementVNode("view", { class: "header-stickt" }, [
        vue.createElementVNode(
          "view",
          {
            class: "status_bar",
            style: vue.normalizeStyle({ height: `${$setup.statusBarHeight * 2}rpx` })
          },
          null,
          4
          /* STYLE */
        ),
        vue.createVNode(_component_uni_nav_bar, { class: "nav-bar-top" }, {
          left: vue.withCtx(() => [
            vue.createElementVNode("view", {
              class: "back-btn",
              onClick: $setup.goBack
            })
          ]),
          right: vue.withCtx(() => [
            vue.createElementVNode("view", { style: { "width": "40rpx" } })
          ]),
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "nav-title" }, "审批详情")
          ]),
          _: 1
          /* STABLE */
        }),
        vue.createElementVNode("view", { class: "hero-card" }, [
          vue.createElementVNode("view", { class: "hero-header" }, [
            vue.createElementVNode("view", { class: "project-name" }, [
              vue.createElementVNode(
                "view",
                { class: "project-name-1" },
                vue.toDisplayString($setup.itemDetail.taskName),
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "view",
                { class: "project-name-1" },
                vue.toDisplayString($setup.itemDatas.projecCompany),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "amount-box" }, [
              vue.createElementVNode("view", { class: "amount-label" }, "申请支付总金额"),
              vue.createElementVNode("view", { class: "amount-value" }, [
                vue.createElementVNode("text", { class: "amount-value-symbol" }, "¥"),
                vue.createElementVNode(
                  "text",
                  { class: "amount-value-number" },
                  vue.toDisplayString($setup.formatNumber($setup.itemDatas.planToPay)),
                  1
                  /* TEXT */
                )
              ])
            ])
          ]),
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["hero-tags", { "hero-tags-width": $setup.currentType != "pending" }])
            },
            [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($setup.stageTags, (t2, i) => {
                  return vue.openBlock(), vue.createElementBlock(
                    "view",
                    {
                      class: "tag",
                      key: i
                    },
                    vue.toDisplayString(t2),
                    1
                    /* TEXT */
                  );
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ],
            2
            /* CLASS */
          ),
          vue.withDirectives(vue.createElementVNode(
            "view",
            { class: "hero-actions" },
            [
              vue.createElementVNode("view", {
                class: "btn outline",
                onClick: $setup.onReject
              }, "打回"),
              vue.createElementVNode("view", {
                class: "btn primary",
                onClick: $setup.onApprove
              }, "通过")
            ],
            512
            /* NEED_PATCH */
          ), [
            [vue.vShow, $setup.currentType === "pending"]
          ]),
          vue.withDirectives(vue.createElementVNode(
            "view",
            { class: "wfstatus-actions" },
            vue.toDisplayString($setup.wfstatusText),
            513
            /* TEXT, NEED_PATCH */
          ), [
            [vue.vShow, $setup.currentType === "completed" && ($setup.itemDatas.wfstatus == "Running" || $setup.itemDatas.wfstatus == "Completed")]
          ])
        ])
      ]),
      vue.createElementVNode("scroll-view", {
        "scroll-y": "true",
        class: "scroller"
      }, [
        vue.createElementVNode("view", { class: "section" }, [
          vue.createElementVNode("view", { class: "section-title" }, [
            vue.createElementVNode("text", { class: "section-title-vertical" }),
            vue.createElementVNode("text", { class: "section-title-text" }, "基本信息")
          ]),
          vue.createElementVNode("view", { class: "account-info-section" }, [
            vue.createElementVNode("view", { style: { "height": "10rpx" } }),
            vue.createElementVNode("view", { class: "account-card" }, [
              vue.createElementVNode("view", { class: "account-info-block" }, [
                vue.createElementVNode("view", { class: "account-info-row" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "account-info-label" },
                    vue.toDisplayString($setup.infoRows[0].label),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "account-info-value" },
                    vue.toDisplayString($setup.infoRows[0].value),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "account-info-row" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "account-info-label" },
                    vue.toDisplayString($setup.infoRows[1].label),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "account-info-value" },
                    vue.toDisplayString($setup.infoRows[1].value),
                    1
                    /* TEXT */
                  )
                ])
              ])
            ]),
            vue.createElementVNode("view", { class: "account-card margin_1" }, [
              vue.createElementVNode("view", { class: "account-info-block" }, [
                vue.createElementVNode("view", { class: "account-info-row" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "account-info-label" },
                    vue.toDisplayString($setup.infoRows[2].label),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "account-info-value" },
                    vue.toDisplayString($setup.infoRows[2].value),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "account-info-row" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "account-info-label" },
                    vue.toDisplayString($setup.infoRows[3].label),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "account-info-value" },
                    vue.toDisplayString($setup.infoRows[3].value),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "account-info-row" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "account-info-label" },
                    vue.toDisplayString($setup.infoRows[4].label),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "account-info-value" },
                    vue.toDisplayString($setup.infoRows[4].value),
                    1
                    /* TEXT */
                  )
                ])
              ])
            ]),
            vue.createElementVNode("view", { class: "account-card margin_1" }, [
              vue.createElementVNode("view", { class: "account-info-block" }, [
                vue.createElementVNode("view", { class: "account-info-row" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "account-info-label" },
                    vue.toDisplayString($setup.infoRows[5].label),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "account-info-value" },
                    vue.toDisplayString($setup.infoRows[5].value),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "account-info-row" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "account-info-label" },
                    vue.toDisplayString($setup.infoRows[6].label),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "account-info-value" },
                    vue.toDisplayString($setup.infoRows[6].value),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "account-info-row" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "account-info-label" },
                    vue.toDisplayString($setup.infoRows[7].label),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "account-info-value" },
                    vue.toDisplayString($setup.infoRows[7].value),
                    1
                    /* TEXT */
                  )
                ])
              ])
            ])
          ])
        ]),
        vue.createElementVNode("view", { class: "section" }, [
          vue.createElementVNode("view", {
            class: "section-title-2",
            onClick: _cache[0] || (_cache[0] = ($event) => $setup.setOptions($setup.FUND_USAGE_STATUS))
          }, [
            vue.createElementVNode("view", { class: "section-title-2-left" }, [
              vue.createElementVNode("text", { class: "section-title-vertical" }),
              vue.createElementVNode("text", { class: "section-title-text" }, "课题信息")
            ]),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["section-title-2-right", { "active": $setup.getOptions($setup.FUND_USAGE_STATUS) }])
              },
              null,
              2
              /* CLASS */
            )
          ]),
          vue.createVNode(vue.Transition, { name: "collapse" }, {
            default: vue.withCtx(() => [
              $setup.getOptions($setup.FUND_USAGE_STATUS) ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "info-list"
              }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($setup.infoRows2, (row, idx) => {
                    return vue.openBlock(), vue.createElementBlock(
                      "view",
                      {
                        class: vue.normalizeClass(["info-item", { "info-item-border": row.key === "remainAccountFundExcludeCurrent" || row.key === "availableBudgetAmount" }]),
                        key: idx
                      },
                      [
                        vue.createElementVNode(
                          "text",
                          {
                            class: vue.normalizeClass(["info-label", { "info-label-width": row.key === "projectTopicName" }])
                          },
                          vue.toDisplayString(row.label),
                          3
                          /* TEXT, CLASS */
                        ),
                        vue.createElementVNode(
                          "text",
                          { class: "info-value" },
                          vue.toDisplayString(row.value || "--"),
                          1
                          /* TEXT */
                        )
                      ],
                      2
                      /* CLASS */
                    );
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])) : vue.createCommentVNode("v-if", true)
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        vue.createElementVNode("view", { class: "section" }, [
          vue.createElementVNode("view", {
            class: "section-title-2",
            onClick: _cache[1] || (_cache[1] = ($event) => $setup.setOptions($setup.PAYMENT_ACCOUNT_INFORMATION))
          }, [
            vue.createElementVNode("view", { class: "section-title-2-left" }, [
              vue.createElementVNode("text", { class: "section-title-vertical" }),
              vue.createElementVNode("text", { class: "section-title-text" }, "补充信息")
            ]),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["section-title-2-right", { "active": $setup.getOptions($setup.PAYMENT_ACCOUNT_INFORMATION) }])
              },
              null,
              2
              /* CLASS */
            )
          ]),
          vue.createVNode(vue.Transition, { name: "collapse" }, {
            default: vue.withCtx(() => [
              $setup.getOptions($setup.PAYMENT_ACCOUNT_INFORMATION) ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "account-info-section"
              }, [
                vue.createElementVNode("view", { class: "account-card" }, [
                  vue.createElementVNode("view", { class: "account-info-block" }, [
                    vue.createElementVNode("view", { class: "account-info-row" }, [
                      vue.createElementVNode("text", { class: "account-info-label" }, "发票系统编号"),
                      vue.createElementVNode(
                        "text",
                        { class: "account-info-value" },
                        vue.toDisplayString($setup.itemDatas.invoiceCloudId || ""),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "account-info-row" }, [
                      vue.createElementVNode("text", { class: "account-info-label" }, "普票金额"),
                      vue.createElementVNode(
                        "text",
                        { class: "account-info-value" },
                        vue.toDisplayString($setup.formatNumber($setup.itemDatas.vatoamount) || ""),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "account-info-row" }, [
                      vue.createElementVNode("text", { class: "account-info-label" }, "可抵扣票据"),
                      vue.createElementVNode(
                        "text",
                        { class: "account-info-value" },
                        vue.toDisplayString($setup.formatNumber($setup.itemDatas.vatamountNet) || ""),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "account-info-row" }, [
                      vue.createElementVNode("text", { class: "account-info-label" }, "进项税额"),
                      vue.createElementVNode(
                        "text",
                        { class: "account-info-value" },
                        vue.toDisplayString($setup.formatNumber($setup.itemDatas.vattaxAmount) || ""),
                        1
                        /* TEXT */
                      )
                    ])
                  ])
                ])
              ])) : vue.createCommentVNode("v-if", true)
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        vue.createElementVNode("view", { class: "section" }, [
          vue.createElementVNode("view", {
            class: "section-title-2",
            onClick: _cache[2] || (_cache[2] = ($event) => $setup.setOptions($setup.ATTACHMENT_LIST))
          }, [
            vue.createElementVNode("view", { class: "section-title-2-left" }, [
              vue.createElementVNode("text", { class: "section-title-vertical" }),
              vue.createElementVNode("text", { class: "section-title-text" }, "附件")
            ]),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["section-title-2-right", { "active": $setup.getOptions($setup.ATTACHMENT_LIST) }])
              },
              null,
              2
              /* CLASS */
            )
          ]),
          vue.createVNode(vue.Transition, { name: "collapse" }, {
            default: vue.withCtx(() => [
              $setup.getOptions($setup.ATTACHMENT_LIST) ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "attachment-section"
              }, [
                vue.createVNode($setup["attachmentList"], { list: $setup.attachmentData }, null, 8, ["list"])
              ])) : vue.createCommentVNode("v-if", true)
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        vue.createElementVNode("view", { class: "section" }, [
          vue.createElementVNode("view", {
            class: "section-title-2",
            onClick: _cache[3] || (_cache[3] = ($event) => $setup.setOptions($setup.APPROVAL_RECORD))
          }, [
            vue.createElementVNode("view", { class: "section-title-2-left" }, [
              vue.createElementVNode("text", { class: "section-title-vertical" }),
              vue.createElementVNode("text", { class: "section-title-text" }, "审批记录")
            ]),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["section-title-2-right", { "active": $setup.getOptions($setup.APPROVAL_RECORD) }])
              },
              null,
              2
              /* CLASS */
            )
          ]),
          vue.createVNode(vue.Transition, { name: "collapse" }, {
            default: vue.withCtx(() => [
              $setup.getOptions($setup.APPROVAL_RECORD) ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "approval-record-section"
              }, [
                vue.createVNode($setup["approvalTimeline"], { list: $setup.approvalRecordList }, null, 8, ["list"])
              ])) : vue.createCommentVNode("v-if", true)
            ]),
            _: 1
            /* STABLE */
          })
        ])
      ]),
      vue.createVNode($setup["InputDialog"], {
        ref: "inputDialogRef",
        required: $setup.inputDialogRequired,
        title: $setup.inputDialogTitle,
        placeholder: $setup.inputDialogPlaceholder,
        onConfirm: $setup.handleInputConfirm,
        onCancel: $setup.handleInputCancel
      }, null, 8, ["required", "title", "placeholder"])
    ]);
  }
  const PagesDetailKyjf = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$a], ["__scopeId", "data-v-f9f247ce"], ["__file", "E:/cityInvestment02/city-Investment/pages/detail/kyjf.vue"]]);
  const _sfc_main$a = {
    __name: "zjdb",
    setup(__props, { expose: __expose }) {
      __expose();
      vue.useCssVars((_ctx) => ({
        "3a63d64a-scrollerHeight": scrollerHeight.value
      }));
      const statusBarHeight = vue.ref(0);
      let eventChannel;
      onLoad(() => {
        var _a, _b, _c;
        const h = getStorage("statusBarHeight");
        if (Number(h))
          statusBarHeight.value = Number(h);
        eventChannel = (_c = (_b = (_a = vue.getCurrentInstance()) == null ? void 0 : _a.proxy) == null ? void 0 : _b.getOpenerEventChannel) == null ? void 0 : _c.call(_b);
        eventChannel.on("open-detail", (data) => {
          formatAppLog("log", "at pages/detail/zjdb.vue:177", "open-detail", data);
          currentType.value = data.type;
          itemDetail.value = data.order;
          getFormDataApproval();
          getApprovalRecord();
        });
      });
      const currentType = vue.ref("");
      const currentUrlObj = vue.reactive({
        pending: "/WF/GetFormDataApproval",
        completed: "/WF/GetFormDataView"
      });
      const inputDialogRef = vue.ref(null);
      const inputDialogRequired = vue.ref(false);
      const inputDialogTitle = vue.ref("");
      const inputDialogPlaceholder = vue.ref("");
      const inputDialogValue = vue.ref("");
      const scrollerHeight = vue.ref("0px");
      const itemDetail = vue.ref({});
      const stageTags = vue.ref([]);
      const attachmentData = vue.ref([]);
      const wfstatusText = vue.computed(() => {
        return itemDatas.value.wfstatus == "Running" ? "流转中" : itemDatas.value.wfstatus == "Completed" ? "已审批" : "";
      });
      const pullDownObj = vue.reactive({
        [PAYMENT_ACCOUNT_INFORMATION]: true,
        [APPROVAL_RECORD]: true,
        [ATTACHMENT_LIST]: true
      });
      const setOptions = (name) => {
        pullDownObj[name] = pullDownObj[name] ? false : true;
      };
      const getOptions = (name) => {
        return pullDownObj[name];
      };
      const urlParams = vue.computed(() => {
        let params = {
          pending: {
            procCode: itemDetail.value.procDefCode,
            workitemid: itemDetail.value.workItemId
          },
          completed: {
            procCode: itemDetail.value.procDefCode,
            wfInstanceId: itemDetail.value.wfinstanceId
          }
        };
        return params[currentType.value];
      });
      const infoRows = vue.ref([
        {
          label: "付款单位",
          value: "",
          key: "fromCompanyName"
        },
        {
          label: "付款开户行",
          value: "",
          key: "fromBankName"
        },
        {
          label: "付款账号",
          value: "",
          key: "fromAccountNumber"
        },
        {
          label: "收款单位",
          value: "",
          key: "toCompanyName"
        },
        {
          label: "收款开户行",
          value: "",
          key: "toBankName"
        },
        {
          label: "收款账号",
          value: "",
          key: "toAccountNumber"
        },
        {
          label: "调拨金额",
          value: "",
          key: "transferAmount"
        },
        {
          label: "调拨事项",
          value: "",
          key: "content"
        }
      ]);
      function goBack() {
        uni.navigateBack();
      }
      const itemDatas = vue.ref({});
      const getFormDataApproval = () => {
        http.get(currentUrlObj[currentType.value], urlParams.value).then((res) => {
          var _a;
          let data = ((_a = res.data) == null ? void 0 : _a.data) || {};
          itemDatas.value = (data == null ? void 0 : data.wfrequestfundtransfer) || {};
          infoRows.value.forEach((item) => {
            item.value = typeof itemDatas.value[item.key] === "number" ? formatNumber(itemDatas.value[item.key]) : itemDatas.value[item.key] || "";
          });
          if (itemDatas.value.toCompanyName) {
            stageTags.value.push(itemDatas.value.toCompanyName);
          }
          let arr1 = ((data == null ? void 0 : data.attachments) || []).map((item) => {
            return {
              fileTagName: item.fileTagName,
              fileName: item.fileName,
              fileUrl: item.fileUrl,
              id: item.attachmentId
            };
          });
          formatAppLog("log", "at pages/detail/zjdb.vue:293", "arr1=>", arr1);
          attachmentData.value = [{ fileTagName: "其他", children: [] }];
          const attachmentMap = /* @__PURE__ */ new Map();
          attachmentData.value.forEach((item) => {
            attachmentMap.set(item.fileTagName, item);
          });
          arr1.forEach((childItem) => {
            const parent = attachmentMap.get(childItem.fileTagName);
            if (parent) {
              parent.children.push(childItem);
            }
          });
        });
      };
      const onReject = () => {
        inputDialogRequired.value = true;
        openInputDialog("打回原因", "请输入打回原因");
      };
      const onApprove = () => {
        inputDialogRequired.value = false;
        openInputDialog("通过原因", "请输入通过原因");
      };
      const openInputDialog = (title, placeholder) => {
        inputDialogTitle.value = title;
        inputDialogPlaceholder.value = placeholder;
        inputDialogRef.value.open();
      };
      const handleInputConfirm = (value, dialogType) => {
        inputDialogValue.value = value;
        inputDialogRef.value.close();
        doSubmitApproval(dialogType);
      };
      const handleInputCancel = () => {
        inputDialogRef.value.close();
        inputDialogValue.value = "";
      };
      const doSubmitApproval = (dialogType) => {
        let params = {
          wfInstanceId: itemDetail.value.wfinstanceId,
          workItemId: itemDetail.value.workItemId,
          approvalComment: inputDialogValue.value,
          annotationComment: "",
          pictureBaseData: "",
          isApproval: dialogType,
          procDefCode: itemDetail.value.procDefCode
        };
        http.post("/WF/SubmitApproval", params).then((res) => {
          if (res.code === 0) {
            uni.showToast({
              title: "已审批",
              icon: "success"
            });
            setTimeout(() => {
              if (currentType.value === "pending") {
                uni.$emit("refresh-pending");
                uni.$emit("refresh-completed");
              }
              goBack();
            }, 1e3);
          } else {
            uni.showToast({
              title: res.message,
              icon: "none"
            });
          }
        });
      };
      const approvalRecordList = vue.ref([]);
      const getApprovalRecord = () => {
        http.get("/WF/GetApprovalHistory", {
          wfinstanceId: itemDetail.value.wfinstanceId
        }).then((res) => {
          formatAppLog("log", "at pages/detail/zjdb.vue:373", res);
          approvalRecordList.value = res.data || [];
        });
      };
      function computeScrollHeight() {
        try {
          const {
            windowHeight
          } = uni.getSystemInfoSync();
          const inst = vue.getCurrentInstance();
          const q = uni.createSelectorQuery().in(inst == null ? void 0 : inst.proxy);
          q.select(".header-stickt").boundingClientRect((data) => {
            const headerH = (data == null ? void 0 : data.height) || 0;
            const h = Math.max(0, windowHeight - headerH);
            scrollerHeight.value = `${h}px`;
          }).exec();
        } catch (e) {
          scrollerHeight.value = "calc(100vh - 88rpx)";
        }
      }
      vue.onMounted(() => {
        var _a;
        vue.nextTick(() => {
          computeScrollHeight();
        });
        const systemInfo2 = uni.getSystemInfoSync();
        const isIOS = systemInfo2.platform === "ios";
        const isH5 = systemInfo2.platform === "h5" || false;
        if (isIOS && isH5) {
          formatAppLog("log", "at pages/detail/zjdb.vue:406", "检测到 iOS H5 环境，添加滚动修复");
          document.addEventListener("focusout", () => {
            setTimeout(() => {
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: "instant"
              });
            }, 20);
          });
        } else {
          (_a = window.visualViewport) == null ? void 0 : _a.addEventListener("resize", onResize);
          window.addEventListener("resize", onResize);
        }
      });
      function onResize() {
        setTimeout(() => {
          computeScrollHeight();
        }, 100);
      }
      const __returned__ = { statusBarHeight, get eventChannel() {
        return eventChannel;
      }, set eventChannel(v) {
        eventChannel = v;
      }, currentType, currentUrlObj, inputDialogRef, inputDialogRequired, inputDialogTitle, inputDialogPlaceholder, inputDialogValue, scrollerHeight, itemDetail, stageTags, attachmentData, wfstatusText, pullDownObj, setOptions, getOptions, urlParams, infoRows, goBack, itemDatas, getFormDataApproval, onReject, onApprove, openInputDialog, handleInputConfirm, handleInputCancel, doSubmitApproval, approvalRecordList, getApprovalRecord, computeScrollHeight, onResize, get onLoad() {
        return onLoad;
      }, ref: vue.ref, reactive: vue.reactive, onMounted: vue.onMounted, nextTick: vue.nextTick, getCurrentInstance: vue.getCurrentInstance, computed: vue.computed, get getStorage() {
        return getStorage;
      }, get PAYMENT_ACCOUNT_INFORMATION() {
        return PAYMENT_ACCOUNT_INFORMATION;
      }, get APPROVAL_RECORD() {
        return APPROVAL_RECORD;
      }, get ATTACHMENT_LIST() {
        return ATTACHMENT_LIST;
      }, get http() {
        return http;
      }, get formatNumber() {
        return formatNumber;
      }, InputDialog, approvalTimeline, attachmentList };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_nav_bar = resolveEasycom(vue.resolveDynamicComponent("uni-nav-bar"), __easycom_0$4);
    return vue.openBlock(), vue.createElementBlock("view", { class: "detail-page" }, [
      vue.createElementVNode("view", { class: "header-stickt" }, [
        vue.createElementVNode(
          "view",
          {
            class: "status_bar",
            style: vue.normalizeStyle({ height: `${$setup.statusBarHeight * 2}rpx` })
          },
          null,
          4
          /* STYLE */
        ),
        vue.createVNode(_component_uni_nav_bar, { class: "nav-bar-top" }, {
          left: vue.withCtx(() => [
            vue.createElementVNode("view", {
              class: "back-btn",
              onClick: $setup.goBack
            })
          ]),
          right: vue.withCtx(() => [
            vue.createElementVNode("view", { style: { "width": "40rpx" } })
          ]),
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "nav-title" }, "审批详情")
          ]),
          _: 1
          /* STABLE */
        }),
        vue.createElementVNode("view", { class: "hero-card" }, [
          vue.createElementVNode("view", { class: "hero-header" }, [
            vue.createElementVNode("view", { class: "project-name" }, [
              vue.createElementVNode(
                "view",
                { class: "project-name-1" },
                vue.toDisplayString($setup.itemDetail.taskName),
                1
                /* TEXT */
              ),
              vue.createElementVNode("view", { class: "project-name-1" }, " 上海城投公路投资（集团）有限公司 ")
            ]),
            vue.createElementVNode("view", { class: "amount-box" }, [
              vue.createElementVNode("view", { class: "amount-label" }, "调拨金额"),
              vue.createElementVNode("view", { class: "amount-value" }, [
                vue.createElementVNode("text", { class: "amount-value-symbol" }, "¥"),
                vue.createElementVNode(
                  "text",
                  { class: "amount-value-number" },
                  vue.toDisplayString($setup.infoRows[6].value),
                  1
                  /* TEXT */
                )
              ])
            ])
          ]),
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["hero-tags", { "hero-tags-width": $setup.currentType != "pending" }])
            },
            [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($setup.stageTags, (t2, i) => {
                  return vue.openBlock(), vue.createElementBlock(
                    "view",
                    {
                      class: "tag",
                      key: i
                    },
                    vue.toDisplayString(t2),
                    1
                    /* TEXT */
                  );
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ],
            2
            /* CLASS */
          ),
          vue.withDirectives(vue.createElementVNode(
            "view",
            { class: "hero-actions" },
            [
              vue.createElementVNode("view", {
                class: "btn outline",
                onClick: $setup.onReject
              }, "打回"),
              vue.createElementVNode("view", {
                class: "btn primary",
                onClick: $setup.onApprove
              }, "通过")
            ],
            512
            /* NEED_PATCH */
          ), [
            [vue.vShow, $setup.currentType === "pending"]
          ]),
          vue.withDirectives(vue.createElementVNode(
            "view",
            { class: "wfstatus-actions" },
            vue.toDisplayString($setup.wfstatusText),
            513
            /* TEXT, NEED_PATCH */
          ), [
            [vue.vShow, $setup.currentType === "completed" && ($setup.itemDatas.wfstatus == "Running" || $setup.itemDatas.wfstatus == "Completed")]
          ])
        ])
      ]),
      vue.createElementVNode("scroll-view", {
        "scroll-y": "true",
        class: "scroller"
      }, [
        vue.createElementVNode("view", { class: "section" }, [
          vue.createElementVNode("view", { class: "section-title" }, [
            vue.createElementVNode("text", { class: "section-title-vertical" }),
            vue.createElementVNode("text", { class: "section-title-text" }, "基本信息")
          ]),
          $setup.getOptions($setup.PAYMENT_ACCOUNT_INFORMATION) ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "account-info-section"
          }, [
            vue.createElementVNode("view", { style: { "height": "10rpx" } }),
            vue.createElementVNode("view", { class: "account-card" }, [
              vue.createElementVNode("view", { class: "account-info-block" }, [
                vue.createElementVNode("view", { class: "account-info-row" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "account-info-label" },
                    vue.toDisplayString($setup.infoRows[0].label),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "account-info-value" },
                    vue.toDisplayString($setup.infoRows[0].value),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "account-info-row" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "account-info-label" },
                    vue.toDisplayString($setup.infoRows[1].label),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "account-info-value" },
                    vue.toDisplayString($setup.infoRows[1].value),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "account-info-row" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "account-info-label" },
                    vue.toDisplayString($setup.infoRows[2].label),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "account-info-value" },
                    vue.toDisplayString($setup.infoRows[2].value),
                    1
                    /* TEXT */
                  )
                ])
              ])
            ]),
            vue.createElementVNode("view", { class: "account-card margin_1" }, [
              vue.createElementVNode("view", { class: "account-info-block" }, [
                vue.createElementVNode("view", { class: "account-info-row" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "account-info-label" },
                    vue.toDisplayString($setup.infoRows[3].label),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "account-info-value" },
                    vue.toDisplayString($setup.infoRows[3].value),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "account-info-row" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "account-info-label" },
                    vue.toDisplayString($setup.infoRows[4].label),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "account-info-value" },
                    vue.toDisplayString($setup.infoRows[4].value),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "account-info-row" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "account-info-label" },
                    vue.toDisplayString($setup.infoRows[5].label),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "account-info-value" },
                    vue.toDisplayString($setup.infoRows[5].value),
                    1
                    /* TEXT */
                  )
                ])
              ])
            ]),
            vue.createElementVNode("view", { class: "account-card margin_1" }, [
              vue.createElementVNode("view", { class: "account-info-block" }, [
                vue.createElementVNode("view", { class: "account-info-row" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "account-info-label" },
                    vue.toDisplayString($setup.infoRows[6].label),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "account-info-value" },
                    vue.toDisplayString($setup.infoRows[6].value),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "account-info-row" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "account-info-label" },
                    vue.toDisplayString($setup.infoRows[7].label),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "account-info-value" },
                    vue.toDisplayString($setup.infoRows[7].value),
                    1
                    /* TEXT */
                  )
                ])
              ])
            ])
          ])) : vue.createCommentVNode("v-if", true)
        ]),
        vue.createElementVNode("view", { class: "section" }, [
          vue.createElementVNode("view", {
            class: "section-title-2",
            onClick: _cache[0] || (_cache[0] = ($event) => $setup.setOptions($setup.ATTACHMENT_LIST))
          }, [
            vue.createElementVNode("view", { class: "section-title-2-left" }, [
              vue.createElementVNode("text", { class: "section-title-vertical" }),
              vue.createElementVNode("text", { class: "section-title-text" }, "附件")
            ]),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["section-title-2-right", { "active": $setup.getOptions($setup.ATTACHMENT_LIST) }])
              },
              null,
              2
              /* CLASS */
            )
          ]),
          vue.createVNode(vue.Transition, { name: "collapse" }, {
            default: vue.withCtx(() => [
              $setup.getOptions($setup.ATTACHMENT_LIST) ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "attachment-section"
              }, [
                vue.createVNode($setup["attachmentList"], { list: $setup.attachmentData }, null, 8, ["list"])
              ])) : vue.createCommentVNode("v-if", true)
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        vue.createElementVNode("view", { class: "section" }, [
          vue.createElementVNode("view", {
            class: "section-title-2",
            onClick: _cache[1] || (_cache[1] = ($event) => $setup.setOptions($setup.APPROVAL_RECORD))
          }, [
            vue.createElementVNode("view", { class: "section-title-2-left" }, [
              vue.createElementVNode("text", { class: "section-title-vertical" }),
              vue.createElementVNode("text", { class: "section-title-text" }, "审批记录")
            ]),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["section-title-2-right", { "active": $setup.getOptions($setup.APPROVAL_RECORD) }])
              },
              null,
              2
              /* CLASS */
            )
          ]),
          vue.createVNode(vue.Transition, { name: "collapse" }, {
            default: vue.withCtx(() => [
              $setup.getOptions($setup.APPROVAL_RECORD) ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "approval-record-section"
              }, [
                vue.createVNode($setup["approvalTimeline"], { list: $setup.approvalRecordList }, null, 8, ["list"])
              ])) : vue.createCommentVNode("v-if", true)
            ]),
            _: 1
            /* STABLE */
          })
        ])
      ]),
      vue.createVNode($setup["InputDialog"], {
        ref: "inputDialogRef",
        required: $setup.inputDialogRequired,
        title: $setup.inputDialogTitle,
        placeholder: $setup.inputDialogPlaceholder,
        onConfirm: $setup.handleInputConfirm,
        onCancel: $setup.handleInputCancel
      }, null, 8, ["required", "title", "placeholder"])
    ]);
  }
  const PagesDetailZjdb = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$9], ["__scopeId", "data-v-3a63d64a"], ["__file", "E:/cityInvestment02/city-Investment/pages/detail/zjdb.vue"]]);
  const _sfc_main$9 = {
    __name: "qtjf",
    setup(__props, { expose: __expose }) {
      __expose();
      vue.useCssVars((_ctx) => ({
        "769befc8-scrollerHeight": scrollerHeight.value
      }));
      const statusBarHeight = vue.ref(0);
      let eventChannel;
      onLoad(() => {
        var _a, _b, _c;
        const h = getStorage("statusBarHeight");
        if (Number(h))
          statusBarHeight.value = Number(h);
        eventChannel = (_c = (_b = (_a = vue.getCurrentInstance()) == null ? void 0 : _a.proxy) == null ? void 0 : _b.getOpenerEventChannel) == null ? void 0 : _c.call(_b);
        eventChannel.on("open-detail", (data) => {
          formatAppLog("log", "at pages/detail/qtjf.vue:243", "open-detail", data);
          currentType.value = data.type;
          itemDetail.value = data.order;
          getFormDataApproval();
          getApprovalRecord();
        });
      });
      const currentType = vue.ref("");
      const currentUrlObj = vue.reactive({
        pending: "/WF/GetFormDataApproval",
        completed: "/WF/GetFormDataView"
      });
      const requestTypeSel = vue.reactive({
        "QT01": ["claimCategoryName", "claimCategoryNameLv1", "claimCategoryNameLv2", "claimCategoryNameLv3", "claimName", "claimItemAmountNet", "claimItemTaxAmount", "claimItemAmountVat", "remark"]
      });
      const inputDialogRef = vue.ref(null);
      const inputDialogRequired = vue.ref(false);
      const inputDialogTitle = vue.ref("");
      const inputDialogPlaceholder = vue.ref("");
      const inputDialogValue = vue.ref("");
      const scrollerHeight = vue.ref("0px");
      const itemDetail = vue.ref({});
      const stageTags = vue.ref([]);
      const pullDownObj = vue.reactive({
        [FUND_USAGE_STATUS]: true,
        [PAYMENT_ACCOUNT_INFORMATION]: true,
        [APPROVAL_RECORD]: true
      });
      const setOptions = (name) => {
        pullDownObj[name] = pullDownObj[name] ? false : true;
      };
      const getOptions = (name) => {
        return pullDownObj[name];
      };
      const urlParams = vue.computed(() => {
        let params = {
          pending: {
            procCode: itemDetail.value.procDefCode,
            workitemid: itemDetail.value.workItemId
          },
          completed: {
            procCode: itemDetail.value.procDefCode,
            wfInstanceId: itemDetail.value.wfinstanceId
          }
        };
        return params[currentType.value];
      });
      const infoRows = vue.ref([
        {
          label: "用款部门",
          value: "",
          key: "companyName"
        },
        {
          label: "付款单位",
          value: "",
          key: "paymentCompanyName"
        },
        {
          label: "付款名称",
          value: "",
          key: "receivingBankName"
        },
        {
          label: "支付金额",
          value: "",
          key: "paymentAmount"
        },
        {
          label: "收款单位",
          value: "",
          key: "receivingCompanyName"
        },
        {
          label: "收款开户银行",
          value: "",
          key: "receivingBankAccountName"
        },
        {
          label: "收款账号",
          value: "",
          key: "receivingBankAccountNumber"
        }
      ]);
      const goBack = () => {
        uni.navigateBack();
      };
      const itemDatas = vue.ref({});
      const vehiclePaymentContentList = vue.ref([]);
      const vehiclePaymentContentObj = vue.reactive({});
      const getFormDataApproval = () => {
        http.get(currentUrlObj[currentType.value], urlParams.value).then((res) => {
          var _a, _b, _c, _d, _e, _f;
          itemDatas.value = ((_b = (_a = res.data) == null ? void 0 : _a.data) == null ? void 0 : _b.wfrequestexpenseclaim) || {};
          infoRows.value.forEach((item) => {
            item.value = typeof itemDatas.value[item.key] === "number" || item.key === "claimAmount" || item.key === "paymentAmount" ? formatNumber(itemDatas.value[item.key]) : itemDatas.value[item.key] || "";
          });
          let arr = requestTypeSel[itemDatas.value.requestType] || [];
          if ((_d = (_c = res.data) == null ? void 0 : _c.data) == null ? void 0 : _d.wfrequestexpenseclaimvehicleitems) {
            vehiclePaymentContentList.value = ((_f = (_e = res.data) == null ? void 0 : _e.data) == null ? void 0 : _f.wfrequestexpenseclaimvehicleitems) || [];
            vehiclePaymentContentList.value.forEach((item) => {
              item.total = sumNestedProperties(item, arr);
            });
            arr.forEach((item) => {
              vehiclePaymentContentObj[item] = totalNestedValue(vehiclePaymentContentList.value, item);
            });
          }
          vehiclePaymentContentObj["total"] = itemDatas.value.paymentAmount || 0;
          vehiclePaymentContentList.value.unshift({ ...vehiclePaymentContentObj });
          if (itemDatas.value.receivingBankName) {
            stageTags.value.push(itemDatas.value.receivingBankName);
          }
        });
      };
      const sumNestedProperties = (obj, properties) => {
        return properties.reduce((sum, prop) => sum + (obj[prop] || 0), 0);
      };
      const totalNestedValue = (array, properties) => {
        return array.reduce((accumulator, currentValue) => {
          return accumulator + currentValue[properties];
        }, 0);
      };
      const onReject = () => {
        inputDialogRequired.value = true;
        openInputDialog("打回原因", "请输入打回原因");
      };
      const onApprove = () => {
        inputDialogRequired.value = false;
        openInputDialog("通过原因", "请输入通过原因");
      };
      const openInputDialog = (title, placeholder) => {
        inputDialogTitle.value = title;
        inputDialogPlaceholder.value = placeholder;
        inputDialogRef.value.open();
      };
      const handleInputConfirm = (value, dialogType) => {
        inputDialogValue.value = value;
        inputDialogRef.value.close();
        doSubmitApproval(dialogType);
      };
      const handleInputCancel = () => {
        inputDialogRef.value.close();
        inputDialogValue.value = "";
      };
      const doSubmitApproval = (dialogType) => {
        let params = {
          wfInstanceId: itemDetail.value.wfinstanceId,
          workItemId: itemDetail.value.workItemId,
          approvalComment: inputDialogValue.value,
          annotationComment: "",
          pictureBaseData: "",
          isApproval: dialogType,
          procDefCode: itemDetail.value.procDefCode
          //ZC01和GC01两个类型的可以了
        };
        http.post("/WF/SubmitApproval", params).then((res) => {
          if (res.code === 0) {
            uni.showToast({
              title: "已审批",
              icon: "success"
            });
            setTimeout(() => {
              if (currentType.value === "pending") {
                uni.$emit("refresh-pending");
                uni.$emit("refresh-completed");
              }
              goBack();
            }, 1e3);
          } else {
            uni.showToast({
              title: res.message,
              icon: "none"
            });
          }
        });
      };
      const approvalRecordList = vue.ref([]);
      const getApprovalRecord = () => {
        http.get("/WF/GetApprovalHistory", {
          wfinstanceId: itemDetail.value.wfinstanceId
        }).then((res) => {
          formatAppLog("log", "at pages/detail/qtjf.vue:425", res);
          approvalRecordList.value = res.data || [];
        });
      };
      function computeScrollHeight() {
        try {
          const {
            windowHeight
          } = uni.getSystemInfoSync();
          const inst = vue.getCurrentInstance();
          const q = uni.createSelectorQuery().in(inst == null ? void 0 : inst.proxy);
          q.select(".header-stickt").boundingClientRect((data) => {
            const headerH = (data == null ? void 0 : data.height) || 0;
            const h = Math.max(0, windowHeight - headerH);
            scrollerHeight.value = `${h}px`;
          }).exec();
        } catch (e) {
          scrollerHeight.value = "calc(100vh - 88rpx)";
        }
      }
      vue.onMounted(() => {
        var _a;
        vue.nextTick(() => {
          computeScrollHeight();
        });
        const systemInfo2 = uni.getSystemInfoSync();
        const isIOS = systemInfo2.platform === "ios";
        const isH5 = systemInfo2.platform === "h5" || false;
        if (isIOS && isH5) {
          formatAppLog("log", "at pages/detail/qtjf.vue:460", "检测到 iOS H5 环境，添加滚动修复");
          document.addEventListener("focusout", () => {
            setTimeout(() => {
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: "instant"
              });
            }, 20);
          });
        } else {
          (_a = window.visualViewport) == null ? void 0 : _a.addEventListener("resize", onResize);
          window.addEventListener("resize", onResize);
        }
      });
      function onResize() {
        setTimeout(() => {
          computeScrollHeight();
        }, 100);
      }
      const __returned__ = { statusBarHeight, get eventChannel() {
        return eventChannel;
      }, set eventChannel(v) {
        eventChannel = v;
      }, currentType, currentUrlObj, requestTypeSel, inputDialogRef, inputDialogRequired, inputDialogTitle, inputDialogPlaceholder, inputDialogValue, scrollerHeight, itemDetail, stageTags, pullDownObj, setOptions, getOptions, urlParams, infoRows, goBack, itemDatas, vehiclePaymentContentList, vehiclePaymentContentObj, getFormDataApproval, sumNestedProperties, totalNestedValue, onReject, onApprove, openInputDialog, handleInputConfirm, handleInputCancel, doSubmitApproval, approvalRecordList, getApprovalRecord, computeScrollHeight, onResize, get onLoad() {
        return onLoad;
      }, ref: vue.ref, reactive: vue.reactive, onMounted: vue.onMounted, nextTick: vue.nextTick, getCurrentInstance: vue.getCurrentInstance, computed: vue.computed, get getStorage() {
        return getStorage;
      }, get FUND_USAGE_STATUS() {
        return FUND_USAGE_STATUS;
      }, get PAYMENT_ACCOUNT_INFORMATION() {
        return PAYMENT_ACCOUNT_INFORMATION;
      }, get APPROVAL_RECORD() {
        return APPROVAL_RECORD;
      }, get http() {
        return http;
      }, get formatNumber() {
        return formatNumber;
      }, InputDialog, approvalTimeline };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_nav_bar = resolveEasycom(vue.resolveDynamicComponent("uni-nav-bar"), __easycom_0$4);
    return vue.openBlock(), vue.createElementBlock("view", { class: "detail-page" }, [
      vue.createElementVNode("view", { class: "header-stickt" }, [
        vue.createElementVNode(
          "view",
          {
            class: "status_bar",
            style: vue.normalizeStyle({ height: `${$setup.statusBarHeight * 2}rpx` })
          },
          null,
          4
          /* STYLE */
        ),
        vue.createVNode(_component_uni_nav_bar, { class: "nav-bar-top" }, {
          left: vue.withCtx(() => [
            vue.createElementVNode("view", {
              class: "back-btn",
              onClick: $setup.goBack
            })
          ]),
          right: vue.withCtx(() => [
            vue.createElementVNode("view", { style: { "width": "40rpx" } })
          ]),
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "nav-title" }, "审批详情")
          ]),
          _: 1
          /* STABLE */
        }),
        vue.createElementVNode("view", { class: "hero-card" }, [
          vue.createElementVNode("view", { class: "hero-header" }, [
            vue.createElementVNode("view", { class: "project-name" }, [
              vue.createElementVNode(
                "view",
                { class: "project-name-1" },
                vue.toDisplayString($setup.infoRows[1].value),
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "view",
                { class: "project-name-1" },
                vue.toDisplayString($setup.itemDetail.taskName),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "amount-box" }, [
              vue.createElementVNode("view", { class: "amount-label" }, "申请支付总金额"),
              vue.createElementVNode("view", { class: "amount-value" }, [
                vue.createElementVNode("text", { class: "amount-value-symbol" }, "¥"),
                vue.createElementVNode(
                  "text",
                  { class: "amount-value-number" },
                  vue.toDisplayString($setup.formatNumber($setup.itemDatas.paymentAmount)),
                  1
                  /* TEXT */
                )
              ])
            ])
          ]),
          vue.createElementVNode("view", { class: "hero-tags" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.stageTags, (t2, i) => {
                return vue.openBlock(), vue.createElementBlock(
                  "view",
                  {
                    class: "tag",
                    key: i
                  },
                  vue.toDisplayString(t2),
                  1
                  /* TEXT */
                );
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ]),
          vue.withDirectives(vue.createElementVNode(
            "view",
            { class: "hero-actions" },
            [
              vue.createElementVNode("view", {
                class: "btn outline",
                onClick: $setup.onReject
              }, "打回"),
              vue.createElementVNode("view", {
                class: "btn primary",
                onClick: $setup.onApprove
              }, "通过")
            ],
            512
            /* NEED_PATCH */
          ), [
            [vue.vShow, $setup.currentType === "pending"]
          ])
        ])
      ]),
      vue.createElementVNode("scroll-view", {
        "scroll-y": "true",
        class: "scroller"
      }, [
        vue.createElementVNode("view", { class: "section" }, [
          vue.createElementVNode("view", { class: "section-title" }, [
            vue.createElementVNode("text", { class: "section-title-vertical" }),
            vue.createElementVNode("text", { class: "section-title-text" }, "基本信息")
          ]),
          vue.createElementVNode("view", { class: "info-list" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.infoRows, (row, idx) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: "info-item",
                  key: idx
                }, [
                  vue.createElementVNode(
                    "text",
                    { class: "info-label" },
                    vue.toDisplayString(row.label),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "info-value" },
                    vue.toDisplayString(row.value || "--"),
                    1
                    /* TEXT */
                  )
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            )),
            vue.createElementVNode("view", { class: "info-item" }, [
              vue.createElementVNode("text", { class: "info-label" }, "内容"),
              vue.createElementVNode(
                "text",
                { class: "info-value" },
                vue.toDisplayString($setup.itemDatas.content || "--"),
                1
                /* TEXT */
              )
            ])
          ])
        ]),
        $setup.vehiclePaymentContentList.length > 0 && $setup.itemDatas.requestType != "GnE" ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "section"
        }, [
          vue.createElementVNode("view", {
            class: "section-title-2",
            onClick: _cache[0] || (_cache[0] = ($event) => $setup.setOptions($setup.FUND_USAGE_STATUS))
          }, [
            vue.createElementVNode("view", { class: "section-title-2-left" }, [
              vue.createElementVNode("text", { class: "section-title-vertical" }),
              vue.createElementVNode("text", { class: "section-title-text" }, "用款情况")
            ]),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["section-title-2-right", { "active": $setup.getOptions($setup.FUND_USAGE_STATUS) }])
              },
              null,
              2
              /* CLASS */
            )
          ]),
          vue.createVNode(vue.Transition, { name: "collapse" }, {
            default: vue.withCtx(() => [
              $setup.getOptions($setup.FUND_USAGE_STATUS) ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "usage-details"
              }, [
                vue.createElementVNode("view", { class: "contract-section" }, [
                  $setup.vehiclePaymentContentList.length > 0 && $setup.itemDatas.requestType === "Travel" ? (vue.openBlock(), vue.createElementBlock("scroll-view", {
                    key: 0,
                    "scroll-x": "",
                    class: "table-scroll-x"
                  }, [
                    vue.createElementVNode("table", {
                      cellspacing: "0",
                      cellpadding: "0",
                      class: "table1 table2"
                    }, [
                      vue.createElementVNode("tbody", null, [
                        vue.createElementVNode("tr", null, [
                          vue.createElementVNode(
                            "td",
                            { class: "type font_w sticky-xz-1" },
                            vue.toDisplayString($setup.infoRows[0].value.slice(0, -3)) + "明细",
                            1
                            /* TEXT */
                          ),
                          (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList($setup.vehiclePaymentContentList, (value, index) => {
                              return vue.openBlock(), vue.createElementBlock(
                                "td",
                                {
                                  class: "type font_w text_right",
                                  key: index
                                },
                                vue.toDisplayString(index == 0 ? "合计" : ""),
                                1
                                /* TEXT */
                              );
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ]),
                        vue.createElementVNode("tr", null, [
                          vue.createElementVNode("td", { class: "text sticky-xz-1" }, "报销类目"),
                          (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList($setup.vehiclePaymentContentList, (value, index) => {
                              return vue.openBlock(), vue.createElementBlock(
                                "td",
                                {
                                  class: "info",
                                  key: index
                                },
                                vue.toDisplayString(value.claimCategoryNameLv1 + value.claimCategoryNameLv2 + value.claimCategoryNameLv3 || ""),
                                1
                                /* TEXT */
                              );
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ]),
                        vue.createElementVNode("tr", null, [
                          vue.createElementVNode("td", { class: "text sticky-xz-1" }, "报销内容"),
                          (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList($setup.vehiclePaymentContentList, (value, index) => {
                              return vue.openBlock(), vue.createElementBlock(
                                "td",
                                {
                                  class: "info",
                                  key: index
                                },
                                vue.toDisplayString(value.claimName || ""),
                                1
                                /* TEXT */
                              );
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ]),
                        vue.createElementVNode("tr", null, [
                          vue.createElementVNode("td", { class: "text sticky-xz-1" }, "不含税金额"),
                          (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList($setup.vehiclePaymentContentList, (value, index) => {
                              return vue.openBlock(), vue.createElementBlock(
                                "td",
                                {
                                  class: "info",
                                  key: index
                                },
                                vue.toDisplayString($setup.formatNumber(value.claimItemAmountNet)),
                                1
                                /* TEXT */
                              );
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ]),
                        vue.createElementVNode("tr", null, [
                          vue.createElementVNode("td", { class: "text sticky-xz-1" }, "可抵扣税额"),
                          (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList($setup.vehiclePaymentContentList, (value, index) => {
                              return vue.openBlock(), vue.createElementBlock(
                                "td",
                                {
                                  class: "info",
                                  key: index
                                },
                                vue.toDisplayString($setup.formatNumber(value.claimItemTaxAmount)),
                                1
                                /* TEXT */
                              );
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ]),
                        vue.createElementVNode("tr", null, [
                          vue.createElementVNode("td", { class: "text sticky-xz-1" }, "含税金额"),
                          (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList($setup.vehiclePaymentContentList, (value, index) => {
                              return vue.openBlock(), vue.createElementBlock(
                                "td",
                                {
                                  class: "info",
                                  key: index
                                },
                                vue.toDisplayString($setup.formatNumber(value.claimItemAmountVat)),
                                1
                                /* TEXT */
                              );
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ]),
                        vue.createElementVNode("tr", null, [
                          vue.createElementVNode("td", { class: "text sticky-xz-1" }, "备注"),
                          (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList($setup.vehiclePaymentContentList, (value, index) => {
                              return vue.openBlock(), vue.createElementBlock(
                                "td",
                                {
                                  class: "info",
                                  key: index
                                },
                                vue.toDisplayString(value.remark || ""),
                                1
                                /* TEXT */
                              );
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ])
                      ])
                    ])
                  ])) : vue.createCommentVNode("v-if", true),
                  $setup.vehiclePaymentContentList.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 1,
                    class: "detail-row summary-row"
                  }, [
                    vue.createElementVNode("text", { class: "detail-label summary-label" }, "本次用款小计"),
                    vue.createElementVNode(
                      "text",
                      { class: "detail-value summary-value" },
                      vue.toDisplayString($setup.formatNumber($setup.itemDatas.paymentAmount)),
                      1
                      /* TEXT */
                    )
                  ])) : vue.createCommentVNode("v-if", true)
                ])
              ])) : vue.createCommentVNode("v-if", true)
            ]),
            _: 1
            /* STABLE */
          })
        ])) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("view", { class: "section" }, [
          vue.createElementVNode("view", {
            class: "section-title-2",
            onClick: _cache[1] || (_cache[1] = ($event) => $setup.setOptions($setup.PAYMENT_ACCOUNT_INFORMATION))
          }, [
            vue.createElementVNode("view", { class: "section-title-2-left" }, [
              vue.createElementVNode("text", { class: "section-title-vertical" }),
              vue.createElementVNode("text", { class: "section-title-text" }, "补充信息")
            ]),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["section-title-2-right", { "active": $setup.getOptions($setup.PAYMENT_ACCOUNT_INFORMATION) }])
              },
              null,
              2
              /* CLASS */
            )
          ]),
          vue.createVNode(vue.Transition, { name: "collapse" }, {
            default: vue.withCtx(() => [
              $setup.getOptions($setup.PAYMENT_ACCOUNT_INFORMATION) ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "account-info-section"
              }, [
                vue.createElementVNode("view", { class: "account-card" }, [
                  vue.createElementVNode("view", { class: "account-info-block" }, [
                    vue.createElementVNode("view", { class: "account-info-row" }, [
                      vue.createElementVNode("text", { class: "account-info-label" }, "合同名称"),
                      vue.createElementVNode(
                        "text",
                        { class: "account-info-value" },
                        vue.toDisplayString($setup.itemDatas.relateContractId || ""),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "account-info-row" }, [
                      vue.createElementVNode("text", { class: "account-info-label" }, "合同价/审定价"),
                      vue.createElementVNode(
                        "text",
                        { class: "account-info-value" },
                        vue.toDisplayString($setup.formatNumber($setup.itemDatas.contractAmountVat) || ""),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "account-info-row" }, [
                      vue.createElementVNode("text", { class: "account-info-label" }, "合同累计已付款"),
                      vue.createElementVNode(
                        "text",
                        { class: "account-info-value" },
                        vue.toDisplayString($setup.formatNumber($setup.itemDatas.contractAccumulatedPaid) || ""),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "account-info-row" }, [
                      vue.createElementVNode("text", { class: "account-info-label" }, "发票系统编号"),
                      vue.createElementVNode(
                        "text",
                        { class: "account-info-value" },
                        vue.toDisplayString($setup.itemDatas.invoiceCloudID || ""),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "account-info-row" }, [
                      vue.createElementVNode("text", { class: "account-info-label" }, "普票金额"),
                      vue.createElementVNode(
                        "text",
                        { class: "account-info-value" },
                        vue.toDisplayString($setup.formatNumber($setup.itemDatas.vatoamount) || ""),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "account-info-row" }, [
                      vue.createElementVNode("text", { class: "account-info-label" }, "可抵扣票据"),
                      vue.createElementVNode(
                        "text",
                        { class: "account-info-value" },
                        vue.toDisplayString($setup.formatNumber($setup.itemDatas.invoiceAmountNet) || ""),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "account-info-row" }, [
                      vue.createElementVNode("text", { class: "account-info-label" }, "进项税额"),
                      vue.createElementVNode(
                        "text",
                        { class: "account-info-value" },
                        vue.toDisplayString($setup.formatNumber($setup.itemDatas.invoiceAmountVat) || ""),
                        1
                        /* TEXT */
                      )
                    ])
                  ])
                ])
              ])) : vue.createCommentVNode("v-if", true)
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        vue.createElementVNode("view", { class: "section" }, [
          vue.createElementVNode("view", {
            class: "section-title-2",
            onClick: _cache[2] || (_cache[2] = ($event) => $setup.setOptions($setup.APPROVAL_RECORD))
          }, [
            vue.createElementVNode("view", { class: "section-title-2-left" }, [
              vue.createElementVNode("text", { class: "section-title-vertical" }),
              vue.createElementVNode("text", { class: "section-title-text" }, "审批记录")
            ]),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["section-title-2-right", { "active": $setup.getOptions($setup.APPROVAL_RECORD) }])
              },
              null,
              2
              /* CLASS */
            )
          ]),
          vue.createVNode(vue.Transition, { name: "collapse" }, {
            default: vue.withCtx(() => [
              $setup.getOptions($setup.APPROVAL_RECORD) ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "approval-record-section"
              }, [
                vue.createVNode($setup["approvalTimeline"], { list: $setup.approvalRecordList }, null, 8, ["list"])
              ])) : vue.createCommentVNode("v-if", true)
            ]),
            _: 1
            /* STABLE */
          })
        ])
      ]),
      vue.createVNode($setup["InputDialog"], {
        ref: "inputDialogRef",
        required: $setup.inputDialogRequired,
        title: $setup.inputDialogTitle,
        placeholder: $setup.inputDialogPlaceholder,
        onConfirm: $setup.handleInputConfirm,
        onCancel: $setup.handleInputCancel
      }, null, 8, ["required", "title", "placeholder"])
    ]);
  }
  const PagesDetailQtjf = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__scopeId", "data-v-769befc8"], ["__file", "E:/cityInvestment02/city-Investment/pages/detail/qtjf.vue"]]);
  const _sfc_main$8 = {
    __name: "zcys",
    setup(__props, { expose: __expose }) {
      __expose();
      vue.useCssVars((_ctx) => ({
        "79791cb1-scrollerHeight": scrollerHeight.value
      }));
      const statusBarHeight = vue.ref(0);
      let eventChannel;
      onLoad(() => {
        var _a, _b, _c;
        const h = getStorage("statusBarHeight");
        if (Number(h))
          statusBarHeight.value = Number(h);
        eventChannel = (_c = (_b = (_a = vue.getCurrentInstance()) == null ? void 0 : _a.proxy) == null ? void 0 : _b.getOpenerEventChannel) == null ? void 0 : _c.call(_b);
        eventChannel.on("open-detail", (data) => {
          formatAppLog("log", "at pages/detail/zcys.vue:164", "open-detail", data);
          currentType.value = data.type;
          itemDetail.value = data.order;
          getFormDataApproval();
          getApprovalRecord();
        });
      });
      const currentType = vue.ref("");
      const currentUrlObj = vue.reactive({
        pending: "/WF/GetFormDataApproval",
        completed: "/WF/GetFormDataView"
      });
      const requestTypeSel = vue.reactive({
        "ZC01": ["costVat"]
      });
      const inputDialogRef = vue.ref(null);
      const inputDialogRequired = vue.ref(false);
      const inputDialogTitle = vue.ref("");
      const inputDialogPlaceholder = vue.ref("");
      const inputDialogValue = vue.ref("");
      const scrollerHeight = vue.ref("0px");
      const itemDetail = vue.ref({});
      const stageTags = vue.ref([]);
      const pullDownObj = vue.reactive({
        [FUND_USAGE_STATUS]: true,
        [PAYMENT_ACCOUNT_INFORMATION]: true,
        [APPROVAL_RECORD]: true
      });
      const setOptions = (name) => {
        pullDownObj[name] = pullDownObj[name] ? false : true;
      };
      const getOptions = (name) => {
        return pullDownObj[name];
      };
      const urlParams = vue.computed(() => {
        let params = {
          pending: {
            procCode: itemDetail.value.procDefCode,
            workitemid: itemDetail.value.workItemId
          },
          completed: {
            procCode: itemDetail.value.procDefCode,
            wfInstanceId: itemDetail.value.wfinstanceId
          }
        };
        return params[currentType.value];
      });
      const infoRows = vue.ref([
        {
          label: "合同名称",
          value: "",
          key: "contractName"
        },
        {
          label: "业务类型",
          value: "",
          key: "contractTypeName"
        },
        {
          label: "项目名称/资产名称",
          value: "",
          key: "contractObjectName"
        },
        {
          label: "我方单位",
          value: "",
          key: "myCompanyID"
        },
        {
          label: "对方单位",
          value: "",
          key: "contractRelevantParty"
        },
        {
          label: "预算事项",
          value: "",
          key: "budgetItemName"
        },
        {
          label: "本月预计支出",
          value: "",
          key: "planToPay"
        },
        {
          label: "款项对应开始日期",
          value: "",
          key: "relatedPeriodFrom"
        },
        {
          label: "款项对应结束日期",
          value: "",
          key: "relatedPeriodTo"
        }
      ]);
      const goBack = () => {
        uni.navigateBack();
      };
      const arrs = vue.ref([{
        "id": "286cfd12cd5f45b1ac858752c0d1c67c",
        "referenceBudgetItemId": "fb90ab5183f042f88a471d4720b041d2",
        "itemId": "RegularMaintainenceEvaluate",
        "itemName": "日常养护费-考核",
        "costVat": 1e4,
        "costNet": null,
        "itemLevel": 0,
        "ctroadId": null,
        "roadName": null,
        "seqNo": 0,
        "createdBy": "sybjbro",
        "createdByName": "经办人（运管中心）",
        "createdDate": "2025-11-13 13:14:42",
        "lastModifiedBy": "sybjbro",
        "lastModifiedByName": "经办人（运管中心）",
        "lastModifiedDate": "2025-11-13 13:14:42"
      }]);
      const itemDatas = vue.ref({});
      const paymentContentList = vue.ref([]);
      const paymentContentObj = vue.reactive({});
      const getFormDataApproval = () => {
        http.get(currentUrlObj[currentType.value], urlParams.value).then((res) => {
          var _a;
          let data = ((_a = res.data) == null ? void 0 : _a.data) || {};
          itemDatas.value = (data == null ? void 0 : data.wfrequestexpenseclaim) || {};
          infoRows.value.forEach((item) => {
            item.value = typeof itemDatas.value[item.key] === "number" || item.key === "claimAmount" || item.key === "paymentAmount" ? formatNumber(itemDatas.value[item.key]) : itemDatas.value[item.key] || "";
          });
          let arr = requestTypeSel["ZC01"] || [];
          if (arrs.value.length > 0) {
            paymentContentList.value = arrs.value || [];
            arr.forEach((item) => {
              paymentContentObj[item] = totalNestedValue(paymentContentList.value, item);
            });
          }
          formatAppLog("log", "at pages/detail/zcys.vue:299", "paymentContentObj===>", paymentContentObj);
        });
      };
      const sumNestedProperties = (obj, properties) => {
        return properties.reduce((sum, prop) => sum + (obj[prop] || 0), 0);
      };
      const totalNestedValue = (array, properties) => {
        return array.reduce((accumulator, currentValue) => {
          return accumulator + currentValue[properties];
        }, 0);
      };
      const onReject = () => {
        inputDialogRequired.value = true;
        openInputDialog("打回原因", "请输入打回原因");
      };
      const onApprove = () => {
        inputDialogRequired.value = false;
        openInputDialog("通过原因", "请输入通过原因");
      };
      const openInputDialog = (title, placeholder) => {
        inputDialogTitle.value = title;
        inputDialogPlaceholder.value = placeholder;
        inputDialogRef.value.open();
      };
      const handleInputConfirm = (value, dialogType) => {
        inputDialogValue.value = value;
        inputDialogRef.value.close();
        doSubmitApproval(dialogType);
      };
      const handleInputCancel = () => {
        inputDialogRef.value.close();
        inputDialogValue.value = "";
      };
      const doSubmitApproval = (dialogType) => {
        let params = {
          wfInstanceId: itemDetail.value.wfinstanceId,
          workItemId: itemDetail.value.workItemId,
          approvalComment: inputDialogValue.value,
          annotationComment: "",
          pictureBaseData: "",
          isApproval: dialogType,
          procDefCode: itemDetail.value.procDefCode
          //ZC01和GC01两个类型的可以了
        };
        http.post("/WF/SubmitApproval", params).then((res) => {
          if (res.code === 0) {
            uni.showToast({
              title: "已审批",
              icon: "success"
            });
            setTimeout(() => {
              if (currentType.value === "pending") {
                uni.$emit("refresh-pending");
                uni.$emit("refresh-completed");
              }
              goBack();
            }, 1e3);
          } else {
            uni.showToast({
              title: res.message,
              icon: "none"
            });
          }
        });
      };
      const approvalRecordList = vue.ref([]);
      const getApprovalRecord = () => {
        http.get("/WF/GetApprovalHistory", {
          wfinstanceId: itemDetail.value.wfinstanceId
        }).then((res) => {
          formatAppLog("log", "at pages/detail/zcys.vue:377", res);
          approvalRecordList.value = res.data || [];
        });
      };
      function computeScrollHeight() {
        try {
          const {
            windowHeight
          } = uni.getSystemInfoSync();
          const inst = vue.getCurrentInstance();
          const q = uni.createSelectorQuery().in(inst == null ? void 0 : inst.proxy);
          q.select(".header-stickt").boundingClientRect((data) => {
            const headerH = (data == null ? void 0 : data.height) || 0;
            const h = Math.max(0, windowHeight - headerH);
            scrollerHeight.value = `${h}px`;
          }).exec();
        } catch (e) {
          scrollerHeight.value = "calc(100vh - 88rpx)";
        }
      }
      vue.onMounted(() => {
        var _a;
        vue.nextTick(() => {
          computeScrollHeight();
        });
        const systemInfo2 = uni.getSystemInfoSync();
        const isIOS = systemInfo2.platform === "ios";
        const isH5 = systemInfo2.platform === "h5" || false;
        if (isIOS && isH5) {
          formatAppLog("log", "at pages/detail/zcys.vue:412", "检测到 iOS H5 环境，添加滚动修复");
          document.addEventListener("focusout", () => {
            setTimeout(() => {
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: "instant"
              });
            }, 20);
          });
        } else {
          (_a = window.visualViewport) == null ? void 0 : _a.addEventListener("resize", onResize);
          window.addEventListener("resize", onResize);
        }
      });
      function onResize() {
        setTimeout(() => {
          computeScrollHeight();
        }, 100);
      }
      const __returned__ = { statusBarHeight, get eventChannel() {
        return eventChannel;
      }, set eventChannel(v) {
        eventChannel = v;
      }, currentType, currentUrlObj, requestTypeSel, inputDialogRef, inputDialogRequired, inputDialogTitle, inputDialogPlaceholder, inputDialogValue, scrollerHeight, itemDetail, stageTags, pullDownObj, setOptions, getOptions, urlParams, infoRows, goBack, arrs, itemDatas, paymentContentList, paymentContentObj, getFormDataApproval, sumNestedProperties, totalNestedValue, onReject, onApprove, openInputDialog, handleInputConfirm, handleInputCancel, doSubmitApproval, approvalRecordList, getApprovalRecord, computeScrollHeight, onResize, get onLoad() {
        return onLoad;
      }, ref: vue.ref, reactive: vue.reactive, onMounted: vue.onMounted, nextTick: vue.nextTick, getCurrentInstance: vue.getCurrentInstance, computed: vue.computed, get getStorage() {
        return getStorage;
      }, get FUND_USAGE_STATUS() {
        return FUND_USAGE_STATUS;
      }, get PAYMENT_ACCOUNT_INFORMATION() {
        return PAYMENT_ACCOUNT_INFORMATION;
      }, get APPROVAL_RECORD() {
        return APPROVAL_RECORD;
      }, get http() {
        return http;
      }, get formatNumber() {
        return formatNumber;
      }, InputDialog, approvalTimeline };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_nav_bar = resolveEasycom(vue.resolveDynamicComponent("uni-nav-bar"), __easycom_0$4);
    return vue.openBlock(), vue.createElementBlock("view", { class: "detail-page" }, [
      vue.createElementVNode("view", { class: "header-stickt" }, [
        vue.createElementVNode(
          "view",
          {
            class: "status_bar",
            style: vue.normalizeStyle({ height: `${$setup.statusBarHeight * 2}rpx` })
          },
          null,
          4
          /* STYLE */
        ),
        vue.createVNode(_component_uni_nav_bar, { class: "nav-bar-top" }, {
          left: vue.withCtx(() => [
            vue.createElementVNode("view", {
              class: "back-btn",
              onClick: $setup.goBack
            })
          ]),
          right: vue.withCtx(() => [
            vue.createElementVNode("view", { style: { "width": "40rpx" } })
          ]),
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "nav-title" }, "审批详情")
          ]),
          _: 1
          /* STABLE */
        }),
        vue.createElementVNode("view", { class: "hero-card" }, [
          vue.createElementVNode("view", { class: "hero-header" }, [
            vue.createElementVNode("view", { class: "project-name" }, [
              vue.createElementVNode(
                "view",
                { class: "project-name-1" },
                vue.toDisplayString($setup.infoRows[1].value),
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "view",
                { class: "project-name-1" },
                vue.toDisplayString($setup.itemDetail.taskName),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "amount-box" }, [
              vue.createElementVNode("view", { class: "amount-label" }, "申请支付总金额"),
              vue.createElementVNode("view", { class: "amount-value" }, [
                vue.createElementVNode("text", { class: "amount-value-symbol" }, "¥"),
                vue.createElementVNode(
                  "text",
                  { class: "amount-value-number" },
                  vue.toDisplayString($setup.formatNumber($setup.itemDatas.paymentAmount)),
                  1
                  /* TEXT */
                )
              ])
            ])
          ]),
          vue.createElementVNode("view", { class: "hero-tags" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.stageTags, (t2, i) => {
                return vue.openBlock(), vue.createElementBlock(
                  "view",
                  {
                    class: "tag",
                    key: i
                  },
                  vue.toDisplayString(t2),
                  1
                  /* TEXT */
                );
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ]),
          vue.withDirectives(vue.createElementVNode(
            "view",
            { class: "hero-actions" },
            [
              vue.createElementVNode("view", {
                class: "btn outline",
                onClick: $setup.onReject
              }, "打回"),
              vue.createElementVNode("view", {
                class: "btn primary",
                onClick: $setup.onApprove
              }, "通过")
            ],
            512
            /* NEED_PATCH */
          ), [
            [vue.vShow, $setup.currentType === "pending"]
          ])
        ])
      ]),
      vue.createElementVNode("scroll-view", {
        "scroll-y": "true",
        class: "scroller"
      }, [
        vue.createElementVNode("view", { class: "section" }, [
          vue.createElementVNode("view", { class: "section-title" }, [
            vue.createElementVNode("text", { class: "section-title-vertical" }),
            vue.createElementVNode("text", { class: "section-title-text" }, "基本信息")
          ]),
          vue.createElementVNode("view", { class: "info-list" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.infoRows, (row, idx) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: "info-item",
                  key: idx
                }, [
                  vue.createElementVNode(
                    "text",
                    { class: "info-label" },
                    vue.toDisplayString(row.label),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "info-value" },
                    vue.toDisplayString(row.value || "--"),
                    1
                    /* TEXT */
                  )
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            )),
            vue.createElementVNode("view", { class: "info-item" }, [
              vue.createElementVNode("text", { class: "info-label" }, "内容"),
              vue.createElementVNode(
                "text",
                { class: "info-value" },
                vue.toDisplayString($setup.itemDatas.content || "--"),
                1
                /* TEXT */
              )
            ])
          ])
        ]),
        $setup.paymentContentList.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "section"
        }, [
          vue.createElementVNode("view", {
            class: "section-title-2",
            onClick: _cache[0] || (_cache[0] = ($event) => $setup.setOptions($setup.FUND_USAGE_STATUS))
          }, [
            vue.createElementVNode("view", { class: "section-title-2-left" }, [
              vue.createElementVNode("text", { class: "section-title-vertical" }),
              vue.createElementVNode("text", { class: "section-title-text" }, "费用组成")
            ]),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["section-title-2-right", { "active": $setup.getOptions($setup.FUND_USAGE_STATUS) }])
              },
              null,
              2
              /* CLASS */
            )
          ]),
          vue.createVNode(vue.Transition, { name: "collapse" }, {
            default: vue.withCtx(() => [
              $setup.getOptions($setup.FUND_USAGE_STATUS) ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "usage-details"
              }, [
                vue.createElementVNode("view", { class: "contract-section" }, [
                  $setup.paymentContentList.length > 0 ? (vue.openBlock(), vue.createElementBlock("scroll-view", {
                    key: 0,
                    "scroll-x": "",
                    class: "table-scroll-x"
                  }, [
                    vue.createElementVNode("table", {
                      cellspacing: "0",
                      cellpadding: "0",
                      class: "table1 table2"
                    }, [
                      vue.createElementVNode("tbody", null, [
                        vue.createElementVNode("tr", null, [
                          vue.createElementVNode("td", { class: "type font_w sticky-xz-1" }, "费用类目"),
                          vue.createElementVNode("td", { class: "type font_w text_right" }, " 金额 ")
                        ]),
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList($setup.paymentContentList, (value, index) => {
                            return vue.openBlock(), vue.createElementBlock("tr", { key: index }, [
                              vue.createElementVNode(
                                "td",
                                { class: "text sticky-xz-1" },
                                vue.toDisplayString(value.itemName || ""),
                                1
                                /* TEXT */
                              ),
                              vue.createElementVNode(
                                "td",
                                { class: "info" },
                                vue.toDisplayString($setup.formatNumber(value.costVat)),
                                1
                                /* TEXT */
                              )
                            ]);
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ])
                    ])
                  ])) : vue.createCommentVNode("v-if", true),
                  $setup.paymentContentList.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 1,
                    class: "detail-row summary-row"
                  }, [
                    vue.createElementVNode("text", { class: "detail-label summary-label" }, "本次用款小计"),
                    vue.createElementVNode(
                      "text",
                      { class: "detail-value summary-value" },
                      vue.toDisplayString($setup.formatNumber($setup.paymentContentObj.costVat)),
                      1
                      /* TEXT */
                    )
                  ])) : vue.createCommentVNode("v-if", true)
                ])
              ])) : vue.createCommentVNode("v-if", true)
            ]),
            _: 1
            /* STABLE */
          })
        ])) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("view", { class: "section" }, [
          vue.createElementVNode("view", {
            class: "section-title-2",
            onClick: _cache[1] || (_cache[1] = ($event) => $setup.setOptions($setup.APPROVAL_RECORD))
          }, [
            vue.createElementVNode("view", { class: "section-title-2-left" }, [
              vue.createElementVNode("text", { class: "section-title-vertical" }),
              vue.createElementVNode("text", { class: "section-title-text" }, "审批记录")
            ]),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["section-title-2-right", { "active": $setup.getOptions($setup.APPROVAL_RECORD) }])
              },
              null,
              2
              /* CLASS */
            )
          ]),
          vue.createVNode(vue.Transition, { name: "collapse" }, {
            default: vue.withCtx(() => [
              $setup.getOptions($setup.APPROVAL_RECORD) ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "approval-record-section"
              }, [
                vue.createVNode($setup["approvalTimeline"], { list: $setup.approvalRecordList }, null, 8, ["list"])
              ])) : vue.createCommentVNode("v-if", true)
            ]),
            _: 1
            /* STABLE */
          })
        ])
      ]),
      vue.createVNode($setup["InputDialog"], {
        ref: "inputDialogRef",
        required: $setup.inputDialogRequired,
        title: $setup.inputDialogTitle,
        placeholder: $setup.inputDialogPlaceholder,
        onConfirm: $setup.handleInputConfirm,
        onCancel: $setup.handleInputCancel
      }, null, 8, ["required", "title", "placeholder"])
    ]);
  }
  const PagesDetailZcys = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__scopeId", "data-v-79791cb1"], ["__file", "E:/cityInvestment02/city-Investment/pages/detail/zcys.vue"]]);
  const _sfc_main$7 = {
    __name: "srqr",
    setup(__props, { expose: __expose }) {
      __expose();
      vue.useCssVars((_ctx) => ({
        "03c61176-scrollerHeight": scrollerHeight.value
      }));
      const statusBarHeight = vue.ref(0);
      let eventChannel;
      onLoad(() => {
        var _a, _b, _c;
        const h = getStorage("statusBarHeight");
        if (Number(h))
          statusBarHeight.value = Number(h);
        eventChannel = (_c = (_b = (_a = vue.getCurrentInstance()) == null ? void 0 : _a.proxy) == null ? void 0 : _b.getOpenerEventChannel) == null ? void 0 : _c.call(_b);
        eventChannel.on("open-detail", (data) => {
          formatAppLog("log", "at pages/detail/srqr.vue:182", "open-detail", data);
          currentType.value = data.type;
          itemDetail.value = data.order;
          getFormDataApproval();
          getApprovalRecord();
        });
      });
      const currentType = vue.ref("");
      const currentUrlObj = vue.reactive({
        pending: "/WF/GetFormDataApproval",
        completed: "/WF/GetFormDataView"
      });
      const inputDialogRef = vue.ref(null);
      const inputDialogRequired = vue.ref(false);
      const inputDialogTitle = vue.ref("");
      const inputDialogPlaceholder = vue.ref("");
      const inputDialogValue = vue.ref("");
      const scrollerHeight = vue.ref("0px");
      const itemDetail = vue.ref({});
      const stageTags = vue.ref([]);
      const wfstatusText = vue.computed(() => {
        return itemDatas.value.wfstatus == "Running" ? "流转中" : itemDatas.value.wfstatus == "Completed" ? "已审批" : "";
      });
      const attachmentData = vue.ref([]);
      const pullDownObj = vue.reactive({
        [FUND_USAGE_STATUS]: true,
        [APPROVAL_RECORD]: true,
        [PAYMENT_ACCOUNT_INFORMATION]: true,
        [ATTACHMENT_LIST]: true
      });
      const setOptions = (name) => {
        pullDownObj[name] = pullDownObj[name] ? false : true;
      };
      const getOptions = (name) => {
        return pullDownObj[name];
      };
      const urlParams = vue.computed(() => {
        let params = {
          pending: {
            procCode: itemDetail.value.procDefCode,
            workitemid: itemDetail.value.workItemId
          },
          completed: {
            procCode: itemDetail.value.procDefCode,
            wfInstanceId: itemDetail.value.wfinstanceId
          }
        };
        return params[currentType.value];
      });
      const infoRows = vue.ref([
        {
          label: "类型",
          value: "",
          key: "requestType"
        },
        {
          label: "合同名称",
          value: "",
          key: "contractName"
        },
        {
          label: "合同子项",
          value: "",
          key: "contractItem"
        },
        {
          label: "合同金额 (含税)",
          value: "",
          key: "contractAmountVat"
        },
        {
          label: "内容",
          value: "",
          key: "content"
        }
      ]);
      const infoRows2 = vue.ref([
        {
          label: "本期确认金额（含税）",
          value: "",
          key: "confirmedIncomeAmountVat"
        },
        {
          label: "本期确认金额（不含税）",
          value: "",
          key: "confirmedIncomeAmountNet"
        },
        {
          label: "增值税税额",
          value: "",
          key: "confirmedIncomeTaxAmount"
        },
        {
          label: "累计确认金额 (含税)",
          value: "",
          key: "accuredConfirmedIncomeAmountVat"
        },
        {
          label: "确认日期",
          value: "",
          key: "confirmedDate"
        },
        {
          label: "本期收入量占比同比",
          value: "",
          key: "contractRatio"
        },
        {
          label: "确认依据",
          value: "",
          key: "remark"
        }
      ]);
      const infoRows3 = vue.ref([
        {
          label: "开票单位",
          value: "",
          key: "receiverCompany"
        },
        {
          label: "付款单位",
          value: "",
          key: "paymentAccountName"
        },
        {
          label: "申请开票分类",
          value: "",
          key: "invoiceType"
        },
        {
          label: "开户行",
          value: "",
          key: "paymentBankName"
        },
        {
          label: "账号",
          value: "",
          key: "paymentAccountNumber"
        },
        {
          label: "税号",
          value: "",
          key: "paymentTaxNumber"
        },
        {
          label: "地址",
          value: "",
          key: "registrationAddress"
        },
        {
          label: "电话",
          value: "",
          key: "registrationPhone"
        },
        {
          label: "发票含税金额",
          value: "",
          key: "planToReceive"
        },
        {
          label: "款项是否已经到账",
          value: "",
          key: "isAlreadyReceived"
        },
        {
          label: "开票备注",
          value: "",
          key: "invoiceAmount"
        }
      ]);
      const infoRows2Flag = vue.ref(["remainFundExcludeCurrent", "remainAccountFundExcludeCurrent", "planToPay", "planToPayTotal", "occBudgetAmount", "availableBudgetAmount"]);
      function goBack() {
        uni.navigateBack();
      }
      const itemDatas = vue.ref({});
      const requestTypeObj = vue.reactive({
        "IncomeConfirm": "收入确认",
        "Invoicing": "申请开票"
      });
      const getFormDataApproval = () => {
        http.get(currentUrlObj[currentType.value], urlParams.value).then((res) => {
          var _a, _b;
          let data = ((_a = res.data) == null ? void 0 : _a.data) || {};
          itemDatas.value = data || {};
          infoRows.value.forEach((item) => {
            item.value = typeof itemDatas.value[item.key] === "number" ? formatNumber(itemDatas.value[item.key]) : itemDatas.value[item.key];
            if (item.key == "requestType" && itemDatas.value[item.key]) {
              let text = "";
              itemDatas.value[item.key].split("|").forEach((item2) => {
                text += requestTypeObj[item2] + "、";
              });
              item.value = text.slice(0, -1) || "";
            }
          });
          infoRows2.value.forEach((item) => {
            item.value = typeof itemDatas.value[item.key] === "number" && item.key != "contractRatio" ? formatNumber(itemDatas.value[item.key]) : itemDatas.value[item.key];
            if (item.key == "contractRatio") {
              item.value = itemDatas.value[item.key] + "%" || "";
            }
            if (item.key == "confirmedDate") {
              item.value = formatDateTimeMinute(itemDatas.value[item.key]) || "";
            }
          });
          infoRows3.value.forEach((item) => {
            item.value = typeof itemDatas.value[item.key] === "number" && item.key != "isAlreadyReceived" ? formatNumber(itemDatas.value[item.key]) : itemDatas.value[item.key];
            if (item.key == "isAlreadyReceived" && [0, 1].includes(itemDatas.value[item.key])) {
              item.value = itemDatas.value[item.key] == 0 ? "否" : "是";
            }
          });
          if (infoRows.value[0].value) {
            stageTags.value.push(infoRows.value[0].value);
          }
          let arr1 = (((_b = itemDatas.value) == null ? void 0 : _b.attachmentList) || []).map((item) => {
            return {
              fileTagName: item.fileTagName,
              fileName: item.fileName,
              fileUrl: item.fileUrl,
              id: item.attachmentId
            };
          });
          attachmentData.value = [{ fileTagName: "合同", children: [] }, { fileTagName: "合同要求其他资料", children: [] }, { fileTagName: "其他", children: [] }];
          const attachmentMap = /* @__PURE__ */ new Map();
          attachmentData.value.forEach((item) => {
            attachmentMap.set(item.fileTagName, item);
          });
          arr1.forEach((childItem) => {
            const parent = attachmentMap.get(childItem.fileTagName);
            if (parent) {
              parent.children.push(childItem);
            }
          });
        });
      };
      const onReject = () => {
        inputDialogRequired.value = true;
        openInputDialog("打回原因", "请输入打回原因");
      };
      const onApprove = () => {
        inputDialogRequired.value = false;
        openInputDialog("通过原因", "请输入通过原因");
      };
      const openInputDialog = (title, placeholder) => {
        inputDialogTitle.value = title;
        inputDialogPlaceholder.value = placeholder;
        inputDialogRef.value.open();
      };
      const handleInputConfirm = (value, dialogType) => {
        inputDialogValue.value = value;
        inputDialogRef.value.close();
        doSubmitApproval(dialogType);
      };
      const handleInputCancel = () => {
        inputDialogRef.value.close();
        inputDialogValue.value = "";
      };
      const doSubmitApproval = (dialogType) => {
        let params = {
          wfInstanceId: itemDetail.value.wfinstanceId,
          workItemId: itemDetail.value.workItemId,
          approvalComment: inputDialogValue.value,
          annotationComment: "",
          pictureBaseData: "",
          isApproval: dialogType,
          procDefCode: itemDetail.value.procDefCode
          //ZC01和GC01两个类型的可以了
        };
        http.post("/WF/SubmitApproval", params).then((res) => {
          if (res.code === 0) {
            uni.showToast({
              title: "已审批",
              icon: "success"
            });
            setTimeout(() => {
              if (currentType.value === "pending") {
                uni.$emit("refresh-pending");
                uni.$emit("refresh-completed");
              }
              goBack();
            }, 1e3);
          } else {
            uni.showToast({
              title: res.message,
              icon: "none"
            });
          }
        });
      };
      const approvalRecordList = vue.ref([]);
      const getApprovalRecord = () => {
        http.get("/WF/GetApprovalHistory", {
          wfinstanceId: itemDetail.value.wfinstanceId
        }).then((res) => {
          formatAppLog("log", "at pages/detail/srqr.vue:471", res);
          approvalRecordList.value = res.data || [];
        });
      };
      function computeScrollHeight() {
        try {
          const {
            windowHeight
          } = uni.getSystemInfoSync();
          const inst = vue.getCurrentInstance();
          const q = uni.createSelectorQuery().in(inst == null ? void 0 : inst.proxy);
          q.select(".header-stickt").boundingClientRect((data) => {
            const headerH = (data == null ? void 0 : data.height) || 0;
            const h = Math.max(0, windowHeight - headerH);
            scrollerHeight.value = `${h}px`;
          }).exec();
        } catch (e) {
          scrollerHeight.value = "calc(100vh - 88rpx)";
        }
      }
      vue.onMounted(() => {
        var _a;
        vue.nextTick(() => {
          computeScrollHeight();
        });
        const systemInfo2 = uni.getSystemInfoSync();
        const isIOS = systemInfo2.platform === "ios";
        const isH5 = systemInfo2.platform === "h5" || false;
        if (isIOS && isH5) {
          formatAppLog("log", "at pages/detail/srqr.vue:507", "检测到 iOS H5 环境，添加滚动修复");
          document.addEventListener("focusout", () => {
            setTimeout(() => {
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: "instant"
              });
            }, 20);
          });
        } else {
          (_a = window.visualViewport) == null ? void 0 : _a.addEventListener("resize", onResize);
          window.addEventListener("resize", onResize);
        }
      });
      function onResize() {
        setTimeout(() => {
          computeScrollHeight();
        }, 100);
      }
      const __returned__ = { statusBarHeight, get eventChannel() {
        return eventChannel;
      }, set eventChannel(v) {
        eventChannel = v;
      }, currentType, currentUrlObj, inputDialogRef, inputDialogRequired, inputDialogTitle, inputDialogPlaceholder, inputDialogValue, scrollerHeight, itemDetail, stageTags, wfstatusText, attachmentData, pullDownObj, setOptions, getOptions, urlParams, infoRows, infoRows2, infoRows3, infoRows2Flag, goBack, itemDatas, requestTypeObj, getFormDataApproval, onReject, onApprove, openInputDialog, handleInputConfirm, handleInputCancel, doSubmitApproval, approvalRecordList, getApprovalRecord, computeScrollHeight, onResize, get onLoad() {
        return onLoad;
      }, ref: vue.ref, reactive: vue.reactive, onMounted: vue.onMounted, nextTick: vue.nextTick, getCurrentInstance: vue.getCurrentInstance, computed: vue.computed, get getStorage() {
        return getStorage;
      }, get FUND_USAGE_STATUS() {
        return FUND_USAGE_STATUS;
      }, get APPROVAL_RECORD() {
        return APPROVAL_RECORD;
      }, get PAYMENT_ACCOUNT_INFORMATION() {
        return PAYMENT_ACCOUNT_INFORMATION;
      }, get ATTACHMENT_LIST() {
        return ATTACHMENT_LIST;
      }, get http() {
        return http;
      }, get formatNumber() {
        return formatNumber;
      }, get formatDateTimeMinute() {
        return formatDateTimeMinute;
      }, InputDialog, approvalTimeline, attachmentList };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_nav_bar = resolveEasycom(vue.resolveDynamicComponent("uni-nav-bar"), __easycom_0$4);
    return vue.openBlock(), vue.createElementBlock("view", { class: "detail-page" }, [
      vue.createElementVNode("view", { class: "header-stickt" }, [
        vue.createElementVNode(
          "view",
          {
            class: "status_bar",
            style: vue.normalizeStyle({ height: `${$setup.statusBarHeight * 2}rpx` })
          },
          null,
          4
          /* STYLE */
        ),
        vue.createVNode(_component_uni_nav_bar, { class: "nav-bar-top" }, {
          left: vue.withCtx(() => [
            vue.createElementVNode("view", {
              class: "back-btn",
              onClick: $setup.goBack
            })
          ]),
          right: vue.withCtx(() => [
            vue.createElementVNode("view", { style: { "width": "40rpx" } })
          ]),
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "nav-title" }, "审批详情")
          ]),
          _: 1
          /* STABLE */
        }),
        vue.createElementVNode("view", { class: "hero-card" }, [
          vue.createElementVNode("view", { class: "hero-header" }, [
            vue.createElementVNode("view", { class: "project-name" }, [
              vue.createElementVNode(
                "view",
                { class: "project-name-1" },
                vue.toDisplayString($setup.itemDetail.taskName),
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "view",
                { class: "project-name-1" },
                vue.toDisplayString($setup.itemDatas.contractName),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "amount-box" }, [
              vue.createElementVNode("view", { class: "amount-label" }, "申请支付总金额"),
              vue.createElementVNode("view", { class: "amount-value" }, [
                vue.createElementVNode("text", { class: "amount-value-symbol" }, "¥"),
                vue.createElementVNode(
                  "text",
                  { class: "amount-value-number" },
                  vue.toDisplayString($setup.formatNumber($setup.itemDatas.planToPay)),
                  1
                  /* TEXT */
                )
              ])
            ])
          ]),
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["hero-tags", { "hero-tags-width": $setup.currentType != "pending" }])
            },
            [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($setup.stageTags, (t2, i) => {
                  return vue.openBlock(), vue.createElementBlock(
                    "view",
                    {
                      class: "tag",
                      key: i
                    },
                    vue.toDisplayString(t2),
                    1
                    /* TEXT */
                  );
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ],
            2
            /* CLASS */
          ),
          vue.withDirectives(vue.createElementVNode(
            "view",
            { class: "hero-actions" },
            [
              vue.createElementVNode("view", {
                class: "btn outline",
                onClick: $setup.onReject
              }, "打回"),
              vue.createElementVNode("view", {
                class: "btn primary",
                onClick: $setup.onApprove
              }, "通过")
            ],
            512
            /* NEED_PATCH */
          ), [
            [vue.vShow, $setup.currentType === "pending"]
          ]),
          vue.withDirectives(vue.createElementVNode(
            "view",
            { class: "wfstatus-actions" },
            vue.toDisplayString($setup.wfstatusText),
            513
            /* TEXT, NEED_PATCH */
          ), [
            [vue.vShow, $setup.currentType === "completed" && ($setup.itemDatas.wfstatus == "Running" || $setup.itemDatas.wfstatus == "Completed")]
          ])
        ])
      ]),
      vue.createElementVNode("scroll-view", {
        "scroll-y": "true",
        class: "scroller"
      }, [
        vue.createElementVNode("view", { class: "section" }, [
          vue.createElementVNode("view", { class: "section-title" }, [
            vue.createElementVNode("text", { class: "section-title-vertical" }),
            vue.createElementVNode("text", { class: "section-title-text" }, "基本信息")
          ]),
          vue.createElementVNode("view", { class: "info-list" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.infoRows, (row, idx) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: "info-item",
                  key: idx
                }, [
                  vue.createElementVNode(
                    "text",
                    { class: "info-label" },
                    vue.toDisplayString(row.label),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "info-value" },
                    vue.toDisplayString(row.value || "--"),
                    1
                    /* TEXT */
                  )
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ]),
        $setup.infoRows[0].value.includes("收入确认") ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "section"
        }, [
          vue.createElementVNode("view", {
            class: "section-title-2",
            onClick: _cache[0] || (_cache[0] = ($event) => $setup.setOptions($setup.FUND_USAGE_STATUS))
          }, [
            vue.createElementVNode("view", { class: "section-title-2-left" }, [
              vue.createElementVNode("text", { class: "section-title-vertical" }),
              vue.createElementVNode("text", { class: "section-title-text" }, "收入确认")
            ]),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["section-title-2-right", { "active": $setup.getOptions($setup.FUND_USAGE_STATUS) }])
              },
              null,
              2
              /* CLASS */
            )
          ]),
          vue.createVNode(vue.Transition, { name: "collapse" }, {
            default: vue.withCtx(() => [
              $setup.getOptions($setup.FUND_USAGE_STATUS) ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "info-list"
              }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($setup.infoRows2, (row, idx) => {
                    return vue.openBlock(), vue.createElementBlock(
                      "view",
                      {
                        class: vue.normalizeClass(["info-item", { "info-item-border": row.key === "remainAccountFundExcludeCurrent" || row.key === "availableBudgetAmount" }]),
                        key: idx
                      },
                      [
                        vue.createElementVNode(
                          "text",
                          {
                            class: vue.normalizeClass(["info-label", { "info-label-width": row.key === "projectTopicName" }])
                          },
                          vue.toDisplayString(row.label),
                          3
                          /* TEXT, CLASS */
                        ),
                        vue.createElementVNode(
                          "text",
                          { class: "info-value" },
                          vue.toDisplayString(row.value || "--"),
                          1
                          /* TEXT */
                        )
                      ],
                      2
                      /* CLASS */
                    );
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])) : vue.createCommentVNode("v-if", true)
            ]),
            _: 1
            /* STABLE */
          })
        ])) : vue.createCommentVNode("v-if", true),
        $setup.infoRows[0].value.includes("申请开票") ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: "section"
        }, [
          vue.createElementVNode("view", {
            class: "section-title-2",
            onClick: _cache[1] || (_cache[1] = ($event) => $setup.setOptions($setup.PAYMENT_ACCOUNT_INFORMATION))
          }, [
            vue.createElementVNode("view", { class: "section-title-2-left" }, [
              vue.createElementVNode("text", { class: "section-title-vertical" }),
              vue.createElementVNode("text", { class: "section-title-text" }, "申请开票")
            ]),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["section-title-2-right", { "active": $setup.getOptions($setup.PAYMENT_ACCOUNT_INFORMATION) }])
              },
              null,
              2
              /* CLASS */
            )
          ]),
          vue.createVNode(vue.Transition, { name: "collapse" }, {
            default: vue.withCtx(() => [
              $setup.getOptions($setup.PAYMENT_ACCOUNT_INFORMATION) ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "info-list"
              }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($setup.infoRows3, (row, idx) => {
                    return vue.openBlock(), vue.createElementBlock(
                      "view",
                      {
                        class: vue.normalizeClass(["info-item", { "info-item-border": row.key === "remainAccountFundExcludeCurrent" || row.key === "availableBudgetAmount" }]),
                        key: idx
                      },
                      [
                        vue.createElementVNode(
                          "text",
                          {
                            class: vue.normalizeClass(["info-label", { "info-label-width": row.key === "projectTopicName" }])
                          },
                          vue.toDisplayString(row.label),
                          3
                          /* TEXT, CLASS */
                        ),
                        vue.createElementVNode(
                          "text",
                          { class: "info-value" },
                          vue.toDisplayString(row.value || "--"),
                          1
                          /* TEXT */
                        )
                      ],
                      2
                      /* CLASS */
                    );
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])) : vue.createCommentVNode("v-if", true)
            ]),
            _: 1
            /* STABLE */
          })
        ])) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("view", { class: "section" }, [
          vue.createElementVNode("view", {
            class: "section-title-2",
            onClick: _cache[2] || (_cache[2] = ($event) => $setup.setOptions($setup.ATTACHMENT_LIST))
          }, [
            vue.createElementVNode("view", { class: "section-title-2-left" }, [
              vue.createElementVNode("text", { class: "section-title-vertical" }),
              vue.createElementVNode("text", { class: "section-title-text" }, "附件")
            ]),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["section-title-2-right", { "active": $setup.getOptions($setup.ATTACHMENT_LIST) }])
              },
              null,
              2
              /* CLASS */
            )
          ]),
          vue.createVNode(vue.Transition, { name: "collapse" }, {
            default: vue.withCtx(() => [
              $setup.getOptions($setup.ATTACHMENT_LIST) ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "attachment-section"
              }, [
                vue.createVNode($setup["attachmentList"], { list: $setup.attachmentData }, null, 8, ["list"])
              ])) : vue.createCommentVNode("v-if", true)
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        vue.createElementVNode("view", { class: "section" }, [
          vue.createElementVNode("view", {
            class: "section-title-2",
            onClick: _cache[3] || (_cache[3] = ($event) => $setup.setOptions($setup.APPROVAL_RECORD))
          }, [
            vue.createElementVNode("view", { class: "section-title-2-left" }, [
              vue.createElementVNode("text", { class: "section-title-vertical" }),
              vue.createElementVNode("text", { class: "section-title-text" }, "审批记录")
            ]),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["section-title-2-right", { "active": $setup.getOptions($setup.APPROVAL_RECORD) }])
              },
              null,
              2
              /* CLASS */
            )
          ]),
          vue.createVNode(vue.Transition, { name: "collapse" }, {
            default: vue.withCtx(() => [
              $setup.getOptions($setup.APPROVAL_RECORD) ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "approval-record-section"
              }, [
                vue.createVNode($setup["approvalTimeline"], { list: $setup.approvalRecordList }, null, 8, ["list"])
              ])) : vue.createCommentVNode("v-if", true)
            ]),
            _: 1
            /* STABLE */
          })
        ])
      ]),
      vue.createVNode($setup["InputDialog"], {
        ref: "inputDialogRef",
        required: $setup.inputDialogRequired,
        title: $setup.inputDialogTitle,
        placeholder: $setup.inputDialogPlaceholder,
        onConfirm: $setup.handleInputConfirm,
        onCancel: $setup.handleInputCancel
      }, null, 8, ["required", "title", "placeholder"])
    ]);
  }
  const PagesDetailSrqr = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__scopeId", "data-v-03c61176"], ["__file", "E:/cityInvestment02/city-Investment/pages/detail/srqr.vue"]]);
  class CanvasControl {
    constructor(options, _this) {
      __publicField(this, "drawCount", 0);
      //次数
      __publicField(this, "ctx", null);
      __publicField(this, "_this", null);
      __publicField(this, "context", null);
      __publicField(this, "dpr", 1);
      __publicField(this, "points", []);
      __publicField(this, "newPoint", {});
      __publicField(this, "lastSpeed", 0);
      __publicField(this, "lastWidth", 8);
      __publicField(this, "config", {
        windowWidth: null,
        windowHeight: null,
        art: {
          enable: false
        },
        //艺术字
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
      });
      __publicField(this, "options", {
        canvas_id: ""
      });
      this._this = _this;
      this.options = {
        ...this.config,
        ...options || {},
        art: {
          ...this.config.art,
          ...options.art || {}
        },
        ctx: {
          ...this.config.ctx,
          ...options.ctx || {}
        },
        placeholder: {
          ...this.config.placeholder,
          ...options.placeholder || {}
        }
      };
      this.initPage();
      this.initCanvas();
    }
    //触摸开始
    touchstart(e) {
      if (this.drawCount == 0) {
        this.ctx.draw();
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
      this.ctx.draw(true);
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
      const prevPoint = this.points[this.points.length - 1];
      const distance = Math.hypot(
        this.newPoint.x - prevPoint.x,
        this.newPoint.y - prevPoint.y
      );
      const speed = distance / (this.newPoint.time - prevPoint.time);
      let currentSpeed = this.lastSpeed * 0.3 + speed * 0.7;
      let targetWidth = this.options.ctx.lineWidth / (currentSpeed * 0.3 + 1);
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
      formatAppLog("log", "at uni_modules/rn-signature/js/canvas/index.js:145", "saveClick");
      return new Promise((resolve, reject) => {
        uni.canvasToTempFilePath(
          {
            canvasId: "canvas_container",
            success: (file) => {
              let {
                tempFilePath
              } = file;
              resolve(tempFilePath);
            },
            fail(error) {
              formatAppLog("log", "at uni_modules/rn-signature/js/canvas/index.js:226", "处理生成的画布error:", error);
            }
          },
          this._this
        );
      });
    }
    //初始化画笔
    initPen() {
      this.ctx.lineWidth = this.options.ctx.lineWidth;
      this.ctx.lineCap = this.options.ctx.lineCap;
      this.ctx.lineJoin = this.options.ctx.lineJoin;
      this.ctx.setShadow(0, 0, 0.5, "#000000");
    }
    //初始化页面-获取宽高
    async initPage() {
      let windowConfig = uni.getSystemInfoSync();
      this.options.windowWidth = windowConfig.windowWidth;
      this.options.windowHeight = windowConfig.windowHeight;
    }
    //初始化画布
    async initCanvas() {
      if (!this.options.canvas_id) {
        formatAppLog("log", "at uni_modules/rn-signature/js/canvas/index.js:278", "请配置 canvas_id");
        return;
      }
      this.ctx = await this.createCanvasInstance();
      if (!this.validatenull(this.options.data.url)) {
        formatAppLog("log", "at uni_modules/rn-signature/js/canvas/index.js:285", "绘制图像到画布");
        this.initImageToCanvas();
      } else {
        formatAppLog("log", "at uni_modules/rn-signature/js/canvas/index.js:289", "展示提示消息");
        this.resetConfig();
      }
    }
    createCanvasInstance() {
      return new Promise((resolve, reject) => {
        resolve(uni.createCanvasContext(this.options.canvas_id, this._this));
      });
    }
    // 判断是否为空
    validatenull(val) {
      if (typeof val == "boolean" || typeof val == "number")
        return false;
      if (val instanceof Array) {
        if (val.length == 0)
          return true;
      } else if (val instanceof Object) {
        if (JSON.stringify(val) === "{}")
          return true;
      } else {
        if (val == "null" || val == null || val == "undefined" || val == void 0 || val == "")
          return true;
        return false;
      }
      return false;
    }
    // 重置配置
    resetConfig() {
      this.drawCount = 0;
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
      } = this.options.placeholder;
      this.ctx.setFontSize(fontSize);
      this.ctx.setTextBaseline(textBaseline);
      this.ctx.setTextAlign(textAlign);
      this.ctx.setFillStyle(fillStyle);
      this.ctx.translate(
        this.options.windowWidth / 2,
        this.options.windowHeight / 2
      );
      this.ctx.fillText(content, 0, 0);
      this.ctx.draw(false, () => {
        this.ctx.restore();
      });
    }
    // 初始化图片到画布上
    async initImageToCanvas() {
      this.drawCount = 1;
      this.ctx.save();
      let url = this.options.data.url;
      uni.getImageInfo({
        src: url,
        success: (imageInfo) => {
          this.ctx.drawImage(
            imageInfo.path,
            0,
            0,
            this.options.windowWidth,
            this.options.windowHeight
          );
          this.ctx.draw(false, () => {
            this.ctx.restore();
          });
        },
        fail(error) {
          formatAppLog("log", "at uni_modules/rn-signature/js/canvas/index.js:471", "初始化图片到画布上error:", error);
        }
      });
    }
    // base64 转 临时文件
    base64ToTempFile(base64Data) {
      const fs = uni.getFileSystemManager();
      const fileName = `temp_${Date.now()}.png`;
      const filePath = `${uni.env.USER_DATA_PATH}/${fileName}`;
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
  const _sfc_main$6 = {
    name: "RnCanvas",
    computed: {
      //按钮配置
      btnConfig() {
        let btn = this.options.btn || {};
        let saveBtn = btn.saveBtn || {};
        let resetBtn = btn.resetBtn || {};
        let cancelBtn = btn.cancelBtn || {};
        return {
          ...this.btnOptions,
          ...btn,
          saveBtn: {
            ...this.btnOptions.saveBtn,
            ...saveBtn,
            style: {
              ...this.btnOptions.saveBtn.style,
              ...saveBtn.style || {}
            }
          },
          resetBtn: {
            ...this.btnOptions.resetBtn,
            ...resetBtn,
            style: {
              ...this.btnOptions.resetBtn.style,
              ...resetBtn.style || {}
            }
          },
          cancelBtn: {
            ...this.btnOptions.cancelBtn,
            ...cancelBtn,
            style: {
              ...this.btnOptions.cancelBtn.style,
              ...cancelBtn.style || {}
            }
          }
        };
      },
      //按钮排序
      btnList() {
        let arr = [
          this.btnConfig.cancelBtn,
          this.btnConfig.resetBtn,
          this.btnConfig.saveBtn
        ];
        return arr.sort((a, b) => a.order - b.order);
      }
    },
    data() {
      return {
        ctx: null,
        data: {},
        query: {},
        options: {},
        btnShow: false,
        //控制APP按钮显隐，（优化 横屏过程中 按钮变化）
        btnOptions: {
          cancelBtn: {
            prop: "cancel",
            order: 1,
            content: "取消",
            class: "btn_cancel",
            style: {}
          },
          resetBtn: {
            prop: "reset",
            order: 2,
            content: "清空",
            class: "btn_reset",
            style: {}
          },
          saveBtn: {
            prop: "save",
            order: 3,
            content: "保存",
            class: "btn_save",
            style: {}
          }
        }
      };
    },
    watch: {
      data: {
        handler(newVal) {
          formatAppLog("log", "at uni_modules/rn-signature/pages/rn-canvas.vue:140", "签名数据更新1=>", newVal);
          newVal.url && uni.$emit(`rnReturnData${this.query.tempTime}`, newVal);
        },
        deep: true,
        immediate: true
      }
    },
    onLoad(query) {
      this.query = query;
      const eventChannel = this.getOpenerEventChannel();
      eventChannel.on(
        `receiveData${this.query.tempTime}`,
        async ({
          data,
          options
        }) => {
          this.data = data;
          this.options = options;
          let defaultTime = 500;
          try {
            this.btnShow = false;
            plus.screen.unlockOrientation();
            plus.screen.lockOrientation("landscape-primary");
          } catch (err) {
            formatAppLog("log", "at uni_modules/rn-signature/pages/rn-canvas.vue:178", "err:", err);
            this.btnShow = true;
          }
          setTimeout(() => {
            this.initStyle();
            this.$nextTick(() => {
              this.btnShow = true;
              this.ctx = new CanvasControl(
                {
                  canvas_id: "canvas_container",
                  data: this.data,
                  ...options
                },
                this
              );
              formatAppLog("log", "at uni_modules/rn-signature/pages/rn-canvas.vue:192", this.ctx);
            });
          }, defaultTime);
        }
      );
    },
    beforeUnmount() {
      this.clearStyle();
    },
    methods: {
      //初始化-模拟态-提示框的横屏样式清除
      async clearStyle() {
        try {
          plus.screen.lockOrientation("portrait-primary");
        } catch {
        }
      },
      //初始化-模拟态-提示框的横屏样式
      initStyle() {
      },
      /**
       * 控制按钮
       */
      clickHandler(prop) {
        this[prop + "Click"]();
      },
      //保存-点击
      async saveClick() {
        if (!this.ctx.drawCount) {
          uni.showToast({
            title: "请进行签名"
          });
          return;
        }
        let url = await this.ctx.rotateCanvas();
        this.data.url = url;
        uni.navigateBack(-1);
      },
      //重置-点击
      resetClick() {
        this.ctx.resetConfig();
      },
      //取消
      cancelClick() {
        uni.navigateBack(-1);
      },
      /**
       * 绘制过程=========
       */
      //触摸开始
      touchstart(e) {
        this.ctx.touchstart(e);
      },
      //触摸移动
      touchmove(e) {
        this.ctx.touchmove(e);
      },
      //触摸结束
      touchend() {
      }
    },
    onReady() {
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode(
        "canvas",
        {
          class: "canvas_container",
          "canvas-id": "canvas_container",
          id: "canvas_container",
          "disable-scroll": true,
          onTouchstart: _cache[0] || (_cache[0] = (...args) => $options.touchstart && $options.touchstart(...args)),
          onTouchmove: _cache[1] || (_cache[1] = (...args) => $options.touchmove && $options.touchmove(...args)),
          onTouchend: _cache[2] || (_cache[2] = (...args) => $options.touchend && $options.touchend(...args))
        },
        null,
        32
        /* NEED_HYDRATION */
      ),
      $data.btnShow ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "control_wrap"
      }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($options.btnList, (btn) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              key: btn.prop,
              class: vue.normalizeClass(["btn", btn.class]),
              style: vue.normalizeStyle(btn.style),
              onClick: ($event) => $options.clickHandler(btn.prop)
            }, [
              vue.createElementVNode(
                "view",
                { class: "text" },
                vue.toDisplayString(btn.content),
                1
                /* TEXT */
              )
            ], 14, ["onClick"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const UniModulesRnSignaturePagesRnCanvas = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__scopeId", "data-v-d54e4047"], ["__file", "E:/cityInvestment02/city-Investment/uni_modules/rn-signature/pages/rn-canvas.vue"]]);
  const _sfc_main$5 = {
    name: "RnSignature",
    props: {
      options: {
        type: Object,
        default: () => ({})
      },
      data: {
        type: Object,
        default: () => ({
          url: ""
        })
      }
    },
    computed: {
      clearClassName() {
        return this.optionsAll.clear.customClass;
      },
      optionsAll() {
        return {
          ...this.options,
          clear: {
            ...this.config.clear,
            ...this.options.clear || {}
          },
          placeholder: {
            ...this.config.placeholder,
            ...this.options.placeholder || {}
          },
          style: {
            ...this.config.style,
            ...this.options.style || {}
          }
        };
      }
    },
    data() {
      return {
        config: {
          clear: {
            show: true
          },
          style: {
            width: "100%",
            height: "300rpx",
            background: "#fff",
            // "box-shadow": "0px 0px 5px rgba(0, 0, 0, 0.4)",
            border: "1px soild",
            borderRadius: "20rpx"
          },
          placeholder: {
            content: "请点击设置签名"
          }
        }
      };
    },
    created() {
    },
    mounted() {
    },
    methods: {
      //清除-事件
      clearClick() {
        this.data.url = "";
      },
      //点击-事件
      btnClick() {
        this.data.tempTime && uni.$off(`rnReturnData${this.data.tempTime}`);
        this.data.tempTime = Date.now();
        uni.$on(`rnReturnData${this.data.tempTime}`, (res) => {
          formatAppLog("log", "at uni_modules/rn-signature/components/rn-signature/rn-signature.vue:103", "签名数据更新2=>", res);
          for (let key in res) {
            this.data[key] = res[key];
          }
        });
        uni.navigateTo({
          url: `/uni_modules/rn-signature/pages/rn-canvas?tempTime=${this.data.tempTime}`,
          success: (res) => {
            res.eventChannel.emit(`receiveData${this.data.tempTime}`, {
              data: this.data,
              options: this.optionsAll
            });
          },
          fail: (error) => {
            formatAppLog("log", "at uni_modules/rn-signature/components/rn-signature/rn-signature.vue:123", "跳转页面：", error, this.data, "fail");
          }
        });
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "rn_signature",
        style: vue.normalizeStyle([[$options.optionsAll.style], { "border": "1px soild red" }])
      },
      [
        vue.createElementVNode("view", {
          class: "sign_container",
          onClick: _cache[0] || (_cache[0] = (...args) => $options.btnClick && $options.btnClick(...args))
        }, [
          !$props.data.url ? (vue.openBlock(), vue.createElementBlock("span", { key: 0 }, "请点击设置签名")) : vue.createCommentVNode("v-if", true),
          $props.data.url ? (vue.openBlock(), vue.createElementBlock("image", {
            key: 1,
            class: "signature_img",
            src: $props.data.url,
            alt: ""
          }, null, 8, ["src"])) : vue.createCommentVNode("v-if", true)
        ])
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-d5139542"], ["__file", "E:/cityInvestment02/city-Investment/uni_modules/rn-signature/components/rn-signature/rn-signature.vue"]]);
  const _sfc_main$4 = {
    data() {
      return {
        // 签名组件配置
        signatureOptions: {
          // 清除按钮配置
          // clear: {
          // 	show: true,
          // },
          // 占位符配置
          placeholder: {
            // 	content: '请在此手写签名',
            // 	fontSize: 32,
            // 	fillStyle: '#999999'
            content: "请在此手写签名",
            fontSize: 32,
            textBaseline: "middle",
            textAlign: "center",
            // 确保文本对齐方式
            fillStyle: "#999999"
          },
          clear: {
            show: true,
            slot: false,
            customClass: "btn_clear_wrap"
          },
          // 签名容器样式
          style: {
            width: "100%",
            height: "450rpx",
            borderRadius: "10rpx",
            border: "2rpx dashed #cccccc"
          },
          // style: { //设置签名容器宽高
          // 	width: '600rpx',
          // 	height: '300rpx',
          // 	marginLeft: 'auto',
          // 	marginRight: 'auto'
          // },
          // 画笔配置
          ctx: {
            lineWidth: 3,
            lineCap: "round",
            lineJoin: "round"
          },
          // 按钮配置
          btn: {
            cancelBtn: {
              content: "取消",
              order: 1,
              style: {
                backgroundColor: "#007aff",
                color: "#fff"
              }
            },
            resetBtn: {
              content: "重签",
              order: 2,
              style: {
                backgroundColor: "#ff9900",
                color: "#fff"
              }
            },
            saveBtn: {
              content: "保存",
              order: 3,
              style: {
                backgroundColor: "#19be6b",
                color: "#fff"
              }
            }
          }
        },
        // 签名数据
        signatureData: {
          url: "",
          // 签名生成的图片地址 格式是base64
          tempTime: Date.now()
          // 时间戳，用于事件通信
        },
        // 保存状态
        isSaving: false
      };
    },
    onLoad(options) {
      if (options.signatureUrl) {
        formatAppLog("log", "at pages/signature/index.vue:119", "如果从其他页面传递了签名数据，则加载=>", options.signatureUrl);
        this.signatureData.url = decodeURIComponent(options.signatureUrl);
      }
    },
    methods: {
      // 处理签名数据更新
      handleSignatureUpdate(newData) {
        formatAppLog("log", "at pages/signature/index.vue:126", "签名数据更新:", newData);
        this.signatureData = {
          ...this.signatureData,
          ...newData
        };
      },
      // 保存签名
      saveSignature() {
        if (!this.signatureData.url) {
          uni.showToast({
            title: "请先进行签名",
            icon: "none"
          });
          return;
        }
        if (this.isSaving) {
          return;
        }
        this.isSaving = true;
        this.uploadSignatureToServer();
      },
      // 上传签名到服务器
      async uploadSignatureToServer() {
        formatAppLog("log", "at pages/signature/index.vue:158", "uploadSignatureToServer", this.signatureData);
        try {
          uni.showLoading({
            title: "保存中..."
          });
          formatAppLog("log", "at pages/signature/index.vue:165", "tempFilePath11111");
          const tempFilePath = await this.base64ToTempFile(this.signatureData.url);
          formatAppLog("log", "at pages/signature/index.vue:167", "tempFilePath22222", tempFilePath);
          const uploadResult = await this.uploadFile(tempFilePath);
          formatAppLog("log", "at pages/signature/index.vue:170", "uploadResult", uploadResult);
          uni.hideLoading();
          if (uploadResult.success) {
            uni.showToast({
              title: "签名保存成功",
              icon: "success"
            });
            setTimeout(() => {
              uni.navigateBack({
                delta: 1
              });
            }, 1500);
          } else {
            throw new Error(uploadResult.message || "上传失败");
          }
        } catch (error) {
          uni.hideLoading();
          uni.showToast({
            title: error.message || "保存失败",
            icon: "none"
          });
          formatAppLog("error", "at pages/signature/index.vue:195", "保存签名失败:", error);
        } finally {
          this.isSaving = false;
        }
      },
      // 上传文件到服务器
      uploadFile(filePath) {
        return new Promise((resolve, reject) => {
          uni.uploadFile({
            url: "YOUR_SERVER_API_URL",
            // 替换为您的服务器API地址
            filePath,
            name: "signature",
            formData: {
              userId: "current_user_id",
              // 替换为实际用户ID
              type: "signature"
            },
            success: (res) => {
              try {
                const data = JSON.parse(res.data);
                resolve({
                  success: true,
                  data
                });
              } catch (e) {
                reject(new Error("服务器响应格式错误"));
              }
            },
            fail: (error) => {
              reject(new Error("网络请求失败"));
            }
          });
        });
      },
      // base64转临时文件
      base64ToTempFile(base64Data) {
        return new Promise((resolve, reject) => {
          const base64 = base64Data.replace(/^data:image\/\w+;base64,/, "");
          const buffer = uni.base64ToArrayBuffer(base64);
          const fs = uni.getFileSystemManager();
          const fileName = `signature_${Date.now()}.png`;
          const filePath = `${uni.env.USER_DATA_PATH}/${fileName}`;
          fs.writeFile({
            filePath,
            data: buffer,
            encoding: "binary",
            success: () => resolve(filePath),
            fail: (error) => reject(error)
          });
        });
      },
      // 下载签名
      downloadSignature() {
        if (!this.signatureData.url) {
          uni.showToast({
            title: "没有可下载的签名",
            icon: "none"
          });
          return;
        }
        uni.saveImageToPhotosAlbum({
          filePath: this.signatureData.url,
          success: () => {
            uni.showToast({
              title: "已保存到相册",
              icon: "success"
            });
          },
          fail: () => {
            uni.showToast({
              title: "保存失败",
              icon: "none"
            });
          }
        });
      },
      // 清除签名
      clearSignature() {
        uni.showModal({
          title: "确认清除",
          content: "确定要清除当前签名吗？",
          success: (res) => {
            if (res.confirm) {
              this.signatureData.url = "";
              uni.showToast({
                title: "已清除",
                icon: "success"
              });
            }
          }
        });
      },
      // 返回上一页
      goBack() {
        uni.navigateBack({
          delta: 1
        });
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_rn_signature = resolveEasycom(vue.resolveDynamicComponent("rn-signature"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock("view", { class: "signature-container" }, [
      vue.createVNode(_component_rn_signature, {
        options: $data.signatureOptions,
        data: $data.signatureData,
        "onUpdate:data": $options.handleSignatureUpdate
      }, null, 8, ["options", "data", "onUpdate:data"]),
      vue.createElementVNode("view", { class: "action-buttons" }, [
        vue.createElementVNode(
          "view",
          {
            onClick: _cache[0] || (_cache[0] = (...args) => $options.saveSignature && $options.saveSignature(...args)),
            class: vue.normalizeClass(["save-btn", { "disabled": !$data.signatureData.url }])
          },
          " 保存签名 ",
          2
          /* CLASS */
        ),
        vue.createElementVNode("view", {
          onClick: _cache[1] || (_cache[1] = (...args) => $options.goBack && $options.goBack(...args)),
          class: "back-btn"
        }, " 返回 ")
      ])
    ]);
  }
  const PagesSignatureIndex = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__scopeId", "data-v-24821192"], ["__file", "E:/cityInvestment02/city-Investment/pages/signature/index.vue"]]);
  const _sfc_main$3 = {
    __name: "index",
    props: {
      // 屏幕方向： 竖屏 portrait，横屏 landscape
      orientation: {
        type: String,
        default: "portrait"
      },
      canvasId: {
        type: String,
        default: "mySign"
      },
      // 画布宽度
      width: {
        type: String,
        default: ""
      },
      // 画布高度
      height: {
        type: String,
        default: ""
      },
      // 画布背景色
      backgroundColor: {
        type: String,
        default: "#ececec"
      },
      // 画笔颜色
      lineColor: {
        type: String,
        default: "#333333"
      },
      // 画笔大小
      lineSize: {
        type: String,
        default: "5rpx"
      },
      // 新增：初始签名图片（用于回显）
      initialSignature: {
        type: String,
        default: ""
      }
    },
    emits: ["change", "confirm"],
    setup(__props, { expose: __expose, emit: __emit }) {
      const { proxy } = vue.getCurrentInstance();
      const emits = __emit;
      const props = __props;
      const ctx = vue.ref(null);
      const drawTimer = vue.ref(null);
      const isDrawed = vue.ref(false);
      const canvasWidth = vue.ref(0);
      const canvasHeight = vue.ref(0);
      const lineSize = vue.ref(5);
      const signImg = vue.ref("");
      vue.watch(() => props.initialSignature, (newVal) => {
        if (newVal) {
          formatAppLog("log", "at pages/signatures/index.vue:96", "newVal", newVal);
          loadExistingSignature(newVal);
        }
      }, { immediate: true });
      vue.onMounted(() => {
        lineSize.value = uni.upx2px(parseInt(props.lineSize));
        let systemInfo2 = uni.getWindowInfo();
        if (props.width) {
          canvasWidth.value = uni.upx2px(parseInt(props.width));
        } else {
          canvasWidth.value = systemInfo2.windowWidth;
        }
        if (props.height) {
          canvasHeight.value = uni.upx2px(parseInt(props.height));
        } else {
          canvasHeight.value = systemInfo2.windowHeight;
        }
        setTimeout(() => {
          ctx.value = uni.createCanvasContext(props.canvasId);
          canvasInit();
          if (props.initialSignature) {
            formatAppLog("log", "at pages/signatures/index.vue:122", "newVal2222", props.initialSignature);
            loadExistingSignature(props.initialSignature);
          }
        }, 300);
      });
      const getStyle = vue.computed(() => {
        return {
          width: canvasWidth.value + "px",
          height: canvasHeight.value + "px"
        };
      });
      function canvasInit() {
        setTimeout(() => {
          ctx.value.setFillStyle(props.backgroundColor);
          ctx.value.fillRect(0, 0, canvasWidth.value, canvasHeight.value);
          ctx.value.draw(true);
          ctx.value.setStrokeStyle(props.lineColor);
          ctx.value.setLineWidth(lineSize.value);
          isDrawed.value = false;
          signImg.value = "";
        }, 100);
      }
      function loadExistingSignature(imageUrl) {
        if (!imageUrl)
          return;
        if (imageUrl.startsWith("data:image/")) {
          loadBase64Image(imageUrl);
        } else {
          loadImageFromPath(imageUrl);
        }
      }
      function loadBase64Image(base64Data) {
        formatAppLog("log", "at pages/signatures/index.vue:163", "loadBase64Image", base64Data);
        const img = new Image();
        img.onload = () => {
          ctx.value.drawImage(img, 0, 0, canvasWidth.value, canvasHeight.value);
          ctx.value.draw(true);
          signImg.value = base64Data;
          isDrawed.value = true;
        };
        img.src = base64Data;
      }
      function loadImageFromPath(imagePath) {
        formatAppLog("log", "at pages/signatures/index.vue:176", "loadImageFromPath", imagePath);
        uni.getImageInfo({
          src: imagePath,
          success: (res) => {
            ctx.value.drawImage(res.path, 0, 0, canvasWidth.value, canvasHeight.value);
            ctx.value.draw(true);
            signImg.value = imagePath;
            isDrawed.value = true;
          },
          fail: (error) => {
            formatAppLog("error", "at pages/signatures/index.vue:186", "加载签名图片失败:", error);
            uni.showToast({
              title: "加载签名失败",
              icon: "none"
            });
          }
        });
      }
      function tstart(e) {
        let x = e.touches[0].x;
        let y = e.touches[0].y;
        ctx.value.moveTo(x, y);
      }
      function tmove(e) {
        let x = e.touches[0].x;
        let y = e.touches[0].y;
        ctx.value.lineTo(x, y);
        ctx.value.stroke();
        ctx.value.draw(true, saveImg());
        ctx.value.moveTo(x, y);
      }
      function saveImg() {
        isDrawed.value = true;
        if (drawTimer.value != null) {
          clearTimeout(drawTimer.value);
        }
        drawTimer.value = setTimeout(() => {
          uni.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: canvasWidth.value,
            height: canvasHeight.value,
            destWidth: canvasWidth.value,
            destHeight: canvasHeight.value,
            canvasId: props.canvasId,
            success: (res) => {
              formatAppLog("log", "at pages/signatures/index.vue:228", "saveImg", res);
              signImg.value = res.tempFilePath;
              emits("change", res);
            }
          });
        }, 300);
      }
      function confirm() {
        if (!isDrawed.value) {
          uni.showToast({
            title: "请先进行签名",
            icon: "none"
          });
          return;
        }
        emits("confirm", signImg.value);
        uni.navigateBack();
      }
      function downloadSignature() {
        if (!signImg.value) {
          uni.showToast({
            title: "没有可下载的签名",
            icon: "none"
          });
          return;
        }
        uni.saveImageToPhotosAlbum({
          filePath: signImg.value,
          success: () => {
            uni.showToast({
              title: "已保存到相册",
              icon: "success"
            });
          },
          fail: () => {
            uni.showToast({
              title: "保存失败",
              icon: "none"
            });
          }
        });
      }
      function clearSignature() {
        canvasInit();
      }
      __expose({ confirm, canvasInit, loadExistingSignature });
      const __returned__ = { proxy, emits, props, ctx, drawTimer, isDrawed, canvasWidth, canvasHeight, lineSize, signImg, getStyle, canvasInit, loadExistingSignature, loadBase64Image, loadImageFromPath, tstart, tmove, saveImg, confirm, downloadSignature, clearSignature, computed: vue.computed, getCurrentInstance: vue.getCurrentInstance, onMounted: vue.onMounted, ref: vue.ref, watch: vue.watch };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "zx-sign" }, [
      vue.createElementVNode("view", { class: "canvas-box" }, [
        vue.createElementVNode(
          "view",
          {
            style: vue.normalizeStyle($setup.getStyle)
          },
          [
            vue.createElementVNode("canvas", {
              id: $props.canvasId,
              "canvas-id": $props.canvasId,
              style: vue.normalizeStyle($setup.getStyle),
              onTouchstart: $setup.tstart,
              onTouchmove: $setup.tmove
            }, null, 44, ["id", "canvas-id"])
          ],
          4
          /* STYLE */
        ),
        vue.renderSlot(_ctx.$slots, "actions", {}, () => [
          vue.createElementVNode("view", { class: "sign-actions-default" }, [
            vue.createElementVNode(
              "view",
              {
                class: "sign-desc",
                style: vue.normalizeStyle({ bottom: $setup.canvasHeight * 0.4 + "px" })
              },
              [
                vue.createElementVNode("text", { class: "rotated-desc" }, "请在下方手写签名")
              ],
              4
              /* STYLE */
            ),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["sign-button", { disabled: !$setup.isDrawed }]),
                onClick: $setup.confirm
              },
              [
                vue.createElementVNode(
                  "text",
                  {
                    class: "rotated-text",
                    style: vue.normalizeStyle({ backgroundColor: $setup.isDrawed ? "#19be6b" : "#71d5a1" })
                  },
                  "确认签名",
                  4
                  /* STYLE */
                )
              ],
              2
              /* CLASS */
            ),
            vue.createElementVNode("view", {
              class: "re-button",
              onClick: $setup.canvasInit
            }, [
              vue.createElementVNode("text", {
                class: "rotated-text",
                style: { "background-color": "#ff9900" }
              }, "重新签名")
            ])
          ])
        ], true)
      ])
    ]);
  }
  const PagesSignaturesIndex = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__scopeId", "data-v-f9c07b55"], ["__file", "E:/cityInvestment02/city-Investment/pages/signatures/index.vue"]]);
  const _sfc_main$2 = {
    __name: "msg",
    setup(__props, { expose: __expose }) {
      __expose();
      vue.useCssVars((_ctx) => ({
        "25e275b0-msgListHeight": msgListHeight.value
      }));
      const dataList = vue.ref([
        {
          id: 1,
          title: "关于近期贵金属业务市场风险提示",
          content: "尊敬的客户:近期国内外贵金属价格波动加剧,市场风险提升。请您提高贵金属业务的风险防范尊敬的客户:近期国内外贵金属价格波动加剧,市场风险提升。请您提高贵金属业务的风险防范尊敬的客户:近期国内外贵金属价格波动加剧,市场风险提升。请您提高贵金属业务的风险防范尊敬的客户:近期国内外贵金属价格波动加剧,市场风险提升。请您提高贵金属业务的风险防范尊敬的客户:近期国内外贵金属价格波动加剧,市场风险提升。请您提高贵金属业务的风险防范尊敬的客户:近期国内外贵金属价格波动加剧,市场风险提升。请您提高贵金属业务的风险防范尊敬的客户:近期国内外贵金属价格波动加剧,市场风险提升。请您提高贵金属业务的风险防范",
          time: "2024-01-15 10:30",
          read: false
        },
        {
          id: 2,
          title: "识诈反诈揭秘手机远程操控诈骗",
          content: "近期,多地发生利用手机远控APP实施资金盗用的案件,受害者众多。这类诈骗隐蔽性极强,犯...",
          time: "2024-01-14 15:20",
          read: false
        },
        {
          id: 3,
          title: '关于第二批"西藏自治区成立60周',
          content: '尊敬的客户:根据中国人民银行贵金属纪念币发行安排,"西藏自治区成立60周年金银纪念币"...',
          time: "2024-01-13 09:15",
          read: true
        },
        {
          id: 4,
          title: '关于第二批"西藏自治区成立60周',
          content: '尊敬的客户:根据中国人民银行贵金属纪念币发行安排,"西藏自治区成立60周年金银纪念币"...',
          time: "2024-01-13 09:15",
          read: true
        },
        {
          id: 5,
          title: '关于第二批"西藏自治区成立60周',
          content: '尊敬的客户:根据中国人民银行贵金属纪念币发行安排,"西藏自治区成立60周年金银纪念币"...',
          time: "2024-01-13 09:15",
          read: true
        },
        {
          id: 6,
          title: '关于第二批"西藏自治区成立60周',
          content: '尊敬的客户:根据中国人民银行贵金属纪念币发行安排,"西藏自治区成立60周年金银纪念币"...',
          time: "2024-01-13 09:15",
          read: true
        },
        {
          id: 7,
          title: '关于第二批"西藏自治区成立60周',
          content: '尊敬的客户:根据中国人民银行贵金属纪念币发行安排,"西藏自治区成立60周年金银纪念币"...',
          time: "2024-01-13 09:15",
          read: true
        }
      ]);
      const paging = vue.ref(null);
      const onRefresh = () => {
      };
      const queryList = (pageNo, pageSize) => {
        paging.value.complete(dataList.value || []);
      };
      const goBack = () => {
        uni.navigateBack({
          delta: 1
        });
      };
      const statusBarHeight = vue.ref(0);
      const handleMsgClick = (item) => {
        formatAppLog("log", "at pages/info/msg.vue:134", "点击消息:", item);
        item.read = true;
      };
      const msgListHeight = vue.ref("");
      const computeMsgListHeight = () => {
        try {
          const {
            windowHeight
          } = uni.getSystemInfoSync();
          const inst = vue.getCurrentInstance();
          const q = uni.createSelectorQuery().in(inst == null ? void 0 : inst.proxy);
          q.select(".header-stickt").boundingClientRect((rect) => {
            const headerH = (rect == null ? void 0 : rect.height) || 0;
            const h = Math.max(0, windowHeight - headerH);
            formatAppLog("log", "at pages/info/msg.vue:156", "h-0000000000000->", h);
            msgListHeight.value = `${h}px`;
          }).exec();
        } catch (e) {
          msgListHeight.value = "calc(100vh - 100rpx)";
        }
      };
      vue.onMounted(() => {
        var _a;
        formatAppLog("log", "at pages/info/msg.vue:165", "消息页面加载完成");
        vue.nextTick(() => computeMsgListHeight());
        (_a = uni.onWindowResize) == null ? void 0 : _a.call(uni, () => computeMsgListHeight());
      });
      const __returned__ = { dataList, paging, onRefresh, queryList, goBack, statusBarHeight, handleMsgClick, msgListHeight, computeMsgListHeight, ref: vue.ref, onMounted: vue.onMounted, getCurrentInstance: vue.getCurrentInstance, nextTick: vue.nextTick, get http() {
        return http;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_nav_bar = resolveEasycom(vue.resolveDynamicComponent("uni-nav-bar"), __easycom_0$4);
    const _component_z_paging = resolveEasycom(vue.resolveDynamicComponent("z-paging"), __easycom_1$1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "msg-page" }, [
      vue.createElementVNode("view", { class: "header-stickt" }, [
        vue.createElementVNode(
          "view",
          {
            class: "status_bar",
            style: vue.normalizeStyle({ height: `${$setup.statusBarHeight * 2}rpx` })
          },
          null,
          4
          /* STYLE */
        ),
        vue.createVNode(_component_uni_nav_bar, { class: "nav-bar-top" }, {
          left: vue.withCtx(() => [
            vue.createElementVNode("view", {
              class: "back-btn",
              onClick: $setup.goBack
            })
          ]),
          right: vue.withCtx(() => [
            vue.createElementVNode("view", { style: { "width": "40rpx" } })
          ]),
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "nav-title" }, "消息中心")
          ]),
          _: 1
          /* STABLE */
        })
      ]),
      vue.createElementVNode("view", { class: "msg-list" }, [
        vue.createVNode(_component_z_paging, {
          ref: "paging",
          modelValue: $setup.dataList,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.dataList = $event),
          onOnRefresh: $setup.onRefresh,
          onQuery: $setup.queryList,
          fixed: false
        }, {
          default: vue.withCtx(() => [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.dataList, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: "msg-item",
                  key: index,
                  onClick: ($event) => $setup.handleMsgClick(item)
                }, [
                  vue.createElementVNode("view", { class: "msg-header" }, [
                    vue.createElementVNode("view", { class: "msg-icon" }, [
                      vue.createElementVNode("image", {
                        class: "msg-icon-img",
                        src: _imports_0$1,
                        mode: "widthFix"
                      })
                    ]),
                    vue.createElementVNode(
                      "view",
                      { class: "msg-title" },
                      vue.toDisplayString(item.title),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode(
                    "view",
                    { class: "msg-content" },
                    vue.toDisplayString(item.content),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("view", { class: "msg-action" }, [
                    vue.createElementVNode(
                      "text",
                      { class: "action-text" },
                      vue.toDisplayString(item.time),
                      1
                      /* TEXT */
                    )
                  ])
                ], 8, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ]),
          _: 1
          /* STABLE */
        }, 8, ["modelValue"])
      ])
    ]);
  }
  const PagesInfoMsg = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__scopeId", "data-v-25e275b0"], ["__file", "E:/cityInvestment02/city-Investment/pages/info/msg.vue"]]);
  const _sfc_main$1 = {
    __name: "help",
    setup(__props, { expose: __expose }) {
      __expose();
      vue.useCssVars((_ctx) => ({
        "a67bc000-msgListHeight": msgListHeight.value
      }));
      const dataList = vue.ref([
        {
          id: 1,
          title: "关于近期贵金属业务市场风险提示",
          qaList: [
            {
              question: "为什么需要更新技术简历？",
              answer: "技术简历是技术岗位授权流程中的必要要求。其内容应包含在TMT中注册的所有学习、经验和技术发展的证据。"
            },
            {
              question: "技术简历需要包含哪些内容？",
              answer: "技术简历应包含您的教育背景、工作经验、技能证书、项目经验等与技术岗位相关的所有信息。"
            },
            {
              question: "如何更新技术简历？",
              answer: "您可以通过登录系统，在个人资料页面找到技术简历选项，按照提示填写相关信息并提交审核。"
            }
          ],
          time: "2024-01-15 10:30",
          read: false,
          expanded: false
        },
        {
          id: 2,
          title: "识诈反诈揭秘手机远程操控诈骗新远程操控诈骗新.远程操控诈骗新.远程操控诈骗新....",
          qaList: [
            {
              question: "如何保护自己免受手机远程操控诈骗？",
              answer: "要谨慎对待可疑应用，不要与陌生人分享屏幕，定期检查设备权限，发现任何可疑活动立即向银行报告。"
            },
            {
              question: "什么是手机远程操控诈骗？",
              answer: "手机远程操控诈骗是指诈骗分子通过各种手段获取您的手机控制权，进而盗取您的个人信息和资金。"
            },
            {
              question: "如何识别可疑的远程操控请求？",
              answer: "注意不要接受来自陌生人的屏幕共享请求，不要下载来源不明的应用，定期检查手机权限设置。"
            }
          ],
          time: "2024-01-14 15:20",
          read: false,
          expanded: false
        },
        {
          id: 3,
          title: '关于第二批"西藏自治区成立60周年"纪念币发行',
          qaList: [
            {
              question: "纪念币收藏是什么？",
              answer: "西藏自治区成立60周年金银纪念币由中国人民银行发行，用于庆祝西藏自治区成立60周年。"
            },
            {
              question: "如何购买这些纪念币？",
              answer: "您可以通过授权银行和官方渠道购买这些纪念币。请联系您当地的分行了解供应情况和价格信息。"
            },
            {
              question: "这些纪念币的投资价值如何？",
              answer: "纪念币可能具有收藏价值，但不保证投资回报。购买前请考虑您的财务状况和投资目标。"
            },
            {
              question: "是否有身份验证要求？",
              answer: "是的，您可能需要提供有效身份证明并满足某些资格标准。请向您的银行咨询具体要求。"
            },
            {
              question: "如果对订单有疑问应该怎么办？",
              answer: "通过官方渠道联系我们的客服团队或访问最近的分行。我们的工作人员很乐意为您解答任何疑问。"
            }
          ],
          time: "2024-01-13 09:15",
          read: true,
          expanded: false
        }
      ]);
      const paging = vue.ref(null);
      const onRefresh = () => {
        setTimeout(() => {
          paging.value.complete();
          paging.value.reload();
        }, 10);
      };
      const queryList = (pageNo, pageSize) => {
        paging.value.complete(dataList.value || []);
      };
      const goBack = () => {
        uni.navigateBack({
          delta: 1
        });
      };
      const statusBarHeight = vue.ref(0);
      const handleMsgClick = (item) => {
        formatAppLog("log", "at pages/info/help.vue:168", "点击消息:", item);
        item.read = true;
      };
      const toggleItem = (index) => {
        dataList.value[index].expanded = !dataList.value[index].expanded;
        formatAppLog("log", "at pages/info/help.vue:180", "切换展开状态:", index, dataList.value[index].expanded);
      };
      const msgListHeight = vue.ref("");
      const computeMsgListHeight = () => {
        try {
          const {
            windowHeight
          } = uni.getSystemInfoSync();
          const inst = vue.getCurrentInstance();
          const q = uni.createSelectorQuery().in(inst == null ? void 0 : inst.proxy);
          q.select(".header-stickt").boundingClientRect((rect) => {
            const headerH = (rect == null ? void 0 : rect.height) || 0;
            const h = Math.max(0, windowHeight - headerH);
            formatAppLog("log", "at pages/info/help.vue:196", "h-0000000000000->", h);
            msgListHeight.value = `${h}px`;
          }).exec();
        } catch (e) {
          msgListHeight.value = "calc(100vh - 100rpx)";
        }
      };
      vue.onMounted(() => {
        var _a;
        formatAppLog("log", "at pages/info/help.vue:205", "消息页面加载完成");
        vue.nextTick(() => computeMsgListHeight());
        (_a = uni.onWindowResize) == null ? void 0 : _a.call(uni, () => computeMsgListHeight());
      });
      const __returned__ = { dataList, paging, onRefresh, queryList, goBack, statusBarHeight, handleMsgClick, toggleItem, msgListHeight, computeMsgListHeight, ref: vue.ref, onMounted: vue.onMounted, getCurrentInstance: vue.getCurrentInstance, nextTick: vue.nextTick, get http() {
        return http;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_nav_bar = resolveEasycom(vue.resolveDynamicComponent("uni-nav-bar"), __easycom_0$4);
    const _component_z_paging = resolveEasycom(vue.resolveDynamicComponent("z-paging"), __easycom_1$1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "msg-page" }, [
      vue.createElementVNode("view", { class: "header-stickt" }, [
        vue.createElementVNode(
          "view",
          {
            class: "status_bar",
            style: vue.normalizeStyle({ height: `${$setup.statusBarHeight * 2}rpx` })
          },
          null,
          4
          /* STYLE */
        ),
        vue.createVNode(_component_uni_nav_bar, { class: "nav-bar-top" }, {
          left: vue.withCtx(() => [
            vue.createElementVNode("view", {
              class: "back-btn",
              onClick: $setup.goBack
            })
          ]),
          right: vue.withCtx(() => [
            vue.createElementVNode("view", { style: { "width": "40rpx" } })
          ]),
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "nav-title" }, "在线帮助")
          ]),
          _: 1
          /* STABLE */
        })
      ]),
      vue.createElementVNode("view", { class: "msg-list" }, [
        vue.createVNode(_component_z_paging, {
          ref: "paging",
          modelValue: $setup.dataList,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.dataList = $event),
          onOnRefresh: $setup.onRefresh,
          onQuery: $setup.queryList,
          fixed: false
        }, {
          default: vue.withCtx(() => [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.dataList, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: "msg-item",
                  key: index
                }, [
                  vue.createElementVNode("view", {
                    class: "msg-header",
                    onClick: ($event) => $setup.toggleItem(index)
                  }, [
                    vue.createElementVNode("view", { class: "msg-icon" }, [
                      vue.createElementVNode("image", {
                        class: "msg-icon-img",
                        src: _imports_0,
                        mode: "widthFix"
                      })
                    ]),
                    vue.createElementVNode(
                      "view",
                      { class: "msg-title" },
                      vue.toDisplayString(item.title),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "view",
                      {
                        class: vue.normalizeClass(["expand-icon", { "expanded": item.expanded }])
                      },
                      [
                        vue.createElementVNode("image", {
                          class: "chevron",
                          src: _imports_1,
                          mode: "widthFix"
                        })
                      ],
                      2
                      /* CLASS */
                    )
                  ], 8, ["onClick"]),
                  vue.createElementVNode(
                    "view",
                    {
                      class: vue.normalizeClass(["msg-content-wrapper", { "expanded": item.expanded }])
                    },
                    [
                      vue.createElementVNode("view", { class: "qa-content" }, [
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList(item.qaList, (qa, qaIndex) => {
                            return vue.openBlock(), vue.createElementBlock("view", {
                              class: "qa-item",
                              key: qaIndex
                            }, [
                              vue.createElementVNode("view", { class: "question-section" }, [
                                vue.createElementVNode("text", { class: "qa-label" }, "Q:"),
                                vue.createElementVNode(
                                  "text",
                                  { class: "question-text" },
                                  vue.toDisplayString(qa.question),
                                  1
                                  /* TEXT */
                                )
                              ]),
                              vue.createElementVNode("view", { class: "answer-section" }, [
                                vue.createElementVNode("text", { class: "qa-label" }, "A:"),
                                vue.createElementVNode(
                                  "text",
                                  { class: "answer-text" },
                                  vue.toDisplayString(qa.answer),
                                  1
                                  /* TEXT */
                                )
                              ])
                            ]);
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ])
                    ],
                    2
                    /* CLASS */
                  )
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ]),
          _: 1
          /* STABLE */
        }, 8, ["modelValue"])
      ])
    ]);
  }
  const PagesInfoHelp = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__scopeId", "data-v-a67bc000"], ["__file", "E:/cityInvestment02/city-Investment/pages/info/help.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/nav/home", PagesNavHome);
  __definePage("pages/nav/pending", PagesNavPending);
  __definePage("pages/nav/completed", PagesNavCompleted);
  __definePage("pages/nav/profile", PagesNavProfile);
  __definePage("pages/search/index", PagesSearchIndex);
  __definePage("pages/detail/gcfk", PagesDetailGcfk);
  __definePage("pages/detail/sgjf", PagesDetailSgjf);
  __definePage("pages/detail/kyjf", PagesDetailKyjf);
  __definePage("pages/detail/zjdb", PagesDetailZjdb);
  __definePage("pages/detail/qtjf", PagesDetailQtjf);
  __definePage("pages/detail/zcys", PagesDetailZcys);
  __definePage("pages/detail/srqr", PagesDetailSrqr);
  __definePage("uni_modules/rn-signature/pages/rn-canvas", UniModulesRnSignaturePagesRnCanvas);
  __definePage("pages/signature/index", PagesSignatureIndex);
  __definePage("pages/signatures/index", PagesSignaturesIndex);
  __definePage("pages/info/msg", PagesInfoMsg);
  __definePage("pages/info/help", PagesInfoHelp);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "E:/cityInvestment02/city-Investment/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
