(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{202:function(t,s,a){t.exports=a.p+"assets/img/life-cycle.7174ddc6.jpg"},252:function(t,s,a){"use strict";a.r(s);var e=a(0),n=Object(e.a)({},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"生命周期"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#生命周期","aria-hidden":"true"}},[t._v("#")]),t._v(" 生命周期")]),t._v(" "),e("p",[e("img",{attrs:{src:a(202),alt:"life-cycle"}})]),t._v(" "),e("h2",{attrs:{id:"概览"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#概览","aria-hidden":"true"}},[t._v("#")]),t._v(" 概览")]),t._v(" "),e("h3",{attrs:{id:"装配"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#装配","aria-hidden":"true"}},[t._v("#")]),t._v(" 装配")]),t._v(" "),e("ul",[e("li",[t._v("constructor()")]),t._v(" "),e("li",[t._v("static getDerivedStateFromProps()")]),t._v(" "),e("li",[t._v("render()")]),t._v(" "),e("li",[t._v("componentDidMount()")])]),t._v(" "),e("h3",{attrs:{id:"更新"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#更新","aria-hidden":"true"}},[t._v("#")]),t._v(" 更新")]),t._v(" "),e("ul",[e("li",[t._v("static getDerivedStateFromProps()")]),t._v(" "),e("li",[t._v("shouldComponentUpdate()")]),t._v(" "),e("li",[t._v("render()")]),t._v(" "),e("li",[t._v("getSnapshotBeforeUpdate()")]),t._v(" "),e("li",[t._v("componentDidUpdate()")])]),t._v(" "),e("h3",{attrs:{id:"卸载"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#卸载","aria-hidden":"true"}},[t._v("#")]),t._v(" 卸载")]),t._v(" "),e("ul",[e("li",[t._v("componentWillUnmount()")])]),t._v(" "),e("h2",{attrs:{id:"constructor"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#constructor","aria-hidden":"true"}},[t._v("#")]),t._v(" constructor()")]),t._v(" "),e("p",[t._v("正常只有在两种情况下会使用 constructor")]),t._v(" "),e("ul",[e("li",[t._v("初始化组件中的 state")]),t._v(" "),e("li",[t._v("绑定事件处理实例")])]),t._v(" "),e("div",{staticClass:"language-js line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[t._v("constructor")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("props")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 否则在constructor中 this.props 将会是undefined")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("super")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("props"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 不要在 constuctor 中调用 this.state()")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("state "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" counter"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 不要这样做")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 你可以直接使用 this.prop.color")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 更新 props.color 将不会映射到state中")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("state "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" color"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" props"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("color "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 但是其实可以用来初始化默认值")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("state "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" color"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" props"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("defaultColor "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n  "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("handleClick "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("handleClick")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("bind")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br"),e("span",{staticClass:"line-number"},[t._v("2")]),e("br"),e("span",{staticClass:"line-number"},[t._v("3")]),e("br"),e("span",{staticClass:"line-number"},[t._v("4")]),e("br"),e("span",{staticClass:"line-number"},[t._v("5")]),e("br"),e("span",{staticClass:"line-number"},[t._v("6")]),e("br"),e("span",{staticClass:"line-number"},[t._v("7")]),e("br"),e("span",{staticClass:"line-number"},[t._v("8")]),e("br"),e("span",{staticClass:"line-number"},[t._v("9")]),e("br"),e("span",{staticClass:"line-number"},[t._v("10")]),e("br"),e("span",{staticClass:"line-number"},[t._v("11")]),e("br"),e("span",{staticClass:"line-number"},[t._v("12")]),e("br"),e("span",{staticClass:"line-number"},[t._v("13")]),e("br"),e("span",{staticClass:"line-number"},[t._v("14")]),e("br"),e("span",{staticClass:"line-number"},[t._v("15")]),e("br"),e("span",{staticClass:"line-number"},[t._v("16")]),e("br"),e("span",{staticClass:"line-number"},[t._v("17")]),e("br")])]),e("h2",{attrs:{id:"render"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#render","aria-hidden":"true"}},[t._v("#")]),t._v(" render()")]),t._v(" "),e("p",[t._v("返回值类型")]),t._v(" "),e("ul",[e("li",[e("p",[t._v("React element （JSX）")])]),t._v(" "),e("li",[e("p",[t._v("String and Number (被渲染为 DOM 中的 text node)")])]),t._v(" "),e("li",[e("p",[t._v("Boolean or null (什么都不渲染)")])]),t._v(" "),e("li",[e("p",[t._v("Array 和 "),e("a",{attrs:{href:"https://reactjs.org/docs/fragments.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("fragments"),e("OutboundLink")],1)]),t._v(" "),e("div",{staticClass:"language-js line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[t._v("render")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("li key"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"A"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("First item"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("li"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("li key"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"B"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("Second item"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("li"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("li key"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"C"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("Third item"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("li"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br"),e("span",{staticClass:"line-number"},[t._v("2")]),e("br"),e("span",{staticClass:"line-number"},[t._v("3")]),e("br"),e("span",{staticClass:"line-number"},[t._v("4")]),e("br"),e("span",{staticClass:"line-number"},[t._v("5")]),e("br"),e("span",{staticClass:"line-number"},[t._v("6")]),e("br"),e("span",{staticClass:"line-number"},[t._v("7")]),e("br")])]),e("div",{staticClass:"language-js line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[t._v("render")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("React"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Fragment"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("li key"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"A"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("First item"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("li"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("li key"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"B"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("Second item"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("li"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("li key"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"C"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("Third item"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("li"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("React"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Fragment"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br"),e("span",{staticClass:"line-number"},[t._v("2")]),e("br"),e("span",{staticClass:"line-number"},[t._v("3")]),e("br"),e("span",{staticClass:"line-number"},[t._v("4")]),e("br"),e("span",{staticClass:"line-number"},[t._v("5")]),e("br"),e("span",{staticClass:"line-number"},[t._v("6")]),e("br"),e("span",{staticClass:"line-number"},[t._v("7")]),e("br"),e("span",{staticClass:"line-number"},[t._v("8")]),e("br")])])]),t._v(" "),e("li",[e("p",[e("a",{attrs:{href:"https://reactjs.org/docs/portals.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Portals"),e("OutboundLink")],1),t._v(" ⭐️")])])]),t._v(" "),e("h2",{attrs:{id:"static-getderivedstatefromprops"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#static-getderivedstatefromprops","aria-hidden":"true"}},[t._v("#")]),t._v(" static getDerivedStateFromProps()")]),t._v(" "),e("p",[t._v("用这个之前你可能需要先看下 "),e("a",{attrs:{href:"https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("你可能不需要 DerivedState"),e("OutboundLink")],1)]),t._v(" "),e("div",{staticClass:"language-js line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("static")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("getDerivedStateFromProps")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("nextProps"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" prevState"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br")])]),e("ul",[e("li",[t._v("返回一个对象来更新状态，或者返回 "),e("code",[t._v("null")]),t._v(" 来表明新属性不需要更新任何状态。")]),t._v(" "),e("li",[t._v("调用 this.setState() 通常不会触发 getDerivedStateFromProps()。")]),t._v(" "),e("li",[t._v("如果父组件导致了组件的重新渲染，即使属性没有更新，这一方法也会被调用。如果你只想处理变化，你可能需要比较新旧值。")]),t._v(" "),e("li",[t._v("这个方法无法拿到组件实例（方法中的"),e("code",[t._v("this")]),t._v("为"),e("code",[t._v("undefined")]),t._v("）")])]),t._v(" "),e("div",{staticClass:"custom-block tip"},[e("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),e("ul",[e("li",[t._v("如果需要产生一个副作用以响应 "),e("code",[t._v("props")]),t._v(" 中的变化（例如处理请求数据、动画），使用 "),e("code",[t._v("componentDidMount()")])]),t._v(" "),e("li",[t._v("如果当 "),e("code",[t._v("props")]),t._v(" 改变时，改变你想重新计算数据，使用 "),e("a",{attrs:{href:"https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization",target:"_blank",rel:"noopener noreferrer"}},[t._v("memoization"),e("OutboundLink")],1)]),t._v(" "),e("li",[t._v("如果当 "),e("code",[t._v("props")]),t._v(" 改变时，想重新设置某些状态，考虑使用"),e("a",{attrs:{href:"https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-controlled-component",target:"_blank",rel:"noopener noreferrer"}},[t._v("fully controlled"),e("OutboundLink")],1),t._v(" 或者 "),e("a",{attrs:{href:"https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key",target:"_blank",rel:"noopener noreferrer"}},[t._v("fully uncontrolled with a key"),e("OutboundLink")],1)])])]),t._v(" "),e("h2",{attrs:{id:"componentdidmount"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#componentdidmount","aria-hidden":"true"}},[t._v("#")]),t._v(" componentDidMount()")]),t._v(" "),e("ul",[e("li",[t._v("适合用于发起网络请求")]),t._v(" "),e("li",[t._v("发起订阅的好地方，记得在 "),e("strong",[t._v("componentWillUnmount()")]),t._v(" 退订")]),t._v(" "),e("li",[t._v("在这个地方调用 "),e("strong",[t._v("this.setState()")]),t._v(" 将会触发一次额外的渲染，但是它将在浏览器刷新屏幕之前发生。这保证了即使 render()将会调用两次，但用户不会看到中间状态。它对于像模态框和工具提示框这样的例子是必须的。这时，在渲染依赖 DOM 节点的尺寸或者位置的视图前，你需要先测量这些节点。 ⭐️")])]),t._v(" "),e("h2",{attrs:{id:"getsnapshotbeforeupdate"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#getsnapshotbeforeupdate","aria-hidden":"true"}},[t._v("#")]),t._v(" getSnapshotBeforeUpdate()")]),t._v(" "),e("div",{staticClass:"language-js line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[t._v("getSnapshotBeforeUpdate")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("prevProps"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" prevState"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br")])]),e("ul",[e("li",[t._v("在最新的渲染输出提交给 DOM 前将会立即调用")]),t._v(" "),e("li",[t._v("从 DOM 中捕获一些信息（例如：滚动条位置）")]),t._v(" "),e("li",[t._v("返回值将传给 "),e("code",[t._v("componentDidUpdate()")]),t._v(" 的第三个参数")])]),t._v(" "),e("h2",{attrs:{id:"componentdidupdate"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#componentdidupdate","aria-hidden":"true"}},[t._v("#")]),t._v(" componentDidUpdate()")]),t._v(" "),e("div",{staticClass:"language-js line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[t._v("componentDidUpdate")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("prevProps"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" prevState"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" snapshot"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br")])]),e("ul",[e("li",[e("strong",[t._v("componentDidUpdate()")]),t._v(" 会在更新发生后立即被调用。"),e("strong",[t._v("该方法并不会在初始化渲染时调用。")])]),t._v(" "),e("li",[t._v("操作 DOM；发送请求（要比较当前和之前的属性，如果属性没有改变请求也就没有必要）")]),t._v(" "),e("li",[t._v("调用 "),e("strong",[t._v("this.setState()")]),t._v(" 必须包裹在条件判断下，不然会导致死循环")]),t._v(" "),e("li",[t._v("snapshot 为 "),e("strong",[t._v("getSnapshotBeforeUpdate()")]),t._v(" 中的返回值，否则为 "),e("code",[t._v("undefined")])]),t._v(" "),e("li",[t._v("如果 "),e("strong",[t._v("shouldComponentUpdate()")]),t._v(" 返回值为 false 时 "),e("strong",[t._v("componentDidUpdate()")]),t._v(" 将不会被调用")])]),t._v(" "),e("h2",{attrs:{id:"componentwillunmount"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#componentwillunmount","aria-hidden":"true"}},[t._v("#")]),t._v(" componentWillUnmount()")]),t._v(" "),e("ul",[e("li",[t._v("在组件被卸载和销毁之前立刻调用。")]),t._v(" "),e("li",[t._v("处理任何必要的清理工作（解绑定时器，取消网络请求，清理任何在 componentDidMount 环节创建的 DOM 元素）")])])])},[],!1,null,null,null);s.default=n.exports}}]);