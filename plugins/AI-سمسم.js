import fetch from 'node-fetch';

let handler = async (message, { text, conn, usedPrefix, command }) => {
  try {
    if (!text && (!message.quoted || !message.quoted.text)) {
      return message.reply(
        `⃘࣭ٜ࣪࣪࣪۬☪︎︎︎︎̸─ׅ─ׅ┈ ─๋︩︪──⸕🃏⸔─ׅ─ׅ─ׅ┈ ─๋︩︪─◌⃘࣭ٜ࣪࣪࣪۬☪︎︎︎︎̸
        
*⊹ اهلا انا simsimi انا قليل الأدب كلمني بي إحترام بعد اذنك 🐣*

⧼🎉⧽ مثل:⇊
> *#سمسم جيب بوسه*
> *#سمسم بحبك*

by xvi X Elshamy

◌⃘࣭ٜ࣪࣪࣪۬☪︎︎︎︎̸─ׅ─ׅ┈ ─๋︩︪──⸕🔮⸔─ׅ─ׅ─ׅ┈ ─๋︩︪─◌⃘࣭ٜ࣪࣪࣪۬☪︎︎︎︎̸`
      );
    }

    const queryText = text || message.quoted.text;
    const encodedText = encodeURIComponent(queryText);
    const apiUrl = `https://simsimi-api-xvi.vercel.app/api/simsim?q=${encodedText}`;

    conn.sendPresenceUpdate("composing", message.chat);

    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("تعذر الاتصال بالخدمة. حاول مرة أخرى لاحقًا.");

    const jsonResponse = await response.json();
    
    // تعديل هنا لسحب الرسالة من الرد
    if (!jsonResponse?.message) throw new Error("لم أتمكن من الحصول على إجابة. حاول مرة أخرى.");

    await message.reply(jsonResponse.message);
  } catch (error) {
    console.error("Error:", error.stack || error);
    await message.reply(`❌ حدث خطأ: ${error.message || "يرجى المحاولة لاحقًا."}`);
  }
};

handler.help = ["سمسمي"];
handler.tags = ["AI"];
handler.command = ["سمسمي", "simsimi"];

export default handler;