# Views 目录说明

此目录提供一种“View 架构”的简单落地方式，帮助你把页面逻辑按视图组织，并把可调参数集中在配置文件里，便于快速定位修改。

## 快速开始

- 主要文件：
  - `ViewBase.js`：极简视图基类，包含 `mount/render/bindEvents/applyConfig` 等方法。
  - `config/allocationMindmapConfig.js`：思维导图视图的集中配置（间距、颜色、连线、节点等）。
  - `AllocationMindmapView.js`：把现有 `allocation-mindmap.html` 页面预览封装为可配置视图示例。

## 如何修改参数（新手友好）

- 打开 `config/allocationMindmapConfig.js`，搜索 `EDIT HERE`，所有可改项都在此文件：
  - `orientation` 布局方向（当前页面实现的是纵向）。
  - `spacing.levelGap/siblingGap` 控制父子间距与同级间距。
  - `link.strokeWidth/color/curvature` 控制预览连线的样式。
  - `node.borderColor/radius/paddingX/paddingY` 控制节点的边框与内边距。
  - `deposit.showInPreviewBadge/showInNodeLabel` 控制保证金信息是否显示（需要页面元素提供类名配合）。

## 如何在页面里使用

在 `allocation-mindmap.html` 的 `<script>` 末尾引入：

```html
<script type="module">
  import { AllocationMindmapView } from './js/views/AllocationMindmapView.js';
  import { allocationMindmapConfig } from './js/views/config/allocationMindmapConfig.js';
  // 实例化并挂载到预览容器（不会改变既有渲染逻辑）
  const view = new AllocationMindmapView(allocationMindmapConfig);
  // 页面切到预览时调用一次（示例）：
  if (document.getElementById('preview')) {
    view.mount('#preview');
  }
}
</script>
```

> 注意：为避免侵入现有逻辑，视图只在渲染后应用样式（如连线颜色/间距等）。若需更强接入（比如隐藏某些拼接文本），建议给相应 DOM 添加类名，再在视图中控制显示/隐藏。

## 面向进阶的建议

- 将每个页面拆分为一个视图，并把“可调参数”全部收敛到 `config/*.js`。
- 事件绑定统一写在 `bindEvents()`，渲染结构统一写在 `render()`，避免逻辑散落。
- 若你想统一主题样式，可新增 `config/theme.js` 并由各视图引用。