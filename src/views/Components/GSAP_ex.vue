<script setup>
import { reactive, ref} from 'vue'
// import { gsap } from 'gsap'

const value = ref('circle')
const newX = ref(0)
const newY = ref(0)
const pathCommand = ref('M')  // 預設是 M
const pathParams = ref('')    // 指令參數區

const Data = reactive([
  {
    name: 'circle',
    ch: '圓',
    controls: {
      cx: { value: 150, max: 300, min: 1, step: 1 },
      cy: { value: 150, max: 300, min: 1, step: 1 },
      r: { value: 75, max: 150, min: 1, step: 1 },
      fill: { value: '#D9D9D9' },
      stroke: { value: '#000000' },
      strokeWidth: { value: 2, max: 100, min: 0, step: 1 },
      opacity: { value: 1, max: 1, min: 0, step: 0.1 }
    }
  },
  {
    name: 'rect',
    ch: '矩形',
    controls: {
      x: { value: 150, max: 300, min: 1, step: 1 },
      y: { value: 150, max: 300, min: 1, step: 1 },
      width: { value: 10, max: 150, min: 1, step: 1 },
      height: { value: 10, max: 150, min: 1, step: 1 },
      rx: { value: 0, max: 100, min: 0, step: 1 },
      ry: { value: 0, max: 100, min: 0, step: 1 },
      fill: { value: '#D9D9D9' },
      stroke: { value: '#000000' },
      strokeWidth: { value: 2, max: 100, min: 0, step: 1 },
      opacity: { value: 1, max: 1, min: 0, step: 0.1 }
    }
  },
  {
    name: 'ellipse',
    ch: '橢圓',
    controls: {
      cx: { value: 150, max: 300, min: 1, step: 1 },
      cy: { value: 150, max: 300, min: 1, step: 1 },
      rx: { value: 75, max: 150, min: 1, step: 1 },
      ry: { value: 75, max: 150, min: 1, step: 1 },
      fill: { value: '#D9D9D9' },
      stroke: { value: '#000000' },
      strokeWidth: { value: 2, max: 100, min: 0, step: 1 },
      opacity: { value: 1, max: 1, min: 0, step: 0.1 }
    }
  },
  {
    name: 'line',
    ch: '直線',
    controls: {
      x1: { value: 75, max: 300, min: 1, step: 1 },
      y1: { value: 75, max: 300, min: 1, step: 1 },
      x2: { value: 225, max: 300, min: 1, step: 1 },
      y2: { value: 225, max: 300, min: 1, step: 1 },
      stroke: { value: '#000000' },
      strokeWidth: { value: 2, max: 100, min: 0, step: 1 },
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
      strokeWidth: { value: 2, max: 100, min: 0, step: 1 },
      opacity: { value: 1, max: 1, min: 0, step: 0.1 }
    }
  },
  {
    name: 'path',
    ch: '曲線、特殊形狀',
    controls: {
      d: { value: 'M50 50 L150 50 H200 V100 C220 120,180 150,200 200 S250 250,200 280 Q150 250,100 200 T50 150 A30 30 0 0 1 80 80 Z' },
      fill: { value: '#D9D9D9' },
      stroke: { value: '#000000' },
      strokeWidth: { value: 2, max: 100, min: 0, step: 1 },
      opacity: { value: 1, max: 1, min: 0, step: 0.1 }
    }
  },
  {
    name: 'text',
    ch: '文字',
    controls: {
      x: { value: 150, max: 300, min: 1, step: 1 },
      y: { value: 150, max: 300, min: 1, step: 1 },
      fontSize: { value: 16, max: 72, min: 8, step: 1 },
      fill: { value: '#000000' },
      textAnchor: { 
        value: 'start', 
        options: ['start', 'middle', 'end'] 
      }, 
      dominantBaseline: { 
        value: 'auto', 
        options: ['auto', 'middle', 'hanging', 'text-top', 'text-bottom'] 
      },
      fontFamily: { 
        value: 'Arial', 
        options: ['Arial', 'Verdana', 'Courier New', 'Georgia','Impact', 'Comic Sans MS','Lucida Console', 'Times New Roman', 'Trebuchet MS', 'Brush Script MT'] 
      },
      textContent: { value: 'Hello SVG' },
      opacity: { value: 1, max: 1, min: 0, step: 0.1 }
    }
  }
])

// 多線段
function selectedShape() {
  return Data.find(item => item.name === value.value)
}

