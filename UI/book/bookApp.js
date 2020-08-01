///<reference path="../angular.js"/>

var myApp = angular.module('bookApp', []);


myApp.factory("BookServices", ($http) => {
    let factory = {}
    const urlPrefix = "http://localhost:3000/"

    factory.GetAllBooks = function () {
        var response = $http({
            method: "get",
            url: urlPrefix + "getallbookNames",
            // data: request
        });
        return response;
    };

    factory.insertBook = function (request) {
        var response = $http({
            method: "post",
            url: urlPrefix + "insertBook",
            data: request
        });
        return response;
    };
    factory.deleteBook = function (request) {
        var response = $http({
            method: "post",
            url: urlPrefix + "DeleteBook",
            data: request
        });
        return response;
    };

    factory.UpdateBook = function (request) {
        var response = $http({
            method: "post",
            url: urlPrefix + "UpdateBook",
            data: request
        });
        return response;
    };

    return factory;
});

myApp.controller('BookController', ['$scope', "BookServices", function ($scope, BookServices) {
    $scope.configure = () => {
        $scope.getAllBooks();

    }
    $scope.edit = (book) => {
        console.log(book);
        book.isEdit = true;
    }
    $scope.update = (book) => {
        book.isEdit = false;
    }
    $scope.no = (book) => {
        book.isEdit = false;
    }
    //CRUD Calls 
    $scope.delete = (book) => {
        console.log(book);
        
        BookServices.deleteBook({ id: book.idbook })
            .then((result) => {
                console.log(result);
                $scope.getAllBooks();
            }).catch((err) => {
                console.log(err)
            });
    }
    $scope.insertBook = () => {
        if ($scope.bookName && $scope.bookAuthor) {
            BookServices.insertBook({ bookName: $scope.bookName, bookAuthor: $scope.bookAuthor })
                .then((result) => {
                    console.log(result);
                    $scope.getAllBooks();
                    $scope.bookName = "";
                    $scope.bookAuthor = "";
                })
                .catch((err) => {
                    console.log(err)
                })
            console.log($scope.bookName);
        }
    }

    $scope.UpdateBook = (book) => {
        if (book.bookname && book.bookauthor) {
            book.isEdit = false;
            BookServices.UpdateBook({ bookName: book.bookname, bookAuthor: book.bookauthor, id: book.idbook })
                .then((result) => {
                    console.log(result);
                    $scope.getAllBooks();

                })
                .catch((err) => {
                    console.log(err)
                })
            console.log($scope.bookName);
        }
    }

    $scope.getAllBooks = () => {
        BookServices.GetAllBooks().then((result) => {

           
           
            if (result.data) {
                $scope.allBooks = result.data;
                $scope.allBooks.map((AB) => {
                    AB.isEdit = false;
                });
            }
        }).catch(() => {

        });
    }
    $scope.configure();
}]);

