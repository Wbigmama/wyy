<template>
  <div>
    <routerView></routerView>
    <FootMusic :navBarisShow="state.isShow"></FootMusic>
    <NavBar v-show="state.isShow"></NavBar>
    <!-- barIndex -->
  </div>
  
</template>

<script setup>
import { reactive } from "vue";
import {useRouter} from 'vue-router'
import NavBar from "@/components/bottomNavBar/NavBar.vue";
import FootMusic from "@/components/footPlayMusic/playMusic.vue";

const state = reactive({
  isShow: true,
  // navBarIndex: 0
})
const router = useRouter()
const ArrList = ['home', 'mine', 'login']

router.beforeEach((to, from) => {
  console.log('守卫', to);
  if (ArrList.includes(to.name)) {
    state.isShow = true
    // if(to.name === 'home') {
    //   state.navBarIndex = 1
    // } else if(to.name === 'mine') {
    //   state.navBarIndex = 2
    // }
    // state.navBarIndex = 1
  } else {
    state.isShow = false
    
  }
})




</script>

<style lang="less" >
@import './common/style/mixin';



</style>