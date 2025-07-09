<!-- 使用Bootstrap 5 examples 中的 Cover 範例修改 -->
<script>
import { mapState } from 'vuex';

export default {
  name: 'FloatingWindow',
  data() {
    return {
      items: [
        { id: 0, color: [232, 122, 144], title: "首頁", description: "歡迎來到首頁" },
        { id: 1, color: [236, 184, 138], title: "切版與樣式練習", description: "CSS練習" },
        { id: 2, color: [181, 202, 160], title: "元件練習", description: "單一套件練習" },
        { id: 3, color: [46, 169, 223], title: "專案練習", description: "綜合元件與切版的專案練習" }
      ],
      currentIndex: 0,
      carouselVisible: true,
      lists: [
        {},
        {
          name: 'Layout',
          unit:[
            {
              name: 'HTML標籤範例',
              to: '/Layout/HtmlTag',
              img: '../coverImages/HtmlTag.gif',
            },
            {
              name: 'GSAP形狀變換',
              to: '/Layout/GSAP/ShapeChange',
              img: '../coverImages/HtmlTag.gif',
            },
            {
              name: 'GSAP撲克隨機換牌',
              to: '/Layout/GSAP/PokerShuffling',
              img: '../coverImages/HtmlTag.gif',
            },
          ],
        },
        {
          name: 'Components',
          unit:[
            {
              name: '動態文字特效',
              to: '/Components/animatedText',
              img: '../coverImages/animatedText.gif',
            },
            {
              name: '背景顏色變化效果',
              to:'/Components/BackgroundColorChange',
              img: '../coverImages/HtmlTag.gif',
            },
            {
              name: '3D Carousel 選單',
              to:'/Components/HomeViewSlide',
              img: '../coverImages/HtmlTag.gif',
            },
            {
              name: '	Three.js 基礎範例',
              to:'/Components/ThreeJS/ThreeExample',
              img: '../coverImages/HtmlTag.gif',
            },
            {
              name: 'Three.js 互動範例',
              to:'/Components/ThreeJS/ThreeInteractive',
              img: '../coverImages/HtmlTag.gif',
            },
            {
              name: 'GSAP測試',
              to: '/Components/GSAP_ex',
              img: '../coverImages/HtmlTag.gif',
            },
          ],
        },
        {
          name: 'Project',
          unit:[
            {
              name: '簡易購物車範例',
              to:'/Project/ShopDemo',
              img: '../coverImages/HtmlTag.gif',
            },
            {
              name: 'Anime Record (舊版)',
              to:'https://saplingouo.github.io/AnimeRecord/',
              img: '../coverImages/HtmlTag.gif',
            },
            {
              name: 'Anime Record (Vue3 + Vite)',
              to:'https://saplingouo.github.io/AnimeRecord-vite-vue3/',
              img: '../coverImages/HtmlTag.gif',
            },
            {
              name: '寶可夢屬性相剋模擬',
              to:'/Project/PokemonTypeFighting',
              img: '../coverImages/HtmlTag.gif',
            },
          ],
        },
      ],
      targetCase: 0,
      carouselIndex: 0,
    };
  },
  computed: {
    currentItem() {
      return this.items[this.currentIndex];
    },
    // vuex控制openCase的值，使用changeCase(value)方法控制
    ...mapState({
      openCase: state => state.openCase
    }),
  },
  mounted() {
    window.addEventListener('wheel', this.handleScroll);
    this.updateFromHash();
    window.addEventListener('hashchange', this.updateFromHash);
  },
  methods: {
    // ↓↓↓Nav相關↓↓↓
    handleScroll(event) {
      // 如果 openCase 不為 0，表示進入了 RouterView，則不進行滾輪切換
      if (this.openCase !== 0) {
        return;
      }
      if (event.deltaY > 0) {
        if (this.currentIndex < this.items.length - 1) {
          this.currentIndex++;
        } else {
          this.currentIndex = 0;
        }
        this.updateHash();
      } else {
        if (this.currentIndex > 0) {
          this.currentIndex--;
        } else {
          this.currentIndex = this.items.length - 1;
        }
        this.updateHash();
      }
    },
    handleCarouselScroll(event) {

      const carousel = this.$refs.carousel;
      if (!carousel) return;

      if (event.deltaY > 0) {
        const nextIndex = (carousel.currentIndex + 1) % this.lists[this.currentIndex].unit.length;
        carousel.goFar(nextIndex, true); // 切換到下一張
        this.updateHash();
      } else {
        const prevIndex =
          (carousel.currentIndex - 1 + this.lists[this.currentIndex].unit.length) %
          this.lists[this.currentIndex].unit.length;
        carousel.goFar(prevIndex, true); // 切換到上一張
        this.updateHash();
      }
      carousel.goFar(this.carouselIndex, true); // 切換幻燈片
    },
    updateHash() {
      window.history.pushState({}, '', '/');
      window.location.hash = `#${this.items[this.currentIndex].id}`;
    },
    updateFromHash() {
      const hash = window.location.hash.replace('#', '');
      const index = this.items.findIndex(item => item.id === parseInt(hash));
      if (index !== -1) {
        this.currentIndex = index;
        this.changeCase(0);
      }
    },
    onSlideChange(temp) {
      this.carouselIndex = temp;
      this.targetCase = temp;
      // 自動導航至目標頁面
      const targetUnit = this.lists[this.currentIndex]?.unit?.[temp];
      const abc = this.lists[this.currentIndex]?.name;

      if (targetUnit && !targetUnit.to.startsWith('http')) {
        this.$router.push(targetUnit.to);
      }else{
        this.$router.push(abc);
      }
    },
    goSlideIndex(index) {
      if (index > this.lists.length - 1 || 0 > this.lists.length - 1) {
        return;
      }
      this.$refs.carousel.goFar(index);
    },
    navControl(index){
      this.currentIndex = index;
      this.targetNav = this.items[this.currentIndex].id;
      window.history.pushState({}, '', '/');
    },
    // ↑↑↑Nav相關↑↑↑

    // ↓↓↓Menu選擇↓↓↓
    changeCase(value){
      this.$store.commit('setOpenCase', value)
      const targetUnit = this.lists[this.currentIndex]?.unit?.[value];
      if (targetUnit) {
        if (targetUnit.to.startsWith('http')) {
          // 外部鏈接
          window.open(targetUnit.to, '_blank');
        } else {
          // 使用 Vue Router 導航
          this.$router.push(targetUnit.to);
        }
      }
      // this.openCase = 1
      // console.log('openCase='+this.openCase)
      // console.log('value = ' + value)
      // console.log('openCase = ' + this.openCase)
    },
    // ↑↑↑Menu選擇↑↑↑

    // ↓↓↓進入carousel-3d的範圍↓↓↓
    handleMouseEnter() {
      // console.log("已在範圍內");
      window.removeEventListener('wheel', this.handleScroll);
      window.addEventListener('wheel', this.handleCarouselScroll);
    },
    handleMouseLeave() {
      // console.log("已離開範圍");
      window.addEventListener('wheel', this.handleScroll);
      window.removeEventListener('wheel', this.handleCarouselScroll);
    },
    // ↑↑↑進入carousel-3d的範圍↑↑↑
  },
  beforeUnmount() {
    window.removeEventListener('wheel', this.handleScroll);
    window.removeEventListener('hashchange', this.updateFromHash);
  }
}
</script>

