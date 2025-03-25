import pkg from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto, prepareWAMessageMedia } = pkg

var handler = async (m, { conn, usedPrefix }) => {
const hekma = ['اقبل كل التغيرات في حياتك ولا تقبل ان يتغير عليك احد.', 'لا مزيد من التعلم. المعرفة هي أداة قوية', 'أن العناية بصحتك الجسدية والعقلية هي أساسيات لحياة كاملة.', '"استمتع بالأشياء الصغيرة، يمكنها ان صبح كليره في يوم من الايام.', 'احصل على التسامح، حتى تتمكن من الحصول على نفس الشيء، لتحرير قلب.', 'ن قيمة الوقت الذي تقضيه مع شغفك هو الهدية الأكثر قيمة التي يمكنك الحصول عليها واستلامها.', 'كن ودودًا ورحيمًا مع الناس، فكل عمل مرتبط يمكنه أن يحدث فرقًا في حياتك.', 'اتخذ قرارًا بـ لا عندما تحتاج إلى ذلك، وحدد حدودًا جديرة بالثناء.', 'لا تقارن بأشياءك، كل شخص لديه طريقته الخاصة وروحه في الحياة.', 'استمع إلى زوجك بالتعاطف والفهم، فالتواصل هو أساس علاقة قوية.', 'تحاول التعبير عن مشاعرك، الصدق ضروري في الحب.', 'تعلم الأرز والتسوية، الحب يتطلب التضحية والبذل المتبادل', 'ان تخلي عنك الكل ف لا تيئس انت الأفضل', 'كل شخص لديه ميزه خارقه اجتهد لتعرف ميزتك', ' قم باخيار الخيارات الصعبه ف هي دائما الأفضل.', 'تذكر أن العلاقة مبنية على الثقة المتبادلة والاحترام', 'اختر شخصًا يكملك وسيكون إصدارًا أفضل لنفسك', 'الحب الحقيقي لن يصبح أقل، بل سيصبح أكثر.', 'عمار هو فعل، هو اختيار يوميات يتم زراعته بالأفعال والألفاظ.', 'إذا كنت استباقيًا وتؤدي إلى المبادرة في عملك، فهذا سيكون ذا قيمة من جانب تفوقك.', 'اتعرف بي أخطائك وإخفاقاتك، وستكون لديك فرص للنمو وتحسينها.', 'واجب عليك الصلي اليوميه لتستطيع تحقيق احلامك لان الله قادر علي كل شئ.', 'مية العلاقات الجيدة مع زملائك، فالعمل في الفريق ضروري لتحقيق النجاح','لا تجهد نفسك في البحث عن المساعدة أو البحث عن الإرشاد، دائمًا ما يكون هناك شيء جديد تتعلمه','تعرف على شعاراتك وقيمتها، واحتفل بنجاحاتك من خلال القليل منها','ابحث عن التوازن بين حياتك المهنية والشخصية، مع الجوانب المهمة'];
const randomImage = hekma[Math.floor(Math.random() * hekma.length)];
const url = ['https://files.catbox.moe/mweqwv.jpg'
             ]; 
  const random = url[Math.floor(Math.random() * url.length)];
   var messa = await prepareWAMessageMedia({ image: { url: random } }, { upload: conn.waUploadToServer });
let msg = generateWAMessageFromContent(m.chat, {
  viewOnceMessage: {
    message: {
        "messageContextInfo": {
          "deviceListMetadata": {},
          "deviceListMetadataVersion": 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: `*${randomImage}*\n◈─💓〘حكمة〙💓─◈`
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: ""
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            title: "◈─💓〘حكمة〙💓─◈",
            subtitle: "",
            hasMediaAttachment: true, 
            imageMessage: messa.imageMessage, 
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [
              {
                "name": "quick_reply",
                "buttonParamsJson": "{\"display_text\":\"┊🎡⧼واحدة كمان⧽🎡┊\",\"id\":\".حكمه\"}" 
                }
              ],
          })
        })
    }
  }
}, {})

await conn.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id })

} 
handler.tags = ['frasss'];
handler.command = ['حكمه','حكمة'];
export default handler; 
