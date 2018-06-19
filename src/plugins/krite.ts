import Vue from 'vue';

export function install(vue: Vue) {
    Vue.mixin({
        beforeCreate() {
            if (this.$options.krite) {
                this._krite = this.$options.krite;
            }
        }
    })

    Object.defineProperty(Vue.prototype, '$krite', {
        get() { return this._krite }
    })
}