const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(cors())
app.use(express.json());


const authRoutes = require('./routes/authRoute');
const chatbotRoutes = require('./routes/chatbotRoutes');
const contactRoutes = require('./routes/contactRoutes');
const profileRoutes = require('./routes/profileroute');

app.use('/api/auth', authRoutes);      
app.use('/api/chatbot', chatbotRoutes);  
app.use('/api', contactRoutes); 
app.use('/api/profile', profileRoutes);  


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
