import fetch from 'node-fetch';
import yts from 'yt-search';
import pkg from '@whiskeysockets/baileys';

const { prepareWAMessageMedia } = pkg;

const handler = async (m, { text, conn, command }) => {
  if (!text) return m.reply('🛑 المرجو إدخال اسم الفيديو أو رابط يوتيوب!');

  try {
    if (command === 'بحث') {
      m.reply('🔍 يتم البحث عن الفيديو، يرجى الانتظار...');
      const searchResults = await yts(text);

      if (!searchResults.videos.length) return m.reply('❌ لم يتم العثور على أي نتائج.');

      const videos = searchResults.videos.slice(0, 10); // عرض أول 10 نتائج
      const sections = [
        {
          title: '🎥 اختر الفيديو لعرض المعلومات',
          rows: videos.map((video, index) => ({
            title: `${index + 1}. ${video.title}`,
            description: `⏳ ${video.timestamp} | 👀 ${video.views.toLocaleString()} مشاهدة`,
            id: `.ytsinfo ${video.url}`
          }))
        }
      ];

      // تجهيز صورة الفيديو الأول
      const imageUrl = videos[0].thumbnail;
      const message = {
        viewOnceMessage: {
          message: {
            interactiveMessage: {
              header: { title: `🔎 نتائج البحث لـ: ${text}` },
              body: { text: 'اختر فيديو من القائمة أدناه لعرض تفاصيله الكاملة.' },
              header: {
                hasMediaAttachment: true,
                ...(await prepareWAMessageMedia({ image: { url: imageUrl } }, { upload: conn.waUploadToServer }))
              },
              contextInfo: { mentionedJid: [m.sender] },
              nativeFlowMessage: {
                buttons: [
                  {
                    name: 'single_select',
                    buttonParamsJson: JSON.stringify({
                      title: '🎥 اختر فيديو',
                      sections
                    })
                  }
                ]
              }
            }
          }
        }
      };

      // إرسال رسالة النتائج مع الأزرار
      await conn.relayMessage(m.chat, message, {});
    }

    if (command === 'ytsinfo') {
      if (!text.startsWith('http')) return m.reply('❌ الرابط غير صالح.');

      // استخراج معرف الفيديو من رابط يوتيوب
      const videoIdMatch = text.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
      if (!videoIdMatch) return m.reply('❌ الرابط غير صالح.');

      const videoId = videoIdMatch[1];

      m.reply('🔄 جارٍ جلب المعلومات، انتظر لحظة...');

      // جلب تفاصيل الفيديو مباشرة عبر معرف الفيديو
      const video = await yts({ videoId });

      if (!video || !video.title) return m.reply('❌ لم يتم العثور على تفاصيل الفيديو.');

      // تجهيز رسالة المعلومات
      const infoMessage = `
📌 *عنوان الفيديو:* ${video.title}
🎥 *القناة:* ${video.author.name}
⏳ *المدة:* ${video.timestamp}
👀 *عدد المشاهدات:* ${video.views.toLocaleString()}
🔗 *الرابط:* ${video.url}
📝 *الوصف:* ${video.description || 'لا يوجد وصف'}
      `.trim();

      // إرسال المعلومات مع الأزرار داخل نفس الرسالة باستخدام sendButton
      await conn.sendButton(
        m.chat,
        infoMessage, // نص الرسالة
        null, // النص الإضافي (فارغ)
        video.thumbnail, // الصورة المصغرة
        [['🌿MP3🌿', `.ytmp3 ${video.url}`], ['🎀MP4🎀', `.ytmp4 ${video.url}`]],
        m
      );
    }
  } catch (error) {
    console.error(error);
    m.reply('❌ حدث خطأ أثناء العملية.');
  }
};

handler.command = /^(بحث|ytsinfo)$/i;

export default handler;