const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

//Array Declaration
const myTeam = [];

//Function for grabbing Manager data

function manager() {
  return inquirer
    .prompt([
      {
        type: 'confirm',
        message: 'Let\'s build your Engineering Team! Press Y on your keyboard to begin.',
        name: 'intro'
      },
      {
        type: 'input',
        message: 'What is your manager\'s name?',
        name: 'managerName'
      },
      {
        type: 'input',
        message: 'What is your manager\'s ID?',
        name: 'managerId'
      },
      {
        type: 'input',
        message: 'What is your manager\'s email address?',
        name: 'managerEmail',
        //add validate here
      },
      {
        type: 'input',
        message: 'What is your office number?',
        name: 'officeNumber'
      }

    ])
    .then((answers) => {
      const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.officeNumber);
      myTeam.push(manager);
      addEmployee();
    })
};

function addEmployee () {
  return inquirer
    .prompt([{
      type: 'list',
      message: 'Choose the next employee to your team.',
      choices: ['Engineer', 'Intern', 'I do not want to add another employee'],
      name: 'addEmployee'
    }])
    .then((choice) => {
      switch (choice.addEmployee){
        case 'Engineer':
          engineer()
          break;
        case 'Intern':
          intern()
          break;
        case 'I do not want to add another employee':
          break;
      }
    })
}

function engineer() {
  return inquirer
    .prompt([
    {
      type: 'input',
      message: 'What is your Engineer\'s name?',
      name: 'engineerName'
    },
    {
     type: 'input',
     message: 'What is your Engineer\'s Id?',
     name: 'engineerId'
    },
    {
      type: 'input',
      message: 'What is your Engineer\'s email address?',
      name: 'engineerEmail'
    },
    {
      type: 'input',
      message: 'What is your Engineer\'s GitHub username?',
      name: 'github'
    }
  ])
  .then((answers) => {
    const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.github);
    myTeam.push(engineer);
    addEmployee();
  })
}

function intern() {
  return inquirer
    .prompt([
    {
      type: 'input',
      message: 'What is your Intern\'s name?',
      name: 'internName'
    },
    {
      type: 'input',
      message: 'What is your Intern\'s Id?',
      name: 'internId'
    },
    {
      type: 'input',
      message: 'What is your Intern\'s email address?',
      name: 'internEmail'
    },
    {
      type: 'input',
      message: 'Enter the school your Intern attends.',
      name: 'school'
    }
  ])
  .then((answers) => {
    const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.school);
    myTeam.push(intern);
    addEmployee();
  })
}

manager()

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will


// generate and return a block of HTML including templated divs for each employee!


render(myTeam);


// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
