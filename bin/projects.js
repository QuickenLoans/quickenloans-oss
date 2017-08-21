const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml').safeLoad

const cliArgs = require('./cliArgs')

const CWD = process.cwd()

const { card: CARD, template: TEMPLATE } = cliArgs(process.argv)

function card(project) {
  const projectURL = project.url && project.url.project
  const repoURL = project.url && project.url.repository

  if (!project.description || !repoURL || !project.title) {
    // eslint-disable-next-line no-console
    console.error(project)
    throw new Error('Projects must have: title, description, and link.')
  }

  const keywords = project.keywords

  if (keywords.indexOf(project.language) === -1) {
    keywords.push(project.language)
  }

  const languageColor = project.language
    .replace('#', 'Sharp')
    .toLowerCase()
  const type = project.type.slice(0, 1).toUpperCase() +
    project.type.slice(1).toLowerCase()

  return CARD
    .replace(/#description/g, project.description)
    .replace(/#projectURL/g, projectURL)
    .replace(/#repoURL/g, repoURL)
    .replace(/#displayNoneUtility/g, projectURL ? '' : 'u-DisplayNone')
    .replace(/#keywords/g, keywords)
    .replace(/#language-color/g, languageColor || '_')
    .replace(/#language/g, project.language || '')
    .replace(/#type/g, type || '')
    .replace(/#logo/g, project.logo || 'http://via.placeholder.com/80x80')
    .replace(/#title/g, project.title)
}

function projects(subtree = './projects/') {

  return fs.readdirSync(path.join(CWD, subtree))
    .map(entry =>
      yaml(fs.readFileSync(path.join(CWD, subtree, entry), 'utf-8')))
}

const page = TEMPLATE
  .replace(/#pagecontent/g, projects().map(card).join('\n'))

const dest = path.join(CWD, process.argv.pop())

fs.writeFileSync(dest, page, 'utf-8')
