const { GoogleGenAI } = require('@google/generative-ai');
require('dotenv').config();

// System prompt guide for Gemini
const SYSTEM_PROMPT = `
You are a tech hardware expert assistant for GeekShop. 
You help customers choose products from our catalog of 17 items including bootable USBs, network cards, Arduino boards, displays, sensor kits, and GPS modules. 
Always recommend specific products from our inventory with prices in VND.
Our inventory includes:
1. Penguin 31-in-1 Multi-Boot USB (128GB) - 920,097 VND
2. Xtssui 64GB Bootable USB Drive 3.2 - 590,000 VND
3. Xtssui 32GB Bootable Windows USB 3.2 - 420,000 VND
4. VIMIN 10G PCI-E Network Card (X540-T2) - 1,417,091 VND
5. BrosTrend 5Gbps PCIe Network Card - 890,000 VND
6. UGREEN Cat 8 Ethernet Cable 6FT - 183,809 VND
7. Arduino® UNO™ Q 4GB [ABX00173] - 1,551,464 VND
8. LinksTek X520 DA1 SFP+ Fiber Card - 1,051,577 VND
9. ULANSeN 10Gb Open SFP+ PCIe Card - 893,801 VND
10. Arduino GIGA Display Shield - 1,672,426 VND
11. Hosyond 5 Pcs 0.91" I2C OLED Module - 367,881 VND
12. Hosyond 3pcs I2C 1602 LCD Module - 341,585 VND
13. Lonely Binary TinkerBlock Sensor Kit - 1,446,017 VND
14. Lonely Binary ESP32-S3 PinPulse Kit - 657,137 VND
15. HiLetgo NEO-7M GPS Satellite Module - 299,511 VND
16. Walfront NEO-7M GPS SMA Module - 801,765 VND
17. Stemedu USB GPS GLONASS Dongle - 350,000 VND
`;

const getOfflineFallbackReply = (text) => {
  const query = text.toLowerCase();
  
  if (query.includes('usb') || query.includes('boot') || query.includes('recovery')) {
    return 'For system OS & recovery, I recommend the "Penguin 31-in-1 Multi-Boot USB (128GB)" priced at 920,097₫. If you require a standard Windows setup installer, we also offer the "Xtssui 64GB USB" (590,000₫) and the "Xtssui 32GB Windows USB" (420,000₫).';
  }
  
  if (query.includes('network') || query.includes('ethernet') || query.includes('sfp') || query.includes('fiber')) {
    return 'For networking pipelines, our top dual-port 10Gb card is the "VIMIN 10G PCI-E (X540-T2)" at 1,417,091₫. For SFP+ fiber connections, check the "LinksTek X520 DA1" (1,051,577₫) or the open "ULANSeN 10Gb Card" (893,801₫). Remember to connect them using the "UGREEN Cat 8 Ethernet Cable" (183,809₫).';
  }
  
  if (query.includes('arduino') || query.includes('board') || query.includes('esp32') || query.includes('development')) {
    return 'We carry advanced development boards: the flagship "Arduino® UNO™ Q 4GB" (1,551,464₫), the "Lonely Binary ESP32-S3 PinPulse Kit" (657,137₫), and the official "Arduino GIGA Display Shield" (1,672,426₫) for high-res touchscreen applications.';
  }

  if (query.includes('gps') || query.includes('navigation') || query.includes('glonass')) {
    return 'For telemetry tracking, I suggest the "HiLetgo NEO-7M GPS" (299,511₫) or the "Walfront NEO-7M SMA Module" (801,765₫) for external antenna links. For PC integrations, we have the "Stemedu USB GPS Dongle" (350,000₫).';
  }

  if (query.includes('display') || query.includes('oled') || query.includes('lcd')) {
    return 'We support small scale status screens: the "Hosyond 5 Pcs 0.91\\\" I2C OLED Module" pack at 367,881₫ or the "Hosyond 3pcs I2C 1602 LCD" pack (341,585₫).';
  }

  if (query.includes('budget') || query.includes('price') || query.includes('under') || query.includes('cheap')) {
    return 'Under 500,000 VND, we offer: the "UGREEN Cat 8 Cable" (183,809₫), the "HiLetgo NEO-7M GPS" (299,511₫), the "Hosyond OLED 5-pack" (367,881₫), the "Hosyond LCD 3-pack" (341,585₫), the "Stemedu USB GPS" (350,000₫), and the "Xtssui 32GB USB" (420,000₫).';
  }

  return 'I am your GeekShop system hardware assistant. Ask me to recommend network cards, bootable USB drives, development boards, or GPS modules from our catalog.';
};

const geminiService = {
  chat: async (conversationHistory) => {
    const key = process.env.GEMINI_API_KEY;
    
    if (!key) {
      console.log('GEMINI_API_KEY not configured. Triggering offline fallback rules response.');
      const lastUserMsg = [...conversationHistory].reverse().find(m => m.role === 'user')?.content || '';
      return getOfflineFallbackReply(lastUserMsg);
    }

    try {
      // In @google/generative-ai versions, initialization uses the GoogleGenAI or GoogleGenerativeAI client.
      // We will perform a simple safe model invocation.
      const ai = new GoogleGenAI({ apiKey: key });
      const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' });

      // Build text prompt matching conversation log
      let prompt = `${SYSTEM_PROMPT}\n\nCONVERSATION_HISTORY:\n`;
      conversationHistory.forEach((msg) => {
        prompt += `${msg.role.toUpperCase()}: ${msg.content}\n`;
      });
      prompt += 'ASSISTANT: ';

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (err) {
      console.error('Gemini API call failed. Falling back to offline responses.', err.message);
      const lastUserMsg = [...conversationHistory].reverse().find(m => m.role === 'user')?.content || '';
      return getOfflineFallbackReply(lastUserMsg);
    }
  },
};

module.exports = geminiService;
