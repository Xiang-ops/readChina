// pages/orderVerify/addLv/addLv.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userid;
    if(app.globalData.userInfo){
      userid = app.globalData.userInfo.userid;
    }else{
      userid = 38525052;
    }
    this.setData({
      userid:userid
    })
  },
  submitLvInfo(e){
    console.log(e.detail.value);
    const _this = this;
    let array = e.detail.value;
    let personArray = [];
    try {
      var value = wx.getStorageSync('personArray')
      if (value) {
        // Do something with return value
        console.log(value);
        personArray = value;
        let idCardFlag = personArray.some((item,index)=>{
          return item.rvIdCard==array.rvIdCard;
        })
        if(idCardFlag){
          wx.showModal({
            title: '提示',
            content: '已存在该旅客，不可重复创建'
          })
        }else{
          // console.log("test");
          let userid = _this.data.userid;//
          if(userid){
            wx.request({
              url: 'http://47.104.191.228:8086/rv/create?userId='+userid,
              method: 'POST',
              header: {
                "Content-type": "application/json"
              },
              data:{
                "phone":array.phone, //,
                "realName":array.realName ,//,
                "rvIdCard": array.rvIdCard, //,
                "status":1,
                "userId":userid
              },
              success: (res)=>{
                console.log(res);
                if(res.data===1){
                  wx.showToast({
                    title: '创建成功',
                  })
                  setTimeout(()=>{
                    wx.navigateBack(-1);
                  },1000);
                  // setTimeout(()=>{
                  //   const pages = getCurrentPages()
                  //   //声明一个pages使用getCurrentPages方法
                  //   const perpage = pages[pages.length - 1]
                  //   //声明一个当前页面
                  //   perpage.onLoad() 
                  // },1000);
                  
                  
                }
              }
            })
          }
        }
      }
    } catch (e) {
      // Do something when catch error
      console.log("读取失败",e);
    }
  
  },
})