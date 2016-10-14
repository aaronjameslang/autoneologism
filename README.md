# autoneologism [![Build Status](https://travis-ci.org/aaronjameslang/autoneologism.svg?branch=develop)](https://travis-ci.org/aaronjameslang/autoneologism)
A word generator that teaches itself your phonotactics

## Example Usage

```js
> require('autoneologism').generateWords(['another', 'open', 'penmanship', 'answer'], 3, 100)
{ attempts: 10000,
  efficiency: 0.0007,
  words:
   [ 'penmanother',
     'anship',
     'openmanother',
     'pen',
     'openmanswer',
     'openmanship',
     'penmanswer' ] }
```

## Development

`npm run build` probably does what you want

Check `package.json` for more scripts
