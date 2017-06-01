const fs = require('fs')
const https = require('https')
const path = require('path')

const file = str =>
  fs.readFileSync(path.join(process.cwd(), str), 'utf-8')

const args = process.argv
  .reduce((acc, item, indx, ary) => {
    if (/^-/.test(item)) {
      acc[item.slice(1)] = file(ary[indx + 1])
    }

    return acc
  }, {})

function card(project) {
  if (!project.description || !project.href || !project.title) {
    console.error(project)
    throw new Error('Projects must have at least, a: title, description, and link (href).')
  }

  return args.card
    .replace(/#description/g, project.description)
    .replace(/#href/g, project.href)
    .replace(/#keywords/g, project.keywords || '')
    .replace(/#logo/g, project.logo || 'http://via.placeholder.com/80x80')
    .replace(/#title/g, project.title)
}

https.get(process.env.QLOSSPROJECTS, res => {
  const statusCode = res.statusCode
  const contentType = res.headers['content-type']

  let error
  if (statusCode !== 200) {
    error = new Error(`Request Failed.\n` +
                      `Status Code: ${statusCode}`)
  } else if (!/^application\/json/.test(contentType)) {
    error = new Error(`Invalid content-type.\n` +
                      `Expected application/json but received ${contentType}`)
  }

  if (error) {
    console.error(error.message)
    // consume response data to free up memory
    res.resume()

    return
  }

  res.setEncoding('utf8')
  let rawData = ''
  res.on('data', chunk => rawData += chunk)
  res.on('end', () => {
    try {
      const projects = JSON.parse(rawData)
        // TODO: REMOVE; FOR TESTING PURPOSES ONLY
        .map(({body: description, title}) => ({
          description,
          href: `//github.com/${Math.random().toString(32).slice(2)}`,
          title,
        }))

      const page = args.template
        .replace(/#pagecontent/g, projects.map(card).join('\n'))

      const dest = path.join(process.cwd(), process.argv.pop())

      fs.writeFileSync(dest, page, 'utf-8')
    } catch (e) {
      console.error(e.message)
    }
  })
}).on('error', (e) => {
  console.error(`Got error: ${e.message}`)
})
