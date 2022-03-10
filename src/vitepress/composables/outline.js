import { onMounted, onUnmounted, onUpdated } from 'vue';
import { useMediaQuery } from '@vueuse/core';
export function resolveHeaders(headers) {
    return mapHeaders(groupHeaders(headers));
}
function groupHeaders(headers) {
    headers = headers.map(function (h) { return Object.assign({}, h); });
    var lastH2;
    for (var _i = 0, headers_1 = headers; _i < headers_1.length; _i++) {
        var h = headers_1[_i];
        if (h.level === 2) {
            lastH2 = h;
        }
        else if (lastH2 && h.level <= 3) {
            ;
            (lastH2.children || (lastH2.children = [])).push(h);
        }
    }
    return headers.filter(function (h) { return h.level === 2; });
}
function mapHeaders(headers) {
    return headers.map(function (header) { return ({
        text: header.title,
        link: "#".concat(header.slug),
        children: header.children ? mapHeaders(header.children) : undefined,
        hidden: header.hidden
    }); });
}
export function useActiveAnchor(container, bg) {
    var isOutlineEnabled = useMediaQuery('(min-width: 1280px)');
    var onScroll = throttleAndDebounce(setActiveLink, 100);
    function setActiveLink() {
        if (!isOutlineEnabled.value) {
            return;
        }
        var links = [].slice.call(container.value.querySelectorAll('.outline-link'));
        var anchors = [].slice
            .call(document.querySelectorAll('.content .header-anchor'))
            .filter(function (anchor) {
            return links.some(function (link) { return link.hash === anchor.hash; });
        });
        // page bottom - highlight last one
        if (anchors.length &&
            window.scrollY + window.innerHeight === document.body.offsetHeight) {
            activateLink(anchors[anchors.length - 1].hash);
            return;
        }
        for (var i = 0; i < anchors.length; i++) {
            var anchor = anchors[i];
            var nextAnchor = anchors[i + 1];
            var _a = isAnchorActive(i, anchor, nextAnchor), isActive = _a[0], hash = _a[1];
            if (isActive) {
                history.replaceState(null, document.title, hash ? hash : ' ');
                activateLink(hash);
                return;
            }
        }
    }
    var prevActiveLink = null;
    function activateLink(hash) {
        if (prevActiveLink) {
            prevActiveLink.classList.remove('active');
        }
        var activeLink = (prevActiveLink =
            hash == null
                ? null
                : container.value.querySelector("a[href=\"".concat(decodeURIComponent(hash), "\"]")));
        if (activeLink) {
            activeLink.classList.add('active');
            bg.value.style.opacity = '1';
            bg.value.style.top = activeLink.offsetTop + 33 + 'px';
        }
        else {
            bg.value.style.opacity = '0';
            bg.value.style.top = '33px';
        }
    }
    onMounted(function () {
        requestAnimationFrame(setActiveLink);
        window.addEventListener('scroll', onScroll);
    });
    onUpdated(function () {
        // sidebar update means a route change
        activateLink(location.hash);
    });
    onUnmounted(function () {
        window.removeEventListener('scroll', onScroll);
    });
}
// magic number to avoid repeated retrieval
var pageOffset = 56;
function getAnchorTop(anchor) {
    return anchor.parentElement.offsetTop - pageOffset - 15;
}
function isAnchorActive(index, anchor, nextAnchor) {
    var scrollTop = window.scrollY;
    if (index === 0 && scrollTop === 0) {
        return [true, null];
    }
    if (scrollTop < getAnchorTop(anchor)) {
        return [false, null];
    }
    if (!nextAnchor || scrollTop < getAnchorTop(nextAnchor)) {
        return [true, anchor.hash];
    }
    return [false, null];
}
function throttleAndDebounce(fn, delay) {
    var timeout;
    var called = false;
    return function () {
        if (timeout) {
            clearTimeout(timeout);
        }
        if (!called) {
            fn();
            called = true;
            setTimeout(function () {
                called = false;
            }, delay);
        }
        else {
            timeout = setTimeout(fn, delay);
        }
    };
}
