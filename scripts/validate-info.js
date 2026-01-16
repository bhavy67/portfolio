#!/usr/bin/env node

/**
 * Personal Info Validator
 * Validates the personal-info.json file for common issues
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CONFIG_PATH = path.join(__dirname, '../src/config/personal-info.json');

function validateConfig() {
  console.log('🔍 Validating personal-info.json...\n');

  // Check if file exists
  if (!fs.existsSync(CONFIG_PATH)) {
    console.error('❌ Error: personal-info.json not found at', CONFIG_PATH);
    process.exit(1);
  }

  // Read and parse JSON
  let config;
  try {
    const content = fs.readFileSync(CONFIG_PATH, 'utf8');
    config = JSON.parse(content);
  } catch (error) {
    console.error('❌ Error: Invalid JSON syntax');
    console.error(error.message);
    process.exit(1);
  }

  const warnings = [];
  const errors = [];

  // Validate required fields
  const requiredFields = {
    'personal.fullName': config.personal?.fullName,
    'personal.initials': config.personal?.initials,
    'personal.title': config.personal?.title,
    'contact.email': config.contact?.email,
    'social.github.url': config.social?.github?.url,
    'social.linkedin.url': config.social?.linkedin?.url,
  };

  Object.entries(requiredFields).forEach(([field, value]) => {
    if (!value || value.includes('yourusername') || value.includes('example.com')) {
      warnings.push(`⚠️  ${field} needs to be updated (contains placeholder)`);
    }
  });

  // Validate email format
  const email = config.contact?.email;
  if (email && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    errors.push(`❌ Invalid email format: ${email}`);
  }

  // Validate URLs
  const socialUrls = [
    ['GitHub', config.social?.github?.url],
    ['LinkedIn', config.social?.linkedin?.url],
    ['LeetCode', config.social?.leetcode?.url],
  ];

  socialUrls.forEach(([platform, url]) => {
    if (url && !url.startsWith('http')) {
      errors.push(`❌ ${platform} URL should start with http:// or https://`);
    }
  });

  // Check username/URL consistency
  if (config.social?.github?.url && config.social?.github?.username) {
    const url = config.social.github.url;
    const username = config.social.github.username;
    if (!url.includes(username)) {
      warnings.push(`⚠️  GitHub URL and username don't match`);
    }
  }

  // Display results
  console.log('📊 Validation Results:\n');

  if (errors.length === 0 && warnings.length === 0) {
    console.log('✅ All checks passed! Your configuration looks good.\n');
    return;
  }

  if (errors.length > 0) {
    console.log('🚨 ERRORS (must fix):');
    errors.forEach(err => console.log(err));
    console.log();
  }

  if (warnings.length > 0) {
    console.log('⚠️  WARNINGS (should update):');
    warnings.forEach(warn => console.log(warn));
    console.log();
  }

  if (errors.length > 0) {
    console.log('❌ Validation failed. Please fix the errors above.');
    process.exit(1);
  } else {
    console.log('⚠️  Validation passed with warnings. Consider updating placeholder values.');
  }
}

// Display current configuration
function displayConfig() {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  
  console.log('\n📋 Current Configuration:\n');
  console.log('Personal:');
  console.log(`  Name: ${config.personal.fullName}`);
  console.log(`  Title: ${config.personal.title}`);
  console.log(`  Location: ${config.personal.location.full}`);
  console.log('\nContact:');
  console.log(`  Email: ${config.contact.email}`);
  console.log(`  Phone: ${config.contact.phone}`);
  console.log('\nSocial:');
  console.log(`  GitHub: ${config.social.github.username}`);
  console.log(`  LinkedIn: ${config.social.linkedin.username}`);
  console.log();
}

// Main execution
const command = process.argv[2];

if (command === 'show') {
  displayConfig();
} else {
  validateConfig();
}
