# Risk_Decision_System_E2E_Test
The test was conducted on web browser for RDS

##Pre-Condition
Install node.js and npm on the system
* Windows https://phoenixnap.com/kb/install-node-js-npm-on-windows
* Mac https://www.newline.co/@Adele/how-to-install-nodejs-and-npm-on-macos--22782681
* Linux(ubantu) https://linuxize.com/post/how-to-install-node-js-on-ubuntu-18.04/

## Tech Stack 
- javaScript 
- cypress

## Setup
* Navigate to desire location in your workstation and clone the project.
* Type command `https://github.com/aifinyo-ag/Risk_Decision_System_E2E_Test.git` on the terminal. 
* Open the folder in your favourite editor or VsCode.
* Install dependencies by running `npm install`

## Running Tests

* To run all  or  individual tests via GUI, run  `npm run cy:open`
* To run test in different configuration from command prompt, type `npm run `

## Creation of New Test
- Create new project in cypress/e2e/[projectname].
- All the feature of the project will be in seperate folder i.e for Invoice Feature we will have folder as : cypress/e2e/Dashboard/1_Filter/1_Existence.cy.js
- /fixture folder will be having all the test data for different envoirnment cypress/fixtures/address.json

## Enhancement
* Publish report via gitpages or on slack channel
* from automation to manual case creation.
