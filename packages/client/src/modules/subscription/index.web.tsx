import React from 'react';
import { Route, NavLink } from 'react-router-dom';

import { MenuItem } from '../../modules/common/components/web';
import Subscription from './containers/Subscription.web';
import SubscribersOnly from './containers/SubscribersOnly.web';
import UpdateCard from './containers/UpdateCard.web';
import { SubscriberRoute } from './containers/Auth.web';
import settings from '../../../../../settings';

import Feature from '../connector.web';

export default new Feature({
  route: settings.subscription.enabled
    ? [
        <Route exact path="/subscription" component={Subscription} />,
        <SubscriberRoute exact scope="user" path="/subscribers-only" component={SubscribersOnly} />,
        <SubscriberRoute exact scope="user" path="/update-card" component={UpdateCard} />
      ]
    : [],
  navItem: settings.subscription.enabled
    ? [
        <MenuItem key="/subscribers-only">
          <NavLink to="/subscribers-only" className="nav-link" activeClassName="active">
            Subscribers Only
          </NavLink>
        </MenuItem>
      ]
    : [],
  scriptsInsert: 'https://js.stripe.com/v3/'
});
