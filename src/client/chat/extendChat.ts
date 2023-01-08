const commandStorage = new Map();
const consoleCommandStorage = new Map();

declare global {
  interface EventMpPool {
    addCommand: any;
    getCommandNames: any;
    removeCommand: any;
    removeAllCommands: any;
  }
}

export { };

mp.events.addCommand = function (name: string, handlerFn: Function) {
  if (typeof name !== "string") {
    throw new TypeError("name isn't a string.");
  } else if (typeof handlerFn !== "function") {
    throw new TypeError("handlerFn isn't a function.");
  } else if (commandStorage.has(name)) {
    throw new Error(`A command named "${name}" already exists.`);
  }

  commandStorage.set(name, handlerFn);
};

mp.events.getCommandNames = function () {
  return Array.from(commandStorage.keys());
};


mp.events.removeCommand = function (name: string) {
  return commandStorage.delete(name);
};

mp.events.removeAllCommands = function () {
  commandStorage.clear();
};

function callCommandFn(command: any, isConsole: boolean) {
  const args = command.split(/ +/);
  const commandFn = (isConsole ? consoleCommandStorage : commandStorage).get(args.shift());

  if (commandFn) {
    commandFn(...args);
  }
}

mp.events.add({
  "playerCommand": (command) => {
    callCommandFn(command, false);
  },
});