// import Note from "@lyre/note/src/Note";
// import Octavian from "octavian";

const clamp = function (val, min, max) {
  return Math.min(Math.max(val, min), max);
};

export default (rows, offset = 20) => {
  const notes = require("./notes.json");
  const numberOfKeys = rows.flat().length;

  let output = {};
  offset = clamp(offset, 0, notes.length - numberOfKeys);
  let i = 0;

  rows.forEach((row) =>
    row.forEach((key) => {
      i++;
      output[key.code] = notes[offset + i];
    }),
  );

  return output;
};
