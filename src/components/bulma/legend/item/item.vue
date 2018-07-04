<template>
    <div class="LegendItem">
        <div class="level">
            <div class="level-left">
                <h3 class="level-item title is-6">{{title}}</h3>
            </div>
            <div class="level-right">
                <a class="level-item is-marginless" @click="top"><vb-icon icon="mdi mdi-chevron-double-up"></vb-icon></a>
                <a class="level-item is-marginless" :class="legend ? '' : 'has-text-grey'" @click="toggleLegend"><vb-icon icon="mdi mdi-format-list-bulleted-type"></vb-icon></a>
                <a class="level-item is-marginless" :class="visible ? '' : 'has-text-grey'" @click="toggleVisibility"><vb-icon icon="mdi mdi-eye"></vb-icon></a>
                <a class="level-item is-marginless" v-if="inspector" @click="inspect"><vb-icon icon="mdi mdi-help-circle"></vb-icon></a>
                <a class="level-item is-marginless" @click="remove"><vb-icon icon="mdi mdi-delete"></vb-icon></a>
            </div>
        </div>
        <div v-show="legend" v-html="html"></div>
    </div>
</template>

<style>
.LegendItem {
    margin-bottom: 1rem;
}
</style>

<script src="./item.js"></script>
