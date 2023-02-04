import inquirer from "inquirer";
import fs from "fs";

async function addUser() {
    const { name } = await inquirer.prompt([
        { name: "name", type: "input", message: "Enter name. Press ENTER to cancel" }
    ]);

    if (!name) {
        const { showDb } = await inquirer.prompt([
            { name: "showDb", type: "confirm", message: "Would you to search values in DB?" }
        ])
        if (showDb) {
            await fs.readFile("database.txt", "utf8", (e, data) => {
                if (e) {
                    throw e
                }
                console.log(JSON.parse(`[${data}]`));
            })
        }
        return;
    }

    const { age, gender } = await inquirer.prompt([
        {
            type: "list",
            name: "gender",
            message: "Choose your Gender.",
            choices: ["male", "female"]
        },
        {
            type: "input",
            name: "age",
            message: "Enter your age:",
            validate: function (input) {
                const done = this.async();
                const isNum = isNaN(parseInt(input));
                if (isNum) done("Please use only numbers.");
                done(null, true);
            }
        },
    ]);

    await fs.appendFile("database.txt", JSON.stringify({ name, gender, age }) + ",", (e) => { if (e) throw e })

    console.log(name, age, gender);
    addUser();
}

addUser();