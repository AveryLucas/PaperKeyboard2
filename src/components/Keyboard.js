import React, { useEffect, useState } from "react";
import Qwerty from "../Qwerty";
import Key from "./Key";
import * as Tone from "tone";

import sampler from "../configs/sampler";
import { Instrument } from "tone/build/esm/instrument/Instrument";

const synth = new Tone.Synth().toDestination();
const now = Tone.now();

class Keyboard extends React.Component {
  constructor(props) {
    super(props);

    const pianoNotes = sampler(Qwerty.alphabetLayout(), 20);

    this.profiles = [];
    Object.keys(pianoNotes).forEach((keyCode) => {
      this.profiles[keyCode] = {
        ...pianoNotes[keyCode],
        instrument: new Tone.Sampler({
          urls: {
            C4: "C4.mp3",
            "D#4": "Ds4.mp3",
            "F#4": "Fs4.mp3",
            A4: "A4.mp3",
          },
          release: 1,
          baseUrl: "https://tonejs.github.io/audio/salamander/",
        }).toDestination(),
      };
    });

    this.state = {
      lastPressed: "N/A",
      down: {},
    };
  }

  componentDidMount() {
    document.addEventListener("keyup", this.onKeyUp);
    document.addEventListener("keydown", this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keyup", this.onKeyUp);
    document.removeEventListener("keydown", this.onKeyDown);
  }

  onKeyDown = (event) => {
    if (event.repeat) return;
    event.preventDefault();

    if (this.profiles[event.code]) {
      const { note, octave, instrument } = this.profiles[event.code];
      const now = Tone.context.currentTime;
      instrument.triggerAttack([note + octave], now);
    }

    this.setState({
      down: { ...this.state.down, [event.code]: 1 },
    });
  };

  onKeyUp = (event) => {
    event.preventDefault();
    if (this.profiles[event.code]) {
      const { note, octave, instrument } = this.profiles[event.code];
      instrument.triggerRelease([note + octave]);
    }
    let temp = this.state.down;
    delete temp[event.code];
    this.setState({ down: temp, lastPressed: event.code });
  };

  render() {
    const keyboardRows = Qwerty.fullLayout();
    const { down, lastPressed } = this.state;

    return (
      <div>
        <div
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            width: "200px",
            height: "200px",
          }}
          onClick={async () => {
            await Tone.start();
            console.log("Audio is ready");
          }}
        />
        <div className="Keyboard">
          {keyboardRows.map((row, rowIndex) => {
            return (
              <div>
                {row.map(({ key, alt, code, size }) => (
                  <Key
                    text={alt ? alt : key}
                    down={!!down[code]}
                    last={lastPressed == code}
                    size={size}
                  />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Keyboard;
