# Nested-Object-Filter
![NPM](https://img.shields.io/npm/l/nested-object-filter) ![npm](https://img.shields.io/npm/v/nested-object-filter?label=version) [![Build Status](https://travis-ci.org/MohammedBashiru/nested-object-filter.svg?branch=master)](https://travis-ci.org/MohammedBashiru/nested-object-filter) [![Coverage Status](https://coveralls.io/repos/github/MohammedBashiru/nested-object-filter/badge.svg?branch=master)](https://coveralls.io/github/MohammedBashiru/nested-object-filter?branch=master) ![GitHub top language](https://img.shields.io/github/languages/top/MohammedBashiru/nested-object-filter)

This package allows you to filter nested javascript object regardless how nested the object is.
You specify an array of nested arrays to filter object based on how deep you want to filter.

### Current Version 1.2.3

### Version 1.0.0
- Initial Release

#### Note!: Reference test file for more samples

### Whats new ?
1.  Support Nested Object with nested object paths ref test file
2.  Supports Nested object with simple object paths. ref test file
3.  Has both named and default export for commonJS;

## Installation
```npm install nested-object-filter```

## Simple Usage
```javascript
    const objFilter = require("nested-object-filter");
    const sourceObject = {
        personal: {
            is_business: true,
            business_name: 'Business Name',
            business_description: 'Business description here',
            gender: 'Male',
            city: 'Unknown',
            Region: 'Unknown',
            country: 'Unknown',
            social: {
                whatsapp: 'whatsapp-link-here',
                website: 'website-link',
                facebook: 'facebook-link',
                twitter: 'twitter-link',
                instagram: 'instagram-link',
                statistics: {
                    followers: 1000,
                    following: 62000,
                    likes: 14000,
                    dislikes: 9000
                }
            }
        },
        meta: {
            'last-login': 1574187006717,
            'login-count': 100,
            info: {
                timestamp: 1574178847,
                user_id: 'JhbGciOiJIUzI1NiIsInR5'
            }
        },
        'other-property': 'Other value here'
    };

    const filter_options = [
            [ 'personal.social', 
                [
                    'statistics.followers',
                    'statistics.following'
                ]
            ],
            [ 'personal.is_business'],
            [ 'personal.business_description'],
            [ 'meta.last-login'],
            [ 'meta.login-count'],
            [ 'meta', 
                [
                    ['info', [
                        'timestamp',
                        'user_id'
                    ]]
                ]
            ]
		];

        const filteredData = objFilter(sourceObject, filter_options); 
		const result = {
			'personal.social': {
                'statistics.followers': 1000,
                'statistics.following': 62000
            },
            'personal.is_business': true,
            'personal.business_description': 'Business description here',
            'meta.last-login': 1574187006717,
            'meta.login-count': 100,
            'meta': {
                'info': {
                    'timestamp': 1574178847,
                    'user_id': 'JhbGciOiJIUzI1NiIsInR5'
                }
            }
		};
```

## Advanced Usage ( Nested Object, key paths and names) 
```javascript

    const filter_options = [
            [ 'personal.social', 
                [
                    'statistics.followers',
                    'statistics.following'
                ]
            ],
            [ 'personal.is_business'],
            [ 'personal.business_description'],
            [ 'meta.last-login'],
            [ 'meta.login-count'],
            [ 'meta', 
                [
                    ['info', [
                        'timestamp',
                        'user_id'
                    ]]
                ]
            ]
		];
        const filteredData = objFilter(sourceObject, filter_options); 

		const result = {
			'personal.social': {
                'statistics.followers': 1000,
                'statistics.following': 62000
            },
            'personal.is_business': true,
            'personal.business_description': 'Business description here',
            'meta.last-login': 1574187006717,
            'meta.login-count': 100,
            'meta': {
                'info': {
                    'timestamp': 1574178847,
                    'user_id': 'JhbGciOiJIUzI1NiIsInR5'
                }
            }

		};

```
## Advanced Usage Samples
```javascript
    const objFilter = require("nested-object-filter")
    const payload = {
        "personal": {
            "is_business": true,
            "business_name": "Business Name",
            "business_description": "Business description here",
            "gender": "Male",
        },
        "description": "more information as description"
        "meta": {
            "last-login": 1574187006717,
            "login-count": 100
        }
    }
```
If we wanted to extract only **personal** and **description** properties from the object. We will have to represent each property in an array like

```javascript
    // Note that options container has to be an array.
    const filter_options = [
        // Filter options goes here.
    ]

    const filter_options = [
        ["personal"],
        ["description"] //This is how to specify each field to extract from object.
    ]
```

If a property is an object and you want to filter it's children you would have to add another array. Example
if we wanted to extract **business_name, business_description** from the **personal** property we will structure object as
```javascript
    const filter_options = [
        [
            "personal", [ //To filter fields from personal property
                "business_name", "business_description",
                //If a field here was an object which you would like to filter its properties, You will have to open another [bracket] like

                //note that here **another-field** is part of fields to filter for **personal** 
                [ "another-field", ["fields to filter"]]
            ] //Everything within this [bracket] is for the **personal** property
    ]

```

## Summary

```javascript
    const objFilter = require("nested-object-filter")
    const payload = {
        "personal": {
            "is_business": true,
            "business_name": "Business Name",
            "business_description": "Business description here",
            "gender": "Male",
        },
        "description": "more information as description"
        "meta": {
            "last-login": 1574187006717,
            "login-count": 100
        }
    }

    const filter_options = [
        ["personal", ["gender"]],
        ["description"] //This is how to specify each field to extract from object.
    ]

    const result = objFilter(payload, filter_options)

    console.lg(result)
    //Outputs
    {
        personal: {
            gender: "Male"
        },
        description: "more information as description"
    }


```

## Full Usage

 ```javascript
    const objFilter = require("nested-object-filter")
    const payload = {
            "personal": {
                "is_business": true,
                "business_name": "Business Name",
                "business_description": "Business description here",
                "gender": "Male",
                "city": "Tema",
                "Region": "Greater Accra",
                "country": "Ghana",
                "social": {
                    "whatsapp": "whatsapp-link-here",
                    "website": "website-link",
                    "facebook": "facebook-link",
                    "twitter": "twitter-link",
                    "instagram": "instagram-link",
                    "statistics": {
                        "followers": 1000,
                        "following": 62000,
                        "likes": 14000,
                        "dislikes": 9000
                    }
                }
            },
            "meta": {
                "last-login": 1574187006717,
                "login-count": 100,
                "info": {
                    "timestamp": 1574178847,
                    "user_id": "JhbGciOiJIUzI1NiIsInR5",
                    "req_id": "JzKv2itJ89XZ2NP0-T8oqZL2ppLM"
                }
            },
            "other-property": "Other value here"
        }

    const filter_options = [
            [
                "personal", [ "is_business", "business_name", ["social", ["website", "twitter", ["statistics", ["followers", "following"]] ]] ]
            ],
            [
                "meta", [ "last-login", "login-count", ["info", ["timestamp", "user_id"]] ]
            ],
            [ "other-property"]
        ]

    const filteredData = objFilter(payload, filter_options);
    // Output
        {
            "personal": {
                "is_business": true,
                "business_name": "Business Name",
                "social": {
                    "website": "website-link",
                    "twitter": "twitter-link",
                    "statistics": {
                        "followers": 1000,
                        "following": 62000
                    }
                }

            },
            "meta": {
                "last-login": 1574187006717,
                "login-count": 100,
                "info": {
                    "timestamp": 1574178847,
                    "user_id": "JhbGciOiJIUzI1NiIsInR5"
                }
            },
            "other-property": "Other value here"
        }
```