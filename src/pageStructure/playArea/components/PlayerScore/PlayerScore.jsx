import { useState, useEffect } from "react";

import crownSprite from "./../../../../assets/main/crown.png";

import * as constants from "./../../constants";

export default function PlayerScore({ playerScore }) {
  const [previousScoreState, setpreviousScoreState] = useState({
    p1Score: playerScore[0],
    p2Score: playerScore[1],
  });

  useEffect(() => {
    let newPreviousScoreState = { ...previousScoreState };

    if (newPreviousScoreState.p1Score != playerScore[0]) {
      document
        .getElementById("player1Crown")
        .classList.add(constants.animateClass);

      newPreviousScoreState.p1Score = playerScore[0];

      setTimeout(() => {
        document
          .getElementById("player1Crown")
          .classList.remove(constants.animateClass);
      }, 1500);
    }

    if (newPreviousScoreState.p2Score != playerScore[1]) {
      document
        .getElementById("player2Crown")
        .classList.add(constants.animateClass);

      newPreviousScoreState.p2Score = playerScore[1];

      setTimeout(() => {
        document
          .getElementById("player2Crown")
          .classList.remove(constants.animateClass);
      }, 1500);
    }

    setpreviousScoreState(newPreviousScoreState);
  }, [playerScore]);

  return (
    <div className="players-score-wrapper">
      <div>
        <img id="player1Crown" src={crownSprite} alt="Crown" />
        <p>Player 1</p>
        <p>{playerScore[0]} victories</p>
      </div>

      <div>
        <img id="player2Crown" src={crownSprite} alt="Crown" />
        <p>Player 2</p>
        <p>{playerScore[1]} victories</p>
      </div>
    </div>
  );
}
