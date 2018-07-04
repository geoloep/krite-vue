import { Component, Vue, Watch, Prop } from 'vue-property-decorator';

@Component
export default class LayerBrowser extends Vue {
    @Prop()
    source: string;

    @Prop()
    layer: string;

    @Prop(Boolean)
    isButtonless: boolean;

    sources: any = [];

    localSource: string | null = null;
    layers: string[] = [];

    filter = '';

    localLayer: string | null = null;

    preview: string | null = null;
    abstract: string | null = null;

    mounted() {
        this.sources = this.$krite.source.list;

        this.$emit('update:source', null);
        this.$emit('update:layer', null);
    }

    get filteredLayers() {
        const filter = this.filter.toLowerCase();

        return this.layers.filter((value: string) => {
            return value.toLowerCase().indexOf(filter) >= 0;
        });
    }

    @Watch('localSource')
    async sourceChanged(val: string | null) {
        if (val) {
            this.$emit('update:source', val);
            this.$emit('update:layer', null);

            this.layers = await this.$krite.getSource(val).getLayerNames();
        } else {
            this.$emit('update:source', null);
            this.$emit('update:layer', null);
        }
    }

    async selectLayer(name: string) {
        this.localLayer = name;

        if (this.source) {
            const layer = await this.$krite.getSource(this.source).getLayer(name);

            // Make layer aware of its context...
            if (layer.added) {
                layer.added(this.$krite);
            }

            this.preview = layer.preview;
            this.abstract = layer.abstract;

            this.$emit('update:layer', name);
        }
    }

    async add() {
        if (this.source && this.layer) {
            const layer = await this.$krite.getSource(this.source).getLayer(this.layer);

            this.$krite.map.addLayer(layer);
        }
    }
}