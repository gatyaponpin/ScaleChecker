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

    <v-main class="d-flex align-center justify-center">
      <v-container class="py-8">
        <ScaleChecker />
      </v-container>
    </v-main>

    <HelpModal v-model="showHelp" />
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import ScaleChecker from '@/components/ScaleCheckerView.vue'
import HelpModal from './components/HelpModal.vue'

const showHelp = ref(false)
</script>