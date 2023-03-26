<template>
  <!-- 头部搜索框 -->
  <div class="topSearch" v-if="state.loading === false">
    <img class="leftImg" src="@/assets/img/shouye-top/caidan.png" alt="">
    <div class="centerBox" @click="gotoSearch">
      <img class="center-leftImg" src="@/assets/img/shouye-top/search.png" alt="">
      <span class="span">展示的歌曲名字</span>
      <img class="center-rightImg" src="@/assets/img/shouye-top/saomiao.png" alt="">
    </div>
    <img class="rightImg" src="@/assets/img/shouye-top/huatong.png" alt="">
  </div>
  <!-- <van-pull-refresh success-text="刷新成功" v-model="state.loading" @refresh="onRefresh"> -->
  

    <!-- 轮播 -->
    <div class="top-Swipe" v-if="state.loading === false">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in state.swiperList">
          <img :src="item.pic" alt="">
        </van-swipe-item>

      </van-swipe>
    </div>
    <div class="scrollBar" v-if="state.loading === false">
      <div class="scrollBar1" v-for="item in state.scrollList">
        <div class="scrollBar2">
          <img :src="item.pic" alt="">
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
    <!-- 我喜欢的音乐 -->
    <div class="myLikeBox" v-if="state.loading === false">
      <div class="myLikeLeft">
        <img class="img1" src="@/assets/img/renxiang.png" alt="">
        <img class="img2" src="@/assets/img/love.png" alt="">
      </div>
      <div class="myLikeCenter">
        <span class="span1">我喜欢的音乐</span>
        <span class="span2">永远的奥特曼等543首</span>
      </div>
      <div class="myLikeright">
        <img src="@/assets/img/play2.png" alt="">
        <span>播放</span>
      </div>
    </div>
    <RecommendList :recommendLi="state.recommendSongList" v-if="state.loading === false"></RecommendList>
    <PaiHangBang :paihangbangLi='state.paihangbangList' v-if="state.loading === false"></PaiHangBang>
  <!-- </van-pull-refresh> -->
  <!-- <div class="test">
</div> -->
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { showLoadingToast, closeToast, showToast} from 'vant';
import RecommendList from '@/components/recommendList/index.vue'
import PaiHangBang from '@/components/paihangbang/index.vue'

import { getBannerAPI, getRecommendSongListAPI, getPaiHangBangZhaiYaoAPI, getSongListDetailAPI } from '@/utils/api/api.js'
import pic1 from '@/assets/img/scroll/active/tuijian.png'
import pic2 from '@/assets/img/scroll/active/FM_weixuanze.png'
import pic3 from '@/assets/img/scroll/active/gedan.png'
import pic4 from '@/assets/img/scroll/active/paihangbang.png'
import pic5 from '@/assets/img/scroll/active/tushu.png'
import pic6 from '@/assets/img/scroll/active/zhibo.png'
import pic7 from '@/assets/img/scroll/active/zhuanji.png'

const router = useRouter()
const state = reactive({
  swiperList: [],
  recommendSongList: [],
  paihangbangList: [],
  loading: false,
  loading: false,
  scrollList: [
    { name: '每日推荐', pic: pic1 },
    { name: '私人FM', pic: pic2 },
    { name: '歌单', pic: pic3 },
    { name: '排行榜', pic: pic4 },
    { name: '有声书', pic: pic5 },
    { name: '直播', pic: pic6 },
    { name: '数字专辑', pic: pic7 }
  ]
})

onMounted(() => {
  // getBannerFn()
  // getRecommendSongListFn()
  // getPaiHangBangZhaiYaoFn()
  // getSongListDetailFn()
  loadingFn()
  grtAllDataFn()
  
})

// const onRefresh = () => {

  
//     grtAllDataFn()
  
//   // new Promise(grtAllDataFn()).then(() => {
//   //   
//   //   showToast('刷新成功');
//   // })
  
// };

const gotoSearch = () => {
  console.log('search');
  router.push({name: 'search'})
}

const loadingFn = () => {
  state.loading = true
  showLoadingToast({
    message: '加载中...',
    forbidClick: true,
  });
}


