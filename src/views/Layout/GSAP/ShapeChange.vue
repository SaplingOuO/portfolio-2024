<script setup>
import {ref, reactive} from 'vue';
const number = ref(0)
const shape = reactive([
    {
        name:'circle',
        cn:'圓形',
        setting:[
            {
                d: { value: 'M100,50 A50,50 0 1,0 0,50 A50,50 0 1,0 100,50 Z' },
                fill: { value: '#D9D9D9' },
                stroke: { value: '#000000' },
                strokeWidth: { value: 2, max: 100, min: 0, step: 1 },
                opacity: { value: 1, max: 1, min: 0, step: 0.1 }
            },
            {
                d: { value: 'M100,50 A50,50 0 1,0 0,50 A50,50 0 1,0 100,50 Z' },
                fill: { value: '#D9D9D9' },
                stroke: { value: '#000000' },
                strokeWidth: { value: 2, max: 100, min: 0, step: 1 },
                opacity: { value: 1, max: 1, min: 0, step: 0.1 }
            }
        ],
    },
    {
        name:'rect',
        cn:'矩形',
        setting:[
            {
                d: { value: 'M0,0 H100 V100 H0 Z' },
                fill: { value: '#D9D9D9' },
                stroke: { value: '#000000' },
                strokeWidth: { value: 2, max: 100, min: 0, step: 1 },
                opacity: { value: 1, max: 1, min: 0, step: 0.1 }
            },
            {
                d: { value: 'M0,0 H100 V100 H0 Z' },
                fill: { value: '#D9D9D9' },
                stroke: { value: '#000000' },
                strokeWidth: { value: 2, max: 100, min: 0, step: 1 },
                opacity: { value: 1, max: 1, min: 0, step: 0.1 }
            }
        ],
    },
    {
        name:'star',
        cn:'星型',
        setting:[
            {
                d: { value: 'M50,0 L61.8,35.1 L100,38.2 L69.1,61.8 L80.9,100 L50,80 L19.1,100 L30.9,61.8 L0,38.2 L38.2,35.1 Z' },
                fill: { value: '#D9D9D9' },
                stroke: { value: '#000000' },
                strokeWidth: { value: 2, max: 100, min: 0, step: 1 },
                opacity: { value: 1, max: 1, min: 0, step: 0.1 }
            },
            {
                d: { value: 'M50,0 L61.8,35.1 L100,38.2 L69.1,61.8 L80.9,100 L50,80 L19.1,100 L30.9,61.8 L0,38.2 L38.2,35.1 Z' },
                fill: { value: '#D9D9D9' },
                stroke: { value: '#000000' },
                strokeWidth: { value: 2, max: 100, min: 0, step: 1 },
                opacity: { value: 1, max: 1, min: 0, step: 0.1 }
            }
        ],
    },
])
function shapeChange() {
  number.value = (number.value + 1) % shape.length;
}
</script>

<template>
    <div class="row">
        <button @click="shapeChange()">{{ shape[number].cn }}</button>
        
        <svg width="300" height="300" style="border:1px solid gray;">
            <path
                @click="shapeChange()"
                :d="shape[number].setting[0].d.value"
                :fill="shape[number].setting[0].fill.value"
                :stroke="shape[number].setting[0].stroke.value"
                :stroke-width="shape[number].setting[0].strokeWidth.value"
                :opacity="shape[number].setting[0].opacity.value"
            />
            <text
                class="no-select"
                x="50"
                y="50"
                text-anchor="middle"
                dominant-baseline="middle"
                font-size="16"
            >
                {{ shape[number].cn }}
            </text>
        </svg>
    </div>
</template>

<style>
.no-select {
    pointer-events:none;
    user-select: none;
}
</style>