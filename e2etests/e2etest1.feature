Feature: User can create a playlist
  Scenario: Creating a playlist from the frontend UI
    Given I am on the homepage
    When I log in successfully
    And I navigate to the "Playlists" section
    And I open the playlist form
    And I enter a playlist title "Roadtrip Mix"
    And I add songs to the playlist
    And I submit the playlist
    Then I should see my playlist appear in the playlist list
