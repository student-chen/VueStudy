var vm = new Vue({
    el: "#app",
    data: {
        checkAll: false,
        totalMoney: 0,
        productList: [],
        delFlag: false,
        curProduct: ''
    },
    filters: {
        formatMoney(value) {
            return "￥" + value.toFixed(2);
        }
    },
    mounted: function () {
        this.cartView();
    },
    methods: {
        cartView: function () {
            // // 这里的两个this都指向vm中
            // let _this = this;
            // this.$http.get("data/cartData.json").then(function (res) {
            //     // 这里再用this就指向function中了。而_this才指向vm
            //     _this.totalMoney = res.data.result.totalMoney;
            //     _this.productList = res.data.result.list;
            // });
            // es6语法：箭头函数相当于指定了作用域。无需再次声明_this
            this.$http.get("data/cartData.json").then(res => {
                // this.totalMoney = res.data.result.totalMoney;
                this.productList = res.data.result.list;
            });
        },
        changeMoney(item, opt) {
            if (opt == 1) {
                item.productQuantity++
            } else {
                item.productQuantity--
            }
            if (item.productQuantity < 1) {
                item.productQuantity = 1;
            }
            this.calcPrice();
        },
        selectProduct(item) {
            if (typeof item.checked == 'undefined') {
                // Vue全局注册checked。往json中添加一个属性checked
                // Vue.set(item, "checked", true);
                this.$set(item, "checked", true);
            } else {
                item.checked = !item.checked;
            }
            this.calcPrice();
        },
        checkAllFun() {
            this.checkAll = true;
            if (this.checkAll) {
                this.productList.forEach((item, index) => {
                    if (typeof item.checked == 'undefined') {
                        this.$set(item, "checked", true);
                    } else {
                        item.checked = true;
                    }

                });
            }
            this.calcPrice();
        },
        deleteAllFun() {
            this.checkAll = false;
            if (!this.checkAll) {
                this.productList.forEach((item, index) => {
                    if (typeof item.checked == 'undefined') {
                        this.$set(item, "checked", false);
                    } else {
                        item.checked = false;
                    }

                });
            }
            this.calcPrice();
        },
        calcPrice() {
            this.totalMoney = 0;
            this.productList.forEach((item, index) => {
                if (item.checked) {
                    this.totalMoney += item.productQuantity * item.productPrice;
                }
            });
        },
        delConfirm(item) {
            this.delFlag = true;
            this.curProduct = item;

        },
        delProduct() {
            var index = this.productList.indexOf(this.curProduct);
            this.productList.splice(index, 1);
            this.delFlag = false;
        }
    }
});
// 全局过滤器 filter
Vue.filter("money", function (value, type) {
    return "￥" + value.toFixed(2) + type;
});