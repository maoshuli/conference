// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command
let _id;

// 云函数入口函数
exports.main = async (event, context) => {

  // 选择未抽中奖品的所有用户。
  // 不包含 hasGift: true
  let {data} = await db.collection('user').where({
    hasGift: _.nin([true])
  }).get()

  // return {
  //   num: event.num,
  //   datalength: data.length
  // }

  // 设置抽奖人数过多
  if (data.length < event.num){
    return {
      status: -1,
      msg: '抽奖人数过多'
    }
  }


  // 临时保存一个创建出来的数据，从该数组中拿出数字元素，保存到 giftIndex 数组中
  let tempArry = []
  // 保存中奖者在数组中的顺序号
  let giftIndex = []
  // 设置变量，保存中奖者的openid
  let giftOpenid = []

  // 创建一个未中奖用户长度的数组，保存在 tempArry 数组中
  for(let i=0;i<data.length;i++){
    tempArry.push(i)
  }

  // 从 tempArry 拿出数字，保存在 gift 中
  // tempArry 中的数字元素拿出后 在 tempArry 中删除
  // 随机值从 0 到 还剩余的 tempArry 长度
  // 随机次数为指定的中奖人数
  for (let i = 0; i < event.num;i++){
    let temp = Math.floor(Math.random() * tempArry.length)

    // 将 tempArry 中的值保存进 giftIndex 中
    giftIndex.push(tempArry[temp])

    // 在 tempArry 数组中删除掉该数组元素
    tempArry.splice(temp, 1)
  }



  // 取出中奖者的 opneid 存储在中奖列表中
  for (let i = 0; i < giftIndex.length;i++){
    giftOpenid.push(data[giftIndex[i]]['_openid'])
  }

  // 更新用户信息，给中奖用户增加中奖状态
  await db.collection('user').where({
    _openid: _.in(giftOpenid)
  }).update({
    data: {
      hasGift: true
    }
  })

  await db.collection('lottery').add({
    data: {
      // 奖品名称，奖品数量
      name: event.name,
      num: event.num,
      list: giftOpenid
    }
  }).then(res => {
    _id = res._id;
  })

  return {
    _id
  }

}