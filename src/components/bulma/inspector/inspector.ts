import { Component, Vue, Watch } from 'vue-property-decorator';
import { ILayer, TAttributes, IAttributeTypeFunc } from 'krite/lib/types';

import { InspectorService, ToolType } from 'krite/lib/services/inspector';
import { NumeralService } from 'krite/lib/services/numeral';

import KvCursor from 'vue-material-design-icons/CursorDefault.vue';
import KvSquare from 'vue-material-design-icons/SquareOutline.vue';
import KvStar from 'vue-material-design-icons/StarOutline.vue';
import KvLine from 'vue-material-design-icons/ChartLineVariant.vue';
import KvNone from 'vue-material-design-icons/Cancel.vue';
import KvLeft from 'vue-material-design-icons/ChevronLeft.vue';
import KvRight from 'vue-material-design-icons/ChevronRight.vue';
import KvDown from 'vue-material-design-icons/ChevronDown.vue';
import { DrawService } from 'krite/lib/services/draw';

@Component({
    components: {
        KvCursor,
        KvSquare,
        KvStar,
        KvLine,
        KvNone,
        KvLeft,
        KvRight,
        KvDown,
    },
})
export default class Inspector extends Vue {
    layers: string[] = [];
    layer: string | null = null;

    tools: Array<{
        lable: string;
        name: ToolType;
        icon: string;
    }> = [
            {
                lable: 'Objecten aanklikken',
                name: 'cursor',
                icon: 'kv-cursor',
            },
            {
                lable: 'Selecteren met een rechthoek',
                name: 'box',
                icon: 'kv-square',
            },
            {
                lable: 'Selecteren met een veelhoek',
                name: 'polygon',
                icon: 'kv-star',
            },
            {
                lable: 'Selecteren met een lijn',
                name: 'line',
                icon: 'kv-line',
            },
        ];

    tool = 0;

    queryable = false;

    noTool = {
        lable: 'Deze laag is niet bevraagbaar',
        name: 'none',
        icon: 'kv-none',
    };

    validTools: string[] = [];

    index = 0;
    namefield = '';

    features: GeoJSON.Feature<any>[] = [];

    inspector!: InspectorService;

    @Watch('layer')
    layerChanged(val: string) {
        this.inspector.setLayer(val);
        this.validTools = this.inspector.tools;

        if (!this.inspector.layerResult || this.inspector.layerResult.layer.name !== val) {
            this.features.splice(0);
        }
    }

    @Watch('index')
    indexChanged() {
        if (this.features.length > 1 && this.features[this.index]) {
            this.$krite.map.addFocus(this.features[this.index]);
        }
    }

    @Watch('tool')
    toolChanged(val: number) {
        if (this.tools[val]) {
            this.inspector.setTool(this.tools[val].name);

            this.$krite.getService<DrawService>('DrawService').disable();

            this.inspector.runTool();
        }
    }

    mounted() {
        this.updateLayers();

        // Might actually be unecessary
        this.$krite.map.on('layer-add', this.updateLayers);
        this.$krite.map.on('layer-remove', this.updateLayers);

        this.$krite.map.startInspect();

        const inspector = this.inspector = this.$krite.getService<InspectorService>('InspectorService');

        inspector.setTool('cursor');

        if (inspector.layerResult) {
            this.layer = inspector.layerResult.layer.name;

            this.onLayerResults(inspector.layerResult.layer, inspector.layerResult.properties);
        } else if (inspector.layer) {
            this.layer = inspector.layer.name;
        }

        inspector.on('result', this.onResults);
        inspector.on('result-layer', this.onLayerResults);
    }

    beforeDestroy() {
        this.$krite.map.off('layer-add', this.updateLayers);
        this.$krite.map.off('layer-remove', this.updateLayers);

        this.$krite.map.endInspect();
        this.$krite.map.hideHighlight();

        this.inspector.off('result', this.onResults);
        this.inspector.off('result-layer', this.onLayerResults);
    }

    shiftIndex(shift: number) {
        if (this.features[this.index + shift]) {
            this.index += shift;
        }
    }

    updateLayers() {
        this.layers = this.$krite.map.layerNames;

        if (this.layer && !this.layers.includes(this.layer)) {
            this.layer = null;
        }
    }

    getLayer() {
        if (this.layer) {
            return this.$krite.map.layerByName[this.layer];
        }
    }

    onResults(results: GeoJSON.FeatureCollection<any> | null) {
        if (results) {
            this.loadFeatureCollection(results);
        }

        this.tool = 0;
    }

    onLayerResults(layer: ILayer, results: any) {
        if (layer.name === this.layer) {
            this.loadFeatureCollection({
                type: 'FeatureCollection',
                features: [{
                    type: 'Feature',
                    properties: results,
                    geometry: null,
                }],
            });
        }
    }

    runTool() {
        this.inspector.runTool();
    }

    loadFeatureCollection(features: GeoJSON.FeatureCollection<any>) {
        this.index = 0;
        this.features = features.features;

        if (features.features.length > 0) {
            this.namefield = Object.keys(features.features[0].properties as any)[0];

            this.indexChanged();
        }
    }

    parseProperties(properties: any) {
        if (this.layer) {
            const layer = this.$krite.map.layerByName[this.layer];

            if (layer.getType && this.$krite.hasService('NumeralService')) {
                const numeral = this.$krite.getService<NumeralService>('NumeralService')
                const parsed: any = {};

                let type: TAttributes | IAttributeTypeFunc
                let f: any;

                for (const key in properties) {
                    type = layer.getType(key);

                    if (typeof (type) === 'function') {
                        parsed[key] = type(properties[key]);
                    } else {
                        switch (type) {
                            case 'href':
                                let desc: string;
                                if (properties[key].length > 20) {
                                    desc = properties[key].substring(0, 20) + '...';
                                } else {
                                    desc = properties[key];
                                }

                                f = `<a href="${properties[key]}" target="_blank">${desc}</a>&nbsp;<span class="icon"><span class="mdi mdi-open-in-new"></span></span>`;
                                break;
                            case 'float':
                                f = numeral.float(properties[key]);
                                break;
                            case 'int':
                                f = parseInt(properties[key]).toString();
                                break;
                            case 'percentage':
                                f = numeral.percentage(properties[key]);
                                break;
                            case 'skip':
                                f = null;
                                break;
                            default:
                                f = properties[key];
                                break;

                        }

                        if (f) {
                            parsed[key] = f;
                        }
                    }
                }

                return parsed;
            } else {
                return properties;
            }
        }
    }
}