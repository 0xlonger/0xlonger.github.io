document.getElementById('author-button-container').addEventListener('click', function(e) {
    const btn = e.target.closest('[data-author]');
    if (btn) {
        switchToSystem(btn.dataset.author);
    }
});

function switchToSystem(author) {
    // 切换按钮的选中状态
    document.querySelectorAll('[data-author]').forEach(el => {
        // 只处理button
        if (el.tagName === 'BUTTON') {
            const isTarget = el.dataset.author === author;
            el.setAttribute('aria-selected', isTarget ? 'true' : 'false');
        }
    });
    // 切换系统面板显示状态
    document.querySelectorAll('.system-panel').forEach(panel => {
        panel.classList.toggle('hidden', panel.dataset.author !== author);
    });
}