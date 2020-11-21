import React from "react";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { mount } from "enzyme";
import { reducersObject } from "store/reducers";
import { setupIntegrationTest } from "../../test/testUtils";
import Tuning from "./Tuning";
import Modal from "react-modal";

const defaultProps = {
  namingConvention: "letters",
  playNote: jest.fn(),
  playChord: jest.fn(),
  playScale: jest.fn(),
  cancelSound: jest.fn(),
};

jest
  .spyOn(Modal, "setAppElement")
  .mockImplementation((param) => console.log(`setAppElement:'${param}'`));
jest.mock("midi-sounds-react");

const setup = (store, props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return mount(
    <Provider store={store}>
      <Tuning {...setupProps} />
    </Provider>
  );
};
describe("Tuning", () => {
  let store;
  let dispatchSpy;

  let wrapper;

  describe("Not always open", () => {
    beforeEach(() => {
      ({ store, dispatchSpy } = setupIntegrationTest(reducersObject));
      wrapper = setup(store, { alwaysOpen: false, doNotFlipOver: false });
    });
    it("shows open button, does not show pegs", () => {
      expect(wrapper.find(".settings").length).toBe(1);
      expect(wrapper.find(".presets").length).toBe(0);
      expect(wrapper.find(".tuneBtn").length).toBe(0);
      expect(wrapper.find(".linkStrings").length).toBe(0);
      expect(wrapper.find(".discard").length).toBe(0);
      expect(wrapper.find(".playBtnOpen").length).toBe(0);
    });
    it("reacts to open button being clicked", async () => {
      wrapper.find(".settings").simulate("click");
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 200));
      });
      wrapper.update();
      expect(wrapper.find(".settings").length).toBe(0);
      expect(wrapper.find(".presets").length).toBe(1);
      expect(wrapper.find(".tuneBtn").length).toBe(12);
      expect(wrapper.find(".linkStrings").length).toBe(1);
      expect(wrapper.find(".discard").length).toBe(1);
      expect(wrapper.find(".playBtnOpen").length).toBe(1);
    });
  });
  describe("Always open", () => {
    beforeEach(() => {
      ({ store, dispatchSpy } = setupIntegrationTest(reducersObject));
      wrapper = setup(store, { alwaysOpen: true, doNotFlipOver: false });
    });
    it("does not show open button", () => {
      expect(wrapper.find(".settings").length).toBe(0);
      expect(wrapper.find(".presets").length).toBe(1);
      expect(wrapper.find(".tuneBtn").length).toBe(12);
      expect(wrapper.find(".linkStrings").length).toBe(1);
      expect(wrapper.find(".discard").length).toBe(0);
      expect(wrapper.find(".playBtnOpen").length).toBe(1);
    });
    it("reacts to link strings button being clicked", () => {
      wrapper.find(".linkStrings").simulate("click");
      expect(wrapper.find(".tuneBtn").length).toBe(2);
    });
    it("reverts back after 2 clicks on link strings button", () => {
      wrapper.find(".linkStrings").simulate("click");
      wrapper.find(".linkStrings").simulate("click");
      expect(wrapper.find(".tuneBtn").length).toBe(12);
    });
  });
});
