module.exports = {
  plugins: [
    "macros", // Enables hot reload for atoms
    "jotai/babel/plugin-react-refresh",
    // Automatically adds debug labels to the atoms
    "jotai/babel/plugin-debug-label",
  ],
  presets: [
    [
      "next/babel",
      {
        "preset-env": {
          useBuiltIns: "entry",
          corejs: 3,
        },
      },
    ],
  ],
};
