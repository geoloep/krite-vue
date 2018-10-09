<template>
    <div class="LayerBrowserComponent">
        <div class="columns">
            <div class="column">
                <div class="field">
                    <label for="data-source" class="label">Databron:</label>
                    <div class="control">
                        <div class="select is-fullwidth">
                            <select id="data-source" v-model="localSource">
                                <option :value="null"></option>
                                <option v-for="s in sources" :key="s" :value="s">{{s}}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="field">
                    <div class="control has-icons-right">
                        <input type="text" class="input" placeholder="Filteren" v-model="filter">
                        <div class="icon is-right"><kv-mdi-magnify></kv-mdi-magnify></div>
                    </div>
                </div>
                <table class="table is-bordered is-hoverable is-fullwidth" v-if="localSource">
                    <tbody>
                        <tr v-for="name in filteredLayers" :key="name" @click="selectLayer(name)">
                            <td>{{name}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="column">
                <template v-if="localLayer">
                    <h3 class="title is-6">{{localLayer}}</h3>
                    <section class="section" v-html="preview"></section>
                    <p>{{abstract}}</p>
                </template>
            </div>
        </div>
        <template v-if="!isButtonless">
            <hr>
            <div class="level">
                <div class="level-left"></div>
                <div class="level-right">
                    <div class="level-item">
                        <button class="button is-white" @click="add">
                            <div class="icon"><kv-mdi-link-variant></kv-mdi-link-variant></div> &nbsp; Permalink</button>
                    </div>
                    <div class="level-item">
                        <button class="button is-primary" @click="add">
                            <div class="icon"><kv-mdi-link-variant></kv-mdi-link-variant></div>&nbsp; Laag toevoegen</button>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<style scoped>
.table {
  cursor: pointer;
}
</style>


<script src="./layerBrowser.js"></script>
