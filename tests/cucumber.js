module.exports = {
  default: {
    require: [
      "world/*.js",
      "steps/*.js",
      "hooks.js"
    ],
    publishQuiet: true,
    parallel: 2,
    format: ["progress"]
  },
};