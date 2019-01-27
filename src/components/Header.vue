<template>
  <el-container>
    <el-header height="auto">
      <h1>transaction history data</h1>
    </el-header>
  </el-container>
</template>

<script>
export default {
  name: "Header",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../style.scss";
.el-container {
  background: #ffffff;
  background: linear-gradient(to bottom, #3cecb0 0%, #ffffff 60%);
  .el-header {
    margin-top: 40px;
    h1 {
      text-align: center;
      text-transform: uppercase;
      color: $primary-color;
      font-size: 1.25rem;
      height: auto;
      @include medium {
        font-size: 1.5rem;
      }
      @include large {
        font-size: 2rem;
      }
      @include extra-large {
        font-size: 2.5rem;
      }
      @include extra-small {
        font-size: 1rem;
      }
    }
  }
}
</style>
