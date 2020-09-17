import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, checkProps } from "../../../../test/testUtils";
import SeventhForm from "./SeventhForm";

const mockUpdateSeventh = jest.fn();
const mockSetTmpChordName = jest.fn();

const defaultProps = {
  rootName: "B♭",
  seventh: "major",
  selected: [
    {
      semitonesFromRoot: 0,
      degree: 1,
      displayInterval: "R",
      displayName: { id: 6, alt: "♭" },
    },
    {
      semitonesFromRoot: 3,
      degree: 3,
      displayInterval: "♭3",
      displayName: { id: 1, alt: "♭" },
    },
    {
      semitonesFromRoot: 7,
      degree: 5,
      displayInterval: "5",
      displayName: { id: 3, alt: "" },
    },
    {
      semitonesFromRoot: 11,
      degree: 7,
      displayInterval: "7",
      displayName: { id: 5, alt: "" },
    },
  ],
  updateSeventh: mockUpdateSeventh,
  setTmpChordName: mockSetTmpChordName,
};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<SeventhForm {...setupProps} />);
};
it("renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "seventh-form");
  expect(component.length).toBe(1);
});
it("does not throw warning with expected props", () => {
  checkProps(SeventhForm, defaultProps);
});
