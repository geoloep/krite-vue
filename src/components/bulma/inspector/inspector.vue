<template>
    <div class="InspectorComponent">
        <div class="field">
            <label for="data-source" class="label">Laag:</label>
            <div class="control">
                <div class="select is-fullwidth">
                    <select id="data-source" v-model="layer">
                        <option :value="null"></option>
                        <option v-for="l in layers" :key="l" :value="l">{{l}}</option>
                    </select>
                </div>
            </div>
        </div>
        <bl-dropdown class="wide" v-model="toolDropdown" :items="tools">
            <div class="buttons is-fullwidth has-addons">
                <button class="button is-tool is-white" v-if="validTools.length > 0" @click="runTool">
                    <bl-icon :icon="tool.icon"></bl-icon>&nbsp;&nbsp; {{tool.lable}}</button>
                <button class="button is-tool is-white" v-else>
                    <bl-icon :icon="noTool.icon"></bl-icon>&nbsp;&nbsp; {{noTool.lable}}</button>
                <button class="button angle is-white" @click="toolDropdown = !toolDropdown" @blur="toolDropdown = false" :disabled="validTools.length === 0">
                    <bl-icon icon="mdi mdi-chevron-down"></bl-icon>
                </button>
            </div>
            <a slot="items" slot-scope="slot" class="dropdown-item" v-if="validTools.includes(slot.item.name)" @mousedown="setTool(slot.item)">
                <bl-icon :icon="slot.item.icon"></bl-icon> {{slot.item.lable}}
            </a>

        </bl-dropdown>
        <template v-if="features.length > 1">
            <label for="objects" class="label">Objecten:</label>
            <div class="field has-addons">
                <div class="control is-expanded">
                    <div class="select is-fullwidth">
                        <select name="object" id="objects" v-model="index">
                            <option v-for="(feature, index) in features" :key="feature.properties[namefield]" :value="index">{{feature.properties[namefield]}}</option>
                        </select>
                    </div>
                </div>
                <div class="control">
                    <button type="submit" class="button is-white" @click="shiftIndex(-1)">
                        <bl-icon icon="mdi mdi-chevron-left"></bl-icon>
                    </button>
                </div>
                <div class="control">
                    <button type="submit" class="button is-white" @click="shiftIndex(1)">
                        <bl-icon icon="mdi mdi-chevron-right"></bl-icon>
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
                    <tr v-for="(row, key) in parseProperties(features[index].properties)" :key="key">
                        <td>{{key}}</td>
                        <td v-html="row"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style>
.InspectorComponent .wide,
.InspectorComponent .dropdown-menu,
.InspectorComponent .dropdown-content,
.InspectorComponent .dropdown-trigger {
  width: 100%;
}

.InspectorComponent .wide {
  margin-bottom: 0.5rem;
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


<script src="./inspector.js"></script>
