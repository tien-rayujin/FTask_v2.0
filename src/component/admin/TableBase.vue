<template>
  <table class="table-auto w-full">
    <thead>
      <tr>
        <th
          v-for="(column, idx) in columns"
          :key="idx"
          class="p-2 text-left uppercase text-[#8392ab] text-[0.65rem]"
        >
          {{ column.label ? column.label : column.key }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, rowIdx) in items" :key="rowIdx">
        <td
          v-for="(column, cellIdx) in columns"
          :key="cellIdx"
          class="p-2 border-t border-slate-300"
        >
          <slot :name="`cell-${column.key}`" :item="item" :column="column">
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
  import type {
    ItemModel,
    ColumnModel,
  } from '@/views/admin/management/ManageLecturer.vue'
  defineProps({
    columns: {
      type: Array<ColumnModel>,
      required: true,
    },
    items: {
      type: Array<ItemModel>,
      required: true,
    },
  })
</script>
