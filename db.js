var Promise = require('bluebird')
var sqlite3 = require('sqlite3').verbose()
var moment = require('moment')
var db = 
  new sqlite3.Database("msdb.db", function(err){
    if(err){
      console.log(err)
    }
    else {
      console.log("Database opened!")
    } 
  })


function getUser() {
  return new Promise(function(resolve, reject) {
    db.all("SELECT * FROM MS_USER", function(err, rows) {
        if(err){
          reject(err)
        }
        else {
          // setTimeout(function() {
          // }, 5000)
          resolve(rows)
        }
    })
  })
}

function addUser(user) {
  return new Promise(function(resolve, reject) {
    var stmt = db.prepare("INSERT INTO MS_USER (USER_NAME, PASSWORD, PRIVILEGE_LEVEL, TIME_REGISTER) VALUES (?, ?, ?, ?)")
    stmt.run([user.USER_NAME.toString(), user.PASSWORD.toString(), parseInt(user.PRIVILEGE_LEVEL), moment().format('YYYY-MM-DD HH:mm:ss')], function(err) {
      if(err) {
        reject(err)
      }
      else {
        db.all("SELECT * FROM MS_USER", function(err, rows) {
          if(err){
            reject(err)
          }
          else {
            resolve(rows)
          }
        })
      }
    })
  })
}

function updateUser(user) {
  return new Promise(function(resolve, reject) {
    var stmt = db.prepare("UPDATE ms_user SET USER_NAME=?, PASSWORD=?, PRIVILEGE_LEVEL=? WHERE ID=?")
    stmt.run([user.USER_NAME.toString(), user.PASSWORD.toString(), parseInt(user.PRIVILEGE_LEVEL), parseInt(user.ID)], function(err) {
      if(err) {
        reject(err)
      }
      else {
        db.all("SELECT * FROM MS_USER", function(err, rows) {
          if(err){
            reject(err)
          }
          else {
            resolve(rows)
          }
        })
      }
    })
  })
}

function deleteUser(user) {
  return new Promise(function(resolve, reject) {
    var stmt = db.prepare("DELETE FROM ms_user WHERE ID=?")
    stmt.run(parseInt(user.ID), function(err) {
      if(err) {
        reject(err)
      }
      else {
        db.all("SELECT * FROM MS_USER", function(err, rows) {
          if(err){
            reject(err)
          }
          else {
            resolve(rows)
          }
        })
      }
    })
  })
}


function test() {
  return new Promise(function(resolve, reject) {
    resolve()
  })
}

function close() {
  db.close()
}

exports.updateUser = updateUser
exports.test = test
exports.addUser = addUser
exports.getUser = getUser
exports.deleteUser = deleteUser
exports.close = close