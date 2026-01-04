require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const emailToDelete = process.argv[2];

if (!emailToDelete) {
    console.log('Usage: node deleteUserByEmail.js <email>');
    console.log('Example: node deleteUserByEmail.js dassi@gmail.com');
    process.exit(1);
}

async function deleteUser() {
    try {
        await mongoose.connect(process.env.DATABASE_URI || process.env.MONGO_URI);
        console.log('✓ Connected to MongoDB\n');
        
        const user = await User.findOne({ email: emailToDelete });
        
        if (!user) {
            console.log(`✗ User with email "${emailToDelete}" not found.`);
        } else {
            await user.deleteOne();
            console.log(`✓ User deleted successfully:`);
            console.log(`  Name: ${user.name}`);
            console.log(`  Username: ${user.userName}`);
            console.log(`  Email: ${user.email}`);
        }
        
        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('✗ Error:', error.message);
        process.exit(1);
    }
}

deleteUser();
