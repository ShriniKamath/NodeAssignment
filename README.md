# NodeAssignment
This is a Node Assignment for Project

## Clonining the Project
You can clone the project using this commond
```
git clone https://github.com/ShriniKamath/NodeAssignment.git
```

## Folder Structure

After cloning you need to install all dependency. Please run this command.
```
npm install
```

After installing all the module, your project should look like this:

```
my-app/
  README.md
  node_modules/
  test/
    test.js
  package.json
  app.js
  firstNonRepChar.html
  index.html
  index.js
  product.html
  saveContent.html
```

For the project to build, **these files must exist with exact filenames**:

* `/index.html` is the page template;
* `/index.js` is the JavaScript entry point.

You can delete or rename the other files.
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3002](http://localhost:3002) to view it in the browser.

You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

## Description the Project
This is a node project, when you run this project and open[http://localhost:3002], you can see 4 list:

1>Product Search using GET
Using Get API 2 parameter will be send and get the product based on the param send to it.

2>First Non-Repitation Character
Using this POST API will be called and first non repitative charater it will return if found else error message will be shown.

3>Save Content in file
Using this POST API will be called and data will be stored in the file.

4>Web Crawler
Using this GET API will be called and it will find all link from site and also search for sub site from the sub domian
