import assert from 'node:assert/strict';
import { before, describe, it } from 'node:test';
import { sitemap } from './fixtures/i18n/deps.mjs';
import { loadFixture, readXML } from './test-utils.js';

describe('x-default to multilingual urls', () => {
	/** @type {import('./test-utils.js').Fixture} */
	let fixture;
	/** @type {{ [key: string]: string }} */
	let urls;

	before(async () => {
		fixture = await loadFixture({
			root: './fixtures/i18n/',
			integrations: [
				sitemap({
					i18n: {
						xDefault: true,
						defaultLocale: 'en',
						locales: {
							en: 'en-US',
							it: 'it-IT',
							es: 'es-ES',
						}
					}
				}),
			],
		});
		await fixture.build();
		const data = await readXML(fixture.readFile('/sitemap-0.xml'));
		urls = data.urlset.url.filter((s) => s['xhtml:link']).map((s) => {
			return { loc: s.loc[0], props: s['xhtml:link']}
		});
	});

	it('includes defined custom sitemaps', async () => {
		urls.forEach(({ props}) => {
			const xDefaultCount = (Object.values(props).filter((v) => v.$.hreflang == 'x-default')).length
			assert.equal(xDefaultCount, 1);
		});
		
	});
});
