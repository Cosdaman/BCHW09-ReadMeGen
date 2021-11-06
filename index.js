//required packages
const inquirer = require('inquirer');
const fs = require('fs');
let folderName = "output"

//question array
const questions = [
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
    //     name: 'install',
    // },
    // {
    //     type: 'input',
    //     message: 'What about usage information?',
    //     name: 'usage',
    // },
    // {
    //     type: 'input',
    //     message: 'How about contribution guidelines?',
    //     name: 'contribution',
    // },
    // {
    //     type: 'input',
    //     message: 'Are there any test instructions?',
    //     name: 'test',
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

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    console.log(data)
    let contents = "";
    for (const key in data) {
        console.log(key)
        console.log(data[key])

    }
    try {
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName)
        }
    } catch (err) {
        console.error(err)
    }
    fs.writeFile(
        `./${folderName}/${fileName}.md`,
        JSON.stringify(contents),
        (err) => err ? console.error(err) : console.log('Commit logged!')
    );
}

// TODO: Create a function to initialize app
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

// Function call to initialize app
init();
