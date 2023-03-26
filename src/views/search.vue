<template>
  <div class="bottomColor">
    <div class="topSearch">
      <img class="leftImg" @click="goBack" src="@/assets/img/back-searcg.png" alt="">
      <div class="centerBox">
        <!-- <img class="center-leftImg" src="@/assets/img/shouye-top/search.png" alt=""> -->
        <!-- <div class="span"> -->
        <van-field class="span" v-model.trim="state.value" placeholder="请输入搜索内容" @keyup.enter="searchMsg" clearable />
        <!-- </div> -->

      </div>
      <img class="rightImg" @click="searchMsg" src="@/assets/img/shouye-top/search.png" alt="">
    </div>
    <div class="searchHistoryBigBox" v-show="state.searchHistoryList.length > 0">
      <div class="historyActionBar">
        <span>历史记录</span>
        <img @click="deleteSearchHistoryList" src="@/assets/img/delete.png" alt="">
      </div>
      <div class="searchHistory">

        <div class="spanBox" @click="updateValueToInput(item)" v-for="item in state.searchHistoryList" :key="item">
          <span>{{ item }}</span>
        </div>


      </div>
    </div>
    <div class="searchJieguo" v-if="state.searchJieguoList.length > 0">
      <div class="top">
        <span>单曲</span>
      </div>
      <div class="box" v-for="(item,index) in state.searchJieguoList" :key="item.id" @click="gotoPlayMusic(item, index)">
        <div class="leftBox">
          <span class="title">{{ item.name }}</span>
          <span class="singer">{{ item.singer }}</span>
        </div>
        <img v-if="item.musicMv" class="img1" src="@/assets/img/songlistdetail/Youtube.png" alt="">
        <div v-else class="img1"></div>
        <img class="img2" src="@/assets/img/songlistdetail/more-bf.png" alt="">
      </div>
    </div>
  </div>
</template>

<script setup>
import { searchMusicAPI } from '@/utils/api/api.js'
import { reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import {usePlayMusicStore, playingListStore} from '@/stores/playMusic.js'
const router = useRouter()
const usePlayMusic = usePlayMusicStore()
const playingList = playingListStore()
const state = reactive({
  value: '',
  searchHistoryList: [],
  searchJieguoList: []
})

// watch(() => state.value,() => {

// })
// const searchMusicAPIFn = async (value) => {
//   const res = await searchMusicAPI(value)
//   console.log('搜索结果', res);
  
//   // playingList.updateCurrentMusicList(Arr)
// }

const gotoPlayMusic = (item, index) => {
  usePlayMusic.itemIndex = index
  playingList.updateCurrentMusicList(state.searchJieguoList)
  usePlayMusic.musicId = playingList.currentMusicList[index].id
  usePlayMusic.musicName = playingList.currentMusicList[index].name
  // usePlayMusic.musicId = playingList.updateCurrentMusicList[index].musicMv
  usePlayMusic.singer = playingList.currentMusicList[index].singer
  usePlayMusic.musicpicUrl = playingList.currentMusicList[index].picUrl
  
}

const deleteSearchHistoryList = () => {
  state.searchHistoryList = []
}

const goBack = () => {
  router.go(-1)
}
const searchMsg = async () => {
  if (state.value.length > 0) {
    state.searchHistoryList.unshift(state.value)
    const res = await searchMusicAPI(state.value)
    state.value = ''
    console.log('搜索返回', res);
    const Arr = res.data.result.songs.map((item, index) => {
    // console.log('处理中');
    return {
      id: item.id,
      name: item.name,
      musicMv: item.mv,
      singer: item.ar[0].name,
      picUrl: item.al.picUrl
    }
  })
  console.log('整理好的', Arr);
  state.searchJieguoList = Arr
  }


}

const updateValueToInput = (str) => {
  state.value = str
}

</script>

<style lang="less" scoped>
@MarAuto0: auto 0;
@bottomBgc: #f8f9fd;

.bottomColor {
  background-color: #f8f9fd;

  .topSearch {
    z-index: 10;
    // width: 375px;
    // height: 45px;
    background-color: @bottomBgc;
    display: flex;
    justify-content: space-between;
    position: sticky;
    top: 0;
    padding: 5px;

    .leftImg {
      height: 30px;
      margin: @MarAuto0;
    }

    .centerBox {
      border-radius: 20px;
      background-color: white;
      border: 1PX solid #e7e5e5;
      overflow: hidden;

      width: 270px;
      // padding: 0 10px;
      display: flex;
      justify-content: center;
      height: 35px;
      margin: @MarAuto0;

      .center-leftImg {
        height: 25px;
        margin: @MarAuto0;
      }

      .span {
        height: 100%;
        line-height: 100%;
        // background-color: red;
        width: 100%;
        margin: @MarAuto0;
      }

      .center-rightImg {
        height: 25px;
        margin: @MarAuto0;
      }
    }

    .rightImg {
      height: 30px;
      margin: @MarAuto0;
    }
  }

  .searchHistoryBigBox {
    margin: 0 5px 0 5px;

    .historyActionBar {
      display: flex;
      justify-content: space-between;
      height: 30px;
      align-items: center;

      span {
        font-size: 12px;
      }

      img {
        width: 20px;
        height: 20px;
      }
    }

    .searchHistory {
      // height: 50px;
      display: flex;
      width: 100%;

      flex-wrap: wrap;

      .spanBox {
        padding: 0px 6px 0px 6px;
        background-color: #e7e5e5;
        border-radius: 10px;
        height: 20px;
        display: flex;
        margin: 5px;

        span {
          margin: auto 0;
          // display: inline-block;
          // background-color: red;
          font-size: 12px;
          // border-radius: 8px;
        }
      }

    }

  }

  .searchJieguo {
    .top {
      background-color: white;
      height: 40px;
      border-bottom: 1PX solid #e7e5e5;
      span {
        // color: red;
        font-size: 20px;
        font-weight: bold;
        line-height: 40px;
      }
    }
    .box {
      display: flex;
      padding: 0 5px 0 5px;
      background-color: white;
      border-bottom: 1PX solid #e7e5e5;
      height: 50px;
      align-items: center;
      .leftBox {
        // background-color: red;
        flex: 1;
        margin-right: 10PX;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .title {
          font-size: 15px;
          color: black;
        }
        .singer {
          font-size: 10px;
          color: #cccccc;
        }
      }
      .img1 {
        width: 40px;
        height: 40px;
        margin-right: 5px;
      }
      .img2 {
        width: 40px;
        height: 40px;
      }
    }
  }
}</style>