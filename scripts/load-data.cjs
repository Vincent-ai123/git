const fs = require("fs");
const vm = require("vm");
const path = require("path");
const context = {window:{}};
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(__dirname,"..","data.js"),"utf8"),context);
module.exports=context.window.ATLAS_DATA;
