import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RoundWrapper from "../src/components/game/Rounds/RoundWrapper";
import roundContent from "../src/components/game/Rounds/roundContent.json";

const rounds = Object.entries(roundContent).map(([key, content]) => ({
  roundId: key,
  ...content
}));

describe("Round Modals", () => {
  test.each(rounds)(
    "displays content and closes when toggled",
    ({ roundId, title, explanations, buttonLabel }) => {
      render(<RoundWrapper roundId={roundId} />);

      expect(screen.getByText(title)).toBeInTheDocument();

      explanations.forEach(text => {
        expect(screen.getByText(text)).toBeInTheDocument();
      });

      const button = screen.getByRole("button", { name: buttonLabel });
      expect(button).toBeInTheDocument();

      fireEvent.click(button);
      expect(screen.queryByText(title)).not.toBeInTheDocument();
    }
  );

  test("error handling for invalid round", () => {
    const { container } = render(<RoundWrapper roundId="invalidKey" />);
    expect(container.firstChild).toBeNull(); // renders nothing
  });
});
