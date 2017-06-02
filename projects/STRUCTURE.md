# Project Structure
[Project Structure]: #project-structure

Open source projects from a single organization - Quicken Loans - should follow
a common structure to improve developer experience; the common structure should
be minimal and agnostic of technology or project intent.

  1. *(required)* [README].md
  2. *(required)* [CONTRIBUTING].md
  3. *(optional)* [CODE_OF_CONDUCT].md

These files should exist in the root of the project repository.


## README
[README]: #readme

General, high-level, information on: what the project is, the problem it is
attempting to solve and why, how to "set-up" the project and use it, and links
to additional information that could be considered useful including: a demo, or
documentation on additional features that go beyond basic use.

Content in this file should attempt to remain high-level so that it is easy to
digest for new people.

Here is a simple checklist for the structure of the content:

  1. Introduction
  2. Setup / Configure / Install
  3. Basic Use / How to
  4. Link to demo or implementation


## CONTRIBUTING
[CONTRIBUTING]: #contributing

This guide helps govern the processes the project follows as well as offering
insight into what to expect for new contributors.

### RFC Process
[RFC Process]: #rfc-process

As a part of, or a link from [CONTRIBUTING] projects should document the
Request for Change (RFC) process. The (following) three "levels" of
formality should support any project, from small to large; choose the right
level of formality for your project.

  1. Informal
    + Indicate that Pull Requests are welcome and appreciated. All discussion,
      *if any*, will happen in the Pull Request discussion thread.
    + Meant for small project that are fairly focused and will likely be fairly
      "complete" meaning that "new features" are unlikely and any changes are
      more often going to be smaller "bug" fixes.
    + [GitHub templates for Pull Requests and Issues][GitHub templates] are a
      good idea but not required.
  2. Formal
    + In addition to the "informal" standards the [Lean-RFC] process is meant
      to be linked to from many projects and to remain as "in the background"
      as possible.
    + Meant for projects of any substantial size.
      * Many features of varying scope and impact.
      * Many clients or users.
      * Many contributors or "concerned parties".


## CODE_OF_CONDUCT
[CODE_OF_CONDUCT]: #code-of-conduct

An explicit declaration of a Code of Conduct will help provide clarity around
interpersonal exchange expectations.


[Lean-RFC]: https://github.com/kalisjoshua/lean-rfc
[GitHub templates]: https://github.com/blog/2111-issue-and-pull-request-templates
