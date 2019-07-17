const reactSiderbar = require("./react");
const antdProSidebar = require("./antd-pro");
const hookSidebar = require("./hook");
const antSiderbar = require("./antd");

module.exports = {
  "/react/": reactSiderbar,
  "/hook/": hookSidebar,
  "/antd-pro/": antdProSidebar,
  "/antd/": antSiderbar
};
