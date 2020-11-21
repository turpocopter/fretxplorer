/* eslint-disable no-undef */
const smallViewports = new Map([
  ["Mobile, portrait orientation", [320, 568]],
  ["Mobile, landscape orientation", [568, 320]],
  ["Landscape, not high enough for full mode", [1000, 660]],
]);

describe("Scalepicker layout tests", () => {
  smallViewports.forEach((dim, name) => {
    describe(`${name} (${dim[0]} x ${dim[1]})`, () => {
      beforeEach(() => {
        cy.visit("/scalepicker");
        cy.viewport(dim[0], dim[1]);
        cy.get(".scalePickerForm").as("spf");
      });
      it("only shows form and not the rest", () => {
        cy.get("@spf").should("be.visible");
        cy.get(".persistentTuner").should("not.be.visible");
        cy.get(".fretboardContainer").should("not.be.visible");
      });
      it("changes layout when scale is picked", () => {
        cy.get("@spf").find(".rootForm .textField").click();
        cy.get(".MuiPopover-root").contains("C").click();
        cy.get("@spf").find(".scaleList").click();
        cy.get(".MuiPopover-root").contains("Harmonic minor scale").click();
        cy.get("@spf").find(".submitButton").click();
        cy.get("@spf").should("not.be.visible");
        cy.get(".pickerContainer").should("be.visible");
        cy.get(".persistentTuner").should("not.be.visible");
        cy.get(".fretboardContainer").as("fretboardcontainer");
        cy.get("@fretboardcontainer").should("be.visible");
        cy.get("@fretboardcontainer")
          .find(".noteIntervalSwitch")
          .should("be.visible");
        cy.get("@fretboardcontainer").find(".tuning").should("be.visible");
        cy.get("@fretboardcontainer")
          .find(".FretInner")
          .contains("C")
          .should("not.have.css", "visibility", "hidden");
        cy.get("@fretboardcontainer")
          .find(".FretInner")
          .contains("D")
          .should("not.have.css", "visibility", "hidden");
        cy.get("@fretboardcontainer")
          .find(".FretInner")
          .contains("E♭")
          .should("not.have.css", "visibility", "hidden");
        cy.get("@fretboardcontainer")
          .find(".FretInner")
          .contains("F")
          .should("not.have.css", "visibility", "hidden");
        cy.get("@fretboardcontainer")
          .find(".FretInner")
          .contains("G")
          .should("not.have.css", "visibility", "hidden");
        cy.get("@fretboardcontainer")
          .find(".FretInner")
          .contains("A♭")
          .should("not.have.css", "visibility", "hidden");
        cy.get("@fretboardcontainer")
          .find(".FretInner")
          .contains("B")
          .should("not.have.css", "visibility", "hidden");
      });
    });
  });

  describe("Landscape, just high enough for full mode (1000 x 680)", () => {
    beforeEach(() => {
      cy.visit("/scalepicker");
      cy.viewport(1000, 680);
      cy.get(".scalePickerForm").as("spf");
    });
    it("shows everything from the beginning", () => {
      cy.get("@spf").should("be.visible");
      cy.get(".persistentTuner").as("persistenttuner");
      cy.get("@persistenttuner").should("be.visible");
      cy.get("@persistenttuner").find(".switchUnderTuner").should("be.visible");
      cy.get(".fretboardContainer").as("fretboardcontainer");
      cy.get("@fretboardcontainer").should("be.visible");
      cy.get("@fretboardcontainer")
        .find(".FretMarkerList")
        .should("be.visible");
      cy.get("@fretboardcontainer").find(".StringList").should("be.visible");
      cy.get("@fretboardcontainer").find(".tuning").should("be.visible");
      cy.get("@fretboardcontainer")
        .find(".tuning")
        .find(".tuneBtn")
        .should("not.exist");
      cy.get("@fretboardcontainer")
        .find(".noteIntervalSwitch")
        .should("not.be.visible");
    });
    it("changes layout when scale is picked", () => {
      cy.get("@spf").find(".rootForm .textField").click();
      cy.get(".MuiPopover-root").contains("C").click();
      cy.get(".fretboardContainer").as("fretboardcontainer");
      cy.get("@fretboardcontainer")
        .find(".FretInner")
        .contains("C")
        .should("not.have.css", "visibility", "hidden");
      cy.get("@spf").find(".scaleList").click();
      cy.get(".MuiPopover-root").contains("Harmonic minor scale").click();
      cy.get("@fretboardcontainer")
        .find(".FretInner")
        .contains("D")
        .should("not.have.css", "visibility", "hidden");
      cy.get("@fretboardcontainer")
        .find(".FretInner")
        .contains("E♭")
        .should("not.have.css", "visibility", "hidden");
      cy.get("@fretboardcontainer")
        .find(".FretInner")
        .contains("F")
        .should("not.have.css", "visibility", "hidden");
      cy.get("@fretboardcontainer")
        .find(".FretInner")
        .contains("G")
        .should("not.have.css", "visibility", "hidden");
      cy.get("@fretboardcontainer")
        .find(".FretInner")
        .contains("A♭")
        .should("not.have.css", "visibility", "hidden");
      cy.get("@fretboardcontainer")
        .find(".FretInner")
        .contains("B")
        .should("not.have.css", "visibility", "hidden");

      cy.get("@spf").find(".submitButton").click();
      cy.get("@spf").should("not.be.visible");
      cy.get(".persistentTuner").as("persistenttuner");
      cy.get("@persistenttuner").should("be.visible");
      cy.get("@persistenttuner").find(".switchUnderTuner").should("be.visible");
      cy.get(".fretboardContainer").as("fretboardcontainer");
      cy.get("@fretboardcontainer").should("be.visible");
      cy.get("@fretboardcontainer")
        .find(".FretMarkerList")
        .should("be.visible");
      cy.get("@fretboardcontainer").find(".StringList").should("be.visible");
      cy.get("@fretboardcontainer").find(".tuning").should("be.visible");
      cy.get("@fretboardcontainer")
        .find(".tuning")
        .find(".tuneBtn")
        .should("not.exist");
    });
  });
});
