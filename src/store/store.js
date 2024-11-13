import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            openCase:0,
        }
    },
    mutations:{
        setOpenCase(state, value){
            state.openCase = value;
        }
    }
});
export default store;