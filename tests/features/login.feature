Feature: Login

  Scenario: User logs in successfully
    Given I navigate to "/"
    When I fill "email" with "test@example.com"
    And I fill "password" with "password123"
    And I click "Log in"
    Then I should be redirected to "/home"