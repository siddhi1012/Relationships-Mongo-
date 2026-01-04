const mongoose = require("mongoose");
const { Schema } = mongoose;
main()
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

const orderSchema = new Schema({
    item: String,
    price: Number,
});

//parent
const cutomerSchema = new Schema({
    name: String,
    orders: [{
        type: Schema.Types.ObjectId,
        ref: "Order",
    }]
})

const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", cutomerSchema);

const addCustomer = async () =>{
    let newCust = new Customer ({
        name : "Siddhi Gavhane"
    })
    let newOrder = new Order ({
        item : "Pizza",
        price : 250
    });
    newCust.orders.push(newOrder);
    await newOrder.save();
    await newCust.save();

    console.log("New Customer Added");
}

// only delete Customer not a orders so we use mongoose middleware
const delCust = async () =>{
    let data = await Customer.findByIdAndDelete('6959e4236fcf0070d2d5ffc2');
    console.log("Data Deleted",data);
}

delCust();

//addCustomer();















// const addCustomer = async () => {
//     //     let cust1 = new Customer({
//     //         name: "Prasad Hase",
//     //     });

//     //     let order1 = await Order.findOne({item: "Chips"});
//     //     let order2 = await Order.findOne({item: "5star"});

//     //     cust1.orders.push(order1);
//     //     cust1.orders.push(order2);

//     //     let result = await cust1.save();
//     //     console.log(result);
//     // let result = await Customer.find({});
//     // console.log(result);
//     let result = await Customer.find({}).populate("orders");
     
//     console.log(result[0]);


// }
// addCustomer();



// const addOrder = async () =>{
//    let result =  await Order.insertMany([
//         { item: "samosa", price: 12 },
//         { item: "Chips", price: 5 },
//         { item: "5star", price: 10 },
//     ]) ;
//     console.log(result);
// };
// addOrder();