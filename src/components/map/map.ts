import { Component, Vue } from 'vue-property-decorator';

import { MapService } from 'krite/lib/services/map';

@Component
export default class MapComponent extends Vue {
    map: MapService;

    mounted() {
        this.map = this.$krite.getService<MapService>('MapService');

        this.map.attach(this.$refs['map-container'] as HTMLElement, true);
    }

    beforeDestroy() {
        this.map.detach();
    }
}
