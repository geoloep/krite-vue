<template>
    <div class="PdokSearchComponent">
        <bl-dropdown class="wide" v-model="visible" is-clickable is-reactive will-blur>
            <div class="control has-icons-right" :class="{'is-loading': loading}">
                <input
                    class="input"
                    type="search"
                    placeholder="Locatie zoeken"
                    :value="searchString"
                    @input="searchStringChanged"
                    @keydown.prevent.down="selectDown"
                    @keydown.prevent.up="selectUp"
                    @keydown.prevent.enter="selectEnter"
                />
                <span class="icon is-right">
                    <kv-magnify class="is-size-4"></kv-magnify>
                </span>
            </div>
            <template #content>
                <a class="dropdown-item is-flex is-size-6" v-if="failed">
                    <slot name="error">
                        <kv-alert class="has-text-danger is-size-5" />&nbsp;Zoekopdracht mislukt
                    </slot>
                </a>
                <slot name="empty" v-if="results.length === 0"></slot>
                <a
                    v-for="(item, key) in results"
                    :key="key"
                    class="dropdown-item"
                    :class="item === highlighted ? 'is-active' : ''"
                    @mousedown="searchClick(item)"
                >
                    <slot :item="item">{{item.weergavenaam}}</slot>
                </a>
            </template>
        </bl-dropdown>
    </div>
</template>


<style>
.PdokSearchComponent .wide,
.dropdown-trigger {
    width: 100%;
}
.PdokSearchComponent .material-design-icon {
    margin-right: .75rem;
}
</style>

<script src="./pdokSearch.js"></script>