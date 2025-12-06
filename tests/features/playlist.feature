Feature: Playlist

    Scenario: User views their playlists
        Given the user is logged in
        When the user navigates to the "Playlists" section
        Then the user should see a list of their playlists displayed
    
    Scenario: User creates a new playlist
        Given the user is logged in
        When the user clicks on "Create New Playlist"
        And fills in the playlist details
        And submits the form
        Then the new playlist should be added to their list of playlists
    
    Scenario: User edits an existing playlist
        Given the user is logged in
        And has at least one playlist
        When the user selects a playlist to edit
        And modifies the playlist details
        And saves the changes
        Then the updated playlist should reflect the changes in their list of playlists
    
    Scenario: User deletes a playlist
        Given the user is logged in
        And has at least one playlist
        When the user selects a playlist to delete
        And confirms the deletion
        Then the playlist should be removed from their list of playlists