# 云端 Hermes 配置

本文件用于首次接入，不表示已经访问或部署到服务器。服务器 checkout 路径和 Hermes 运行身份需在服务器确认，不能照搬开发机的 `/Users/...` 路径。

## 技能来源与加载

技能的版本来源为 Grit 仓库中的 `.agents/skills/grit-photos/`。先把包含技能的版本同步到云端 checkout。

飞书网关可能在仓库外启动，建议在**实际运行网关的用户/配置档案**的 Hermes `config.yaml` 中合并以下配置。替换示例路径，保留已有 `skills` 字段和外部目录：

```yaml
skills:
  external_dirs:
    - /absolute/server/path/to/grit/.agents/skills
```

这样无需复制另一份 skill。检查当前 Hermes 版本是否支持该配置，并通过 `hermes skills list` 验证 `grit-photos` 可见。旧版本不支持外部目录时，可将整个 `grit-photos` 目录复制到该运行身份的 `~/.hermes/skills/grit-photos/`；后续更新需同步，避免多个不同版本同名技能互相覆盖。

Hermes 的技能目录和项目技能发现规则以 [官方技能文档](https://hermes-agent.nousresearch.com/docs/user-guide/features/skills/) 为准。默认安装目录是 `~/.hermes/skills/`，外部目录支持运行网关时直接发现仓库中的技能。

## 仓库与运行环境

- 在网关进程可见的环境中设置 `GRIT_REPO_DIR` 为服务器上的 Grit checkout 绝对路径，或在首次调用时明确提供路径。它是本 skill 的路径约定，不是 Hermes 自带配置项。
- 确认远程是 `git@github.com:icyfish/grit.git` 或其 HTTPS 等价地址，且运行网关的身份具备拉取和推送权限。SSH 私钥留在服务器既有凭据配置中。
- 准备 Git、Node.js 20、npm、图片解码/压缩工具。ImageMagick 必须具备所需输入格式的解码能力；可用 `magick -list format` 检查。无需原图归档目录。
- 飞书附件下载与终端处理必须共享可访问的文件系统；如果终端跑在容器或远程后端，需要确认附件路径映射。

## 飞书调用

Hermes 的飞书接入会将图片和文件缓存到本地。依照 [官方飞书接入文档](https://hermes-agent.nousresearch.com/docs/user-guide/messaging/feishu)，确认机器人已接入且具有读取消息资源的权限；本 skill 不重新配置飞书应用。

在飞书给机器人发照片或图片文件，再说明：

> /grit-photos 这张是 2026-11-15，Strength 56，fish 和 star，帮我发布到网站。

或先要求预览：

> /grit-photos 这两张都是 2026-11-15，Cardio 55，fish。先处理，暂不发布。

附件与文字分开发送时，明确它们属于同一批；不要假定网关一定将多条消息自动合并。首次用真实图片验证时，检查附件可读、元数据正确、网页图片生成及构建通过，再按用户的发布指令执行推送。
