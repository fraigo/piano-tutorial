
Vue.app = new Vue({
    el: '#app',
    data:{
    },
    methods:{
      keyClick:function(key){
        console.log(key);
      }
    },
    mounted(){
      this.$el.style.display='';
    }
  })