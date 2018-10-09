<template>
    <div class="legend-item">
        <div class="level">
            <div class="level-left">
                <h3 class="level-item subtitle has-text-black is-4">{{title}}</h3>
            </div>
            <div class="level-right">
                <a class="level-item is-marginless" @click="top">
                    <div class="icon is-medium"><kv-mdi-chevron-up></kv-mdi-chevron-up></div>
                </a>
                <a class="level-item is-marginless" :class="legend ? '' : 'has-text-grey'" @click="toggleLegend">
                    <div class="icon is-medium"><kv-mdi-list></kv-mdi-list></div>
                </a>
                <a class="level-item is-marginless" :class="visible ? '' : 'has-text-grey'" @click="toggleVisibility">
                    <div class="icon is-medium"><kv-mdi-eye></kv-mdi-eye></div>
                </a>
                <a class="level-item is-marginless" v-if="inspector" @click="inspect">
                    <div class="icon is-medium"><kv-mdi-inspect></kv-mdi-inspect></div>
                </a>
                <a class="level-item is-marginless" @click="remove">
                    <div class="icon is-medium"><kv-mdi-delete></kv-mdi-delete></div>
                </a>
            </div>
        </div>
        <div v-show="legend" v-html="html"></div>
    </div>
</template>

<style>
.item {
  margin-bottom: 1rem;
}

.legend-item .material-design-icon__svg{
    width: 1.3rem !important;
    height: 1.3rem !important;
}
</style>

<script src="./item.js"></script>
