import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, checkProps } from "../../../test/testUtils";
import NoteIntervalSwitch from "./NoteIntervalSwitch";

const defaultProps = {
  showIntervals: true,
  toggleNotesIntervals: jest.fn(),
};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<NoteIntervalSwitch {...setupProps} />);
};
it("renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "note-interval-switch");
  expect(component.length).toBe(1);
});
it("does not throw warning with expected props", () => {
  checkProps(NoteIntervalSwitch, defaultProps);
});
