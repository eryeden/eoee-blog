module.exports = {
  //
  // Change information to your own:
  //
  // Site Info:
  title: 'EOEE',
  description: 'EOEEなブログです。',
  siteUrl: 'https://eoee-blog.netlify.app/',
  footerText:
    '©　2020　EOEE　<a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="クリエイティブ・コモンズ・ライセンス" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/80x15.png" /></a><br />', // You can use Markdown markup here

  // Blog Author Info:
  author: 'eryeden',
  authorImage:
    'https://avatars2.githubusercontent.com/u/4968978?s=460&u=9f5b8d3ffdf8e95d3f3189864ad6fe9fdc5f57f9&v=4',
  authorBio:
    "こんにちは。eryedenです。ブログ作ってみました。", // You can use Markdown markup here
  social: {
    github: 'eryeden',
    twitter: 'pri_robo',
  },

  // Services:
  googleAnalyticsTrackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
  googleAnalyticsGlobalSiteTag: process.env.GOOGLE_GLOBAL_SITE_TAG,

  // Site Style:
  lightTheme: 'base', // grommet | dark | base | dxc | aruba
  // leave darkTheme blank if you don’t need a theme switch
  darkTheme: 'dark', // '' | grommet | dark | base | dxc | aruba
  font: '', // Roboto
  fontHeadings: '', // Merriweather
  brandColor: '' // #7D4CDB
};
