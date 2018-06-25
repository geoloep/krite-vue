<template>
    <div class="LayerBrowserComponent">
        <div class="columns">
            <div class="column">
                <div class="field">
                    <label for="data-source" class="label">Databron:</label>
                    <div class="control">
                        <div class="select is-fullwidth">
                            <select id="data-source" v-model="source">
                                <option :value="null"></option>
                                <option v-for="s in sources" :key="s" :value="s">{{s}}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="field">
                    <div class="control has-icons-right">
                        <input type="text" class="input" placeholder="Filteren" v-model="filter">
                        <vb-icon class="is-right has-text-black" icon="mdi mdi-magnify"></vb-icon>
                    </div>
                </div>
                <table class="table is-bordered is-hoverable is-fullwidth" v-if="source">
                    <tbody>
                        <tr v-for="name in filteredLayers" :key="name" @click="selectLayer(name)">
                            <td>{{name}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="column">
                <template v-if="layer">
                    <h3 class="title is-6">{{layer}}</h3>
                    <section class="section" v-html="preview"></section>
                    <p>{{abstract}}</p>
                </template>
            </div>
        </div>
        <hr>
        <div class="level">
            <div class="level-left"></div>
            <div class="level-right">
                <div class="level-item">
                    <button class="button is-white" @click="add"><vb-icon icon="mdi mdi-link-variant"></vb-icon>&nbsp; Permalink</button>
                </div>
                <div class="level-item">
                    <button class="button is-primary" @click="add"><vb-icon icon="mdi mdi-plus mdi-24px"></vb-icon>&nbsp; Laag toevoegen</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.table {
  cursor: pointer;
}
</style>


<script src="./layerBrowser.js"></script>
