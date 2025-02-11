<script>
export default {
    data() {
        return{
            animatedText:'測試',
            changeTAG:'',
            addTAG:'',
        }
    },
    computed:{
        renderedChangeTag(){
            return this.changeTAG ? '<'+this.changeTAG+'>' :'';
        },
        renderedAddTag(){
            return this.addTAG ? '<'+this.addTAG+'>' :'';
        }
    },
    methods:{
        updateTextContent(){
            this.animatedText = this.$refs.myInput.value;
        },
        setChangeTag(tag) {
            this.changeTAG = tag;
        },
        setAdditionalTag(tag) {
            this.addTAG = tag;
        },
    },
}
</script>

<template>
        <div>
            <div class="col fs-1" ref="contentRef" v-html="`${renderedAddTag}`+`${renderedChangeTag}`+`${animatedText}`+`${renderedChangeTag}`"></div>
            <br>
            <textarea row="12" cols="20" ref="myInput"></textarea>
            <br>
            <button @click="updateTextContent">Change Text</button>
        </div>
        <div class="row">
            <div class="col-2 btn-group-vertical d-block" role="group" aria-label="Basic checkbox toggle button group">
                <input type="radio" name="btn-style" class="btn-check" id="h1" @change="setChangeTag('h1')" autocomplete="off">
                <label class="btn btn-outline-primary" for="h1">h1</label>

                <input type="radio" name="btn-style" class="btn-check" id="h2" @change="setChangeTag('h2')" autocomplete="off">
                <label class="btn btn-outline-primary" for="h2">h2</label>

                <input type="radio" name="btn-style" class="btn-check" id="h3" @change="setChangeTag('h3')" autocomplete="off">
                <label class="btn btn-outline-primary" for="h3">h3</label>

                <input type="radio" name="btn-style" class="btn-check" id="h4" @change="setChangeTag('h4')" autocomplete="off">
                <label class="btn btn-outline-primary" for="h4">h4</label>

                <input type="radio" name="btn-style" class="btn-check" id="h5" @change="setChangeTag('h5')" autocomplete="off">
                <label class="btn btn-outline-primary" for="h5">h5</label>

                <input type="radio" name="btn-style" class="btn-check" id="h6" @change="setChangeTag('h6')" autocomplete="off">
                <label class="btn btn-outline-primary" for="h6">h6</label>
            </div>
            <div class="col-2 btn-group-vertical d-block" role="group" aria-label="Basic checkbox toggle button group">
                <input type="radio" name="btn-style" class="btn-check" id="b" @change="setChangeTag('b')" autocomplete="off">
                <label class="btn btn-outline-primary" for="b">b/strong</label>

                <input type="radio" name="btn-style" class="btn-check" id="i/em" @change="setChangeTag('i')" autocomplete="off">
                <label class="btn btn-outline-primary" for="i/em">i/em</label>

                <input type="radio" name="btn-style" class="btn-check" id="small" @change="setChangeTag('small')" autocomplete="off">
                <label class="btn btn-outline-primary" for="small">small</label>

                <input type="radio" name="btn-style" class="btn-check" id="sup" @change="setChangeTag('sup')" autocomplete="off">
                <label class="btn btn-outline-primary" for="sup">sup</label>

                <input type="radio" name="btn-style" class="btn-check" id="sub" @change="setChangeTag('sub')" autocomplete="off">
                <label class="btn btn-outline-primary" for="sub">sub</label>

                <input type="radio" name="btn-style" class="btn-check" id="ins" @change="setChangeTag('ins')" autocomplete="off">
                <label class="btn btn-outline-primary" for="ins">ins</label>

                <input type="radio" name="btn-style" class="btn-check" id="del" @change="setChangeTag('del')" autocomplete="off">
                <label class="btn btn-outline-primary" for="del">del</label>

                <input type="radio" name="btn-style" class="btn-check" id="mark" @change="setChangeTag('mark')" autocomplete="off">
                <label class="btn btn-outline-primary" for="mark">mark</label>

                <input type="radio" name="btn-style" class="btn-check" id="pre" @change="setChangeTag('pre')" autocomplete="off">
                <label class="btn btn-outline-primary" for="pre">pre</label>

                <input type="radio" name="btn-style" class="btn-check" id="code" @change="setChangeTag('code')" autocomplete="off">
                <label class="btn btn-outline-primary" for="code">code</label>

                <input type="radio" name="btn-style" class="btn-check" id="kbd" @change="setChangeTag('kbd')" autocomplete="off">
                <label class="btn btn-outline-primary" for="kbd">kbd</label>

                <input type="radio" name="btn-style" class="btn-check" id="samp" @change="setChangeTag('samp')" autocomplete="off">
                <label class="btn btn-outline-primary" for="samp">samp</label>

                <input type="radio" name="btn-style" class="btn-check" id="var" @change="setChangeTag('var')" autocomplete="off">
                <label class="btn btn-outline-primary" for="var">var</label>

                <input type="radio" name="btn-style" class="btn-check" id="address" @change="setChangeTag('address')" autocomplete="off">
                <label class="btn btn-outline-primary" for="address">address</label>
            </div>
            <div class="col-2 btn-group-vertical d-block" role="group" aria-label="Basic checkbox toggle button group">
                <input type="radio" name="btn-style" class="btn-check" id="br" @change="setAdditionalTag('br/')" autocomplete="off">
                <label class="btn btn-outline-primary" for="br">br/</label>

                <input type="radio" name="btn-style" class="btn-check" id="i/em" @change="setAdditionalTag('i')" autocomplete="off">
                <label class="btn btn-outline-primary" for="i/em">i/em</label>

                <input type="radio" name="btn-style" class="btn-check" id="small" @change="setAdditionalTag('small')" autocomplete="off">
                <label class="btn btn-outline-primary" for="small">small</label>

                <input type="radio" name="btn-style" class="btn-check" id="sup" @change="setAdditionalTag('sup')" autocomplete="off">
                <label class="btn btn-outline-primary" for="sup">sup</label>

                <input type="radio" name="btn-style" class="btn-check" id="sub" @change="setAdditionalTag('sub')" autocomplete="off">
                <label class="btn btn-outline-primary" for="sub">sub</label>

                <input type="radio" name="btn-style" class="btn-check" id="ins" @change="setAdditionalTag('ins')" autocomplete="off">
                <label class="btn btn-outline-primary" for="ins">ins</label>

                <input type="radio" name="btn-style" class="btn-check" id="del" @change="setAdditionalTag('del')" autocomplete="off">
                <label class="btn btn-outline-primary" for="del">del</label>

                <input type="radio" name="btn-style" class="btn-check" id="mark" @change="setAdditionalTag('mark')" autocomplete="off">
                <label class="btn btn-outline-primary" for="mark">mark</label>
            </div>
        </div>
</template>

<style>
</style> 