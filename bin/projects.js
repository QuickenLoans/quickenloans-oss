const fs = require('fs')
const https = require('https')
const path = require('path')
const yaml = require('js-yaml').safeLoad

const CWD = process.cwd()

const file = str =>
  fs.readFileSync(path.join(CWD, str), 'utf-8')

const args = process.argv
  .reduce((acc, item, indx, ary) => {
    if (/^-/.test(item)) {
      acc[item.slice(1)] = file(ary[indx + 1])
    }

    return acc
  }, {})

function card(project) {
  const link = project.url && (project.url.project || project.url.repository)

  if (!project.description || !link || !project.title) {
    console.error(project)
    throw new Error('Projects must have at least, a: title, description, and link.')
  }

  return args.card
    .replace(/#description/g, project.description)
    .replace(/#href/g, link)
    .replace(/#keywords/g, project.keywords || '')
    .replace(/#language/g, project.language || '_')
    .replace(/#logo/g, project.logo || 'http://via.placeholder.com/80x80')
    .replace(/#title/g, project.title)
}

function projects(subtree = './projects/projects/') {

  return fs.readdirSync(path.join(CWD, subtree))
    .map(entry => yaml(fs.readFileSync(path.join(CWD, subtree, entry), 'utf-8')))
}

const page = args.template
  .replace(/#pagecontent/g, projects().map(card).join('\n'))

const dest = path.join(CWD, process.argv.pop())

fs.writeFileSync(dest, page, 'utf-8')
