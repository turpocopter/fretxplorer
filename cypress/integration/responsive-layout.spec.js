const urls = ["/chordpicker", "/scalepicker", "/settings", "/about"];

describe("Layout tests", () => {
  urls.forEach((url) => {
    describe(`Test layout behaves correctly on ${url} page`, () => {
      beforeEach(() => {
        cy.visit(url);
      });
      describe("Mobile, portrait orientation (320 x 568)", () => {
        beforeEach(() => {
          cy.viewport(320, 568);
        });
        it("should show the burger menu button and no open menu", () => {
          cy.get(".SideDrawer").should("not.exist");
          cy.get(".MainMenu").should("not.be.visible");
        });
        it("should show sidedrawer after clicking on burger button and provide links to all pages", () => {
          cy.get(".MenuButton").as("menubtn");
          cy.get("@menubtn").click();
          cy.get(".SideDrawer").as("sidedrawer");
          cy.get("@sidedrawer").contains("Pick a Chord").click();
          cy.url().should("include", "/chordpicker");

          cy.go("back");
          cy.get("@menubtn").click();
          cy.get("@sidedrawer").contains("Pick a Scale").click();
          cy.url().should("include", "/scalepicker");

          cy.go("back");
          cy.get("@menubtn").click();
          cy.get("@sidedrawer").contains("Settings").click();
          cy.url().should("include", "/settings");

          cy.go("back");
          cy.get("@menubtn").click();
          cy.get("@sidedrawer").contains("About").click();
          cy.url().should("include", "/about");
        });
      });
      describe("Mobile, landscape orientation (568 x 320)", () => {
        beforeEach(() => {
          cy.viewport(568, 320);
        });
        it("should show main menu, no burger button and no sidedrawer", () => {
          cy.get(".SideDrawer").should("not.exist");
          cy.get(".MenuButton").should("not.be.visible");
          cy.get(".MainMenu").as("mainmenu");
          cy.get("@mainmenu").should("be.visible");

          cy.get("@mainmenu").contains("Chords").click();
          cy.url().should("include", "/chordpicker");

          cy.go("back");
          cy.get("@mainmenu").contains("Scales").click();
          cy.url().should("include", "/scalepicker");

          cy.go("back");
          cy.get("@mainmenu").contains("Settings").click();
          cy.url().should("include", "/settings");

          cy.go("back");
          cy.get("@mainmenu").contains("About").click();
          cy.url().should("include", "/about");
        });
      });
    });
  });
});
