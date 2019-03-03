const LRU = require('lru-cache')
const { fs, path } = require('@vuepress/shared-utils')

const cache = new LRU({ max: 1000 })

module.exports = function getFragment (dirname, name) {
  const target = path.resolve(dirname, name)
  let content = cache.get(target)
  if (content) {
    return content
  }
  content = fs.readFileSync(target, 'utf-8')
  cache.set(target, content)
  return content
}
