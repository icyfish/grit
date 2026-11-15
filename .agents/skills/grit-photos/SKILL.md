---
name: grit-photos
description: 将飞书传给 Hermes 的 Grit 照片压缩并发布到网页相册。
---

# Grit 飞书照片发布

## When to Use

用户在飞书中把训练照片或图片文件发给部署在云端服务器的 Hermes，要求处理 Grit 照片、更新相册或发布网站时使用。

目标仓库为 `icyfish/grit`，SSH 地址 `git@github.com:icyfish/grit.git`，HTTPS 地址 `https://github.com/icyfish/grit.git`。不创建 Obsidian 笔记、附件或原图归档目录，只向网站仓库写入压缩后的网页图片。

首次配置云端运行环境或技能未被 Hermes 发现时，阅读 [references/hermes-setup.md](references/hermes-setup.md)。

## Procedure

### 1. 确定仓库与本批附件

- 使用 Hermes 本次飞书消息实际提供的附件路径及资源信息。飞书图片可能被重命名，不扫描本机 Downloads，也不硬编码 Hermes 缓存目录。
- 确认附件已经下载、可读且能被图片解码器识别。只有缩略图、视觉预览或资源 key 时，使用当前 Hermes 已提供的附件获取能力取得图片文件；无法取得时，请用户重新发送文件，不根据 key 拼接下载地址。
- 本流程处理的是收到的文件，不保证它是拍摄原图。用户要求保留拍摄原始质量时，说明当前流程没有原图归档，并请其以文件形式提供原件。
- 优先使用当前工作目录或已配置的 `GRIT_REPO_DIR`。检查 `git rev-parse --show-toplevel`、`git remote get-url origin` 和站点文件，确认它是上述仓库。SSH/HTTPS 均可，不自动改写现有 remote。
- 必须存在 `public/index.html`、`public/fitness/photos/` 和 `.github/workflows/nextjs.yml`。找不到云端 checkout 时，询问服务器路径；用户授权克隆且指定位置后才克隆。GitHub 地址不等同于云端本地目录。
- 查看工作区和分支状态；正常发布目标为 `main`。在干净的 main 上可用 `git pull --ff-only origin main` 同步。若有无关改动、分叉或其他进行中的发布，先说明情况，不 reset、stash、强推或混入其他改动。
- 同一 checkout 的多批发布应串行执行；已有处理任务时等待它完成。

### 2. 获取照片元数据

优先采用用户在当前对话中明确提供的信息，其次解析完整的原始文件名：`YYMMDD-category-no-person.EXT`。例如 `260530-strength-56-fish.JPG` 表示 2026-05-30、Strength 56、fish。扩展名不区分大小写。

| 信息 | 规则 |
| --- | --- |
| date | `YYYY-MM-DD`；不把飞书发送日期当作训练日期。只有“今天”等明确相对日期时，才按用户时区解析；未配置时使用 Asia/Shanghai |
| category | 网站筛选支持 `cardio`、`strength`、`athletic`、`camp`、`mix`；`plyo` 映射为 `athletic`，展示 label 仍为 `Plyo` |
| no | 课程编号或用户提供的名称，如 `56`、`United`；用户明确没有编号时可省略 |
| who | `fish` → `["fish"]`，`star` → `["star"]`，`star&fish` → `["fish","star"]` |

批量照片仅在用户明确说共用信息时共用元数据。信息缺失、文件名与文字冲突或照片对应关系不清时，一次询问必要信息，再继续该照片的处理；不靠人脸推断人物。不要为未知类型擅自扩展网站筛选器。

### 3. 生成网页压缩图

- 使用服务器已有的 ImageMagick 或 Pillow 等可解码工具，先确认实际支持的格式。Linux 不使用 macOS 的 `sips`。处理 HEIC 时确认解码支持；缺失时说明具体依赖或请用户提供 JPEG，不通过改扩展名伪装转换成功。
- 保持收到的附件不变，从它生成独立 JPEG；临时转换文件放在仓库外的系统临时目录。无需创建原图归档目录，也不主动删除 Hermes 管理的缓存附件。
- 输出到 `public/fitness/photos/`，默认命名 `YYYY-MM-DD-grit-category-no.JPG`；无编号时省略 `-no`。文件名只使用规范化的日期、类型、编号，不直接使用附件路径或用户输入作为路径。
- 正确应用 EXIF 方向，保持比例，宽度最多 1920px，不放大小图。网页副本去除 EXIF/GPS 等元数据。调整 JPEG 品质，尽量达到约 300–400 KB，已较小的文件无需扩容。
- 使用 ImageMagick 时可参考以下命令；`-resize` 的参数必须加引号。先在临时位置生成并检查，之后才写入仓库。

