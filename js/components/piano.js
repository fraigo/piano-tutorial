Vue.component("piano",{
    props:{
        length:{
            type:Number,
            default:36
        },
        notes:{
            type:String,
            default:''
        },
        labels:{
            type:String,
            default:''
        },
        from:{
            type:String,
            default:"C"
        },
        showLabels:{
            type:Boolean,
            default:true
        },
        showNames:{
            type:Boolean,
            default:false
        }
    },
    created:function(){
        this.keyNames=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
        this.blackKeys=["A#","C#","D#","F#","G#"];
        this.noteList=[];
        if (this.notes!="") {
            this.noteList=this.notes.split(",");
        }
        this.keyList=this.keyNames.concat([]);
        var firstPos=this.keyList.indexOf(this.from);
        if (firstPos>=0){
            this.keyList=this.keyList.splice(firstPos,12);
        }
        while (this.keyList.length<this.length){
            this.keyList = this.keyList.concat(this.keyNames.concat(this.keyNames));
        }
        this.labelList=[];
        if (this.labels!="") {
            this.labelList=this.labels.split(",");
            console.log(this.labelList)
        }
        this.keys=[];
        var lastWhite=true;
        var octave=0;
        for(var i=0;i<this.length;i++){
            var white=this.blackKeys.indexOf(this.keyList[i])==-1;
            var left=0;
            if (this.keyList[i]=="C"){
                octave++;
            }
            var config={
                name:this.keyList[i],
                keyName:this.keyList[i]+octave,
                pushed:this.noteList.indexOf(this.keyList[i]+octave)!=-1,
                octave:octave,
                white:white,
                label:this.labelList[i]
            }
            config.style={
                border:"1px solid #444",
                width:white?"30px":"20px",
                height:white?"120px":"80px",
                display:"inline-block",
                color:white?'#000':'#FFF',
                backgroundColor:white?'#FFF':'#000',
                borderRadius:white?'0px 0px 3px 3px':'0px 0px 5px 5px',
                zIndex:white?'10':'100',
                marginLeft:!lastWhite||!white?'-12px':'0px',
                top:white?"100px":"60px",
                marginTop:white?"-100px":"-60px",
                position:"relative",
                textAlign:"center"
            }            
            if (config.pushed){
                config.style.backgroundColor=white?'#FF8':'#DD0'
            }
            config.labelStyle={
                position:"relative",
                bottom:"0px",
                paddingTop:white?"100px":"60px",
                fontSize:"10px"
            }
            this.componentStyle={
                whiteSpace:"nowrap",
                position:"relative",
                display:"inline-block",
                height:"125px"
            }
            this.keys.push(config)
            lastWhite=white;
        }
    },
    template:`<div style="text-align:center"><div :style="componentStyle">
        <div v-for="key in keys" :style="key.style">
            <div class="label" :style="key.labelStyle">
            {{showLabels&&labelList.length?key.label:'&nbsp;'}}
            {{showNames?key.keyName:'&nbsp;'}}
            </div>
        </div>
    </div></div>`
})