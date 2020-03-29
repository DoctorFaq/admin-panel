module.exports = {
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "Hack for Good";
      return args;
    });
  }
};
