export function GetKeyInfo() {
  let output = {};
  // Alphabet
  "abcdefghijklmnopqrstuvwxyz".split("").forEach((letter) => {
    output[`Key${letter.toUpperCase()}`] = {
      key: letter.toUpperCase(),
      shift: letter.toUpperCase(),
      size: 1,
    };
  });
  // Digits
  let digitShiftKeys = "!@#$%^&*()";
  "1234567890".split("").forEach((digit, i) => {
    output[`Digit${digit.toUpperCase()}`] = {
      key: digit,
      shift: digitShiftKeys[i],
      size: 1,
    };
  });
  // Symbols
  output = {
    ...output,
    ["Backslash"]: { size: 1.5, key: "\\", shift: "|" },
    ["Equal"]: { size: 1, key: "=", shift: "+" },
    ["Minus"]: { size: 1, key: "-", shift: "_" },
    ["Backquote"]: { size: 1, key: "`", shift: "~" },
    ["BracketLeft"]: { size: 1, key: "[", shift: "{" },
    ["BracketRight"]: { size: 1, key: "]", shift: "}" },
    ["Semicolon"]: { size: 1, key: ";", shift: ":" },
    ["Quote"]: { size: 1, key: "'", shift: '"' },
    ["Comma"]: { size: 1, key: ",", shift: "<" },
    ["Period"]: { size: 1, key: ".", shift: ">" },
    ["Slash"]: { size: 1, key: "/", shift: "?" },
  };
  // Other...
  output = {
    ...output,
    ["Space"]: { size: 6, key: " " },
    ["ShiftLeft"]: { size: 2.8, key: "Shift" },
    ["ShiftRight"]: { size: 2.8, key: "Shift" },
    ["Enter"]: { size: 2.5, key: "Enter" },
    ["Backspace"]: { size: 2.5, key: "Backspace", alt: " " },
    ["CapsLock"]: { size: 2.3, key: "CapsLock", alt: "CapsLk" },
    ["Tab"]: { size: 1.5, key: "Tab" },
    ["ControlLeft"]: { size: 1, key: "Control", alt: "Ctrl" },
    ["ControlRight"]: { size: 1, key: "Control", alt: "Ctrl" },
    ["AltLeft"]: { size: 1, key: "Alt" },
    ["AltRight"]: { size: 1, key: "Alt" },
    ["ContextMenu"]: { size: 1, key: "ContextMenu" },
    ["Blank"]: { size: 1, key: "" },
  };
  // Adding back keyCodes cause I'm stupid
  Object.keys(output).forEach((keyCode) => {
    output[keyCode].code = keyCode;
  });
  return output;
}

export function alphabetLayout() {
  let output = [];
  const keys = GetKeyInfo();

  let rows = [
    `${"qwertyuiop"
      .split("")
      .map((key) => `Key${key.toUpperCase()}`)
      .join(" ")}`,
    `${"asdfghjkl"
      .split("")
      .map((key) => `Key${key.toUpperCase()}`)
      .join(" ")}`,
    `${"zxcvbnm"
      .split("")
      .map((key) => `Key${key.toUpperCase()}`)
      .join(" ")}`,
  ];

  rows.forEach((row, index) => {
    output.push([]);
    row.split(" ").forEach((keyCode) => {
      if (keys[keyCode]) output[index].push(keys[keyCode]);
    });
  });
  return output;
}

export function fullLayout() {
  let output = [];
  const keys = GetKeyInfo();

  let rows = [
    `Backquote ${"1234567890"
      .split("")
      .map((digit) => `Digit${digit}`)
      .join(" ")} Minus Equal Backspace`,
    `Tab ${"qwertyuiop"
      .split("")
      .map((key) => `Key${key.toUpperCase()}`)
      .join(" ")} BracketLeft BracketRight Backslash`,
    `CapsLock ${"asdfghjkl"
      .split("")
      .map((key) => `Key${key.toUpperCase()}`)
      .join(" ")} Semicolon Quote Enter`,
    `ShiftLeft ${"zxcvbnm"
      .split("")
      .map((key) => `Key${key.toUpperCase()}`)
      .join(" ")} Comma Period Slash ShiftRight`,
    "ControlLeft Blank AltLeft Space AltRight Blank Blank ControlRight",
  ];
  rows.forEach((row, index) => {
    output.push([]);
    row.split(" ").forEach((keyCode) => {
      if (keys[keyCode]) output[index].push(keys[keyCode]);
    });
  });
  return output;
}

export default { fullLayout, alphabetLayout };
