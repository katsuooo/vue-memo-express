<template>
  <div id="my-container" class='delIcon'>

    <span class="fas fa-trash-alt card_trash" v-b-tooltip.hover.left title="delete" @click="delOnx" :id="this.cardId" />


<!--
<click-confirm class='trash_confirm' button-size="sm" :messages="{title:'delete ?', yes:'yes', no:'no'}" 
yes-class="btn btn-danger btn-circle" no-class="btn btn-warning btn-circle" 
style='display:inline-block;float:right;' no-icon='' yes-icon=''>
<span class="fas fa-trash-alt card_trash" v-b-tooltip.hover.left title="delete" @click="delOnx"/>
</click-confirm>
-->
    <!-- Our popover title and content render container -->
    <!-- We use placement 'auto' so popover fits in the best spot on viewport -->
    <!-- We specify the same container as the trigger button, so that popover is close to button -->
    <b-popover
      :target="this.cardId"
      triggers="click"
      :show.sync="popoverShow"
      placement="auto"
      container="my-container"
      ref="popover"
      @show="onShow"
      @shown="onShown"
      @hidden="onHidden"
    >
      <template v-slot:title>
        <b-button @click="onClose" class="close" aria-label="Close">
          <span class="d-inline-block" aria-hidden="true">&times;</span>
        </b-button>
        delete?
      </template>

      <div>
        <b-button @click="onClose" size="sm" variant="warning">Cancel</b-button>
        <b-button @click="onOk" size="sm" variant="primary">Ok</b-button>
      </div>
    </b-popover>
  </div>
</template>

<script>
  export default {
    name: 'delIcon',
    props:{
        cardId: String
    },
    data() {
      return {
        popoverShow: false,
        memos: Array
      }
    },
    methods: {
      onClose() {
        this.popoverShow = false
      },
      onOk() {
        this.onClose()
        alert('del-on' + this.cardId)
        this.$emit('delete_event_child', this.cardId);
      },
      onShow() {
      },
      onShown() {
      },
      onHidden() {
      },
      delOnx() {

      }
      /*
      beforeMount(){
        for(let i=0; i<8; i++){
          this.memos.push({numString: String(i)})
        }
      }
      */
    }
  }
</script>
<style scoped>
.delIcon{
    display: inline;
}
</style>