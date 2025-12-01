Feature: Login

  Scenario: User without an account attempts to log in
    Given I navigate to "/"
    When I fill "email" with "email@example.com"
    And I fill "password" with "password123"
    And I click "Log in"
    Then I should be redirected to "/register"
  
  Scenario: New user signs up successfully
    Given I navigate to "/register"
    When I fill "email" with "email@example.com"
    And I fill "password" with "password123"
    And I click "Sign up"
    Then I should be redirected to "/home"

  Scenario: User attempts to signup with a invalid email
    Given I navigate to "/register"
    When I fill "email" with "plainaddress"
    And I fill "password" with "password123"
    And I click "Sign up"
    Then I should be redirected to "/register"

  Scenario: User attempts to signup with a blank password
    Given I navigate to "/register"
    When I fill "email" with "plainaddress"
    And I fill "password" with ""
    And I click "Sign up"
    Then I should be redirected to "/register"

  Scenario: Code injection attack
    Given I navigate to "/register"
    When I fill "email" with "plainaddress@console.log(err)"
    And I fill "password" with "password123"
    And I click "Sign up"
    Then I should be redirected to "/register"

  Scenario: Old user attempts to sign up
    Given I navigate to "/register"
    When I fill "email" with "test@example.com"
    And I fill "password" with "password123"
    And I click "Sign up"
    Then I should be redirected to "/"

  Scenario: User logs in successfully
    Given I navigate to "/"
    When I fill "email" with "test@example.com"
    And I fill "password" with "password123"
    And I click "Log in"
    Then I should be redirected to "/home"

  

