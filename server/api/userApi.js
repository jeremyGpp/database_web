const models = require('../db')
const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const $sql = require('../sqlMap')
// 连接数据库
const conn = mysql.createConnection(models.mysql)
conn.connect()
const jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json('err')
  } else {
    console.log(ret)
    res.send(ret)
  }
}
// 接口：登陆
router.post('/login', (req, res) => {
  var sql_name = $sql.user.select
  var params = req.body
  console.log(params)
  if (params.username) {
    sql_name += "where username ="+ params.name + "'"
  }
  var keywords = JSON.parse(Object.keys(params)[0])
  conn.query(sql_name, params.username, function(err, result) {
    if (err) {
      console.log(err)
    }
    if (result[0] === undefined) {
      res.send('-1')
    } else {
      var resultArray = result[0]
      console.log(resultArray.password)
      if (resultArray.password === keywords.password) {
        res.send('1')
      } else {
          res.send('0')
      }
    }
  })
})

// 接口：增加信息
router.post('/addStu', (req, res) => {
  const sql = $sql.user.add
  const params = req.body
  console.log('添加', params)
  conn.query(sql, [params.username, params.password], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

// 接口：查询全部
router.get('/show', (req, res) => {
  const sql = $sql.user.select
  const params = req.body
  console.log(params)
  conn.query(sql, [params.username, params.password], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

// 接口：删除信息
router.post('/delStu', (req, res) => {
  const sql = $sql.Stu.del
  const params = req.body
  console.log('删除', params)
  conn.query(sql, [params.username], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

// 接口：修改信息
router.post('/updateStu', (req, res) => {
  const sql = $sql.Stu.update
  const params = req.body
  console.log('修改', params)
  conn.query(sql, [params.username, params.password], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

module.exports = router