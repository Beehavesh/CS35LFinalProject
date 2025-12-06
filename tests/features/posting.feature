Feature: Posting

    Scenario: User views all job posts
        Given the user is logged in
        When the user navigates to the "Job Posts" section
        Then the user should see a list of all job posts displayed
    
    Scenario: User creates a new job post
        Given the user is logged in
        When the user clicks on "Create New Job Post"
        And fills in the job post details
        And submits the form
        Then the new job post should be added to the list of job posts
    
    Scenario: User edits an existing job post
        Given the user is logged in
        And has at least one job post
        When the user selects a job post to edit
        And modifies the job post details
        And saves the changes
        Then the updated job post should reflect the changes in the list of job posts
    
    Scenario: User deletes a job post
        Given the user is logged in
        And has at least one job post
        When the user selects a job post to delete
        And confirms the deletion
        Then the job post should be removed from the list of job posts