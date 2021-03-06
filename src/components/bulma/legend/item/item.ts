import { Component, Vue, Prop } from 'vue-property-decorator';
import { InspectorService } from 'krite/lib/services/inspector';

import KvMdiChevronUp from 'vue-material-design-icons/ChevronDoubleUp.vue';
import KvMdiList from 'vue-material-design-icons/FormatListBulletedType.vue';
import KvMdiEye from 'vue-material-design-icons/Eye.vue';
import KvMdiInspect from 'vue-material-design-icons/HelpCircle.vue';
import KvMdiDelete from 'vue-material-design-icons/Delete.vue';

@Component({
    components: {
        KvMdiChevronUp,
        KvMdiList,
        KvMdiEye,
        KvMdiInspect,
        KvMdiDelete,
    },
})
export default class LegendItem extends Vue {
    @Prop()
    layer: string;

    legend = true;
    visible = true;

    get title() {
        return this.$krite.map.layerByName[this.layer].title;
    }

    get html() {
        return this.$krite.map.layerByName[this.layer].legend;
    }

    get inspector() {
        return this.$krite.hasService('InspectorService');
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

    inspect() {
        const layer = this.$krite.map.layerByName[this.layer];
        const inspector = this.$krite.getService<InspectorService>('InspectorService');

        inspector.setLayer(layer);
    }

    remove() {
        const layer = this.$krite.map.layerByName[this.layer];

        this.$krite.map.removeLayer(layer);
    }
}