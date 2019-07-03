<template>
    <div class='card' :class="this.cardbody_color(this.cardStyle, this.cardIndex)">
        <div class='card-body'>
            <textarea style="overflow: hidden; line-height: 25px; height: 100px;" class="card-text form-control animated" :class="this.cardbody_color(this.cardStyle, this.cardIndex)" placeholder="panel-"  @input="rewrite($event.target)" :value='this.memo.text' @click="textAreaAdjust($event.target)"></textarea>
        </div>
        <div class='card-footer' :class="this.cardbody_color(this.cardStyle, this.cardIndex)">
            <span class="straight">last update&nbsp; {{this.memo.datetime}}</span>
            <click-confirm button-size="sm" :messages="{title:'delete?', yes:'yes', no:'no'}" yes-class="btn btn-danger btn-circle" no-class="btn btn-warning btn-circle" style='display:inline;margin-left: 10%;' no-icon='' yes-icon=''>
                <span class="fas fa-trash-alt" v-b-tooltip.hover.bottom title="delete" @click="delOn" style=''/>
            </click-confirm>
        </div>       
    </div>    
</template>

<script>
const colors = ['primary','success','info','warning','danger','secondary','dark','light'];
/**
 * mono style
 */
function color_mono(cardIndex){
    return 'bg-light'
}
/**
 * outline style
 */
function color_outline(cardIndex){

}
/**
 * background style
 */
function color_background(cardIndex){
    const index = cardIndex % colors.length;
    if (index == 7){
        return 'bg-' + colors[index];
    }else{
        return 'bg-' + colors[index] + ' text-white';
    }
}
/**
 * exports
 */
export default {
    name:'card',
    props:{
        memo: Object,
        cardIndex: Number,
        cardStyle: String
    },
    data: () => ({
        //countTest: Number
        test: Number,
        cardtext: String,
        carddatetime: String,
        initialTextareaHeight: '100px'
    }),
    methods:{
        /*
        cardbody_color: (cardIndex) => {
            const colors = ['primary','success','info','warning','danger','secondary','dark','light'];
            const index = cardIndex % colors.length;
            if (index == 7){
                return 'bg-' + colors[index];
            }else{
                return 'bg-' + colors[index] + ' text-white';
            }
        },
        */
        cardbody_color: (color, cardIndex) => {
            if (color === 'background'){
                return color_background(cardIndex)
            }
            /*
            const colors = ['primary','success','info','warning','danger','secondary','dark','light'];
            const index = cardIndex % colors.length;
            if (index == 7){
                return 'bg-' + colors[index];
            }else{
                return 'bg-' + colors[index] + ' text-white';
            }
            */
        },
        /**
         * toggle
         */
        textAreaAdjust: function(o){
            if(o.style.height !== this.initialTextareaHeight){
                o.style.height = this.initialTextareaHeight
                return
            }
            o.style.height = "1px";
            //o.style.height = (25+o.scrollHeight)+"px";
            o.style.height = (o.scrollHeight) + "px";
        },
        count: function(){
            //this.countTest += 1;
            //alert(memoChild.text);
            //this.test += 1;
        },
        /**
         * text edit event
         */
        rewrite: function(target){
            this.$emit('input', target.value);     // textarea parent data re-write
            this.$emit('editing_event_parent', this.cardIndex, target.value);
            this.textAreaAdjust(target);
        },
        /**
         * delete on
         */
        delOn: function(){
            this.$emit('delete_event_parent', this.cardIndex);
        }
    },
    beforeMount(){
        this.countTest = 0;
        this.test = 0;
    },
    watch:{
        'memo.text': function(n,o){
            n;
            o;
            //alert(n);
        }
        /*
        'cardStyle': function(){
            alert(this.cardStyle)
        }
        */
    }
}
</script>

<style>
.card-body{
    padding:0px;
}
.card-text{
    border:0px;
    font-size: 0.82rem;
}
.card-footer{
    font-size: 0.8rem;    
}
.delete_button{
    float: right;
    margin-top: 4px;
    margin-right: 17px;
}
.tooltip-inner{
  background-color: rgba(66,134,244,0.3) !important;
  color: #bc8f8f;
}
/*
.tooltip{
  background-color: rgba(66,134,244,0.3) !important;
  color: #bc8f8f;
}
*/
click-confirm{
    display: inline;
}
.animated {
	-webkit-transition: height 0.2s;
	-moz-transition: height 0.2s;
	transition: height 0.2s;
}
</style>
