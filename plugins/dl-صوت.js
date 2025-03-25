import fetch from 'node-fetch';

const handler = async (m, { text, conn }) => {
  if (!text) return m.reply('🛑 المرجو إدخال رابط يوتيوب!');

  const apiUrl = `https://takamura-api.joanimi-world.site/api/download/savetube/ytmp3?url=${encodeURIComponent(text)}`;
  
  try {
    const res = await fetch(apiUrl);
    const json = await res.json();

    if (!json.downloadUrl) return m.reply('❌ فشل في جلب رابط التحميل.');

    let caption = `🎵 *تم التحميل بنجاح*\n\n`;
    caption += `📌 *العنوان:* ${json.title}\n`;
    caption += `🔊 *الجودة:* ${json.quality}kbps\n`;

    await conn.sendMessage(m.chat, { audio: { url: json.downloadUrl }, mimetype: 'audio/mp4', ptt: false }, { quoted: m });
  } catch (error) {
    console.error(error);
    m.reply('❌ حدث خطأ أثناء جلب الصوت.');
  }
};

handler.command = ["مقطع","ytmp3"];

export default handler;