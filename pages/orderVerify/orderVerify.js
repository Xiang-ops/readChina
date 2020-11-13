// pages/orderVerify/orderVerify.js
const app = getApp();     // 取得全局App
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personArray:[],
    disable:-1,
    userid:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let userid = app.globalData.userInfo.userid
    let userid = 38525052;
    this.setData({
      userid:userid
    })
    this.getLvInfo(this.data.userid).then((res)=>{
      console.log(res);
      this.setData({
        personArray:res.data
      })
    });
    const peopleNum = 2;
    let peopleArray = [];
    let people = {
      // name:"",
      // card:"",
      // phone:""
    };
    for(let i=0;i<peopleNum;i++){
      peopleArray.push(people);
    }
    this.setData({
      personArray:peopleArray
    })
  },
  /**
   * 编辑
   * @param {index} userid 
   */
  edit(e){
    this.setData({
      disable:e.currentTarget.dataset.index
    })
  },
  /**
   * 获取旅客信息
   * @param {index} e 
   */

  getLvInfo(userid){
    console.log(userid);
    return new Promise(function(resolve,reject){
      wx.request({
        url: 'http://47.104.191.228:8086/rv/get?userId='+userid,
        method: 'GET',
        header: {
          "Content-type": "application/json"
        },
        success:(res)=>{
          resolve(res);
        }
      })
    })
    console.log("userid=====================>",userid);
    
  },
  /**
   * 提交旅客信息
   * @param {index} e 
   */
  submitLvInfo(e){
    console.log(e);
    let array = e.detail.value;
    if(app.globalData.userInfo){
      // let userid = app.globalData.userInfo.userid;
      let userid = this.data.userid;//12345678991  430781199812120524
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
            }
          }
        })
      }
    }
   
  },
  
  /**
   * 更新旅客信息
   */
  updateInfo(e){
    let array = e.detail.value;
    if(app.globalData.userInfo){
      // let userid = app.globalData.userInfo.userid;
      let userid = 38525052;//12345678991  430781199812120524
      if(userid){
        wx.request({
          url: 'http://47.104.191.228:8086/rv/edit?userId='+userid,
          method: 'POST',
          header: {
            "Content-type": "application/json"
          },
          data:{
            "phone":"15273810596", //,array.phone
            "realName":"向璇" ,//,array.realName
            "rvIdCard": "43132120001207576X", //,array.rvIdCard
            "status":1,
            "userId":userid
          },
          success: (res)=>{
            console.log(res);
            // if(res.data===1){
            //   wx.showToast({
            //     title: '创建成功',
            //   })
            // }
          }
        })
      }
    }
  }
})