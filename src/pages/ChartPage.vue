<template>
  <q-page class="column items-center justify-evenly">
    <q-btn label="to table" @click="router.push('/')"></q-btn>
    <div style="width:800px;height:620px;" id="chart">

    </div>
  </q-page>
</template>
<script lang="ts" setup>
import ApexCharts from 'apexcharts'
import { useRouter } from 'vue-router';
import PeopleService, { Creature } from 'src/services/PeopleService';
import { onMounted, ref } from 'vue';

const router = useRouter()
const series = ref([] as Creature[])

onMounted(async () => {
  const resp = await Promise.all([PeopleService.getPeople(1), PeopleService.getPeople(2)])
  const data = [...resp[0].results, ...resp[1].results]
  const seriesData = data.map((v) => {
    return {
      x: v.name,
      y: v.height
    }
  })
  console.log(seriesData)
  var options = {
    chart: {
      type: 'bar',
      width: '800px',
      height: '600px'
    },
    series: [{
      name: 'Height',
      data: seriesData
    }]
  }
  var chart = new ApexCharts(document.querySelector("#chart"), options);

  chart.render();
})

</script>
