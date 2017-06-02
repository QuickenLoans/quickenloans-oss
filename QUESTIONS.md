# Important Questions


**What is the process for releasing a project as open source?**

The full description in - hopefully - complete detail is documented in the
[Project Proposal] guidelines; but the short checklist is:

  1. Proposal
  2. Discussion
  3. Review
    1. Subject Matter Expert
    2. Security
    3. Legal
  4. Touch-ups
  5. Acceptance


**What are the requirements of an open source project?**

The full description in - hopefully - complete detail is documented in the
[Project Structure] guidelines;  but the short checklist is:

  1. README.md
  2. CONTRIBUTING.md


**When should I open/start a proposal for a project?**

If you are unsure about proposing that a project should be released as open
source reach out:

  - Email - opensource@quickenloans.com
  - HipChat - [Team] Open Source
  - Personally - to any of the team members
    + Matt Colf
      * MattColf@quickenloans.com
    + Josh Kalis
      * JoshKalis@quickenloans.com
    + Steve Kluck
      * SteveKluck@quickenloans.com

Generally speaking, as early as possible is a good rule of thumb for when to
propose a new project for open source. Sharing with the greater community of
developers benefits us all.


**Who should Fork an external repository; me or QL?**

Presuming the project in question is going to be something that is used for the
foreseeable future the criteria to follow for this question comes to, "Which
repository is going to be 'tracked' by Quicken Loans?" If the repository that
will be tracked is the Fork then Quicken Loans should Fork the project;
otherwise you are free to Fork the repository personally.

To contrast the two, if you wanted to contribute to an open source project that
is used at Quicken Loans you would Fork the repository personally and work as
normal for that project; however, if we needed to use a customized version of
an open sourced project then Quicken Loans should Fork the repository because
the customization QL needs should be maintained for our own use.


**What if I want to open source a project that QL doesn't want to?**

There are - at least - two situations here:

  1. Quicken Loans does not want the project released as open source.
  2. Quicken Loans does not want to own the project as open source.

In the first case, sorry, but if it was developed at, or for, Quicken Loans and
it is not in the best interest of Quicken Loans to release it as open source
then there isn't much else that can happen.

In the second case you may get permission - and possibly a special license - to
release the project yourself.

Essentially it comes down to a single premise, "Quicken Loans has the right of
first refusal; if a project was developed for Quicken Loans or on Quicken
Loans' time."


**What if I leave Quicken Loans, and/or the FOC, will I still be able to
support my project; which Fork will be the canonical repository?**

Yes; and, it depends. Yes you will still be able to contribute to the project,
it is still an open source project after all. As to which repository will be
the canonical Fork is dependent on who is contributing and what interest
Quicken Loans has in the project.

If you are the primary, and majority, contributor Quicken Loans *may* transfer
the repository to you.


**What happens to unmaintained projects?**

Simple, they will be removed from the listed projects; the repository will not
be deleted or changed in any significant way. It will fall in the list of
projects, and may be tagged as "inactive" on GitHub due to inactivity; so sad.


**What is expected of *maintainers*?**

Releasing a project as open source will mean that you are a "maintainer" of
that project and are expected to uphold the values of Quicken Loans.
Specifically, you must respond to all pull requests, issues, chat or other
communication in the best interest of the project and Quicken Loans. You also
are entrusted with the day to day maintenance of the project, including
resolving bugs, security issues, and generally keeping the project up to date
and usable by others.

GitHub has a good guide on this topic; [Best Practices for Maintainers].


**What is "valid" open source content?**

Anything that is not a market differentiator or gives competitive advantage.



[Best Practices for Maintainers]: https://opensource.guide/best-practices/
[Project Proposal]: PROPOSAL.md
[Project Structure]: STRUCTURE.md
