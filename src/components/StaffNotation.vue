<template>
  <div class="staff">
    <div class="lines">
      <div v-for="n in 5" :key="n" class="line" />
    </div>
    <div class="notes">
      <span
        v-for="(note, i) in notesInScale"
        :key="i"
        class="note"
        :style="{ left: `${i * 40}px` }"
      >●</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  root: String,
  scaleName: String,
  noteNames: Array,
  scales: Object,
})

// TODO: propsからスケール音を計算して notesInScale に流す
const notesInScale = computed(() => {
  return ['C', 'D', 'E', 'F', 'G'] // 仮データ
})
</script>

<style scoped>
.staff {
  position: relative;
  height: 120px;
  margin: 20px auto;
  border: 1px solid #ccc;
  background: #fff;
}
.lines {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.line {
  border-top: 1px solid black;
}
.note {
  position: absolute;
  bottom: 40px;
  font-size: 20px;
}
</style>
