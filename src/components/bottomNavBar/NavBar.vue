<template>
  <div class="outside">
    <div class="container">
      <div class="box1">
        <div class="box1-inside" @click="goShouye">
          <img v-if="state.index == 1" class="img" src="@/assets/img/bottomnavbar/shouye.png" alt="">
          <img v-else class="img" src="@/assets/img/bottomnavbar/shouye-normal.png" alt="">


          <span class="span" :class="{ active: state.index == 1 }">首页</span>

        </div>

      </div>
      <div class="box2">
        <div class="box2-inside" @click="goMine">
          <img v-if="state.index == 2" class="img" src="@/assets/img/bottomnavbar/wode.png" alt="">
          <img v-else class="img" src="@/assets/img/bottomnavbar/wode-normal.png" alt="">


          <span class="span" :class="{ active: state.index === 2 }">我的</span>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()

const state = reactive({
  index: ''
})

onMounted(() => {
  // state.index = props.barIndex
  console.log('props', props);
})

router.beforeEach((to) => {
  if (to.name === 'home') {
    state.index = 1
  } else if (to.name === 'mine' || 'login') {
    state.index = 2
  }
})

const props = defineProps(['barIndex'])

const goShouye = () => {
  state.index = 1
  router.replace({ name: 'home' })
}

const goMine = () => {
  state.index = 2
  router.replace({ name: 'mine' })
}

</script>

<style lang="less" scoped>
.outside {
  height: 50px;
.container {
  margin-top: 30px;
  background-color: #f8f9fd;
  position: fixed;
  bottom: 0;
  // background-color: red;

  width: 100%;
  display: flex;
  justify-content: space-around;

  .box1 {


    .box1-inside {
      height: 50px;
      width: 180px;
      // background-color: green;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .img {
        // box-sizing: border-box;
        width: 30px;
        height: 30px;
        margin: 0 auto;

      }

      .span {
        font-size: 10px;
        color: #bdbdbd;
        margin: 0 auto;

        &.active {
          color: #ec4141;
        }
      }
    }

  }

  .box2 {


    .box2-inside {
      height: 50px;
      width: 180px;
      // background-color: green;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .img {
        width: 25px;
        height: 25px;
        margin: 0 auto;
      }

      .span {
        font-size: 10px;
        margin: 0 auto;
        color: #bdbdbd;

        &.active {
          color: #ec4141;
        }
      }
    }

  }
}
}
</style>