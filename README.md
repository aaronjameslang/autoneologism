# autoneologism [![NPM](https://nodei.co/npm/autoneologism.png?mini=true)](https://nodei.co/npm/autoneologism/) [![Build Status](https://travis-ci.org/aaronjameslang/autoneologism.svg?branch=develop)](https://travis-ci.org/aaronjameslang/autoneologism)



A word generator that teaches itself your phonotactics

## Example Usage



```js
> require('autoneologism').generateWords(['another', 'open', 'penmanship', 'answer'])
{ attempts: 10000,
  efficiency: 0.0007,
  words:
   [ 'openmanship',
     'anship',
     'penmanother',
     'penmanswer',
     'pen',
     'openmanswer',
     'openmanother' ] }
```

## Development

`npm run build` probably does what you want

Check `package.json` for more scripts
