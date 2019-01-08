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

  // 如果获取的数据是空,表示这个用户不存在数据库中，可以添加当前用户数据到数据库中
  let tempNum
  let num
  if (!data[0]) {
    // 随机抽取一个号码
    // 在数据库的号码中挑选一个,然后删除数据库里的此代码
    let  tempdata  = await db.collection('number').get()

    // 文档 id
    let id = tempdata.data[0]._id


    // 获取奖品号码数组
    tempNum = tempdata.data[0].number
    // 随机取一个号码
    let index = Math.floor(Math.random() * tempNum.length)
    // 返回被删掉的数组
    num = tempNum.splice(index, 1)

    await db.collection('number').doc(id).update({
      data: {
        number: tempNum
      },
      success: res => {
        msg = '更新成功'
      }
    })

    // return {
    //   tempdata,
    //   tempNum,
    //   num,
    //   id,
    //   msg
    // }

    await db.collection('user').add({
      data: {
        _openid: wxContext.OPENID,
        userInfo: event.user,
        // 奖券号
        number: num[0]
      }
    })
    return {
      status: 1,
      // 返回新增用户的openid
      _openid: wxContext.OPENID,
      // 返回用户抽奖号码
      number: num[0]
    }

  }else{  // 查到用户，不操作数据库
    // 数据库查到了用户数据
    // 返回此用户的数据信息
    return {
      data,
      status: -1,
      msg: '用户已存在',
      _openid: wxContext.OPENID
    }
  }

  
}