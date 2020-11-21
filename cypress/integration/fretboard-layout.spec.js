/* eslint-disable no-undef */

import {
	checkFretsDirection,
	checkPegsDirection,
	checkStringsDirection,
	pickChord,
} from "./util";

describe("fretboard layout tests", () => {
	beforeEach(() => {
		cy.visit("/chordpicker");
		cy.get(".chordPickerForm").as("cpf");
	});
	describe("on portrait devices", () => {
		beforeEach(() => {
			cy.viewport(600, 800);
			pickChord();
			cy.get(".fretboardWrapper .tuning").as("tu");
		});
		it("displays tuner folded", () => {
			cy.get("@tu").find(".presets").should("not.exist");
			cy.get("@tu").find(".peg button").should("not.exist");
			cy.get("@tu").find(".discard").should("not.exist");
			cy.get("@tu").find(".playBtnOpen").should("not.exist");
			cy.get("@tu").find(".linkStrings").should("not.exist");
		});
		it("unfolds tuner when button is clicked", () => {
			cy.get("@tu").find(".settings").click();
			cy.get("@tu").find(".presets").should("be.visible");
			cy.get("@tu")
				.find(".peg button")
				.should("be.visible")
				.should("have.length", 12);
			cy.get("@tu").find(".discard").should("be.visible");
			cy.get("@tu").find(".playBtnOpen").should("be.visible");
			cy.get("@tu").find(".linkStrings").should("be.visible");
		});
		describe("right-handed is selected", () => {
			it("displays tuning pegs from left to right - when folded", () => {
				checkPegsDirection("@tu");
			});
			it("displays tuning pegs from left to right - when unfolded", () => {
				cy.get("@tu").find(".settings").click();
				checkPegsDirection("@tu");
			});
			it("displays strings from left to right", () => {
				checkStringsDirection(".fretboardWrapper .StringList");
			});
		});
		describe("left-handed is selected", () => {
			beforeEach(() => {
				cy.visit("/settings");
				cy.get(".handSwitch").click();
				cy.visit("/chordpicker");
				pickChord();
			});
			it("displays tuning pegs from right to left - when folded", () => {
				checkPegsDirection("@tu", true);
			});
			it("displays tuning pegs from right to left - when unfolded", () => {
				cy.get("@tu").find(".settings").click();
				checkPegsDirection("@tu", true);
			});
			it("displays strings from right to left", () => {
				checkStringsDirection(".fretboardWrapper .StringList", true);
			});
		});
	});

	describe("on large landscape devices", () => {
		beforeEach(() => {
			cy.viewport(1024, 768);
			cy.get(".fretboardWrapper .tuning").as("tu");
		});
		it("displays tuner permanently folded", () => {
			cy.get("@tu").find(".presets").should("not.exist");
			cy.get("@tu").find(".peg button").should("not.exist");
			cy.get("@tu").find(".discard").should("not.exist");
			cy.get("@tu").find(".playBtnOpen").should("not.exist");
			cy.get("@tu").find(".linkStrings").should("not.exist");
			cy.get("@tu").find(".settings").should("not.be.visible");
		});

		describe("right-handed is selected", () => {
			it("displays pegs from bottom to top", () => {
				checkPegsDirection("@tu", false, true);
			});
			it("shows tuner (ie scrolls to the correct position", () => {
				cy.get(".fretboardScroller .tuning").should("be.visible");
			});
			it("displays strings from bottom to top", () => {
				checkStringsDirection(".fretboardWrapper .StringList", false, true);
			});
			it("displays frets from left to right", () => {
				checkFretsDirection(".fretboardWrapper .string-6 .Frets");
			});
		});
		describe("left-handed is selected", () => {
			beforeEach(() => {
				cy.visit("/settings");
				cy.get(".handSwitch").click();
				cy.visit("/chordpicker");
			});
			it("displays pegs from bottom to top", () => {
				checkPegsDirection("@tu", false, true);
			});
			it("shows tuner (ie scrolls to the correct position", () => {
				cy.get(".fretboardScroller .tuning").should("be.visible");
			});
			it("displays strings from bottom to top", () => {
				checkStringsDirection(".fretboardWrapper .StringList", false, true);
			});
			it("displays frets from right to left", () => {
				checkFretsDirection(".fretboardWrapper .string-6 .Frets", true);
			});
		});
	});
});
