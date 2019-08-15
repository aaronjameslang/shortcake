# 🍰 shortcake [![Build Status](http://travis-ci.org/aaronjameslang/shortcake.svg?branch=master)](//travis-ci.org/aaronjameslang/shortcake) [![Known Vulnerabilities](http://snyk.io/test/github/aaronjameslang/shortcake/badge.svg)](//snyk.io/test/github/aaronjameslang/shortcake)
shortcake is a url shortener, but with cake

## Usage

### Shorten a URL

Request:
`POST https://s.ajla.ng/shortening`
```json
{
    "initialUrl": "https://example.com"
}
```
Reponse:
```json
{
  "id": "test",
  "initialUrl": "https://example.com",
  "shorterUrl": "s.ajla.ng/test"
}
```

### Retrieve original URL

Request:
`GET  https://s.ajla.ng/shortening/test`

Reponse:
```json
{
  "id": "test",
  "initialUrl": "https://example.com",
  "shorterUrl": "s.ajla.ng/test"
}
```

### Redirection

Visit [`https://s.ajla.ng/test`](https://s.ajla.ng/test) to be redirected

## Contribution [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Please use [Conventional Commits](https://conventionalcommits.org)

### Cloud Resources

The service is hosted on AWS, and deployed using serverless.

All resources are in the serverless stack. New resources must be added to the serveress template, not created adhoc.

### Decisions

- Earlier interations were back by a PostgreSQL DB but this was expensive.
  We have since moved to DynamoDB, however in doing so lost auto-increment IDs,
  and so switched to using random IDs instead. This has made the shortened links
  a uniform length, and so a compromise between length and collision safety was made.
  In a production environment priorities would be different and so an RDB would
  likely be preferable.

  For now ID's are 4 random base64 characters 

### Potential Improvements

- Check for exisiting matching db entries before creating a new one. This would slow down url shortening but reduce needed storage space. Unlikely to be beneficial overall.

- Publish API documentation.

- Investigate moving more of the routing logic into APIGW to reduce lambda run times and costs.

- Consider producing an SDK if this API starts to see a lot of use.

- If the API becomes more complex, consider using TS or another strongly typed language.

- The tests currently leave litter in the DB, and rely of the DB to be up and in a certain state. Consider making them more robust.

- They is currently no hard limit on the length of the urls submitted, investigate if this could be exploited by a malicious party and the options for prevention.

- Add more tests for unhappy paths.

- Investigate if storing/redirecting to some url schemes (e.g. ftp, irc) is exploitable and should be prevented.

- Exclude docs and such from deployed lambda.

- There is currently on one deployment environment, which means the tests and prod app use the same database. Create seperate environments.

- Redirect the root path to something useful like the readme

- Return 404 for non-routes instead of AWS's `Missing Authentication Token`

- See `TODO`s in code

### Scaling Issues

#### Space

Curently IDs are 3 random bytes. At one request per second, we will start
seeing collisions at a rate of 10% in less than 3 weeks. Clearly this is not suitable for production.

Setting up automatic expiry of old links and reusing IDs will buy us time if needed, and prevent us paying for storage that we no longer need.

Currently the maximum length of an ID is 4 characters. If this limit is increased or more routes are added, generated IDs could coincide with other routes and cause problems. One solution would be to host the redirection service on a seperate subdomain to the api proper.

#### Time

Consider how our redirects are being cached (temporary/permant). Improving caching would reduce load and user wait times, but may not be feasible if we start reusing IDs.
