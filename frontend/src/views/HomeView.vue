<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

// API URL берётся из env или используется относительный путь (для nginx proxy)
const API_URL = import.meta.env.VITE_API_URL || '/api'

const greetingResponse = ref<string>('')
const echoInput = ref<string>('{"hello": "world"}')
const echoResponse = ref<string>('')
const loading = ref({ greeting: false, echo: false })

async function fetchGreeting() {
  loading.value.greeting = true
  greetingResponse.value = ''
  try {
    const { data } = await axios.get(`${API_URL}/greetings`)
    greetingResponse.value = JSON.stringify(data, null, 2)
  } catch (error) {
    greetingResponse.value = `Error: ${error}`
  } finally {
    loading.value.greeting = false
  }
}

async function sendEcho() {
  loading.value.echo = true
  echoResponse.value = ''
  try {
    const payload = JSON.parse(echoInput.value)
    const { data } = await axios.post(`${API_URL}/echo`, payload)
    echoResponse.value = JSON.stringify(data, null, 2)
  } catch (error) {
    echoResponse.value = `Error: ${error}`
  } finally {
    loading.value.echo = false
  }
}
</script>

<template>
  <div class="p-6 max-w-2xl mx-auto space-y-8">
    <h1 class="text-3xl font-bold">API Tester</h1>

    <!-- GET /greetings -->
    <div class="border rounded-lg p-4 space-y-3">
      <h2 class="text-xl font-semibold">GET /greetings</h2>
      <button
        @click="fetchGreeting"
        :disabled="loading.greeting"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {{ loading.greeting ? 'Loading...' : 'Fetch Greeting' }}
      </button>
      <pre v-if="greetingResponse" class="bg-gray-100 p-3 rounded text-sm overflow-auto">{{ greetingResponse }}</pre>
    </div>

    <!-- POST /echo -->
    <div class="border rounded-lg p-4 space-y-3">
      <h2 class="text-xl font-semibold">POST /echo</h2>
      <textarea
        v-model="echoInput"
        rows="3"
        class="w-full border rounded p-2 font-mono text-sm"
        placeholder='Enter JSON, e.g. {"key": "value"}'
      ></textarea>
      <button
        @click="sendEcho"
        :disabled="loading.echo"
        class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
      >
        {{ loading.echo ? 'Sending...' : 'Send Echo' }}
      </button>
      <pre v-if="echoResponse" class="bg-gray-100 p-3 rounded text-sm overflow-auto">{{ echoResponse }}</pre>
    </div>
  </div>
</template>
