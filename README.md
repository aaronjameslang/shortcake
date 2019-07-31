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
  "id": 1,
  "initialUrl": "https://example.com",
  "shorterUrl": "s.ajla.ng/B"
}
```

### Retrieve original URL

Request:
`GET  https://s.ajla.ng/shortening/B`

Reponse:
```json
{
  "id": 1,
  "initialUrl": "https://example.com",
  "shorterUrl": "s.ajla.ng/B"
}
```

### Redirection

Visit [`https://s.ajla.ng/B`](https://s.ajla.ng/B) to be redirected

## Contribution [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Please use [Conventional Commits](https://conventionalcommits.org)

### Cloud Resources

The service is hosted on AWS, and deployed using serverless.

All resources are in the serverless stack. New resources must be added to the serveress template, not created adhoc.

Serverless will create the secret, but you must populate it after the first deploy. This is where the DB credentials are stored.

The postgres DB is currently not part of the IaC, due to time constraints. It is a single database and table:

```sql
CREATE DATABASE shortcake;

CREATE TABLE shortening (
  id SERIAL PRIMARY KEY,
  url TEXT
);
```

### Potential Improvements

- Check for exisiting matching db entries before creating a new one. This would slow down url shortening but reduce needed storage space. Unlikely to be beneficial overall.

- Consider using the `pguri` postgres package. We are not doing anything clever with the urls so this is unlikely to offer much.

- Publish API documentation.

- Investigate moving more of the routing logic into APIGW to reduce lambda run times and costs.

- Consider producing an SDK if this API starts to see a lot of use.

- If the API becomes more complex, consider using TS or another strongly typed language.

- The tests currently leave litter in the DB, and rely of the DB to be up and in a certain state. Consider making them more robust.

- They is currently no hard limit on the length of the urls submitted, investigate if this could be exploited by a malicious party and the options for prevention.

- Add more tests for unhappy paths.

- Postgres is expensive, consider a free alternative such as DynamoDB.

- Investigate how the DB will behave when the id column reaches it's max. Consider adding monitoring to alert when this is soon.

- Investigate if storing/redirecting to some url schemes (e.g. ftp, irc) is exploitable and should be prevented.

- Exclude docs and such from deployed lambda.

- Since the slugs are predictable, all the original links are public. Any sensitive query paramters are exposed.

- The spec requires that shortenings are retrieved by slug, rather than ID, which is unusual for a REST API. Consider changing.

- There is currently on one deployment environment, which means the tests and prod app use the same database. Create seperate environments.

- See `TODO`s in code

### Scaling Issues

#### Space

IDs are currently 31 bit intergers. That is, they are positive signed 32 bit integers. This is realised in the DB column type,
and the currrent application logic relies on this maximum. This limit can be increased, but will cost some complexity. At a rate of one entry per second, this limit should last almost 35 years.

Setting up automatic expiry of old links and reusing IDs will buy us time if needed, and prevent us paying for storage that we no longer need.

Currently the maximum length of a slug is 6 characters. If this limit is increased or more routes are added, generated slugs could coincide with other routes and cause problems. One solution would be to host the redirection service on a seperate subdomain to the api proper.

#### Time

Consider how our redirects are being cached (temporary/permant). Improving caching would reduce load and user wait times, but may not be feasible if we start reusing IDs.

Pooling database connections may improve performance under load.

## Specification

[https://github.com/paybyphone/node-shortener-api-test](https://github.com/paybyphone/node-shortener-api-test)

[PDF Version](spec.pdf)

After inquiry futher clarifications included:

> Having an ID  is part of spec, where consumers of this API could use it as a unique identifier for the shortened record

> The URI and payload is an example and do not specify a coding standard or a spec

In light of this the API diverges from the spec for the sake of adhering to convetions and minimising suprise.
