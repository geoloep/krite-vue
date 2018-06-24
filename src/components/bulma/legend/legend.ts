import { Component, Vue } from 'vue-property-decorator';

import legendItem from './item/item.vue';

@Component({
    components: {
        legendItem,
    }
})
export default class Legend extends Vue {
    layers: any = [];

    mounted() {
        this.updateLayers();

        this.$krite.map.on('layer-add', this.updateLayers);
        this.$krite.map.on('layer-remove', this.updateLayers);
    }

    beforeDestroy() {
        this.$krite.map.off('layer-add', this.updateLayers);
        this.$krite.map.off('layer-remove', this.updateLayers);
    }

    updateLayers() {
        this.layers = this.$krite.map.layerNames;
    }
}