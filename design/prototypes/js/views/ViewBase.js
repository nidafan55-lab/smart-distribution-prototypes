/*
 * ViewBase.js
 * 一个极简可读的 View 架构基类，帮助你按“视图”组织页面逻辑。
 * 使用方式：继承 ViewBase，实现 render() 与 bindEvents() 等方法。
 * 
 * 关键设计：
 * - mount(container): 挂载视图到指定容器或选择器
 * - render(): 渲染视图结构（DOM），只负责生成与更新 UI
 * - bindEvents(): 绑定交互事件，避免将事件散落在各处
 * - setConfig(cfg): 更新配置（例如样式/间距/颜色等），并触发应用
 * - applyConfig(): 将配置变更应用到 DOM 或样式
 * - destroy(): 解绑事件、清理 DOM 引用
 * 
 * 约定：
 * - this.config 内的字段都应在注释中说明用途，便于快速定位修改
 * - render() 与 applyConfig() 分离，保证结构与样式逻辑清晰
 */
export class ViewBase {
  constructor(config = {}) {
    this.container = null; // 容器元素引用
    this.config = config;  // 视图配置（你可以通过 setConfig 动态更新）
    this._bound = false;   // 是否已绑定事件
  }

  // 将视图挂载到容器；支持传入选择器或 DOM 节点
  mount(containerOrSelector) {
    const el = typeof containerOrSelector === 'string'
      ? document.querySelector(containerOrSelector)
      : containerOrSelector;
    if (!el) throw new Error('ViewBase.mount: 容器不存在');
    this.container = el;
    this.render();
    this.applyConfig();
    this.bindEvents();
    this._bound = true;
  }

  // 供子类实现：渲染 DOM 结构或更新已有结构
  render() {}

  // 供子类实现：绑定交互事件（只绑定一次）
  bindEvents() {}

  // 更新配置并应用
  setConfig(cfg = {}) {
    this.config = { ...this.config, ...cfg };
    this.applyConfig();
  }

  // 供子类实现：根据配置更新样式或状态
  applyConfig() {}

  // 解绑事件与清理（视图销毁）
  destroy() {
    if (!this.container) return;
    // 子类可在这里解除事件监听、清理定时器等
    this.container = null;
    this._bound = false;
  }
}