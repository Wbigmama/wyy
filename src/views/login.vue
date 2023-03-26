<template>
  <div>
    登录功能尚未完成,敬请期待
  </div>
  <div class="imgBox">
    <img class="img" :src="state.base64" alt="">
  </div>
</template>

<script setup>
import { createCodeKeyAPI, createCodePicAPI, testCodeStatusAPI } from '@/utils/api/api.js'
import { onMounted, reactive, watch, inject } from 'vue';
import { useRouter } from 'vue-router'
import { usePlayMusicStore } from '@/stores/playMusic.js'
const usePlayMusic = usePlayMusicStore()
const router = useRouter()
const state = reactive({
  key: '',
  status: false,
  qrUrl: '',
  base64: '',
  statueCode: 0,
  cookie: ''
})
let cookies = inject('$cookies')

let int1 = ''
onMounted(() => {
  waitForLoginFn()
})

watch(() => state.statueCode, () => {
  console.log('watch检测到变化但未执行');
  if (state.statueCode === 803) {
    window.clearInterval(int1)
    usePlayMusic.updateCookie(state.cookie)
    
    cookies.set("wyyLoginCookie", state.cookie)
    console.log('cookiesssss', cookies);
    usePlayMusic.isLogin = true
    
    router.replace({ name: 'mine' })
  } else if (state.statueCode === 800) {
    window.clearInterval(int1)
  }
  // if (state.statueCode === 800 || state.statueCode === 803) {
  //   console.log('watch检测到变化且执行');
  //   window.clearInterval(int1)
  // }
})

const waitForLoginFn = () => {

  const p1 = new Promise((resolve, reject) => {
    const res1 = getCodeKeyFn()
    resolve(res1)
  })

  p1.then(() => {
    getCodeFn(state.key)
    console.log('value', value);
  })
  p1.then(() => {
    int1 = window.setInterval(() => {
      testCodeStatusAPIFn(state.key)
    }, 3000)
  })
  // int1 = setInterval(() => {
  //   p1.then(() => {

  //   })
  // }, 1000);


}

const getCodeKeyFn = async () => {
  const res = await createCodeKeyAPI()
  state.key = res.data.data.unikey
  console.log('res.data.data.unikey', res.data.data.unikey);

}

const getCodeFn = async (key) => {
  const res = await createCodePicAPI(key)
  console.log('得到的图片', res);
  state.qrUrl = res.data.data.qrurl
  let str = ''
  str = res.data.data.qrimg
  state.base64 = str.replace(/[\r\n]/g, '')
  // state.qrimg = res.data.data.qrimg
  console.log(state.qrimg);
}

const testCodeStatusAPIFn = async (key) => {


  const res = await testCodeStatusAPI(key)
  console.log('检测状态', res);
  state.statueCode = res.data.code
  if (res.data.code === 803) {
    state.cookie = res.data.cookie
  }





}


</script>

<style lang="less" scoped>
.img {
  width: 200px;
  height: 200px;
}
</style>