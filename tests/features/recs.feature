Feature: Reccomendations

    Scenario: User views job post recommendations
        Given the user is logged in
        When the user navigates to the "Recommendations" section
        Then the user should see a list of recommended job posts based on their playlist genres displayed

    Scenario: Recommended job posts match user playlist genres
        Given the user is logged in 
        When the user has playlists with specific genre tags
        Then the recommended job posts should correspond to those genre tags

    Scenario: No recommendations when user has no playlists
        Given the user is logged in
        When the user has no playlists
        Then the user should see a message indicating no recommendations are available

    Scenario: Recommendations update when user modifies playlists
        Given the user is logged in 
        When the user adds, edits, or deletes a playlist
        Then the recommended job posts should update to reflect the changes in their playlist genres

    Scenario: User interacts with recommended job posts
        Given the user is logged in 
        When the user views the recommended job posts
        Then the user should be able to like, save, or apply to the recommended job posts directly from the recommendations section