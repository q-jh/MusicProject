<template>
  <div class="Nav">
    <div class="nav_icon">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-hanbaobao"></use>
      </svg>
    </div>
    <div class="nav_text">
      <span @click="$router.push('/infouser')">我的</span>
      <span class="text_item">发现</span>
      <span>云端</span>
      <span>视频</span>
    </div>
    <div class="nav_right">
      <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopNav",
};
</script>

<style lang="less" scoped>
.Nav{
    width:100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:0.6rem
}
.nav_text{
    span{
        margin: .04rem .5rem;
        font-size: 1.2rem;
        align-items: center;
    }
    .text_item{
        font-weight: 800;
    }
}
</style>