import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertPrayerSchema, insertIntentionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByUsername(userData.username);
      
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      const user = await storage.createUser(userData);
      res.json({ user: { id: user.id, username: user.username } });
    } catch (error) {
      res.status(400).json({ message: "Invalid user data" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      // Use verifyPassword method for both PostgreSQL and MemStorage
      const user = await storage.verifyPassword(username, password);
      
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      res.json({ user: { id: user.id, username: user.username } });
    } catch (error) {
      res.status(400).json({ message: "Login failed" });
    }
  });

  // Prayer routes
  app.get("/api/prayers/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const prayers = await storage.getUserPrayers(userId);
      res.json(prayers);
    } catch (error) {
      res.status(400).json({ message: "Failed to fetch prayers" });
    }
  });

  app.post("/api/prayers", async (req, res) => {
    try {
      const prayerData = insertPrayerSchema.parse(req.body);
      const prayer = await storage.createPrayer(prayerData);
      res.json(prayer);
    } catch (error) {
      res.status(400).json({ message: "Invalid prayer data" });
    }
  });

  app.patch("/api/prayers/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { completed } = req.body;
      const prayer = await storage.updatePrayerCompleted(id, completed);
      
      if (!prayer) {
        return res.status(404).json({ message: "Prayer not found" });
      }
      
      res.json(prayer);
    } catch (error) {
      res.status(400).json({ message: "Failed to update prayer" });
    }
  });

  // Intention routes
  app.get("/api/intentions/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const intentions = await storage.getUserIntentions(userId);
      res.json(intentions);
    } catch (error) {
      res.status(400).json({ message: "Failed to fetch intentions" });
    }
  });

  app.post("/api/intentions", async (req, res) => {
    try {
      const intentionData = insertIntentionSchema.parse(req.body);
      const intention = await storage.createIntention(intentionData);
      res.json(intention);
    } catch (error) {
      res.status(400).json({ message: "Invalid intention data" });
    }
  });

  app.delete("/api/intentions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { userId } = req.body;
      const deleted = await storage.deleteIntention(id, userId);
      
      if (!deleted) {
        return res.status(404).json({ message: "Intention not found" });
      }
      
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ message: "Failed to delete intention" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
