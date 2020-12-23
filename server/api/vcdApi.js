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
router.post('/addInven', (req, res) => {
  const sql = $sql.vcd.add
  const params = req.body
  console.log('添加', params)
  conn.query(sql, [params.vno, params.vname, params.actor, params.vtype, params.price, params.amount], function (err, result) {
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
router.get('/getInvenList', (req, res) => {
  const sql = $sql.vcd.select
  conn.query(sql, function (err, result) {
    if (err) {
      res.send(-1)
      console.log(err)
    }
    if (result) {
      console.log('1')
      userlist = JSON.stringify(result)
      res.send(userlist)
    }
  })
})

// 接口：查询
router.post('/selectInvenList', (req, res) => {
  var sql = $sql.vcd.select
  const params = req.body
  console.log(params.vname)
  sql += " where vno like " +"'%"+params.vname+
         "%' or vname like "+"'%"+params.vname+
         "%' or actor like "+"'%"+params.vname+"%'"
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

// type查询
router.post('/typeInvenList', (req, res) => {
  var sql = $sql.vcd.select
  const params = req.body
  console.log(params.type)
  if (params.type ==='1') {
    vtype = '电影'
  }
  if (params.type ==='0') {
    vtype = '歌曲'
  }
  sql += " where vtype = " +"'"+vtype+"'"
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
router.post('/editVcdList', (req, res) => {
  var sql = $sql.vcd.select
  const params = req.body
  console.log(params)
  sql += " where vno = " +"'"+params.vno+"'"
  console.log(sql)
  conn.query(sql, function (err, result) {
    if (err) {
      res.send('-1')
      console.log(err)
    }
    if (result) {
      vcdlist = JSON.stringify(result)
      res.send(vcdlist)
    }
  })
})

// 接口：删除信息
router.post('/deleteVCD', (req, res) => {
  const sql = $sql.vcd.delete
  const params = req.body
  console.log('删除', req.body)
  console.log(sql)
  conn.query(sql, params.vno, function (err, result) {
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
  const sql = $sql.vcd.updateDialog
  const params = req.body
  console.log('修改', req.body)
  console.log(sql)
  conn.query(sql, [params.vname, params.actor, params.vtype, params.price, params.amount, params.vno], function (err, result) {
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