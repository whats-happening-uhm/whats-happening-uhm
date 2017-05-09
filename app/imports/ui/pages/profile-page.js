import { Template } from 'meteor/templating';
import { Profiles } from '../../api/profiles/profiles.js';
import { Events } from '../../api/events/events.js';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';

Template.Profile_Page.onCreated(function onCreated() {
  this.subscribe('Profiles');
  this.subscribe('Events');
});

Template.Profile_Page.helpers({
  /**
   * @returns {*} True if logged in as the profile user, false otherwise
   */
  isUser() {
    return Meteor.user().profile.name === FlowRouter.getParam('username');
  },

  /**
   * @returns {*} The current profile given the username
   */
  profile() {
    return [Profiles.findOne({ username: FlowRouter.getParam('username') })];
  },

  /**
   * @returns {*} The events owned by the user
   */
  ownEvents() {
    return Events.find({ organizer: FlowRouter.getParam('username') });
  },

  /**
   * @returns {*} The events owned by the user
   */
  attendingEvents() {
    return Events.find({ organizer: 'dtokita' });
  },

  /**
   * @returns {*} The events owned by the user
   */
  savedEvents() {
    const user = Profiles.findOne({ username: Meteor.user().profile.name });
    if (user) {
      return Events.find({ _id: { $in: user.saved } });
    }
    return null;
  },

  /**
   * Hash function that maps a string input to a color--used for coloring stuff
   * @param str
   * @returns {*} a string representing a color
   */
  colorize(str) {
    let hash = 5381;
    let i = str.length;

    while (i) {
      hash = (hash * 33) ^ str.charCodeAt(--i);
    }

    switch ((hash >>> 0) % 6) {
      case 0:
        return 'orange';
      case 1:
        return 'green';
      case 2:
        return 'red';
      case 3:
        return 'teal';
      case 4:
        return 'blue';
      case 5:
        return 'yellow';
      default:
        return 'secondary';
    }
  },
});

Template.Profile_Page.events({
  /**
   * Logic for the active menu item and transitions
   */
  'click .event'(event) {
    let newItem;
    let oldItem;

    // Determine which item was just clicked
    if (event.target.classList.contains('own')) {
      newItem = 'own';
    } else
      if (event.target.classList.contains('attending')) {
        newItem = 'attending';
      } else {
        newItem = 'saved';
      }

    // Determine which item was previously active
    if ($('.ui.event.menu .active.item').hasClass('own')) {
      oldItem = 'own';
    } else
      if ($('.ui.event.menu .active.item').hasClass('attending')) {
        oldItem = 'attending';
      } else {
        oldItem = 'saved';
      }

    // If the two items are the same, don't do anything
    if (newItem === oldItem) {
      return;
    }

    // Update the 'active' class
    $(`.ui.event.menu .${oldItem}.item`).removeClass('active');
    $(`.ui.event.menu .${newItem}.item`).addClass('active');

    // Transition in the right direction
    if (oldItem === 'saved' || newItem === 'own') {
      $(`.ui.${oldItem}.four.cards`).transition('slide left', function after() {
        $(`.ui.${newItem}.four.cards`).transition('slide right');
      });
    } else {
      $(`.ui.${oldItem}.four.cards`).transition('slide right', function after() {
        $(`.ui.${newItem}.four.cards`).transition('slide left');
      });
    }
  },
});
