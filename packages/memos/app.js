'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Memos = new Module('memos');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Memos.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Memos.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Memos.menus.add([{
    title: 'Memos',
    link: 'list',
    roles: ['authenticated'],
    menu: 'main'
  }, {
    title: 'New Memo',
    link: 'create',
    roles: ['authenticated'],
    menu: 'main'
  }]);

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Memos.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Memos.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Memos.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Memos;
});
