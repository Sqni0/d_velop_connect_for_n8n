#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const packagePath = path.join(process.cwd(), 'package.json');

if (!fs.existsSync(packagePath)) {
	console.error('package.json not found in current working directory.');
	process.exit(1);
}

const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
const n8nConfig = pkg.n8n || {};
const nodePaths = Array.isArray(n8nConfig.nodes) ? n8nConfig.nodes : [];
const credentialPaths = Array.isArray(n8nConfig.credentials) ? n8nConfig.credentials : [];
const referencedPaths = [...nodePaths, ...credentialPaths];

if (referencedPaths.length === 0) {
	console.error('No n8n node/credential paths defined in package.json.');
	process.exit(1);
}

const missing = referencedPaths.filter((relativePath) => {
	const absolutePath = path.resolve(process.cwd(), relativePath);
	return !fs.existsSync(absolutePath);
});

if (missing.length > 0) {
	console.error('Missing referenced n8n files:');
	for (const filePath of missing) {
		console.error(`- ${filePath}`);
	}
	process.exit(1);
}

console.log(`n8n manifest validation passed (${referencedPaths.length} referenced files found).`);