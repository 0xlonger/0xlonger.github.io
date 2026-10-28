fetch('/partials/ad.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('ad').innerHTML = data;
    initLongerMC();
  })
  .catch(error => {
    console.error('Error loading ad:', error);
  })

// 官方推荐：LongerMC 卡片（复制服务器地址 + 在线人数）
function initLongerMC() {
  const card = document.getElementById('lmc');
  if (!card) return;

  // 复制服务器地址
  const copyBtn = card.querySelector('[data-lmc-copy]');
  const copyLabel = copyBtn.querySelector('span');
  copyBtn.addEventListener('click', () => {
    const text = copyBtn.dataset.lmcCopy;
    const show = ok => {
      copyLabel.textContent = ok ? '已复制' : '请手动复制';
      copyBtn.classList.toggle('is-copied', ok);
      setTimeout(() => {
        copyLabel.textContent = '复制';
        copyBtn.classList.remove('is-copied');
      }, 1800);
    };
    copyText(text).then(() => show(true), () => show(false));
  });

  // 在线人数：卡片快滚到眼前时才请求一次，拿不到就不显示
  const live = card.querySelector('.lmc-live');
  const loadStatus = () => {
    const ctrl = new AbortController();
    setTimeout(() => ctrl.abort(), 8000);
    fetch('https://api.mcsrvstat.us/3/play.mc.longer.xin', { signal: ctrl.signal })
      .then(response => {
        if (!response.ok) throw new Error('HTTP ' + response.status);
        return response.json();
      })
      .then(data => {
        const players = data.players || {};
        const count = players.max ? `${players.online || 0} / ${players.max}` : `${players.online || 0}`;
        live.lastElementChild.textContent = data.online ? `服务器在线 · ${count} 位玩家` : '服务器维护中';
        live.classList.toggle('off', !data.online);
        live.hidden = false;
      })
      .catch(() => {});
  };

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      io.disconnect();
      loadStatus();
    }, { rootMargin: '200px' });
    io.observe(card);
  } else {
    loadStatus();
  }
}

function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
  }
  return fallbackCopy(text);
}

function fallbackCopy(text) {
  return new Promise((resolve, reject) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.cssText = 'position: fixed; top: -1000px; opacity: 0;';
    document.body.appendChild(textarea);
    textarea.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    textarea.remove();
    ok ? resolve() : reject(new Error('copy failed'));
  });
}
