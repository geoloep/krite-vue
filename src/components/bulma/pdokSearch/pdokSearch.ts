import * as L from 'leaflet';
import * as wellknown from 'wellknown';

import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

import { MapService } from 'krite/lib/services/map';
import { PdokLocatieserverService } from 'krite/lib/services/pdokLocatieserver';

import LocalMagnify from 'vue-material-design-icons/Magnify.vue';

@Component({
    components: {
        LocalMagnify,
    },
})
export default class PdokSearch extends Vue {
    @Prop({ default: true })
    zoomTo!: boolean;

    visible = false;

    locatieserver!: PdokLocatieserverService;

    searchString = '';

    searchTimeOut!: number;
    timeOutLength = 500;
    loading = false;

    results: any[] = [];

    highlight = 0;

    catToZoom: { [index: string]: number } = {
        adres: 12,
        weg: 12,
        woonplaats: 8,
        gemeente: 8,
        perceel: 12,
    };

    catOrder = [
        'adres',
        'woonplaats',
        'weg',
        'gemeente',
        'perceel',
    ];

    created() {
        this.locatieserver = this.$krite.getService<PdokLocatieserverService>('PdokLocatieserverService');
    }

    get highlighted() {
        return this.results[this.highlight];
    }

    searchStringChanged(event: any) {
        const value: string = event.target.value;

        if (value !== this.searchString) {
            if (this.searchTimeOut) {
                window.clearTimeout(this.searchTimeOut);
            }

            this.searchString = value;

            if (value.trim() === '' || value === null) {
                this.results.splice(0);
                this.selectReset();
                this.visible = false;
            } else {
                this.searchTimeOut = window.setTimeout(() => {
                    this.search(value);
                }, this.timeOutLength);
            }
        }
    }

    @Watch('result')
    onResultChanged(val: any) {
        this.searchClick(val);
    }

    async search(searchString: string) {
        this.visible = true;
        this.loading = true;

        try {
            this.searchSuccess(await this.locatieserver.search(searchString));
        } catch (e) {
            throw new Error('Search failure in Pdok Search Component');
        } finally {
            this.loading = false;
        }

        this.$emit('search', searchString);
    }

    /**
     * Load returned search results
     */
    searchSuccess = (data: { [index: string]: any[] }) => {
        this.results.splice(0);
        this.selectReset();

        for (const depth of this.catOrder) {
            if (data[depth]) {
                for (const item of data[depth]) {
                    this.results.push(item);
                }
            }
        }
    }

    async searchClick(context: any) {
        const map = this.$krite.getService<MapService>('MapService');

        const response = await this.locatieserver.inspect(context.id);
        const geojson = (wellknown.parse(response.response.docs[0].centroide_rd) as GeoJSON.Point);

        if (this.zoomTo) {
            map.zoomToPoint(L.point(geojson.coordinates[0], geojson.coordinates[1]), this.catToZoom[context.type]);
        }

        this.visible = false;

        this.searchString = response.response.docs[0].weergavenaam;

        this.$emit('result-click', response.response.docs[0], geojson, this.catToZoom[context.type]);
    }

    selectUp() {
        if (!this.visible) {
            this.visible = true;
        } else if (this.highlight > 0) {
            this.highlight--;
        }
    }

    selectDown() {
        if (!this.visible) {
            this.visible = true;
        } else if (this.results.length > this.highlight) {
            this.highlight++;
        }
    }

    selectEnter() {
        if (this.visible) {
            this.searchClick(this.highlighted);
        } else {
            this.visible = true;
        }
    }

    selectReset() {
        this.highlight = 0;
    }
}
