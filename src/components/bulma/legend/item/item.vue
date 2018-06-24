<template>
    <div>
        <div class="level">
            <div class="level-left">
                <div class="level-item">{{layer}}</div>
            </div>
            <div class="level-right">
                <a class="level-item is-marginless" @click="top"><vb-icon icon="mdi mdi-chevron-double-up"></vb-icon></a>
                <a class="level-item is-marginless" :class="legend ? '' : 'has-text-grey'" @click="toggleLegend"><vb-icon icon="mdi mdi-format-list-bulleted-type"></vb-icon></a>
                <a class="level-item is-marginless" :class="visible ? '' : 'has-text-grey'" @click="toggleVisibility"><vb-icon icon="mdi mdi-eye"></vb-icon></a>
                <a class="level-item is-marginless" @click="remove"><vb-icon icon="mdi mdi-delete"></vb-icon></a>
            </div>
        </div>
        <div v-show="legend" v-html="html"></div>
    </div>
</template>

<script src="./item.js"></script>
