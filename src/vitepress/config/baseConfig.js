/**
 * This file is intended to be required from VitePress
 * consuming project's config file.
 *
 * It runs in Node.js.
 */

// for local-linked development
const deps = ['shuttle-theme', '@vueuse/core', 'body-scroll-lock']

/**
 * @type {() => Promise<import('vitepress').UserConfig>}
 */
module.exports = async (options) => {
    const o = options || {};

    o.base = o.base ?? "";

    return {
        vite: {
            ssr: {
                noExternal: deps
            },
            optimizeDeps: {
                exclude: deps
            }
        },

        head: [
            ...(process.env.NODE_ENV === 'production'
                ? [
                    [
                        'link',
                        {
                            rel: 'preload',
                            href: (o.base.endsWith('/') ? o.base.substr(0, o.base.length - 1) : o.base) + '/assets/inter-latin.7b37fe23.woff2',
                            as: 'font',
                            type: 'font/woff2',
                            crossorigin: 'anonymous'
                        }
                    ]
                ]
                : []),
            [
                'script',
                {},
                require('fs').readFileSync(
                    require('path').resolve(
                        __dirname,
                        './inlined-scripts/applyDarkMode.js'
                    ),
                    'utf-8'
                )
            ]
        ],

        shouldPreload: (link) => {
            // make algolia chunk prefetch instead of preload
            return !link.includes('Algolia')
        }
    };
}
