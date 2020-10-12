"use strict";
import PopUp from "./popup.js";
import { GameBuilder, Reason } from "./game.js";
import * as Sound from "./sound.js";

const CARROUT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
  .gameDuration(3) //
  .carrotCount(3)
  .bugCount(3)
  .build();

game.setGameStopListener((reason) => {
  let message;

  switch (reason) {
    case Reason.cancel:
      message = "replay?";
      Sound.playAlert();
      break;
    case Reason.win:
      message = "YOU WIN!";
      Sound.playWin();
      break;
    case Reason.lose:
      message = "YOU LOST!";
      Sound.playBug();
      break;
    default:
      new Error("not valid reason");
  }
  gameFinishBanner.ShowWithText(message);
});

gameFinishBanner.setClickListener(() => {
  game.start();
});
