describe("e2e", () => {
  beforeEach(() => {
    cy.visit("https://holdbot.cryto.men");
  });
  it("404", () => {
      cy.intercept("GET", "https://holderbot.cryto.men/api/getallcollection", {
        statusCode: 404,
        body: "404 Not Found",
      }).as("Error req");

      cy.wait("@Error req").its("response.statusCode").should("eq", 404);
    });

  it("Step1", () => {
    cy.intercept({
    method: 'GET',
      url: 'https://holderbot.cryto.men/api/getallcollection',
    }).as('apiCheck')
    cy.wait('@apiCheck')
    
    // cy.setLocalStorage('suiwallet', "0x3904b1b9e68c68c553d8b56b5f6300bd14c10876ba34f65327ca255be446f5de")
    // cy.contains('Connect Wallet').click();
    // cy.get('#ethos-close-on-click').click()
  });
   

  it('Step2', () => {
     cy.contains('Login with Discord').click();
  })

});
