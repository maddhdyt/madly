const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'resources', 'js', 'Pages', 'Accounting');

function processDirectory(directory) {
    fs.readdirSync(directory).forEach(file => {
        const fullPath = path.join(directory, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            const badStrings = [
                { from: /dark:text-white dark:text-gray-[0-9]+ dark:text-white/g, to: 'dark:text-white' },
                { from: /text-gray-900 dark:text-white dark:text-gray-900 dark:text-white/g, to: 'text-gray-900 dark:text-white' },
                { from: /dark:text-white dark:text-white/g, to: 'dark:text-white' },
                { from: /text-gray-900 text-gray-900/g, to: 'text-gray-900' }
            ];

            badStrings.forEach(({from, to}) => {
                if (from.test(content)) {
                    content = content.replace(from, to);
                    modified = true;
                }
            });

            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Cleaned ${fullPath}`);
            }
        }
    });
}

processDirectory(dirPath);
console.log('Cleanup Done!');
