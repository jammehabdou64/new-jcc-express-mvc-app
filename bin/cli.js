#!/usr/bin/env node

const { execSync } = require("child_process");
const os = require("os");

const runCommand = (command) => {
  try {
    execSync(`${command}`, { stdio: "inherit" });
  } catch (error) {
    console.error(`Failed to execute ${command}`, error?.message);
    return false;
  }
  return true;
};

const repoName = process.argv[2];
const gitCheckOutCommand = `git clone --depth 1 https://github.com/jammehabdou64/new-jcc-express-starter-app ${repoName}`;
const installDepsCommand = `cd ${repoName} && npm install`;

console.log(`Cloning the repository with name ${repoName}`);

const checkOut = runCommand(gitCheckOutCommand);

if (!checkOut) process.exit(-1);

console.log(`Installing dependence for ${repoName}`);

const installDep = runCommand(installDepsCommand);

const removeGitDirectory = (name) => {
  try {
    if (os.platform() === "win32") {
      // For Windows
      const command = `rmdir /s /q ${gitDirPath}`;
      runCommand(`cd ${name} && ${command}`);
    } else {
      const command = `rm -rf ${gitDirPath}`;
      runCommand(`cd ${name} && ${command}`);
    }
  } catch (error) {}
};

removeGitDirectory(repoName);

if (!installDep) process.exit(-1);

const createEnv = runCommand(`cd ${repoName} && cp .env.example .env`);
if (!createEnv) process.exit(-1);
console.log("Congradulation you are now ready.");
console.log(`cd ${repoName}`);
console.log("start server");
console.log("npm run dev");
