import { Component, Vue, Watch } from 'vue-property-decorator';
import { ILayer, TAttributes, IAttributeTypeFunc } from 'krite/lib/types';

import { InspectorService } from 'krite/lib/services/inspector';
import { NumeralService } from 'krite/lib/services/numeral';

@Component
export default class Inspector extends Vue {
    layers: any = [];
    layer: string | null = null;

    toolDropdown = false;

    tools = [
        {
            lable: 'Objecten aanklikken',
            name: 'cursor',
            icon: 'mdi mdi-cursor-default',
        },
        {
            lable: 'Selecteren met een rechthoek',
            name: 'box',
            icon: 'mdi mdi-square-outline',
        },
        {
            lable: 'Selecteren met een veelhoek',
            name: 'polygon',
            icon: 'mdi mdi-star-outline',
        },
        {
            lable: 'Selecteren met een lijn',
            name: 'line',
            icon: 'mdi mdi-chart-line-variant',
        },
    ]

    noTool = {
        lable: 'Deze laag is niet bevraagbaar',
        name: 'none',
        icon: 'mdi mdi-cancel',
    };

    tool: any = null;
    validTools: string[] = [];

    index = 0;
    namefield = '';
    features: GeoJSON.Feature<any>[] = [];

    inspector: InspectorService;

    mounted() {
        this.updateLayers();

        // Might actually be unecessary
        this.$krite.map.on('layer-add', this.updateLayers);
        this.$krite.map.on('layer-remove', this.updateLayers);

        this.$krite.map.startInspect();

        const inspector = this.inspector = this.$krite.getService<InspectorService>('InspectorService');

        this.tool = this.tools[0];

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

    @Watch('layer')
    layerChanged(val: string) {
        this.inspector.setLayer(val);
        this.validTools = this.inspector.tools;
        
        if (!this.inspector.layerResult || this.inspector.layerResult.layer.name !== val) {
            this.features.splice(0);
        }

        if (!this.validTools.includes(this.tool)) {
            this.tool = this.tools[0];
        }
    }

    @Watch('index')
    indexChanged() {
        if (this.features.length > 1 && this.features[this.index]) {
            this.$krite.map.addFocus(this.features[this.index]);
        }
    }

    shiftIndex(shift: number) {
        if (this.features[this.index + shift]) {
            this.index += shift;
        }
    }

    updateLayers() {
        this.layers = this.$krite.map.layerNames;
    }

    getLayer() {
        if (this.layer) {
            return this.$krite.map.layerByName[this.layer];
        }
    }

    onResults(results: GeoJSON.FeatureCollection<any>) {
        this.loadFeatureCollection(results);
    }

    onLayerResults(layer: ILayer, results: any) {
        if (layer.name === this.layer) {
            this.loadFeatureCollection({
                type: "FeatureCollection",
                features: [{
                    type: 'Feature',
                    properties: results,
                    geometry: null,
                }],
            });
        }
    }

    setTool(tool: any) {
        this.tool = tool;
        this.inspector.setTool(tool.name);
    }

    runTool() {
        this.inspector.runTool();
    }

    loadFeatureCollection(features: GeoJSON.FeatureCollection<any>) {
        this.index = 0;
        this.features = features.features;

        if (features.features.length > 0) {
            this.namefield = Object.keys(features.features[0].properties)[0];

            // this.$krite.map.addFocus(features.features[0]);
            this.indexChanged();
        }
    }

    parseProperties(properties: any) {
        if (this.layer) {
            const layer = this.$krite.map.layerByName[this.layer];

            if (layer.getType && this.$krite.hasService('NumeralService')) {
                const numeral = this.$krite.getService<NumeralService>('NumeralService')
                const parsed = {};

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