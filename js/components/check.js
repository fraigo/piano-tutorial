
Vue.component("check",{
    props:{
        checked:{
            type:Boolean,
            default:false
        }
    },
    created:function(){
    },
    methods:{
        check:function(key){
            this.$emit("click",key);
        }
    },
    template:`<div style="line-height:32px;height:32px;display:inline-block"><input type="checkbox" style="width:24px;height:24px"><slot></slot></div>`
})