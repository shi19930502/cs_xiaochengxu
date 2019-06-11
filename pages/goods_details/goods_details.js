// pages/goods_details/goods_details.js
import { $ajax, xw_img_url } from '../../common/config.js'
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
    navNum: '1',
    farmNum: '1',
    img_url: xw_img_url,
    nav_top: 0,
    top_1: 0,
    top_2: 0,
    top_3: 0,
    top_4: 0,
    navId: 'base_information',
    scrollHeight: '0px',
    scrollTop: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // if (options.tranid) {
    $ajax({
      name: 'chain/query',
      urlStr: 'xw',
      params: {
        tranId: options.tranid || '39060000004220000001'
      }
    }).then((d) => {
      for (let a = 0; a < d.ltxx.length; a++) {
        d.ltxx[a].month = d.ltxx[a].indate.split('-')[1] + '-' + d.ltxx[a].indate.split('-')[2]
        d.ltxx[a].year = d.ltxx[a].indate.split('-')[0]
      }
      this.setData({
        base: d.base,
        farmListObj: this.getnwArr(d.farmList),
        ltxx: d.ltxx.reverse(),
        nodeInfo: d.nodeInfo,
        queListObj: d.queList[0],
        dataFlg: true,
      }, () => {
        this.setData({
          farmList: this.data.farmListObj.arr_1
        }, () => {
          this.countTop()
        })
      })

    })
    // }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var query = wx.createSelectorQuery();
    var navHeight = 0
    query.select('#nav_list').boundingClientRect((res) => {
      navHeight = res.height
    })
    query.select('#goods_details').boundingClientRect((res) => {
      console.log(res)
      this.setData({
        scrollHeight: (res.height - navHeight) + 'px',
      })
    })
    query.exec()
  },
  // 农事记录
  farmThr(e) {
    const query = wx.createSelectorQuery()
    if (e.currentTarget.dataset.num == 1) {
      this.setData({
        farmList: this.data.farmListObj.arr_1
      }, () => {
        query.select('#farm').boundingClientRect((res) => {
          this.setData({
            top_3: this.data.top_2 + res.height,
          })
        })
        query.select('#ltxx').boundingClientRect((res) => {
          this.setData({
            top_4: this.data.top_3 + res.height,
          })
        })
        query.exec()
      })
    } else if (e.currentTarget.dataset.num == 2) {
      this.setData({
        farmList: this.data.farmListObj.arr_2
      }, () => {
        query.select('#farm').boundingClientRect((res) => {
          this.setData({
            top_3: this.data.top_2 + res.height,
          })
        })
        query.select('#ltxx').boundingClientRect((res) => {
          this.setData({
            top_4: this.data.top_3 + res.height,
          })
        })
        query.exec()
      })
    } else {
      this.setData({
        farmList: this.data.farmListObj.arr_3
      }, () => {
        query.select('#farm').boundingClientRect((res) => {
          this.setData({
            top_3: this.data.top_2 + res.height,
          })
        })
        query.select('#ltxx').boundingClientRect((res) => {
          this.setData({
            top_4: this.data.top_3 + res.height,
          })
        })
        query.exec()
      })
    }
    this.setData({
      farmNum: e.currentTarget.dataset.num
    })
  },
  countTop() {
    const query = wx.createSelectorQuery()
    query.select('#nav_list').boundingClientRect((res) => {
      this.setData({
        nav_top: res.height
      })
    })
    query.select('#base_information').boundingClientRect((res) => {
      this.setData({
        top_1: res.top - this.data.nav_top
      })
    })
    query.select('#farm').boundingClientRect((res) => {
      this.setData({
        top_2: res.top - this.data.nav_top
      })

    })
    query.select('#ltxx').boundingClientRect((res) => {
      this.setData({
        top_3: res.top - this.data.nav_top,
      })

    })
    query.select('#csxx').boundingClientRect((res) => {
      this.setData({
        top_4: res.top - this.data.nav_top,
      })

    })
    query.exec()
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
  //导航
  navClick(e) {
    this.setData({
      navNum: e.currentTarget.dataset.num
    })

    if (this.data.navNum == 1) {
      // wx.pageScrollTo({
      //   scrollTop: 0,
      //   duration: 200
      // })
      this.setData({
        navId: 'base_information'
      })
    } else if (this.data.navNum == 2) {
      // wx.pageScrollTo({
      //   scrollTop: this.data.top_2,
      //   duration: 200
      // })
      this.setData({
        navId: 'farm'
      })
    } else if (this.data.navNum == 3) {
      // wx.pageScrollTo({
      //   scrollTop: this.data.top_3,
      //   duration: 200
      // })
      this.setData({
        navId: 'ltxx'
      })
    } else if (this.data.navNum == 4) {
      // wx.pageScrollTo({
      //   scrollTop: this.data.top_4,
      //   duration: 200
      // })
      this.setData({
        navId: 'csxx'
      })
    }
  },
  scroll(e) {
    //这个效果实现不理想
    if (this.data.dataFlg) {
      if (e.detail.scrollTop >= this.data.top_2 - 1 && e.detail.scrollTop < this.data.top_3 - 1) {
        this.setData({
          navNum: 2
        })
      } else if (e.detail.scrollTop >= this.data.top_3 - 1 && e.detail.scrollTop < this.data.top_4 - 20) {
        this.setData({
          navNum: 3
        })
      } else if (e.detail.scrollTop >= this.data.top_4 - 20) {
        this.setData({
          navNum: 4
        })
      } else {
        this.setData({
          navNum: 1
        })
      }
    }
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