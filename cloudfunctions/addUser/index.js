// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

let db = cloud.database()

let _ = db.command;


exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  // 读取数据库,查找当前用户是否已经存在
  // 如不存在才可以添加用户
  const {data} = await db.collection('user').where({
    _openid: wxContext.OPENID
  }).get()

  // 如果获取的数据是空,可以添加当前用户数据到数据库中
  if (!data[0]) {
    await db.collection('user').add({
      data: {
        _openid: wxContext.OPENID,
        userInfo: event.user
      }
    })
    return {
      _openid: wxContext.OPENID
    }

  }else{
    // 数据库查到了用户数据
    // 返回此用户的数据信息
    return {
      data,
      msg: '用户已存在'
    }
  }

  
}