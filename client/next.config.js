const { i18n } = require("./next-i18next.config");
const { parsed: localEnv } = require('dotenv').config()
const webpack = require('webpack');

module.exports = {
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv))
    config.plugins = config.plugins || []

    config.plugins = [
      ...config.plugins,
    ]

    return config
  },
  env: {
    //Google Analytics
    GA_ID: "G-BTGDVNLPHG",

    //MV-TV lists
    LIST_SCROLL_OFFSET_Y: 300,
    LIST_ADD_DELAY: 50,
    LIST_ADD_COUNT: 2,
    LIST_HIDDEN_GENRES: "",
    LIST_ORIGINAL_LANGUAGES:
      "en|cs|ja|vi|zh|fr|ko|de|af|hr|da|et|fi|is|it|kn|kg|ru|rm|sv|tr|uk|sw|lt",

    //Component loading
    LOADING_MARGIN: "1280px 0px 280px 0px",
    LOADING_THRESHOLD: 0,
  },
  i18n,

};