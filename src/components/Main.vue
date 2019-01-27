<template>
  <el-row type="flex" justify="center" :gutter="30">
    <el-col :xs="22" :sm="15" :md="10" :lg="8" :xl="8">
      <ExTaxGraph/>
    </el-col>
    <el-col :xs="22" :sm="15" :md="10" :lg="8" :xl="8">
      <GrossProfitGraph/>
    </el-col>
  </el-row>
</template>

<script>
import ExTaxGraph from "./ExTaxGraph.vue";
import GrossProfitGraph from "./GrossProfitGraph.vue";

export default {
  name: "Main",
  components: {
    ExTaxGraph,
    GrossProfitGraph
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// @import "../style.scss";
.el-row {
  flex-wrap: wrap;
  margin-left: 0 !important;
  margin-right: 0 !important;
  .el-col {
    margin: 40px 0;
  }
}
</style>