<template>
  <div class="vh-100 text-center text-white background-anime"
    style="text-shadow: 0 .05rem .1rem rgba(0, 0, 0, .5);box-shadow: inset 0 0 5rem rgba(0, 0, 0, .5);"
    :style="{ 'background-color': 'rgb(' + currentItem.color + ')' }">
    <div class="d-flex w-100 h-100 p-3 mx-auto flex-column">
      <header class="mb-auto">
        <div>
          <h3 class="float-md-start mb-0">我的作品集</h3>
          <nav class="nav nav-masthead justify-content-center float-md-end">
            <a @click="navControl(index)" v-for="(item, index) in items" :key="item.id" :href="'#' + item.id"
              :class="['nav-link', { active: currentIndex === index }]">
              {{ item.title }}
            </a>
          </nav>
        </div>
      </header>
      <RouterView v-if="openCase"/>
      <transition v-if="!openCase" name="fade" mode="out-in">
        <div v-if="carouselVisible" :key="currentItem.id">
          <div class="px-3">
            <h1>{{ currentItem.title }}</h1>
            <p>{{ currentItem.description }}</p>
          </div>

          <div v-if="currentItem.id!=0">
            <carousel-3d 
              ref="carousel"  
              @before-slide-change="onSlideChange"
              :onMainSlideClick="changeCase" 
              :display="5"
              :animationSpeed="150" 
              :minSwipeDistance="3"
              :width="300" 
              :height="300" 
              :controlsVisible="true"
              @mouseenter="handleMouseEnter"
              @mouseleave="handleMouseLeave"
            >
              <slide class="border-0 rounded" v-for="(item, i) in lists[this.currentIndex].unit" :index="i" :key="i">
                <div class="card">
                  <div class="img-fluid" style="height: 300px;">
                    <img class="card-img-top" :src="item.img"
                      style="object-fit: cover; width: 100%; height: 100%">
                  </div>
                  <div class="position-absolute bottom-0 start-0 w-100 badge bg-dark" style="--bs-bg-opacity: 0.4">
                    <h5 class="title text-truncate">{{ item.name }}</h5>
                  </div>
                  <!-- <div v-if="lists[currentIndex] && lists[currentIndex].unit && lists[currentIndex].unit[targetCase] && !lists[currentIndex].unit[targetCase].to.startsWith('http')">
                    <router-link :to="lists[currentIndex].unit[targetCase].to" class="stretched-link"></router-link>
                  </div>
                  <div v-else-if="lists[currentIndex] && lists[currentIndex].unit && lists[currentIndex].unit[targetCase]">
                    <a :href="lists[currentIndex].unit[targetCase].to" class="stretched-link"></a>
                  </div> -->
                  <template v-if="item.to.startsWith('http')">
                    <a :href="item.to" target="_blank" class="stretched-link"></a>
                  </template>
                  <template v-else>
                    <router-link :to="item.to" class="stretched-link"></router-link>
                  </template>
                </div>
              </slide>
            </carousel-3d>
          </div>
        </div>
      </transition>

      <footer class="mt-auto text-white-50">
        <p>關於我的<a class="text-white" href="https://github.com/SaplingOuO" target="_blank">Github</a></p>
      </footer>
    </div>
  </div>
</template>

<style>
/* ↓↓↓Header↓↓↓ */
.nav-masthead .nav-link {
  padding: .25rem 0;
  font-weight: 700;
  color: rgba(255, 255, 255, .5);
  background-color: transparent;
  border-bottom: .25rem solid transparent;
}

.nav-masthead, .nav-link:hover,
.nav-masthead, .nav-link:focus {
  color: #fff !important;
  border-bottom-color: rgba(255, 255, 255, .25);
}

.nav-masthead .nav-link+.nav-link {
  margin-left: 1rem;
}

.nav-masthead .active {
  color: #fff;
  border-bottom-color: #fff;
}

/* ↑↑↑Header↑↑↑ */


/* ↓↓↓main↓↓↓ */
.btn-secondary,
.btn-secondary:hover,
.btn-secondary:focus {
  color: #333;
  text-shadow: none;
}

/* ↑↑↑main↑↑↑ */

.background-anime {
  transition: background-color 1s ease;
}

/* 定義淡入淡出的動畫效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>