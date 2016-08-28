import React from 'react';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {mount} from 'react-mounter';


import MainLayout from '/imports/client/modules/core/containers/mainLayout';

import View_Map from './containers/view_map';



export default function (injectDeps) {

  const MainLayoutCtx = injectDeps(MainLayout);


  // Move these as a module and call this from a main file
  FlowRouter.route('/map/:destination', {
    name: 'map',
    action({destination}) {
      mount(MainLayoutCtx, {
        content: () => (<View_Map someDestination={destination} />)
      });
    }
  });

};





