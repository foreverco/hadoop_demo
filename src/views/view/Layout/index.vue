<template>
  <div id="layout">
    <LayoutNav />
    <LayoutMain />
  </div>
</template>

<script>
import LayoutNav from "./components/Nav";
import LayoutMain from "./components/Main";
export default {
  name: "LayoutIndex",
  components: {
    LayoutNav,
    LayoutMain
  },
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("insect/getsevenWeather");
  }
};
</script>
<style lang="scss"></style>
