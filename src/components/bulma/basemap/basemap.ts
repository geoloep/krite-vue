import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import { IDataSource, ILayer } from 'krite/lib/types';
import { MapService } from 'krite/lib/services/map';

@Component
export default class BasemapComponent extends Vue {
    @Prop()
    source: string;

    @Prop()
    layers: string[] | undefined;

    // @Prop({ default: () => {} })
    // assign: any;

    basemaps: ILayer[] = [];

    mounted() {
        this.loadBasemaps();
    }

    async loadBasemaps() {
        let layers;
        let layer;

        const source = this.$krite.getSource(this.source)

        if (this.layers) {
            layers = this.layers;
        } else {
            layers = await source.getLayerNames();
        }

        for (const layerName of layers) {
            layer = await source.getLayer(layerName);
            
            if (layer.added) {
                layer.added(this.$krite);
            }

            this.basemaps.push(layer);
        }

    }

    setBasemap(context: ILayer) {
        if (this.$listeners.choice) {
            this.$emit('choice', context);
        } else {
            this.$krite.getService<MapService>('MapService').setBaseMap(context);
        }
    }
}
