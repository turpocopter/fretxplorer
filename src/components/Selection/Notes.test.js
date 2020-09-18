import React from "react";
import { mount } from "enzyme";

import { findByTestAttr, checkProps } from "../../../test/testUtils";
import { Notes } from "./Notes";

const defaultProps = {
  selectionType: "scale",
  selectedWithValues: [
    {
      degree: 1,
      displayInterval: "R",
      displayName: { id: 2, alt: "" },
      semitonesFromRoot: 0,
      midiValue: 40,
    },
    {
      degree: 2,
      displayInterval: "2",
      displayName: { id: 3, alt: "♯" },
      semitonesFromRoot: 2,
      midiValue: 42,
    },
    {
      degree: 3,
      displayInterval: "♭3",
      displayName: { id: 4, alt: "" },
      semitonesFromRoot: 3,
      midiValue: 43,
    },
    {
      degree: 4,
      displayInterval: "4",
      displayName: { id: 5, alt: "" },
      semitonesFromRoot: 5,
      midiValue: 45,
    },
    {
      degree: 5,
      displayInterval: "5",
      displayName: { id: 6, alt: "" },
      semitonesFromRoot: 7,
      midiValue: 47,
    },
    {
      degree: 6,
      displayInterval: "♭6",
      displayName: { id: 0, alt: "" },
      semitonesFromRoot: 8,
      midiValue: 48,
    },
    {
      degree: 7,
      displayInterval: "♭7",
      displayName: { id: 1, alt: "" },
      semitonesFromRoot: 10,
      midiValue: 50,
    },
  ],
  namingConvention: "letters",
  playNote: jest.fn(),
  playChord: jest.fn(),
  playScale: jest.fn(),
  cancelSound: jest.fn(),
};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return mount(<Notes {...setupProps} />);
};
it("renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "notes");
  expect(component.length).toBe(1);
});
it("does not throw warning with expected props", () => {
  checkProps(Notes, defaultProps);
});
