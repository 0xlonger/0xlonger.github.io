const notFoundPageResources = [
    {
        image: '/assets/images/backgrounds/404/范进中举.webp',
        mobileImage: '/assets/images/backgrounds/404/范进中举.webp', 
        title: '噫！不好！页面不见了！',
        subtitle: '说着，往后一跤跌倒，牙关咬紧，不省人事。',
        button: '返回首页',
        pageTitle: '404 噫！不好！页面不见了！'
    },
    {
        image: '/assets/images/backgrounds/404/穿山甲.webp',
        mobileImage: '/assets/images/backgrounds/404/穿山甲.webp',
        title: '我滴……页面……不见了！',
        subtitle: '奶奶滴！给我玩阴滴是罢！直接来罢！',
        button: '直接返回首页罢！',
        pageTitle: '404 我滴……页面……不见了！'
    },
    {
        image: '/assets/images/backgrounds/404/郝哥.webp',
        mobileImage: '/assets/images/backgrounds/404/郝哥.webp',
        title: '我开网站的，能给你不存在的页面？',
        subtitle: '404，找不到。你要不要吧！',
        button: '回首页行吗？',
        pageTitle: '404 找不到页面'
    },
    {
        image: '/assets/images/backgrounds/404/你被骗了.webp',
        mobileImage: '/assets/images/backgrounds/404/你被骗了.webp',
        title: '你被骗了！',
        subtitle: '这个网页不存在！',
        button: '返回首页',
        pageTitle: '404 你被骗了！'
    }
];

(function() {
    // 随机抽取
    const resource = notFoundPageResources[Math.floor(Math.random() * notFoundPageResources.length)];

    const notfoundElement = document.getElementById('notfound');
    if (notfoundElement) {
        const isMobile = window.innerWidth <= 768;
        const image = isMobile && resource.mobileImage ? resource.mobileImage : resource.image;
        notfoundElement.style.backgroundImage = `url('${image}')`;
    }

    // 设置文字
    document.getElementById('title-404').textContent = resource.title;
    document.getElementById('subtitle-404').textContent = resource.subtitle;
    document.getElementById('btn-404').textContent = resource.button;

    // 设置标签页标题
    document.title = resource.pageTitle;
})();