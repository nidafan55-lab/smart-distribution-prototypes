// 主JavaScript文件，提供基本交互功能

// 侧边栏切换
document.addEventListener('DOMContentLoaded', function() {
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', function() {
      sidebar.classList.toggle('hidden');
      sidebar.classList.toggle('md:block');
    });
  }

  // 初始化下拉菜单
  const dropdowns = document.querySelectorAll('.dropdown-toggle');
  dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', function(e) {
      e.preventDefault();
      const menu = this.nextElementSibling;
      menu.classList.toggle('hidden');
    });
  });

  // 点击页面其他地方关闭下拉菜单
  document.addEventListener('click', function(e) {
    dropdowns.forEach(dropdown => {
      if (!dropdown.contains(e.target)) {
        const menu = dropdown.nextElementSibling;
        if (menu && !menu.classList.contains('hidden')) {
          menu.classList.add('hidden');
        }
      }
    });
  });

  // 标签页切换
  const tabButtons = document.querySelectorAll('[data-tab]');
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');
      
      // 隐藏所有标签内容
      document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.add('hidden');
      });
      
      // 取消所有标签按钮的激活状态
      document.querySelectorAll('[data-tab]').forEach(btn => {
        btn.classList.remove('bg-blue-500', 'text-white');
        btn.classList.add('bg-gray-200', 'text-gray-700');
      });
      
      // 显示当前标签内容
      document.getElementById(tabId).classList.remove('hidden');
      
      // 激活当前标签按钮
      this.classList.remove('bg-gray-200', 'text-gray-700');
      this.classList.add('bg-blue-500', 'text-white');
    });
  });

  // 模态框功能
  const modalTriggers = document.querySelectorAll('[data-modal-target]');
  const modalCloseButtons = document.querySelectorAll('[data-modal-close]');
  
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
      const modalId = this.getAttribute('data-modal-target');
      const modal = document.getElementById(modalId);
      
      if (modal) {
        modal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
      }
    });
  });
  
  modalCloseButtons.forEach(button => {
    button.addEventListener('click', function() {
      const modal = this.closest('.modal');
      
      if (modal) {
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      }
    });
  });

  // 点击模态框背景关闭模态框
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        this.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      }
    });
  });

  // 表格排序功能
  const sortableHeaders = document.querySelectorAll('th[data-sort]');
  sortableHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const sortKey = this.getAttribute('data-sort');
      const sortDirection = this.getAttribute('data-direction') || 'asc';
      
      // 切换排序方向
      const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
      this.setAttribute('data-direction', newDirection);
      
      // 更新排序图标
      sortableHeaders.forEach(h => {
        h.querySelector('.sort-icon').innerHTML = '<i class="fas fa-sort text-gray-400"></i>';
      });
      
      const iconClass = newDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down';
      this.querySelector('.sort-icon').innerHTML = `<i class="fas ${iconClass} text-blue-500"></i>`;
      
      // 这里可以添加实际的表格排序逻辑
      console.log(`Sorting by ${sortKey} in ${newDirection} order`);
    });
  });
});