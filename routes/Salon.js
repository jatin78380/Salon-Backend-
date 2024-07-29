const { Router } = require('express');
const router = Router();
const SalonModel = require('../models/SalonModel');


// Route to create a new salon entry
router.post('/salon', async (req, res) => {
    try {
        const newSalon = new SalonModel(req.body);
        await newSalon.save();
        res.status(201).json({ message: 'Salon created successfully', salonId: newSalon._id });
    } catch (error) {
        console.error('Error creating salon:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to update an existing salon entry
router.put('/salon/:id', async (req, res) => {
    try {
        const updatedSalon = await Salon.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSalon) {
            return res.status(404).json({ message: 'Salon not found' });
        }
        res.status(200).json({ message: 'Salon updated successfully', updatedSalon });
    } catch (error) {
        console.error('Error updating salon:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to get a salon entry by ID
router.get('/salon/:id', async (req, res) => {
    try {
        const salon = await Salon.findById(req.params.id);
        if (!salon) {
            return res.status(404).json({ message: 'Salon not found' });
        }
        res.status(200).json(salon);
    } catch (error) {
        console.error('Error fetching salon:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
