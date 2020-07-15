<template>
  <div>
    <HeaderVue></HeaderVue>
    <NavVue></NavVue>
    <MainVue></MainVue>
  </div>
</template>

<script>
import HeaderVue from "./components/Header";
import NavVue from "./components/Nav";
import MainVue from "./components/Main";
export default {
  name: "Mgmtindex",
  components: {
    HeaderVue,
    NavVue,
    MainVue
  }
};
</script>
<style lang="scss"></style>
