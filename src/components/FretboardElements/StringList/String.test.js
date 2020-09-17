import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, checkProps } from "../../../../test/testUtils";
import String from "./String";

const defaultProps = {
  rootNote: 1,
  showIntervals: false,
  name: 1,
  tuning: { stringId: 5, note: 9, octave: 3 },
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
  isLeftHanded: false,
};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<String {...setupProps} />);
};
it("renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "string");
  expect(component.length).toBe(1);
});
it("does not throw warning with expected props", () => {
  checkProps(String, defaultProps);
});
it("renders correct number of frets - including open string", () => {
  const wrapper = setup({ nbFrets: 22 });
  const component = findByTestAttr(wrapper, "fret");
  expect(component.length).toBe(23);
});
