<template>
  <div>
    <GraphHeader
      title="monthly ex tax sales"
      v-bind:subtitle="currentYearExTax"
      @onYearPick="fetchData($event)"
    />
    <el-card v-loading="loadingData" class="box-card" id="graphContent">
      <bar-chart
        :chart-data="chartData"
        ref="barChart"
        options="options"
        :width="200"
        :height="150"
      ></bar-chart>
    </el-card>
  </div>
</template>

<script>
import GraphHeader from "./GraphHeader.vue";
import BarChart from "./BarChart.vue";
import axios from "axios";

export default {
  name: "ExTaxGraph",
  components: {
    GraphHeader,
    BarChart
  },

  data() {
    return {
      dbData: null,
      year: 2018,
      currentYearExTax: null,
      chartData: {},
      loadingData: false,
      options: {}
    };
  },

  created() {
    this.fetchData(this.year);
  },

  methods: {
    fetchData(year) {
      this.loadingData = true;
      this.year = year;
      let self = this;
      axios
        .get("http://circlesofttest.markhermano.com/api/v1/extaxsales/" + year)
        .then(res => {
          this.loadingData = false;
          self.dbData = res.data.data;
          this.fillData();
        })
        .catch(err => {
          throw new Error(err);
        });
    },

    fillData() {
      this.chartData = {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ],
        datasets: [
          {
            label: "Ex Tax Sales",
            pointBackgroundColor: "white",
            pointBorderColor: "white",
            backgroundColor: this.setGraphColor(),
            hoverBackgroundColor: "#3F5972",
            data: this.getMonthlyData(this.dbData)
          }
        ]
      };
    },

    getMonthlyData(data) {
      let sumOfExTax = [];

      data.forEach(element => {
        let date = new Date(element.trans_date);
        let month = date.getMonth();
        if (sumOfExTax[month] === undefined) {
          sumOfExTax.push(element.trans_total_extax_value);
        } else {
          sumOfExTax[month] += element.trans_total_extax_value;
        }
      });

      const finalExTax = sumOfExTax.map(total => Math.round(total * 100) / 100);
      this.currentYearExTax =
        "<span style='font-weight:bold'>" +
        finalExTax.reduce((x, y) => x + y, 0) +
        "</span> Total Ex Tax Sales";
      return finalExTax;
    },

    setGraphColor() {
      let gradient = this.$refs.barChart.$refs.canvas
        .getContext("2d")
        .createLinearGradient(0, 0, 0, 300);

      gradient.addColorStop(0.75, "#009fc5");
      gradient.addColorStop(1, "#3cecb0");

      return (this.graphColor = gradient);
    },

    setOptions() {
      this.options = {
        responsive: true,
        animation: {
          easing: "easeInOutBack"
        },
        height: 350,
        scales: {
          yAxes: [
            {
              ticks: {
                stepSize: 2000,
                beginAtZero: true,
                padding: 1
              }
            }
          ]
        }
      };
    }
  }
};
</script>

<style scoped lang="scss">
#graphContent:hover {
  box-shadow: 0 0px 50px 10px #3cecb1a8;
}
</style>
