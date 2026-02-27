import nextI18NextConfig from './next-i18next.config.js'
import dotenv from 'dotenv'

dotenv.config()

const localEnv = {
  LIST_SCROLL_OFFSET_Y: process.env.LIST_SCROLL_OFFSET_Y || "300",
  LIST_ADD_DELAY: process.env.LIST_ADD_DELAY || "50",
  LIST_ADD_COUNT: process.env.LIST_ADD_COUNT || "2",
  LIST_HIDDEN_GENRES: process.env.LIST_HIDDEN_GENRES || "",
  LIST_ORIGINAL_LANGUAGES: process.env.LIST_ORIGINAL_LANGUAGES || "en|cs|ja|vi|zh|fr|ko|de|af|hr|da|et|fi|is|it|kn|kg|ru|rm|sv|tr|uk|sw|lt",
  LOADING_MARGIN: process.env.LOADING_MARGIN || "1280px 0px 280px 0px",
  LOADING_THRESHOLD: process.env.LOADING_THRESHOLD || "0",
};

export default {
  i18n: nextI18NextConfig.i18n,

  async headers() {
    return [
      {
        source: "/api/tmdb/(.*)",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
          { key: "Access-Control-Allow-Credentials", value: "true" }
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
}