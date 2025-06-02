### Notes

<!-- work in progress -->

<!-- things to implement as whole -->

<!-- TODO: -->

- fix get session in auth.ts file, you are making 3 db call to get session data
- fix team invitation mail template
- auth not working n production
- fix login / signup form
- add chance role in team member table


LATEST
- fix; when i update the role from org, it should update in /profile/teams and also handle how to update the role in the session

| Work                                                       | Status |
| ---------------------------------------------------------- | ------ |
| add optimistic updates and invalidate the cache on updates | no     |
| properly set middleware for all the mutations              | no     |
| verify organization flow                                   | no     |
| delete my account                                          | no     |



fix this
Error sending verification email: [Error: Invalid login: 535-5.7.8 Username and Password not accepted. For more information, go to
535 5.7.8  https://support.google.com/mail/?p=BadCredentials 41be03b00d2f7-b26eb084428sm16539512a12.57 - gsmtp] {
  code: 'EAUTH',
  response: '535-5.7.8 Username and Password not accepted. For more information, go to\n' +
    '535 5.7.8  https://support.google.com/mail/?p=BadCredentials 41be03b00d2f7-b26eb084428sm16539512a12.57 - gsmtp',
  responseCode: 535,
  command: 'AUTH PLAIN'
}
