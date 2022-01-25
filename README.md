# Integrating a custom API in Google Sheets with Apps Script

This code is intended to be a reference to any programmer that needs a template project in order to integrate custom API
calls in Google Spreadsheets.

**NOTE:** The API URIs provided in this example do not work, as the endpoints of the API used are not intended to be publicly available.

## Setup

**1. Create a container-bound Apps Script project.** In order to do so, open the Google Sheet spreadsheet which would
like to bound to the Apps Script project and go to `Extensions > Apps Script`.

**2. Get the files in your project.** Copy the contents of [project-code](project-code) one by one in your project
structure, so you end up with the same files in your Apps script project.

**3. Save changes in your Apps Script project.**

Now if you return to the spreadsheet, and wait a little, a new tab in the toolbar should appear. In this example it's
called "Hontza Toolbox". This will lead you to different forms that will print different queries on your current sheet.

For example, I have a preconfigured API call that can list all the entities tagged with a specific id.

Once I press the "Ejecutar" button the sheet will create a table in the first available row listing details about all
these entities. Awesome right?

## Project structure

`hontza_toolbox.gs`: Javascript file containing the calls to the external API and the functions that serve the requested
data as a table.

`procedures.gs`: Javascript file that contains the main procedures executed when submitting forms.

`javascript.html`: This file contains client-server logic related to the behaviour of the forms, specifying what happens
when the form is submitted.

`ui.gs`: Functions that render our custom menu in the toolbar and cover form related mechanisms.

`stylesheet.html`: A basic CSS stylesheet that makes things look as if they were made by Google.

`*_form.html`: These files compose the skeleton of the forms to be submitted.

## References

* [Apps Script home](https://script.google.com/home)
* [Client-to-server communication](https://developers.google.com/apps-script/guides/html/communication)
* [HtmlService class](https://developers.google.com/apps-script/reference/html/)
* [UIs](https://developers.google.com/apps-script/guides/html)
* [Custom menus and dialogs](https://developers.google.com/apps-script/guides/menus)
