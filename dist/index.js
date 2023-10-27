#! /usr/bin/env node
import inquirer from 'inquirer';
const min = 1;
const max = 100;
const secretNumber = Math.floor(Math.random() * (max - min + 1)) + min;
let attempts = 0;
async function playGame() {
    console.log('Welcome to the Number Guessing Game!');
    console.log(`I've selected a random number between ${min} and ${max}. Try to guess it.`);
    let guess = await getGuess();
    while (guess !== secretNumber) {
        attempts++;
        if (guess < secretNumber) {
            console.log('Too low! Try again.');
        }
        else {
            console.log('Too high! Try again.');
        }
        guess = await getGuess();
    }
    console.log(`Congratulations! You guessed the number ${secretNumber} correctly in ${attempts} attempts.`);
}
async function getGuess() {
    const response = await inquirer.prompt([
        {
            type: 'input',
            name: 'guess',
            message: `Guess the number between ${min} and ${max}:`,
            validate: (input) => {
                const number = parseInt(input);
                if (isNaN(number) || number < min || number > max) {
                    return `Please enter a valid number between ${min} and ${max}.`;
                }
                return true;
            }
        }
    ]);
    return parseInt(response.guess);
}
playGame();
