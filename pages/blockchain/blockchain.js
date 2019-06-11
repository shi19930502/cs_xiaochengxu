// pages/blockchain/blockchain.js
import { $ajax, img_url } from '../../common/config.js'
var setInter=''
Page({
  /**
   * 页面的初始数据 
   */
  data: {
    dataList:[],
    nodeCount:'暂无数据',//节点数
    blockHeight:'暂无数据',//高度
    transactionCount:'暂无数据',//交易总数
    transactionsTodayCount:'暂无数据',//今日交易总数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.blockList();
    this.nodeCount();
    this.blockHeight();
    this.transactionCount();
    this.transactionsTodayCount();
    
    setInter= setInterval(()=>{
      this.blockList();
      this.nodeCount();
      this.blockHeight();
      this.transactionCount();
      this.transactionsTodayCount();
    },20000)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  nodeCount() {
    $ajax({
      name: 'nodeCount',
      urlStr: 'qk',
      method: 'GET',
    }).then((d) => {
      this.setData({
        nodeCount: d.data
      })
    })
  },
  blockHeight() {
    $ajax({
      name: 'blockHeight',
      urlStr: 'qk',
      method: 'GET',
    }).then((d) => {
      this.setData({
        blockHeight: d.data
      })
    })
  },
  transactionCount() {
    $ajax({
      name: 'transactionCount',
      urlStr: 'qk',
      method: 'GET',
    }).then((d) => {
      this.setData({
        transactionCount: d.data
      })
    })
  },
  transactionsTodayCount() {
    $ajax({
      name: 'transactionsTodayCount',
      urlStr: 'qk',
      method: 'GET',
    }).then((d) => {
      this.setData({
        transactionsTodayCount: d.data
      })
    })
  },
  blockList() {
    $ajax({
      name: 'blockList',
      urlStr: 'qk',
      method: 'GET',
    }).then((d) => {
      this.setData({
        dataList: d.data
      })
    })
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
    clearInterval(setInter)
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