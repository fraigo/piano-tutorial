function playSeq(seq){
    var note=seq.shift();
    playNote(note,function(){
        if (seq.length>0){
            playSeq(seq);
        }
    })
}

function playNote(note,callback){
    var positions={};
    positions["C"]=0;
    positions["D"]=500;
    positions["E"]=1000;
    positions["F"]=1500;
    positions["G"]=2000;
    positions["A"]=2500;
    positions["B"]=3000;
    var pos=positions[note];
    if (pos==null){
        pos=-1;
    }
    //console.log(["playing",note,pos]);
    play(pos,500,callback);
}

function play(start,duration,callback){
    var audio=document.getElementById("sample");
    if (start>=0){
        audio.currentTime=start/1000;
        audio.play();    
    }
    setTimeout(function(){ 
        if (start>=0){
            audio.pause()
        }
        if (callback){
            callback();
        } 
    },duration);
}



Vue.component("sample",{
    props:{
        sequence:{
            type:String,
            default:""
        }
    },
    created:function(){
        this.notes=this.sequence.split(",");
    },
    methods:{
        play:function(key){
            playSeq(this.notes);
        }
    },
    template:`<button @click="play" class="sample" style="padding:6px">▶&nbsp;<slot>Play</slot></button>`
})