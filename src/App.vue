<template>
  <v-app>
     <v-app-bar app color="primary" density="comfortable">
      <v-app-bar-title class="text-h6 text-white">
        Scale Checker
      </v-app-bar-title>

      <v-spacer />

      <v-btn
        icon
        variant="text"
        @click="showHelp = true"
        aria-label="ヘルプを開く"
      >
        <v-icon class="text-white">mdi-help-circle-outline</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container class="d-flex align-center justify-center" style="height: 100vh;">
        <ScaleChecker />
      </v-container>
    </v-main>

    <HelpModal v-model="showHelp" />
  </v-app>
</template>

<script>
import ScaleChecker from '@/components/ScaleCheckerView.vue'
export default { components: { ScaleChecker } }

import { ref } from 'vue'
import HelpModal from './components/HelpModal.vue'

const showHelp = ref(false)
</script>