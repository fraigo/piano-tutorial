window.pianoId=100;

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
        classes:{
            type:String,
            default:''
        },
        from:{
            type:String,
            default:"C"
        },
        inline:{
            type:Boolean,
            default:false
        },
        showLabels:{
            type:Boolean,
            default:true
        },
        showNames:{
            type:Boolean,
            default:false
        },
        size:{
            type:String
        }
    },
    created:function(){
        window.pianoId++;
        var keyid=1;
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
        }
        this.classList=[];
        if (this.classes!="") {
            this.classList=this.classes.split(",");
        }
        this.keys=[];
        this.pianoId="p"+window.pianoId;
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
                id:"k"+window.pianoId*10000+(keyid++),
                keyName:this.keyList[i]+octave,
                pushed:this.noteList.indexOf(this.keyList[i]+octave)!=-1,
                octave:octave,
                white:white,
                label:this.labelList[i],
                className:[this.classList[i],white?'white':'black']
            }
            config.style={
                border:"1px solid #444",
                width:white?"1.8em":"1.4em",
                height:white?"8em":"5em",
                display:"inline-block",
                color:white?'#000':'#FFF',
                backgroundColor:white?'#FFF':'#000',
                borderRadius:white?'0px 0px 3px 3px':'0px 0px 5px 5px',
                zIndex:white?'10':'100',
                marginLeft:!lastWhite||!white?'-0.75em':'0px',
                top:white?"5em":"3em",
                marginTop:white?"-7em":"-5em",
                position:"relative",
                textAlign:"center"
            }            
            if (config.pushed){
                config.style.backgroundColor=white?'#FF8':'#DD0'
            }
            config.labelStyle={
                position:"relative",
                bottom:"0px",
                paddingTop:white?"5em":"3em",
                textAlign:"center"
            }
            this.keys.push(config)
            this.componentStyle={
                whiteSpace:"nowrap",
                position:"relative",
                display:"inline-block",
                height:"9em",
                fontSize:this.size
            }
            this.containerStyle={
                textAlign:"center"
            }
            if (this.inline){
                this.containerStyle["display"]="inline-block";
            }
            lastWhite=white;
        }
    },
    methods:{
        getLabel:function(key){
            var label=[];
            if (this.showLabels && this.labelList.length && key.label!="" && key.label!=null){
                label.push(key.label)
            }
            if (this.showNames){
                label.push(key.keyName)
            }
            if (label.length==0){
                return "";
            }
            return label.join(" ");
        },
        keyClick:function(key){
            this.$emit("click",key);
        }
    },
    template:`<div class="piano-container" :style="containerStyle"><div :id="pianoId" class="piano" :style="componentStyle">
        <div v-for="key in keys" :id="key.id" :class="key.className" :style="key.style" @click="keyClick(key)">
            <div class="label" :style="key.labelStyle">&nbsp;<span>{{getLabel(key)}}</span>&nbsp;</div>
        </div>
    </div></div>`
})