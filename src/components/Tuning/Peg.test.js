import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, checkProps } from "../../../test/testUtils";
import Peg from "./Peg";

const defaultProps = {
  tuning: { n: 3, o: 3 }, // D sharp or E flat
  useFlats: true,
  getNoteName: jest.fn(),
  onClickPeg: jest.fn(),
  isActive: false,
  isOpen: true,
  isOpening: false,
  isClosing: false,
  alwaysOpen: false,
  isLinked: false,
  stringId: 1,
  tuneUp: jest.fn(),
  tuneDown: jest.fn(),
  tuneUpDisabled: false,
  tuneDownDisabled: false,
};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<Peg {...setupProps} />);
};
it("renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "peg");
  expect(component.length).toBe(1);
});
it("does not throw warning with expected props", () => {
  checkProps(Peg, defaultProps);
});
