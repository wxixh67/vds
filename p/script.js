// 获取画廊容器
const gallery = document.getElementById('gallery');

// 加载 images.json
fetch('images/images.json')
  .then(response => response.json())
  .then(images => {
    images.forEach(filename => {
      const img = document.createElement('img');
      img.src = `images/${filename}`;
      img.alt = filename;

      // 点击放大
      img.addEventListener('click', () => {
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = 0;
        overlay.style.left = 0;
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.8)';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.cursor = 'pointer';
        overlay.innerHTML = `<img src="${img.src}" style="max-width:90%; max-height:90%;">`;

        overlay.addEventListener('click', () => document.body.removeChild(overlay));

        document.body.appendChild(overlay);
      });

      gallery.appendChild(img);
    });
  })
  .catch(err => console.error('加载图片失败:', err));
