import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, checkProps } from "../../../test/testUtils";
import Modes from "./Modes";

const defaultProps = {
  modes: [
    {
      shortName: "Major",
      fullName: "Major scale",
      listName: "Ionian",
      aliases: ["Ionian"],
    },
    {
      shortName: "Dorian",
      fullName: "Dorian mode",
    },
    {
      shortName: "Phrygian",
      fullName: "Phrygian mode",
    },
    {
      shortName: "Lydian",
      fullName: "Lydian mode",
    },
    {
      shortName: "Mixolydian",
      fullName: "Mixolydian mode",
    },
    {
      shortName: "minor",
      fullName: "Natural minor scale",
      listName: "Aeolian",
      aliases: ["Aeolian"],
    },
    {
      shortName: "Locrian",
      fullName: "Locrian mode",
    },
  ],
  current: 5,
  setCurrent: jest.fn(),
  pickPrevious: jest.fn(),
  pickNext: jest.fn(),
  selected: [
    {
      degree: 1,
      displayInterval: "R",
      displayName: { id: 2, alt: "" },
      semitonesFromRoot: 0,
    },
    {
      degree: 2,
      displayInterval: "2",
      displayName: { id: 3, alt: "♯" },
      semitonesFromRoot: 2,
    },
    {
      degree: 3,
      displayInterval: "♭3",
      displayName: { id: 4, alt: "" },
      semitonesFromRoot: 3,
    },
    {
      degree: 4,
      displayInterval: "4",
      displayName: { id: 5, alt: "" },
      semitonesFromRoot: 5,
    },
    {
      degree: 5,
      displayInterval: "5",
      displayName: { id: 6, alt: "" },
      semitonesFromRoot: 7,
    },
    {
      degree: 6,
      displayInterval: "♭6",
      displayName: { id: 0, alt: "" },
      semitonesFromRoot: 8,
    },
    {
      degree: 7,
      displayInterval: "♭7",
      displayName: { id: 1, alt: "" },
      semitonesFromRoot: 10,
    },
  ],
  parallelModes: false,
  toggleParallelModes: jest.fn(),
  namingConvention: "letters",
};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<Modes {...setupProps} />);
};
it("renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "modes");
  expect(component.length).toBe(1);
});
it("does not throw warning with expected props", () => {
  checkProps(Modes, defaultProps);
});
