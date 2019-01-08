// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

let db = cloud.database()

let _ = db.command

// 云函数入口函数
// 获取调用用户的信息

/**
 * arg: scope
 * 传入查询范围参数，如果存在参数 scope: 'all'
 * 返回值状态： status: 2
 * 
 * 查询到用户
 * 返回： status: 1
 * 
 * 未查询到用户
 * 返回： status: -1
 * 
 */
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  // 保存用户信息
  let userInfo = null

  // 查询范围，查询所有人，添加参数 {scope: 'all'}
  // 所有用户信息
  // 参数: all
  // 返回所有用户的信息
  if(event.scope == 'all'){
    let {data} = await db.collection('user').get()
    return {
      // 获取到所有的用户信息
      status: 2,
      data,
      msg: '获取到所有用户信息'
    }
  }

  // 读取数据库,找到当前用户 _opneid 的数据
  let {data} = await db.collection('user').where({
    // 云端获取用户 openid 参数
    _openid: wxContext.OPENID
  }).get()

  if(data.length == 0){  // 未获取到用户信息
    return {
      status: -1,
      msg: '未找到用户信息'
    }
  } else {  // 获取到个人用户信息
    return {
      status: 1,
      // 用户信息
      userInfo: data,
      msg: '找到用户信息'
    }
  }
}