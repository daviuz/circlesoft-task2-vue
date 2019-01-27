<template>
  <el-card class="box-card">
    <h2>{{title}}</h2>
    <p v-html="subtitle">{{subtitle}}</p>
    <el-date-picker
      @change="onYearPick"
      v-model="defaultValue"
      type="year"
      placeholder="Pick a year"
    ></el-date-picker>
  </el-card>
</template>

<script>
export default {
  name: "GraphHeader",
  props: ["title", "subtitle"],
  data() {
    return {
      defaultValue: "2018"
    };
  },
  created() {
    console.log(this.subtitle);
  },
  methods: {
    onYearPick: function() {
      this.$emit("onYearPick", this.defaultValue.getFullYear());
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../style.scss";
.el-card {
  background: #009fc5;
  background: linear-gradient(to right, #009fc5, #3cecb0);
  text-align: center;
  margin-bottom: 10px;

  h2 {
    color: white;
    font-size: 0.95rem;
    text-transform: capitalize;

    @include medium {
      font-size: 1rem;
    }
    @include large {
      font-size: 1.5rem;
    }
    @include extra-large {
      font-size: 2rem;
    }
    @include extra-small {
      font-size: 0.95rem;
    }
  }

  p {
    color: white;
    font-size: 0.75rem;
    text-transform: capitalize;

    @include medium {
      font-size: 0.75rem;
    }
    @include large {
      font-size: 1rem;
    }
    @include extra-large {
      font-size: 1.15rem;
    }
    @include extra-small {
      font-size: 0.75rem;
    }
  }
  div.el-input [data-v-557c340a] div.el-input input {
    background: transparent;
    color: white;
    border: none;
  }
}
</style>
