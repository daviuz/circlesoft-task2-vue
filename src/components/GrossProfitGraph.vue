<template>
  <div>
    <GraphHeader
      title="gross profit"
      v-bind:subtitle="profitMargin"
      @onYearPick="fetchData($event)"
    />
    <el-card v-loading="loadingData" class="box-card" id="graphContent">
      <line-chart
        :chart-data="chartData"
        ref="barChart"
        options="options"
        :width="200"
        :height="150"
      ></line-chart>
    </el-card>
  </div>
</template>

<script>
import GraphHeader from "./GraphHeader.vue";
import LineChart from "./LineChart.vue";
import axios from "axios";

export default {
  name: "GrossProfitGraph",
  components: {
    GraphHeader,
    LineChart
  },

  data() {
    return {
      dbData: null,
      year: 2018,
      profitMargin: null,
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
        .get("http://circlesofttest.markhermano.com/api/v1/grossprofit/" + year)
        .then(res => {
          this.loadingData = false;
          self.dbData = res.data.data;
          this.fillData();
          this.getGrowthPercentage(this.dbData);
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
            label: this.year + " Gross Profit",
            pointBackgroundColor: "#3BEAB0",
            pointBorderColor: "#3BEAB0",
            pointBorderWidth: 7,
            borderColor: "darkcyan",
            borderWidth: 3,
            lineWidth: 5,
            pointRadius: 3,
            backgroundColor: this.setGraphColor(this.year),
            data: this.getMonthlyData(this.dbData, this.year)
          },
          {
            label: this.year - 1 + " Gross Profit",
            pointBackgroundColor: "#b3b067",
            pointBorderColor: "#b3b067",
            pointBorderWidth: 7,
            borderColor: "#826e09",
            borderWidth: 3,
            lineWidth: 5,
            pointRadius: 3,
            backgroundColor: this.setGraphColor(this.year - 1),
            data: this.getMonthlyData(this.dbData, this.year - 1)
          }
        ]
      };
    },

    getMonthlyData(data, year) {
      let monthlyGrossProfit = [];

      data.forEach(element => {
        let date = new Date(element.trans_date);
        let month = date.getMonth();
        let dataYear = date.getFullYear();
        if (dataYear === year) {
          let profit = this.getProfit(
            element.trans_total_extax_value,
            element.last_buy_price
          );
          if (monthlyGrossProfit[month] === undefined) {
            monthlyGrossProfit.push(profit);
          } else {
            monthlyGrossProfit[month] += profit;
          }
        }
      });

      const finalResult = monthlyGrossProfit.map(
        total => Math.round(total * 100) / 100
      );

      return finalResult;
    },

    getProfit(revenue, cost) {
      let profit = revenue - cost;
      return profit;
    },

    getGrowthPercentage(data) {
      let currentYearGrossProfit = 0;
      let previousYearGrossProfit = 0;

      data.forEach(element => {
        let date = new Date(element.trans_date);
        let dataYear = date.getFullYear();
        let profit = this.getProfit(
          element.trans_total_extax_value,
          element.last_buy_price
        );
        if (dataYear === this.year) {
          currentYearGrossProfit += profit;
        } else {
          previousYearGrossProfit += profit;
        }
      });

      let finalResult = currentYearGrossProfit - previousYearGrossProfit;
      finalResult = (finalResult / previousYearGrossProfit) * 100;
      finalResult = Math.round(finalResult);

      let icon =
        finalResult >= 0
          ? '<i class="el-icon-caret-top" style="color:lime"></i> '
          : '<i class="el-icon-caret-bottom" style="color:red"></i> ';
      this.profitMargin =
        "<span style='font-weight:bold'>" +
        icon +
        finalResult +
        "%</span> from the previous year";
    },

    setGraphColor(year) {
      let color1 =
        this.year === year
          ? "rgba(0, 159, 197, 0.28)"
          : "rgba(197, 0, 0, 0.08)";
      let color2 =
        this.year === year
          ? "rgba(60, 236, 176, 0.28)"
          : "rgba(236, 231, 60, 0.08)";

      let gradient = this.$refs.barChart.$refs.canvas
        .getContext("2d")
        .createLinearGradient(0, 0, 250, 0);
      gradient.addColorStop(0.5, color1);
      gradient.addColorStop(1, color2);

      return (this.graphColor = gradient);
    },

    setOptions() {
      this.options = {
        responsive: true,
        maintainAspectRatio: true,
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
