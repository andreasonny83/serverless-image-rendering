# Serverless Image Rendering

> Fast image delivering system using Sharp, AWS Lambda and Serverless framework.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
See deployment for notes on how to deploy the project on a live system.

### Prerequisites

This project requires NodeJS (at least version 6) and NPM.
[Node](http://nodejs.org/) and [NPM](https://npmjs.org/) are really easy to install.
To make sure you have them available on your machine,
try running the following command.

```sh
$ node --version
v7.10.1

$ npm --version
4.2.0
```

## Optional requisites

This project is making use of Serverless and Docker.
They are both optionals. Docker, however, will be required for deploying your local code
to Lambda if you are not running project from a Linux machine.
Read the Docker section to know more about.

### Installation

Start with cloning this repo on your local machine:

```sh
$ git clone https://github.com/andreasonny83/serverless-image-rendering.git
$ cd serverless-image-rendering
```

Then install all the Node dependencies usin npm or Yarn

```sh
$ npm install
# Or using Yarn for a faster installation
$ yarn
```

## Usage

### Serving the app

```sh
$ npm run dev
```

### Unit teststing

```sh
$ npm test
```

This is using Jest framework.
If you want to keep running Jest in the background and watch for file change while developing
use the following npm command instead:

```sh
$ npm run test:watch
```

## Deployment

1. Install serverless globally
1. Run `Make package-all`
1. run `npm run deploy`

## Log

```sh
$ sls info
$ sls logs -f {function-name} -t
```

## Contributing

1.  Fork it!
1.  Create your feature branch: `git checkout -b my-new-feature`
1.  Add your changes: `git add .`
1.  Commit your changes: `git commit -am 'Add some feature'`
1.  Push to the branch: `git push origin my-new-feature`
1.  Submit a pull request :sunglasses:

## Built With

* VSCode
* Docker
* Serverless
* Love

## License

[MIT License](https://andreasonny.mit-license.org/2018) © Andrea SonnY

TODO:
aws credentials
dotEnv
