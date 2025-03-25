import axios from "axios";

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply("◈─🍷〘ՏᑭIᗪᗴᖇ ᗷOT〙🍷─◈\n\n┊ *أين رابط الفيديو يا حب🥰*\n┊ *الأمر (رابط الفيديو)*\n\n◈─🍷〘ՏᑭIᗪᗴᖇ ᗷOT〙🍷─◈");

    try {
        m.reply("جاري التحميل إنتظر..");

        const { medias, title } = await pindl(text);

        // Validate the response structure
        if (!medias || !Array.isArray(medias)) throw "خطأ..! في جلب معلومات الفيديو";

        // Filter for MP4 media
        let mp4 = medias.filter(v => v.extension === "mp4");

        if (mp4.length > 0) {
            const size = formatSize(mp4[0].size); // Format the size here
            await conn.sendMessage(
                m.chat,
                { 
                    video: { url: mp4[0].url }, 
                    caption: `\`${title}\`\nالجودة: ${mp4[0].quality}\nالحجم: ${size}` 
                },
                { quoted: m }
            );
        } else if (medias[0]) {
            // Fallback to the first available media
            await conn.sendFile(m.chat, medias[0].url, '', `\`${title}\``, m);
        } else {
            throw "No downloadable media found for the provided link.";
        }
    } catch (e) {
        throw `An error occurred: ${e}`;
    }
};

handler.help = ["pinterest"];
handler.command = /^(بينترست|بنتر|بينتر|بنترست|pin|pinterst|pinter)$/i;
handler.tags = ["downloader"];

export default handler;

async function pindl(url) {
    try {
        const apiEndpoint = 'https://pinterestdownloader.io/frontendService/DownloaderService';
        const params = { url };
        
        // Fetch the data from the API
        let { data } = await axios.get(apiEndpoint, { params });
        
        // Ensure the response structure is as expected
        if (!data || !data.medias) throw "خطأ في الإستجابة.";
        
        return data;
    } catch (e) {
        console.error("Error in pindl function:", e.message);
        throw "اووبس خطأ غير متوقع🫠\nمعلش يحب حاول مرة تانية.";
    }
}

// Helper function to format file size
function formatSize(bytes) {
    if (bytes === 0) return "0 B";
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}