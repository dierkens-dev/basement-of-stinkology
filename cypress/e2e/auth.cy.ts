/// <reference types="cypress" />

describe("Auth", () => {
  beforeEach(() => {});

  it("should login", () => {
    cy.login("westernreserve@gmail.com", "s%EYz*f0", "/events");
    // cy.visit("/events");
  });
});
