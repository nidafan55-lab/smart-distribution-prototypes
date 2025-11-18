/*
 * AllocationMindmapView.js
 * 将现有 allocation-mindmap 页面封装为一个视图示例，集中应用配置。
 * 不改动原有功能，只在渲染完成后应用样式与间距参数，方便你调整。
 */
import { ViewBase } from './ViewBase.js';
import { allocationMindmapConfig as defaultConfig } from './config/allocationMindmapConfig.js';

export class AllocationMindmapView extends ViewBase {
  constructor(config = {}) {
    super({ ...defaultConfig, ...config });
  }

  // 视图挂载点建议传入 '#preview' 容器（树状预览）
  render() {
    // 这里不改动页面 DOM 结构，只做引用缓存
    this.preview = document.getElementById('preview');
    this.container = this.preview?.querySelector('.mindmap-container') || this.preview;
  }

  bindEvents() {
    // 视图无额外交互，若需要可在此绑定（例如切换布局开关）
  }

  applyConfig() {
    if (!this.preview) return;
    const cfg = this.config;

    // 1) 间距应用：调整一级/子级间距（通过修改相应容器的 gap）
    const branches = this.preview.querySelector('.mindmap-branches');
    const childrenLists = this.preview.querySelectorAll('.mindmap-children');
    if (branches) branches.style.gap = (cfg.spacing?.siblingGap ?? 24) + 'px';
    childrenLists.forEach(el => { el.style.gap = (cfg.spacing?.siblingGap ?? 24) + 'px'; });

    // 2) 节点样式：边框圆角与内边距
    const nodes = this.preview.querySelectorAll('.mindmap-node');
    nodes.forEach(el => {
      el.style.borderRadius = (cfg.node?.radius ?? 8) + 'px';
      el.style.padding = `${cfg.node?.paddingY ?? 8}px ${cfg.node?.paddingX ?? 12}px`;
      el.style.borderColor = cfg.node?.borderColor ?? '#e5e7eb';
    });

    // 3) 连线样式：在 drawMindmapLinks 执行后，统一修改 path 的样式
    const svg = this.preview.querySelector('.mindmap-links');
    if (svg) {
      svg.querySelectorAll('path').forEach(p => {
        p.setAttribute('stroke', cfg.link?.color ?? '#9ca3af');
        p.setAttribute('stroke-width', cfg.link?.strokeWidth ?? 1.5);
      });
    }

    // 4) 预览顶部徽章与节点标签的保证金显示（当前页面是字符串拼装，难以精准选择）
    // 这里仅作为占位：若你希望隐藏，可后续在页面里为“保证金”文本加上类名，再在此控制显示/隐藏。
    // 示例：给徽章里的保证金元素加类 .deposit-badge，然后：
    // const badges = this.preview.querySelectorAll('.deposit-badge');
    // badges.forEach(b => b.style.display = cfg.deposit?.showInPreviewBadge ? '' : 'none');
  }
}