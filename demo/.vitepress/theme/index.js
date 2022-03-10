var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { VPTheme } from '@vue/theme';
import { h } from 'vue';
// uncomment to test CSS variables override
// import './override.css'
export default __assign(__assign({}, VPTheme), { Layout: function () {
        return h(VPTheme.Layout, null, {
        // uncomment to test layout slots
        // 'sidebar-top': () => h('div', 'hello top'),
        // 'sidebar-bottom': () => h('div', 'hello bottom'),
        // 'content-top': () => h('h1', 'Announcement!'),
        // 'content-bottom': () => h('div', 'Some ads'),
        // 'aside-top': () => h('div', 'this could be huge'),
        // 'aside-mid': () => h('div', { style: { height: '300px' }}, 'Sponsors'),
        // 'aside-bottom': () => h('div', { style: { height: '300px' }}, 'Sponsors'),
        });
    } });
