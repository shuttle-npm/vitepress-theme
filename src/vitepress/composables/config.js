import { computed, defineComponent, h, inject, provide } from 'vue';
import { useData } from 'vitepress';
import { normalizeLink } from '../support/utils';
var configSymbol = Symbol('config');
/**
 * Wrap root App component to provide the resolved theme config
 * so that we reuse the same computed ref across the entire app instead of
 * re-creating one in every consumer component.
 */
export function withConfigProvider(App) {
    return defineComponent({
        name: 'VPConfigProvider',
        setup: function (_, _a) {
            var slots = _a.slots;
            var theme = useData().theme;
            var config = computed(function () { return resolveConfig(theme.value); });
            provide(configSymbol, config);
            return function () { return h(App, null, slots); };
        }
    });
}
export function useConfig() {
    return {
        config: inject(configSymbol)
    };
}
function resolveConfig(config) {
    var _a;
    return Object.assign({
        appearance: true
    }, config, {
        nav: (_a = config.nav) === null || _a === void 0 ? void 0 : _a.map(normalizeMenuItem),
        sidebar: config.sidebar && normalizeSideBar(config.sidebar)
    });
}
function normalizeMenuItem(item) {
    if ('link' in item) {
        return Object.assign({}, item, {
            link: normalizeLink(item.link)
        });
    }
    else {
        return Object.assign({}, item, { items: item.items.map(normalizeMenuItem) });
    }
}
function normalizeSideBar(sidebar) {
    if (Array.isArray(sidebar)) {
        return sidebar.map(normalizeMenuItem);
    }
    else {
        var ret = {};
        for (var key in sidebar) {
            ret[key] = normalizeSideBar(sidebar[key]);
        }
        return ret;
    }
}
