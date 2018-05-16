Vue.component("piano",{
    props:{
        labels:{
            type:Boolean
        },
        length:{
            type:Number,
            default:36
        },
        notes:{
            type:String,
            default:''
        }
    },
    created:function(){
        this.keyNames=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
        this.blackKeys=["A#","C#","D#","F#","G#"];
        this.keyList=this.keyNames.concat([]);
        while (this.keyList.length<this.length){
            this.keyList = this.keyList.concat(this.keyNames.concat(this.keyNames));
        }
        console.log(this.keyList);
        this.keys=[];
        var lastWhite=true;
        for(var i=0;i<this.length;i++){
            var white=this.blackKeys.indexOf(this.keyList[i])==-1;
            var left=0;
            this.keys.push({
                pushed:false,
                name:this.keyList[i],
                white:white,
                style:{
                    border:"1px solid #444",
                    width:white?"30px":"20px",
                    height:white?"120px":"80px",
                    display:"inline-block",
                    color:white?'#000':'#FFF',
                    backgroundColor:white?'#FFF':'#000',
                    zIndex:white?'10':'100',
                    marginLeft:!lastWhite||!white?'-12px':'0px',
                    position:"relative",
                    textAlign:"center"
                }
            })
            lastWhite=white;
        }
    },
    template:`<div style="white-space:nowrap">
    <div v-for="key in keys" :style="key.style">
    {{labels?key.name:'&nbsp;'}}
    </div>
    </div>`
})