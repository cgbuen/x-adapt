# x-adapt

Testing out the use of Adapt for XDN for origin transformations.

## Setup

```
npm ci
npm start
```

Then open http://localhost:3000.

## Notes/Caveats

As of 1/20/2021.

- As it only runs on localhost, this could have issues with using origin cookies.
- There does not seem to be inherent support for subdomains or multidomains,
  which is not problematic right now, but could become a problem if a prospect
  or client requires this.
- Different upstreams have different requirements out of the box. Live Aquaria
  requires a desktop UA; Amerimark won't work unless CSP headers are removed.
