# Open Source at Quicken Loans
[top]: #oss-projects-and-proposals

This repository is the canonical record of all of Quicken Loans' open source
projects:

  - Proposed (open Pull Requests), and
  - Published (accepted Pull Requests).

This repository MUST remain as "internal only" because it will be the place to
propose new projects; and that *can not* be "open".


## FAQs

  - [What are the criteria for open source publication?](CRITERIA.md)
  - [What should be included in open source projects?](STRUCTURE.md)
  - [What does a proposal need to include?](PROPOSAL.md)

If you have more questions read through our [Important Questions] before asking
for help; but if your question(s) aren't answered let us know.


[Important Questions]: QUESTIONS.md

# Build (static site)

  1. `npm install`
  2. `npm run build`
  3. Static resources will be in the `build/` directory.

_The build script needs the `projects/` directory to exist at the root of this project. You can clone [https://git/quickenloans-oss/all-projects](all-projects) and copy the `projects/` directory over._

# Develop
`npm run dev` will watch `src/` for changes, run the build script, and launch a
Browser Sync server from `build/`.

Sometimes Browser Sync will refresh the page before the build finishes. There's
probably a better way to do it so that doesn't happen, but `¯\_(ツ)_/¯`.
