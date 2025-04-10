describe('Check if authentication is working right', () => {
  it('Leaving fields empty', () => {
    cy.visit('http://localhost:5173/');

    cy.get("[data-cy='loginButton']").click();
    cy.get("[data-cy='errorMessage']");
  });
  it('Filling only username with a valid user', () => {
    cy.visit('http://localhost:5173/');

    cy.get("[data-cy='username']").type("admin");
    cy.get("[data-cy='loginButton']").click();
    cy.get("[data-cy='errorMessage']");
  });
  it('Filling only password with a valid password', () => {
    cy.visit('http://localhost:5173/');

    cy.get("[data-cy='passwd']").type("admin");
    cy.get("[data-cy='loginButton']").click();
    cy.get("[data-cy='errorMessage']");
  });
  it('Filling with an invalid username and password', () => {
    cy.visit('http://localhost:5173/');

    cy.get("[data-cy='username']").type("This is not a real user");
    cy.get("[data-cy='passwd']").type("And this is not a real password");
    cy.get("[data-cy='loginButton']").click();
    cy.get("[data-cy='errorMessage']");
  });
  it('Filling with a valid username and password', () => {
    cy.visit('http://localhost:5173/');

    cy.get("[data-cy='username']").type("admin");
    cy.get("[data-cy='passwd']").type("admin");
    cy.get("[data-cy='loginButton']").click();
    cy.contains("Dashboard");
  });
  it('Enter inside dashboard with token', () => {
    cy.visit('http://localhost:5173/');

    cy.get("[data-cy='username']").type("admin");
    cy.get("[data-cy='passwd']").type("admin");
    cy.get("[data-cy='loginButton']").click();
    cy.reload();
    cy.contains("Dashboard");
  });
  it('Check right working for logOut', () => {
    cy.visit('http://localhost:5173/');

    cy.get("[data-cy='username']").type("admin");
    cy.get("[data-cy='passwd']").type("admin");
    cy.get("[data-cy='loginButton']").click();
    cy.contains("Dashboard");
    cy.get("[data-cy='logOut']").click();
    cy.contains("Password");
  });
})