<template>
  <div id="app">
    <router-view></router-view>
    <FooterMusic v-show="$route.meta.show"></FooterMusic>
  </div>
</template>

<script>
import Home from '@/views/Home'
import FooterMusic from '@/components/item/FooterMusic'
export default {
  name: 'App',
  components: {
    Home,
    FooterMusic
  }
}
</script>

<style lang="less">
// 控制全局的样式
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}


.icon {
       width: 1.3rem; height: 1.3rem;
       vertical-align: -0.15em;
       fill: currentColor;
       overflow: hidden;
    }
</style>
