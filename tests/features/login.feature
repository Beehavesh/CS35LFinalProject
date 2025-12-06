Feature: Login
  
  Scenario: New user signs up successfully
    Given I navigate to "/register"
    When I fill "email" with "email@example.com"
    And I fill "password" with "password123"
    And I click "Sign up"
    Then I should be redirected to "/home"

  Scenario: User logs in successfully
    Given I navigate to "/"
    When I fill "email" with "test@example.com"
    And I fill "password" with "password123"
    And I click "Log in"
    Then I should be redirected to "/home"

  

