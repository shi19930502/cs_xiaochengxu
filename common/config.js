const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()  
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const ROOT_API_Q = 'https://blockchain.yshfresh.cn/' //区块链  
const ROOT_API = 'https://blockchainapi.yshfresh.cn/blockchain_info/' //苹果
const ROOT_API_1 = 'https://blockchainapi.yshfresh.cn/' //xw接口 
const ROOT_API_XW = ROOT_API_1 +'blockchain_api/'  //xw
const ROOT_API_Y = ROOT_API + 'api/apple/' //烟台
const img_url = ROOT_API +'img/'//烟台图片
const xw_img_url = ROOT_API_1   //wx接口图片
const nw_img_url = ROOT_API_1 + 'blockchain_info/' //农事记录接口图片
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

var $ajax = function getData({
  urlStr,
  url,
  name,
  params,
  method='POST',
  loading,
} = {}) {
  if (url) {
    url = url + name
  } else {
    if (urlStr) {
      url = ROOT_API_XW + name
      if (urlStr == 'qk') {
        url = ROOT_API_Q + name
      } 
    } else {
      url = ROOT_API_Y + name
    }
  }
  if (!loading) {
    wx.showLoading({
      title: '加载中...',
      mask:true,
    })
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: params,
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      method: method,
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        if (!loading) {
          wx.hideLoading()
        }
        if(res.statusCode==200){
          resolve(res.data)
        }else{
          wx.showToast({
            title: '接口异常！',
            icon: 'none',
            duration: 1500
          })
        }
      },
      fail: function (res) {
        if (!loading) {
          wx.hideLoading()
        }
        wx.showToast({
          title: '接口信息获取失败！',
          icon: 'none',
          duration: 1500
        })
      },
    })
  })
}
module.exports = {
  formatTime: formatTime,
  root_api_q: ROOT_API_Q,
  root_api_y: ROOT_API_Y,
  $ajax: $ajax,
  img_url,
  xw_img_url,
  nw_img_url,
  formatTime
}