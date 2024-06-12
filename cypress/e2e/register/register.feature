Feature: User Register

  ## Success
  Scenario: Successful registration of new user
    Given I am on the register page
    When I fill in the "Email" field with "rickdoe@dienstduizend.nl"
    And I fill in the "First Name" field with "Rick"
    And I fill in the "Last Name" field with "Doe"
    And I fill in the "Password" field with "Password123!"
    And I fill in the "Confirm Password" field with "Password123!"
    And I accept the terms of service
    And I click the "Sign up" button
    Then I should successfully registered

  ## Failure
  Scenario: Failed registration because of empty fields
    Given I am on the register page
    When I click the "Sign up" button
    Then I should get validation errors

  Scenario Outline: Failed registration because of weak password
    Given I am on the register page
    When I fill in the "Email" field with "rickdoe@dienstduizend.nl"
    And I fill in the "First Name" field with "Rick"
    And I fill in the "Last Name" field with "Doe"
    And I fill in the "Password" field with "<password>"
    And I fill in the "Confirm Password" field with "<password>"
    And I accept the terms of service
    And I click the "Sign up" button
    Then I should see the validation message "<errorMessage>"

    Examples:
      | password                        | errorMessage                                                      |
      | shortpwd                        | Your password length must be at least 12 characters               |
      | allsmallletters                 | Your password must contain at least one uppercase letter          |
      | ALLCAPITALLETTERS               | Your password must contain at least one lowercase letter          |
      | NoNumbersHere                   | Your password must contain at least one number                    |
      | NoSpecialChar123                | Your password must contain at least one (!? *.)                   |
      | aaaaaaaaaaaaaaaa                | Your password should contain at most 6 duplicate characters       |
      | rickdoe@dienstduizend.nl        | Your password and email cannot be the same value.                 |
