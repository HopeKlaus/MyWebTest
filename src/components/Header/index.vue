<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="!userName">
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/register"
                         class="register">免费注册</router-link>
          </p>
          <p v-else>
            <a>{{userName}}</a>
            <a class="register"
               @click="logout"
               style="cursor: pointer;">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center">我的订单</router-link>
          <router-link to="/shopCart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo"
                     to="/home">
          <img src="./images/logo.png"
               alt="">
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###"
              class="searchForm">
          <input type="text"
                 id="autocomplete"
                 class="input-error input-xxlarge"
                 v-model="keyword" />
          <button class="sui-btn btn-xlarge btn-danger"
                  type="button"
                  @click="goSearch">搜索</button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      keyword: '',
    }
  },
  methods: {
    // 搜索按钮的回调函数，需要跳转向search路由
    goSearch () {
      // 跳转路由时携带参数
      // 第一种方式 字符串
      // this.$router.push('/search/' + this.keyword + '?k=' + this.keyword);
      // 第二种方式 模板字符串
      // this.$router.push(`/search/${this.keyword}?k=${this.keyword}`);
      // 第三种方式 对象
      // 如果有query参数要把参数带过去
      if (this.$route.query) {
        let location = {
          name: 'search',
          params: { keyword: this.keyword },
        };
        location.query = this.$route.query;
        this.$router.push(location);
      }


      // ***********************************************************************

      // 路由传递参数（对象写法）path是否可以结合params参数一起使用?  程序不能运行，报错
      // this.$router.push({
      //   path: '/search', params: { keyword: this.keyword }, query: {
      //     k: this.keyword.toUpperCase()
      //   }
      // });
      // 如何指定params参数可传可不传? 
      // 当配置路由路径时有关于params参数的占位，但是在传递参数时却没有传递params参数，那么路径就会出现问题
      // this.$router.push({
      //   name: 'search',
      //   // params: {
      //   //   keyword: this.keyword,
      //   // },
      //   query: {
      //     k: this.keyword
      //   }
      // });
      // params参数可以传递也可以不传递，但是如果传递是空串，如何解决？
      // 当传递空字符串时，也会出现路径的问题
      // 此时可以用undefined来解决,路径就不会出现问题
      // this.$router.push({
      //   name: 'search',
      //   params: {
      //     keyword: '' || undefined,
      //   },
      //   query: {
      //     k: this.keyword
      //   }
      // });
    },
    async logout () {
      try {
        await this.$store.dispatch('logout');
        this.$router.push('/home');
      } catch (error) {
        alert(error.message);
      }
    }
  },
  mounted () {
    this.$bus.$on('clear', () => {
      this.keyword = '';
    })
  },
  computed: {
    userName () {
      return this.$store.state.user.userInfo.name;
    }
  }
}
</script>

<style lang="less">
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>