// sqlMap.js  sql语句
const sqlMap = {
    user: {
      add: 'insert into user(cno, cpassword, cname, ctel, cadmin) values (?,?,?,?,?)',
      select: 'select * from user',
      delete: 'delete from user where cno = ?',
      updateAdmin: 'update user set cadmin = ? where cno = ?',
      updateDialog: 'update user set cname = ? , ctel = ? where cno = ?'
    },
    vcd: {
      add: 'insert into vcd(vno, vname, actor, vtype, price, amount) values (?,?,?,?,?,?)',
      select: 'select * from vcd',
      delete: 'delete from vcd where vno = ?',
      update: 'update vcd set cpassword = ? where vno = ?',
      updateDialog: 'update vcd set vname = ?, actor = ?, vtype = ?, price = ?, amount = ? where vno = ?'
    },
    lr: {
      add: 'insert into lr(bno, vno, cno, lamount, lprice, ltime, rtime, vstate, ostate) values (?,?,?,?,?,?,?,?,?)',
      select: 'select * from lr',
      selectPrice: 'select * from vcd where vno = ?',
      updateLend: 'update lr set vstate = ? where bno = ?'
    },
    sell: {
      add: 'insert into sell(bno, vno, cno, samount, sprice, stime) values (?,?,?,?,?,?)',
      select: 'select * from sell',
      selectPrice: 'select * from vcd where vno = ?',
      delete: 'delete from sell where bno = ?'
    },

    stock: {
      add: 'insert into stock(vno, inamount, inprice, intime) values (?,?,?,?)',
      select: 'select * from stock',
      delete: 'delete from stock where vno = ? and intime = ?'
    }
}
  
module.exports = sqlMap