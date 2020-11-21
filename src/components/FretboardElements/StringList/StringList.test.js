import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, checkProps } from "../../../../test/testUtils";
import StringList from "./StringList";

const defaultProps = {
  rootNote: 1,
  showIntervals: false,
  isLeftHanded: false,
  tuning: [
    { stringId: 6, note: 4, octave: 2, reference: 40 },
    { stringId: 5, note: 9, octave: 2, reference: 45 },
    { stringId: 4, note: 2, octave: 3, reference: 50 },
    { stringId: 3, note: 7, octave: 3, reference: 55 },
    { stringId: 2, note: 11, octave: 3, reference: 59 },
    { stringId: 1, note: 4, octave: 4, reference: 64 },
  ],
  selectedNotes: [
    {
      degree: 1,
      displayInterval: "R",
      displayName: { alt: "", id: 1 },
      semitonesFromRoot: 0,
    },
    {
      degree: 3,
      displayInterval: "3",
      displayName: { alt: "♯", id: 3 },
      semitonesFromRoot: 4,
    },
    {
      degree: 5,
      displayInterval: "5",
      displayName: { alt: "", id: 5 },
      semitonesFromRoot: 7,
    },
  ],
  nbFrets: 24,
  noteNaming: "letters",
  playNote: jest.fn(),
};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<StringList {...setupProps} />);
};
it("renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "string-list");
  expect(component.length).toBe(1);
});
it("does not throw warning with expected props", () => {
  checkProps(StringList, defaultProps);
});
