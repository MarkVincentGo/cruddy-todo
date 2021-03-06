const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

var counter = 0;

// Private helper functions ////////////////////////////////////////////////////



// Your first goal is to save the current state of the counter to the hard drive, so it's persisted between server restarts. Do this by rewriting getNextUniqueId to make use of the provided readCounter and writeCounter functions.



// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
};

const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////

exports.getNextUniqueId = (callback) => {
  //fs.writeFile(exports.counterFile, data, err);

  //read current counter
  readCounter((err, count)=>{
    //if it does not exist, function will return zero
    //use writeCounter to create counterFile and increment zero +1
    //else if it does exist, it will return the current count
    //use writeCounter to increment current count +1

    //NOTE: the above comments have been implemented successfully.
    count++;
    writeCounter(count, (err, string) => {
      callback(null, string);
    });
  });

};



// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');
