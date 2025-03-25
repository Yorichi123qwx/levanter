/*By yoeichi 
name: elshamy
channel: */

import fetch from 'node-fetch';

const handler = async (m, { text, conn, command, args }) => {
  try {
    if (!args.length) {
      return await m.reply("❌ يرجى توفير رابط أغنية من Spotify.");
    }

    let url = args[0];
    if (!url.includes("spotify.com/track/")) {
      return await m.reply("❌ الرابط غير صالح، يرجى إدخال رابط صحيح لأغنية من Spotify.");
    }

    let apiUrl = `https://takamura-api.joanimi-world.site/api/download/spotify?url=${encodeURIComponent(url)}`;
    let response = await fetch(apiUrl);
    let data = await response.json();

    if (!data.status || !data.file_url) {
      return await m.reply("❌ لم يتم العثور على رابط التحميل.");
    }

    let audioUrl = data.file_url;
    
    await conn.sendMessage(m.chat, { 
      audio: { url: audioUrl }, 
      mimetype: 'audio/mp4' 
    }, { quoted: m });

  } catch (error) {
    console.error("Error:", error);
    await m.reply("❌ حدث خطأ أثناء تنفيذ الأمر.");
  }
};

handler.help = ["spotifydl"];
handler.tags = ["music"];
handler.command = ['spotifydl', 'سبوتيفاي_تحميل'];

export default handler;