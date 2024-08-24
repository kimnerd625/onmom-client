import React from "react";
import SwipeButton from "react-swipezor";

const StartButton = () => {
  return (
    <SwipeButton
      mainText="Swipe me"
      overlayText="S I K E"
      onSwipeDone={function () {
        console.log("Done!");
      }}
    />
  );
};

export default StartButton;
