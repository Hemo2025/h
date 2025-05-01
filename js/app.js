const video = document.getElementById('video');
const channelList = document.getElementById('channelList');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');

// القنوات مصنفة
const channels = [
    {
        name: "الجزيرة مباشر",
        url: "https://live-hls-apps-ajm-fa.getaj.net/AJM/index.m3u8",

        category: "news"
    },
    {
        name: "العربية",
        url: "https://live.alarabiya.net/alarabiapublish/alarabiya.smil/alarabiapublish/alarabiya_720p/chunks.m3u8",

        category: "news"
    },
    {
        name: "يمن شباب",
        url: "https://starmenajo.com/hls/yemenshabab/index.m3u8",

        category: "news"
    },
    {
        name: "ام بي سي 1",
        url: "https://d3o3cim6uzorb4.cloudfront.net/out/v1/0965e4d7deae49179172426cbfb3bc5e/index_3.m3u8",
        category: "drama"
    },
    {
        name: "المجد",
        url: "https://5aafcc5de91f1.streamlock.net/almagd.tv/almagd.smil/chunklist_w1219027670_b1500000_t64SEQ=.m3u8",
        category: "news"
    },
    {
        name: "beIN SPORTS 1",
        url: "http://wo0dyefk.dienalt.org/iptv/DV3AC2Q6YSR9XE/6123/index.m3u8",
        category: "sports"
    },
    {
        name: "quran kareem",
        url: "https://al-ekhbaria-prod-dub.shahid.net/out/v1/9885cab0a3ec4008b53bae57a27ca76b/index.m3u8",
        category: "quran"
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
