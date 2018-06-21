
Vue.component("chapterHeader",{
    props:{
        prev:String,
        next:String,
        current:String
    },
    created:function(){
    },
    methods:{
        goTo:function(hash){
            document.location=hash;
        }
    },
    template:`<center style="position:sticky; top:-1px; z-index:10000; background-color:rgba(255,255,255,0.9)">
    <hr/>
    <a :id="current"></a>
    <table width="100%"><tr>
    <td width=20 valign="center"><button v-if="prev" @click="goTo(prev)">Prev</button></td>
    <td  valign="center"><h2 style="margin:1px"><slot></slot></h2></td>
    <td width=20 valign="center" ><button v-if="next" @click="goTo(next)">Next</button></td>
    </tr></table>
    <hr/>
    </center>`
})