(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{212:function(t,a,r){"use strict";r.r(a);var s=r(0),e=Object(s.a)({},function(){var t=this,a=t.$createElement,r=t._self._c||a;return r("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[r("h1",{attrs:{id:"design"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#design","aria-hidden":"true"}},[t._v("#")]),t._v(" Design")]),t._v(" "),r("p",[t._v("Ant Design 是一个致力于提升『用户』和『设计者』使用体验的中台设计语言，利用统一的规范进行设计赋能，全面提高中台产品体验和研发效率。此文摘录了设计或编码时最常遇见和易犯错的点，帮助设计者在使用 Ant Design 前了解重点信息，在使用过程中提醒备忘之用。")]),t._v(" "),r("h2",{attrs:{id:"布局和栅格"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#布局和栅格","aria-hidden":"true"}},[t._v("#")]),t._v(" 布局和栅格")]),t._v(" "),r("h3",{attrs:{id:"常见页面布局"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#常见页面布局","aria-hidden":"true"}},[t._v("#")]),t._v(" 常见页面布局")]),t._v(" "),r("p",[t._v("为了产品间的系列感和页面间的可复用性，我们统一了设计稿的页面宽度和栅格比例，设计师在设计时可按 "),r("code",[t._v("页面总宽 1440px，内容区 1208px")]),t._v(" 来设定页面宽度，也可以在 Ant Design Component Template 的 "),r("a",{attrs:{href:"https://design.alipay.com/resource",target:"_blank",rel:"noopener noreferrer"}},[t._v("sketch 模板"),r("OutboundLink")],1),t._v(" 中找到合适的模板拖拽使用，工程师则在 "),r("a",{attrs:{href:"https://design.alipay.com/develop/web/components/layout/",target:"_blank",rel:"noopener noreferrer"}},[t._v("常用布局"),r("OutboundLink")],1),t._v(" 里直接调取。")]),t._v(" "),r("h3",{attrs:{id:"自适应界面-居中式"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#自适应界面-居中式","aria-hidden":"true"}},[t._v("#")]),t._v(" 自适应界面-居中式")]),t._v(" "),r("h3",{attrs:{id:"代码实现时应注意："}},[r("a",{staticClass:"header-anchor",attrs:{href:"#代码实现时应注意：","aria-hidden":"true"}},[t._v("#")]),t._v(" 代码实现时应注意：")]),t._v(" "),r("p",[t._v("当浏览器宽度 ≥1440px 时，内容区不再扩大；\n当浏览器宽度 ≤1440px，≥1024px 时，内容区缩小，外留白 72px；\n当浏览器宽度 ＜ 1208px 时，去除外留白，浏览器底部出现滚动条；\n"),r("img",{attrs:{src:"https://zos.alipayobjects.com/rmsportal/EKNWGbgfuDnJAKQZzoXK.png",alt:""}})]),t._v(" "),r("h3",{attrs:{id:"自适应界面-撑满式"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#自适应界面-撑满式","aria-hidden":"true"}},[t._v("#")]),t._v(" 自适应界面-撑满式")]),t._v(" "),r("p",[t._v("侧边导航宽度视具体业务而定，右边内容区宽度则随浏览器宽度而改变。\n当内容区宽度不足 1024px 时，浏览器底部出现滚动条；\n"),r("img",{attrs:{src:"https://zos.alipayobjects.com/rmsportal/kSVvsbhXqyePIeQdxopS.png",alt:""}})]),t._v(" "),r("h3",{attrs:{id:"容器"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#容器","aria-hidden":"true"}},[t._v("#")]),t._v(" 容器")]),t._v(" "),r("p",[t._v("容器是用来收纳和组织对象的贮存器，理论上信息不应超出容器范围。为保持设计的一致性，我们为页面设定了统一的容器区域，让信息能保持在固定的位置，防止在页面跳转的时候出现内容闪动。\n"),r("img",{attrs:{src:"https://zos.alipayobjects.com/rmsportal/nBKHkWAbRIzJxZXVFZhY.png",alt:""}})]),t._v(" "),r("h3",{attrs:{id:"栅格"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#栅格","aria-hidden":"true"}},[t._v("#")]),t._v(" 栅格")]),t._v(" "),r("p",[t._v("栅格通常会在卡片式布局、多列表单中使用到。栅格有助于界面的版面布局和信息分布，及屏幕响应的灵活性。\n"),r("img",{attrs:{src:"https://zos.alipayobjects.com/rmsportal/txcsUhIbpGLPPcRXQpKm.png",alt:""}})]),t._v(" "),r("h5",{attrs:{id:"栅格公式："}},[r("a",{staticClass:"header-anchor",attrs:{href:"#栅格公式：","aria-hidden":"true"}},[t._v("#")]),t._v(" 栅格公式：")]),t._v(" "),r("p",[t._v("我们为页面栅格的 Gutter 设定了间隔定值为 16px 和 24px 两种，即\n浏览器在一定范围扩大或缩小，栅格的 Column 宽度会随之扩大或缩小，但 Gutter 间隔不变。\n"),r("img",{attrs:{src:"https://zos.alipayobjects.com/rmsportal/nCuXkZHTDlpLksfbxGVF.png",alt:""}})]),t._v(" "),r("blockquote",[r("p",[t._v("在 sketch 中可在 View/Canvas/Layout Settings 中设置，但 gutter on outside 选项不要启动，否则最后一列会有多余的空格。")])]),t._v(" "),r("h2",{attrs:{id:"字体和图标"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#字体和图标","aria-hidden":"true"}},[t._v("#")]),t._v(" 字体和图标")]),t._v(" "),r("h3",{attrs:{id:"字号选用范围"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#字号选用范围","aria-hidden":"true"}},[t._v("#")]),t._v(" 字号选用范围")]),t._v(" "),r("p",[t._v("如特殊场景需加大字号，可根据 Ant Design 字阶表增加字号，但"),r("code",[t._v("建议不超过 48pt")]),t._v("。")]),t._v(" "),r("p",[r("img",{attrs:{src:"https://zos.alipayobjects.com/rmsportal/aNzZmpjCgwUriwwnyhyZ.png",alt:""}})]),t._v(" "),r("h4",{attrs:{id:"行高规则"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#行高规则","aria-hidden":"true"}},[t._v("#")]),t._v(" 行高规则")]),t._v(" "),r("p",[t._v("行高是能很好的控制行间距以提升阅读体验。段落内文字使用默认行高；段落与段落之间的间距为 1 倍字高，如，当字号为 14 号时，段落间距则为 14px。")]),t._v(" "),r("blockquote",[r("p",[t._v("单行文字则不需要设置行高，如：标题、页面名称等。")])]),t._v(" "),r("p",[r("img",{attrs:{src:"https://zos.alipayobjects.com/rmsportal/eByAkUmlybFzIGPKSuTf.png",alt:""}})]),t._v(" "),r("h3",{attrs:{id:"常用图标尺寸"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#常用图标尺寸","aria-hidden":"true"}},[t._v("#")]),t._v(" 常用图标尺寸")]),t._v(" "),r("p",[r("img",{attrs:{src:"https://zos.alipayobjects.com/rmsportal/BaaEFNOYTLvIqPqoOIQt.png",alt:""}})]),t._v(" "),r("h5",{attrs:{id:"品牌色-brand-color"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#品牌色-brand-color","aria-hidden":"true"}},[t._v("#")]),t._v(" 品牌色 / Brand Color")]),t._v(" "),r("p",[r("img",{attrs:{src:"https://zos.alipayobjects.com/rmsportal/xvpPFxjiXPGkqhQESCVl.png",alt:""}})]),t._v(" "),r("h5",{attrs:{id:"中性色-neutral-color"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#中性色-neutral-color","aria-hidden":"true"}},[t._v("#")]),t._v(" 中性色 / Neutral Color")]),t._v(" "),r("p",[r("img",{attrs:{src:"https://zos.alipayobjects.com/rmsportal/IhZNEtacWdgNVlUzImpR.png",alt:""}})]),t._v(" "),r("h5",{attrs:{id:"功能色-function-color"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#功能色-function-color","aria-hidden":"true"}},[t._v("#")]),t._v(" 功能色 / Function Color")]),t._v(" "),r("p",[r("img",{attrs:{src:"https://zos.alipayobjects.com/rmsportal/vVFHOwTVkgaggwypmgjY.png",alt:""}})]),t._v(" "),r("h2",{attrs:{id:"间距"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#间距","aria-hidden":"true"}},[t._v("#")]),t._v(" 间距")]),t._v(" "),r("p",[t._v("我们根据页面信息结构和内容层级，利用大、中、小三种间距来实现信息之间的亲密度区分；在 Ant Design 中，我们将间距定义为以下三种：")]),t._v(" "),r("p",[r("img",{attrs:{src:"https://zos.alipayobjects.com/rmsportal/JEYfPHjxQoopCFbzDgqQ.png",alt:""}})]),t._v(" "),r("h2",{attrs:{id:"对齐方式"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#对齐方式","aria-hidden":"true"}},[t._v("#")]),t._v(" 对齐方式")]),t._v(" "),r("h3",{attrs:{id:"文案类左对齐"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#文案类左对齐","aria-hidden":"true"}},[t._v("#")]),t._v(" 文案类左对齐")]),t._v(" "),r("p",[t._v("当页面的字段或段落较短、较散时，需要确定一个统一的视觉起点，因此我们建议文案类统一使用左对齐的方式。")]),t._v(" "),r("p",[r("img",{attrs:{src:"https://zos.alipayobjects.com/rmsportal/KQDYkjIwNrLYxNbYxcQL.png",alt:""}})]),t._v(" "),r("h3",{attrs:{id:"数字类右对齐"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#数字类右对齐","aria-hidden":"true"}},[t._v("#")]),t._v(" 数字类右对齐")]),t._v(" "),r("p",[t._v("为了快速对比数值大小，我们采用小数点对齐，并保留相同位数的有效数值。")]),t._v(" "),r("p",[r("img",{attrs:{src:"https://zos.alipayobjects.com/rmsportal/btMZbAKCihyRTeYoJZis.png",alt:""}})]),t._v(" "),r("h3",{attrs:{id:"表单类对齐"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#表单类对齐","aria-hidden":"true"}},[t._v("#")]),t._v(" 表单类对齐")]),t._v(" "),r("p",[t._v("文案和输入框都分别向中间间距对齐能让内容锁定在一定范围内，让用户眼球顺着间距的视觉流，就能找到所有填写项，从而提高填写效率。")]),t._v(" "),r("p",[r("img",{attrs:{src:"https://zos.alipayobjects.com/rmsportal/ORcvzfLROFCYVSvdKomG.png",alt:""}})]),t._v(" "),r("h2",{attrs:{id:"文案规则"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#文案规则","aria-hidden":"true"}},[t._v("#")]),t._v(" 文案规则")]),t._v(" "),r("h3",{attrs:{id:"时间、日期表示方式："}},[r("a",{staticClass:"header-anchor",attrs:{href:"#时间、日期表示方式：","aria-hidden":"true"}},[t._v("#")]),t._v(" 时间、日期表示方式：")]),t._v(" "),r("p",[t._v("为了格式区分，Ant Design 中年月日之间用半角短横线『-』，时分秒之间使用半角冒号『:』\n表示范围之间使用半角波浪线『~』或使用中文 『至』，并在其前后加上间隔以示区分\n"),r("img",{attrs:{src:"https://zos.alipayobjects.com/rmsportal/WFxQIKffoxUaRZiUemsj.png",alt:""}})]),t._v(" "),r("h3",{attrs:{id:"空格规范："}},[r("a",{staticClass:"header-anchor",attrs:{href:"#空格规范：","aria-hidden":"true"}},[t._v("#")]),t._v(" 空格规范：")]),t._v(" "),r("ol",[r("li",[t._v("全角字符和半角字符搭配时，需要添加空格。最常见的全角字符：汉字。常用的半角字符：英文、数字。")]),t._v(" "),r("li",[t._v("中文链接之间增加添加空格。")])]),t._v(" "),r("h3",{attrs:{id:"特殊数值的表示方式："}},[r("a",{staticClass:"header-anchor",attrs:{href:"#特殊数值的表示方式：","aria-hidden":"true"}},[t._v("#")]),t._v(" 特殊数值的表示方式：")]),t._v(" "),r("ol",[r("li",[t._v("金额的间隔方式： "),r("code",[t._v("1,000,000")]),t._v("。")]),t._v(" "),r("li",[t._v("小数点后保留两位："),r("code",[t._v("200.00")]),t._v("。")])]),t._v(" "),r("h3",{attrs:{id:"以下情况不使用句号："}},[r("a",{staticClass:"header-anchor",attrs:{href:"#以下情况不使用句号：","aria-hidden":"true"}},[t._v("#")]),t._v(" 以下情况不使用句号：")]),t._v(" "),r("ol",[r("li",[t._v("输入框下的提示；表格中的句子。")]),t._v(" "),r("li",[t._v("句末为文字链（链接前使用句号）。")])]),t._v(" "),r("h3",{attrs:{id:"专业精准的用词建议："}},[r("a",{staticClass:"header-anchor",attrs:{href:"#专业精准的用词建议：","aria-hidden":"true"}},[t._v("#")]),t._v(" 专业精准的用词建议：")]),t._v(" "),r("ol",[r("li",[t._v("使用『你』代替『您』，以拉近与用户之间的距离，尽量不使用『我』，避免对象指向不明。")]),t._v(" "),r("li",[t._v("使用『编辑』代替『修改』。")]),t._v(" "),r("li",[t._v("使用『其他』代替『其它』，『其他』的应用范围更广。")]),t._v(" "),r("li",[t._v("使用『此』代替『该』，当要表达当前事物时，『此』更加明确。")]),t._v(" "),r("li",[t._v("使用『抱歉』而不用『对不起』，如果是我们系统造成的结果，可以使用『抱歉』，如果是用户自己造成的结果，则不使用这类词。")]),t._v(" "),r("li",[t._v("使用『登录』而不用『登陆』，登录是登记记录用户输入信息的意思，切勿用成『着陆』的陆。")])])])},[],!1,null,null,null);a.default=e.exports}}]);