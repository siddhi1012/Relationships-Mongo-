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


const userSchema = new Schema({
    username: String,
    email: String
});

const postSchema = new Schema({
    content: String,
    likes: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

// const addData = async () => {

//     // let user1 = new User({
//     //     username: "Prasad",
//     //     email: "abc@gmail.com"
//     // });

//     // let post1 = new Post({
//     //     content: "Bye Bye",
//     //     likes: 7,
//     // });
//     let user = await User.findOne({ username: "Prasad" });

//     let post2 = new Post({
//         content: "Hello World",
//         likes: 4,
//     });
//     // post1.user  = user1;
//     post2.user = user;

//     //await user1.save();
//     await post2.save();
// }

// addData();


// Print information through it
const getData = async () =>{
    let result = await Post.findOne({}).populate("user");
    console.log(result);
}

getData();