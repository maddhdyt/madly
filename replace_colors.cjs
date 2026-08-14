const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'resources', 'js', 'Pages', 'Accounting');

const colorsToReplace = [
    'blue', 'green', 'emerald', 'rose', 'amber', 'yellow', 'orange', 'purple', 'indigo', 'violet', 'pink', 'cyan', 'teal'
];

function processDirectory(directory) {
    fs.readdirSync(directory).forEach(file => {
        const fullPath = path.join(directory, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            colorsToReplace.forEach(color => {
                // 1. Text hover
                const hoverRegex = new RegExp(`\\bhover:text-${color}-([0-9]+)\\b`, 'g');
                if (hoverRegex.test(content)) {
                    content = content.replace(hoverRegex, (match, shade) => {
                        return `hover:text-gray-900 dark:hover:text-white`;
                    });
                    modified = true;
                }

                // 2. Opacity bgs (e.g. bg-emerald-900/30)
                const opacityRegex = new RegExp(`\\b(bg|border)-${color}-([0-9]+)\\/([0-9]+)\\b`, 'g');
                if (opacityRegex.test(content)) {
                    content = content.replace(opacityRegex, (match, prefix, shade, opacity) => {
                        if (prefix === 'bg' && shade === '900') {
                            return `bg-gray-800`;
                        }
                        if (prefix === 'border' && shade === '800') {
                            return `border-gray-700`;
                        }
                        return `${prefix}-gray-${shade}/${opacity}`;
                    });
                    modified = true;
                }

                // 3. Normal classes
                const regex = new RegExp(`\\b(bg|text|border|ring|divide)-${color}-([0-9]+)\\b`, 'g');
                if (regex.test(content)) {
                    content = content.replace(regex, (match, prefix, shade) => {
                        if (prefix === 'text' && (shade === '600' || shade === '700' || shade === '500' || shade === '400')) {
                            return `text-gray-900 dark:text-white`;
                        }
                        if (prefix === 'bg' && (shade === '50' || shade === '100')) {
                            return `bg-gray-100`;
                        }
                        if (prefix === 'bg' && shade === '900') {
                            return `bg-gray-800`;
                        }
                        if (prefix === 'border' && (shade === '100' || shade === '200')) {
                            return `border-gray-200`;
                        }
                        if (prefix === 'border' && shade === '800') {
                            return `border-gray-700`;
                        }
                        
                        return `${prefix}-gray-${shade}`;
                    });
                    modified = true;
                }
            });

            // Cleanups
            const badStrings = [
                { from: /text-gray-900 dark:text-white dark:text-white/g, to: 'text-gray-900 dark:text-white' },
                { from: /dark:text-white dark:text-gray-[0-9]+/g, to: 'dark:text-white' },
                { from: /text-gray-900 text-gray-900 dark:text-white/g, to: 'text-gray-900 dark:text-white' },
                { from: /bg-gray-100 text-gray-900 dark:text-white dark:bg-gray-800/g, to: 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white' },
                { from: /bg-gray-100 text-gray-900 dark:text-white dark:bg-gray-800\/[0-9]+/g, to: 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white' },
                { from: /bg-gray-100 text-gray-900 dark:text-white/g, to: 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white' }
            ];

            badStrings.forEach(({from, to}) => {
                if (from.test(content)) {
                    content = content.replace(from, to);
                    modified = true;
                }
            });

            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated ${fullPath}`);
            }
        }
    });
}

processDirectory(dirPath);
console.log('Done!');
