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
// 接口：增加信息
router.post('/addLend', (req, res) => {
  const sql = $sql.lr.add
  const params = req.body
  console.log('添加', params)
  console.log(1)
  conn.query(sql, [params.bno, params.vno, params.cno, params.lamount, params.lprice, params.ltime, params.rtime, params.vstate, params.ostate], function (err, result) {
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
router.get('/getLendList', (req, res) => {
  const sql = $sql.lr.select
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
router.post('/selectLendList', (req, res) => {
  var sql = $sql.lr.select
  const params = req.body
  sql += " where bno like " +"'%"+params.input+
         "%' or vno like "+"'%"+params.input+
         "%' or cno like "+"'%"+params.input+"%'"
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

router.post('/getLendPrice', (req, res) => {
  var sql = $sql.lr.selectPrice
  const params = req.body
  console.log(sql)
  conn.query(sql, params.vno,function (err, result) {
    if (err) {
      res.send('-1')
      console.log(err)
    }
    if (result) {
      console.log(result)
      res.send(result)
    }
  })
})

// 接口：修改信息
router.post('/updateLend', (req, res) => {
  const sql = $sql.lr.updateLend
  const params = req.body
  console.log('修改', req.body)
  console.log(sql)
  conn.query(sql, [params.vstate, params.bno], function (err, result) {
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