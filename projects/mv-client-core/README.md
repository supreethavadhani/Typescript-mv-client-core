Metadev-Client-Core
===========

## Introduction.

MvCLientCore is a package which unpacks the metadata to render the client components. Also it creates an abstraction layer for using CRUD endpoints. The goal of the package is to reduce the code written for frontend development. The package is best suited for [ERP](https://en.wikipedia.org/wiki/Enterprise_resource_planning) apps which have a ton of forms.


**Metadev** is an abbreviation for Metadata-Driven development.

---

## How it works?

The package is built using Angular. Also the package uses [Material Design Components](https://material.angular.io/). 

[Metadev-Server-Example](https://github.com/supreethavadhani/metadev-server-example) generates the models using simple JSON files *(e.g - [customer-from](https://github.com/supreethavadhani/metadev-server-example/blob/master/assets/spec/form/customer.frm.json)).*  These generated models are copied into to the project folder. Generating these models helps engineers/developers to spend more time on the design rather than the syntax. Also, anyone who does not have any prior experience with typescript will be able to generate models in no-time. The package unpacks these generated models to render the forms.
*The generated files can be found [here](https://github.com/supreethavadhani/metadev-client-example/tree/master/src/app/framework-modules/formdata/gen).*

---

## Example.

An example project which uses MvClientCore can be found [here](https://github.com/supreethavadhani/metadev-client-example).

