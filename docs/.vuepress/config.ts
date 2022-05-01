import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";

export default defineUserConfig<DefaultThemeOptions>({
  base: "/grit/",
  lang: "en-US",
  description: "Workout",
  // theme and its config
  theme: "@vuepress/theme-default",
  head: [['link', { rel: 'icon', href: '/images/fish.jpg' }]],
  themeConfig: {
    logo: "/images/grit.png",
    navbar: [
      {
        text: "💪 Fitness",
        link: "/fitness/",
      },
      {
        text: "📚 Books",
        link: "/books/",
      }
    ],
    sidebar: [
      {
        text: "📌 Home",
        link: "/home/"
      },
      {
        text: "💪 Fitness",
        link: "/fitness/",
        children: [
          {
            text: "Grit Cardio",
            children: [
              { text: "✅ Grit Cardio 22", link: "/fitness/grit-22/cardio.md" },
              { text: "🌟 Grit Cardio 23", link: "/fitness/grit-23/cardio.md" },
              { text: "🌟 Grit Cardio 39", link: "/fitness/grit-39/cardio.md" },
              {
                text: "🐟's Cardio Tracker",
                link: "/fitness/my/cardio.md"
              }
            ]
          },
          {
            text: "📝 Terms",
            link: "/fitness/terms/index.md"
          }
        ]
      },
      {
        text: "📚 Books",
        link: "/books/",
      }
    ]
  },
  extendsMarkdown: md => {
    md.use(require("markdown-it-task-lists"));
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
