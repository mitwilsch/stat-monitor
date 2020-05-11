const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");
const app = express();
const port = process.env.PORT || 8080;
const util = require("util");
const exec = util.promisify(require("child_process").exec);

const getList = async () => {
  //gets files list, writes to db
  const command = "find ~/Documents/ -type f ";
  try {
    const { stdout, stderr } = await exec(command);
    const list = stdout.split("\n");
    const tempList = [];
    list.forEach((item) => {
      if (item == "" || item == "''") {
        return;
      }
      tempList.push({ file: `'${item}'` });
    });
    return tempList;
  } catch (err) {
    console.log(err);
  }
};

const md5sum = async (file) => {
  // this has problems with the filename.
  // either it fails on spaces and punctuation in the filename
  // or else it returns undefined
  // this might be an async error? returning values before shell script returns?

  const command = "md5sum " + file;

  try {
    const { stdout, stderr } = await exec(command);
    const value = stdout.split("  ");
    return value[0];
  } catch (err) {
    console.log(err);
  }
};

const writeHashes = async (list) => {
  for (let i = 0; i < list.length; i++) {
    const hash = await md5sum(list[i].file);

    list[i].hash = hash;
  }

  db.setState({ list });
  db.write();
  console.log("list written");
};

const sanitize = () => {
  const list = db.get("list").value();
  list.map((item, index) => {
    console.log(item);
  });
};
//getList();
//writeHashes();

const findDupes = () => {
  const list = db.get("list").value();
  const dupes = [];

  const hashes = list.map((item) => {
    return item.hash;
  });

  //console.log(hashes);
  //console.log(list);
  //console.log(isDupe);
  const uniq = [...new Set(hashes)];
  //console.log(uniq);
  Array.prototype.diff = function(a) {
    return this.filter(function(i) {
      return a.indexOf(i) < 0;
    });
  };

  for (let i = 0; i < uniq.length; i++) {
    if (uniq[i] != hashes[i]) {
      console.log(list[i], i);
      return;
    }
  }
};
findDupes();
//getList().then((list) => writeHashes(list));
