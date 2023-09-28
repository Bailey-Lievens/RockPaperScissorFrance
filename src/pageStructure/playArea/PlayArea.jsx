import { useEffect, useState } from "react";

import PlayerPlayField from "./components/PlayerPlayField/PlayerPlayField";
import PlayerScore from "./components/PlayerScore/PlayerScore";
import RoundTimer from "./components/RoundTimer/RoundTimer";

import * as constants from "./constants";

export default function PlayArea() {
  const [playerState, setPlayerState] = useState([
    constants.rockState,
    constants.rockState,
  ]);
  const [playerScore, setPlayerScore] = useState([
    0,
    0,
  ]);
  const [roundState, setRoundState] = useState({
    countdown: constants.countdown,
    inProgress: false,
  });

  let debugMessage = '';

  useEffect(() => {
    document.addEventListener("keydown", handleStartRound, true);

    let timerInterval;

    if (roundState.inProgress) {
      timerInterval = setInterval(() => {
        let newRoundState = { ...roundState };

        if (newRoundState.countdown === 0) {
          handleStopRound();
          return;
        }

        newRoundState.countdown = newRoundState.countdown - 1;

        setRoundState(newRoundState);
      }, 1000);
    }

    return () => {
      document.removeEventListener("keydown", handleStartRound, true);

      clearInterval(timerInterval);
    };
  }, [roundState]);

  useEffect(() => {
    document.addEventListener("keydown", handlePlayerInput, true);

    return () => {
      document.removeEventListener("keydown", handlePlayerInput, true);
    };
  }, [playerState]);

  function handlePlayerInput(e) {
    let currentPlayer = getCurrentPlayerFromInput(e.keyCode);

    if (currentPlayer === null) {
      return;
    }

    let newPlayerState = playerState.slice();
    newPlayerState[currentPlayer] = getPlayerStateByInput(e.keyCode);

    setPlayerState(newPlayerState);
  }

  function handleStartRound(e) {
    if (e.keyCode != constants.roundStartPress || roundState.inProgress) {
      return;
    }

    let newRoundState = { ...roundState };

    newRoundState.inProgress = true;

    setRoundState(newRoundState);
  }

  function handleStopRound() {
    handleScoreChanges(playerState[0], playerState[1]);

    let newRoundState = { ...roundState };

    newRoundState.inProgress = false;
    newRoundState.countdown = constants.countdown;

    setRoundState(newRoundState);
  }

  function handleScoreChanges(p1Choice, p2Choice) {
    // Handle both players giving up
    if (
      p1Choice === constants.franceState &&
      p2Choice === constants.franceState
    ) {
      // handle omega loss because they both gave up
      console.log('Everyone loses');
      return;
    }

    // Handle player 1 giving up
    if (
      p1Choice === constants.franceState &&
      p2Choice != constants.franceState
    ) {
      let newPlayerScore = playerScore.slice();

      newPlayerScore[1] = playerScore[1] + 1;
  
      setPlayerScore(newPlayerScore);

      // handle end of game where player 2 wins
      console.log('Player 1 gave up');
      return;
    }

    // Handle player 2 giving up
    if (
      p2Choice === constants.franceState &&
      p1Choice != constants.franceState
    ) {
      let newPlayerScore = playerScore.slice();

      newPlayerScore[0] = playerScore[0] + 1;
  
      setPlayerScore(newPlayerScore);

      // handle end of game where player 1 wins
      console.log('Player 2 gave up');
      return;
    }

    // Handle tie
    if (p1Choice === p2Choice) {
      // handle some sort of animation
      console.log('Tie');
      return;
    }

    // Handle giving points to the winner
    if (
      (p1Choice === constants.paperState && p2Choice === constants.rockState) ||
      (p1Choice === constants.rockState && p2Choice === constants.scissorState) ||
      (p1Choice === constants.scissorState && p2Choice === constants.paperState)
    ) {
      let newPlayerScore = playerScore.slice();

      newPlayerScore[0] = playerScore[0] + 1;
  
      setPlayerScore(newPlayerScore);
    } else {
      let newPlayerScore = playerScore.slice();

      newPlayerScore[1] = playerScore[1] + 1;
  
      setPlayerScore(newPlayerScore);
    }
  }

  return (
    <section className="players-wrapper">
      {debugMessage}
      <PlayerScore playerScore={playerScore} />
      <RoundTimer roundState={roundState} />
      <PlayerPlayField playerState={playerState} />
    </section>
  );

  function getCurrentPlayerFromInput(keyCode) {
    if (
      keyCode === constants.player0RockPress ||
      keyCode === constants.player0PaperPress ||
      keyCode === constants.player0ScissorPress ||
      keyCode === constants.player0FrancePress
    ) {
      return 0;
    }

    if (
      keyCode === constants.player1RockPress ||
      keyCode === constants.player1PaperPress ||
      keyCode === constants.player1ScissorPress ||
      keyCode === constants.player1FrancePress
    ) {
      return 1;
    }

    return null;
  }

  function getPlayerStateByInput(keyCode) {
    if (
      keyCode === constants.player0RockPress ||
      keyCode === constants.player1RockPress
    ) {
      return constants.rockState;
    }

    if (
      keyCode === constants.player0PaperPress ||
      keyCode === constants.player1PaperPress
    ) {
      return constants.paperState;
    }

    if (
      keyCode === constants.player0ScissorPress ||
      keyCode === constants.player1ScissorPress
    ) {
      return constants.scissorState;
    }

    if (
      keyCode === constants.player0FrancePress ||
      keyCode === constants.player1FrancePress
    ) {
      return constants.franceState;
    }
  }
}
