var async = require('async')
// // async.waterfall([
// //     function(callback) {
// //         callback(null, 'one', 'two');
// //     },
// //     function(arg1, arg2, callback) {
// //         // arg1 now equals 'one' and arg2 now equals 'two'
// //         callback(null, 'three');
// //     },
// //     function(arg1, callback) {
// //         // arg1 now equals 'three'
// //         callback(null, 'done');
// //     }
// // ], function (err, result) {
// //     // result now equals 'done'
// // });

// // // Or, with named functions:
// // async.waterfall([
// //     myFirstFunction,
// //     mySecondFunction,
// //     myLastFunction,
// // ], function (err, result) {
// //     // result now equals 'done'
// //     console.log(result)
// // });
// // function myFirstFunction(callback) {
// //     callback(null, 'one', 'two');
// // }
// // function mySecondFunction(arg1, arg2, callback) {
// //     console.log('2', arg1);
// //     console.log('2', arg2);
// //     // arg1 now equals 'one' and arg2 now equals 'two'
// //     callback(null, 'three');
// // }
// // function myLastFunction(arg1, callback) {
// //     console.log('3', arg1);
// //     // arg1 now equals 'three'
// //     callback(null, 'done');
// // }

// // callback相当于最后function的第二个参数
// // async.series({
// //     one: function(callback) {
// //         setTimeout(function() {
// //             callback(null, 1);
// //         }, 200);
// //     },
// //     two: function(callback){
// //         setTimeout(function() {
// //             callback(null, 2);
// //         }, 100);
// //     }
// // }, function(err, results) {
// //     // results is now equal to: {one: 1, two: 2}
// //     console.log(results);
// // });


// // assuming openFiles is an array of file names and saveFile is a function
// // to save the modified contents of that file:

// // var openFiles = ['acca', 'lsc', 'name', 'acasa']

// // var saveFile = function() {

// // }

// // async.each(openFiles, saveFile, function(err){
// //   // if any of the saves produced an error, err would equal that error
// // });

// // // assuming openFiles is an array of file names
// // async.each(openFiles, function(file, callback) {

// //     // Perform operation on file here.
// //     console.log('Processing file ' + file);

// //     if( file.length > 32 ) {
// //       console.log('This file name is too long');
// //       callback('File name too long');
// //     } else {
// //       // Do work to process file here
// //       console.log('File processed', file.length);
// //       callback();
// //     }
// // }, function(err) {
// //     // if any of the file processing produced an error, err would equal that error
// //     if( err ) {
// //       // One of the iterations produced an error.
// //       // All processing will now stop.
// //       console.log('A file failed to process');
// //     } else {
// //       console.log('All files have been processed successfully');
// //     }
// // });

// // Pretend this is some complicated async factory
// // var createUser = function(id, callback) {
// //     callback(null, {
// //         id: 'user' + id
// //     });
// // };

// // // generate 5 users
// // async.times(5, function(n, next) {
// //     console.log(n);
// //     createUser(n, function(err, user) {
// //         next(err, user);
// //     });
// // }, function(err, users) {
// //     // we should now have 5 users
// //     console.log(users);
// // });

// // var createUser = function(id, callback) {
// //     callback(null, {
// //         id: 'user' + id
// //     })
// // }

// // async.times(5, function(n, next) {
// //     createUser(n, function(err, user) {
// //         next(err, user)
// //     })
// // }, function(err, users) {
// //     console.log(users);
// // })

// // async.reduce([1,2,3], 2, function(memo, item, callback) {
// //     // pointless async:
// //     process.nextTick(function() {
// //         console.log(item);
// //         callback(null, memo + item)
// //     });
// // }, function(err, result) {
// //     // result is now equal to the last value of memo, which is 6
// //     console.log(result);
// // });

var count = 0;
async.whilst(
    function() { return count < 5; },
    function(callback) {
        count++;
        setTimeout(function() {
            callback(null, count);
        }, 1000);
    },
    function (err, n) {
        // 5 seconds have passed, n = 5
        console.log(n);
    }
);