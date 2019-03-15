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
  console.log("Connection Successful");
  displayItems();
});
//logging each product's main info
var displayItems = function(){
  connection.query("SELECT * FROM products", function(err, res){
    for (var i = 0; i < res.length; i++){
      console.log("Item Number: " + res[i].item_id + "\n" + "Product Name: " + res[i].product_name + "\n" + "Product Price: $" + res[i].price + "\n");
    }
    purchaseItem(res);
  });
}
//Customer prompts
var purchaseItem = function(res){
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
        inquirer.prompt({
          type: 'input',
          name: 'quantity',
          message: "How many would you like to buy?",
          validate: function(value){
            if(isNaN(value) == false){
              return true;
            } else {
              return false;
            }
          }
        }).then(function(answer){
          if((res[id].stock_quantity-answer.quantity)>0){
            connection.query("UPDATE products SET stock_quantity='"+(res[id].stock_quantity-answer.quantity)+"' where product_name='"+product+"'", function (err, res2){
              console.log("Product Purchased.");
            
            })
          } else {
            console.log("Insufficient Quantity. Please select a different item.");
            purchaseItem(res);
          }
        })
      }
    }
    if(i==res.length && correct==false){
      console.log("That product isn't available. Please enter a valid product.");
      purchaseItem(res);
    }
  })
}
