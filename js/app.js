const video = document.getElementById('video');
const channelList = document.getElementById('channelList');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');

// القنوات مصنفة
const channels = [
    {
        name: "العربية",
        url: "https://live.alarabiya.net/alarabiapublish/alarabiya.smil/playlist.m3u8",
        category: "news"
    },
    {
        name: "فرنسا 24",
        url: "https://cdn.sky1.live/hls/fr24.m3u8",
        category: "news"
    },
    {
        name: "arabia",
        url: "https://live.alarabiya.net/alarabiapublish/alarabiya.smil/playlist.m3u8",
        category: "news"
    },
    {
        name: "beIN SPORTS News",
        url: "http://tv2iptv.com:8000/live/Dylan/Dylan123/3524.m3u8",
        category: "sports"
    }
    // أضف المزيد حسب الحاجة
];

// مشغل HLS
let hls = null;
if (Hls.isSupported()) {
    hls = new Hls();
    hls.attachMedia(video);
} else {
    alert("متصفحك لا يدعم HLS.js. استخدم Google Chrome أو Firefox.");
}

// عرض القنوات حسب التصنيف والبحث
function displayChannels() {
    const searchValue = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    channelList.innerHTML = '';

    channels
        .filter(channel => {
            const matchCategory = selectedCategory === 'all' || channel.category === selectedCategory;
            const matchSearch = channel.name.toLowerCase().includes(searchValue);
            return matchCategory && matchSearch;
        })
        .forEach(channel => {
            const btn = document.createElement('button');
            btn.textContent = channel.name;
            btn.className = 'channel-button';
            btn.onclick = () => {
                if (hls) {
                    hls.loadSource(channel.url);
                    hls.on(Hls.Events.MANIFEST_PARSED, () => {
                        video.play();
                    });
                } else {
                    video.src = channel.url;
                    video.play();
                }
            };
            channelList.appendChild(btn);
        });
}

// أحداث البحث والتصنيف
searchInput.addEventListener('input', displayChannels);
categoryFilter.addEventListener('change', displayChannels);

// أول تشغيل
displayChannels();
