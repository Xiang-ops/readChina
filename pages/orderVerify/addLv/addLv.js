// pages/orderVerify/addLv/addLv.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lvInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {index} = options;
    console.log(index);
    let userid;
    if(app.globalData.userInfo.userid){
      userid = app.globalData.userInfo.userid;
    }else{
      userid = 38525052;
    }
    var value = wx.getStorageSync('personArray')
    if(index){
      var lvInfo = value[index];
    }
    this.setData({
      userid:userid,
      index:index,
      personArray:value,
      lvInfo:lvInfo
    })
  },
  submitLvInfo(e){
    console.log("lalala");
    const _this = this;
    let array = e.detail.value;
    var personArray = this.data.personArray;
    var index = this.data.index;
    let userid = this.data.userid;
    if(index == undefined){
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

              }
            }
          })
        }
      }
    }else{
      let offset = personArray[index]['offset'];
      console.log(offset);
      console.log(userid);
      if(userid){
        // console.log(uerid,"userid1");
        wx.request({
          url: 'http://47.104.191.228:8086/rv/edit?userId='+userid,
          method: 'POST',
          header: {
            "Content-type": "application/json"
          },
          data:{
            "phone":array.phone, //,
            "realName":array.realName ,//,
            "rvIdCard": array.rvIdCard, //,
            "status":1,
            "userId":userid,
            "offset": offset,
          },
          success: (res)=>{
            console.log(res);
            console.log("res============>",res);
            if(res.data===1){
              wx.showToast({
                title: '修改成功',
              })
            }
        }
      })
    }
    }  
  },
})