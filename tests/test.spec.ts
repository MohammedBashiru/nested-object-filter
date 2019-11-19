const objFilter = require("../lib")

describe("nested-object-filter", () => {

    it("Will filter data from object", () => {

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

        const result = {
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

        const filteredData = objFilter(payload, filter_options);
        expect(filteredData).not.toBe(null);
        expect(filteredData).toBeInstanceOf(Object)
        expect(filteredData).toEqual(result)
    })

    it("will return an empty object if filtered options did not match any", () => {
        const firstParam = {}
        const filter:any = [
            ["person"],
            ["age"]
        ]
        const result = {}
        const response = objFilter(firstParam, filter)
        expect(response).not.toBeNull;
        expect(response).toEqual(result)
    })

    it("Will throw an error if first parameter is not an object", () => {
        try {
            const firstParam = "string"
            const secondParam: any = [];
            objFilter(firstParam, secondParam)
        } catch(error){
            const errorMsg = "first parameter should be of type object"
            expect(error.message).toEqual(errorMsg)
        }
    })

    it("Will throw an error if second parameter is not an array", () => {
        try {
            const firstParam = {}
            const secondParam = "string"
            objFilter(firstParam, secondParam)
        }catch(error){
            const errorMsg = "second parameter should be of type array"
            expect(error.message).toEqual(errorMsg)
        }
    })
})