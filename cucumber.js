module.exports = {
  default: {
    require: [
      "tests/world/*.js",
      "tests/steps/*.js",
      "tests/hooks.js"
    ],
    publishQuiet: true,
    parallel: 2,
    timeout: 60000, 
    format: ["progress"]
  },
};
