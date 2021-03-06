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
      //   text: "๐ Books",
      //   link: "/books/"
      // }
      // {
      //   text: "๐ช Fitness",
      //   link: "/fitness/"
      // }
    // ],
    sidebar: [
      {
        text: "๐ Home",
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
            placeholder: "ๆ็ดข"
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
