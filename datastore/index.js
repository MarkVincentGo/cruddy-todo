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
          console.log('ERROR: could not write file', `${text}`, `./data/${id}`);
        } else {
          // console.log(id)
          callback(null, {id, text});
          //console.log('SUCCESS', `${text}`, `./data/${id}`);
        }
      });

    }
  //console.log(items);
  });

};




exports.readAll = (callback) => {
  var directoryArr = fs.readdirSync(exports.dataDir);
  // var directoryContents = fs.readFile(path.join(exports.dataDir, directory)

  // var mapped = _.map(directoryArr, (singleElement) => {
  //   var id = singleElement.slice(0, 5);
  //   var text = '';
  //   var readFile = (callback) => {

  //     fs.readFile(path.join(exports.dataDir, singleElement), (err, fileData) => {
  //       if (err) {
  //         callback(null, 'no file found');
  //       } else {
  //         //console.log('callback initiated');
  //         callback(null, fileData.toString());
  //       }
  //     });
  //   };

  //   return ({id: id, text: readFile((err, data) => {
  //     if (!err) {
  //       console.log(data);
  //       return data;
  //     }
  //   })});

  //   // readCount((err, data) => {
  //   //   return
  //   // })

  //   //return ({id: singleElement.slice(0, 5), text: contents.toString()});
  //   // return {{id: '00009', text: 'something'}}

  // });
  // console.log(mapped);
  // callback(null, mapped);

  var mapped = [];
  if (directoryArr.length === 0) {
    callback(null, []);
  } else {
  // iterate through because I dont know how to do it with map
    for (var i = 0; i < directoryArr.length; i++) {
      // gives string of array
      var id = directoryArr[i].slice(0, 5);
      mapped.push({id: id, text: id});
      // fs.readFile(path.join(exports.dataDir, directoryArr[i]), (err, fileData) => {
      //   if (err) {
      //     callback(null, 'no file found');
      //   } else {
      //     mapped.push({id, text: fileData.toString()});
      //     if (mapped.length === directoryArr.length) {
      //       callback(null, mapped);
      //     }
      //   }
      // });
    }
    callback(null, mapped);
  }
  // function readFile(callback) {

  // }
  // console.log(mapped);
  // callback(null, mapped);




  // console.log(directory); =

  // var mapped = (directoryArr, directoryContents)  //returns text: 'something'
  //returns id: '00009'


  //  _.map(list, iteratee, [context]) Alias: collect
  // Produces a new array of values by mapping each value in list through a transformation function (iteratee). The iteratee is passed three arguments: the value, then the index (or key) of the iteration, and finally a reference to the entire list.

  // _.map([1, 2, 3], function(num){ return num * 3; });
  // => [3, 6, 9]


  // ['00009.txt', '00010.txt'];
  // [{id: '00009', text: 'something'}]

  //we might need to use the readFile method to extract the full value
  //of each todo in the array, and return it.


  // fs.readFile


  // var data = _.map(items, (text, id) => {
  //   return { id, text };
  // });
  // callback(null, data);

};

exports.readOne = (id, callback) => {
  var directoryArr = fs.readdirSync(exports.dataDir);
  var target;
  _.each(directoryArr, (todo) => {
    if (todo.slice(0, 5) === id) {
      target = todo;
    }
  });

  if (target === undefined) {
    target = 'something';
  }

  fs.readFile(path.join(exports.dataDir, target), (err, data) => {
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    }
    if (!err) {
      callback(null, { id: target.slice(0, 5), text: data.toString() });
    }
  });

  // var text = items[id];
  // if (!text) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback(null, { id, text });
  // }
};

exports.update = (id, text, callback) => {
  var directoryArr = fs.readdirSync(exports.dataDir);
  var target;
  _.each(directoryArr, (todo) => {
    if (todo.slice(0, 5) === id) {
      target = todo;
    }
  });


  if (target) {

    fs.writeFile(path.join(exports.dataDir, target), text, (err, data) => {
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
