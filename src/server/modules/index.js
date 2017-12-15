import entities from './entities';
import auth from './auth';
import subscription from './subscription';

import counter from './counter';
import post from './post';
import upload from './upload';
import contact from './contact';
import mailer from './mailer';
import graphqlTypes from './graphqlTypes';
import apolloEngine from './apolloEngine';

import './debug';

import Feature from './connector';

export default new Feature(
  entities,
  auth,
  subscription,
  counter,
  contact,
  post,
  upload,
  mailer,
  graphqlTypes,
  apolloEngine
);
