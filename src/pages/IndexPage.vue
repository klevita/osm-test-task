<template>
  <q-page class="column items-center justify-evenly">
    <q-btn label="to chart" @click="router.push('chart')"></q-btn>
    <q-table style="width:80vw" :loading="loading" title="People" :rows-per-page-options="[0]" :rows="rows"
      :columns="columns" row-key="name">
      <template v-slot:pagination>
        <q-btn :disable="curPage === 1" icon="chevron_left" color="grey-8" round dense flat @click="nextPage(-1)" />
        <span>page {{ curPage }} / {{ Math.floor(count / 10) }}</span>
        <q-btn :disable="curPage + 1 > count / 10" icon="chevron_right" color="grey-8" round dense flat
          @click="nextPage(1)" />
      </template>
      <template v-slot:loading>
        <div class="fit light-dimmed absolute row justify-center items-center">
          <q-spinner size="72px" :thickness="4"></q-spinner>
        </div>
      </template>
    </q-table>

  </q-page>
</template>

<script setup lang="ts">
import PeopleService, { Creature } from 'src/services/PeopleService';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const columns = [
  {
    name: 'birth_year',
    label: 'Born',
    align: 'center',
    field: 'birth_year'
  },
  {
    label: 'Eyes',
    field: 'eye_color',
    align: 'center',
    name: 'eye_color',
  },
  {
    label: 'Gender',
    name: 'gender',
    align: 'center',
    field: 'gender',
  },
  {
    label: 'Hair',
    name: 'hair_color',
    align: 'center',
    field: 'hair_color'
  },
  {
    label: 'Height',
    align: 'center',
    name: 'height',
    field: 'height'
  },
  {
    label: 'Mass',
    align: 'center',
    name: 'mass',
    field: 'mass'
  },
  {
    label: 'Name',
    align: 'center',
    name: 'name',
    field: 'name'
  },
  {
    label: 'Skin',
    align: 'center',
    name: 'skin_color',
    field: 'skin_color'
  }
]
const rows = ref([] as Creature[])
const count = ref(0)
const loading = ref(true)
const curPage = ref(1)
async function nextPage(num: number) {
  if ((curPage.value + num) * 10 < count.value && curPage.value + num > 0) {
    loading.value = true
    curPage.value += num
    rows.value = (await PeopleService.getPeople(curPage.value)).results
    loading.value = false
  }
}
onMounted(async () => {
  const resp = await PeopleService.getPeople(curPage.value)
  count.value = resp.count
  rows.value = resp.results
  loading.value = false
})

</script>
