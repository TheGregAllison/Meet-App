import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, waitFor, within } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
  test('32 events will be displayed to user by default', ({
    given,
    when,
    then,
  }) => {
    given('the user has not specified the number of events', () => {});
    let AppComponent;
    when('the user views the events', () => {
      AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');
      expect(EventListDOM).toBeInTheDocument();
    });

    then('32 events are shown by default', async () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(32);
      });
    });
  });

  test('User sets the number of events to display', ({ given, when, then }) => {
    let AppComponent;
    given('the user is on the Meet app home screen', async () => {
      const user = userEvent.setup();
      AppComponent = render(<App />);
      const numberOfEventsInput =
        AppComponent.getByPlaceholderText('Enter a number');
      await user.type(numberOfEventsInput, '{backspace}{backspace}10');
    });

    when('the user specifies the number of events to display', () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');
      expect(EventListDOM).toBeInTheDocument();
    });

    then('the app should show only the specified number of events', () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');
      const allRenderedEventItems =
        within(EventListDOM).queryAllByRole('listitem');
      expect(allRenderedEventItems.length).toEqual(10);
    });
  });
});
