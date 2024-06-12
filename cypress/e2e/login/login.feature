Feature: User Login

  ## Success
  Scenario: Successful login
    Given I am on the login page
    When I fill in the "Email" field with "jamesdoe@dienstduizend.nl"
    And I fill in the "Password" field with "Password123!"
    And I click the "Sign in" button
    Then I should be redirected to the dashboard

  Scenario: Successful login with 2FA
    Given I am on the login page
    When I fill in the "Email" field with "hendrydoe@dienstduizend.nl"
    And I fill in the "Password" field with "Password123!"
    And I fill in a valid OTP code
    And I click the "Sign in" button
    Then I should be redirected to the dashboard

  ## Failure
  Scenario: Unsuccessful login due to invalid 2FA
    Given I am on the login page
    When I fill in the "Email" field with "hendrydoe@dienstduizend.nl"
    And I fill in the "Password" field with "Password123!"
    And I fill in an invalid OTP code
    And I click the "Sign in" button
    Then I should see a login failure message

  Scenario: Unsuccessful login due to invalid password
    Given I am on the login page
    When I fill in the "Email" field with "jamesdoe@dienstduizend.nl"
    And I fill in the "Password" field with "invalidPassword"
    And I click the "Sign in" button
    Then I should see a login failure message

  Scenario: Unsuccessful login due to unknown user
    Given I am on the login page
    When I fill in the "Email" field with "janedoe@dienstduizend.nl"
    And I fill in the "Password" field with "somePasswordValue"
    And I click the "Sign in" button
    Then I should see a login failure message

