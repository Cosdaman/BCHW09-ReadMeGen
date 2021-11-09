//required packages
const inquirer = require('inquirer');
const fs = require('fs');
const licenseGen = require('./utils/generateMarkdown');
//data arrays and vars
const readmeStruct = [
    "Description",
    "Installation",
    "Usage",
    "License",
    "Contributing",
    "Tests",
    "Questions"
];
const ignoredKeys = ["title", "license", "github", "email"];
let folderName = "output";

//question array
const questions = [
    {
        type: 'input',
        message: "What's your Github username?",
        name: 'github',
    },
    {
        type: 'input',
        message: "What's your email address?",
        name: 'email',
    },
    {
        type: 'input',
        message: 'What is your project title?',
        name: 'title',
    },
    // {
    //     type: 'input',
    //     message: 'What is your project description?',
    //     name: 'description',
    // },
    // {
    //     type: 'input',
    //     message: 'What are the installation instructions?',
    //     name: 'installation',
    // },
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
    {
        type: 'list',
        message: 'Please choose a license from the following options: ',
        name: 'license',
        choices: ["Apache 2.0 License", "GNU AGPL v3", "GNU GPL v3", "GNU LGPL v3", "Mozilla Public License 2.0", "The MIT License"],
    },
];

//create readme
function writeToFile(fileName, data) {
    let contents = "";
    let questionContent = `## QUESTIONS  \n\nFor any questions about this application feel free to reach out through the following:  \n`;
    let licenseContents = "";
    //output directory
    try {
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName)
        }
    } catch (err) {
        console.error(err)
    }
    let TOC = '# TABLE OF CONTENTS  \n\n';
    for (const [i, value] of readmeStruct.entries()) {
        TOC += `[${value}](#${value.toLowerCase().split(" ").join("")})  \n`;
    }
    for (const keyName in data) {
        if (!ignoredKeys.includes(keyName)) {
            contents += `## ${keyName.toUpperCase()}  \n\n${data[keyName]}  \n\n`;
        } else if (keyName == 'license') {
            let licenseData = licenseGen(data);
            console.log(licenseData)
            licenseContents += `## ${keyName.toUpperCase()}  \n\n`
            licenseContents += "";
        } else if (keyName == 'github') {
            questionContent += `Github: [${data.github}](https://github.com/${data.github})  \n`
        } else if (keyName == 'email') {
            questionContent += `Email: [${data.email}](mailto:${data.email})  \n`;
        }
    }
    console.log(data)

    fs.writeFile(
        `./${folderName}/${fileName}.md`,
        `# ${fileName.toUpperCase()}  \n${TOC}  \n\n${contents}  \n${licenseContents}  \n\n${questionContent}`,
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
                console.log("error", error)
            } else {
                console.log("something else went wrong", error)
            }
        });
}

init();
