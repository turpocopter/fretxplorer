import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, checkProps } from "../../../test/testUtils";
import RootForm from "./RootForm";

const mockUpdateRoot = jest.fn();
const mockToggleFlats = jest.fn();

const defaultProps = {
  rootNote: 10,
  useFlats: true,
  noteNaming: "letters",
  updateRoot: mockUpdateRoot,
  toggleFlats: mockToggleFlats,
};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<RootForm {...setupProps} />);
};
it("renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "root-form");
  expect(component.length).toBe(1);
});
it("does not throw warning with expected props", () => {
  checkProps(RootForm, defaultProps);
});
it("displays the correct note name when flats are off", () => {
  const wrapper = setup({ useFlats: false });
  const aSharp = wrapper.find(".rootNoteItem[value=10]");
  expect(aSharp.text()).toBe("A♯");
});
it("displays the correct note name when flats are on", () => {
  const wrapper = setup();
  const bFlat = wrapper.find(".rootNoteItem[value=10]");
  expect(bFlat.text()).toBe("B♭");
});
