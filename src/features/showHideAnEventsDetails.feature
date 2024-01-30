Feature: Show/Hide Event Details

 Scenario: Event are hidden by default.
  Given the main page is open
  When the app displays a list of event
  Then the event details are hidden by default

  Scenario: User shows event details
    Given the user is viewing the list of events
    When the user taps on a specific event
    Then the app should display the details of that event

  Scenario: User hides event details
    Given the user is viewing the details of an event
    When the user taps on the "Hide Details" option
    Then the app should hide the event details and return to the event list