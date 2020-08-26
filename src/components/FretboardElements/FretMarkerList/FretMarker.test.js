import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, checkProps } from "../../../../test/testUtils";
import FretMarker from "./FretMarker";

const defaultProps = {
  position: 1,
  isLeftHanded: false,
};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<FretMarker {...setupProps} />);
};
test("renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "fret-marker");
  expect(component.length).toBe(1);
});
test("does not throw warning with expected props", () => {
  checkProps(FretMarker, defaultProps);
});
