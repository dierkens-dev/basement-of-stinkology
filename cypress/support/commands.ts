/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add(
  "login",
  (email: string, password: string, callBackUrl: string) => {
    cy.session([email, password], () => {
      const baseUrl = Cypress.config("baseUrl");
      cy.visit(`/sign-in?callbackUrl=${baseUrl}${callBackUrl}`);
      cy.get("input[name=email]").type(email);
      cy.get("input[name=password]").type(password);
      cy.get("button[type=submit]").click();
      cy.url().should("eq", `${baseUrl}${callBackUrl}`);
    });
  },
);

Cypress.Commands.add("getByDataCy", (selector: string, ...args) => {
  cy.get(`[data-cy=${selector}]`, ...args);
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
