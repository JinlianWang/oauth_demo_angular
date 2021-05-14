# oAuth-web-app-angular

This project is to demo how to create a web client in Angular which performs user authentication using oAuth Authorization Code grant type through AWS Cognito. The details, such as workflows and sequence diagrams can be found at [User authentication through authorization code grant type using AWS Cognito](https://dev.to/jinlianwang/user-authentication-through-authorization-code-grant-type-using-aws-cognito-1f93). The first commit was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.6.

The project can be developed locally and deployed to production in S3 bucket. See "Production Deployment (AWS S3 Bucket)" for procedures. 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Production Deployment (AWS S3 Bucket)

Prerequisite: follow [AWS Command Line Interface: Configuration and credential file settings](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) to set up your AWS CLI. 
After building the project (see Section "Build" for details), run `cd dist/`, and `aws s3 cp oauth-web-app-angular s3://<s3 bucket name> --recursive` to copy project code to S3 bucket. 

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
