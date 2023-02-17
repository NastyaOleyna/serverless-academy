const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const operations = [
    {
        id: "1",
        description: "Sort words alphabetically",
        operation(input) {
            return input.sort((a, b) => {
                const pa = parseInt(a);
                const pb = parseInt(b);
                if (!isNaN(pa) && !isNaN(pb)) return 0;
                if (!isNaN(pb) && isNaN(pa)) return -1;
                if (isNaN(pa) && isNaN(pb)) {
                    return a.localeCompare(b);
                }
            })
        }
    },
    {
        id: "2",
        description: "Show numbers from lesser to greater",
        operation(input) {
            return input.sort((a, b) => {
                const pa = parseInt(a);
                const pb = parseInt(b);
                if (isNaN(pa) && isNaN(pb)) return 0;
                if (isNaN(pb) && !isNaN(pa)) return -1;
                return pa - pb;
            })
        }
    },
    {
        id: "3",
        description: "Show numbers from bigger to smaller",
        operation(input) {
            return input.sort((a, b) => {
                const pa = parseInt(a);
                const pb = parseInt(b);
                if (isNaN(pa) && isNaN(pb)) return 0;
                if (isNaN(pb) && !isNaN(pa)) return -1;
                return pb - pa;
            })
        }
    },
    {
        id: "4",
        description: "Display words in ascending order by number of letters in the word",
        operation(input) {
            return input.sort((a, b) => {
                const aCountOfLetters = a.split("").length;
                const bCountOfLetters = b.split("").length;
                return aCountOfLetters - bCountOfLetters;
            })
        }
    },
    {
        id: "5",
        description: "Show only unique words",
        operation(input) {
            let uniqueValues = [...new Set(input)];
            let result = uniqueValues.filter((item) => isNaN(parseInt(item)));
            return result;
        }
    },
    {
        id: "6",
        description: "Display only unique values from the set of words and numbers entered by the user",
        operation(input) {
            return [...new Set(input)];
        }
    }
];


const renderOptions = operations.map((item) => `${item.id}. ${item.description}`).join("\n") + "\nTo exit this program enter 'exit'\n";


const startQuiz = () => {
    rl.question("Hello. Enter 10 words or digits separated by spaces: ", function (input) {
        if (input === "exit") return rl.close();
        rl.write(`\nWhat operation do I need to do?\n${renderOptions}`);
        processChoice(input);
    });
};

const processChoice = (input) => {
    rl.question(`Enter your choice: `, function (id) {
        if (input === "exit") return rl.close();
        const checkId = operations.find(obj => obj.id === id);
        if (!checkId) {
            rl.write("Please enter the right number of your choice");
            processChoice(input);
        }
        else {
            const result = operations[id - 1].operation(input.split(" "));
            rl.write(result.join(" "));
            startQuiz();
        }
    });
}

startQuiz();
