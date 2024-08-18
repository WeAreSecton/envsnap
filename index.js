#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');
const dotenv = require('dotenv');
const ora = require('ora');

const program = new Command();
program.name('envsnap');
const CONFIG_DIR = path.join(process.cwd(), '.envsnap');

const ensureConfigDir = () => {
    fs.ensureDirSync(CONFIG_DIR);
};

const fileExists = (filePath) => fs.pathExistsSync(filePath);

// !!! EXPERIMENTAL
const gitWarning = () => {
    /*if (fs.pathExistsSync(path.join(process.cwd(), '.git'))) {
        if (fs.pathExistsSync(GITIGNORE_PATH) && fs.readFileSync(GITIGNORE_PATH, 'utf8').split('\n').some(line => line.trim() !== '.envsnap')) {
            console.warn(chalk.yellow('Warning: .envsnap is not listed in .gitignore. Your environment files might be committed to the repository.'));
        }
    }*/
};

program
    .command('create <environment>')
    .alias('init')
    .description('Create a new environment configuration')
    .action((env) => {
        ensureConfigDir();
        gitWarning();
        const envFilePath = path.join(CONFIG_DIR, `.env.${env}`);
        const spinner = ora(`Creating and initializing environment ${env}...`).start();

        if (fileExists(envFilePath)) {
            spinner.fail(chalk.red(`Environment ${env} already exists.`));
            process.exit(1);
        }

        fs.writeFileSync(envFilePath, '', 'utf8');
        spinner.succeed(chalk.green(`Environment ${env} created.`));
    });

program
    .command('set <environment>')
    .description('Set the active environment')
    .action((env) => {
        ensureConfigDir();
        gitWarning();
        const envFilePath = path.join(CONFIG_DIR, `.env.${env}`);
        const targetEnvFile = path.join(process.cwd(), '.env');
        const spinner = ora(`Setting environment to ${env}...`).start();

        if (!fileExists(envFilePath)) {
            spinner.fail(chalk.red(`Environment ${env} does not exist.`));
            process.exit(1);
        }

        fs.copyFileSync(envFilePath, targetEnvFile);
        spinner.succeed(chalk.green(`Environment set to ${env}.`));
    });

program
    .command('use <environment>')
    .description('Use the specified environment variables in the current process')
    .action((env) => {
        ensureConfigDir();
        gitWarning();
        const envFilePath = path.join(CONFIG_DIR, `.env.${env}`);
        const spinner = ora(`Loading environment ${env}...`).start();

        if (!fileExists(envFilePath)) {
            spinner.fail(chalk.red(`Environment ${env} does not exist.`));
            process.exit(1);
        }

        dotenv.config({ path: envFilePath });
        spinner.succeed(chalk.green(`Environment ${env} loaded.`));
    });

program
    .command('list')
    .description('List all available environments')
    .action(() => {
        ensureConfigDir();
        gitWarning();
        const spinner = ora('Listing available environments...').start();
        const files = fs.readdirSync(CONFIG_DIR)
            .filter(file => file.startsWith('.env.'))
            .map(file => file.replace('.env.', ''));

        if (files.length === 0) {
            spinner.warn(chalk.yellow('No environments found.'));
        } else {
            spinner.info(chalk.blue('Available environments:'));
            files.forEach(env => console.log(`- ${env}`));
        }
    });

program
    .command('delete <environment>')
    .description('Delete a specific environment configuration')
    .action((env) => {
        ensureConfigDir();
        gitWarning();
        const envFilePath = path.join(CONFIG_DIR, `.env.${env}`);
        const spinner = ora(`Deleting environment ${env}...`).start();

        if (!fileExists(envFilePath)) {
            spinner.fail(chalk.red(`Environment ${env} does not exist.`));
            process.exit(1);
        }

        fs.removeSync(envFilePath);
        spinner.succeed(chalk.green(`Environment ${env} deleted.`));
    });

program
    .action((command) => {
        program.help();
    });

program.parse(process.argv);