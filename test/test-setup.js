const fs = require('fs');
const path = require('path');

function readJSONFilesFromFolder() {
    const folderPath = path.join(__dirname, '..', 'locators');
    const files = fs.readdirSync(folderPath);
    const jsonData = {};

    files.forEach((file) => {
        const filePath = path.join(folderPath, file);
        if (path.extname(file) === '.json') {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const data = JSON.parse(fileContent);
            Object.assign(jsonData, data);
        }
    });

    return jsonData;
}

before(async function () {
    const result = readJSONFilesFromFolder();
    global.locators = result;
});

after(async function () {
    await global.driver.quit();
});
