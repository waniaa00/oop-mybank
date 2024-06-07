#! /usr/bin/env node
import inquirer from "inquirer";
// bank account class
class bankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    ;
    // debit money 
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawal of $${amount} successful. Remaining balance : $${this.balance}`);
        }
        else {
            console.log("Insufficient balance.");
        }
    }
    ;
    // credit money 
    deposit(amount) {
        if (amount > 100) {
            amount -= 1;
        }
        this.balance -= amount;
        console.log(`Deposition of $${amount} successful. Remaining balance : $${this.balance}`);
    }
    checkBalance() {
        console.log(`Current balance $${this.balance}`);
    }
}
//customer class 
class customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
// create bank accounts
const accounts = [
    new bankAccount(7770, 500),
    new bankAccount(8880, 1000),
    new bankAccount(9990, 2000),
];
// create customers
const customers = [
    new customer("Nayel", "Syed", "Male", 25, 33132456745, accounts[0]),
    new customer("Asfandiyar", "Mughal", "Male", 23, 33348378654, accounts[1]),
    new customer("Anushay", "Fatima", "Female", 22, 31483788309, accounts[2]),
];
//function to interact with bank account
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account number :",
        });
        const customer = customers.find((customer) => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(`Welcome, ${customer.firstName} ${customer.lastName}! \n`);
            const ans = await inquirer.prompt([{
                    name: "select",
                    type: "list",
                    message: "Select an option.",
                    choices: ["Deposit", "Withdraw", "Check balance", "Exit"],
                }]);
            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit:"
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to withdraw:"
                    });
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "Check balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting bank program...");
                    console.log("\n Thankyou for using our bank services. Have a great day!");
                    return;
            }
        }
        else {
            console.log("Invalid account number. Please try again.");
        }
    } while (true);
}
service();
