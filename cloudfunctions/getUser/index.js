// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

let db = cloud.database()

let _ = db.command

// 云函数入口函数
// 获取调用用户的信息
/**
 * 
 * 如果在数据库找到用户的 _openid
 * return: userInfo
 * 如果数据库中没有此用户的 _openid
 * return: -1
 */
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  // 保存用户信息
  let userInfo = null

  // 查询范围，查询所有人，添加参数 {scope: 'all'}
  if(event.scope == 'all'){
    let {data} = await db.collection('user').get()

    return {
      data,
      msg: '获取所有人信息'
    }

  }


  // 读取数据库,找到当前用户 _opneid 的数据
  let {data} = await db.collection('user').where({
    _openid: wxContext.OPENID
  }).get()

  return {
    data
    // _openid: wxContext.OPENID
  }
}