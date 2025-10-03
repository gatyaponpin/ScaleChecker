<template>
  <div class="scale-piano">
    <!-- コントロール -->
    <v-row class="mb-4" align="center" no-gutters>
      <v-col cols="12" md="3" class="pr-md-3 mb-2 mb-md-0">
        <v-select
          v-model="root"
          :items="NOTE_NAMES"
          label="ルート音"
          variant="outlined"
          density="comfortable"
          hide-details
        />
      </v-col>

      <v-col cols="12" md="5" class="pr-md-3 mb-2 mb-md-0">
        <v-select
          v-model="scaleName"
          :items="Object.keys(SCALES)"
          label="スケール"
          variant="outlined"
          density="comfortable"
          hide-details
        />
      </v-col>

      <v-col cols="12" md="4">
        <v-select
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

      <v-col cols="12" class="d-flex align-center ga-4 mt-2">
        <v-switch
          v-model="showLabels"
          density="comfortable"
          color="primary"
          inset
          hide-details
          label="ラベルを表示する"
        />
      </v-col>
    </v-row>

    <!-- 表示コンポーネント -->
    <PianoKeyboard
      :root="root"
      :scale-name="scaleName"
      :octaves="octaves"
      :show-labels="showLabels"
      :note-names="NOTE_NAMES"
      :scales="SCALES"
    />

    <!-- <StaffNotation
      v-else
      :root="root"
      :scale-name="scaleName"
      :note-names="NOTE_NAMES"
      :scales="SCALES"
    /> -->

    <!-- ヘルプモーダル -->
    <HelpModal v-model="showHelp" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PianoKeyboard from './PianoKeyboard.vue'
import HelpModal from './HelpModal.vue' // 追加：ヘルプモーダル
// StaffNotation を別ファイルで定義している場合はインポートしてください
// import StaffNotation from './StaffNotation.vue'

import { NOTE_NAMES, SCALES } from '../constants/music.js'

// コントロールの状態
const displayMode = ref('keyboard')
const root = ref('C')
const scaleName = ref('メジャー')
const octaves = ref(2)
const showLabels = ref(true)

// 追加：ヘルプ表示制御
const showHelp = ref(false)
</script>

<style>

</style>
