const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { hashElement } = require('folder-hash');

const args = process.argv.slice(2);

function execute(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(stdout);
        console.error(stderr);
        reject(error);
      } else {
        console.warn(stderr);
        console.log(stdout);
        resolve();
      }
    });
  });
}

async function build() {
  console.log('cleaning…');
  await execute('rm -rf dist');

  console.log('generating types…');
  await execute('npx tsc');

  console.log('rolling…');
  await execute('npx rollup -c');

  const hash = await hashElement(path.resolve(__dirname, '../dist'), {
    encoding: 'hex',
  });
  const buildHash = hash.hash.substring(0, 9);

  console.log('writing `package.json`s…');
  const topLevelPackageJson = require('../package.json');

  const {
    private: _private,
    scripts: _scripts,
    devDependencies: _devDependencies,
    peerDependencies: _peerDependencies,
    version: packageVersion,
    ...restOfTopLevelPackageJson
  } = topLevelPackageJson;

  const version = args.includes('--use-package-version')
    ? packageVersion
    : `0.0.0-${buildHash}`;

  await fs.promises.writeFile(
    path.resolve(__dirname, '../dist/package.json'),
    JSON.stringify(
      {
        ...restOfTopLevelPackageJson,
        version,
      },
      null,
      2,
    ),
  );
}

build().catch((e) => {
  console.error(e);
  process.exit(1);
});
