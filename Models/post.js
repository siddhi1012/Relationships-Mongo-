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
    users: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Customer", postSchema);

const addData = async () => {
    let user1 = new User({
        username: "Prasad",
        email: "abc@gmail.com"
    });

    let post1 = new Post({
        content: "Bye Bye",
        likes: 7,
    });
    post1.user = user1;

    await user1.save();
    await post1.data();
}

addData();