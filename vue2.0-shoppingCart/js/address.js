var vmaddress = new Vue({
  el: ".address",
  data: {
    addressList: [],
    limitNum: 3,
    flag: false,
    curindex: 0,
    shippingMethod: 1,
    curAddress: '',
    delAddressFlag: false
  },
  mounted() {
    this.$nextTick(function () {
      this.getAddress();

    });
  },
  methods: {
    getAddress() {
      // 如果使用../data/address.js chrome无法访问json
      this.$http.get("data/address.json").then(response => {
        let res = response.data;
        this.addressList = res.result;
      });
    },
    changeLimitNum() {
      this.flag = !this.flag;
      if (this.flag) {
        this.limitNum = this.addressList.length;
      } else {
        this.limitNum = 3;
      }
    },
    // 加载全部 废弃
    // loadMore() {
    //   this.limitNum = this.addressList.length;
    // },
    setDefault(index) {
      let temp = 0;
      for (let i = 0; i < this.addressList.length; i++) {
        if (this.addressList[i].isDefault == true) {
          temp = i;
          break;
        }
      }
      this.addressList[temp].isDefault = false;
      // 将选中的变为默认地址
      this.addressList[index].isDefault = true;
      //默认地址调整到最前方
      let temp1 = this.addressList.splice(index, 1);
      //由于返回的是一个数组。因此取出其中的第一个元素来插入
      this.addressList.unshift(temp1[0]);
    },
    delConfirm(item) {
      this.delAddressFlag = true;
      this.curAddress = item;
    },
    //删除地址 如果删除了默认地址，自动将第一个地址标为默认
    delAddress() {
      var index = this.addressList.indexOf(this.curAddress);
      if (this.addressList[index].isDefault == false) {
        this.addressList.splice(index, 1);
      } else {
        this.addressList.splice(index, 1);
        this.addressList[0].isDefault = true;
      }
      this.delAddressFlag = false;
    }
  },
  // 对addressList做一个截取
  computed: {
    filteredAddress() {
      return this.addressList.slice(0, this.limitNum);
    }
  }
});