import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, checkProps } from "../../../../test/testUtils";
import FretMarkerList from "./FretMarkerList";

const defaultProps = {
  nbFrets: 24,
  isLeftHanded: false,
};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<FretMarkerList {...setupProps} />);
};
it("renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "fret-marker-list");
  expect(component.length).toBe(1);
});
it("does not throw warning with expected props", () => {
  checkProps(FretMarkerList, defaultProps);
});
it("renders correct number of fret markers", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "fret-marker-component");
  expect(component.length).toBe(24);
});
