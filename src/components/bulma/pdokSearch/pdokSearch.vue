<template>
    <div class="PdokSearchComponent">
        <bl-dropdown class="wide" v-model="visible" is-clickable is-reactive is-blurable>
            <div class="control" :class="loading ? 'is-loading is-medium' : ''">
                <input class="input" type="search" placeholder="Adres zoeken" v-model="searchString" @keydown.prevent.down="selectDown" @keydown.prevent.up="selectUp" @keydown.prevent.enter="selectEnter">
            </div>
            <a slot="content" v-for="(item, key) in results" :key="key" class="dropdown-item" :class="item === highlighted ? 'is-active' : ''" @mousedown="searchClick(item)">
                <slot :item="item">{{item.weergavenaam}}</slot>
            </a>
        </bl-dropdown>
    </div>
</template>

<style>
.PdokSearchComponent .wide,
.dropdown-trigger {
  width: 100%;
}
</style>

<script src="./pdokSearch.js"></script>