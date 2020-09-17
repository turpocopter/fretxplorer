import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, checkProps } from "../../../../test/testUtils";
import QualityForm from "./QualityForm";

const mockUpdateQuality = jest.fn();
const mockSetTmpChordName = jest.fn();

const defaultProps = {
  rootName: "B♭",
  quality: "minor",
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
  ],
  updateQuality: mockUpdateQuality,
  setTmpChordName: mockSetTmpChordName,
};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<QualityForm {...setupProps} />);
};
it("renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "quality-form");
  expect(component.length).toBe(1);
});
it("does not throw warning with expected props", () => {
  checkProps(QualityForm, defaultProps);
});
