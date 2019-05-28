<template>
    <div class="krite-inspector">
        <div class="field">
            <label for="data-source" class="label">Laag:</label>
            <div class="control">
                <div class="select is-fullwidth">
                    <select id="data-source" v-model="layer">
                        <option :value="null"></option>
                        <option v-for="layer in layers" :key="layer" :value="layer">{{layer}}</option>
                    </select>
                </div>
            </div>
        </div>
        <article class="message" v-if="!layer">
            <div class="message-body is-flex">
                <kv-none></kv-none>&nbsp; Geen laag geselecteerd
            </div>
        </article>
        <template v-else-if="validTools.length > 1">
            <label for="data-source" class="label">Cursor:</label>
            <bl-tabs class="is-fullwidth is-toggle" :items="tools" v-model="tool">
                <template #default="scope">
                    <a class="is-disabled">
                        <component :is="scope.item.icon"/>
                    </a>
                </template>
            </bl-tabs>
        </template>
        <article v-else-if="validTools.length === 0" class="message">
            <div class="message-body is-flex">
                <kv-none></kv-none>&nbsp; Deze laag is niet bevraagbaar
            </div>
        </article>
        <template v-if="features.length > 1">
            <label for="objects" class="label">Objecten:</label>
            <div class="field has-addons">
                <div class="control is-expanded">
                    <div class="select is-fullwidth">
                        <select name="object" id="objects" v-model="index">
                            <option
                                v-for="(feature, index) in features"
                                :key="feature.properties[namefield]"
                                :value="index"
                            >{{feature.properties[namefield]}}</option>
                        </select>
                    </div>
                </div>
                <div class="control">
                    <button type="submit" class="button" @click="shiftIndex(-1)">
                        <div class="icon">
                            <kv-left></kv-left>
                        </div>
                    </button>
                </div>
                <div class="control">
                    <button type="submit" class="button" @click="shiftIndex(1)">
                        <div class="icon">
                            <kv-right></kv-right>
                        </div>
                    </button>
                </div>
            </div>
        </template>
        <div class="table-wrapper">
            <table class="table is-hoverable is-striped is-fullwidth" v-if="features.length > 0">
                <tbody>
                    <tr>
                        <th>Attribuut</th>
                        <th>Waarde</th>
                    </tr>
                    <tr
                        v-for="(row, key) in parseProperties(features[index].properties)"
                        :key="key"
                    >
                        <td>{{key}}</td>
                        <td v-html="row"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style>
.krite-inspector .wide,
.krite-inspector .dropdown-menu,
.krite-inspector .dropdown-content,
.krite-inspector .dropdown-trigger {
    width: 100%;
}

.krite-inspector .wide {
    margin-bottom: 0.5rem;
}

.krite-inspector .material-design-icon__svg,
.krite-inspector .material-design-icon {
    width: 1.3rem !important;
    height: 1.3rem !important;
}
</style>

<style scoped>
.is-tool {
    flex-grow: 1;
}

.table {
    margin-top: 0.5rem;
}

.table-wrapper {
    width: 100;
    overflow-x: auto;
}
</style>


<script src="./inspector.ts" lang="ts"></script>
