// pages/shopDetails/orderDetails/orderDetails.js
const app = getApp();
var date = new Date();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teamData: ['五人以上团 1180/人', '情侣团 3000/2人', '一大一小亲子团 2780/2人','一家三口亲子团 3780/3人'],
    num:0,
    youthNum:5,
    childNum:0,
    subBtn:false,
    addBtn:true,
    month:'',
    monthArray2:[],
    curMonth:'',
    monthStyle:-7,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var teamViews = teamId.childNodes;
    // console.log(teamViews);
    wx.showLoading({
      title: '加载中',
    })
    const spu_id = options.spu_id;
    this.getSku(spu_id);
    var month = date.getMonth()+1;
    this.setData({
      month:month,
    })
    this.handleChangeMonth(month);
  },
  /**
   * 通过spu_id获取sku商品列表
   * @param {spu_id} e 
   */
  getSku(spu_id){
    const userId = app.globalData.userInfo.userid;
    const _this = this;
    wx.request({
      url: 'http://47.104.191.228:8086/spu/get/spuId/sku',
      method: 'GET',
      header:{
        'content-type': 'application/json'
      },
      data:{
        userId: userId,
        spuId: spu_id,
      },
      success(res){
        console.log("sku商品列表====================>", res);
        _this.setData({
          teamData:res.data
        })
        if(_this.data.teamData.length>0){
          var skuInfo = _this.data.teamData[0];
          console.log(skuInfo);
          wx.setStorage({
            data: skuInfo,
            key: 'skuInfo',
          })
        }
        
        setTimeout(()=>{
          wx.hideLoading();
        },500);
      }
    })
  },
  /**
   * 月份切换
   * @param {month} e 
   */
  handleChangeMonth(e){
    let month;
    if(e.currentTarget){
      month = e.currentTarget.dataset.month;
    }else{
      month = e;
    }
    this.setData({
      curMonth:month,
      monthStyle:-7,
    });
    var weekDay = date.getDay();
    var day = date.getDate();
    var year = date.getFullYear();
    var date1 = new Date(year,month-1,1);
    var weekDay1 = date1.getDay();
    console.log(year,"年的",month,"月是星期",weekDay1);
    let weekArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
    for(let i=0;i<weekDay1;i++){
      weekArray.unshift(" ");
    }
    console.log(weekArray);
    this.setData({
      monthArray2:weekArray,
      weekDay1:weekDay1,
    })
  },
  /**
   * 选择日期
   * @param {index} e 
   */
  chooseDate(e){
    var index = e.currentTarget.dataset.index+1-this.data.weekDay1;
    console.log(index);
    var day = date.getDate();
    if(this.data.curMonth===this.data.month){
      if((index)<day){
        wx.showModal({
          title: '提示',
          content: '不要选择过去的时间',
        })
        return;
      }
    }
      this.setData({
        monthStyle:index,
      })
      var chooseDate = date.getFullYear()+"年"+this.data.curMonth+"月"+index+"日";
      this.setData({
        chooseDate:chooseDate
      })
      console.log("选择的日期是=======>",this.data.chooseDate);
   },
  chooseTeam(e){
    console.log(e);    
    var index = e.currentTarget.dataset.index;
    var skuInfo = this.data.teamData[index];
    console.log(skuInfo);
    wx.setStorage({
      data: skuInfo,
      key: 'skuInfo',
    })
    this.setData({
      num: index
    })

    // if(index==0){
      
    // }
    // if(index==1){
  
    // }
    // if(index==2){
 
    // }
    // if(index==3){
  
    // }
  },
  /**
   * 五人团的时候减人数
   */
  // subPeople(){
  //   // if(youthNum)
  //   console.log(youthNum)
  // },
  /**
   * 跳转到确认订单页面
   */
  goToVerify(){
    if(this.data.teamData.length>0){
      wx.navigateTo({
        url: '../../orderVerify/orderVerify',
      })
    }
    else{
      wx.showModal({
        title: '提示',
        content: '该商品已下架'
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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