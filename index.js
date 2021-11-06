//required packages
const inquirer = require('inquirer');
const fs = require('fs');
const readmeStruct = [
    "Description",
    "Installation",
    "Usage",
    "License",
    "Contributing",
    "Tests",
    "Questions"
];
const ignoredKeys = ["title", "github", "email"]
let folderName = "output";

//question array
const questions = [
    {
        type: 'input',
        message: 'What is your project title?',
        name: 'title',
    },
    {
        type: 'input',
        message: 'What is your project description?',
        name: 'description',
    },
    {
        type: 'input',
        message: 'What are the installation instructions?',
        name: 'installation',
    },
    // {
    //     type: 'input',
    //     message: 'What about usage information?',
    //     name: 'usage',
    // },
    // {
    //     type: 'input',
    //     message: 'How about contribution guidelines?',
    //     name: 'contributing',
    // },
    // {
    //     type: 'input',
    //     message: 'Are there any test instructions?',
    //     name: 'tests',
    // },
    // {
    //     type: 'input',
    //     message: 'Please choose a license from the following options: ',
    //     name: 'license',
    // },
    // {
    //     type: 'input',
    //     message: "What's your Github username?",
    //     name: 'github',
    // },
    // {
    //     type: 'input',
    //     message: "What's your email address?",
    //     name: 'email',
    // },
];

//create readme
function writeToFile(fileName, data) {
    let contents = "";
    //output directory
    try {
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName)
        }
    } catch (err) {
        console.error(err)
    }
    let TOC = '# TABLE OF CONTENTS  \n';
    for (const [i, value] of readmeStruct.entries()) {
        TOC += `[${value}](#${value.toLowerCase().split(" ").join("")})  \n`;
    }
    console.log(data.title)
    for (const keyName in data) {
        if (ignoredKeys.indexOf(keyName) == -1) {
            contents += `## ${keyName.toUpperCase()}  \n ${data[keyName]}  \n\n`;
        }
    }
    console.log(contents)
    fs.writeFile(
        `./${folderName}/${fileName}.md`,
        `# ${fileName.toUpperCase()}  \n` + TOC + contents,
        (err) => err ? console.error(err) :
            console.log("readme generated")
    );
}

//initialize
function init() {
    inquirer.prompt(questions)
        .then((response) => {
            writeToFile(response.title, response)
        })
        .catch((error) => {
            if (error.isTtyError) {
                prompt("error", error)
            } else { prompt("something else went wrong") }
        });
}

init();
