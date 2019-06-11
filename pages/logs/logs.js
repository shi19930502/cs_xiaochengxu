//logs.js
// const config = require('../../common/config.js')
import config from '../../common/config.js' 
Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return config.formatTime(new Date(log))
      })
    })
  }
})
