let handler = async (m, { conn }) => {
  let vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:┊🩸⧼YOᖇIᑕᕼI ᗰᐯᒪ⧽🩸┊\nTEL;type=CELL:${global.owner[0]}\nEND:VCARD`;
  
  let message = `
 ╮━─معلومات المطور─━─╭
 ┊الإسم: محمد أحمد الشامي
 ┊اللقب: يوريتشي
 ┊التيم:MVL
 ╯━─━─━─━─━─━━─╰
> 〔↓من فضلك قبل الدخول↓〕
 ╮━─━─━─━─━─━━─━╭
 ┊إشتراك البوت في الشهر 1دولار
 ┊من فضلك ان كنت لا تريد الدفع
 ┊لا تدخل الى المطور
 ╯━─━─━─━─━─━━─━╰`;

  await conn.sendMessage(m.chat, { 
    contacts: { 
      displayName: "┊🩸⧼YOᖇIᑕᕼI ᗰᐯᒪ⧽🩸┊", 
      contacts: [{ vcard }]
    }
  });

  await conn.sendMessage(m.chat, { text: message }, { quoted: m });
};

handler.command = ['المطور', 'المالك', 'المؤسس'];
export default handler;
