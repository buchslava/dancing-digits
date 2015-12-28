	angular.module('todoController', [])

		.controller('mainController', ['$http','Todos', function($http, Todos) {
			var self = this;

			self.formData = {};
			self.loading = true;

			Todos
			  .get()
				.success(function(data) {
					self.todos = data;
					self.loading = false;
				});

			self.createTodo = function() {
				if (self.formData.text) {
					self.loading = true;

					Todos
					  .create(self.formData)
						.success(function(data) {
							self.loading = false;
							self.formData = {};
							self.todos = data;
						});
				}
			};
		}]);
