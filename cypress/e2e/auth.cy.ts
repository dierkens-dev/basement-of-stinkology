/// <reference types="cypress" />

describe("Auth", () => {
  beforeEach(() => {
    cy.login("westernreserve@gmail.com", "s%EYz*f0", "/events");
  });

  it("should login", () => {
    cy.visit("/events");
  });

  it("should logout", () => {
    cy.visit("/events");
    cy.getByDataCy("main-nav-drawer").click();
    cy.getByDataCy("sign-out-mobile").click();
    cy.get("#submitButton").should("be.visible").click();
    cy.url().should(
      "eq",
      "http://localhost:3000/sign-in?callbackUrl=http://localhost:3000/events&error=undefined",
    );
    cy.get("input[name=email]").type("westernreserve@gmail.com");
    cy.get("input[name=password]").type("s%EYz*f0");
    cy.get("button[type=submit]").click();
    cy.url().should("eq", "http://localhost:3000/events");
  });
});
