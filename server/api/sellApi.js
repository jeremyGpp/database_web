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
router.post('/addSell', (req, res) => {
  const sql = $sql.sell.add
  const params = req.body
  console.log('添加', params)
  console.log(1)
  conn.query(sql, [params.bno,params.vno, params.cno, params.samount, params.sprice, params.stime], function (err, result) {
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
router.get('/getSellList', (req, res) => {
  const sql = $sql.sell.select
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
router.post('/selectSellList', (req, res) => {
  var sql = $sql.sell.select
  const params = req.body
  sql += " where vno like " +"'%"+params.input+
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

router.post('/selectSellPrice', (req, res) => {
  var sql = $sql.sell.selectPrice
  const params = req.body
  console.log(params)
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

router.post('/deleteSell', (req, res) => {
  const sql = $sql.sell.delete
  const params = req.body
  console.log('删除', req.body)
  console.log(sql)
  conn.query(sql, params.bno, function (err, result) {
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