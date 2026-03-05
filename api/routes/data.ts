import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, '../data');

// Helper to read data
const readData = (filename: string) => {
  const filePath = path.join(dataDir, `${filename}.json`);
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

// Helper to write data
const writeData = (filename: string, data: any) => {
  const filePath = path.join(dataDir, `${filename}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Generic GET handler
router.get('/:resource', (req, res) => {
  const { resource } = req.params;
  try {
    const data = readData(resource);
    res.json(data);
  } catch (error) {
    console.error(`Error reading ${resource}:`, error);
    res.status(500).json({ error: 'Failed to read data' });
  }
});

// Generic POST handler (Create)
router.post('/:resource', (req, res) => {
  const { resource } = req.params;
  const newItem = req.body;
  try {
    const data = readData(resource);
    newItem.id = Date.now().toString(); // Simple ID generation
    newItem.created_at = new Date().toISOString().split('T')[0];
    data.push(newItem);
    writeData(resource, data);
    res.status(201).json(newItem);
  } catch (error) {
    console.error(`Error saving to ${resource}:`, error);
    res.status(500).json({ error: 'Failed to save data' });
  }
});

// Generic PUT handler (Update)
router.put('/:resource/:id', (req, res) => {
  const { resource, id } = req.params;
  const updates = req.body;
  try {
    const data = readData(resource);
    const index = data.findIndex((item: any) => item.id === id);
    if (index !== -1) {
      data[index] = { ...data[index], ...updates };
      writeData(resource, data);
      res.json(data[index]);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    console.error(`Error updating ${resource}:`, error);
    res.status(500).json({ error: 'Failed to update data' });
  }
});

// Generic DELETE handler
router.delete('/:resource/:id', (req, res) => {
  const { resource, id } = req.params;
  try {
    const data = readData(resource);
    const newData = data.filter((item: any) => item.id !== id);
    if (data.length !== newData.length) {
      writeData(resource, newData);
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    console.error(`Error deleting from ${resource}:`, error);
    res.status(500).json({ error: 'Failed to delete data' });
  }
});

export default router;
