const objFilter = require('../lib');

describe('nested-object-filter', () => {
    const payload = {
        personal: {
            is_business: true,
            business_name: 'Business Name',
            business_description: 'Business description here',
            gender: 'Male',
            city: 'Tema',
            Region: 'Greater Accra',
            country: 'Ghana',
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
        
	it('Will filter data from object', () => {
		const filter_options = [
			[
				'personal',
				[
					'is_business',
					'business_name',
					[ 'social', [ 'website', 'twitter', [ 'statistics', [ 'followers', 'following' ] ] ] ]
				]
			],
			[ 'meta', [ 'last-login', 'login-count', [ 'info', [ 'timestamp', 'user_id' ] ] ] ],
			[ 'other-property' ]
		];

		const result = {
			personal: {
				is_business: true,
				business_name: 'Business Name',
				social: {
					website: 'website-link',
					twitter: 'twitter-link',
					statistics: {
						followers: 1000,
						following: 62000
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

		const filteredData = objFilter(payload, filter_options);
		expect(filteredData).not.toBe(null);
		expect(filteredData).toBeInstanceOf(Object);
		expect(filteredData).toEqual(result);
	});

	it('will return an empty object if filtered options did not match any', () => {
		const firstParam = {};
		const filter: any = [ [ 'person' ], [ 'age' ] ];
		const result = {};
		const response = objFilter(firstParam, filter);
		expect(response).not.toBeNull;
		expect(response).toEqual(result);
	});

	it('Will throw an error if first parameter is not an object', () => {
		try {
			const firstParam = 'string';
			const secondParam: any = [];
			objFilter(firstParam, secondParam);
		} catch (error) {
			const errorMsg = 'first parameter should be of type object';
			expect(error.message).toEqual(errorMsg);
		}
	});

	it('Will throw an error if second parameter is not an array', () => {
		try {
			const firstParam = {};
			const secondParam = 'string';
			objFilter(firstParam, secondParam);
		} catch (error) {
			const errorMsg = 'second parameter should be of type array';
			expect(error.message).toEqual(errorMsg);
		}
	});

	it('Will filter data from object with dot notation keys', () => {

		const filter_options = [
			[
				'personal',
				[
					'is_business',
					'business_name',
					'social.website',
					'social.twitter',
					'social.statistics.followers',
					'social.statistics.following'
					// [ 'social', [ 'website', 'twitter', [ 'statistics', [ 'followers', 'following' ] ] ] ]
				]
			]
		];

		const result = {
			personal: {
				is_business: true,
				business_name: 'Business Name',
				'social.website': 'website-link',
				'social.twitter': 'twitter-link',
				'social.statistics.followers': 1000,
				'social.statistics.following': 62000
			}
		};

		const filteredData = objFilter(payload, filter_options);
		console.log('filteredData', filteredData);
		expect(filteredData).not.toBe(null);
		expect(filteredData).toBeInstanceOf(Object);
		expect(filteredData).toEqual(result);
    });
    
    it('more advance mix of normal keys and dot named keys', () => {
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

		const filteredData = objFilter(payload, filter_options);
		expect(filteredData).not.toBe(null);
		expect(filteredData).toBeInstanceOf(Object);
		expect(filteredData).toEqual(result);
    });
    
    it('one level array usage works', () => {
		
		const filter_options = [
            'personal.social.whatsapp', 
            'personal.social.website', 
            'personal.social.statistics.followers',
            'personal.social.statistics.following',
            'personal.is_business',
            'personal.business_description',
            'meta.last-login',
            'meta.login-count'
		];
		const result = {
            'personal.social.whatsapp': 'whatsapp-link-here', 
            'personal.social.website': 'website-link', 
            'personal.social.statistics.followers': 1000,
            'personal.social.statistics.following': 62000,
            'personal.is_business': true,
            'personal.business_description': 'Business description here',
            'meta.last-login': 1574187006717,
            'meta.login-count': 100
		};

		const filteredData = objFilter(payload, filter_options);
		expect(filteredData).not.toBe(null);
		expect(filteredData).toBeInstanceOf(Object);
		expect(filteredData).toEqual(result);
	});
});
