import React from "react";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { mount } from "enzyme";
import { reducersObject } from "store/reducers";
import { setupIntegrationTest } from "../../test/testUtils";
import RootForm from "components/FormParts/RootForm";
import ScalePickerForm from "./ScalePickerForm";

describe("Selection integration tests", () => {
  let store;
  let dispatchSpy;

  let wrapper;

  beforeEach(() => {
    ({ store, dispatchSpy } = setupIntegrationTest(reducersObject));
  });
  describe("when there's no selection", () => {
    it("does not show scale list, pick button", () => {
      wrapper = mount(
        <Provider store={store}>
          <ScalePickerForm />
        </Provider>
      );
      expect(wrapper.find("#scale input").length).toBe(0);
      expect(wrapper.find("button.submitButton").length).toBe(0);
    });
  });
  describe("when only a root note is selected", () => {
    beforeEach(() => {
      wrapper = mount(
        <Provider store={store}>
          <ScalePickerForm />
        </Provider>
      );
      act(() => {
        wrapper
          .find(RootForm)
          .find("input")
          .at(0)
          .props()
          .onChange({ target: { value: 1 } });
      });
      wrapper.update();
    });
    it("shows scale list", () => {
      expect(dispatchSpy).toBeCalledWith({
        type: "UPDATE_ROOT",
        rootNote: 1,
      });
      expect(wrapper.find("#scale input").length).toBe(1);
      expect(wrapper.find("button.submitButton").length).toBe(0);
    });
  });
  describe("when a root note and a scale (with implicit intervals) are selected", () => {
    beforeEach(() => {
      wrapper = mount(
        <Provider store={store}>
          <ScalePickerForm />
        </Provider>
      );
      act(() => {
        wrapper
          .find(RootForm)
          .find("input")
          .at(0)
          .props()
          .onChange({ target: { value: 1 } });
      });
      wrapper.update();
      act(() => {
        wrapper
          .find(RootForm)
          .find("input")
          .at(1)
          .props()
          .onChange({ target: { checked: false } });
      });
      wrapper.update();
      act(() => {
        wrapper
          .find("#scale input")
          .at(0)
          .props()
          .onChange({
            target: { value: "Double harmonic scale" },
            currentTarget: {
              dataset: { category: "Main heptatonic scales" },
            },
          });
      });
      wrapper.update();
    });
    it("shows pick button", () => {
      expect(dispatchSpy).toBeCalledWith({
        type: "UPDATE_ROOT",
        rootNote: 1,
      });
      expect(dispatchSpy).toBeCalledWith({
        type: "TOGGLE_FLATS",
      });
      expect(dispatchSpy).toBeCalledWith({
        type: "UPDATE_SCALE_NOTES",
        semitonesFromRoot: [0, 1, 4, 5, 7, 8, 11],
        displayIntervals: null,
      });
      expect(wrapper.find("button.submitButton").length).toBe(1);
      expect(wrapper.find("button.submitButton").text()).toBe(
        "PICK D♭ double harmonic"
      );
    });
  });
});
