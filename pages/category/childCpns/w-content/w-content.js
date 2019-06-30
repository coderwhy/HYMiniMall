// pages/category/childCpns/w-content/w-content.js
const types = ['pop', 'new', 'sell']

Component({
  properties: {
    subcategories: {
      type: Array
    },
    categoryDetail: {
      type: Array
    }
  },
  data: {
    currentIndex: 0,
  },
  observers: {
    // categoryDetail: function (newValue) {
    //   console.log(newValue)
    // }
  },
  lifetimes: {
    ready() {
      // console.log(this.properties.categoryDetail)
    }
  },
  methods: {
    tabClick(e) {
      console.log(this.properties.categoryDetail)
      // // 1.获取当前的点击
      // const currentIndex = e.detail.index;

      // // 2.获取当前的type
      // let currentType = types[currentIndex]

      // // 3.改变data中的数据
      // this.setData({
      //   currentIndex,
      //   currentType
      // })
    }
  }
})
