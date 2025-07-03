// Vercel serverless function for all API routes
import { storage } from '../dist/server/storage.js';
import { insertUserSchema, insertIntentionSchema } from '../dist/shared/schema.js';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { url, method } = req;
  
  try {
    // Auth routes
    if (url.includes('/api/auth/register') && method === 'POST') {
      const userData = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByUsername(userData.username);
      
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      const user = await storage.createUser(userData);
      return res.json({ user: { id: user.id, username: user.username } });
    }
    
    if (url.includes('/api/auth/login') && method === 'POST') {
      const { username, password } = req.body;
      const user = await storage.verifyPassword(username, password);
      
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      return res.json({ user: { id: user.id, username: user.username } });
    }
    
    // Intentions routes
    if (url.includes('/api/intentions')) {
      const userId = parseInt(req.query.userId);
      
      if (method === 'GET') {
        const intentions = await storage.getUserIntentions(userId);
        return res.json(intentions);
      }
      
      if (method === 'POST') {
        const intentionData = insertIntentionSchema.parse(req.body);
        const intention = await storage.createIntention(intentionData);
        return res.json(intention);
      }
      
      if (method === 'DELETE') {
        const intentionId = parseInt(req.query.id);
        const deleted = await storage.deleteIntention(intentionId, userId);
        return res.json({ success: deleted });
      }
    }
    
    // Default response for unmatched routes
    return res.status(404).json({ message: 'Not Found' });
    
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}