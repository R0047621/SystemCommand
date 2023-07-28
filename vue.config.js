const { defineConfig } = require("@vue/cli-service");
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { AntDesignVueResolver } = require("unplugin-vue-components/resolvers");
module.exports = defineConfig({
  devServer: {
    open: true,
    client: {
      overlay: false,
    },
  },
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      AutoImport({
        imports: [
          "vue",
          "vue-router",
          {
            "vue-request": ["useRequest"],
          },
        ],
        eslintrc: {
          enabled: true, // <-- this
        },
      }),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false, // css in js
            dts: true,
          }),
        ],
      }),
    ],
  },
});
