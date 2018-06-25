import { Component, Vue, Watch } from 'vue-property-decorator';

@Component
export default class LayerBrowser extends Vue {
    sources: any = [];

    source: string | null = null;
    layers: string[] = [];

    filter = '';

    layer: string | null = null;

    preview: string | null = null;
    abstract: string | null = null;

    mounted() {
        this.sources = this.$krite.source.list;
    }

    get filteredLayers() {
        const filter = this.filter.toLowerCase();

        return this.layers.filter((value: string) => {
            return value.toLowerCase().indexOf(filter) >= 0;
        });
    }

    @Watch('source')
    async sourceChanged(val: string | null) {
        if (val) {
            this.layers = await this.$krite.getSource(val).getLayerNames();
        }
    }

    async selectLayer(name: string) {
        this.layer = name;

        if (this.source) {
            const layer = await this.$krite.getSource(this.source).getLayer(name);

            // Make layer aware of its context...
            if (layer.added) {
                layer.added(this.$krite);
            }

            this.preview = layer.preview;
            this.abstract = layer.abstract;
        }
    }

    async add() {
        if (this.source && this.layer) {
            const layer = await this.$krite.getSource(this.source).getLayer(this.layer);

            this.$krite.map.addLayer(layer);
        }
    }
}