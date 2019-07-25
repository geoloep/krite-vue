import Vue, { VueConstructor } from 'vue';
import { Krite } from 'krite/lib/krite';

export default {
    install(vue: VueConstructor<Vue>, options?: any) {
        let krite: Krite;

        Vue.mixin({
            beforeCreate() {
                if (!krite && this.$options.krite) {
                    krite = this.$options.krite;
                }
            },
        });

        Object.defineProperty(Vue.prototype, '$krite', {
            get() {
                return krite;
            },
        });
    },
};
