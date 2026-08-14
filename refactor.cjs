const fs = require('fs');
const path = require('path');

function getFiles(dir, files = []) {
    const fileList = fs.readdirSync(dir);
    for (const file of fileList) {
        const name = `${dir}/${file}`;
        if (fs.statSync(name).isDirectory()) {
            getFiles(name, files);
        } else if (name.endsWith('.jsx')) {
            files.push(name);
        }
    }
    return files;
}

const files = getFiles('resources/js/Pages/Marketing');
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const match = content.match(/<MarketingLayout\s+title=({[^}]+}|"[^"]+")>/);
    if (match) {
        const title = match[1];
        const componentMatch = content.match(/export\s+default\s+function\s+([A-Za-z0-9_]+)\s*\(/);
        if (componentMatch) {
            const componentName = componentMatch[1];
            content = content.replace(match[0], '<>');
            content = content.replace(/<\/MarketingLayout>\s*\);\s*}\s*$/, '</>\n    );\n}\n\n' + componentName + '.layout = page => <MarketingLayout title=' + title + '>{page}</MarketingLayout>;\n');
            fs.writeFileSync(file, content);
            console.log('Updated ' + file);
        }
    }
});
