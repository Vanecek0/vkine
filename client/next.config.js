import { i18n } from './next-i18next.config.js'
import dotenv from 'dotenv'

dotenv.config()
const localEnv = process.env

export default {
  i18n,

  async headers() {
    return [
      {
        source: "/api/tmdb/(.*)",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" }
        ]
      }
    ]
  },

  webpack(config, { webpack }) {
    config.plugins.push(
      new webpack.EnvironmentPlugin(localEnv)
    )
    return config
  },

  env: {
    LIST_SCROLL_OFFSET_Y: 300,
    LIST_ADD_DELAY: 50,
    LIST_ADD_COUNT: 2,
    LIST_HIDDEN_GENRES: "",
    LIST_ORIGINAL_LANGUAGES:
      "en|cs|ja|vi|zh|fr|ko|de|af|hr|da|et|fi|is|it|kn|kg|ru|rm|sv|tr|uk|sw|lt",
    LOADING_MARGIN: "1280px 0px 280px 0px",
    LOADING_THRESHOLD: 0,
  }
}