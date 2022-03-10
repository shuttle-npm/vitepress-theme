import { withBase } from 'vitepress';
import { ref } from 'vue';
export var hashRE = /#.*$/;
export var extRE = /(index)?\.(md|html)$/;
export var outboundRE = /^[a-z]+:/i;
export function isExternal(path) {
    return outboundRE.test(path);
}
export function ensureStartingSlash(path) {
    return /^\//.test(path) ? path : "/".concat(path);
}
export function normalizeLink(url) {
    if (isExternal(url)) {
        return url;
    }
    var _a = new URL(url, 'http://vuejs.org'), pathname = _a.pathname, search = _a.search, hash = _a.hash;
    return withBase(pathname.endsWith('/') || pathname.endsWith('.html')
        ? url
        : "".concat(pathname.replace(/(\.md)?$/, '.html')).concat(search).concat(hash));
}
var inBrowser = typeof window !== 'undefined';
var hashRef = ref(inBrowser ? location.hash : '');
if (inBrowser) {
    window.addEventListener('hashchange', function () {
        hashRef.value = location.hash;
    });
}
export function isActive(currentPath, matchPath, asRegex) {
    if (asRegex === void 0) { asRegex = false; }
    if (matchPath === undefined) {
        return false;
    }
    currentPath = normalize("/".concat(currentPath));
    if (asRegex) {
        return new RegExp(matchPath).test(currentPath);
    }
    else {
        if (normalize(matchPath) !== currentPath) {
            return false;
        }
        var hashMatch = matchPath.match(hashRE);
        if (hashMatch) {
            return hashRef.value === hashMatch[0];
        }
        return true;
    }
}
export function normalize(path) {
    return decodeURI(path).replace(hashRE, '').replace(extRE, '');
}
