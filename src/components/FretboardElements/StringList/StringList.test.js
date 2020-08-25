import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, checkProps } from "../../../../test/testUtils";
import StringList from "./StringList";

const defaultProps = {
  isLeftHanded: false,
  tuning: [
    { stringId: 6, note: 4, octave: 2, reference: 40 },
    { stringId: 5, note: 9, octave: 2, reference: 45 },
    { stringId: 4, note: 2, octave: 3, reference: 50 },
    { stringId: 3, note: 7, octave: 3, reference: 55 },
    { stringId: 2, note: 11, octave: 3, reference: 59 },
    { stringId: 1, note: 4, octave: 4, reference: 64 },
  ],
};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<StringList {...setupProps} />);
};
test("renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "string-list");
  expect(component.length).toBe(1);
});
test("does not throw warning with expected props", () => {
  checkProps(StringList, defaultProps);
});
