/* eslint-disable no-undef */

import { checkPegsDirection, pickChord, pickScale } from "./util";

const pages = [
	{
		name: "chordpicker",
		linkText: "Chords",
		linkTextMobile: "Pick a Chord",
		pickSelection: () => pickChord(true),
	},
	{
		name: "scalepicker",
		linkText: "Scales",
		linkTextMobile: "Pick a Scale",
		pickSelection: () => pickScale(true),
	},
];

beforeEach(() => {
	localStorage.removeItem("fretxplorerNoteNaming");
	localStorage.removeItem("fretxplorerLeftHanded");
	cy.visit("/settings");
	cy.viewport(1200, 800);
	cy.get(".tuning").as("tuner");
	cy.get("@tuner").find(".presets .textField").as("presets");
	cy.get("@presets").click();
	cy.get(".MuiPopover-root").contains("(Standard)").click();
});
describe("Tuner in settings page", () => {
	it("reads pegs from left to right no matter if left- or right-handed", () => {
		checkPegsDirection("@tuner");
		cy.get(".handSwitch").click();
		checkPegsDirection("@tuner");
	});
	it("changes preset names when note naming convention is changed", () => {
		cy.get("@presets").contains("EADGBE (Standard)");
		cy.get("@tuner").find(".peg:first-child div").contains("E");
		cy.get("@tuner").find(".peg:nth-child(2) div").contains("A");
		cy.get("@tuner").find(".peg:nth-child(3) div").contains("D");
		cy.get("@tuner").find(".peg:nth-child(4) div").contains("G");
		cy.get("@tuner").find(".peg:nth-child(5) div").contains("B");
		cy.get("@tuner").find(".peg:nth-child(6) div").contains("E");

		cy.get(".noteNamingSwitch").click();
		cy.get("@presets").contains("Mi La Re Sol Si Mi (Standard)");
		cy.get("@tuner").find(".peg:first-child div").contains("Mi");
		cy.get("@tuner").find(".peg:nth-child(2) div").contains("La");
		cy.get("@tuner").find(".peg:nth-child(3) div").contains("Re");
		cy.get("@tuner").find(".peg:nth-child(4) div").contains("Sol");
		cy.get("@tuner").find(".peg:nth-child(5) div").contains("Si");
		cy.get("@tuner").find(".peg:nth-child(6) div").contains("Mi");

		cy.get(".noteNamingSwitch").click();
		cy.get("@presets").contains("EADGBE (Standard)");
		cy.get("@tuner").find(".peg:first-child div").contains("E");
		cy.get("@tuner").find(".peg:nth-child(2) div").contains("A");
		cy.get("@tuner").find(".peg:nth-child(3) div").contains("D");
		cy.get("@tuner").find(".peg:nth-child(4) div").contains("G");
		cy.get("@tuner").find(".peg:nth-child(5) div").contains("B");
		cy.get("@tuner").find(".peg:nth-child(6) div").contains("E");
	});
	it("selects the right preset when the notes are selected individually", () => {
		cy.get("@tuner").find(".peg:first-child .tuneDownBtn").click();
		cy.get("@presets").find("input").should("have.attr", "value", "");
		cy.get("@tuner").find(".peg:first-child .tuneDownBtn").click();
		cy.get("@presets").contains("DADGBE (Drop D)");
		cy.get(".noteNamingSwitch").click();
		cy.get("@presets").contains("Re La Re Sol Si Mi (Drop Re)");
		cy.get("@tuner").find(".peg:nth-child(5) .tuneDownBtn").click();
		cy.get("@tuner").find(".peg:nth-child(5) .tuneDownBtn").click();
		cy.get("@tuner").find(".peg:nth-child(6) .tuneDownBtn").click();
		cy.get("@tuner").find(".peg:nth-child(6) .tuneDownBtn").click();
		cy.get("@presets").contains("Re La Re Sol La Re (Resus4)");
		cy.get(".noteNamingSwitch").click();
		cy.get("@presets").contains("DADGAD (Dsus4)");
	});
	it("keeps settings cross-pages", () => {
		cy.get("@tuner").find(".peg:first-child .tuneDownBtn").click();
		cy.get("@tuner").find(".peg:first-child .tuneDownBtn").click();
		cy.get("@tuner").find(".peg:nth-child(5) .tuneDownBtn").click();
		cy.get("@tuner").find(".peg:nth-child(5) .tuneDownBtn").click();
		cy.get("@tuner").find(".peg:nth-child(6) .tuneDownBtn").click();
		cy.get("@tuner").find(".peg:nth-child(6) .tuneDownBtn").click();
		cy.get(".noteNamingSwitch").click();
		cy.get(".MainMenu").contains("Chords").click();
		cy.get(".persistentTuner").as("pt");
		cy.get("@pt").find(".presets").contains("Re La Re Sol La Re (Resus4)");
		cy.get("@pt").find(".peg:first-child div").contains("Re");
		cy.get("@pt").find(".peg:nth-child(2) div").contains("La");
		cy.get("@pt").find(".peg:nth-child(3) div").contains("Re");
		cy.get("@pt").find(".peg:nth-child(4) div").contains("Sol");
		cy.get("@pt").find(".peg:nth-child(5) div").contains("La");
		cy.get("@pt").find(".peg:nth-child(6) div").contains("Re");
	});
});

pages.forEach((page) => {
	describe(`Tuner in ${page.name} page`, () => {
		beforeEach(() => {
			cy.get("@tuner").find(".peg:first-child .tuneDownBtn").click();
			cy.get("@tuner").find(".peg:first-child .tuneDownBtn").click();
			cy.get("@tuner").find(".peg:nth-child(5) .tuneDownBtn").click();
			cy.get("@tuner").find(".peg:nth-child(5) .tuneDownBtn").click();
			cy.get("@tuner").find(".peg:nth-child(6) .tuneDownBtn").click();
			cy.get("@tuner").find(".peg:nth-child(6) .tuneDownBtn").click();
			cy.get(".noteNamingSwitch").click();
		});
		describe("on large screens", () => {
			it("reads pegs from left to right no matter if left- or right-handed", () => {
				cy.get(".MainMenu").contains(page.linkText).click();
				cy.get(".persistentTuner").as("pt");
				checkPegsDirection("@pt");
				cy.get(".MainMenu").contains("Settings").click();
				cy.get(".handSwitch").click();
				cy.get(".MainMenu").contains(page.linkText).click();
				checkPegsDirection("@pt");
			});
		});
		describe("on smaller screens", () => {
			beforeEach(() => {
				cy.viewport(320, 568);
				cy.get(".MenuButton").click();
				cy.get(".SideDrawer .Navigation").contains(page.linkTextMobile).click();
			});
			it("read pegs from L to R if right-handed, R to L if left-handed", () => {
				page.pickSelection();
				cy.get(".fretboardContainer .tuning").as("tu");
				checkPegsDirection("@tu");
				cy.get(".MenuButton").click();
				cy.get(".SideDrawer .Navigation")
					.contains("Settings", { timeout: 10000 })
					.click();
				cy.get(".handSwitch").click();
				cy.get(".MenuButton").click();
				cy.get(".SideDrawer .Navigation").contains(page.linkTextMobile).click();
				page.pickSelection();
				checkPegsDirection("@tu", true);
			});
		});
	});
});
