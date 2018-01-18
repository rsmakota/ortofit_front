<template>
  <div class="loadDiv">
    <img src="/static/img/loading.gif" class="loadingImg"/>
  </div>
</template>

<style>
  .loadDiv {
    margin: 0 auto;
    width: 500px;
    min-height: 500px;
    text-align: center;
    display: block;
    position: relative;
  }
  .loadingImg {
    position: absolute;
    top: 50%;
    margin-top:-75px;
    margin-left: -50px;
    width: 100px;
    height: 100px;
    vertical-align: middle
  }
</style>
