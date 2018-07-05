# krite-vue
Vue components for krite map applications.

## Dependencies
Unlike [krite](https://github.com/geoloep/krite) itself this project is opinionated and relies on two main dependencies

* [Bulmalite](https://github.com/ynte/bulmalite) for bulma vue components
* [Material design icons](https://materialdesignicons.com/)

*The bootstrap components are currently outdated!*

## Usage

### Vue plugin
Krite-vue includes a vue plugin that binds a single krite instance to your vue application. This makes the map state available to all components in your webapp. 

```javascript
import Vue from 'vue';
import KritePlugin from 'krite-vue/lib/plugins/krite';

// Register the plugin
Vue.use(KritePlugin);

const krite = new Krite();

// Configure krite instance...

// Add the krite instance to the component options
const app = new Vue({
    el: '#app',
    krite,
    ...
})
```

A reference to the krite instance is now available in your view models
```javascript
const component = new Vue({
    methods: {
        zoomTo: function(point) {
            this.$krite.map.zoomToPoint(point);
        },
    },
    ...
});
```

### Components
Register krite-vue components to use them in your webapp

```javascript
import MapComponent from 'krite-vue/lib/components/map/map.vue';
import LegendComponent from 'krite-vue/lib/components/bulma/legend/legend.vue';

const component = new Vue({
    copmponents: {
        kriteMap: MapComponent,
        kriteLegend: LegendComponent,
    },
    ...
});
```

```html
<template>
    <div id="app">
        <div id="map-container">
            <krite-map></krite-map>
        </div>
        <div id="legend-container">
            <krite-legend></krite-legend>
        </div>
    </div>
</template>
```

## Development
Krite-ve is developed using typescript. View models are class style and contained in a seperate .ts file.

Compile the typescript files with either `tsc -d`, `tsc -d -w` or `npm run dev`. To transfer the .vue template files from /src to /lib you can use the included script by running `npm run collect`.
