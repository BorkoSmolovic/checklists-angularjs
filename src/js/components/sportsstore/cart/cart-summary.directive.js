(function () {
        'use strict';

        angular
            .module('app.components.sportsstore')
            .directive('cartSummary', cartSummary);

        cartSummary.$inject = ['cart'];

        function cartSummary(cart) {
            return {
                restrict: "E",
                templateUrl: "components/sportsstore/cart/cart.template.html",
                controller: function () {
                    var ctrl = this;
                    var cartData = cart.getProducts();
                    ctrl.total = function () {
                        var total = 0;
                        for (var i = 0; i < cartData.length; i++) {
                            total += (cartData[i].price * cartData[i].count);
                        }
                        return total;
                    };
                    ctrl.itemCount = function () {
                        var total = 0;
                        for (var i = 0; i < cartData.length; i++) {
                            total += cartData[i].count;
                        }
                        return total;
                    };

                    ctrl.totalValue = ctrl.total();
                    ctrl.itemCountValue = ctrl.itemCount();
                },
                controllerAs: 'ctrl',
                bindToController: true

            };
        }

    }

)();
