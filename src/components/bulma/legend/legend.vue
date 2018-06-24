<template>
    <div class="LegendComponent">
        <legend-item v-for="(layer, key) in layers" :key="key" :layer="layer"></legend-item>
    </div>
</template>

<script src="./legend.js"></script>
