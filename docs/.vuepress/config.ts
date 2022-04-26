import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";

export default defineUserConfig<DefaultThemeOptions>({
  base: "/grit/",
  lang: "en-US",
  title: "Grit",
  description: "Workout",
  // theme and its config
  theme: "@vuepress/theme-default",
  themeConfig: {
    // logo: "https://vuejs.org/images/logo.png",
    navbar: [
      {
        text: "GitHub",
        link: "https://github.com/icyfish/grit"
      }
    ],
    sidebar: [
      {
        text: "🗒 Choreography",
        children: [
          { text: "🌟 Grit Cardio 23", link: "/grit-23/cardio.md" },
          { text: "🌟 Grit Cardio 39", link: "/grit-39/cardio.md" }
        ]
      },
      {
        text: "📝 Terms",
        link: "/terms/index.md"
      },
      {
        text: "🐟's Workout Tracker",
        link: "/my/workout.md"
      }
    ]
  },
  plugins: [
    [
      "@vuepress/plugin-search",
      {
        locales: {
          "/": {
            placeholder: "搜索"
          }
        }
      }
    ]
  ]
});
