const getBase = require('../../src/vitepress/config/baseConfig')
const path = require('path')

module.exports = (async () => {
  const base = await getBase({ base: '/test' });

  return {
    ...base,

    vite: {
      ...base.vite,
      build: {
        minify: false
      },
      resolve: {
        alias: {
          '@vue/theme': path.join(__dirname, '../../src')
        }
      }
    },

    base: '/test/',
    lang: 'en-US',
    title: 'Shuttle.Theme',
    description: 'Shuttle Theme',

    head: [
        ...base.head,
        ['link', { rel: "shortcut icon", href: "/test/favicon.ico" }]
    ],

    themeConfig: {
      algolia: {
        indexName: 'shuttle-identifier',
        appId: '',
        apiKey: ''
      },

      carbonAds: {
        code: '',
        placement: ''
      },

      socialLinks: [
        { icon: 'github', link: 'https://github.com/shuttle-npm/vitepress-theme' },
        // { icon: 'twitter', link: '' },
        // { icon: 'discord', link: '' }
      ],

      nav: [
        {
          text: 'Docs',
          activeMatch: `^/(guide|examples)/`,
          items: [
            {
              items: [
                { text: 'Guide', link: '/guide/introduction' },
                { text: 'Installation', link: '/guide/installation' }
              ]
            }
          ]
        },
        {
          text: 'API Reference',
          activeMatch: `^/api/`,
          link: '/api/'
        },
        {
          text: 'Sponsor',
          link: '/sponsor/'
        }
      ],

      sidebar: {
        '/guide/': [
          {
            text: 'Essentials',
            items: [
              { text: 'Introduction', link: '/guide/introduction' },
              { text: 'Installation', link: '/guide/installation' },
              {
                text: 'Application & Component Instances',
                link: '/guide/instance'
              },
            ]
          },
          {
            text: 'Components',
            items: [
              {
                text: 'Component Registration',
                link: '/guide/component-registration'
              },
            ]
          },
          {
            text: 'Concepts',
            items: [
              { text: 'Domain-Driven Design', link: '/guide/domain-driven-design' },
            ]
          },
          {
            text: 'Digging Deeper',
            items: [
              { text: 'Messaging', link: '/guide/messaging' },
              {
                text: 'Microservices',
                link: '/guide/microservices'
              },
            ]
          },
        ],
      }
    }
  }
})()
