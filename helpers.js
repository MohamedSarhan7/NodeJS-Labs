// import { fs } from "fs";
const fs = require('fs')
const PATH_FILE = './data.json';

function add(data) {
    oldData = getData();
    if (oldData.length == 0) {
        newId = 0
    } else {

        newId = parseInt(oldData[oldData.length - 1].id);
    }
    data.id = ++newId;
    data.checked = false;
    console.log(data)
    oldData.push(data)
    asyncWrite(PATH_FILE, JSON.stringify(oldData))
}

function remove(data) {
    oldData = getData();
    oldData = oldData.filter((obj) => obj.id != data.id);
    asyncWrite(PATH_FILE, JSON.stringify(oldData))

}

function edit(data) {
    oldData = getData();
    // get old obj
    oldObj = oldData.filter((obj) => obj.id == data.id)[0];

    console.log(oldObj)
    if (oldObj) {
        for (const key in data) {
            if (oldObj.hasOwnProperty(key) && data[key] != data.id) {
                oldObj[key] = data[key]
            }
        }
        //  remove old obj from arr
        oldData = oldData.filter(obj => { return obj.id != data.id })
        oldData.push(oldObj);
        asyncWrite(PATH_FILE, JSON.stringify(oldData))


    } else {
        console.log(`Not found with id=${data.id}`)
    }
}





function asyncExist(file) {
    return new Promise((resolve, reject) => {
        fs.exists(file, (exists) => {
            if (exists) {

                resolve(exists);
            } else {
                reject(!exists);
            }
        })
    })
}

function asyncWrite(file, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, (err) => {
            if (err) {

                reject(exists);
            } else {
                resolve("done");
            }
        })
    })
}


function asyncRead(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) {

                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

async function createFileIfNotExist() {
    if (! await asyncExist(PATH_FILE)) {
        fs.writeFileSync(PATH_FILE, JSON.stringify([]))
    }
}


async function getData() {
    return JSON.parse(await asyncRead(PATH_FILE));

}


// function createFileIfNotExist() {
//     if (!fs.existsSync(PATH_FILE)) {
//         fs.writeFileSync(PATH_FILE, JSON.stringify([]))
//     }


// }

function getData() {
    return JSON.parse(fs.readFileSync(PATH_FILE));

}
function preparedData(options) {
    const data = options.reduce((prev, element) => {

        const [key, value] = element.split("=");
        prev[key] = value;
        return prev;
    }, {});
    return data;
}


function display(data) {
    jsonData = JSON.parse(fs.readFileSync(PATH_FILE));
    if (data.status == 'checked') {
        jsonData = jsonData.filter((e) => e.checked == true)

    } else if (data.status == "unchecked") {

        jsonData = jsonData.filter((e) => e.checked == false)
    }
    jsonData.forEach(element => {
        console.log(element);
    });
}
function unchecked(data) {
    oldData = getData();
    // get old obj
    oldObj = oldData.filter((obj) => obj.id == data.id)[0];

    if (oldObj) {

        oldObj['checked'] = false
        //  remove old obj from arr
        oldData = oldData.filter(obj => { return obj.id != data.id })
        oldData.push(oldObj);
        fs.writeFileSync(PATH_FILE, JSON.stringify(oldData))
    }
    else {
        console.log(`Not found with id=${data.id}`)
    }
}
function checked(data) {
    oldData = getData();
    // get old obj
    oldObj = oldData.filter((obj) => obj.id == data.id)[0];

    if (oldObj) {

        oldObj['checked'] = true
        //  remove old obj from arr
        oldData = oldData.filter(obj => { return obj.id != data.id })
        oldData.push(oldObj);
        fs.writeFileSync(PATH_FILE, JSON.stringify(oldData))
    }
    else {
        console.log(`Not found with id=${data.id}`)
    }
}
module.exports = {
    add, edit, remove, createFileIfNotExist, getData, preparedData, display, checked, unchecked
}