const getBannerFn = async () => {
  const res = await getBannerAPI()
  // console.log(res.data);
  const swipeArr = res.data.banners.map((item) => {
    return {
      id: item.bannerId,
      pic: item.pic
    }
  })
  state.swiperList = swipeArr
  // console.log(state.swiperList);
}

const getRecommendSongListFn = async () => {
  const res = await getRecommendSongListAPI()
  // console.log(res.data);
  const recommendList = res.data.result.map((item) => {
    let playCountStr = ''
    if (item.playCount >= 100000000) {
      playCountStr = (item.playCount / 100000000).toFixed(1) + '亿'
    } else if (item.playCount >= 10000) {
      playCountStr = (item.playCount / 10000).toFixed(1) + '万'
    } else {
      playCountStr = item.playCount
    }
    return {
      id: item.id,
      name: item.name,
      pic: item.picUrl,
      playCount: playCountStr,
    }
  })
  state.recommendSongList = recommendList
  // console.log('@', state.recommendSongList);
}

const getPaiHangBangZhaiYaoFn = async () => {
  const res = await getPaiHangBangZhaiYaoAPI()
  // console.log('@@', res.data);
  const paihangArr = res.data.list.map((item, index) => {
    return item
  })
  // state.paihangbangList = paihangArr.slice(0, 6)
  // console.log('list', state.paihangbangList);
  // const Str = ['热歌榜', '编辑推荐榜', '云音乐民谣榜', '云音乐ACG榜', '云音乐说唱榜', '原创榜']
  const miniBangListArr = []
  const miniBangListArrFn = paihangArr.forEach((item) => {
    if (item.tracks.length > 1) {
      miniBangListArr.push(item)
    }
  })
  state.paihangbangList = miniBangListArr
  // console.log('111', state.paihangbangList);
}

// const getSongListDetailFn = async (id) => {
//   const X = await getSongListDetailAPI(id)
//   console.log('测试', X);
// }

const grtAllDataFn = () => {
  Promise.all([getBannerFn(),
  getRecommendSongListFn(),
  getPaiHangBangZhaiYaoFn(),
  // getSongListDetailFn()
]).then(() => {
    state.loading = false
    closeToast()
  })
}


</script>

<style lang="less" scoped>
@MarAuto0: auto 0;
@bottomBgc: #f8f9fd;

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
      width: 170px;
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

// 轮播
.top-Swipe {
  padding: 5px;
  background-color: @bottomBgc;
  overflow: hidden;

  .my-swipe .van-swipe-item {
    border-radius: 10px;
    overflow: hidden;
    height: 150px;

    // width: 100%;
    // font-size: 20px;
    // line-height: 150px;
    // text-align: center;
    // background-color: #39a9ed;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

.scrollBar {
  padding: 10px 5px 10px 5px;
  display: flex;
  overflow: scroll;
  background-color: @bottomBgc;

  &::-webkit-scrollbar {
    display: none;
  }

  .scrollBar1 {

    .scrollBar2 {
      display: flex;
      flex-direction: column;
      // justify-content: space-between;
      width: 80px;

      img {
        width: 40px;
        height: 40px;
        margin: 0 auto;
      }

      span {
        margin-top: 5px;
        text-align: center;
        font-size: 10px;
      }
    }
  }
}

.myLikeBox {
  background-color: @bottomBgc;
  border-bottom: 1PX solid #e7e5e5;
  padding: 5px;
  display: flex;
  justify-content: space-between;

  .myLikeLeft {
    position: relative;
    width: 50px;
    margin: @MarAuto0;

    .img1 {
      width: 50px;
    }

    .img2 {
      width: 16px;
      position: absolute;
      top: 17px;
      left: 17px;

    }
  }

  .myLikeCenter {
    margin-left: 15px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .span1 {
      font-size: 20px;
    }

    .span2 {
      font-size: 10px;
      margin-bottom: 5px;
    }
  }

  .myLikeright {
    margin: @MarAuto0;
    background-color: #e7e5e5;
    display: flex;
    justify-content: center;
    border-radius: 10px;
    width: 60px;
    height: 20px;

    img {
      width: 12px;
      margin: @MarAuto0;
    }

    span {
      font-size: 12px;
      margin: @MarAuto0;
    }
  }
}

// .test {
//   height: 20rem;
// }
</style>