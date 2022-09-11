import React, { useEffect, useState } from "react";
import Key from "./Key";

class Keyboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      down: {},
    };

    const alphabetRows = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
    this.rows = alphabetRows.map((row) =>
      row.split("").map((letter) => ({
        code: `Key${letter.toUpperCase()}`,
        text: letter.toUpperCase(),
      }))
    );
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
    this.setState({ down: { ...this.state.down, [event.code]: 1 } });
  };

  onKeyUp = (event) => {
    let temp = this.state.down;
    delete temp[event.code];
    this.setState({ down: temp });
  };

  render() {
    return (
      <div>
        <div className="Keyboard">
          {this.rows.map((row) => {
            return (
              <div>
                {row.map((key) => (
                  <Key text={key.text} down={!!this.state.down[key.code]} />
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
