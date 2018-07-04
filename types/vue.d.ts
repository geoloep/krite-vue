/**
 * Augment the typings of Vue.js
 */

import Vue from "vue";
import { Krite } from 'krite/lib/krite';

declare module "vue/types/vue" {
    interface Vue {
        $krite: Krite;
        $window: {
            width: number;
            height: number;
        };
    }
}

declare module "vue/types/options" {
    interface ComponentOptions<V extends Vue> {
        krite?: Krite;
    }
}
