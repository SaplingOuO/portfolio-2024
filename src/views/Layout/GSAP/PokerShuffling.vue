<script setup>
import { reactive, computed } from 'vue'

// 撲克牌數字（共 13 張）
const numbers = ['A','2','3','4','5','6','7','8','9','10','J','Q','K']

// 撲克牌花色（黑桃、紅心、方塊、梅花）
const suits = ['spade', 'heart', 'diamond', 'club']

// 各花色的 SVG 路徑（已經經過中心點對齊調整）
const flowerPath = {
  spade: 'M91 23.117 C91 51.118 66.783 63.946 50.037 63.955 C31.363 63.955 17.255 55.522 8.8549 48.637 C9.963 71.417 15.371 87.691 39.642 100.5 H-39.6419 C-15.3711 87.691 -9.9626 71.417 -8.8549 48.637 C-17.2546 55.518 -31.3678 63.963 -50.0373 63.955 C-66.7605 63.955 -91 51.118 -91 23.117 C-91 -28.0619 -54.8359 -14.1349 0 -100.5 C54.836 -14.1349 91 -28.0574 91 23.117 Z',
  heart: 'M100  -44.329 C100  27.402 0 100 0 100 C0 100 -100 27.402 -100 -44.329 C-100 -84.9946 -68.5039 -99.9956 -51.942 -99.9956 C-17.3155 -99.9956 0 -70.7587 0 -70.7587 C0 -70.7587 17.315 -100 51.942 -100 C68.504 -99.9956 100 -84.999 100 -44.329 Z',
  diamond: 'M78 0 C47.379 18.792 17.0814 56.451 0 100 C-17.0814 56.451 -47.3743 18.792 -78 0 C-47.3787 -18.7917 -17.0814 -56.4508 0 -100 C17.0814 -56.4508 47.374 -18.7917 78 0 Z',
  club: 'M98.5 17.411 C98.502 28.298 94.682 38.839 87.705 47.196 C80.729 55.553 71.039 61.195 60.328 63.137 C49.616 65.079 38.563 63.198 29.096 57.822 C19.63 52.446 12.352 43.917 8.533 33.723 C8.497 64.295 10.459 84.636 39.469 100 H-39.5157 C-10.5052 84.641 -8.5436 64.304 -8.5791 33.723 C-11.771 42.223 -17.3842 49.6 -24.7246 54.944 C-32.065 60.287 -40.8106 63.362 -49.88 63.788 C-58.9493 64.213 -67.9445 61.971 -75.7531 57.339 C-83.5617 52.706 -89.8413 45.887 -93.8152 37.723 C-97.7891 29.56 -99.283 20.411 -98.1122 11.407 C-96.9414 2.403 -93.1573 -6.0596 -87.2278 -12.9353 C-81.2983 -19.811 -73.4834 -24.7978 -64.7498 -27.2792 C-56.0161 -29.7605 -46.7467 -29.6274 -38.0879 -26.8965 C-42.9615 -33.8592 -45.8319 -42.0253 -46.3868 -50.5061 C-46.9416 -58.9869 -45.1596 -67.4574 -41.2346 -74.9957 C-37.3097 -82.534 -31.3922 -88.8513 -24.1263 -93.2601 C-16.8603 -97.6688 -8.5243 -100 0 -100 C8.473 -100 16.809 -97.6688 24.075 -93.2601 C31.341 -88.8513 37.2586 -82.534 41.1835 -74.9957 C45.1085 -67.4574 46.8906 -58.9869 46.3357 -50.5061 C45.7809 -42.0253 42.9105 -33.8592 38.0369 -26.8965 C44.9985 -29.0919 52.379 -29.617 59.581 -28.4292 C66.784 -27.2413 73.605 -24.374 79.493 -20.0593 C85.38 -15.7446 90.169 -10.104 93.472 -3.5941 C96.774 2.916 98.496 10.112 98.5 17.411 Z'
}

// 目前的卡片狀態（數字與花色索引）
const current = reactive({
  numberIndex: 0,   // 對應 numbers[] 的索引
  suitIndex: 0      // 對應 suits[] 的索引
})

// 根據花色決定顏色（紅心/方塊為紅色，其它為黑色）
const currentSuitColor = computed(() => {
  const suit = suits[current.suitIndex]
  return (suit === 'heart' || suit === 'diamond') ? '#c00' : '#000'
})

// 切換到下一張卡片（數字 + 花色都循環）
function nextCard() {
  current.numberIndex = (current.numberIndex + 1) % numbers.length
  current.suitIndex = (current.suitIndex + 1) % suits.length
}
// 切換到下一張卡片（數字 + 花色都隨機）
function randomCard() {
  current.numberIndex = Math.floor(Math.random() * numbers.length)
  current.suitIndex = Math.floor(Math.random() * suits.length)
}
</script>

<template>
  <div class="row">
    <div class="col">
      <div class="card-container">
        <!-- 可縮放的撲克牌 SVG，點擊切換牌面 -->
        <svg 
          viewBox="0 0 635 889"
          preserveAspectRatio="xMidYMid meet"
          @click="nextCard"
        >
          <!-- 撲克牌白底外框 -->
          <rect
            x="0"
            y="0"
            width="635"
            height="889"
            rx="30"
            ry="30"
            fill="#fff"
            stroke="#000"
            stroke-width="10"
          />

          <!-- 左上角數字 -->
          <text 
            class="no-select"
            x="65" 
            y="80" 
            text-anchor="middle"
            dominant-baseline="middle" 
            font-size="80" 
            :fill="currentSuitColor"
          >
            {{ numbers[current.numberIndex] }}
          </text>

          <!-- 左上角小花色圖示 -->
          <path
            :d="flowerPath[suits[current.suitIndex]]"
            transform="translate(65,150) scale(0.3)"
            :fill="currentSuitColor"
          />

          <!-- 正中央的大花色圖示 -->
          <path
            :d="flowerPath[suits[current.suitIndex]]"
            transform="translate(317.5, 444.5) scale(1.0)"
            :fill="currentSuitColor"
          />

          <!-- 右下角（翻轉）數字 + 花色 -->
          <g transform="rotate(180, 317.5, 444.5)">
            <!-- 右下角數字 -->
            <text 
              class="no-select"
              x="65" 
              y="80" 
              text-anchor="middle"
              dominant-baseline="middle" 
              font-size="80" 
              :fill="currentSuitColor"
            >
              {{ numbers[current.numberIndex] }}
            </text>
            <!-- 右下角小花色圖示 -->
            <path
              :d="flowerPath[suits[current.suitIndex]]"
              transform="translate(65,150) scale(0.3)"
              :fill="currentSuitColor"
            />
          </g>
        </svg>
      </div>
    </div>
    <div class="col">
      <button class="btn" @click="randomCard">隨機撲克牌</button>
    </div>
  </div>
</template>

<style>
.card-container {
  width: 30vw;        /* 根據視窗寬度縮放卡片寬度 */
  max-width: 300px;   /* 最大寬度限制為 300px */
  margin: 0 auto;     /* 置中顯示 */
}
svg {
  width: 100%;        /* SVG 寬度佔滿容器 */
  height: auto;       /* 高度自動等比例縮放 */
  display: block;     /* 避免多餘空白 */
}
.no-select {
  pointer-events: none; /* 點擊不觸發事件 */
  user-select: none;    /* 文字無法被選取（防止雙擊反藍） */
}
</style>