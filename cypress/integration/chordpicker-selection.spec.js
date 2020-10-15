/* eslint-disable no-undef */

const checkInitialState = () => {
  cy.get("@cpf").should("be.visible");
  cy.get("@rootField").should("be.visible");
  cy.get("@rootField").find(".select").should("not.have.class", "Mui-disabled");
  cy.get("@qualityField").should("be.visible");
  cy.get("@qualityField").find(".select").should("have.class", "Mui-disabled");
  cy.get("@seventhField").should("be.visible");
  cy.get("@seventhField").find(".select").should("have.class", "Mui-disabled");
  cy.get("@extensionField").should("be.visible");
  cy.get("@extensionField")
    .find(".select")
    .should("have.class", "Mui-disabled");
  cy.get("@cpf").find(".submitButton").should("not.be.visible");
};

describe("Chordpicker selection tests", () => {
  beforeEach(() => {
    cy.visit("/chordpicker");
    cy.viewport(1200, 800);
    cy.get(".chordPickerForm").as("cpf");
    cy.get("@cpf").find(".rootForm .textField").as("rootField");
    cy.get("@cpf").find(".qualityForm .textField").as("qualityField");
    cy.get("@cpf").find(".seventhForm .textField").as("seventhField");
    cy.get("@cpf").find(".extensionForm .textField").as("extensionField");
    cy.get(".fretboardContainer").as("fbc");
    cy.get(".persistentTuner").as("pt");
    cy.get("@pt").find(".presets .textField").as("presets");
  });
  it("starts with root note selectable, all other fields visible but disabled, submit button invisible", () => {
    checkInitialState();
  });
  it("evolves correctly a chord is picked", () => {
    cy.get("@presets").click();
    cy.get(".MuiPopover-root").contains("(Standard)").click();
    cy.get("@rootField").click();
    cy.get(".MuiPopover-root").contains("C♯").click();
    cy.get("@qualityField")
      .find(".select")
      .should("not.have.class", "Mui-disabled");
    cy.get("@cpf").find(".rootForm .flatSwitch").click();
    cy.get("@cpf").contains("D♭");
    cy.get("@cpf").find(".submitButton").should("not.be.visible");
    // Check if note selected on fretboard with correct name
    cy.get("@fbc").find(".Fret").contains("D♭");

    cy.get("@qualityField").click();
    cy.get(".MuiPopover-root").contains("diminished (D♭o)").click();
    cy.get("@seventhField")
      .find(".select")
      .should("not.have.class", "Mui-disabled");
    cy.get("@cpf").find(".submitButton").contains("D♭o").should("be.visible");
    // Check if F♭ and A𝄫 selected on fretboard with correct name
    cy.get("@fbc").find(".Fret").contains("D♭");
    cy.get("@fbc").find(".Fret").contains("F♭");
    cy.get("@fbc").find(".Fret").contains("A𝄫");

    cy.get("@seventhField").click();
    cy.get(".MuiPopover-root").contains("diminished (D♭o7)").click();
    cy.get("@extensionField")
      .find(".select")
      .should("not.have.class", "Mui-disabled");
    cy.get("@cpf").find(".submitButton").contains("D♭o7").should("be.visible");
    // Check if C𝄫 selected on fretboard with correct name
    cy.get("@fbc").find(".Fret").contains("D♭");
    cy.get("@fbc").find(".Fret").contains("F♭");
    cy.get("@fbc").find(".Fret").contains("A𝄫");
    cy.get("@fbc").find(".Fret").contains("C𝄫");

    cy.get("@extensionField").click();
    cy.get(".MuiPopover-root").contains("9 (D♭o9)").click();
    cy.get("@cpf").find(".submitButton").contains("D♭o9").should("be.visible");
    // Check if E♭ selected on fretboard with correct name
    cy.get("@fbc").find(".Fret").contains("D♭");
    cy.get("@fbc").find(".Fret").contains("F♭");
    cy.get("@fbc").find(".Fret").contains("A𝄫");
    cy.get("@fbc").find(".Fret").contains("C𝄫");
    cy.get("@fbc").find(".Fret").contains("E♭");

    // Back to # - text in form changed, notes on fretboard have changed name
    cy.get("@cpf").find(".rootForm .flatSwitch").click();
    cy.get("@rootField").contains("C♯");
    cy.get("@qualityField").contains("C♯o");
    cy.get("@seventhField").contains("C♯o7");
    cy.get("@extensionField").contains("C♯o9");
    cy.get("@cpf").find(".submitButton").contains("C♯o9");
    cy.get("@fbc").find(".Fret").contains("C♯");
    cy.get("@fbc").find(".Fret").contains("E");
    cy.get("@fbc").find(".Fret").contains("G");
    cy.get("@fbc").find(".Fret").contains("B♭");
    cy.get("@fbc").find(".Fret").contains("D♯");

    // Back to ♭ - back as it was before
    cy.get("@cpf").find(".rootForm .flatSwitch").click();
    cy.get("@rootField").contains("D♭");
    cy.get("@qualityField").contains("D♭o");
    cy.get("@seventhField").contains("D♭o7");
    cy.get("@extensionField").contains("D♭o9");
    cy.get("@cpf").find(".submitButton").contains("D♭o9");
    cy.get("@fbc").find(".Fret").contains("D♭");
    cy.get("@fbc").find(".Fret").contains("F♭");
    cy.get("@fbc").find(".Fret").contains("A𝄫");
    cy.get("@fbc").find(".Fret").contains("C𝄫");
    cy.get("@fbc").find(".Fret").contains("E♭");

    // Pick chord: chord details shown as expected
    cy.get("@cpf").find(".submitButton").click();
    cy.get("@cpf").should("not.be.visible");
    cy.get(".selection").as("sel");
    cy.get("@sel").find("h2").contains("D♭o9");
    cy.get("@sel").find(".notes .note:first-child .noteName").contains("D♭");
    cy.get("@sel").find(".notes .note:first-child .interval").contains("R");
    cy.get("@sel").find(".notes .note:nth-child(2) .noteName").contains("F♭");
    cy.get("@sel").find(".notes .note:nth-child(2) .interval").contains("♭3");
    cy.get("@sel").find(".notes .note:nth-child(3) .noteName").contains("A𝄫");
    cy.get("@sel").find(".notes .note:nth-child(3) .interval").contains("♭5");
    cy.get("@sel").find(".notes .note:nth-child(4) .noteName").contains("C𝄫");
    cy.get("@sel").find(".notes .note:nth-child(4) .interval").contains("𝄫7");
    cy.get("@sel").find(".notes .note:nth-child(5) .noteName").contains("E♭");
    cy.get("@sel").find(".notes .note:nth-child(5) .interval").contains("9");

    // Show notes/show intervals
    cy.get(".switchUnderTuner .noteIntervalSwitch").click();
    cy.get("@fbc").find(".Fret").contains("R");
    cy.get("@fbc").find(".Fret").contains("♭3");
    cy.get("@fbc").find(".Fret").contains("♭5");
    cy.get("@fbc").find(".Fret").contains("𝄫7");
    cy.get("@fbc").find(".Fret").contains("9");
    cy.get(".switchUnderTuner .noteIntervalSwitch").click();
    cy.get("@fbc").find(".Fret").contains("D♭");
    cy.get("@fbc").find(".Fret").contains("F♭");
    cy.get("@fbc").find(".Fret").contains("A𝄫");
    cy.get("@fbc").find(".Fret").contains("C𝄫");
    cy.get("@fbc").find(".Fret").contains("E♭");

    // Test some random note positions on fretboard
    cy.get("@fbc").find(".Fret.fret-0.string-6").contains("F♭");
    cy.get("@fbc").find(".Fret.fret-3.string-6").contains("A𝄫");
    cy.get("@fbc").find(".Fret.fret-1.string-5").contains("C𝄫");
    cy.get("@fbc").find(".Fret.fret-4.string-5").contains("D♭");
    cy.get("@fbc").find(".Fret.fret-1.string-4").contains("E♭");
    cy.get("@fbc").find(".Fret.fret-2.string-4").contains("F♭");
    cy.get("@fbc").find(".Fret.fret-0.string-3").contains("A𝄫");
    cy.get("@fbc").find(".Fret.fret-3.string-3").contains("C𝄫");
    cy.get("@fbc").find(".Fret.fret-2.string-2").contains("D♭");
    cy.get("@fbc").find(".Fret.fret-4.string-2").contains("E♭");
    cy.get("@fbc").find(".Fret.fret-0.string-1").contains("F♭");
    cy.get("@fbc").find(".Fret.fret-3.string-1").contains("A𝄫");

    // Change tuning: note positions evolve, side tuning evolves
    cy.get("@presets").click();
    cy.get(".MuiPopover-root").contains("(Dsus4)").click();
    cy.get("@fbc").find(".Fret.fret-1.string-6").contains("E♭");
    cy.get("@fbc").find(".Fret.fret-2.string-6").contains("F♭");
    cy.get("@fbc").find(".Fret.fret-1.string-5").contains("C𝄫");
    cy.get("@fbc").find(".Fret.fret-4.string-5").contains("D♭");
    cy.get("@fbc").find(".Fret.fret-1.string-4").contains("E♭");
    cy.get("@fbc").find(".Fret.fret-2.string-4").contains("F♭");
    cy.get("@fbc").find(".Fret.fret-0.string-3").contains("A𝄫");
    cy.get("@fbc").find(".Fret.fret-3.string-3").contains("C𝄫");
    cy.get("@fbc").find(".Fret.fret-1.string-2").contains("C𝄫");
    cy.get("@fbc").find(".Fret.fret-4.string-2").contains("D♭");
    cy.get("@fbc").find(".Fret.fret-1.string-1").contains("E♭");
    cy.get("@fbc").find(".Fret.fret-2.string-1").contains("F♭");

    // "Pick another" brings us back to empty form
    cy.contains("Pick Another").click();
    checkInitialState();
  });
});
