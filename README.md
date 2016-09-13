## Apollo Fullstack Isomorphic Starter Kit

> Apollo Fullstack Isomorphic Starter Kit is an boilerplate for [isomorphic](http://isomorphic.net/javascript)
> web app development built on topof [Apollo](http://www.apollostack.com/), 
> [GraphQL](http://graphql.org/), [React](https://facebook.github.io/react/), 
> [Express](http://expressjs.com/) with SQL storage support and 
> [Twtiter Bootstrap](http://getbootstrap.com/) integration and containing modern web development
> tools such as [Webpack](http://webpack.github.io/), [Babel](http://babeljs.io/) to help you stay productive.

## Getting Started

1. Clone starter kit locally.

  ```
  git clone git@github.com:sysgears/apollo-fullstack-starter-kit.git
  cd apollo-fullstack-starter-kit
  ```

2. Install dependencies.

  ```
  npm i
  ```

3. Create sample SQLite database schema.

  ```
  npm run migrate
  ```

4. Seed sample database data.

  ```
  npm run seed
  ```

5. Run starter kit in development mode.

  ```
  npm start
  ```

## Demo 
You can see latest version of this app deployed to Heroku here:
https://apollo-fullstack-starter-kit.herokuapp.com

## Deploying to [Heroku]
1. Add your app to [Heroku]
1. Allow [Heroku] to install build time dependencies from the devDependencies in package.json:
   `Settings -> Config Variables -> Add`, KEY: `NPM_CONFIG_PRODUCTION`, VALUE: `false`.
1. Deploy your app on [Heroku]

[Heroku]: (https://heroku.com)

## License
Copyright © 2016 [SysGears INC](http://sysgears.com). This source code is licensed under the [MIT][] license.

[MIT]: LICENSE
