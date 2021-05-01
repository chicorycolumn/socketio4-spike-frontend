const { firstNames, fourLetterWords } = require("./text.js");

exports.requestEntry = (socket, playerData, roomName, roomPassword) => {
  console.log(`€ Request entry with socket: ${socket.id}`);
  socket.emit("Request entry", {
    roomName,
    roomPassword,
  });
};

exports.createRoomName = () => {
  const roomAdjs = ["red", "green", "blue", "yellow", "purple", "orange"].slice(
    4,
    6
  );
  const roomNouns = ["alligator", "bison", "cat", "duck", "elk", "fox"].slice(
    4,
    6
  );
  let adj = roomAdjs[Math.floor(Math.random() * roomAdjs.length)];
  let noun = roomNouns[Math.floor(Math.random() * roomNouns.length)];
  return `${adj}${noun}`;
};

exports.makeDummyName = (id) => {
  return id.slice(0, 3);

  if (!id) {
    throw "No id provided to makeDummyName.";
  }

  let firstName;
  let prefix = "";
  let lastIndex;

  id.split("").forEach((char, index) => {
    if (!firstName) {
      if (!/\d/.test(char)) {
        firstName = firstNames
          .find((name) => name[0] === char.toLowerCase())
          .split("");
        firstName[0] = id[index];
        firstName[1] = id[index + 1];
        lastIndex = index + 2;
      } else {
        prefix += char.toString();
      }
    }
  });

  return `${prefix}${firstName.join("")}_${id.slice(lastIndex, lastIndex + 2)}`;
};

exports.fourLetterWord = (currentWord) => {
  let newWord =
    fourLetterWords[Math.floor(Math.random() * fourLetterWords.length)];

  while (newWord === currentWord) {
    newWord =
      fourLetterWords[Math.floor(Math.random() * fourLetterWords.length)];
  }

  return newWord;
};
