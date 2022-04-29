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
        text: "Fitness",
        children: [
          {
            text: "Grit Cardio",
            children: [
              { text: "✅ Grit Cardio 22", link: "/grit-22/cardio.md" },
              { text: "🌟 Grit Cardio 23", link: "/grit-23/cardio.md" },
              { text: "🌟 Grit Cardio 39", link: "/grit-39/cardio.md" },
              {
                text: "🐟's Cardio Tracker",
                link: "/my/cardio.md"
              }
            ]
          },
          {
            text: "📝 Terms",
            link: "/terms/index.md"
          }
        ]
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
