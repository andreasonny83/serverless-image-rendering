# Serverless Image Rendering

> Fast image delivering system using Sharp, AWS Lambda and Serverless framework.

[![serverless][badge-serverless]](http://www.serverless.com)

Demo Lambda function available [here](https://y7p8ti99y5.execute-api.us-east-1.amazonaws.com/dev/resize-image?f=sample.jpg&w=700&q=60&t=webp)

Medium article available [here](https://medium.com/@andreasonny83/serverless-image-optimization-and-delivery-510b6c311fe5)

- [Serverless Image Rendering](#serverless-image-rendering)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
  - [Optional requisites](#optional-requisites)
    - [Installation](#installation)
    - [Images Bucket](#images-bucket)
  - [Usage](#usage)
    - [Enviroment configuration](#enviroment-configuration)
    - [dotENV](#dotenv)
    - [Serving the app](#serving-the-app)
    - [Resizing your images](#resizing-your-images)
    - [Unit teststing](#unit-teststing)
  - [Deployment](#deployment)
    - [Docker](#docker)
  - [Log](#log)
  - [Contributing](#contributing)
  - [Built With](#built-with)
  - [License](#license)

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

You may also want to install Serverless globally on your local machine for accessing the
CLI functionality and directly interact with your deployed Lambda function.

To install Serverless globally on your machine, run the following command

```sh
$ npm i -g serverless
```

Please, read the [official Serverless documentation](https://serverless.com/framework/docs/getting-started/)
to know more about the installation process.

If you want to deploy your code to AWS, then you will also need an AWS account and
[set-up your provider credentials](https://serverless.com/framework/docs/providers/aws/guide/credentials/)

## Optional requisites

This project is making use of Serverless and Docker.
They are both optionals however Docker will be required for deploying your local code
to Lambda if you are not running this project from a Linux machine.
Read the [Docker](#docker) section to know more about.

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

### Images Bucket

This project is making use of a pre-existing S3 bucket from where fetching
the images to be processed and deliver to the client.
If you don't have an S3 already, create one from your AWS dashboard and
continue reading the [Enviroment configuration](#enviroment-configuration)
section.

## Usage

### Enviroment configuration

This project contains a `serverless.sample.yml` file.
You need to manually renamed it to `serverless.yml`.
In order for your application to be correctly deployed to AWS, you will need to
replace the `BUCKET` name under the `environment` section according to your S3
bucket name previously created.

### dotENV

For your local development you will need a `.env` file containing your S3 bucket name.
Rename the `.env.sample` file in this project to be `.env` first, then replace the
`your-s3-bucket-name` placeholder with the correct name of your S3 Bucket.

### Serving the app

```sh
$ npm run dev
```

This will run NodeJS against `local.js` using `express`.
This file will be only used during your local development and the real
Lambda function handler is instead sitting inside `handler.js`
so any change apported to `local.js` that you want to deploy in your Lambda
function will require a correspondent change made inside your `handler.js`
file as well.

### Resizing your images

While ruinng your local app, open a browser to
[`http://localhost:3000/resize-image/status`](http://localhost:3000/resize-image/status)

You should be able to see a JSON information to prove that your app is actually
up and runing.

You can then replace the `/status` endpoint with your image information.

`http://localhost:3000/resize-image?f=FILE-NAME&w=WIDTH&h=HEIGHT&q=QUALITY&t=TYPE`

| Query strinng name | Type   | Required | Description |
| ------------------ | ------ | -------- | ----------- |
| `f`                | String | Yes      | The complete image name uploaded to your S3 bucke (eg. placeholder.jpg)
| `w`                | Number | No       | The image width
| `h`                | Number | No       | The image height
| `q`                | Number | No       | The image quality (between 1-100)
| `t`                | String | No       | The image type (default is webp) Available values are [webp, jpeg and png]

Note. If the Type is different from your original image type, it will
automatically be converted into the nnew format.

**Example**

`http://localhost:3000/resize-image?f=placeholder.png&w=600&q=75&t=jpeg`

Assuminng that you have an image called `placeholder.png` on your S3 bucket:


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

1. Install serverless globally (optional)
1. Make sure you have correctly set up your AWS credentials
1. Run `Make package`
1. run `npm run deploy`

### Docker

The `Make package` command will run `npm install` from inside a Docker
container to reproduce the same envirnment configuration present in AWS Lambda.

## Log

Note. The following commands will require Serverless to be globally
installed on your machine. Please read the [Prerequisites](#prerequisites)
section for more information.

When your Lambda function has been deployed, you will be able to
easily log all the events directly inside your local terminal.

```sh
$ sls logs -f {function-name} -t
```

If you don't remember what's your function name, you can easily retrieve
all your Lambda ingormation running the following command from inside your
project's directory.

```sh
$ sls info
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
* dotENV
* Serverless
* Love

## License

[MIT License](https://andreasonny.mit-license.org/2018) © Andrea SonnY

[badge-serverless]: http://public.serverless.com/badges/v3.svg
