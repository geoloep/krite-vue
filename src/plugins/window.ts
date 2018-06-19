import Vue from 'vue';

const store = new Vue({
    data: {
        width: window.innerWidth,
        height: window.innerHeight,
    },
});

export default {
    install: (vue: any, options?: any) => {
        window.addEventListener('resize', () => {
            store.$data.width = window.innerWidth;
            store.$data.height = window.innerHeight;
        });

        Object.defineProperty(vue.prototype, '$window', {
            get() {
                return {
                    width: store.$data.width,
                    height: store.$data.height,
                };
            },
        });
    },
};
