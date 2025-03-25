/*حقوق المطور: 𝑷𝒂𝒑𝒍𝒐 𝒄𝒐𝒅𝒊𝒏𝒈
رقمي: 201063510519
قناتي: https://whatsapp.com/channel/0029VapvokVCHDyj6inRiP3T
جروب دعم البوت: https://chat.whatsapp.com/JCbqYGXJo0JB59tHDGK1n3
تابع روابطي🧚‍♂️*/


case'طلاق': {
				if (!m.isGroup) return m.reply(mess.group)
				let member = (store.groupMetadata[m.chat].participants || m.metadata.participants).map(a => a.id)
				let jadian1 = pickRandom(member)
				let jadian2 = pickRandom(member)
				m.reply(`\n@${jadian1.split('@')[0]} *طـلقـهــا بالـتــلاتـة لـو عندك دم 🥹* @${jadian2.split('@')[0]} *مـتــزعـلــيـش 😹 هــجــوزڪ سـيــد سـيـدو*`);
			}
		        	break