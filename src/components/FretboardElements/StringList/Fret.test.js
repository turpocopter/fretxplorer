import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, checkProps } from "../../../../test/testUtils";
import Fret from "./Fret";

const mockPlayNote = jest.fn();
const defaultProps = {
  display: "",
  isRoot: false,
  note: 6,
  octave: 4,
  playNote: mockPlayNote,
};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<Fret {...setupProps} />);
};
describe("fret component", () => {
  test("renders without error", () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, "fret");
    expect(component.length).toBe(1);
  });
  test("does not throw warning with expected props", () => {
    checkProps(Fret, defaultProps);
  });
});
describe("fret content", () => {
  test("renders without error", () => {
    const wrapper = setup({ display: "F♯" });
    const content = findByTestAttr(wrapper, "fret-content");
    expect(content.length).toBe(1);
  });
  test("calls playNote prop upon click", () => {
    const wrapper = setup({ display: "G", note: 7, octave: 3 });
    const content = findByTestAttr(wrapper, "fret-content");
    content.simulate("click");
    expect(mockPlayNote).toHaveBeenCalledWith(7, 3);
  });
});
