# The OSS Project Proposal
[OSS Project Proposal]: #oss-proposal

All project proposals will live in the `/projects` directory with a unique name
representative of the project. To submit a project for review:

  1. In your own Fork of this repository create a new file
    + Named similar to your project
    + Use the [Proposal Template] as a starting point
    + Fill in the required fields: name, repoURL, and type
    + Additional fields may be suggested as part of the review process
  2. Submit a Pull Request from a branch in your Fork to the "master" branch in
    this repository.
  3. Respond to feedback and questions on the Pull Request discussion thread


## Project Types
[Project Types]: #project-types

  - **Application** or **Service** - a code-base that is "runnable" on its own.
  - **Tool** or **Utility** - executable code that encapsulates a process or
    enables accomplishing a task in support of some other final product.
  - **Framework**, **Library**, or **Plugin** - a grouping, or abstraction, of
    common or related functionality for use in building up other projects.
  - **Documentation** - content - non-code - capturing knowledge for the
    purpose of reaching shared understanding and/or agreement.


## Approvals
[Approvals]: #approvals

These are the approvals that are necessary; in most cases the SME will be able
to evaluate all areas but will incorporate .

The primary areas of approval are

  1. Subject Matter Expert (SME)
  2. Information Security
  3. Legal


## Criteria
[Criteria]: #criteria

For a project to be accepted for publication as open source it must answer the
following questions in the positive:

  1. Is it [Non-proprietary]?
  2. Does it follow [Security Best Practices]?
  3. Is it of good/high [Quality]?
  4. Is it [Used]?
  5. Can it be [Licensed for OSS]?


### Non-proprietary
[Non-proprietary]: #non-proprietary

The project does not include anything that would be considered a
"differentiator" for us in the industry.


### Security Best Practices
[Security Best Practices]: #security-best-practices

The project doesn't expose any secure information about Quicken Loans or our
clients; either in code directly or in a way that would allow external access.


### Quality
[Quality]: #quality

This is difficult to define but a good litmus test would be, "would others in
this area of expertise be proud to be associated with?"

For code this could include, but is not limited to:

  - Cleanly written
  - Follows best practices
  - Employs deliberate use of design patterns
  - Well documented
  - Unit tested to a "sufficient" degree
  - Solves a defined and bounded problem


### Used
[Used]: #used

The project is in use and not an abandoned.

The full description of "in use" is somewhat dependent on the type of project;
if code, the project should be in "production" use.


### Licensed for OSS
[Licensed for OSS]: #used

The project doesn't rely or build upon any other project that would prevent us
from releasing our project using our preferred - [MIT] - license.



[MIT]: https://opensource.org/licenses/MIT
[Proposal Template]: proposal-template.yml
