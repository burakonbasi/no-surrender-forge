import mongoose from 'mongoose';
import Card from '../src/models/Card';
import cardsData from '../../../cards.json';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ns_case';

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Mevcut kartları temizle
    await Card.deleteMany({});
    console.log('Cleared existing cards');
    
    // Yeni kartları ekle
    await Card.insertMany(cardsData);
    console.log(`Seeded ${cardsData.length} cards`);
    
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seed();