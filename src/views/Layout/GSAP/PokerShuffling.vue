<script setup>
import {ref, reactive} from 'vue';
const number = ['A','2','3','4','5','6','7','8','9','10','J','Q','K']
const flowerPath = reactive({
  spade: 'M50 0 C70 30, 100 40, 50 100 C0 40, 30 30, 50 0 Z M45 100 L55 100 L55 115 L45 115 Z',
  heart: 'M50 90 C20 70, 0 40, 25 20 C40 5, 60 5, 75 20 C100 40, 80 70, 50 90 Z',
  diamond: 'M50 0 L100 50 L50 100 L0 50 Z',
  club: 'M50 40 C35 15, 0 30, 30 55 C10 60, 20 90, 50 75 C80 90, 90 60, 70 55 C100 30, 65 15, 50 40 Z M45 75 L55 75 L55 105 L45 105 Z'
})
</script>

<template>
  <div class="card-container">
    <svg viewBox="0 0 635 889" preserveAspectRatio="xMidYMid meet">
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
      <!-- 你可以在這裡加入牌面內容 -->
    </svg>
  </div>
</template>

<style>
.card-container {
  width: 30vw;        /* 你可以調整這裡讓撲克牌在不同裝置上自適應 */
  max-width: 300px;   /* 最大寬度限制 */
  margin: 0 auto;
}
svg {
  width: 100%;        /* 縮放依據容器寬度 */
  height: auto;
  display: block;
}
</style>