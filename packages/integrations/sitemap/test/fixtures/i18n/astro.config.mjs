import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

export default defineConfig({
  integrations: [sitemap({
      i18n: {
					xDefault: true,
          defaultLocale: 'en',
          locales: {
							en: 'en-US',
              it: 'it-IT',
              es: 'es-ES',
          }
      }
  })],
	site: 'http://example.com',
      redirects: {
        '/redirect': '/'
      },
})
