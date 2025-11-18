/*
 * allocationMindmapConfig.js
 * 思维导图/树状图视图的集中配置。你只需要改这里的值即可生效。
 *
 * 修改提示：每个字段都配了中文注释，搜索 “EDIT HERE” 可快速定位可改项。
 */
export const allocationMindmapConfig = {
  /* EDIT HERE: 布局方向。可选 'vertical' | 'horizontal'（目前页面实现的是纵向） */
  orientation: 'vertical',

  /* EDIT HERE: 间距设置（单位：px） */
  spacing: {
    levelGap: 24,   // 父子层级之间的垂直间距
    siblingGap: 24, // 同一层级的横向间距
  },

  /* EDIT HERE: 连线样式 */
  link: {
    strokeWidth: 1.5,       // 线宽
    color: '#9ca3af',       // 线颜色（Tailwind gray-400）
    curvature: 0.35,        // 贝塞尔曲线弯曲程度（0~1，越大越弯）
  },

  /* EDIT HERE: 节点样式 */
  node: {
    borderColor: '#e5e7eb', // 边框颜色（Tailwind gray-200）
    radius: 8,              // 圆角半径（px）
    paddingX: 12,           // 水平内边距（px）
    paddingY: 8,            // 垂直内边距（px）
  },

  /* EDIT HERE: 保证金显示相关（当前页面已显示，是否参与计算待确认） */
  deposit: {
    showInPreviewBadge: true, // 在预览顶部账目徽章显示保证金
    showInNodeLabel: true,    // 在节点标签中显示“保:¥”信息
  },
};