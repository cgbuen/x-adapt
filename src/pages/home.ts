const handler = ({ $, $html, $head, $body } : { $: any, $html: any, $head: any, $body: any }) => {
  console.log('bsdf')
  console.log('## in page transform file')
  const $newEl = $('<div>')
  $newEl.addClass('mw-aaab')
  $newEl.text('aaab')
  const $newEl2 = $('<span>')
  $newEl2.text('aaac')
  $newEl.append($newEl2)
  $body.prepend($newEl)
}

export default handler
