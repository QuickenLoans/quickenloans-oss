# Quicken Loans OSS Landing Page MVP

  1. `npm install`
  2. `npm run build`
  3. Static resources will be in the `build/` directory.

_The build script needs the `projects/` directory to exist at the root of this project. You can clone [https://git/quickenloans-oss/all-projects](all-projects) and copy the `projects/` directory over._

## For development
`npm run dev` will watch `src/` for changes, run the build script, and launch a Browser Sync server from `build/`.

Sometimes Browser Sync will refresh the page before the build finishes. There's probably a better way to do it so that doesn't happen, but `¯\_(ツ)_/¯`
