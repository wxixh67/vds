/*------------------------------
  1. 数据模型：每个链接对象
  ------------------------------*/
const links = [
  {title: "GitHub", url: "https://github.com", icon: "fab fa-github", category: "开发"},
  {title: "Stack Overflow", url: "https://stackoverflow.com", icon: "fab fa-stack-overflow", category: "学习"},
  {title: "掘金", url: "https://juejin.cn", icon: "fas fa-microscope", category: "技术"},
  {title: "知乎", url: "https://www.zhihu.com", icon: "fab fa-zhihu", category: "社交"},
  {title: "腾讯云", url: "https://cloud.tencent.com", icon: "fas fa-cloud", category: "云服务"},
  // 更多链接...
];

/*------------------------------
  2. 渲染函数
  ------------------------------*/
function renderLinks(list = links) {
  const container = document.getElementById('links');
  container.innerHTML = ''; // 清空
  list.forEach(link => {
    const card = `
      <a href="${link.url}" target="_blank" 
        class="flex items-center p-4 rounded-lg bg-white dark:bg-gray-800 shadow hover:shadow-md transition-shadow">
        <i class="${link.icon} text-2xl text-blue-500 mr-3"></i>
        <div>
          <h3 class="font-semibold text-lg">${link.title}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">${link.category}</p>
        </div>
      </a>`;
    container.insertAdjacentHTML('beforeend', card);
  });
}

/*------------------------------
  3. 搜索过滤
  ------------------------------*/
document.getElementById('search').addEventListener('input', e => {
  const keyword = e.target.value.toLowerCase();
  const filtered = links.filter(l => l.title.toLowerCase().includes(keyword));
  renderLinks(filtered);
});

/*------------------------------
  4. 主题切换
  ------------------------------*/
const themeToggleBtn = document.getElementById('theme-toggle');
const themeName = document.getElementById('theme-name');
let dark = localStorage.getItem('dark-theme') === 'true';
function setTheme(isDark) {
  if (isDark) {
    document.documentElement.classList.add('dark');
    themeName.textContent = '🌞 亮色模式';
  } else {
    document.documentElement.classList.remove('dark');
    themeName.textContent = '🌙 夜间模式';
  }
  localStorage.setItem('dark-theme', isDark);
}
setTheme(dark);
themeToggleBtn.addEventListener('click', () => {
  dark = !dark;
  setTheme(dark);
});

/*------------------------------
  5. 初始化渲染
  ------------------------------*/
renderLinks();
