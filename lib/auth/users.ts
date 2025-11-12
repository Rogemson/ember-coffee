import { hash, compare } from 'bcryptjs';
import fs from 'fs';
import path from 'path';

interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  cartId?: string;
}

// File path for storing users (development only)
const USERS_FILE = path.join(process.cwd(), 'data', 'users.json');

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Load users from file
function loadUsers(): User[] {
  try {
    ensureDataDir();
    if (fs.existsSync(USERS_FILE)) {
      const data = fs.readFileSync(USERS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading users:', error);
  }
  return [];
}

// Save users to file
function saveUsers(users: User[]) {
  try {
    ensureDataDir();
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error saving users:', error);
  }
}

export async function createUser(email: string, password: string, name: string) {
  const users = loadUsers();
  
  // Check if user exists
  const existingUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash password
  const hashedPassword = await hash(password, 12);

  // Create user
  const user: User = {
    id: `user_${Date.now()}_${Math.random().toString(36).substring(7)}`,
    email: email.toLowerCase(),
    password: hashedPassword,
    name,
    cartId: undefined,
  };

  users.push(user);
  saveUsers(users);
  
  console.log('✅ User created:', { id: user.id, email: user.email, name: user.name });
  console.log('📊 Total users:', users.length);
  
  return { id: user.id, email: user.email, name: user.name };
}

export async function findUserByEmail(email: string) {
  const users = loadUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  console.log('🔍 Finding user by email:', email, 'Found:', !!user);
  return user;
}

export async function verifyPassword(user: User, password: string) {
  const isValid = await compare(password, user.password);
  console.log('🔐 Password verification:', isValid);
  return isValid;
}

export async function updateUserCart(userId: string, cartId: string) {
  const users = loadUsers();
  const userIndex = users.findIndex((u) => u.id === userId);
  
  if (userIndex !== -1) {
    users[userIndex].cartId = cartId;
    saveUsers(users);
    console.log('🛒 Updated cart for user:', userId);
  }
}

export function getAllUsers() {
  const users = loadUsers();
  return users.map(u => ({ id: u.id, email: u.email, name: u.name }));
}

export function clearAllUsers() {
  saveUsers([]);
  console.log('🗑️ Cleared all users');
}