// 1. 读取 JSON 渲染
fetch('data/links.json')
  .then(res => res.json())
  .then(renderLinks)
  .catch(console.error);

function renderLinks(data) {
  const container = document.getElementById('linkContainer');
  let html = '';

  data.forEach(block => {
    html += `
      <h4 class="mt-4">${block.category}</h4>
      <div class="row">`;
    block.items.forEach(link => {
      html += `
        <div class="col-6 col-sm-4 col-md-3 col-lg-2 mb-3">
          <a href="${link.url}" class="card card-link h-100" target="_blank">
            <div class="card-body text-center">
              <img src="${link.logo}" alt="" width="32" height="32" class="mb-2"/>
              <div class="card-title small">${link.name}</div>
            </div>
          </a>
        </div>`;
    });
    html += `</div>`;
  });

  container.innerHTML = html;
}

// 2. 搜索事件
document.getElementById('searchForm').addEventListener('submit', e => {
  e.preventDefault();
  const q = document.getElementById('searchInput').value.trim();
  if (q) window.open(`https://www.google.com/search?q=${encodeURIComponent(q)}`);
});

// 3. 可选：暗黑模式 (localStorage)
const toggleDark = () => {
  document.documentElement.classList.toggle('dark-mode');
  localStorage.setItem('dark', document.documentElement.classList.contains('dark-mode'));
};
if (JSON.parse(localStorage.getItem('dark'))) toggleDark();

// 让你自己在 navbar 上加一个 “🌗” 按钮手动切换即可