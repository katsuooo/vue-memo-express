<template>
  <div id="app"  class='container-fluid'>
    <nav style='display: inline;'>
      <!--
      <router-link class='btn btn-sm btn-outline-success' :to="{name:'memo-bg'}">Memobg</router-link>
      <router-link class='btn btn-sm btn-outline-warning' :to="{name:'memo-outline'}">Memooutline</router-link>
            -->
      <router-link class='btn btn-sm btn-outline-info' :to="{name: 'panel'}">Panel</router-link>
      <router-link class='btn btn-sm btn-outline-danger' :to="{name: 'memo', params: {color: 'mono'}}">Memo-mono</router-link>
      <router-link class='btn btn-sm btn-outline-secondary' :to="{name: 'memo', params: {color: 'background'}}">Memo-bg</router-link>
      <router-link class='btn btn-sm btn-outline-primary' :to="{name: 'memo', params: {color: 'outline'}}">Memo-outline</router-link>
      <router-link class='btn btn-sm btn-outline-success' :to="{name: 'filter-test'}">Filter-test</router-link>
        <button id='dbBtn' class='btn btn-sm btn-outline-dark btn-circle'>db</button>
    </nav>

    <hr style='margin:0;'/>
    <router-view />
  </div>
</template>

<script>
export default {
  
}
</script>

<style>
.f1{font-family: 'Noto Sans JP', sans-serif;}
.f2{font-family: 'Noto Sans TC', sans-serif;}
.f3{font-family: 'M PLUS 1p', sans-serif;}
.f4{font-family: 'Noto Sans SC', sans-serif;}
.f5{font-family: 'Sawarabi Mincho', sans-serif;}
.f6{font-family: 'Sawarabi Gothic', sans-serif;}
.f7{font-family: 'Kosugi Maru', sans-serif;}
.f8{font-family: 'M PLUS Rounded 1c', sans-serif;}
.f9{font-family: 'Kosugi', sans-serif;}
h1{display: inline;}
#app {
  /*
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  */
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
  padding-left: 0;
  padding-right:0;
}
.btn-circle {
  width: 30px;
  height: 30px;
  text-align: center;
  padding: 6px 0;
  font-size: 12px;
  line-height: 1.42;
  border-radius: 15px;
}
/*#dbBtn{float:right; margin-top:12px;}
*/
#dbBtn{float:right;}
</style>
