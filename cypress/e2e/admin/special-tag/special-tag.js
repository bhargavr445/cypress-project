const specialtagsMockData = {

    dataToAdd: { description: 'Florida Transit', tagName: 'FTY', active: true },

    
    gridResponse: {
        "content": {
            "items": [
                {
                    "id": 65,
                    "locationId": "AMA082",
                    "tagName": 'TXT',
                    "description": 'texas Transit',
                    "active": false,
                    "createDate": "2023-08-11T00:00:00",
                    "updateDate": "2022-11-18T00:00:00"
                },
                {
                    "id": 64,
                    "locationId": "AMA082",
                    "tagName": "LRG",
                    "description": "Large Aircraft",
                    "active": true,
                    "createDate": "2023-08-11T00:00:00",
                    "updateDate": "2022-11-18T00:00:00"
                },
                {
                    "id": 66,
                    "locationId": "AMA082",
                    "tagName": 'FTY',
                    "description": 'Florida Transit',
                    "active": true,
                    "createDate": "2023-08-11T00:00:00",
                    "updateDate": "2022-11-18T00:00:00"
                }
            ]
        },
        "error": {
            "code": 0,
            "messages": [],
            "isError": false
        },
        "isSuccess": true
    },

    gridResponseWithNoRecords: {
        "content": {
            "items": [
                
            ]
        },
        "error": {
            "code": 0,
            "messages": [],
            "isError": false
        },
        "isSuccess": true
    },

    addNewTagResponse: {
        "content": {
            "success": true
        },
        "error": {
            "code": 0,
            "messages": [],
            "isError": false
        },
        "isSuccess": true
    },

    addNewTagErrorResponse: {
        "content": null,
        "error": {
            "code": 500,
            "messages": [
                "Insert Special Tag Error in Service: InsertSpecialTag DB error : Error  InsertSpecialTag DB error : Error code :  50000 and error message Data already exists for this combination. . ."
            ],
            "isError": true
        },
        "isSuccess": false
    },

    tableHeaders: ['Actions', 'Tag Name', 'Description', 'Active']

}

export default specialtagsMockData;