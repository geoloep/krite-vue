import { Component, Vue, Prop } from 'vue-property-decorator';
import { LocationService } from 'krite/lib/services/location';

import KvPlus from 'vue-material-design-icons/Plus.vue';
import KvMinus from 'vue-material-design-icons/Minus.vue';
import KvGps from 'vue-material-design-icons/CrosshairsGps.vue';

@Component({
    components: {
        KvPlus,
        KvMinus,
        KvGps,
    },
})
export default class Controls extends Vue {
    @Prop(Boolean)
    zoom!: boolean;

    @Prop(Boolean)
    location!: boolean;

    maxZoom = false;
    minZoom = false;

    locating: string | null = null;

    mounted() {
        this.checkZoombounds();

        this.$krite.map.leaflet.on('zoomend', () => {
            this.checkZoombounds();
        });

        this.$krite.map.leaflet.on('locationerror', () => {
            if (this.locating) {
                this.locating = 'error';
            }
        });

        this.$krite.map.leaflet.on('locationfound', () => {
            if (this.locating === 'error') {
                this.locating = 'located';
            }
        });
    }

    plus() {
        this.$krite.map.leaflet.zoomIn();

        this.checkZoombounds();
    }

    minus() {
        this.$krite.map.leaflet.zoomOut();

        this.checkZoombounds();
    }

    locate() {
        const service = this.$krite.getService<LocationService>('LocationService');

        if (this.locating) {
            service.stopLocating();
            this.locating = null;
        } else {
            service.startLocating();
            this.locating = 'searching';

            this.$krite.map.leaflet.once('locationfound', () => {
                this.locating = 'located';
            });
        }
    }

    checkZoombounds() {
        const zoom = this.$krite.map.leaflet.getZoom();

        if (zoom >= this.$krite.map.leaflet.getMaxZoom()) {
            this.maxZoom = true;
        } else {
            this.maxZoom = false;
        }

        if (zoom <= this.$krite.map.leaflet.getMinZoom()) {
            this.minZoom = true;
        } else {
            this.minZoom = false;
        }
    }
}
