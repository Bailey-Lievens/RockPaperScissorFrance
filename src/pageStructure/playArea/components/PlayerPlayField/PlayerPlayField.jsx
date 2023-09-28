import { useState, useEffect } from "react";

import rockSprite from "./../../../../assets/playerMoves/rock-player.png";
import paperSprite from "./../../../../assets/playerMoves/paper-player.png";
import scissorSprite from "./../../../../assets/playerMoves/scissor-player.png";
import franceSprite from "./../../../../assets/playerMoves/france-player.png";

import * as constants from "./../../constants";

export default function PlayerPlayField({ playerState }) {
  const [handState, setHandState] = useState({
    p1Sprite: getPlayerSpriteByState(playerState[0]),
    p2Sprite: getPlayerSpriteByState(playerState[1]),
  });

  let p1AnimateClass = constants.animateClass;
  let p2AnimateClass = constants.animateClass;

  function getPlayerSpriteByState(playerState) {
    if (playerState === constants.rockState) {
      return rockSprite;
    }

    if (playerState === constants.paperState) {
      return paperSprite;
    }

    if (playerState === constants.scissorState) {
      return scissorSprite;
    }

    if (playerState === constants.franceState) {
      return franceSprite;
    }
  }

  useEffect(() => {
    let newHandState = { ...handState };

    newHandState.p1Sprite = getPlayerSpriteByState(playerState[0]);
    newHandState.p2Sprite = getPlayerSpriteByState(playerState[1]);

    if (newHandState.p1Sprite != handState.p1Sprite) {
      document.getElementById("player1Hand").classList.add(constants.animateClass);

      setTimeout(() => {
        document.getElementById("player1Hand").classList.remove(constants.animateClass);
      }, 100);
    }

    if (newHandState.p2Sprite != handState.p2Sprite) {
      document.getElementById("player2Hand").classList.add(constants.animateClass);

      setTimeout(() => {
        document.getElementById("player2Hand").classList.remove(constants.animateClass);
      }, 100);
    }

    setHandState(newHandState);
  }, [playerState]);

  return (
    <div className="players-play-field">
      <div className="player-info-wrapper">
        <img
          id="player1Hand"
          src={handState.p1Sprite}
          className={p1AnimateClass}
          alt="player 1 move"
          draggable="false"
        />
      </div>

      <div className="player-info-wrapper">
        <img
          id="player2Hand"
          src={handState.p2Sprite}
          className={p2AnimateClass}
          alt="player 2 move"
          draggable="false"
        />
      </div>
    </div>
  );
}
