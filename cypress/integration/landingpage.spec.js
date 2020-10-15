/* eslint-disable no-undef */
describe("Test navigation from landing page", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("reaches all pages from home", () => {
    cy.contains("Pick a Chord").click();
    cy.url().should("include", "/chordpicker");

    cy.go("back");
    cy.contains("Pick a Scale").click();
    cy.url().should("include", "/scalepicker");

    cy.go("back");
    cy.contains("Settings & Tuning").click();
    cy.url().should("include", "/settings");
  });
});
