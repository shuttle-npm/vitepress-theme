import { ref, computed } from 'vue';
import { useRoute, useData } from 'vitepress';
import { getSidebar } from '../support/sidebar';
import { useConfig } from './config';
export function useSidebar() {
    var route = useRoute();
    var config = useConfig().config;
    var frontmatter = useData().frontmatter;
    var isOpen = ref(false);
    var sidebar = computed(function () {
        var sidebarConfig = config.value.sidebar;
        var relativePath = route.data.relativePath;
        return sidebarConfig ? getSidebar(sidebarConfig, relativePath) : [];
    });
    var hasSidebar = computed(function () { return frontmatter.value.sidebar !== false && sidebar.value.length > 0; });
    function open() {
        isOpen.value = true;
    }
    function close() {
        isOpen.value = false;
    }
    function toggle() {
        isOpen.value ? close() : open();
    }
    return {
        isOpen: isOpen,
        sidebar: sidebar,
        hasSidebar: hasSidebar,
        open: open,
        close: close,
        toggle: toggle
    };
}
