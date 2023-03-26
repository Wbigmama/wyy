<template>
  <div class="recommendList">
    <div class="topBar">
      <span>推荐歌单</span>
      <img class="img1" src="@/assets/img/arrow-right.png" alt="">
      <div class="blockBox"></div>
      <img class="img2" src="@/assets/img/more.png" alt="">
    </div>
    <div class="bottomBar">
      <div class="bottom1" v-for="item in props.recommendLi">
        <div class="bottom2" @click="goDetail(item.id)">
          <div class="corner">
            <img src="@/assets/img/play.png" alt="">
            <span>{{ item.playCount }}</span>
          </div>
          <img class="img1" :src="item.pic" alt="">
          <span class="span1">{{ item.name }}</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
// import { defineProps } from 'vue';
import {useRouter} from 'vue-router'

const props = defineProps(['recommendLi'])
const router = useRouter()

const goDetail = (id) => {
  router.push({ name: 'songlistdetail', query: { id: id } })
} 
</script>

<style lang="less" scoped>
@bottomBgc: #f8f9fd;
@MarAuto0: auto 0;

.recommendList {
  padding: 10px 0 10px 5px;
  background-color: @bottomBgc;
  border-bottom: 1PX solid #e7e5e5;

  .topBar {
    // background-color: red;
    height: 40px;
    display: flex;
    justify-content: space-between;

    span {
      font-size: 20px;
      margin: @MarAuto0;
    }

    .img1 {
      width: 18px;
      height: 18px;
      margin: @MarAuto0;
    }

    .blockBox {
      flex: 1;
    }

    .img2 {
      width: 20px;
      height: 20px;
      margin: @MarAuto0;
    }
  }

  .bottomBar {
    display: flex;
    overflow: scroll;

    &::-webkit-scrollbar {
      display: none;
    }

    .bottom1 {
      margin-right: 20px;
      width: 150px;
      height: 190px;

      .bottom2 {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;

        // background-color: red;
        .corner {
          position: absolute;
          top: 5px;
          left: 0;
          width: 140px;
          display: flex;
          justify-content: flex-end;

          img {
            width: 15px;
            height: 15px;
            margin: @MarAuto0;

          }

          span {
            font-size: 15px;
            color: white;
            margin: @MarAuto0;
          }
        }

        .img1 {
          width: 150px;
          border-radius: 10px;

        }

        .span1 {
          font-size: 10px;
          // 超出两行则省略
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden; //溢出内容隐藏
          text-overflow: ellipsis; //文本溢出部分用省略号表示
          display: -webkit-box; //特别显示模式
          -webkit-line-clamp: 2; //行数
          line-clamp: 2;
          -webkit-box-orient: vertical; //盒子中内容竖直排列
        }
      }
    }

  }
}</style>