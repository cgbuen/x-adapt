import cheerio from 'cheerio'

const handler = async ({ res, req, page } : { res: any, req: any, page: any }) => {
  const $ = cheerio.load(res.body || '')
  const $html = $('html')
  const $head = $html.find('head')
  const $body = $html.find('body')
  const pageGlobals = { $, $html, $head, $body }
  require(`./pages/${page}`).default(pageGlobals)
  res.body = $.html()
  res.setHeader('content-length', res.body.length)
}

export default handler
