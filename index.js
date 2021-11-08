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
const ignoredKeys = ["title", "github", "email"];
const questionKeys = ["github", "email"];
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
];

//create readme
function writeToFile(fileName, data) {
    let contents = "";
    let questionContent = `## QUESTIONS  \n\nFor any questions about this application feel free to reach out through the following:  \n`;

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
    for (const keyName in data) {
        console.log(keyName)
        if (!ignoredKeys.includes(keyName)) {
            contents += `## ${keyName.toUpperCase()}  \n\n${data[keyName]}  \n\n`;
        } else if (keyName == 'github') {
            questionContent += `${keyName.toUpperCase()}: [${data.github}](https://github.com/${data.github})  \n`
        } else if (keyName == 'email') {
            questionContent += `${keyName.toUpperCase()}: [${data.email}](mailto:${data.email})  \n`;
        }
    }
    console.log(data)

    fs.writeFile(
        `./${folderName}/${fileName}.md`,
        `# ${fileName.toUpperCase()}  \n${TOC}  \n\n${contents}  \n${questionContent}`,
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
                console.log("something else went wrong")
            }
        });
}

init();
