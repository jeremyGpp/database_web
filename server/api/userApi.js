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
  sql_name += " where cno = " +"'"+params.username+"'"
  conn.query(sql_name, params.username, function(err, result) {
    if (err) {
      console.log(err)
    }
    if (result[0] === undefined) {
      res.send('-1')
    } else {
      var resultArray = result[0]
      if (resultArray.cpassword === params.password) {
        if(resultArray.cadmin === '1') {
          res.send('2')
        } else {
          console.log(resultArray.cadmin)
          res.send('1')
        }       
      } else {
          res.send('0')
      }
    }
  })
})

// 接口：增加信息
router.post('/addUser', (req, res) => {
  const sql = $sql.user.add
  const params = req.body
  console.log('添加', params)
  conn.query(sql, [params.cno, params.cpassword, params.cname, params.ctel, params.cadmin], function (err, result) {
    if (err) {
      console.log(err)
      res.send('-1')
    }
    if (result) {
      res.send('1')
    }
  })
})

// 接口：查询全部
router.get('/getUserList', (req, res) => {
  const sql = $sql.user.select
  conn.query(sql, function (err, result) {
    if (err) {
      res.send(-1)
      console.log(err)
    }
    if (result) {
      userlist = JSON.stringify(result)
      res.send(userlist)
    }
  })
})

// 接口：查询
router.post('/selectUserList', (req, res) => {
  var sql = $sql.user.select
  const params = req.body
  console.log(params.cno_search)
  sql += " where cno like " +"'%"+params.cno_search+"%'"
  console.log(sql)
  conn.query(sql, function (err, result) {
    if (err) {
      res.send(-1)
      console.log(err)
    }
    if (result) {
      userlist = JSON.stringify(result)
      res.send(userlist)
    }
  })
})

// 接口：编辑
router.post('/editUserList', (req, res) => {
  var sql = $sql.user.select
  const params = req.body
  console.log(params)
  sql += " where cno = " +"'"+params.cno+"'"
  console.log(sql)
  conn.query(sql, function (err, result) {
    if (err) {
      res.send(-1)
      console.log(err)
    }
    if (result) {
      userlist = JSON.stringify(result)
      res.send(userlist)
    }
  })
})

// 接口：删除信息
router.post('/deleteUser', (req, res) => {
  const sql = $sql.user.delete
  const params = req.body
  console.log('删除', req.body)
  console.log(sql)
  conn.query(sql, params.cno, function (err, result) {
    if (err) {
      console.log(err)
      res.send('-1')
    }
    if (result) {
      res.send('1')
    }
  })
})

// 接口：修改信息
router.post('/updateDialog', (req, res) => {
  const sql = $sql.user.updateDialog
  const params = req.body
  console.log('修改', req.body)
  console.log(sql)
  conn.query(sql, [params.cname, params.ctel, params.cno], function (err, result) {
    if (err) {
      console.log(err)
      res.send('-1')
    }
    if (result) {
      res.send('1')
    }
  })
})

router.post('/updateUser', (req, res) => {
  const sql = $sql.user.updateAdmin
  const params = req.body
  console.log('修改', req.body)
  console.log(sql)
  conn.query(sql, [params.cadmin, params.cno], function (err, result) {
    if (err) {
      console.log(err)
      res.send('-1')
    }
    if (result) {
      res.send('1')
    }
  })
})

module.exports = router