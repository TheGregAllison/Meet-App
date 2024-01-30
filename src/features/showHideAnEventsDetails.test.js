import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, waitFor, within } from '@testing-library/react';
import App from '../App';
import Event from '../components/Event';
import { getEvents } from '../api';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, (test) => {
  // scenario 1  - user shows event details by clicking the show details button

  test('Event are hidden by default.', ({ given, when, then }) => {
    let AppComponent;
    given('the main page is open', () => {
      AppComponent = render(<App />);
    });

    when('the app displays a list of event', async () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(32);
      });
    });

    then('the event details are hidden by default', () => {
      const AppDOM = AppComponent.container.firstChild;
      const eventDetails = AppDOM.querySelector('.details');
      expect(eventDetails).not.toBeInTheDocument();
    });
  });

  // scenario 2  - user shows event details by clicking the show details button
  test('User shows event details', ({ given, when, then }) => {
    let EventComponent;
    let allEvents;

    given('the user is viewing the list of events', async () => {
      allEvents = await getEvents();
      EventComponent = render(<Event event={allEvents[0]} />);
      expect(
        EventComponent.container.querySelector('.details')
      ).not.toBeInTheDocument();
    });

    when('the user taps on a specific event', async () => {
      const showDetailsButton = EventComponent.queryByText('Show Details');
      const user = userEvent.setup();
      await user.click(showDetailsButton);
    });

    then('the app should display the details of that event', async () => {
      await waitFor(() => {
        expect(
          EventComponent.container.querySelector('.details')
        ).toBeInTheDocument();
      });
      expect(EventComponent.queryByText('Hide Details')).toBeInTheDocument();
    });
  });

  // scenario 3  - user hides event details by clicking the hide details button
  test('User hides event details', ({ given, when, then }) => {
    let EventComponent;
    let allEvents;
    given('the user is viewing the details of an event', async () => {
      allEvents = await getEvents();
      EventComponent = render(<Event event={allEvents[0]} />);
      const user = userEvent.setup();
      await user.click(EventComponent.queryByText('Show Details'));
      expect(
        EventComponent.container.querySelector('.details')
      ).toBeInTheDocument();
    });

    when('the user taps on the "Hide Details" option', async () => {
      const hideDetails = EventComponent.queryByText('Hide Details');
      const user = userEvent.setup();
      await user.click(hideDetails);
    });

    then(
      'the app should hide the event details and return to the event list',
      () => {
        expect(
          EventComponent.container.querySelector('.details')
        ).not.toBeInTheDocument();
        expect(
          EventComponent.queryByText('Hide Details')
        ).not.toBeInTheDocument();
      }
    );
  });
});
