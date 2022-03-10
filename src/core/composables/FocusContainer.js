import { ref, watch, readonly, onUnmounted } from 'vue';
export var focusedElement = ref();
var active = false;
var listeners = 0;
export function useFocusContainer(options) {
    var containsFocus = ref(false);
    if (typeof window !== 'undefined') {
        !active && activateFocusTracking();
        listeners++;
        var unwatch_1 = watch(focusedElement, function (el) {
            var _a, _b, _c;
            if (el === options.elRef.value ||
                ((_a = options.elRef.value) === null || _a === void 0 ? void 0 : _a.contains(el))) {
                containsFocus.value = true;
                (_b = options.onFocus) === null || _b === void 0 ? void 0 : _b.call(options);
            }
            else {
                containsFocus.value = false;
                (_c = options.onBlur) === null || _c === void 0 ? void 0 : _c.call(options);
            }
        });
        onUnmounted(function () {
            unwatch_1();
            listeners--;
            if (!listeners) {
                deactivateFocusTracking();
            }
        });
    }
    return readonly(containsFocus);
}
function activateFocusTracking() {
    document.addEventListener('focusin', handleFocusIn);
    active = true;
    focusedElement.value = document.activeElement;
}
function deactivateFocusTracking() {
    document.removeEventListener('focusin', handleFocusIn);
}
function handleFocusIn() {
    focusedElement.value = document.activeElement;
}
