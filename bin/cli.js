#!/usr/bin/env node

const { execSync } = require("child_process");

const runCommand = (command) => {
  try {
    execSync(`${command}`, { stdio: "inherit" });
  } catch (error) {
    console.error(`Failed to execute ${command}`, e);
    return false;
  }
  return true;
};

const repoName = process.argv[2];
const gitCheckOutCommand = `git clone --depth 1 https://github.com/jammehabdou64/jcc-express-mvc-library ${repoName}`;
const installDepsCommand = `cd ${repoName} && npm install`;

console.log(`Cloning the repository with name ${repoName}`);

const checkOut = runCommand(gitCheckOutCommand);

if (!checkOut) process.exit(-1);

console.log(`Installing dependence for ${repoName}`);

const installDep = runCommand(installDepsCommand);

if (!installDep) process.exit(-1);

const createEnv = runCommand(`cd ${repoName} && cp .env.example .env`);
if (!createEnv) process.exit(-1);
console.log("Congradulation you are now ready.");
console.log(`cd ${repoName}`);
console.log("start server");
console.log("npm run dev");
