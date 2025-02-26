const configAppDevServer = require("lib-components-react/lib/webpack/webpack.config.server");

module.exports = (arg: any, env: any) => {

  const mode = "development";
  const htmlTitle = "Statement Track Dev Server";
  const dotEnvFile = ".env.demo.development";
  const dirname = __dirname;

  let mainWebpack = configAppDevServer.executeConfigServer(mode, { htmlTitle: htmlTitle, dirname: dirname, dotEnvFile: dotEnvFile });

  console.log("Webpack config dev server", JSON.stringify(mainWebpack, null, 2));
  return mainWebpack;
}