import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { mount } from "enzyme";
import { reducersObject } from "store/reducers";
import { findByTestAttr, setupIntegrationTest } from "../../test/testUtils";
import RootForm from "components/FormParts/RootForm";
import QualityForm from "components/FormParts/Chord/QualityForm";
import SeventhForm from "components/FormParts/Chord/SeventhForm";
import ExtensionForm from "components/FormParts/Chord/ExtensionForm";
import ChordPickerForm from "./ChordPickerForm";

/*
jest
  .spyOn(Modal, "setAppElement")
  .mockImplementation((param) => console.log(`setAppElement:'${param}'`));
jest.mock("midi-sounds-react");*/

describe("Selection integration tests", () => {
  let store;
  let dispatchSpy;

  let wrapper;

  beforeEach(() => {
    ({ store, dispatchSpy } = setupIntegrationTest(reducersObject));
  });
  describe("when there's no selection", () => {
    it("does not show quality, 7th, extension, pick button", () => {
      wrapper = mount(
        <Provider store={store}>
          <ChordPickerForm />
        </Provider>
      );
      expect(findByTestAttr(wrapper, "quality-form").length).toBe(0);
      expect(findByTestAttr(wrapper, "seventh-form").length).toBe(0);
      expect(findByTestAttr(wrapper, "extension-form").length).toBe(0);
      expect(wrapper.find(".submitButton").length).toBe(0);
    });
  });
  describe("when there's only a root selected", () => {
    beforeEach(() => {
      wrapper = mount(
        <Provider store={store}>
          <ChordPickerForm />
        </Provider>
      );
      wrapper
        .find(RootForm)
        .find("input")
        .at(0)
        .props()
        .onChange({ target: { value: 1 } });
      wrapper.update();
    });
    it("shows quality", () => {
      expect(dispatchSpy).toBeCalledWith({ type: "UPDATE_ROOT", rootNote: 1 });
      expect(wrapper.find(RootForm).length).toBe(1);
      expect(wrapper.find(QualityForm).length).toBe(1);
    });
    it("does not show 7th, extension, pick button", () => {
      expect(wrapper.find(SeventhForm).length).toBe(0);
      expect(wrapper.find(ExtensionForm).length).toBe(0);
      expect(wrapper.find("button.submitButton").length).toBe(0);
    });
  });
  describe("when there's only a root and a quality selected", () => {
    describe("C# major", () => {
      beforeEach(() => {
        wrapper = mount(
          <Provider store={store}>
            <ChordPickerForm />
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
            .find(QualityForm)
            .find("input")
            .at(0)
            .props()
            .onChange({ target: { value: "major" } });
        });
        wrapper.update();
      });
      it("shows 7th, pick button, doesn't show extension", () => {
        expect(wrapper.find(SeventhForm).length).toBe(1);
        expect(wrapper.find(ExtensionForm).length).toBe(0);
        expect(wrapper.find("button.submitButton").length).toBe(1);
        expect(
          wrapper.find("button.submitButton").text().split(/(\s+)/)[2]
        ).toBe("C♯");
      });
    });
    describe("D♭ major", () => {
      beforeEach(() => {
        wrapper = mount(
          <Provider store={store}>
            <ChordPickerForm />
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
            .find(QualityForm)
            .find("input")
            .at(0)
            .props()
            .onChange({ target: { value: "major" } });
        });
        wrapper.update();
      });
      it("shows 7th, pick button, doesn't show extension", () => {
        expect(wrapper.find(SeventhForm).length).toBe(1);
        expect(wrapper.find(ExtensionForm).length).toBe(0);
        expect(wrapper.find("button.submitButton").length).toBe(1);
        expect(
          wrapper.find("button.submitButton").text().split(/(\s+)/)[2]
        ).toBe("D♭");
      });
    });
    describe("D♭ minor", () => {
      beforeEach(() => {
        wrapper = mount(
          <Provider store={store}>
            <ChordPickerForm />
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
            .find(QualityForm)
            .find("input")
            .at(0)
            .props()
            .onChange({ target: { value: "minor" } });
        });
        wrapper.update();
      });
      it("shows 7th, pick button, doesn't show extension", () => {
        expect(wrapper.find(SeventhForm).length).toBe(1);
        expect(wrapper.find(ExtensionForm).length).toBe(0);
        expect(wrapper.find("button.submitButton").length).toBe(1);
        expect(
          wrapper.find("button.submitButton").text().split(/(\s+)/)[2]
        ).toBe("D♭m");
      });
    });
  });
  describe("with 7th", () => {
    describe("DbmM7", () => {
      beforeEach(() => {
        wrapper = mount(
          <Provider store={store}>
            <ChordPickerForm />
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
            .find(QualityForm)
            .find("input")
            .at(0)
            .props()
            .onChange({ target: { value: "minor" } });
        });
        wrapper.update();
        act(() => {
          wrapper
            .find(SeventhForm)
            .find("input")
            .at(0)
            .props()
            .onChange({ target: { value: "major" } });
        });
        wrapper.update();
      });
      it("shows everything", () => {
        expect(wrapper.find(SeventhForm).length).toBe(1);
        expect(wrapper.find(ExtensionForm).length).toBe(1);
        expect(wrapper.find("button.submitButton").length).toBe(1);
        expect(
          wrapper.find("button.submitButton").text().split(/(\s+)/)[2]
        ).toBe("D♭mM7");
      });
    });
  });
});
