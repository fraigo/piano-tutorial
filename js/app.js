
Vue.app = new Vue({
    el: '#app',
    data:{
      days:0
    },
    methods:{
      keyClick:function(key){
        
      },
      setDay:function(day){
        this.days=Math.max(this.days,day);
        document.location="#day0"+day;
      }
    },
    mounted(){
      this.$el.style.display='';
    }
  })