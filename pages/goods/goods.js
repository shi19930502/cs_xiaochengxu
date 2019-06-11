// pages/goods/goods.js
import { $ajax, xw_img_url } from '../../common/config.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[],
    img_url:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      img_url:xw_img_url
    })
    $ajax({
      name: 'chain/query',
      urlStr:'xw',
      params: {
        tranId: '008'
      }
    }).then((d) => {
      for (let a = 0; a < d.saleInfo.length;a++){
        d.saleInfo[a].tshash ? d.saleInfo[a].tshash = d.saleInfo[a].tshash.slice(30,42 ) : d.saleInfo[a].tshash= d.saleInfo[a].tshash
      }
      this.setData({
        dataList: d.saleInfo
      }, () => {
        
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  goGoodsDetails(e){
    wx.navigateTo({
      url: '../goods_details_new/goods_details?tranid=' + e.currentTarget.dataset.tranid,
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