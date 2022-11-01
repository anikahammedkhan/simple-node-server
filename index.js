const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const users = [
    { id: 1, name: 'John Doe', email: 'afafjkh@gmail.com' },
    { id: 2, name: 'Jane Doe', email: 'fafajkm@gmaol.com' },
    { id: 3, name: 'John Smith', email: 'fahfklh@gmail.com' },
    { id: 4, name: 'Jane Smith', email: 'dasfjkjah@gmail.com' }
];

// username: anikUser1
// password: ZaAhCKOjxoNdHsP9



const uri = "mongodb+srv://anikUser1:ZaAhCKOjxoNdHsP9@cluster0.dwwrr0y.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const userCollection = client.db("simpleNode").collection("users");
        // const user = { name: "John Doe gsdg", email: "fafafayfdfbfasdf@gmail.com" };
        // const result = await userCollection.insertOne(user);
        // console.log(result);
        app.get('/users', async (req, res) => {
            const cursor = userCollection.find({});
            const users = await cursor.toArray();
            res.send(users);
        });


        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            console.log(result);
            user._id = result.insertedId;
            res.send(user);
        })
    }
    finally {

    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Simple node server running');
});

// app.get('/users', (req, res) => {
//     if (req.query.name) {
//         const search = req.query.name.toLowerCase();
//         const filtered = users.filter(user => user.name.toLowerCase().includes(search));
//         res.send(filtered);
//     }
//     else {
//         res.send(users);
//     }
// });


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});