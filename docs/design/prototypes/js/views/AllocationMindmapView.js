import { ViewBase } from './ViewBase.js';

export class AllocationMindmapView extends ViewBase {
  render(){
    if(!this.el) return;
    const renderNode = (node) => {
      const childHTML=(node.children||[]).map(renderNode).join('');
      return `<div class="mindmap-branch"><div class="mindmap-node">${node.label||node.name||'(未选择账号)'}</div>${childHTML?`<div class="mindmap-children">${childHTML}</div>`:''}</div>`;
    };
    const tree=this.config?.tree||[];
    const branches=tree.map(renderNode).join('');
    this.el.innerHTML = `
      <div class="mindmap-container">
        <svg class="mindmap-links"></svg>
        <div class="mindmap-central-node">${this.config?.title||'分账预览'}</div>
        <div class="mindmap-branches">${branches}</div>
      </div>
    `;
  }
}