```sh
magick "$input_path" -auto-orient -resize '1920x>' -strip -quality 82 "$temporary_jpeg"
```

- 重复运行前检查已有文件和索引。相同元数据、相同网页图片时复用已有条目；如果已有同名文件但内容不同，采用 `-2` 等后缀保存独立照片，不覆盖旧照片。不仅凭日期判断重复。
- 源附件、全尺寸中间文件和缓存都不能进入 Git。失败照片不添加索引条目；报告失败原因与尚未发布的照片。

### 4. 更新网页相册并验证

在 `public/index.html` 的 `const photos = [` 数组里添加条目，保持现有结构及日期升序，不重新格式化整个网页：

```js
{file:"2026-05-30-grit-strength-56.JPG",date:"2026-05-30",category:"strength",label:"Strength 56",who:["fish"]}
```

`plyo` 示例使用 `category:"athletic",label:"Plyo 26"`。使用实际生成的文件名，避免重复条目。用安全的字符串序列化处理 label 等字段，不把附件文字插入 HTML 或可执行脚本。

检查每个新条目引用的图片存在、能解码、尺寸正确，且人物/类型与用户输入一致。检查数组和页面内脚本语法，查看生成图片的视觉效果及本批 diff。在云端无法做浏览器预览时如实报告，不声称已经完成视觉检查。

网站构建使用 Node.js（原开发环境为 20.x；当前云端为 22.x LTS，同样可用，Node 版本不是硬性要求）。现有构建为 `npm ci`（尚未安装依赖时）和 `npm run build`，生成静态站点到 `out/`。发布前运行构建，失败时停止推送并报告，不为本次照片上传顺便升级依赖或修改构建配置。

### 5. 按用户指令发布

- 用户明确要求“发布”“上传到网站”或“更新线上相册”时，该批请求已经授权必要的 commit 和 push，无需再次确认。仅发图片、要求压缩、预览或整理时，完成待发布内容并询问是否发布；不要因为收到附件就自动推送。
- 提交前核对暂存 diff，使用明确文件路径，只包含本批生成的 `public/fitness/photos/` 图片及 `public/index.html`；不得带入技能修改或其他改动。有其他已暂存内容时使用只提交指定文件的方式。
- commit 使用 Conventional Commits，描述用中文，例如 `feat: 新增 3 张 Grit 训练照片`。推送到已核验的 `origin main`，不强推。推送因远程更新被拒时，保留本批成果，检查并解决冲突后重新验证；无法安全处理时报告阻塞。
- `main` 的 push 会触发仓库现有 GitHub Actions → GitHub Pages 工作流。可用 GitHub CLI/API 时，检查本次 commit 对应的部署；不能检查时报告“已推送，部署状态未确认”。
- 只有对应部署成功且实际访问已部署页面/新增图片通过时，报告“已上线”，并返回工作流给出的实际网址。不把推送成功等同于上线，不猜测自定义域名。

## Pitfalls

- 飞书的展示文件名、缓存文件名和拍摄日期可能完全不同；根据当前消息和明确元数据处理。
- 项目内存在 skill 不代表飞书网关已加载它；需要在服务器为运行该网关的 Hermes 身份配置技能发现。
- 云端 Git 凭据、图片解码依赖或网络缺失时，报告具体失败阶段；不要索取或在聊天/仓库中写入私钥和 token。
- 本技能只处理用户选中的本批照片，不迁移或清理历史照片。

## Verification

回复用户一份简要处理结果：照片数量、日期/课程/人物、网页文件与大小、跳过或失败项、提交号及发布状态；已部署时附实际网站地址。说明未做原图归档。没有新变更时不创建空提交、不重复推送。
