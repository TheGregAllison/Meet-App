Feature: Displaying Events

  Scenario: 32 events will be displayed to user by default
    Given the user has not specified the number of events
    When the user views the events
    Then 32 events are shown by default

  Scenario: User sets the number of events to display
    Given the user is on the Meet app home screen
    When the user specifies the number of events to display
    Then the app should show only the specified number of events