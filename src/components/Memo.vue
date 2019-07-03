<!-- memo / bg, outline selected by :color -->
<template>
  <div id="app" class='f9'>
    <p>color:{{$route.params.color}}</p>
    <!--
    <h1 style='margin-left:7%;'>v-memo</h1>
    -->
    <div class='form-group'>
      <input type='text' class='form-control form-control-sm' id='filter' placeholder='text filter' :value='this.filter' @input="filterWrite($event.target)"/>
    </div>
    <button class='btn btn-sm btn-block btn-outline-secondary' @click='addBtnOn'>add new</button>
    <transition-group name='list-complete' tag='p'>
      <card class='list-complete-item' v-for='(item, index) in this.memos' :key=item._id v-bind:cardIndex='index' v-bind:memo='item' v-bind:cardStyle='cardStyle' v-on:editing_event_parent='editOnParent' v-on:delete_event_parent='deleteOn'/>
    </transition-group>
    <button class='btn btn-sm btn-block btn-outline-danger' @click='nextData'>next10</button>
  </div>
</template>

<script>
import io from 'socket.io-client'
import card from './card.vue'
import moment from 'moment'
/**
 * memo.text >>> memo.lines[]
 * @param {String} memo 
 */
function shapeMemo(memo){
    var newMemo = {}
    newMemo._id = memo._id;
    newMemo.datetime = memo.datetime;
    newMemo.lines = memo.text.split('\n');
    return newMemo;
}
/**
 * text change check
 */
function isChange(nowMemo, newMemo){
  if (nowMemo === newMemo){
    return false;
  }
  return true;
}
/**
 * get datetime
 */
function getDatetime(){
  return moment().format().split('+')[0];
}
/**
 * 
 */
export default {
  name: 'memo',
  components: {
    card
  },
  data: () => ({
    memos: Array,
    socket : io('localhost:3030'),
    count: 0,
    test_memos:Array,
    filter: '',
    read_size: 20,
    cardStyle: String
  }),
  methods: {
    textNew(val){
      this.memos.text = val;
    },
    editOnParent:function(cardIndex, newText){
      if (!isChange(this.memos[cardIndex].text, newText)){
        return;
      }
      this.memos[cardIndex].text = newText;
      this.memos[cardIndex].datetime = getDatetime();
		  const shaped = shapeMemo(this.memos[cardIndex]);
		  if(this.memos[cardIndex]._id === 'new'){
			  this.socket.emit('ADD_NEW_ONE', shaped);
		  }else{
        this.socket.emit('UPSERT_ONE', shaped);
		  }
	  },
	  /**
	   * on add new button
	   */
    addBtnOn: function(){
		  if(this.memos[0]._id === 'new'){
			  return;
			}
		  const newMemo = [{_id: 'new', text:'xxx', datetime:getDatetime()}];
      this.memos.splice(0,0,newMemo[0]);
    },
    successAlert: function(){
      //dummy
    },
    /**
     * 
     */
    deleteOn: function(cardIndex){
      if (this.memos[cardIndex]._id !== 'new'){
        this.socket.emit('DELETE_ONE', this.memos[cardIndex]._id);
      }
      this.memos.splice(cardIndex, 1);
    },
    /**
     * next data request
     */
    nextData: function(){
      this.show = !this.show;
    },
    /**
     * flter change
     */
    filterWrite: function(target){
      this.$emit('input', target.value);
      if(target.value === this.filter){
        return
      }
      this.filter = target.value;
      this.socket.emit('FILTER_STRING', {filter: this.filter, num: this.read_size});  
    }
  },
  mounted(){
    this.socket.on('MESSAGE', (mes) => {
      this.messages = [...this.messages, mes];
    }),
    this.socket.on('READLIMIT_RESULT', (mes) => {
      var buf = [];
      mes.forEach( m => {
        var jointext;
        if(m.lines){
          jointext = m.lines.join('\n');
        }else if(m.text){
          jointext = m.text;            
        }else{
          jointext = '';
        }
        buf.push({_id: m._id, datetime: m.datetime, text: jointext});
      });
      this.memos = buf;
		}),
		/**
		 * new mongo id set
		 */
		this.socket.on('NEW_ID', (mes) => {
			if(this.memos[0]._id === 'new'){
				this.memos[0]._id = mes;
			}
		})
  },
  beforeMount(){
    //this.memos = [{datetime:'', text:'', _id:''}];
    this.memos = []
    this.socket.emit('READLIMIT', this.read_size);
    this.cardStyle = this.$route.params.color
  },
  watch:{
    '$route.params.color': function(){
      this.cardStyle = this.$route.params.color
    }
  }
}
</script>
<style>
/*
h1{display: inline;}
*/
/**
 * animation
 */
.list-complete-item {
  transition: all 1s;
  display: block;
}
.list-complete-enter, .list-complete-leave-to{
  opacity: 0;
  transform: translateX(-100%);
}
.list-complete-leave-active {
  position: absolute;
}
</style>