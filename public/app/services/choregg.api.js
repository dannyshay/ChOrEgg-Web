angular
    .module("choregg")
    .factory("choreggAPI", ["$resource", function ($resource) {
        // Wraps the API into something friendly we can call in the Services
        return {
            Categories: $resource('/api/categories', null,
                {
                    'query' : {method: 'GET', isArray:true}
                }),
            Difficulties: $resource('/api/difficulties'),
            GetItemsInTimespan: $resource('/api/items/getItemsInTimespan'),
            Users: $resource('/api/users', null,
                {
                    'query' : {method: 'GET', isArray:true}
                }),
            User: $resource('/api/users/:aUsername', null,
                {
                    'update' : {method: 'PUT'},
                }),
            GetUsersByHighScore: $resource('/api/users/getUsersByHighScore', null,
                {
                    'query' : {method: 'GET', isArray:true}
                })
        };
    }]);