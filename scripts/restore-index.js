#!/usr/bin/env node

/**
 * Restore Index HTML Script
 * 
 * This script restores index.html to its original state after the build.
 * The prebuild script injects meta tags, vite builds, and this script cleans up.
 */

import { execSync } from 'child_process';

try {
  console.log('🔄 Restoring original index.html...');
  execSync('git checkout index.html', { stdio: 'inherit' });
  console.log('✅ index.html restored to original state');
} catch {
  // If git checkout fails (e.g., no git repo), that's okay
  console.log('ℹ️  Could not restore index.html (not in git repo or already clean)');
}
