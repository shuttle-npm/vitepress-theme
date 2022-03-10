import './styles/index.css';
import VPApp from './components/VPApp.vue';
import VPNotFound from './components/VPNotFound.vue';
import { withConfigProvider } from './composables/config';
var VPTheme = {
    Layout: withConfigProvider(VPApp),
    NotFound: VPNotFound
};
export { VPTheme };
