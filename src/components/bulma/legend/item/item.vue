<template>
    <div class="LegendItem">
        <div class="level">
            <div class="level-left">
                <h3 class="level-item title is-6">{{title}}</h3>
            </div>
            <div class="level-right">
                <a class="level-item is-marginless" @click="top"><bl-icon icon="mdi mdi-chevron-double-up"></bl-icon></a>
                <a class="level-item is-marginless" :class="legend ? '' : 'has-text-grey'" @click="toggleLegend"><bl-icon icon="mdi mdi-format-list-bulleted-type"></bl-icon></a>
                <a class="level-item is-marginless" :class="visible ? '' : 'has-text-grey'" @click="toggleVisibility"><bl-icon icon="mdi mdi-eye"></bl-icon></a>
                <a class="level-item is-marginless" v-if="inspector" @click="inspect"><bl-icon icon="mdi mdi-help-circle"></bl-icon></a>
                <a class="level-item is-marginless" @click="remove"><bl-icon icon="mdi mdi-delete"></bl-icon></a>
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
