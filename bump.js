const fs = require('fs')

let packagejson = JSON.parse(fs.readFileSync("package.json"))

let verparts = packagejson.version.split(".")

let newversion = verparts[0] + "." + verparts[1] + "." + (parseInt(verparts[2]) + 1).toString()

packagejson.version = newversion

fs.writeFileSync("package.json", JSON.stringify(packagejson, null, 2))

console.log("bumped", newversion)

let foo = fs.readFileSync("lib/foo.js").toString()

foo = foo.replace(/export const/g, "const")
foo = foo.replace(/export function/g, "function")
foo = foo.replace(/export class/g, "class")

fs.writeFileSync("lib/fooweb.js", foo)