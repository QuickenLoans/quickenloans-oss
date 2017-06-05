# Quicken Loans OSS Landing Page MVP

  1. Set an environment variable `QLOSSPROJECTS` to the - raw - data source URI
      from the internal - GitHub Enterprise - repository.
  2. Run a build - `npm run build` - to generate the landing page.
  3. Static resources will be in the `build/` directory.

git remote add all-projects git@git:quickenloans-oss/all-projects.git
git subtree add --prefix projects-source all-projects master --squash
