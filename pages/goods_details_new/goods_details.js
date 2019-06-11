// pages/goods_details/goods_details.js
import { $ajax, nw_img_url, formatTime } from '../../common/config.js'
// const query = wx.createSelectorQuery()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    dataFlg: false,
    base: {},
    farmList: [],
    farmListObj: {},
    ltxx: [],
    nodeInfo: {},
    queListObj: {},
    img_url: nw_img_url,
    showPopup:false,
    tshash:'',
    goodLtxx:{},
    farmNum:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    $ajax({
      name: 'chain/query',
      urlStr: 'xw',
      params: {
        tranId: options.tranid || '37060001204180000001'
      }
    }).then((d) => {
      for (let a = 0; a < d.ltxx.length; a++) {
        d.ltxx[a].month = d.ltxx[a].indate.split('-')[1] + '-' + d.ltxx[a].indate.split('-')[2]
        d.ltxx[a].year = d.ltxx[a].indate.split('-')[0]
      }
      this.setData({
        base: d.base,
        farmListObj: this.getnwArr(d.farmList),
        tshash: d.ltxx[1]?d.ltxx[1].tshash:'',
        ltxx: d.ltxx.reverse(),
        nodeInfo: d.nodeInfo,
        queListObj: d.queList[0],
        dataFlg: true,
      }, () => {
        
        this.setData({
          farmList: this.data.farmListObj.arr_1
        }, () => {
          
        })
        return this.getLtxx()
      })

    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getLtxx(){
    $ajax({
      name: 'chain/blockInfo',
      urlStr: 'xw',
      params: {
        tshash: this.data.tshash
      }
    }).then((d) => {
      d.hash = this.getStr(d.hash)
      d.parentHash = this.getStr(d.parentHash)
      d.timestamp = formatTime((new Date(d.timestamp * 1000)))
      
      this.setData({
        goodLtxx:d
      })
    })
  },
  getStr(str){
    if(str){
      str = `***${str.slice(15, 37)}***`
    }
    return str||'空'
  },
  closePop(){
    this.setData({
      showPopup: false,
    })
  },
  showPop(){
    this.setData({
      showPopup:true,
    })
  },
  // 农事记录
  farmThr(e) {
    if (e.currentTarget.dataset.num == 1) {
      this.setData({
        farmList: this.data.farmListObj.arr_1,
        farmNum:1,
      }, () => {

      })
    } else if (e.currentTarget.dataset.num == 2) {
      this.setData({
        farmList: this.data.farmListObj.arr_2,
        farmNum: 2
      }, () => {
        
      })
    } else {
      this.setData({
        farmList: this.data.farmListObj.arr_3,
        farmNum: 3
      }, () => {
        
      })
    }
  },
  getnwArr(arr, num) {
    //farmType==4为施肥，farmType==5为用药，其他为田间
    var obj = {
      arr_1: [],//为田间
      arr_2: [], //2为施肥
      arr_3: [],//3为用药
    }
    for (let a = 0; a < arr.length; a++) {
      if (arr[a].farmType == 4) {
        obj.arr_3.push(arr[a])
      } else if (arr[a].farmType == 5) {
        obj.arr_2.push(arr[a])
      } else {
        obj.arr_1.push(arr[a])
      }
    }
    return obj
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})