import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, checkProps } from "../../../../test/testUtils";
import ExtensionForm from "./ExtensionForm";

const mockUpdateExtension = jest.fn();
const mockSetTmpChordName = jest.fn();

const defaultProps = {
  rootName: "B♭",
  extension: "flat9",
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
    {
      semitonesFromRoot: 1,
      degree: 9,
      displayInterval: "♭9",
      displayName: { id: 0, alt: "♭" },
    },
  ],
  updateExtension: mockUpdateExtension,
  setTmpChordName: mockSetTmpChordName,
};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<ExtensionForm {...setupProps} />);
};
it("renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "extension-form");
  expect(component.length).toBe(1);
});
it("does not throw warning with expected props", () => {
  checkProps(ExtensionForm, defaultProps);
});
