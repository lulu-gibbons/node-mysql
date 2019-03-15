const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '35panTs22*',
  database: 'bamazon',
});

connection.connect(function(err) {
  if (err) throw err;
  //console.log("Connection Successful");
  displayItems();
});
//logging each product's main info
var displayItems = function(){
  connection.query("SELECT * FROM products", function(err, res){
    console.log(" ");
    console.log("+------------------------------------------------------------------------------+");
    console.log("PRODUCT LIST");
    console.log("+------------------------------------------------------------------------------+");

    for (var i = 0; i < res.length; i++){
      console.log(res[i].item_id + " --- PRODUCT NAME: " + res[i].product_name + " || PRICE: $" + res[i].price);
    }

    console.log("+------------------------------------------------------------------------------+\n");
    purchaseItem(res);
  });
}
//Customer prompts
function purchaseItem(){
  connection.query("SELECT * FROM products", function(err, res) {
		if (err) throw err;

    //console.log(res);

  inquirer.prompt([{
    type: 'input',
    name: 'choice',
    message: "What product would you like to buy?"
  }]).then(function(answer){

    var correct = false;

    for (var i = 0; i < res.length; i++) {
      if (res[i].product_name == answer.choice) {
        correct = true;
        var product = answer.choice;
        var id = i;

        inquirer.prompt({ //customer prompt for quantity to buy
          type: 'input',
          name: 'quantity',
          message: "How many would you like to buy?",
          validate: function(value){ //validates the entry
            if(isNaN(value) == false){
              return true;
            } else {
              return false;
            }
          }
          //Updates product stock in mysql database after a purchase is made
        }).then(function(answer){
          if((res[id].stock_quantity-answer.quantity)>0){
            connection.query("UPDATE products SET stock_quantity='"+(res[id].stock_quantity-answer.quantity)+"' where product_name='"+product+"'", function (err, res2){

              console.log(" ");
              console.log("===============================");
              console.log("Thank you for your purchase of " + answer.quantity + " " + res[id].product_name + ".");
              console.log("Your Total is $" + res[id].price * answer.quantity);
              console.log("===============================");
              console.log(" ");
              //connection.end();
              continueShopping();

            })
          } else {
            //produces an error if that product is out of stock
            console.log("Insufficient Quantity. Please select a different item.");
            purchaseItem(res);
          }
        })
      }
    }
    //produces an error message when an incorrect input has been entered
    if(i==res.length && correct==false){
      console.log("That product isn't available. Please enter a valid product.");
      purchaseItem(res);
    }
  })
})
}

function continueShopping(){
	inquirer
		.prompt([{
			name: "yes",
			type: "confirm",
			message: "Would you like to continue shopping?\n"
		}]).then(function(answer) {
		if(answer.yes) {
			purchaseItem();
		}
		else {
			console.log("Thanks for shopping with us!");
			connection.end();
		}
	});
}
