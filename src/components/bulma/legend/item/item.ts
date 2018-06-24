import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class LegendItem extends Vue {
    @Prop()
    layer: string;

    legend = true;
    visible = true;

    get html() {
        return this.$krite.map.layerByName[this.layer].legend;
    }

    top() {
        const layer = this.$krite.map.layerByName[this.layer];

        this.$krite.map.removeLayer(layer);
        this.$krite.map.addLayer(layer);
    }

    toggleLegend() {
        this.legend = !this.legend;
    }

    toggleVisibility() {
        const layer = this.$krite.map.layerByName[this.layer];

        if (this.visible) {
            this.$krite.map.hideLayer(layer);
            this.visible = false;
        } else {
            this.$krite.map.showLayer(layer);
            this.visible = true;
        }
    }

    remove() {
        const layer = this.$krite.map.layerByName[this.layer];
        
        this.$krite.map.removeLayer(layer);
    }
}