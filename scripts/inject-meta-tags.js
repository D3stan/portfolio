#!/usr/bin/env node

/**
 * Inject Meta Tags Script
 * 
 * This script reads configuration from src/config/index.js and injects
 * meta tags into index.html before the build process. This ensures that
 * social media crawlers and bots see the proper meta tags without
 * needing to execute JavaScript.
 */

import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

async function injectMetaTags() {
  try {
    console.log('🔧 Injecting meta tags into index.html...');

    // Read the config file
    const configPath = join(rootDir, 'src/config/index.js');
    const configContent = await readFile(configPath, 'utf-8');

    // Parse config values using regex (simple extraction)
    const extractValue = (key) => {
      // Try to match values that may span multiple lines
      // Pattern: export const KEY = "value" or export const KEY =\n  "value"
      const pattern = new RegExp(`export const ${key}\\s*=\\s*["'\`]([^"'\`]*(?:\\n[^"'\`]*)*)["'\`]`, 's');
      const match = configContent.match(pattern);
      if (match) return match[1].replace(/\n\s+/g, ' ').trim();
      
      return '';
    };

    const extractArray = (key) => {
      const match = configContent.match(new RegExp(`export const ${key}\\s*=\\s*\\[([^\\]]+)\\]`, 's'));
      if (!match) return [];
      return match[1]
        .split(',')
        .map(item => item.trim().replace(/^["']|["']$/g, ''))
        .filter(item => item.length > 0);
    };

    // Extract configuration values
    const META_TITLE = extractValue('META_TITLE');
    const META_DESCRIPTION = extractValue('META_DESCRIPTION');
    const META_AUTHOR = extractValue('META_AUTHOR');
    const META_OG_IMAGE = extractValue('META_OG_IMAGE');
    const META_SITE_URL = extractValue('META_SITE_URL');
    const META_LANGUAGE = extractValue('META_LANGUAGE');
    const FAVICON = extractValue('FAVICON');
    const FONTS_URL = extractValue('FONTS_URL');
    const META_KEYWORDS = extractArray('META_KEYWORDS');

    const fullImageUrl = `${META_SITE_URL}${META_OG_IMAGE}`;
    const keywords = META_KEYWORDS.join(', ');

    // Read index.html
    const indexPath = join(rootDir, 'index.html');
    let html = await readFile(indexPath, 'utf-8');

    // Generate meta tags
    const metaTags = `
	<!-- SEO Meta Tags -->
	<meta name="description" content="${META_DESCRIPTION}" />
	<meta name="keywords" content="${keywords}" />
	<meta name="author" content="${META_AUTHOR}" />
	<meta name="language" content="${META_LANGUAGE}" />
	
	<!-- Favicon -->
	<link rel="icon" type="image/svg+xml" href="${FAVICON}" />
	
	<!-- Fonts -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link href="${FONTS_URL}" rel="stylesheet" />
	
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="${META_SITE_URL}" />
	<meta property="og:title" content="${META_TITLE}" />
	<meta property="og:description" content="${META_DESCRIPTION}" />
	<meta property="og:image" content="${fullImageUrl}" />
	
	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="${META_SITE_URL}" />
	<meta name="twitter:title" content="${META_TITLE}" />
	<meta name="twitter:description" content="${META_DESCRIPTION}" />
	<meta name="twitter:image" content="${fullImageUrl}" />
`;

    // Replace the title and insert meta tags
    // First, replace the title
    html = html.replace(/<title>.*?<\/title>/, `<title>${META_TITLE}</title>`);
    
    // Add lang attribute to html tag
    html = html.replace(/<html>/, `<html lang="${META_LANGUAGE}">`);
    
    // Insert meta tags after the base tag or viewport meta tag
    const insertAfter = html.indexOf('<base href="/" />') !== -1 
      ? '<base href="/" />'
      : '<meta name="viewport" content="width=device-width, initial-scale=1.0" />';
    
    html = html.replace(insertAfter, `${insertAfter}\n${metaTags}`);

    // Write back to index.html
    await writeFile(indexPath, html, 'utf-8');

    console.log('✅ Meta tags injected successfully!');
    console.log(`   Title: ${META_TITLE}`);
    console.log(`   Description: ${META_DESCRIPTION.substring(0, 60)}...`);
    console.log(`   Image: ${fullImageUrl}`);
    
  } catch (error) {
    console.error('❌ Error injecting meta tags:', error);
    process.exit(1); // eslint-disable-line no-undef
  }
}

injectMetaTags();
