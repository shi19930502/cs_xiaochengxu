// pages/company_details/company_details.js
import { $ajax, img_url } from '../../common/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyId: '',
    companyList: {},
    mapHeight:'444px',
    longitude:'',
    latitude:'',
    markers:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // if (options.companyId) {
      this.setData({
        companyId: options.companyId
      })
      $ajax({
        name: 'baseNodeinfo/list',
        params: {
          companyId: this.data.companyId || 370600000
        }
      }).then((d) => {
        this.setData({
          companyList: d.aaData[0],
          longitude: d.aaData[0].gisX,
          latitude: parseFloat(d.aaData[0].gisY),
          markers:[{
            iconPath: '../../img/icon_dingwei.png',
            id: 0,
            latitude: d.aaData[0].gisY,
            longitude: d.aaData[0].gisX,
            callout:{
              content: d.aaData[0].conpanyName,
              color:'#000000',
              bgColor:'#FFFFFF',
              padding:4,
              display:'ALWAYS'
            }, 
            // label:{
            //   content: d.aaData[0].conpanyName, 
            //   color: '#000000',
            //   bgColor: '#FFFFFF'
            // },
            width: 14,
            height: 20
          }]
        }, () => {
          // console.log(132)
          // const query = wx.createSelectorQuery()
          // query.select('#content').boundingClientRect((res) => {
          //   console.log(res)
          //   this.setData({
          //     // mapHeight: (res.height+123)+'px',
          //     longitude: d.aaData[0].gisX,
          //     latitude: parseFloat(d.aaData[0].gisY)
          //   })
          //   console.log(this.data.mapHeight)
          // })
          // query.exec()
        })
      })
    // }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  tel(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tel,
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