<template>
  <div id="mainContent">
    <div class="content">
      <!-- <Title titleTxt="地区虫情预警"></Title> -->
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "mainContent",
  data() {
    return {};
  }
};
</script>
<style lang="scss">
#mainContent {
  // height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
    border: 1px solid red;
    width: 100%;
    // height: 97%;
    // border: 1px solid red;
    box-sizing: border-box;
  }
}
</style>
