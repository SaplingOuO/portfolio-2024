<script setup>
import { reactive, ref } from 'vue'
// import { gsap } from 'gsap'

const value = ref('circle')
const Data = reactive([
  {
    name: 'circle',
    ch: '圓',
    controls: {
      cx: { value: 15, max: 30, min: 1, step: 1 },
      cy: { value: 15, max: 30, min: 1, step: 1 },
      r: { value: 15, max: 30, min: 1, step: 1 },
      fill: { value: '#D9D9D9' },
      stroke: { value: '#000000' },
      strokeWidth: { value: 1, max: 10, min: 0, step: 1 },
      opacity: { value: 1, max: 1, min: 0, step: 0.1 }
    }
  },
  {
    name: 'rect',
    ch: '矩形',
    controls: {
      x: { value: 15, max: 30, min: 1, step: 1 },
      y: { value: 15, max: 30, min: 1, step: 1 },
      width: { value: 15, max: 30, min: 1, step: 1 },
      height: { value: 15, max: 30, min: 1, step: 1 },
      rx: { value: 0, max: 30, min: 0, step: 1 },
      ry: { value: 0, max: 30, min: 0, step: 1 },
      fill: { value: '#D9D9D9' },
      stroke: { value: '#000000' },
      strokeWidth: { value: 1, max: 10, min: 0, step: 1 },
      opacity: { value: 1, max: 1, min: 0, step: 0.1 }
    }
  },
  {
    name: 'ellipse',
    ch: '橢圓',
    controls: {
      cx: { value: 15, max: 30, min: 1, step: 1 },
      cy: { value: 15, max: 30, min: 1, step: 1 },
      rx: { value: 15, max: 30, min: 1, step: 1 },
      ry: { value: 15, max: 30, min: 1, step: 1 },
      fill: { value: '#D9D9D9' },
      stroke: { value: '#000000' },
      strokeWidth: { value: 1, max: 10, min: 0, step: 1 },
      opacity: { value: 1, max: 1, min: 0, step: 0.1 }
    }
  },
  {
    name: 'line',
    ch: '直線',
    controls: {
      x1: { value: 15, max: 30, min: 1, step: 1 },
      y1: { value: 15, max: 30, min: 1, step: 1 },
      x2: { value: 15, max: 30, min: 1, step: 1 },
      y2: { value: 15, max: 30, min: 1, step: 1 },
      stroke: { value: '#000000' },
      strokeWidth: { value: 1, max: 10, min: 0, step: 1 },
      opacity: { value: 1, max: 1, min: 0, step: 0.1 }
    }
  },
  {
    name: 'polyline',
    ch: '多段線',
    controls: {
      points: { value: '10,10 20,20 30,10' }, 
      fill: { value: 'none' },
      stroke: { value: '#000000' },
      strokeWidth: { value: 1, max: 10, min: 0, step: 1 },
      opacity: { value: 1, max: 1, min: 0, step: 0.1 }
    }
  },
  {
    name: 'path',
    ch: '曲線、特殊形狀',
    controls: {
      d: { value: 'M10 10 H 90 V 90 H 10 Z' },
      fill: { value: '#D9D9D9' },
      stroke: { value: '#000000' },
      strokeWidth: { value: 1, max: 10, min: 0, step: 1 },
      opacity: { value: 1, max: 1, min: 0, step: 0.1 }
    }
  },
  {
    name: 'text',
    ch: '文字',
    controls: {
      x: { value: 15, max: 30, min: 1, step: 1 },
      y: { value: 15, max: 30, min: 1, step: 1 },
      fontSize: { value: 16, max: 72, min: 8, step: 1 },
      fill: { value: '#000000' },
      textAnchor: { value: 'middle' }, 
      dominantBaseline: { value: 'middle' },
      fontFamily: { value: 'Arial' },
      textContent: { value: 'Hello SVG' },
      opacity: { value: 1, max: 1, min: 0, step: 0.1 }
    }
  }
])

function updateGeometry(selectedShape) {
  console.log('更新:', selectedShape)
  console.log('目前數據:', Data.find(item => item.name === selectedShape).controls)
}

function test() {
  console.log('目前資料', Data)
}

</script>

<template>
  <div class="row g-0">
    <div class="col">
      <select class="form-select" v-model="value" @change="updateGeometry(value)" aria-label="Default select example">
        <option v-for="item in Data" :key="item.name" :value="item.name">{{ item.ch }}</option>
      </select>

      <div v-for="(control, key) in Data.find(item => item.name === value).controls" :key="key"
        class="row p-2 d-flex justify-content-evenly align-items-center">
        <div class="col">{{ key }}</div>

        <!-- 如果是文字屬性，例如 fill、stroke、d、points，就用文字輸入 -->
        <template v-if="typeof control.value === 'string'">
          <input class="col m-2 text-center" type="text" :placeholder="key" v-model="control.value" @input="updateGeometry(value)">
        </template>

        <!-- 如果是數值屬性，例如 cx、cy、r、width、height 等等 -->
        <template v-else>
          <input class="col m-2 text-center" type="number" :placeholder="key" v-model.number="control.value" @input="updateGeometry(value)">
          <input class="col-md form-range" type="range"
            :min="control.min"
            :max="control.max"
            :step="control.step"
            v-model.number="control.value"
            @input="updateGeometry(value)">
        </template>
      </div>

      <button @click="test()">TEST</button>
    </div>

    <div class="col g-4 d-flex justify-content-evenly">
      <!-- 你之後可以把 SVG 畫出來 -->
    </div>
  </div>
</template>

<style>
</style>