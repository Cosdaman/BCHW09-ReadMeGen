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
    {
        type: 'input',
        message: 'What about usage information?',
        name: 'usage',
    },
    {
        type: 'input',
        message: 'How about contribution guidelines?',
        name: 'contributing',
    },
    {
        type: 'input',
        message: 'Are there any test instructions?',
        name: 'tests',
    },
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
    console.log(data)
    let contents = "";
    //output directory
    try {
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName)
        }
    } catch (err) {
        console.error(err)
    }
    for (const key in data) {
        if (key == "title") {
            contents += `# ${data[key]}  \n`
        } else {
            contents += `## ${key.toUpperCase()}  \n ${data[key]}  \n\n`
        }
    }
    fs.writeFile(
        `./${folderName}/${fileName}.md`,
        contents,
        (err) => err ? console.error(err) : console.log('Commit logged!')
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
