<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header';
import Footer from './components/Footer';
export default {
  name: 'App',
  components: { Header, Footer },
  mounted () {
    // 在根组件这里发起获取商品分类三级列表的请求，因为根组件在程序只会加载一次，避免了在切换路由时每次都发请求，优化了性能
    // 组件挂载完毕，通过vuex向服务器发送请求，获取数据存储到仓库中
    this.$store.dispatch('categoryList');
  }
}
</script>

<style>
</style>
