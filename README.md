Domain Determinator
====

Helpful utility to retrieve common information from your multiple domains.

Given that your site is expanding in domain names, the first option is to save you common interface of domain settings in files.

This module will be helpful with this, you only need to define a common `regexp` field in you multiple JSON files.

## Installation

```
npm install --save domain-determinator
```

Usage

Imagine you have 3 domains, .com, .mx and .co. You will need to define a common regexp field among three JSON files:

```JSON
//./config/domains/com.json
{
  regexp: "^(\\w+\\.){0,1}hyeomans\\.com$",
  commonProperty: 1
}
```

```JSON
//./config/domains/mx.json
{
  regexp: "^(\\w+\\.){0,1}hyeomans\\.mx",
  commonProperty: 2
}
```

```JSON
//./config/domains/co.json
{
  regexp: "^(\\w+\\.){0,1}hyeomans\\.co",
  commonProperty: 3
}
```

To use it you will need to immediately invoke passing the path when you require the module:
```
var domainDeterminator = require('domain-determinator')('/config/domains/');

var settings = domainDeterminator.getSettingsFor('www.hyeomans.com');
console.log(settings.commonProperty) //1
```
