import './extendChat';

if (mp.storage.data.timeStamp === undefined)
  mp.storage.data.timeStamp = false;
if (mp.storage.data.pageSize === undefined)
  mp.storage.data.pageSize = 24;
if (mp.storage.data.fontSize === undefined)
  mp.storage.data.fontSize = 0.9;
if (mp.storage.data.toggleChat === undefined)
  mp.storage.data.toggleChat = true;

mp.gui.chat.show(false);
const chat = mp.browsers.new('package://cef/chat/index.html');
chat.markAsChat();

chat.execute(`setToggleTimestamp(${mp.storage.data.timeStamp});`);
chat.execute(`setPageSize(${mp.storage.data.pageSize});`);
chat.execute(`setFontSize(${mp.storage.data.fontSize});`);
chat.execute(`setToggleChat(${mp.storage.data.toggleChat});`);


// Add commands
mp.events.addCommand("timestamp", () => {

  let timeStamp = !mp.storage.data.timeStamp;
  chat.execute(`setToggleTimestamp(${timeStamp});`);
  mp.storage.data.timeStamp = timeStamp;
});

mp.events.addCommand("fontsize", (fontSize: number) => {
  if (!fontSize) {
    mp.gui.chat.push("/fontsize (0.5-1.5) (Standart: 0.9)");
    return;
  }

  if (fontSize < 0.5 || fontSize > 1.5) {
    mp.gui.chat.push("/fontsize (0.5-1.5) (Standart: 0.9)");
    return;
  }
  mp.storage.data.fontSize = fontSize;
  chat.execute(`setFontSize(${fontSize});`);
});

mp.events.addCommand("pagesize", (pageSize: number) => {
  if (!pageSize) {
    mp.gui.chat.push("/pagesize (4-24) (Standart: 24)");
    return;
  }

  if (pageSize < 4 || pageSize > 24) {
    mp.gui.chat.push("/pagesize (4-24) (Standart: 24)");
    return;
  }
  mp.storage.data.pageSize = pageSize;
  chat.execute(`setPageSize(${pageSize});`);
});

mp.events.addCommand("chathelp", () => {
  mp.gui.chat.push("/timestamp /fontsize /pagesize");
});


// Anti spam
mp.players.local.lastMessage = new Date().getTime();
mp.events.add("setLastMessage", (ms) => {
  mp.players.local.lastMessage = ms + 350;
});

mp.events.add("server:clearChat", () => {
  chat.execute(`chatAPI.clear();`);
});