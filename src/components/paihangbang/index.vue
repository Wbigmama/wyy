<template>
  <div class="paihangbang">
    <div class="topBar">
      <span class="top-span1">排行榜</span>
      <img class="top-img1" src="@/assets/img/arrow-right.png" alt="">
      <div class="blockBox"></div>
      <img class="top-img2" src="@/assets/img/more.png" alt="">
    </div>
    <div class="bottomScroll">
      <div class="AddBox" v-for="item in props.paihangbangLi">
      <div class="bottomScrollItem" >
        <div class="scrollItemHeader">
          <span class="span1" @click="goPaihangbangDetail(item.id)">{{item.name}}</span>
          <img src="@/assets/img/arrow-right.png" alt="">
          <div class="blockBox"></div>
          <span class="span2">云村用户都在听</span>
        </div>
        <div class="scrollItemFooter" v-for="(miniItem, index) in item.tracks">
          <img :src="item.coverImgUrl" alt="">
          <span class="footerSpan1" :class="{active: index == 0, active2: index==1,active3: index == 2}">{{ index + 1 }}</span>
          <div class="footerCenter">
            <span class="title">{{miniItem.first}}</span>
            <span class="author">{{miniItem.second}}</span>
          </div>
          <span class="footerSpan2">霸榜</span>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import {  reactive, onMounted } from 'vue';
import {useRouter} from 'vue-router'
import {getSongDetailAPI, getSongListDetailAPI} from '@/utils/api/api.js'

const props = defineProps(['paihangbangLi'])

const state = reactive({
})

const router = useRouter()
onMounted(() => {
  getSongListDetailFn()
})


const goPaihangbangDetail = (id) => {
  router.push({name: 'paihangbangdetail', query: {id: id}})
  console.log('传给榜单详情的id', id);
}

const getSongListDetailFn = async (id) => {
  const X = await getSongListDetailAPI(id)
}


</script>

<style lang="less" scoped>
@bottomBgc: #f8f9fd;
@MarAuto0: auto 0;

.paihangbang {
  padding: 10px 0 10px 5px;
  border-bottom: 1PX solid #e7e5e5;
  background-color: @bottomBgc;

  .topBar {
    display: flex;
    height: 40px;
    // background-color: red;

    .top-span1 {
      font-size: 20px;
      margin: @MarAuto0;
    }

    .top-img1 {
      width: 18px;
      height: 18px;
      margin: @MarAuto0;
    }

    .blockBox {
      flex: 1;
    }

    .top-img2 {
      width: 20px;
      height: 20px;
      margin: @MarAuto0;
    }
  }

  .bottomScroll {
    display: flex;
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    .AddBox {
      
    .bottomScrollItem {
      box-shadow: 0 0 5px #a7a8a8;
      border-radius: 10px;
      width: 340px;
      // background-color: green;
      margin: 5px;
      // padding: 10px;
      .scrollItemHeader {
        margin:  0 auto;
        display: flex;
        // background-color: yellow;
        height: 40px;
        width: 320px;
        .span1 {
          font-size: 20px;
          margin: @MarAuto0;
        }

        img {
          width: 18px;
          height: 18px;
          margin: @MarAuto0;
        }

        .blockBox {
          flex: 1;
        }

        .span2 {
          font-size: 10px;
          margin: @MarAuto0;
        }
      }

      .scrollItemFooter {
        display: flex;
        height: 70px;
        // background-color: blue;
        width: 320px;
        margin: 0 auto;
        img {
          width: 60px;
          height: 60px;
          margin: @MarAuto0;
        }

        .footerSpan1 {
          font-size: 15px;
          font-weight: bold;
          width: 30px;
          margin: @MarAuto0;
          text-align: center;
          &.active {
            color: red;
          }
          &.active2 {
            color: gray;
          }
          &.active3 {
            color: orange;
          }
        }

        .footerCenter {
          height: 50px;
          margin: @MarAuto0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .title {
            font-size: 20px;
          }

          .author {
            font-size: 10px;
          }
        }

        .footerSpan2 {
          margin: @MarAuto0;
          font-size: 10px;
        }
      }
    }
  }
  }
}
</style>