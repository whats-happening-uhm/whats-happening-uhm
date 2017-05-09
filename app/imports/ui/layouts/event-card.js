import { Template } from 'meteor/templating';
import { Profiles } from '../../api/profiles/profiles.js';
import { Meteor } from 'meteor/meteor';

Template.Event_Card.onCreated(function onCreated() {
  this.subscribe('Profiles');
  this.subscribe('Events');
});

Template.Event_Card.helpers({
  /** Returns true if an event is starred for the current user */
  starred(id) {
    const user = Profiles.findOne({ username: Meteor.user().profile.name });
    if (user) {
      return user.saved.includes(id);
    }
    return null;
  },
});

Template.Event_Card.events({
  /** Save events */
  'click .star.icon'(event) {
    const eventId = event.target.parentElement.parentElement.id;
    const user = Profiles.findOne({ username: Meteor.user().profile.name });

    // Either save event or remove it
    if (event.target.classList.contains('empty')) {
      // Save event
      event.target.classList.add('yellow');
      event.target.classList.remove('empty');

      // Add event to user's 'saved' events
      if (!user.saved.includes(eventId)) {
        user.saved.push(eventId); // insert event id into user's saved array
        Profiles.update(user._id, { $set: { saved: user.saved } });
      }
    } else {
      // Remove saved event
      event.target.classList.remove('yellow');
      event.target.classList.add('empty');

      // Remove event from user's 'saved' events
      user.saved.splice(user.saved.indexOf(eventId), 1); // remove eventId from user's saved array
      Profiles.update(user._id, { $set: { saved: user.saved } });
    }
  },
});