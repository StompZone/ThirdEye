// Gets information about Phoenix Epsilon itself

function getPackageJson() {
    const packageJson = require("../../package.json");
    return packageJson;
}

export function getProgramName() {
    return getPackageJson().name;
}

export function getVersion() {
    return getPackageJson().version;
}

export const programName = getProgramName();
export const programVersion = getVersion();
