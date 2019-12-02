<template>
    <div id="controls-container">
        <div class="control-wrapper" v-if="zoom">
            <button class="button top has-tooltip-left" @click="plus" title="" data-tooltip="Inzoomen" :disabled="maxZoom">
                <kv-plus/>
            </button>
            <button id="minus" class="button bottom has-tooltip-left" title="" data-tooltip="Uitzoomen" @click="minus" :disabled="minZoom">
                <kv-minus/>
            </button>
        </div>

        <div class="control-wrapper" v-if="location">
            <button class="button has-tooltip-left" title="" data-tooltip="Mijn locatie weergeven" @click="locate">
                <kv-gps
                    :class="{'has-text-warning': locating === 'searching', 'has-text-info': locating === 'located', 'has-text-danger': locating === 'error'}"
                />
            </button>
        </div>

        <slot />
    </div>
</template>

<style lang="scss">
#controls-container {
    pointer-events: none;

    > .control-wrapper {
        padding: 0.5rem;
    }

    .button {
        pointer-events: all;

        width: 2.5rem;
        height: 2.5rem;

        font-size: 1.5rem;

        padding: 0;

        display: flex;

        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
    }

    .top {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }

    .middle {
        border-radius: 0;
    }

    .bottom {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        border-top-width: 0;
    }
}
</style>


<script src="./mapControls.js"></script>