export function getAllEmployees() {
    return fetch("http://dummy.restapiexample.com/api/v1/employees").then(function (response) {
        return response.json();
    }).then(function (response) {
        return response.slice(0);
    });

}

export function getEmployees(id) {
    if(!id){
        id=1;
    }
    return fetch("http://dummy.restapiexample.com/api/v1/employee/"+id).then(function (response) {
        return response.json();
    }).then(function (response) {
        return response;
    });
}

export function createEmployee(employee) {
    return fetch("http://dummy.restapiexample.com/api/v1/create",{
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, same-origin, *omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(employee), // body data type must match "Content-Type" header
    }).then(function (response) {
        return response.json();
    }).then(function (response) {
        return response;
    });
}

export function updateEmployee(employee, id) {
    return fetch("http://dummy.restapiexample.com/api/v1/update/"+id,{
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, same-origin, *omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(employee), // body data type must match "Content-Type" header
    }).then(function (response) {
        return response.json();
    }).then(function (response) {
        return response;
    });
}

export function deleteEmployee(id) {
    debugger;
    return fetch("http://dummy.restapiexample.com/api/v1/delete/"+id,{
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, same-origin, *omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
    }).then(function (response) {
        return response.json();
    }).then(function (response) {
        return response;
    });
}