function addPoint() {
  const pointStr = `${newX.value},${newY.value}`
  const pointsControl = selectedShape().controls.points
  if (pointsControl.value.trim() !== '') {
    pointsControl.value += ' ' + pointStr
  } else {
    pointsControl.value = pointStr
  }
  newX.value = 0
  newY.value = 0
}

function deleteLastPoint() {
  const pointsControl = selectedShape().controls.points
  const pointsArr = pointsControl.value.trim().split(' ')
  if (pointsArr.length > 0) {
    pointsArr.pop()
    pointsControl.value = pointsArr.join(' ')
  }
}

// 曲線
function addPathSegment() {
  const shape = selectedShape()
  if (!shape || shape.name !== 'path') return

  const newSegment = `${pathCommand.value} ${pathParams.value}`.trim()
  if (newSegment) {
    const currentD = shape.controls.d.value.trim()
    shape.controls.d.value = currentD ? `${currentD} ${newSegment}` : newSegment
    pathCommand.value = ''
    pathParams.value = ''
  }
}
// 曲線說明
const showToast = ref(false)
function toggleToast() {
  showToast.value = !showToast.value
}

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
      
      <!-- 多段線 -->
      <div v-if="value === 'polyline'" class="row">
        <div class="col m-2">
        <label>X:
          <input type="number" v-model.number="newX" />
        </label>
        <label>Y:
          <input type="number" v-model.number="newY" />
        </label></div>
        <div class="col">
          <button class="m-1" @click="addPoint">新增Point</button>
          <button class="m-1" @click="deleteLastPoint">刪除最後一個Point</button>
        </div>

      </div>

      <!-- 曲線 -->
      <div v-if="value === 'path'" class="row mt-3">
        <div class="col">
          <label>指令類型:</label>
          <select v-model="pathCommand" class="form-select">
            <option v-for="cmd in ['M','L','H','V','C','S','Q','T','A','Z']" :key="cmd" :value="cmd">{{ cmd }}</option>
          </select>
        </div>
        <div class="col">
          <label>參數:</label>
          <input v-model="pathParams" type="text" class="form-control" placeholder="例如：50 50 或 100 100 200 200" />
        </div>
        <div class="col">
          <button class="btn btn-success mt-4" @click="addPathSegment">新增指令</button>
          <span @click="toggleToast" style="cursor:pointer; color:blue;">❓</span>
        </div>
      </div>

      <!-- 基礎樣板 -->
      <div v-for="(control, key) in Data.find(item => item.name === value).controls" :key="key"
        class="row p-0 d-flex justify-content-evenly align-items-center">
        <div class="col p-0">{{ key }}</div>

      <!-- 如果有 options 陣列，渲染 select -->
      <div v-if="control.options" class="col">
        <select v-model="control.value" @change="updateGeometry(value)">
          <option v-for="option in control.options" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>

      <!-- 如果是 fill 或 stroke，渲染 color input -->
      <div v-else-if="key === 'fill' || key === 'stroke'" class="col">
        <input
          type="color"
          v-model="control.value"
          @input="updateGeometry(value)"
        />
      </div>

      <!-- 如果是純文字屬性 (字串類，且沒有 min/max，也不是 fill/stroke，也沒有 options) -->
      <div v-else-if="typeof control.value === 'string'" class="col">
        <input
          type="text"
          class="col m-2 text-center"
          :placeholder="key"
          v-model="control.value"
          @input="updateGeometry(value)"
        />
      </div>

      <!-- 如果是數字類型 (有 min 屬性) -->
      <div v-else-if="'min' in control" class="col">
        <input
          type="number"
          class="col m-2 text-center"
          :placeholder="key"
          v-model.number="control.value"
          @input="updateGeometry(value)"
        />
        <input
          type="range"
          class="col-md form-range"
          :min="control.min"
          :max="control.max"
          :step="control.step"
          v-model.number="control.value"
          @input="updateGeometry(value)"
        />
      </div>

      </div>


      <button @click="test()">TEST</button>
    </div>

    <div class="col g-4 d-flex justify-content-evenly">
      <svg width="300" height="300" style="border:1px solid gray;">
        <!-- 圓形 -->
        <circle
          v-if="value === 'circle'"
          :cx="selectedShape().controls.cx.value"
          :cy="selectedShape().controls.cy.value"
          :r="selectedShape().controls.r.value"
          :fill="selectedShape().controls.fill.value"
          :stroke="selectedShape().controls.stroke.value"
          :stroke-width="selectedShape().controls.strokeWidth.value"
          :opacity="selectedShape().controls.opacity.value"
        />
        <rect
          v-if="value === 'rect'"
          :x="selectedShape().controls.x.value"
          :y="selectedShape().controls.y.value"
          :width="selectedShape().controls.width.value"
          :height="selectedShape().controls.height.value"
          :rx="selectedShape().controls.rx.value"
          :ry="selectedShape().controls.ry.value"
          :fill="selectedShape().controls.fill.value"
          :stroke="selectedShape().controls.stroke.value"
          :stroke-width="selectedShape().controls.strokeWidth.value"
          :opacity="selectedShape().controls.opacity.value"
        />
        <ellipse
          v-if="value === 'ellipse'"
          :cx="selectedShape().controls.cx.value"
          :cy="selectedShape().controls.cy.value"
          :rx="selectedShape().controls.rx.value"
          :ry="selectedShape().controls.ry.value"
          :fill="selectedShape().controls.fill.value"
          :stroke="selectedShape().controls.stroke.value"
          :stroke-width="selectedShape().controls.strokeWidth.value"
          :opacity="selectedShape().controls.opacity.value"
        />
        <line
          v-if="value === 'line'"
          :x1="selectedShape().controls.x1.value"
          :y1="selectedShape().controls.y1.value"
          :x2="selectedShape().controls.x2.value"
          :y2="selectedShape().controls.y2.value"
          :stroke="selectedShape().controls.stroke.value"
          :stroke-width="selectedShape().controls.strokeWidth.value"
          :opacity="selectedShape().controls.opacity.value"
        />
        <polyline
          v-if="value === 'polyline'"
          :points="selectedShape().controls.points.value"
          :fill="selectedShape().controls.fill.value"
          :stroke="selectedShape().controls.stroke.value"
          :stroke-width="selectedShape().controls.strokeWidth.value"
          :opacity="selectedShape().controls.opacity.value"
        />
        <path
          v-if="value === 'path'"
          :d="selectedShape().controls.d.value"
          :fill="selectedShape().controls.fill.value"
          :stroke="selectedShape().controls.stroke.value"
          :stroke-width="selectedShape().controls.strokeWidth.value"
          :opacity="selectedShape().controls.opacity.value"
        />
        <text
          v-if="value === 'text'"
          :x="selectedShape().controls.x.value"
          :y="selectedShape().controls.y.value"
          :font-size="selectedShape().controls.fontSize.value"
          :text-anchor="selectedShape().controls.textAnchor.value"
          :dominant-baseline="selectedShape().controls.dominantBaseline.value"
          :font-family="selectedShape().controls.fontFamily.value"
          :textContent="selectedShape().controls.textContent.value"
          :fill="selectedShape().controls.fill.value"
          :opacity="selectedShape().controls.opacity.value"
        />
      </svg>
      <!-- 曲線說明 -->
      <div class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index: 1055;" v-if="showToast">
        <div class="toast show bg-light" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="toast-header">
            <strong class="me-auto">Path 指令使用說明</strong>
            <button type="button" class="btn-close" @click="toggleToast"></button>
          </div>
          <div class="toast-body text-black" style="max-height: 300px; overflow-y: auto;">
            <p>以下是可用的 Path 指令：</p>
            <ul>
              <li><strong>M x y</strong>：移動起點到座標 (x, y)，不畫線。</li>
              <li><strong>L x y</strong>：從目前位置畫一條直線到 (x, y)。</li>
              <li><strong>H x</strong>：從目前位置畫水平線到 x 座標。</li>
              <li><strong>V y</strong>：從目前位置畫垂直線到 y 座標。</li>
              <li><strong>C x1 y1 x2 y2 x y</strong>：三次貝茲曲線，控制點是 (x1, y1) 和 (x2, y2)，終點是 (x, y)。</li>
              <li><strong>S x2 y2 x y</strong>：平滑三次貝茲，只有一個控制點 (x2, y2)，終點是 (x, y)。</li>
              <li><strong>Q x1 y1 x y</strong>：二次貝茲曲線，控制點是 (x1, y1)，終點是 (x, y)。</li>
              <li><strong>T x y</strong>：平滑二次貝茲，終點是 (x, y)。</li>
              <li><strong>A rx ry x-axis-rotation large-arc-flag sweep-flag x y</strong>：畫一段橢圓弧到 (x, y)，
                <br />參數詳細：
                <ul>
                  <li>rx, ry：橢圓半徑</li>
                  <li>x-axis-rotation：橢圓旋轉角度 (度)</li>
                  <li>large-arc-flag：0=小於180度，1=大於180度</li>
                  <li>sweep-flag：0=逆時針，1=順時針</li>
                  <li>x, y：終點座標</li>
                </ul>
              </li>
              <li><strong>Z</strong>：封閉路徑，回到起點並畫線。</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>