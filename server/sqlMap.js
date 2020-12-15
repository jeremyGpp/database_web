// sqlMap.js  sql语句
const sqlMap = {
    user: {
      add: 'insert into user(username, password) values (?,?)',
      select: 'select * from user',
      delete: 'delete from user where username = ?',
      update: 'update user set password=? where username = ?'
    }
}
  
module.exports = sqlMap