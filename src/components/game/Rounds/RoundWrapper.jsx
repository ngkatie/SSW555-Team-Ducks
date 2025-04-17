// RoundModalWrapper.jsx
import React from "react";
import RoundModal from "./RoundModal";
import roundContent from "./roundContent.json";

const RoundWrapper = ({ roundId }) => {
  const content = roundContent[roundId];

  if (!content) {
    console.log(`Round ${roundId} is nonexistent`);
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
