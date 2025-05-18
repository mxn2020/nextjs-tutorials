#!/usr/bin/env node
// Script to verify Next.js environment variables are correctly loaded

const fs = require('fs');
const path = require('path');
const chalk = require('chalk') || { green: (t) => t, red: (t) => t, yellow: (t) => t };

// Paths for environment files
const envPath = path.join(process.cwd(), '.env');
const envLocalPath = path.join(process.cwd(), '.env.local');

console.log('Environment Variables Check');
console.log('==========================');

// Check .env file
if (fs.existsSync(envPath)) {
  console.log(chalk.green('✅ .env file exists'));
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envVars = envContent.split('\n')
    .filter(line => line.trim() && !line.startsWith('#'))
    .map(line => line.split('=')[0]);
  console.log(`Found ${envVars.length} variables in .env`);
} else {
  console.log(chalk.yellow('⚠️ No .env file found'));
}

// Check .env.local file
if (fs.existsSync(envLocalPath)) {
  console.log(chalk.green('✅ .env.local file exists'));
  const envLocalContent = fs.readFileSync(envLocalPath, 'utf8');
  const envLocalVars = envLocalContent.split('\n')
    .filter(line => line.trim() && !line.startsWith('#'))
    .map(line => line.split('=')[0]);
  console.log(`Found ${envLocalVars.length} variables in .env.local`);
} else {
  console.log(chalk.red('❌ No .env.local file found - Next.js prioritizes this file!'));
}

// Check critical variables
const criticalVars = [
  'MONGODB_URI',
  'MONGODB_DB',
  'NEXTAUTH_SECRET',
  'NEXTAUTH_URL'
];

console.log('\nChecking critical environment variables:');
criticalVars.forEach(variable => {
  if (process.env[variable]) {
    console.log(chalk.green(`✅ ${variable} is defined`));
  } else {
    console.log(chalk.red(`❌ ${variable} is NOT defined`));
  }
});

console.log('\nNote: Next.js loads .env.local over .env by default');
console.log('Environment variables should be available in your application now.');
