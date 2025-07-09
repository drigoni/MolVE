import bcrypt from 'bcrypt';
import session from 'express-session';
import type { Express, RequestHandler } from 'express';
import connectPg from 'connect-pg-simple';
import { storage } from './storage';

export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: true,
    ttl: sessionTtl,
    tableName: "sessions",
  });
  
  return session({
    secret: process.env.SESSION_SECRET || 'dev-secret-change-in-production',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      maxAge: sessionTtl,
    },
  });
}

export async function setupAuth(app: Express) {
  app.set("trust proxy", 1);
  app.use(getSession());

  // Initialize admin user if it doesn't exist
  await initializeAdminUser();

  // Login endpoint
  app.post('/api/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }

      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Store user in session
      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.role = user.role;

      // Update last login timestamp
      await storage.updateUserLastLogin(user.id);

      res.json({
        id: user.id,
        username: user.username,
        role: user.role,
        redirectTo: user.role === 'admin' ? '/admin-dashboard' : '/evaluate'
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  // Logout endpoint
  app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.json({ message: "Logged out successfully", redirect: "/" });
    });
  });

  // Get current user endpoint
  app.get('/api/auth/user', (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    res.json({
      id: req.session.userId,
      username: req.session.username,
      role: req.session.role
    });
  });

  // Change password endpoint (admin only)
  app.post('/api/auth/change-password', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      
      if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: "Current and new passwords are required" });
      }

      const user = await storage.getUser(req.session.userId!);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const validPassword = await bcrypt.compare(currentPassword, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: "Current password is incorrect" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await storage.updateUserPassword(user.id, hashedPassword);

      res.json({ message: "Password changed successfully" });
    } catch (error) {
      console.error("Change password error:", error);
      res.status(500).json({ message: "Failed to change password" });
    }
  });
}

async function initializeAdminUser() {
  try {
    const adminUser = await storage.getUserByUsername('admin');
    if (!adminUser) {
      const hashedPassword = await bcrypt.hash('admin', 10);
      await storage.createUser({
        username: 'admin',
        password: hashedPassword,
        role: 'admin'
      });
      console.log('Admin user created with username: admin, password: admin');
    }
  } catch (error) {
    console.error('Error initializing admin user:', error);
  }
}

export const isAuthenticated: RequestHandler = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Authentication required" });
  }
  next();
};

export const isAdmin: RequestHandler = (req, res, next) => {
  if (req.session.role !== 'admin') {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};

export const isUser: RequestHandler = (req, res, next) => {
  if (req.session.role !== 'user' && req.session.role !== 'admin') {
    return res.status(403).json({ message: "User access required" });
  }
  next();
};

// Extend session interface
declare module 'express-session' {
  interface SessionData {
    userId: number;
    username: string;
    role: string;
    evaluationMode?: 'all' | 'unevaluated';
  }
}