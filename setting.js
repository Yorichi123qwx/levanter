import {watchFile, unwatchFile} from 'fs';
import chalk from 'chalk';
import {fileURLToPath} from 'url';
import fs from 'fs';
import cheerio from 'cheerio';
import fetch from 'node-fetch';
import axios from 'axios';
import https from 'https';
import moment from 'moment-timezone';
import translate from '@vitalets/google-translate-api';
import { prepareWAMessageMedia, generateWAMessageFromContent, getDevice, WAMessageStubType } from '@whiskeysockets/baileys';

/*  */



/*  */
global.cheerio = cheerio;
global.fs = fs;
global.fetch = fetch;
global.axios = axios;
global.https = https;
global.moment = moment;
global.translate = translate;
global.prepareWAMessageMedia = prepareWAMessageMedia;
global.generateWAMessageFromContent = generateWAMessageFromContent;
global.getDevice = getDevice;
global.WAMessageStubType = WAMessageStubType;

/*  */


/*  */

const file = fileURLToPath(import.meta.url);
watchFile(file, () => {
  unwatchFile(file);
  console.log(chalk.redBright('Update \'api.js\''));
  import(`${file}?update=${Date.now()}`);
});
