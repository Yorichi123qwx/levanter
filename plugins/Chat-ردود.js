let handler = m => m; 
  
 handler.all = async function (m) { 
   let chat = global.db.data.chats[m.chat]; 
   let responses; 
   if (/^تست|.تست|تستو$/i.test(m.text)) { 
     responses = [ 
       '*شغال يحب والدنيا فل〔😋〕*',  
       '*شغال والدنيا فل〔😎〕*'
     ]; 
} else if (/^السلام عليكم|سلام عليكم$/i.test(m.text)) { 
     responses = [ 
       '*وعليكم السلام〔🥰〕*',  
          'وعليكم السلام نورت〔🫣〕'
     ]; 
   }else if (/^اسكت|اخرص|.اخرص|اهدى|اتخرص$/i.test(m.text)) { 
     responses = [ 
       '*خلاص هسكت خالص اهو〔😞〕*',  
          ' *حاضر هسكت〔😔〕*'  
     ]; 
       }else if (/^تيك|.تيك$/i.test(m.text)) { 
     responses = [ 
       '┓─────────────────┏\n┊ *〔إبعت رابط الفيديو لوحدو يا حب〕*\n┊ *〔بدون أوامر...فقط رابط الفيديو〕*\n┛─────────────────┗'
     ]; 
    }  
   if (responses) { 
     let randomIndex = Math.floor(Math.random() * responses.length); 
     conn.reply(m.chat, responses[randomIndex], m); 
   } 
   return !0 
 }; 
  
 export default handler;