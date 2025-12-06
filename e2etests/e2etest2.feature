Feature: User can create a post
  Scenario: Creating a post with tag selection
    Given I am on the homepage
    When I log in successfully
    And I navigate to the "Jobposts" page
    And I open the new post modal
    And I type "hello world" into the post field
    And I submit the post
    Then I should see the post in the feed