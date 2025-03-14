#!/usr/bin/env node

const { execSync } = require("child_process");
const inquirer = require("inquirer");
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

const removeGitDirectory = (name) => {
  try {
    if (os.platform() === "win32") {
      runCommand(`cd ${name} && rmdir /s /q .git`);
    } else {
      runCommand(`cd ${name} && rm -rf .git`);
    }
  } catch (error) {
    console.error("Failed to remove .git directory", error.message);
  }
};

const setupProject = async () => {
  try {
    const answers = await inquirer.default.prompt([
      {
        type: "input",
        name: "repoName",
        message: "Enter your project name:",
        default: "my-jcc-app",
      },
      {
        type: "list",
        name: "frontend",
        message: "Select your preferred frontend:",
        choices: ["Inertia + React", "Inertia + Vue", "JSBlade"],
      },
    ]);

    const { repoName, frontend } = answers;
    let repoURL =
      "https://github.com/jammehabdou64/new-jcc-express-starter-app";

    if (frontend === "Inertia + React") {
      repoURL = "https://github.com/jammehabdou64/jcc-express-react-app";
    }
    if (frontend === "Inertia + Vue") {
      repoURL = "https://github.com/jammehabdou64/jcc-express-vue-app";
    }

    console.log(`\nCloning the repository (${frontend}) into ${repoName}...\n`);
    const gitCheckOutCommand = `git clone --depth 1 ${repoURL} ${repoName}`;
    const checkOut = runCommand(gitCheckOutCommand);
    if (!checkOut) process.exit(-1);

    console.log(`\nInstalling dependencies for ${repoName}...\n`);
    const installDepsCommand = `cd ${repoName} && npm install`;
    const installDep = runCommand(installDepsCommand);
    if (!installDep) process.exit(-1);

    removeGitDirectory(repoName);

    console.log("\nSetting up environment file...\n");
    const createEnv = runCommand(`cd ${repoName} && cp .env.example .env`);
    if (!createEnv) process.exit(-1);

    console.log("\n🎉 Congratulations! Your project is ready.\n");
    console.log(`➡️  cd ${repoName}`);
    console.log("🚀 Start the server with:");
    console.log("   npm run dev");
  } catch (error) {
    console.log("Sorry, An error occur");
  }
};

setupProject();
