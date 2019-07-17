module.exports = {
  title: "React",
  description: "🚀 React攻城笔记",
  base: "/notebook-react/",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  themeConfig: {
    repo: "Jolylai/notebook",
    nav: require("./nav/zh"),
    sidebar: require("./siderbar/index"),
    lastUpdated: "上次更新"
  },
  markdown: {
    lineNumbers: true
  }
};
