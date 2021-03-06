import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../../api/profiles/profiles.js';
import { FlowRouter } from 'meteor/kadira:flow-router';

/* eslint-disable no-console */

Template.Cas_Login.onCreated(function onCreated() {
  this.subscribe('Profiles');
});

Template.Cas_Login.events({
  /**
   * Handle the click on the logout link.
   * @param event The click event.
   * @returns {boolean} False.
   */
  'click .cas-logout': function casLogout(event) {
    event.preventDefault();
    Meteor.logout();
    return false;
  },

  /**
   * Handle the click on the login link.
   * @param event The click event.
   * @returns {boolean} False.
   */
  'click .cas-login': function casLogin(event) {
    event.preventDefault();
    const callback = function loginCallback(error) {
      if (error) {
        console.log(error);
      } else {
        // If user is not in system, go to setup page
        const user = Meteor.user();
        if (user && !Profiles.findOne({ username: user.profile.name })) {
          FlowRouter.go('User_Setup_Page');
        }
      }
    };
    Meteor.loginWithCas(callback);
    return false;
  },
});
