const crypto = require("crypto");
function hashCode(str) {
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
        let chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash.toString(16);
}
const startTime = performance.now();
// const uniqueID = crypto.randomBytes(16).toString("hex");
hashCode("patrek-gill");
const endTime = performance.now();

console.log("Time: ", endTime - startTime);
