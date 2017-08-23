let Promise = require('bluebird')
let sqlite3 = require('sqlite3').verbose()
let moment = require('moment')
let db =
  new sqlite3.Database("msdb.db", function (err) {
    err ? console.log(err) : console.log("Database opened!")
  })


function userGet() {
  return new Promise(function (resolve, reject) {
    db.all("SELECT * FROM MS_USER", function (err, rows) {
      err ? reject(err) : resolve(rows)
    })
  })
}

function userAdd(user) {
  return new Promise(function (resolve, reject) {
    let stmt = db.prepare("INSERT INTO MS_USER (USER_NAME, PASSWORD, PRIVILEGE_LEVEL, TIME_REGISTER) VALUES (?, ?, ?, ?)")
    stmt.run([user.USER_NAME.toString(), user.PASSWORD.toString(), parseInt(user.PRIVILEGE_LEVEL), moment().format('YYYY-MM-DD HH:mm:ss')], function (err) {
      err ? reject(err) :
        db.all("SELECT * FROM MS_USER", function (err, rows) {
          err ? reject(err) : resolve(rows)
        })
    })
  })
}

function userUpdate(user) {
  return new Promise(function (resolve, reject) {
    let stmt = db.prepare("UPDATE ms_user SET USER_NAME=?, PASSWORD=?, PRIVILEGE_LEVEL=? WHERE ID=?")
    stmt.run([user.USER_NAME.toString(), user.PASSWORD.toString(), parseInt(user.PRIVILEGE_LEVEL), parseInt(user.ID)], function (err) {
      err ? reject(err) :
        db.all("SELECT * FROM MS_USER", function (err, rows) {
          err ? reject(err) : resolve(rows)
        })
    })
  })
}

function userDelete(user) {
  return new Promise(function (resolve, reject) {
    let stmt = db.prepare("DELETE FROM ms_user WHERE ID=?")
    stmt.run(parseInt(user.ID), function (err) {
      err ? reject(err) :
        db.all("SELECT * FROM MS_USER", function (err, rows) {
          err ? reject(err) : resolve(rows)
        })
    })
  })
}


function verTypesGet() {
  return new Promise(function (resolve, reject) {
    db.all("SELECT * FROM MS_VP_TYPE", function (err, rows) {
      err ? reject(err) : resolve(rows)
    })
  })
}

function verParamGet() {
  return new Promise(function (resolve, reject) {
    db.all("SELECT * FROM MS_VP_PARAM", function (err, rows) {
      err ? reject(err) : resolve(rows)
    })
  })
}

function verUnitsGet() {
  return new Promise(function (resolve, reject) {
    db.all("SELECT * FROM MS_VP_UNIT", function (err, rows) {
      err ? reject(err) : resolve(rows)
    })
  })
}

function verParamUpdate(param) {
  return new Promise(function (resolve, reject) {
    let stmt = db.prepare("UPDATE MS_VP_PARAM SET PARAM_NAME=?, PARAM_VALUE=? WHERE ID=?")
    let paramValue = param.PARAM_VALUE
    if(param.PARAM_TYPE !== 0)
      paramValue = parseFloat(paramValue)
    stmt.run([param.PARAM_NAME, paramValue, parseInt(param.ID)], function (err) {
      err ? reject(err) :
        db.all("SELECT * FROM MS_VP_PARAM", function (err, rows) {
          err ? reject(err) : resolve(rows)
        })
    })
  })
}

function verParamAdd(param) {
  return new Promise(function (resolve, reject) {
    let stmt = db.prepare("INSERT INTO MS_VP_PARAM (PARAM_NAME, PARAM_VALUE, PARAM_TYPE, PARAM_PARENT, PARAM_BELONG) VALUES (?, ?, ?, ?, ?)")
    let paramValue = param.PARAM_VALUE
    if(param.PARAM_TYPE !== 0) {
      paramValue = parseFloat(paramValue)
    }
    stmt.run([param.PARAM_NAME, paramValue, parseInt(param.PARAM_TYPE), parseInt(param.PARAM_PARENT), parseInt(param.PARAM_BELONG)], function (err) {
      err ? reject(err) :
        db.all("SELECT * FROM MS_VP_PARAM", function (err, rows) {
          err ? reject(err) : resolve(rows)
        })
    })
  })
}

function verParamDelete(param) {
  return new Promise(function (resolve, reject) {
    let stmt = db.prepare("DELETE FROM MS_VP_PARAM WHERE ID=?")
    stmt.run(parseInt(param.ID), function (err) {
      err ? reject(err) :
        db.all("SELECT * FROM MS_VP_PARAM", function (err, rows) {
          err ? reject(err) : resolve(rows)
        })
    })
  })
}

function close() {
  db.close()
}

exports.userUpdate = userUpdate
exports.userAdd = userAdd
exports.userGet = userGet
exports.userDelete = userDelete

exports.verTypesGet = verTypesGet
exports.verUnitsGet = verUnitsGet
exports.verParamGet = verParamGet
exports.verParamUpdate = verParamUpdate
exports.verParamAdd = verParamAdd
exports.verParamDelete = verParamDelete

exports.close = close