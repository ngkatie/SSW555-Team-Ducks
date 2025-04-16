// RoundModalWrapper.jsx
import React from "react";
import RoundModal from "./RoundModal";
import roundContent from "./roundContent.json";

const RoundWrapper = ({ roundNum }) => {
  const content = roundContent[roundNum];

  if (!content) {
    console.log(`Round ${roundNum} is nonexistent`);
    return null;
  }

  return (
    <RoundModal
      title={content.title}
      explanations={content.explanations}
      buttonLabel={content.buttonLabel}
    />
  );
};

export default RoundWrapper;
