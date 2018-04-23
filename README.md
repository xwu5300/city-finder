# City Finder

> A simple single-page application to help select a city to live in within the United States

## Team

  - __Product Owner__: Tom Wagner
  - __Scrum Master__: David Baek
  - __Development Team Members__: Wei Gao, Ryan Schabel

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Run the Application Locally](#run-the-application-locally)
1. [Contributing](#contributing)


## Usage

The application starts with the 39 largest cities in the United States rendered to the page. From there, the user is able to filter the results using a number of different parameters such as metro size, region, population, cost of livng, surrounding enviornment and climate. The list of cities matching the criteria selected by the user updates on every button click and the cities are re-rendered to the page. The user can then hover on each city to display more specific information such as exact population and average temperature.

## Tech stack

#### Core technologies:

**[React](https://reactjs.org/), [Express](https://expressjs.com/), [MongoDB](https://www.mongodb.com/), [Mongoose](http://mongoosejs.com/docs/index.html), [MLAB](http://docs.mlab.com/)** and **[Webpack](https://webpack.js.org/)**

#### Other technologies:

Bulma, Axios, and Yahoo Query Language (to access weather data from Yahoo! API)

## Requirements

See general and development-specific dependencies within package.json for more information. Please note the application uses deprecated versions in certain instances in order to ensure the dependencies worked together.

## Development

#### Installing Dependencies

Run npm install within the root directory in order to install dependencies:

```sh
npm install
```

#### Run the application locally

Run the following command within the root directory in order to start a local server:

```sh
npm run server-dev
```

Run the following command within the root directory in order to have webpack continually bundle your code

```sh
npm run react-dev
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
