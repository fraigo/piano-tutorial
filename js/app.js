
Vue.app = new Vue({
    el: '#app',
    data:{
      days:localStorage.getItem("days")?localStorage.getItem("days"):0
    },
    methods:{
      keyClick:function(key){
        
      },
      setDay:function(day){
        this.days=Math.max(this.days,day);
        localStorage.setItem("days",this.days);
        document.location="#day0"+day;
      }
    },
    mounted(){
      this.$el.style.display='';
    }
  })