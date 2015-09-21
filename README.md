# Angular-TodoMVC-Reflux

[![Build Status](https://travis-ci.org/javamonn/Angular-TodoMVC-Reflux.svg?branch=master)](https://travis-ci.org/javamonn/Angular-TodoMVC-Reflux)

## Motivation

Demonstrates the usage of modern javascript libraries and architechture within the
context of a relatively simple Angular application: the long-standing [TodoMVC](http://todomvc.com/).

Conventional Angular-esque MVC is eschewed in favor of using directives as lightweight 
modular components backed by [Reflux.js](https://github.com/spoike/refluxjs) stores and 
a unidirectional data flow. All data is immutable through use of [Immutable.js](https://github.com/facebook/immutable-js).

Data is (optimistically) persisted locally with [PouchDB](https://github.com/pouchdb/pouchdb). I 
currently do not do any syncing with a server but this could be trivially implemented.
Aditionally, the unidirectional data flow means the persist store could be swapped out
with something that talks to a server directly without changing any other part of the
application.

UI state is driven by [Bacon.js](https://github.com/baconjs/bacon.js/) with
Reflux actions used to model and emit events. Local ui-specific state is maintained by 
some components but I deliberately do not make use of Angular's two way data binding to
communicate state across components.

All JS is writtin in ES6, transpiled with [Babel](https://github.com/babel/babel), and tested
with [Karma](https://github.com/karma-runner/karma) and [Jasmine](https://github.com/jasmine/jasmine)

## Running

You must have [npm](https://www.npmjs.org/) installed on your computer.
From the root project directory run these commands from the command line:

    npm install

This will install all dependencies.

To start the project, run this command:

    npm start

Point your browser at [https://localhost:8000](https://localhost:8000) to
view the project.

Alternatively, deploy the project for free on Heroku for a zero-configuration install.

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Contributing

- Fork it

- Clone it
    ```
    git clone https://github.com/*YOUR-USERNAME*/angular-flux
    ```

- Hack it

- Test it (contribute some more!)
    ```
    npm test
    ```

- Open a PR!

