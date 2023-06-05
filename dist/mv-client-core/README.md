Metadev-Client-Core
===========

## Introduction.

MvCLientCore is a package which unpacks the metadata to render the client components and the routing. Also it creates an abstraction layer for using CRUD endpoints. The package will work best for building [ERP](https://en.wikipedia.org/wiki/Enterprise_resource_planning) apps which have a ton of forms.

**Metadev** is an abbreviation for Metadata-Driven development.

---
## Installation
```
npm install mv-core
```
---
## Usage
1. Add the below code to your `app.component.ts`
    ```typescript
    public navMenu;
    public appName = "Customer Management ERP";
    constructor( private router: Router) {
        this.navMenu = navMenu 
        // set your default landing page
        this.router.navigate(['customerList']);
    }

    public routeTo($event) {
        this.router.navigate([$event])
    }
    ```
2. Add the below code to your `app.component.html`
    ```html
    <app-mv-toolbar [appName]="appName"></app-mv-toolbar>
    <div class="row">
        <div class="col-md-2">
            <app-mv-sidenav [navMenu]="navMenu" (emitRoute)="routeTo($event)">
            </app-mv-sidenav>
        </div>
        <div class="col-md-10">
            <router-outlet></router-outlet>
        </div>
    </div>
    ```
3. Make sure you have the following files in your src/app
    1. `app.routes.ts`
    2. `app.menu.ts`

4. Create a folder named `pages` in src/app
5. In your `app.module.ts` import MVComponentsModule
    ```typescript
    imports: [
        MVComponentsModule
    ]
    ```
6. To make the best use of this package use [mv-server](https://github.com/supreethavadhani/Java-metadev-server-example)
---
## How it works?

The package is built using Angular. Also the package uses [Material Design Components](https://material.angular.io/). 

[Metadev-Server-Example](https://github.com/supreethavadhani/metadev-server-example) generates the models using simple JSON files *(e.g - [customer-from](https://github.com/supreethavadhani/metadev-server-example/blob/master/assets/spec/form/customer.frm.json)).*  These generated models are copied into to the project folder. Generating these models helps engineers/developers to spend more time on the design rather than the syntax. Also, anyone who does not have any prior experience with typescript will be able to generate models in no-time. The package unpacks these generated models to render the forms.
*The generated files can be found [here](https://github.com/supreethavadhani/metadev-client-example/tree/master/src/app/framework-modules/formdata/gen).*

---

## Example.

An example project which uses MvClientCore can be found [here](https://github.com/supreethavadhani/metadev-client-example).

---
## Contributing

Thank you for considering contributing to `mv-core`! 

### Reporting Bugs

Found a bug? Please open an issue on the GitHub repository and provide as much detail as possible, including steps to reproduce the issue and any error messages received.

### Suggesting Enhancements

Have an idea for a new feature or enhancement? Please open an issue on the GitHub repository and include a detailed explanation of the proposed feature, including any relevant use cases or examples.

### Pull Requests

We welcome pull requests from the community! Please follow these guidelines when submitting a pull request:

- Fork the repository and create a new branch from `master`.
- Ensure that your code adheres to the existing code style and conventions.
- Include tests for any new features or changes.
- Ensure that all tests are passing before submitting the pull request.
- Provide a clear and concise description of the changes made and the reasoning behind them.


### License

By contributing to `mv-core`, you agree that your contributions will be licensed under the same license as the package.


