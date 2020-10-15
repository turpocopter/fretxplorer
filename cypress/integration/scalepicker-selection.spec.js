/* eslint-disable no-undef */

const checkInitialState = () => {
  cy.get("@spf").should("be.visible");
  cy.get("@rootField").should("be.visible");
  cy.get("@rootField").find(".select").should("not.have.class", "Mui-disabled");
  cy.get("@scaleField").should("be.visible");
  cy.get("@scaleField").find(".select").should("have.class", "Mui-disabled");
  cy.get("@spf").find(".submitButton").should("not.be.visible");
};

describe("Scalepicker selection tests", () => {
  beforeEach(() => {
    cy.visit("/scalepicker");
    cy.viewport(1200, 800);
    cy.get(".scalePickerForm").as("spf");
    cy.get("@spf").find(".rootForm .textField").as("rootField");
    cy.get("@spf").find(".scaleList").as("scaleField");
    cy.get(".fretboardContainer").as("fbc");
    cy.get(".persistentTuner").as("pt");
    cy.get("@pt").find(".presets .textField").as("presets");
  });
  it("starts with root note selectable, scale list visible but disabled, submit button invisible", () => {
    checkInitialState();
  });

  it("evolves correctly when a scale is selected", () => {
    cy.get("@presets").click();
    cy.get(".MuiPopover-root").contains("(Standard)").click();
    cy.get("@rootField").click();
    cy.get(".MuiPopover-root").contains("C♯").click();
    cy.get("@scaleField")
      .find(".select")
      .should("not.have.class", "Mui-disabled");
    cy.get("@spf").find(".rootForm .flatSwitch").click();
    cy.get("@spf").contains("D♭");
    cy.get("@spf").find(".submitButton").should("not.be.visible");
    // Check if note selected on fretboard with correct name
    cy.get("@fbc").find(".Fret").contains("D♭");
    cy.get("@scaleField").click();
    cy.get(".MuiPopover-root").contains("Harmonic minor scale").click();
    cy.get("@spf")
      .find(".submitButton")
      .contains("D♭ harmonic minor")
      .should("be.visible");
    // Check if scale notes are selected on fretboard with correct name
    cy.get("@fbc").find(".Fret").contains("E♭");
    cy.get("@fbc").find(".Fret").contains("F♭");
    cy.get("@fbc").find(".Fret").contains("G♭");
    cy.get("@fbc").find(".Fret").contains("A♭");
    cy.get("@fbc").find(".Fret").contains("B𝄫");
    cy.get("@fbc").find(".Fret").contains("C");

    // Back to # - text in form changed, notes on fretboard have changed name
    cy.get("@spf").find(".rootForm .flatSwitch").click();
    cy.get("@rootField").contains("C♯");
    cy.get("@spf").find(".submitButton").contains("C♯ harmonic minor");
    cy.get("@fbc").find(".Fret").contains("C♯");
    cy.get("@fbc").find(".Fret").contains("D♯");
    cy.get("@fbc").find(".Fret").contains("E");
    cy.get("@fbc").find(".Fret").contains("F♯");
    cy.get("@fbc").find(".Fret").contains("G♯");
    cy.get("@fbc").find(".Fret").contains("A");
    cy.get("@fbc").find(".Fret").contains("B♯");

    // Back to ♭ - back as it was before
    cy.get("@spf").find(".rootForm .flatSwitch").click();
    cy.get("@rootField").contains("D♭");
    cy.get("@spf").find(".submitButton").contains("D♭ harmonic minor");
    cy.get("@fbc").find(".Fret").contains("E♭");
    cy.get("@fbc").find(".Fret").contains("F♭");
    cy.get("@fbc").find(".Fret").contains("G♭");
    cy.get("@fbc").find(".Fret").contains("A♭");
    cy.get("@fbc").find(".Fret").contains("B𝄫");
    cy.get("@fbc").find(".Fret").contains("C");

    // Pick scale: scale details shown as expected
    cy.get("@spf").find(".submitButton").click();
    cy.get("@spf").should("not.be.visible");
    cy.get(".selection").as("sel");
    cy.get("@sel").find("h2").contains("D♭ harmonic minor");
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
    cy.get("@sel").find(".notes .note:nth-child(7) .noteName").contains("C");
    cy.get("@sel").find(".notes .note:nth-child(7) .interval").contains("7");

    // Show notes/show intervals
    cy.get(".switchUnderTuner .noteIntervalSwitch").click();
    cy.get("@fbc").find(".Fret").contains("1");
    cy.get("@fbc").find(".Fret").contains("2");
    cy.get("@fbc").find(".Fret").contains("♭3");
    cy.get("@fbc").find(".Fret").contains("4");
    cy.get("@fbc").find(".Fret").contains("5");
    cy.get("@fbc").find(".Fret").contains("♭6");
    cy.get("@fbc").find(".Fret").contains("7");
    cy.get(".switchUnderTuner .noteIntervalSwitch").click();
    cy.get("@fbc").find(".Fret").contains("D♭");
    cy.get("@fbc").find(".Fret").contains("E♭");
    cy.get("@fbc").find(".Fret").contains("F♭");
    cy.get("@fbc").find(".Fret").contains("G♭");
    cy.get("@fbc").find(".Fret").contains("A♭");
    cy.get("@fbc").find(".Fret").contains("B𝄫");
    cy.get("@fbc").find(".Fret").contains("C");

    // Test some random note positions on fretboard
    cy.get("@fbc").find(".Fret.fret-0.string-6").contains("F♭");
    cy.get("@fbc").find(".Fret.fret-2.string-6").contains("G♭");
    cy.get("@fbc").find(".Fret.fret-4.string-6").contains("A♭");
    cy.get("@fbc").find(".Fret.fret-0.string-5").contains("B𝄫");
    cy.get("@fbc").find(".Fret.fret-3.string-5").contains("C");
    cy.get("@fbc").find(".Fret.fret-4.string-5").contains("D♭");
    cy.get("@fbc").find(".Fret.fret-1.string-4").contains("E♭");
    cy.get("@fbc").find(".Fret.fret-2.string-4").contains("F♭");
    cy.get("@fbc").find(".Fret.fret-4.string-4").contains("G♭");
    cy.get("@fbc").find(".Fret.fret-1.string-3").contains("A♭");
    cy.get("@fbc").find(".Fret.fret-2.string-3").contains("B𝄫");
    cy.get("@fbc").find(".Fret.fret-1.string-2").contains("C");
    cy.get("@fbc").find(".Fret.fret-2.string-2").contains("D♭");
    cy.get("@fbc").find(".Fret.fret-4.string-2").contains("E♭");
    cy.get("@fbc").find(".Fret.fret-0.string-1").contains("F♭");
    cy.get("@fbc").find(".Fret.fret-2.string-1").contains("G♭");
    cy.get("@fbc").find(".Fret.fret-4.string-1").contains("A♭");

    // Change tuning: note positions evolve, side tuning evolves
    cy.get("@presets").click();
    cy.get(".MuiPopover-root").contains("(Dsus4)").click();
    cy.get("@fbc").find(".Fret.fret-1.string-6").contains("E♭");
    cy.get("@fbc").find(".Fret.fret-2.string-6").contains("F♭");
    cy.get("@fbc").find(".Fret.fret-4.string-6").contains("G♭");
    cy.get("@fbc").find(".Fret.fret-0.string-5").contains("B𝄫");
    cy.get("@fbc").find(".Fret.fret-3.string-5").contains("C");
    cy.get("@fbc").find(".Fret.fret-4.string-5").contains("D♭");
    cy.get("@fbc").find(".Fret.fret-1.string-4").contains("E♭");
    cy.get("@fbc").find(".Fret.fret-2.string-4").contains("F♭");
    cy.get("@fbc").find(".Fret.fret-4.string-4").contains("G♭");
    cy.get("@fbc").find(".Fret.fret-1.string-3").contains("A♭");
    cy.get("@fbc").find(".Fret.fret-2.string-3").contains("B𝄫");
    cy.get("@fbc").find(".Fret.fret-0.string-2").contains("B𝄫");
    cy.get("@fbc").find(".Fret.fret-3.string-2").contains("C");
    cy.get("@fbc").find(".Fret.fret-4.string-2").contains("D♭");
    cy.get("@fbc").find(".Fret.fret-1.string-1").contains("E♭");
    cy.get("@fbc").find(".Fret.fret-2.string-1").contains("F♭");
    cy.get("@fbc").find(".Fret.fret-4.string-1").contains("G♭");

    // "Pick another" brings us back to empty form
    cy.contains("Pick Another").click();
    checkInitialState();
  });
});
