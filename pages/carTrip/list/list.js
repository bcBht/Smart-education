// pages/carTrip/list/list.js
const {
  request
} = require('../../../utils/request');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isit: false,
    areaName: '全部校区', // 所选校区
    timeName: '全部时间', // 所选时间
    lineList: [], // 路线列表
    lineCount: 0, // 当前路线数量
    list: [
      {
        selected:false,
        value:"南山校区(北门)、南山校区(东门)、新校区(西门)",
        key:"南山校区(北门)、南山校区(东门)、新校区(西门)",
      },
      {
        selected:false,
        value:"南山校区(北门)、南山校区(东门)、新校区(西门)",
        key:"南山校区(北门)、南山校区(东门)、新校区(西门)",
      },
      {
        selected:false,
        value:"南山校区(北门)、南山校区(东门)、新校区(西门)",
        key:"南山校区(北门)、南山校区(东门)、新校区(西门)",
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onShow() {
    this.getSchoolBusList();
  },

  // 获取路线列表
  getSchoolBusList() {

    const place = '';
    const time = '';
    request({
        url: 'getSchoolBusList',
        method: 'POST',
        data: {
          place,
          time
        }
      }).then(data => {
        this.setData({
          lineList: data.list,
          lineCount: data.favoriteCount,
        })
      })
      .catch(e => {
        console.log('getSchoolBusList error::', e);
        wx.showToast({
          title: e.message,
          icon: 'none'
        });
      });
  },

  // 收藏事件
  favoriteSchoolBus(busNo, title) {
    request({
        url: 'favoriteSchoolBus',
        method: 'POST',
        data: {
          busNo,
        }
      }).then(() => {
        wx.showToast({
          title,
          icon: 'none'
        });
        this.getSchoolBusList();
      })
      .catch(e => {
        console.log('favoriteSchoolBus error::', e);
        wx.showToast({
          title: e.message,
          icon: 'none'
        });
      });
  },

  // 添加收藏
  addCollect(busNo) {
    this.favoriteSchoolBus(busNo, '已收藏');
  },

  // 取消收藏
  cancelCollect(busNo) {
    wx.showModal({
      title: '是否确认从收藏夹中移除？',
      cancelColor: '#989898',
      confirmColor: '#2C70F8',
      success: (res) => {
        if (res.confirm) this.favoriteSchoolBus(busNo, '已取消');
      }
    })
  },

  // 收藏与取消
  collectHandle(e) {
    const {
      busno: busNo,
      favorite
    } = e.currentTarget.dataset;

    if (favorite === 0) this.addCollect(busNo);
    else this.cancelCollect(busNo);
  },

  // 跳转详情
  goDetail(e) {
    const url = e.currentTarget.dataset.url;

    // wx.
    wx.navigateTo({
      url,
    })
  }
})