<template>
   <div class="card text-success-content" :class="color">
        <div class="card-body">
        <h2 class="card-title">{{title}}</h2>
        <p class="text-2xl font-bold">${{data}}</p>
        </div>
    </div>
</template>
  
<script setup>
const props = defineProps(['title','data','color'])


</script>