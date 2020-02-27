module.exports = {
  plugins: ["macros"],
  presets: [
    [
      "next/babel",
      {
        "preset-env": {
          useBuiltIns: "usage",
          corejs: 3
        }
      }
    ]
  ]
};
