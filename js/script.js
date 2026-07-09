// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// 主题切换
(function() {
    const STORAGE_KEY = 'theme-preference';
    const THEME_ATTR = 'data-theme';

    function getEffectiveTheme() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'light' || stored === 'dark') {
            return stored;
        }
        // 跟随系统：用 matchMedia 检测
        return window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark' : 'light';
    }

    // 应用主题到 <html>
    function applyTheme(mode) {
        if (mode === 'light' || mode === 'dark') {
            document.documentElement.setAttribute(THEME_ATTR, mode);
            localStorage.setItem(STORAGE_KEY, mode);
        } else {
            // mode === 'system'：移除属性，让 CSS 媒体查询接管
            document.documentElement.removeAttribute(THEME_ATTR);
            localStorage.removeItem(STORAGE_KEY);
        }
    }

    // 更新按钮的图标和文字
    function updateButtonIcon(btn) {
        const stored = localStorage.getItem(STORAGE_KEY);
        const effective = getEffectiveTheme();

        if (!stored) {
            // 跟随系统
            btn.textContent = '🌓';
            btn.title = '当前：跟随系统（' + (effective === 'dark' ? '暗色' : '亮色') + '）\n点击切换为亮色模式';
        } else if (stored === 'light') {
            btn.textContent = '☀️';
            btn.title = '当前：亮色模式\n点击切换为暗色模式';
        } else if (stored === 'dark') {
            btn.textContent = '🌙';
            btn.title = '当前：暗色模式\n点击切换为跟随系统';
        }
        else {
            // 不应该出现其他值，作为兜底
            btn.textContent = '❓';
            btn.title = '当前：未知模式\n点击切换';
        }
    }

    // 页面加载时：应用存储的偏好（默认跟随系统 — 无存储时走 else 分支）
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
        applyTheme(saved);
    }
    // saved 为 null 时不设置属性，CSS media query 自动接管

    // DOM 渲染完后绑定事件
    document.addEventListener('DOMContentLoaded', function() {
        const btn = document.getElementById('theme-toggle');
        if (!btn) return;

        updateButtonIcon(btn);

        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const current = localStorage.getItem(STORAGE_KEY);

            // 三态循环：light → dark → system → light
            if (current === 'light') {
                applyTheme('dark');
            } else if (current === 'dark') {
                applyTheme('system');
            } else {
                // current 为 null（跟随系统），切到 light
                applyTheme('light');
            }

            updateButtonIcon(btn);
        });

        // 监听系统主题变化，实时更新按钮 title
        const darkModeMedia = window.matchMedia('(prefers-color-scheme: dark)');
        darkModeMedia.addEventListener('change', function() {
            updateButtonIcon(btn);
        });
    });
})();