/* eslint-disable no-undef */
describe("select a scale with modes", () => {
	beforeEach(() => {
		cy.visit("/scalepicker");
		cy.viewport(1200, 800);
		cy.get(".scalePickerForm").as("spf");
		cy.get("@spf").find(".rootForm .textField").as("rootField");
		cy.get("@spf").find(".scaleList").as("scaleField");
		cy.get(".fretboardContainer").as("fbc");
		cy.get(".persistentTuner").as("pt");
		cy.get("@pt").find(".presets .textField").as("presets");
		cy.get("@presets").click();
		cy.get(".MuiPopover-root").contains("(Standard)").click();
		cy.get("@rootField").click();
		cy.get(".MuiPopover-root").contains("C♯").click();
	});
	describe("with implicit intervals (ie harmonic minor)", () => {
		beforeEach(() => {
			cy.get("@scaleField").click();
			cy.get(".MuiPopover-root").contains("Harmonic minor scale").click();
			cy.get("@spf").find(".submitButton").click();
			cy.get(".selection").as("sel");
		});
		it("shows correct intervals", () => {
			cy.get("@sel").find("h2").contains("C♯ harmonic minor");
			cy.get("@sel").find(".notes .note:first-child .noteName").contains("C♯");
			cy.get("@sel").find(".notes .note:first-child .interval").contains("1");
			cy.get("@sel").find(".notes .note:nth-child(2) .noteName").contains("D♯");
			cy.get("@sel").find(".notes .note:nth-child(2) .interval").contains("2");
			cy.get("@sel").find(".notes .note:nth-child(3) .noteName").contains("E");
			cy.get("@sel").find(".notes .note:nth-child(3) .interval").contains("♭3");
			cy.get("@sel").find(".notes .note:nth-child(4) .noteName").contains("F♯");
			cy.get("@sel").find(".notes .note:nth-child(4) .interval").contains("4");
			cy.get("@sel").find(".notes .note:nth-child(5) .noteName").contains("G♯");
			cy.get("@sel").find(".notes .note:nth-child(5) .interval").contains("5");
			cy.get("@sel").find(".notes .note:nth-child(6) .noteName").contains("A");
			cy.get("@sel").find(".notes .note:nth-child(6) .interval").contains("♭6");
			cy.get("@sel").find(".notes .note:nth-child(7) .noteName").contains("B♯");
			cy.get("@sel").find(".notes .note:nth-child(7) .interval").contains("7");
		});
		describe("navigating relative modes", () => {
			it("shows correct relative modes", () => {
				cy.get("@sel").find(".modeSelector .textField").as("modeField");
				cy.get("@modeField").click();
				cy.get(".MuiPopover-root").contains("C♯ harmonic minor");
				cy.get(".MuiPopover-root").contains("D♯ Locrian ♮6");
				cy.get(".MuiPopover-root").contains("E Ionian ♯5");
				cy.get(".MuiPopover-root").contains("F♯ Dorian altered");
				cy.get(".MuiPopover-root").contains("G♯ Phrygian dominant");
				cy.get(".MuiPopover-root").contains("A Lydian ♯2");
				cy.get(".MuiPopover-root").contains("B♯ altered diminished");
			});
			it("displays relative modes with correct intervals", () => {
				cy.get("@sel").find(".modeSelector .textField").as("modeField");
				cy.get("@modeField").click();
				cy.get(".MuiPopover-root").contains("F♯ Dorian altered").click();
				cy.get("@sel")
					.find(".notes .note:first-child .noteName")
					.contains("F♯");
				cy.get("@sel").find(".notes .note:first-child .interval").contains("1");
				cy.get("@sel")
					.find(".notes .note:nth-child(2) .noteName")
					.contains("G♯");
				cy.get("@sel")
					.find(".notes .note:nth-child(2) .interval")
					.contains("2");
				cy.get("@sel")
					.find(".notes .note:nth-child(3) .noteName")
					.contains("A");
				cy.get("@sel")
					.find(".notes .note:nth-child(3) .interval")
					.contains("♭3");
				cy.get("@sel")
					.find(".notes .note:nth-child(4) .noteName")
					.contains("B♯");
				cy.get("@sel")
					.find(".notes .note:nth-child(4) .interval")
					.contains("♯4");
				cy.get("@sel")
					.find(".notes .note:nth-child(5) .noteName")
					.contains("C♯");
				cy.get("@sel")
					.find(".notes .note:nth-child(5) .interval")
					.contains("5");
				cy.get("@sel")
					.find(".notes .note:nth-child(6) .noteName")
					.contains("D♯");
				cy.get("@sel")
					.find(".notes .note:nth-child(6) .interval")
					.contains("6");
				cy.get("@sel")
					.find(".notes .note:nth-child(7) .noteName")
					.contains("E");
				cy.get("@sel")
					.find(".notes .note:nth-child(7) .interval")
					.contains("♭7");
			});
		});
		describe("switching to parallel modes", () => {
			beforeEach(() => {
				cy.get("@sel").find(".modeSelector .textField").as("modeField");
				cy.get("@modeField").click();
				cy.get(".MuiPopover-root").contains("F♯ Dorian altered").click();
				cy.get(".modeSwitch .flatSwitch").click();
				cy.get("@modeField").click();
			});
			it("shows correct parallel modes", () => {
				cy.get(".MuiPopover-root").contains("F♯ harmonic minor");
				cy.get(".MuiPopover-root").contains("F♯ Locrian ♮6");
				cy.get(".MuiPopover-root").contains("F♯ Ionian ♯5");
				cy.get(".MuiPopover-root").contains("F♯ Dorian altered");
				cy.get(".MuiPopover-root").contains("F♯ Phrygian dominant");
				cy.get(".MuiPopover-root").contains("F♯ Lydian ♯2");
				cy.get(".MuiPopover-root").contains("F♯ altered diminished");
			});
			it("displays parallel modes with correct intervals", () => {
				cy.get(".MuiPopover-root").contains("F♯ Locrian ♮6").click();
				cy.get("@sel").find("h2").contains("F♯ Locrian ♮6");
				cy.get("@sel")
					.find(".notes .note:first-child .noteName")
					.contains("F♯");
				cy.get("@sel").find(".notes .note:first-child .interval").contains("1");
				cy.get("@sel")
					.find(".notes .note:nth-child(2) .noteName")
					.contains("G");
				cy.get("@sel")
					.find(".notes .note:nth-child(2) .interval")
					.contains("♭2");
				cy.get("@sel")
					.find(".notes .note:nth-child(3) .noteName")
					.contains("A");
				cy.get("@sel")
					.find(".notes .note:nth-child(3) .interval")
					.contains("♭3");
				cy.get("@sel")
					.find(".notes .note:nth-child(4) .noteName")
					.contains("B");
				cy.get("@sel")
					.find(".notes .note:nth-child(4) .interval")
					.contains("4");
				cy.get("@sel")
					.find(".notes .note:nth-child(5) .noteName")
					.contains("C");
				cy.get("@sel")
					.find(".notes .note:nth-child(5) .interval")
					.contains("♭5");
				cy.get("@sel")
					.find(".notes .note:nth-child(6) .noteName")
					.contains("D♯");
				cy.get("@sel")
					.find(".notes .note:nth-child(6) .interval")
					.contains("6");
				cy.get("@sel")
					.find(".notes .note:nth-child(7) .noteName")
					.contains("E");
				cy.get("@sel")
					.find(".notes .note:nth-child(7) .interval")
					.contains("♭7");
			});
		});
	});
	describe("with explicit intervals (ie pentatonic)", () => {
		beforeEach(() => {
			cy.get("@scaleField").click();
			cy.get(".MuiPopover-root").contains("Pentatonic major scale").click();
			cy.get("@spf").find(".submitButton").click();
			cy.get(".selection").as("sel");
		});
		it("shows correct intervals", () => {
			cy.get("@sel").find("h2").contains("C♯ pentatonic major");
			cy.get("@sel").find(".notes .note:first-child .noteName").contains("C♯");
			cy.get("@sel").find(".notes .note:first-child .interval").contains("1");
			cy.get("@sel").find(".notes .note:nth-child(2) .noteName").contains("D♯");
			cy.get("@sel").find(".notes .note:nth-child(2) .interval").contains("2");
			cy.get("@sel").find(".notes .note:nth-child(3) .noteName").contains("E♯");
			cy.get("@sel").find(".notes .note:nth-child(3) .interval").contains("3");
			cy.get("@sel").find(".notes .note:nth-child(4) .noteName").contains("G♯");
			cy.get("@sel").find(".notes .note:nth-child(4) .interval").contains("5");
			cy.get("@sel").find(".notes .note:nth-child(5) .noteName").contains("A♯");
			cy.get("@sel").find(".notes .note:nth-child(5) .interval").contains("6");
		});
		describe("navigating relative modes", () => {
			it("shows correct relative modes", () => {
				cy.get("@sel").find(".modeSelector .textField").as("modeField");
				cy.get("@modeField").click();
				cy.get(".MuiPopover-root").contains("C♯ pentatonic major");
				cy.get(".MuiPopover-root").contains("D♯ suspended pentatonic");
				cy.get(".MuiPopover-root").contains("E♯ blues minor pentatonic");
				cy.get(".MuiPopover-root").contains("G♯ blues major pentatonic");
				cy.get(".MuiPopover-root").contains("A♯ pentatonic minor");
			});
			it("displays relative modes with correct intervals", () => {
				cy.get("@sel").find(".modeSelector .textField").as("modeField");
				cy.get("@modeField").click();
				cy.get(".MuiPopover-root")
					.contains("G♯ blues major pentatonic")
					.click();
				cy.get("@sel")
					.find(".notes .note:first-child .noteName")
					.contains("G♯");
				cy.get("@sel").find(".notes .note:first-child .interval").contains("1");
				cy.get("@sel")
					.find(".notes .note:nth-child(2) .noteName")
					.contains("A♯");
				cy.get("@sel")
					.find(".notes .note:nth-child(2) .interval")
					.contains("2");
				cy.get("@sel")
					.find(".notes .note:nth-child(3) .noteName")
					.contains("C♯");
				cy.get("@sel")
					.find(".notes .note:nth-child(3) .interval")
					.contains("4");
				cy.get("@sel")
					.find(".notes .note:nth-child(4) .noteName")
					.contains("D♯");
				cy.get("@sel")
					.find(".notes .note:nth-child(4) .interval")
					.contains("5");
				cy.get("@sel")
					.find(".notes .note:nth-child(5) .noteName")
					.contains("E♯");
				cy.get("@sel")
					.find(".notes .note:nth-child(5) .interval")
					.contains("6");
			});
		});
		describe("switching to parallel modes", () => {
			beforeEach(() => {
				cy.get("@sel").find(".modeSelector .textField").as("modeField");
				cy.get("@modeField").click();
				cy.get(".MuiPopover-root")
					.contains("E♯ blues minor pentatonic")
					.click();
				cy.get(".modeSwitch .flatSwitch").click();
				cy.get("@modeField").click();
			});
			it("shows correct parallel modes", () => {
				cy.get(".MuiPopover-root").contains("E♯ pentatonic major");
				cy.get(".MuiPopover-root").contains("E♯ suspended pentatonic");
				cy.get(".MuiPopover-root").contains("E♯ blues minor pentatonic");
				cy.get(".MuiPopover-root").contains("E♯ blues major pentatonic");
				cy.get(".MuiPopover-root").contains("E♯ pentatonic minor");
			});
			it("displays parallel modes with correct intervals", () => {
				cy.get(".MuiPopover-root")
					.contains("E♯ blues major pentatonic")
					.click();
				cy.get("@sel").find("h2").contains("F blues major pentatonic");
				cy.get("@sel").find(".notes .note:first-child .noteName").contains("F");
				cy.get("@sel").find(".notes .note:first-child .interval").contains("1");
				cy.get("@sel")
					.find(".notes .note:nth-child(2) .noteName")
					.contains("G");
				cy.get("@sel")
					.find(".notes .note:nth-child(2) .interval")
					.contains("2");
				cy.get("@sel")
					.find(".notes .note:nth-child(3) .noteName")
					.contains("B♭");
				cy.get("@sel")
					.find(".notes .note:nth-child(3) .interval")
					.contains("4");
				cy.get("@sel")
					.find(".notes .note:nth-child(4) .noteName")
					.contains("C");
				cy.get("@sel")
					.find(".notes .note:nth-child(4) .interval")
					.contains("5");
				cy.get("@sel")
					.find(".notes .note:nth-child(5) .noteName")
					.contains("D");
				cy.get("@sel")
					.find(".notes .note:nth-child(5) .interval")
					.contains("6");
			});
		});
	});
	describe("direct link to a mode (ie natural minor)", () => {
		beforeEach(() => {
			cy.get("@spf").find(".rootForm .flatSwitch").click();
			cy.get("@scaleField").click();
			cy.get(".MuiPopover-root").contains("Natural minor scale").click();
			cy.get("@spf").find(".submitButton").click();
			cy.get(".selection").as("sel");
		});
		it("shows correct intervals", () => {
			cy.get("@sel").find("h2").contains("D♭ minor");
			cy.get("@sel").find(".notes .note:first-child .noteName").contains("D♭");
			cy.get("@sel").find(".notes .note:first-child .interval").contains("1");
			cy.get("@sel").find(".notes .note:nth-child(2) .noteName").contains("E♭");
			cy.get("@sel").find(".notes .note:nth-child(2) .interval").contains("2");
			cy.get("@sel").find(".notes .note:nth-child(3) .noteName").contains("F♭");
			cy.get("@sel").find(".notes .note:nth-child(3) .interval").contains("♭3");
			cy.get("@sel").find(".notes .note:nth-child(4) .noteName").contains("G♭");
			cy.get("@sel").find(".notes .note:nth-child(4) .interval").contains("4");
			cy.get("@sel").find(".notes .note:nth-child(5) .noteName").contains("A♭");
			cy.get("@sel").find(".notes .note:nth-child(5) .interval").contains("5");
			cy.get("@sel").find(".notes .note:nth-child(6) .noteName").contains("B𝄫");
			cy.get("@sel").find(".notes .note:nth-child(6) .interval").contains("♭6");
			cy.get("@sel").find(".notes .note:nth-child(7) .noteName").contains("C♭");
			cy.get("@sel").find(".notes .note:nth-child(7) .interval").contains("♭7");
		});
		describe("navigating relative modes", () => {
			it("shows correct relative modes", () => {
				cy.get("@sel").find(".modeSelector .textField").as("modeField");
				cy.get("@modeField").click();
				cy.get(".MuiPopover-root").contains("F♭ Ionian");
				cy.get(".MuiPopover-root").contains("G♭ Dorian");
				cy.get(".MuiPopover-root").contains("A♭ Phrygian");
				cy.get(".MuiPopover-root").contains("B𝄫 Lydian");
				cy.get(".MuiPopover-root").contains("C♭ Mixolydian");
				cy.get(".MuiPopover-root").contains("D♭ Aeolian");
				cy.get(".MuiPopover-root").contains("E♭ Locrian");
			});
			it("displays relative modes with correct intervals", () => {
				cy.get("@sel").find(".modeSelector .textField").as("modeField");
				cy.get("@modeField").click();
				cy.get(".MuiPopover-root").contains("B𝄫 Lydian").click();
				cy.get("@sel")
					.find(".notes .note:first-child .noteName")
					.contains("B𝄫");
				cy.get("@sel").find(".notes .note:first-child .interval").contains("1");
				cy.get("@sel")
					.find(".notes .note:nth-child(2) .noteName")
					.contains("C♭");
				cy.get("@sel")
					.find(".notes .note:nth-child(2) .interval")
					.contains("2");
				cy.get("@sel")
					.find(".notes .note:nth-child(3) .noteName")
					.contains("D♭");
				cy.get("@sel")
					.find(".notes .note:nth-child(3) .interval")
					.contains("3");
				cy.get("@sel")
					.find(".notes .note:nth-child(4) .noteName")
					.contains("E♭");
				cy.get("@sel")
					.find(".notes .note:nth-child(4) .interval")
					.contains("♯4");
				cy.get("@sel")
					.find(".notes .note:nth-child(5) .noteName")
					.contains("F♭");
				cy.get("@sel")
					.find(".notes .note:nth-child(5) .interval")
					.contains("5");
				cy.get("@sel")
					.find(".notes .note:nth-child(6) .noteName")
					.contains("G♭");
				cy.get("@sel")
					.find(".notes .note:nth-child(6) .interval")
					.contains("6");
				cy.get("@sel")
					.find(".notes .note:nth-child(7) .noteName")
					.contains("A♭");
				cy.get("@sel")
					.find(".notes .note:nth-child(7) .interval")
					.contains("7");
			});
		});

		describe("switching to parallel modes", () => {
			beforeEach(() => {
				cy.get("@sel").find(".modeSelector .textField").as("modeField");
				cy.get("@modeField").click();
				cy.get(".MuiPopover-root").contains("A♭ Phrygian").click();
				cy.get(".modeSwitch .flatSwitch").click();
				cy.get("@modeField").click();
			});
			it("shows correct parallel modes", () => {
				cy.get(".MuiPopover-root").contains("A♭ Ionian");
				cy.get(".MuiPopover-root").contains("A♭ Dorian");
				cy.get(".MuiPopover-root").contains("A♭ Phrygian");
				cy.get(".MuiPopover-root").contains("A♭ Lydian");
				cy.get(".MuiPopover-root").contains("A♭ Mixolydian");
				cy.get(".MuiPopover-root").contains("A♭ Aeolian");
				cy.get(".MuiPopover-root").contains("A♭ Locrian");
			});
			it("displays parallel modes with correct intervals", () => {
				cy.get(".MuiPopover-root").contains("A♭ Locrian").click();
				cy.get("@sel").find("h2").contains("A♭ Locrian");
				cy.get("@sel")
					.find(".notes .note:first-child .noteName")
					.contains("A♭");
				cy.get("@sel").find(".notes .note:first-child .interval").contains("1");
				cy.get("@sel")
					.find(".notes .note:nth-child(2) .noteName")
					.contains("B𝄫");
				cy.get("@sel")
					.find(".notes .note:nth-child(2) .interval")
					.contains("♭2");
				cy.get("@sel")
					.find(".notes .note:nth-child(3) .noteName")
					.contains("C♭");
				cy.get("@sel")
					.find(".notes .note:nth-child(3) .interval")
					.contains("♭3");
				cy.get("@sel")
					.find(".notes .note:nth-child(4) .noteName")
					.contains("D♭");
				cy.get("@sel")
					.find(".notes .note:nth-child(4) .interval")
					.contains("4");
				cy.get("@sel")
					.find(".notes .note:nth-child(5) .noteName")
					.contains("E𝄫");
				cy.get("@sel")
					.find(".notes .note:nth-child(5) .interval")
					.contains("♭5");
				cy.get("@sel")
					.find(".notes .note:nth-child(6) .noteName")
					.contains("F♭");
				cy.get("@sel")
					.find(".notes .note:nth-child(6) .interval")
					.contains("♭6");
				cy.get("@sel")
					.find(".notes .note:nth-child(7) .noteName")
					.contains("G♭");
				cy.get("@sel")
					.find(".notes .note:nth-child(7) .interval")
					.contains("♭7");
			});
		});
	});
});
