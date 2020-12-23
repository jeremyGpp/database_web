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
router.post('/addStock', (req, res) => {
  const sql = $sql.stock.add
  const params = req.body
  console.log('添加', params)
  console.log(1)
  conn.query(sql, [params.vno, params.inamount, params.inprice, params.intime], function (err, result) {
    if (err) {
      console.log(err)
      console.log('1')
    }
    if (result) {
      res.send('1')
    }
  })
})

// 接口：查询全部
router.get('/getStockList', (req, res) => {
  const sql = $sql.stock.select
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
router.post('/selectStockList', (req, res) => {
  var sql = $sql.stock.select
  const params = req.body
  sql += " where vno like " +"'%"+params.input+
         "%' or intime like "+"'%"+params.input+"%'"
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

router.post('/deleteStock', (req, res) => {
  const sql = $sql.stock.delete
  const params = req.body
  console.log('删除', req.body.vno,req.body.intime)
  console.log(sql)
  conn.query(sql, [params.vno, params.intime], function (err, result) {
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