import { $ajax, img_url } from '../../common/config.js'
// pages/company/company.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    img_url: '', 
    pageSize:10,
    pageNum:1,
    dataListFlg:true,
    scrollHeight: '0px'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      img_url: img_url
    })
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          scrollHeight: (res.windowHeight) + 'px',
        })
      }
    })
    this.getList()
  },
  getList(){
    $ajax({
      name: 'baseNodeinfo/list',
      params:{
        pageSize: this.data.pageSize,
        pageNum: this.data.pageNum,
      }
    }).then((d) => {
      var arr=this.data.dataList
      arr = [...arr, ...d.aaData]
      this.setData({
        dataList: arr
      }, () => {
        if (arr.length >= d.dataCount) {
          this.setData({
            dataListFlg: false
          })
        }
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  scrolltolower() {
    
  },
  scrollBottom() {

    if (this.data.dataListFlg){
      this.data.pageNum++
      this.getList()
    }
    

  },
  tel(e) {
    console.log(e.currentTarget)
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tel,
    })
  },
  goCompanyDetails(e) {
    wx.navigateTo({
      url: '../company_details/company_details?companyId=' + e.currentTarget.dataset.id
    })
    console.log(e.currentTarget.dataset.id)
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