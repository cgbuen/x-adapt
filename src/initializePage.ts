import cheerio from 'cheerio'

const handler = async ({ res, req, page } : { res: any, req: any, page: any }) => {
  const $ = cheerio.load(res.body || '')
  const $html = $('html')
  const $head = $html.find('head')
  const $body = $html.find('body')
  const pageGlobals = { $, $html, $head, $body }
  $head.find('style, link').remove()
  $body.find('style, link').remove()
  const $styles = $('<link rel="stylesheet" href="/adapt-main.css">')
  const $script = $('<script type="text/javascript" src="/adapt-main.js">')
  $head.prepend($styles)
  $head.append($script)
  require(`./pages/${page}`).default(pageGlobals)
  res.body = $.html()
  res.setHeader('content-length', res.body.length)
}

export default handler
