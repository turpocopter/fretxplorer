import React from "react";
import { Provider } from "react-redux";
import { mount } from "enzyme";
import { reducersObject } from "store/reducers";
import { findByTestAttr, setupIntegrationTest } from "../../test/testUtils";
import Modal from "react-modal";

import Selection from "./Selection";

const defaultProps = {};

jest
  .spyOn(Modal, "setAppElement")
  .mockImplementation((param) => console.log(`setAppElement:'${param}'`));
jest.mock("midi-sounds-react");

describe("Selection integration tests", () => {
  let store;
  let dispatchSpy;

  let wrapper;
  let selectionComponent;
  let modesComponent;

  beforeEach(() => {
    ({ store, dispatchSpy } = setupIntegrationTest(reducersObject));
  });
  describe("when there's no selection", () => {
    it("does not render component", () => {
      wrapper = mount(
        <Provider store={store}>
          <Selection type='chord' />
        </Provider>
      );
      const component = findByTestAttr(wrapper, "selection-component");
      expect(component.length).toBe(0);
    });
  });
  describe("there's a chord selected", () => {
    describe("without flats toggled", () => {
      beforeEach(() => {
        store.dispatch({ type: "UPDATE_ROOT", rootNote: 1 });
        store.dispatch({
          type: "UPDATE_QUALITY",
          notes: [
            { semitonesFromRoot: 3, degree: 3 },
            { semitonesFromRoot: 7, degree: 5 },
          ],
        });
        store.dispatch({ type: "UPDATE_CHORD_NAME", name: "m" });
        wrapper = mount(
          <Provider store={store}>
            <Selection type='chord' />
          </Provider>
        );
        selectionComponent = findByTestAttr(wrapper, "selection-component");
        modesComponent = findByTestAttr(wrapper, "modes");
      });
      it("renders without error", () => {
        expect(selectionComponent.length).toBe(1);
      });
      it("has a play button", () => {
        expect(selectionComponent.find(".playChord").length).toBe(1);
      });
      it("displays no modes", () => {
        expect(modesComponent.length).toBe(0);
      });
      it("displays the right name", () => {
        expect(selectionComponent.find("h2").text()).toEqual("C♯m");
      });
      it("displays the right notes", () => {
        expect(selectionComponent.find(".notes .note").length).toBe(3);
        expect(
          selectionComponent.find(".notes .note").at(0).find(".noteName").text()
        ).toEqual("C♯");
        expect(
          selectionComponent.find(".notes .note").at(0).find(".interval").text()
        ).toEqual("R");
        expect(
          selectionComponent.find(".notes .note").at(1).find(".noteName").text()
        ).toEqual("E");
        expect(
          selectionComponent.find(".notes .note").at(1).find(".interval").text()
        ).toEqual("♭3");
        expect(
          selectionComponent.find(".notes .note").at(2).find(".noteName").text()
        ).toEqual("G♯");
        expect(
          selectionComponent.find(".notes .note").at(2).find(".interval").text()
        ).toEqual("5");
      });
    });
    describe("with flats toggled", () => {
      beforeEach(() => {
        store.dispatch({ type: "UPDATE_ROOT", rootNote: 1 });
        store.dispatch({
          type: "UPDATE_QUALITY",
          notes: [
            { semitonesFromRoot: 3, degree: 3 },
            { semitonesFromRoot: 7, degree: 5 },
          ],
        });
        store.dispatch({ type: "TOGGLE_FLATS" });
        store.dispatch({ type: "UPDATE_CHORD_NAME", name: "m" });
        wrapper = mount(
          <Provider store={store}>
            <Selection type='chord' />
          </Provider>
        );
        selectionComponent = findByTestAttr(wrapper, "selection-component");
      });
      it("displays the right name", () => {
        expect(selectionComponent.find("h2").text()).toEqual("D♭m");
      });
      it("displays the right notes", () => {
        expect(selectionComponent.find(".notes .note").length).toBe(3);
        expect(
          selectionComponent.find(".notes .note").at(0).find(".noteName").text()
        ).toEqual("D♭");
        expect(
          selectionComponent.find(".notes .note").at(0).find(".interval").text()
        ).toEqual("R");
        expect(
          selectionComponent.find(".notes .note").at(1).find(".noteName").text()
        ).toEqual("F♭");
        expect(
          selectionComponent.find(".notes .note").at(1).find(".interval").text()
        ).toEqual("♭3");
        expect(
          selectionComponent.find(".notes .note").at(2).find(".noteName").text()
        ).toEqual("A♭");
        expect(
          selectionComponent.find(".notes .note").at(2).find(".interval").text()
        ).toEqual("5");
      });
    });
  });
  describe("there's a scale selected", () => {
    describe("C# hungarian major (implicit intervals)", () => {
      beforeEach(() => {
        store.dispatch({ type: "UPDATE_ROOT", rootNote: 1 });
        store.dispatch({
          type: "UPDATE_SCALE_NOTES",
          semitonesFromRoot: [0, 3, 4, 6, 7, 9, 10],
          displayIntervals: null,
        });
        store.dispatch({
          type: "UPDATE_SCALE_INFO",
          scaleName: "Hungarian major",
          scaleInfo: {
            shortName: "Hungarian major",
            fullName: "Hungarian Major scale",
            semitonesFromRoot: [0, 3, 4, 6, 7, 9, 10],
          },
        });
        wrapper = mount(
          <Provider store={store}>
            <Selection type='scale' />
          </Provider>
        );
        selectionComponent = findByTestAttr(wrapper, "selection-component");
        modesComponent = findByTestAttr(wrapper, "modes");
      });
      it("displays the right name", () => {
        expect(selectionComponent.find("h2").text()).toEqual(
          "C♯ Hungarian major"
        );
      });
      it("displays the right notes", () => {
        expect(selectionComponent.find(".notes .note").length).toBe(7);
        expect(
          selectionComponent.find(".notes .note").at(0).find(".noteName").text()
        ).toEqual("C♯");
        expect(
          selectionComponent.find(".notes .note").at(0).find(".interval").text()
        ).toEqual("1");
        expect(
          selectionComponent.find(".notes .note").at(1).find(".noteName").text()
        ).toEqual("D𝄪");
        expect(
          selectionComponent.find(".notes .note").at(1).find(".interval").text()
        ).toEqual("♯2");
        expect(
          selectionComponent.find(".notes .note").at(2).find(".noteName").text()
        ).toEqual("E♯");
        expect(
          selectionComponent.find(".notes .note").at(2).find(".interval").text()
        ).toEqual("3");
        expect(
          selectionComponent.find(".notes .note").at(3).find(".noteName").text()
        ).toEqual("F𝄪");
        expect(
          selectionComponent.find(".notes .note").at(3).find(".interval").text()
        ).toEqual("♯4");
        expect(
          selectionComponent.find(".notes .note").at(4).find(".noteName").text()
        ).toEqual("G♯");
        expect(
          selectionComponent.find(".notes .note").at(4).find(".interval").text()
        ).toEqual("5");
        expect(
          selectionComponent.find(".notes .note").at(5).find(".noteName").text()
        ).toEqual("A♯");
        expect(
          selectionComponent.find(".notes .note").at(5).find(".interval").text()
        ).toEqual("6");
        expect(
          selectionComponent.find(".notes .note").at(6).find(".noteName").text()
        ).toEqual("B");
        expect(
          selectionComponent.find(".notes .note").at(6).find(".interval").text()
        ).toEqual("♭7");
      });
    });
    describe("Db two semitone tritone (explicit intervals)", () => {
      beforeEach(() => {
        store.dispatch({ type: "UPDATE_ROOT", rootNote: 1 });
        store.dispatch({
          type: "UPDATE_SCALE_NOTES",
          semitonesFromRoot: [0, 1, 2, 6, 7, 8],
          displayIntervals: ["1", "♭2", 2, "♯4", 5, "♭6"],
        });
        store.dispatch({ type: "TOGGLE_FLATS" });
        store.dispatch({
          type: "UPDATE_SCALE_INFO",
          scaleName: "two-semitone tritone",
          scaleInfo: {
            shortName: "two-semitone tritone",
            fullName: "Two-semitone tritone scale",
            semitonesFromRoot: [0, 1, 2, 6, 7, 8],
            displayIntervals: ["1", "♭2", 2, "♯4", 5, "♭6"],
          },
        });
        wrapper = mount(
          <Provider store={store}>
            <Selection type='scale' />
          </Provider>
        );
        selectionComponent = findByTestAttr(wrapper, "selection-component");
        modesComponent = findByTestAttr(wrapper, "modes");
      });
      it("displays the right name", () => {
        expect(selectionComponent.find("h2").text()).toEqual(
          "D♭ two-semitone tritone"
        );
      });
      it("displays the right notes", () => {
        expect(selectionComponent.find(".notes .note").length).toBe(6);
        expect(
          selectionComponent.find(".notes .note").at(0).find(".noteName").text()
        ).toEqual("D♭");
        expect(
          selectionComponent.find(".notes .note").at(0).find(".interval").text()
        ).toEqual("1");
        expect(
          selectionComponent.find(".notes .note").at(1).find(".noteName").text()
        ).toEqual("E𝄫");
        expect(
          selectionComponent.find(".notes .note").at(1).find(".interval").text()
        ).toEqual("♭2");
        expect(
          selectionComponent.find(".notes .note").at(2).find(".noteName").text()
        ).toEqual("E♭");
        expect(
          selectionComponent.find(".notes .note").at(2).find(".interval").text()
        ).toEqual("2");
        expect(
          selectionComponent.find(".notes .note").at(3).find(".noteName").text()
        ).toEqual("G");
        expect(
          selectionComponent.find(".notes .note").at(3).find(".interval").text()
        ).toEqual("♯4");
        expect(
          selectionComponent.find(".notes .note").at(4).find(".noteName").text()
        ).toEqual("A♭");
        expect(
          selectionComponent.find(".notes .note").at(4).find(".interval").text()
        ).toEqual("5");
        expect(
          selectionComponent.find(".notes .note").at(5).find(".noteName").text()
        ).toEqual("B𝄫");
        expect(
          selectionComponent.find(".notes .note").at(5).find(".interval").text()
        ).toEqual("♭6");
      });
    });
  });
});

// TODO when play is clicked, when note is clicked...
