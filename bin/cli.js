#!/usr/bin/env node

const { execSync } = require("child_process");
const inquirer = require("inquirer");
const os = require("os");
const path = require("path");
const fs = require("fs");

const platform = os.platform();

// Repository URL mapping
const REPO_URLS = {
  "Inertia + React": "https://github.com/jammehabdou64/jcc-express-react-app",
  "Inertia + React + Typescript":
    "https://github.com/jammehabdou64/jcc-express-react-ts-app",
  "Inertia + Vue": "https://github.com/jammehabdou64/jcc-express-vue-app",
  "Inertia + Vue + Typescript":
    "https://github.com/jammehabdou64/jcc-express-vue-ts-app",
  default: "https://github.com/jammehabdou64/new-jcc-express-starter-app",
};

// Validate project name - only allow alphanumeric, hyphens, and underscores
const validateProjectName = (name) => {
  if (!name || name.trim().length === 0) {
    return "Project name cannot be empty";
  }
  if (!/^[a-zA-Z0-9_-]+$/.test(name)) {
    return "Project name can only contain letters, numbers, hyphens, and underscores";
  }
  return true;
};

// Sanitize project name to prevent command injection
const sanitizeProjectName = (name) => {
  return name.replace(/[^a-zA-Z0-9_-]/g, "");
};

// Check if directory exists
const directoryExists = (dirPath) => {
  try {
    return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
  } catch {
    return false;
  }
};

// Remove directory recursively
const removeDirectory = (dirPath) => {
  try {
    if (platform === "win32") {
      execSync(`rmdir /s /q "${dirPath}"`, { stdio: "inherit" });
    } else {
      execSync(`rm -rf "${dirPath}"`, { stdio: "inherit" });
    }
  } catch (error) {
    console.error(`Failed to remove directory: ${dirPath}`, error?.message);
  }
};

const runCommand = (command, options = {}) => {
  try {
    execSync(command, { stdio: "inherit", ...options });
    return true;
  } catch (error) {
    console.error(`Failed to execute command: ${error?.message}`);
    return false;
  }
};

const removeGitDirectory = (projectPath) => {
  const gitPath = path.join(projectPath, ".git");
  if (directoryExists(gitPath)) {
    try {
      if (platform === "win32") {
        runCommand(`rmdir /s /q "${gitPath}"`);
      } else {
        runCommand(`rm -rf "${gitPath}"`);
      }
    } catch (error) {
      console.error("Failed to remove .git directory:", error?.message);
    }
  }
};

const setupProject = async () => {
  let projectPath = null;

  try {
    // Get project name from command line arguments or prompt
    let repoName = process.argv[2];

    // If project name provided via CLI, validate it
    if (repoName) {
      const validation = validateProjectName(repoName);
      if (validation !== true) {
        console.error(`\n❌ Error: ${validation}\n`);
        process.exit(1);
      }
    } else {
      // Prompt for project name if not provided
      const nameAnswer = await inquirer.default.prompt([
        {
          type: "input",
          name: "repoName",
          message: "Enter your project name:",
          default: "my-jcc-app",
          validate: validateProjectName,
        },
      ]);
      repoName = nameAnswer.repoName;
    }

    // Always prompt for frontend choice
    const frontendAnswer = await inquirer.default.prompt([
      {
        type: "list",
        name: "frontend",
        message: "Select your preferred frontend:",
        choices: [
          "Inertia + React",
          "Inertia + React + Typescript",
          "Inertia + Vue",
          "Inertia + Vue + Typescript",
        ],
      },
    ]);

    const { frontend } = frontendAnswer;
    const sanitizedName = sanitizeProjectName(repoName);
    projectPath = path.resolve(process.cwd(), sanitizedName);

    // Check if directory already exists
    if (directoryExists(projectPath)) {
      console.error(
        `\n❌ Error: Directory "${sanitizedName}" already exists. Please choose a different name.\n`
      );
      process.exit(1);
    }

    // Get repository URL
    const repoURL = REPO_URLS[frontend] || REPO_URLS.default;

    console.log(`\n📦 Cloning the repository (${frontend}) into ${sanitizedName}...\n`);
    const gitCheckOutCommand = `git clone --depth 1 "${repoURL}" "${projectPath}"`;
    const checkOut = runCommand(gitCheckOutCommand);
    if (!checkOut) {
      console.error("\n❌ Failed to clone repository. Please check your internet connection and try again.\n");
      process.exit(1);
    }

    console.log(`\n📥 Installing dependencies for ${sanitizedName}...\n`);
    const installDepsCommand = platform === "win32"
      ? `cd /d "${projectPath}" && npm install`
      : `cd "${projectPath}" && npm install`;
    const installDep = runCommand(installDepsCommand);
    if (!installDep) {
      console.error("\n❌ Failed to install dependencies. Please try again.\n");
      removeDirectory(projectPath);
      process.exit(1);
    }

    removeGitDirectory(projectPath);

    console.log("\n⚙️  Setting up environment file...\n");
    const envExamplePath = path.join(projectPath, ".env.example");
    const envPath = path.join(projectPath, ".env");

    if (fs.existsSync(envExamplePath)) {
      try {
        fs.copyFileSync(envExamplePath, envPath);
      } catch (error) {
        console.error("⚠️  Warning: Failed to create .env file:", error?.message);
        console.log("You may need to create it manually from .env.example\n");
      }
    } else {
      console.log("⚠️  Warning: .env.example file not found. Skipping environment setup.\n");
    }

    console.log("\n🎉 Congratulations! Your project is ready.\n");
    console.log(`➡️  cd ${sanitizedName}`);
    console.log("🚀 Start the server with:");
    console.log("   npm run watch");
    console.log("   npm run dev\n");
  } catch (error) {
    console.error("\n❌ Sorry, an error occurred:", error?.message || error);
    
    // Cleanup on error
    if (projectPath && directoryExists(projectPath)) {
      console.log("\n🧹 Cleaning up...\n");
      removeDirectory(projectPath);
    }
    
    process.exit(1);
  }
};

setupProject();
