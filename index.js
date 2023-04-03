// import { add, edit, remove, createFileIfNotExist } from './helpers';
const helpers =require("./helpers.js");
// const fs = require('fs');
helpers.createFileIfNotExist();
function main(args) {
    const [, , op, ...options] = args;
    const data=helpers.preparedData(options);
    // console.log(options);
    // console.log(data);
    switch (op) {
        case "add":
            helpers.add(data);
            break;
        case "edit":
            helpers.edit(data);
            break;
        case "remove":
            helpers.remove(data)
            break;
        case "display":
            helpers.display(data);
            break;
        case "checked":
            helpers.checked(data);
            break;
        case "unchecked":
            helpers.unchecked(data);
            break;

        default:
            break;
    }

}

main(process.argv)