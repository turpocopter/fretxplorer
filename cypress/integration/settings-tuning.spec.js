/* eslint-disable no-undef */
describe("Tuner in settings page", () => {
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
  it("reads pegs from left to right regardless if left- or right-handed", () => {
    let positionPeg1;
    let positionPeg2;
    cy.get("@tuner")
      .find(".peg:first-child")
      .then(($peg1) => {
        positionPeg1 = $peg1.position();
      });
    cy.get("@tuner")
      .find(".peg:nth-child(2)")
      .then(($peg2) => {
        positionPeg2 = $peg2.position();
        expect(positionPeg2.left - positionPeg1.left).to.be.at.least(0);
      });
    cy.get(".handSwitch").click();
    cy.get("@tuner")
      .find(".peg:first-child")
      .then(($peg1) => {
        positionPeg1 = $peg1.position();
      });
    cy.get("@tuner")
      .find(".peg:nth-child(2)")
      .then(($peg2) => {
        positionPeg2 = $peg2.position();
        expect(positionPeg2.left - positionPeg1.left).to.be.at.least(0);
      });
  });
  it("changes preset names when note naming convention is changed", () => {
    cy.get("@presets").contains("EADGBE (Standard)");
    cy.get(".noteNamingSwitch").click();
    cy.get("@presets").contains("Mi La Re Sol Si Mi (Standard)");
    cy.get(".noteNamingSwitch").click();
    cy.get("@presets").contains("EADGBE (Standard)");
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
  });
});
