
import express from "express";
const app = express();
import Item from "../models/groceryItemSchema.js"
const router=express.Router();
router.post("/items", async (req, res) => {
    const { item, count, isDone } = req.body;
    try {
        const items = new Item({ item, count, isDone });
        await items.save();
        res.status(201).json(items);
    } catch (error) {
        res.status(500).json({ error: "Failed to add todo" });
    }
});
router.get("/items", async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch todos" });
    }
});


router.put('/items/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const item = await Item.findById(id);
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
  
      item.count += 1;
      await item.save();
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update item count' });
    }
  });
  router.delete('/items/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const item = await Item.findByIdAndDelete(id);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete item' });
    }
});
router.delete('/items', async (req, res) => {
    try {
        await Item.deleteMany({}); // Delete all items
        res.json({ message: 'All items deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete all items' });
    }
});


export default router;