// 搜索引擎配置
const searchEngines = {
    baidu: 'https://www.baidu.com/s?wd=',
    google: 'https://www.google.com/search?q=',
    bing: 'https://www.bing.com/search?q='
};

// 搜索功能
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const searchEngine = document.getElementById('searchEngine');

function performSearch() {
    const query = searchInput.value.trim();
    if (query) {
        const engine = searchEngine.value;
        const searchUrl = searchEngines[engine] + encodeURIComponent(query);
        window.open(searchUrl, '_blank');
    }
}

searchBtn.addEventListener('click', performSearch);

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// 主题切换
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// 检查本地存储的主题设置
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
});

// 添加平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// 统计访问次数（可选）
let visitCount = localStorage.getItem('visitCount') || 0;
visitCount++;
localStorage.setItem('visitCount', visitCount);
console.log(`这是您第 ${visitCount} 次访问！`);