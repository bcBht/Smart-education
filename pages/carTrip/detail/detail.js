// pages/carTrip/detail/detail.js
const {
  request
} = require('../../../utils/request');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    busNo: '',
    data: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.busNo = options.busNo
  },

  onShow() {
    this.getSchoolBusDetail();
  },

  getSchoolBusDetail() {
    request({
        url: 'getSchoolBusDetail',
        method: 'POST',
        data: {
          busNo: this.data.busNo
        }
      }).then(data => {
        this.setData({
          data
        })
        console.log(this.data.data);
      })
  },



})