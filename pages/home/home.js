// pages/home/home.js
import {
  getMultiData,
  getProduct
} from '../../service/home.js'

import {
  POP,
  SELL,
  NEW,
  BACK_TOP_POSITION
} from '../../common/const.js'

Page({
  data: {
    banners: [],
    recommends:[],
    titles: ["流行", "新款", "精选"],
    goods: {
      [POP]: { page: 1, list: [] },
      [NEW]: { page: 1, list: [] },
      [SELL]: { page: 1, list: [] },
    },
    currentType: 'pop',
    topPosition: 0,
    tabControlTop: 0,
    showBackTop: false,
    showTabControl: false
  },
  onLoad: function (options) {
    // 1.发送网络请求
    this._getData()
  },
  // onReachBottom: function() {
  //   this._getProductData(this.data.currentType)
  // },
  loadMore() {
    this._getProductData(this.data.currentType);
  },
  scrollPosition(e) {
    // 1.获取滚动的顶部
    const position = e.detail.scrollTop;

    // 2.设置是否显示
    this.setData({
      showBackTop: position > BACK_TOP_POSITION,
    })

    wx.createSelectorQuery().select('.tab-control').boundingClientRect((rect) => {
      const show = rect.top > 0
      this.setData({
        showTabControl: !show
      })
    }).exec()
  },
  onImageLoad() {
    wx.createSelectorQuery().select('.tab-control').boundingClientRect((rect) => {
      this.setData({
        tabControlTop: rect.top
      })
    }).exec()
  },
  onPageScroll(res) {
  },
  tabClick(e) {
    // 1.根据当前的点击赋值最新的currentType
    let currentType = ''
    switch(e.detail.index) {
      case 0:
        currentType = POP
        break
      case 1:
        currentType = NEW
        break
      case 2:
        currentType = SELL
        break
    }
    this.setData({
      currentType: currentType
    })
    console.log(this.selectComponent('.tab-control'));
    this.selectComponent('.tab-control').setCurrentIndex(e.detail.index)
    this.selectComponent('.tab-control-temp').setCurrentIndex(e.detail.index)
  },

  onBackTop() {
    // wx.pageScrollTo({
    //   scrollTop: 0,
    //   duration: 0
    // })
    this.setData({
      showBackTop: false,
      topPosition: 0,
      tabControlTop: 0
    })
  },

  // 网络请求相关方法
  _getData() {
    this._getMultiData(); // 获取上面的数据
    this._getProductData(POP);
    this._getProductData(NEW);
    this._getProductData(SELL);
  },
  _getMultiData() {
    getMultiData().then(res => {
      // 1.取出轮播所有的数据
      const banners = res.data.banner.list.map(item => {
        return item.image
      })

      // 2.设置数据
      this.setData({
        banners: banners,
        recommends: res.data.recommend.list
      })
    })
  },
  _getProductData(type) {
    // 1.获取数据对应的页码
    const page = this.data.goods[type].page;

    // 2.请求数据
    getProduct(type, page).then(res => {
      // 1.取出数据
      const list = res.data.list;

      // 2.将数据临时获取
      const goods = this.data.goods;
      goods[type].list.push(...list)
      goods[type].page += 1;

      // 3.最新的goods设置到goods中
      this.setData({
        goods: goods
      })
    })
  }
})