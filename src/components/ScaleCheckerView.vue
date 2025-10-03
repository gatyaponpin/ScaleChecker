<template>
  <v-responsive class="pt-1 mx-auto" max-width="1100">
    <!-- コントロール -->
    <v-row class="mb-4 g-2" align="center">
      <v-col cols="3">
        <v-select
          class="w-100"
          v-model="root"
          :items="NOTE_NAMES"
          label="ルート音"
          variant="outlined"
          density="comfortable"
          hide-details
        />
      </v-col>

      <v-col cols="6">
        <v-select
          class="w-100"
          v-model="scaleName"
          :items="Object.keys(SCALES)"
          label="スケール"
          variant="outlined"
          density="comfortable"
          hide-details
        />
      </v-col>

      <v-col cols="3">
        <v-select
          class="w-100"
          v-model="octaves"
          :items="[1,2,3]"
          label="オクターブ"
          variant="outlined"
          density="comfortable"
          hide-details
        />
      </v-col>

      <!-- 将来的に追加予定の表示モード切替 -->
      <!--
      <v-col cols="12" md="4">
        <v-select
          v-model="displayMode"
          :items="['keyboard', 'staff']"
          label="表示モード"
          variant="outlined"
          density="comfortable"
          hide-details
        />
      </v-col>
      -->
    </v-row>

    <!-- 表示コンポーネント -->
    <div class="keyboard-wrapper">
      <PianoKeyboard
        :root="root"
        :scale-name="scaleName"
        :octaves="octaves"
        :show-labels="showLabels"
        :note-names="NOTE_NAMES"
        :scales="SCALES"
      />
    </div>

    <!-- <StaffNotation
      v-else
      :root="root"
      :scale-name="scaleName"
      :note-names="NOTE_NAMES"
      :scales="SCALES"
    /> -->
  </v-responsive>
</template>

<script setup>
import { ref } from 'vue'
import PianoKeyboard from './PianoKeyboard.vue'
// import StaffNotation from './StaffNotation.vue'

import { NOTE_NAMES, SCALES } from '../constants/music.js'

// コントロールの状態
// const displayMode = ref('keyboard')
const root = ref('C')
const scaleName = ref('メジャー')
const octaves = ref(2)
</script>

<style>
.keyboard-wrapper{
  overflow-x: auto;
  overflow-y: hidden;
  max-width: 100%;
}
</style>
