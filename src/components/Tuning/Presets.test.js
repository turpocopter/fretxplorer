import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, checkProps } from "../../../test/testUtils";
import Presets from "./Presets";

const defaultProps = {
  preset: "DADGAD",
  selectPreset: jest.fn(),
  isOpening: false,
  isClosing: false,
};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<Presets {...setupProps} />);
};
it("renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "presets");
  expect(component.length).toBe(1);
});
it("does not throw warning with expected props", () => {
  checkProps(Presets, defaultProps);
});
