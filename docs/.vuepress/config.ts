const { path } = require("@vuepress/utils");
import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";

export default defineUserConfig<DefaultThemeOptions>({
  base: "/grit/",
  lang: "en-US",
  title: "Fish",
  description: "FISHES WISHES",
  // theme and its config
  theme: "@vuepress/theme-default",
  head: [["link", { rel: "icon", href: "/images/fish.jpg" }]],
  themeConfig: {
    logo: "/images/fish.jpg",
    // navbar: [
      // {
      //   text: "📚 Books",
      //   link: "/books/"
      // }
      // {
      //   text: "💪 Fitness",
      //   link: "/fitness/"
      // }
    // ],
    sidebar: [
      {
        text: "📌 Home",
        link: "/home/"
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
    ],
    [
      "@vuepress/register-components",
      {
        componentsDir: path.resolve(__dirname, "./components")
      }
    ]
  ]
});
