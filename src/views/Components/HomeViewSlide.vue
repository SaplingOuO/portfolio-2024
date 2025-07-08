<script>
export default {
  data() {
    return {
      src: 'http://fakeimg.pl/300x300',
      bootstapStyle: 'position-absolute bottom-0 start-0 w-100 badge bg-dark',
      height: 300,
      width: 300,
      border: 1,
      space: 'auto',
      perspective: 35,
      autoplayTimeout: 2000,
      count: 10,
      display: 5,
      animationSpeed: 500,
      minSwipeDistance: 10,

      autoplay: false,
      autoplayHoverPause: false,
      loop: false,
      clickable: false,
      controlsVisible: false,
      dir: 'rtl',

      slides: 7
    }
  },
  methods: {
    toggleDir() {
      this.dir = this.dir === 'rtl' ? 'ltr' : 'rtl';
    },
    testButton() {
      console.log(this.autoplay)
    },
  }
}
</script>

<template>
  <div class="row">
    <div class="col ">
      <div class="col d-flex justify-content-evenly">
        <div class="flex-fill">高度</div>
        <input class="text-center" placeholder="height" v-model.number="height">
      </div>
      <div class="col d-flex justify-content-evenly">
        <div class="flex-fill">寬度</div>
        <input class="text-center" placeholder="width" v-model.number="width">
      </div>
      <div class="col d-flex justify-content-evenly">
        <div class="flex-fill">邊寬</div>
        <input class="text-center" placeholder="border" v-model.number="border">
      </div>
      <div class="col d-flex justify-content-evenly">
        <div class="flex-fill">間距</div>
        <input class="text-center" placeholder="space" v-model.number="space">
      </div>
      <div class="col d-flex justify-content-evenly">
        <div class="flex-fill">透視角度</div>
        <input class="text-center" placeholder="perspective" v-model.number="perspective">
      </div>
      <!-- <div class="col d-flex justify-content-evenly">
        <div class="flex-fill">自動播放時間</div>
        <input class="text-center" placeholder="autoplayTimeout" v-model.number="autoplayTimeout">
      </div> -->
      <div class="col d-flex justify-content-evenly">
        <div class="flex-fill">數量</div>
        <input class="text-center" placeholder="count" v-model.number="count">
      </div>
      <div class="col d-flex justify-content-evenly">
        <div class="flex-fill">顯示數量</div>
        <input class="text-center" placeholder="display" v-model.number="display">
      </div>
      <div class="col d-flex justify-content-evenly">
        <div class="flex-fill">切換速度</div>
        <input class="text-center" placeholder="animationSpeed" v-model.number="animationSpeed">
      </div>
      <div class="col d-flex justify-content-evenly">
        <div class="flex-fill">最小滑動距離</div>
        <input class="text-center" placeholder="minSwipeDistance" v-model.number="minSwipeDistance">
      </div>
    </div>
    <div class="col">
      <!-- <div class="col d-flex justify-content-evenly form-check form-switch">
        <label class="form-check-label me-auto" for="autoplay">自動播放</label>
        <input class="form-check-input" type="checkbox" id="autoplay"  v-model="autoplay" >
      </div>
      <div class="col d-flex justify-content-evenly form-check form-switch">
        <label class="form-check-label me-auto" for="autoplayHoverPause">Hover時暫停播放</label>
        <input class="form-check-input" type="checkbox" id="autoplayHoverPause" v-model="autoplayHoverPause">
      </div> -->
      <div class="col d-flex justify-content-evenly form-check form-switch">
        <label class="form-check-label me-auto" for="loop">無限循環</label>
        <input class="form-check-input" type="checkbox" id="loop" v-model="loop">
      </div>
      <div class="col d-flex justify-content-evenly form-check form-switch">
        <label class="form-check-label me-auto" for="clickable">可被點擊</label>
        <input class="form-check-input" type="checkbox" id="clickable" v-model="clickable">
      </div>
      <div class="col d-flex justify-content-evenly form-check form-switch">
        <label class="form-check-label me-auto" for="controlsVisible">控制顯示</label>
        <input class="form-check-input" type="checkbox" id="controlsVisible" v-model="controlsVisible">
      </div>
      <div class="col d-flex justify-content-evenly form-check form-switch">
        <label class="form-check-label me-auto" for="dir">自動播放方向</label>
        <button class="btn btn-secondary" @click="toggleDir">{{ dir === 'rtl' ? '向右' : '向左' }}</button>
        <!-- 使用按鈕切換方向 -->
      </div>
      <!-- <button @click="testButton">testButton</button> -->
    </div>
  </div>
  <div class="bg-success">
    <carousel-3d :height=height :width=width :border=border :space=space :perspective=perspective
      :autoplayTimeout=autoplayTimeout :count=count :display=display :animationSpeed=animationSpeed
      :minSwipeDistance=minSwipeDistance :autoplay=autoplay :autoplayHoverPause=autoplayHoverPause :loop=loop :dir=dir
      :clickable=clickable :controlsVisible=controlsVisible>
      <slide class="border-0 rounded" v-for="i in count" :index="i - 1" :key="i - 1">
        <div class="card">
          <img :src="'https://picsum.photos/' + height + '/' + width" style="object-fit: cover; width: 100%; height: 100%">
          <div :class="bootstapStyle" style="--bs-bg-opacity: 0.4">
            <h5 class="title text-truncate">{{ i }}</h5>
          </div>
          <a href="#" class="stretched-link"></a>
        </div>
      </slide>
    </carousel-3d>
  </div>
</template>
