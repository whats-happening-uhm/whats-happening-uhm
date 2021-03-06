import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

FlowRouter.route('/', {
  name: 'Landing_Page',
  action() {
    BlazeLayout.render('Landing_App_Body', { main: 'Landing_Page' });
  },
});

FlowRouter.route('/home', {
  name: 'Home_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Home_Page' });
  },
});

FlowRouter.route('/profile/:username', {
  name: 'Profile_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Profile_Page' });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_Body', { main: 'App_Not_Found' });
  },
};

FlowRouter.route('/add-event-page', {
  name: 'Add_Event_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Add_Event_Page' });
  },
});

FlowRouter.route('/edit-event-page/:_id', {
  name: 'Edit_Event_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Edit_Event_Page' });
  },
});

FlowRouter.route('/user-setup', {
  name: 'User_Setup_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'User_Setup_Page' });
  },
});

FlowRouter.route('/edit-profile/:username', {
  name: 'Edit_Profile_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Edit_Profile_Page' });
  },
});
