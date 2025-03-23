# Dota2 开发工具集 | Dota2 Development Toolkit

这是一个为Dota2自定义游戏开发提供的工具集合，包含多个实用的开发组件和工具库。

This is a toolkit for Dota2 custom game development, containing multiple practical development components and utility libraries.

## 包列表 | Package List

### [@mobilc/panorama-react-dom](./packages/panorama-dom/README.md)
> React for Valve's Panorama UI (for Dota 2 Custom Games).

为Dota2自定义游戏的全景图UI提供React支持，让你能够使用React来开发Panorama界面。

### [@mobilc/panorama-polyfill](./packages/panorama-polyfill/README.md)
> Polyfills for common JavaScript features for Valve's Panorama UI.

为Panorama UI提供常用的JavaScript特性支持，增强开发体验。

### [vlua-tool](./packages/vlua-tool/readme.md)
> 一个为Dota2自定义游戏开发提供便利功能的TypeScript/Lua工具库。

提供了一系列实用的TypeScript和Lua工具函数，简化游戏开发流程。

### dota-axios
> HTTP Request Library | HTTP请求库

为Dota2自定义游戏提供请求功能，自定义前后端通信。

Provide request functionality for Dota 2 custom games, customizing front-end and back-end communication.

### dota-router
> Router Library | 路由库

用于管理游戏内的路由跳转，提供清晰的页面导航结构。

Manages in-game route navigation, providing a clear page navigation structure.

### panorama-cli
> Panorama Development Tool | 全景图开发工具

提供全景图UI开发相关的命令行工具，优化开发工作流。

Provides command-line tools for Panorama UI development, optimizing the development workflow.

### five_cloud
> Cloud Service SDK | 云服务SDK

提供云服务集成功能，方便接入各类在线服务。

Provides cloud service integration functionality, making it easy to connect with various online services.

## 安装 | Installation

本仓库使用pnpm作为包管理工具，采用monorepo结构管理多个包。

This repository uses pnpm as the package manager and adopts a monorepo structure to manage multiple packages.

```bash
# 安装pnpm
npm install -g pnpm

# 安装依赖
pnpm install
```

## 使用说明 | Usage

每个包都有其独立的使用说明文档，请点击对应包名查看详细文档。

Each package has its own documentation. Please click on the package name to view detailed documentation.

## 开发 | Development

```bash
# 构建所有包
pnpm run build

# 运行测试
pnpm test
```