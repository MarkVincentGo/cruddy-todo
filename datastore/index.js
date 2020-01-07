const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId((err, id) => {
    if (!err) {
      fs.writeFile(`${path.join(exports.dataDir, id)}.txt`, `${text}`, (err, data) => {
        if (err) {
          // console.log('ERROR: could not write file', `${text}`, `./data/${id}`);
        } else {
          callback(null, {id, text});
        }
      });
    }
  });
};


exports.readAll = (callback) => {
  //directoryArr is the array of files contained in datastore/data
  var directoryArr = fs.readdirSync(exports.dataDir);

  var mapped = [];

  // iterate through because I dont know how to do it with map
  for (var i = 0; i < directoryArr.length; i++) {
    // gives string of array
    var fileName = directoryArr[i].slice(0, 5);
    mapped.push({id: fileName, text: fileName});

  }
  callback(null, mapped);

};


exports.readOne = (id, callback) => {
  fs.readFile(path.join(exports.dataDir, `${id}.txt`), (err, data) => {
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    }
    if (!err) {
      callback(null, { id: id, text: data.toString() });
    }
  });
};








exports.update = (id, text, callback) => {
  // var directoryArr = fs.readdirSync(exports.dataDir);
  // var target;
  // _.each(directoryArr, (todo) => {
  //   if (todo.slice(0, 5) === id) {
  //     target = todo;
  //   }
  // });

  if ((fs.readdirSync(exports.dataDir)).includes(`${id}.txt`)) {
    fs.writeFile(path.join(exports.dataDir, `${id}.txt`), text, (err, data) => {
      if (err) {
        callback(new Error(`No item with id: ${id}`));
      } else {
        callback(null, {id, text});
      }
    });
  } else {
    callback(new Error(`No item with id: ${id}`));
  }



  // var item = items[id];
  // if (!item) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   items[id] = text;
  //   callback(null, { id, text });
  // }
};

exports.delete = (id, callback) => {
  // read the entire array of items
  var idOfItemToDelete;
  var directoryArr = fs.readdirSync(exports.dataDir);
  // loop through the array and compare if the id is equal to the one we are given
  for (var i = 0; i < directoryArr.length; i++) {
    if (directoryArr[i].slice(0, 5) === id) {
      idOfItemToDelete = id;
    }
  }
  // if one is equal, delete the file
  // else continue
  if (idOfItemToDelete) {

    fs.unlink(path.join(exports.dataDir, `${idOfItemToDelete}.txt`), (err, data) => {
      if (err) {
        callback(new Error(`No item with id: ${id}`));
      } else {
        callback();
      }
    });
  } else {
    callback(new Error(`No item with id: ${id}`));
  }


  // var item = items[id];
  // delete items[id];
  // if (!item) {
  //   // report an error if item not found
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback();
  // }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
