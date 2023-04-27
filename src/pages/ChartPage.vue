<template>
  <q-page class="column items-center justify-evenly">
    <q-btn label="to table" @click="router.push('/')"></q-btn>
    <div style="width:800px;height:620px;" id="chart" v-show="!loading"></div>
    <div v-show="loading" style="width:800px;height:620px" class="row justify-center items-center">
      <q-spinner size="72px" :thickness="4"></q-spinner>
    </div>
  </q-page>
</template>
<script lang="ts" setup>
import ApexCharts from 'apexcharts'
import { useRouter } from 'vue-router';
import PeopleService from 'src/services/PeopleService';
import { onMounted, ref } from 'vue';



const router = useRouter()
const loading = ref(true)

onMounted(async () => {
  const resp = await Promise.all([PeopleService.getPeople(1), PeopleService.getPeople(2)])
  const data = [...resp[0].results, ...resp[1].results]
  const seriesData = data.map((v) => {
    return {
      x: v.name,
      y: v.height
    }
  })
  const options = {
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
  const chart = new ApexCharts(document.querySelector('#chart'), options);
  loading.value = false
  chart.render();
})

</script>
