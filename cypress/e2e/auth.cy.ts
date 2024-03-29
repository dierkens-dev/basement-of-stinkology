/// <reference types="cypress" />

const baseUrl = Cypress.config("baseUrl");

describe("Auth", () => {
  it("When I Sign out And Sign Back in I should be redirected to the original URL", () => {
    cy.login(Cypress.env("admin_user"), Cypress.env("admin_password"));

    cy.visit("/events");

    cy.getByDataCy("main-nav-drawer").click();
    cy.getByDataCy("sign-out-mobile").click();

    cy.get("#submitButton").should("be.visible").click();

    cy.url().should(
      "eq",
      `${baseUrl}/sign-in?callbackUrl=${baseUrl}/events&error=undefined`,
    );

    cy.get("input[name=email]").type(Cypress.env("admin_user"));
    cy.get("input[name=password]").type(Cypress.env("admin_password"));
    cy.get("button[type=submit]").click();

    cy.url().should("eq", `${baseUrl}/events`);
  });
});
