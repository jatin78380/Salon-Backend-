const { Router } = require('express');
const router = Router();
const SalonModel = require('../models/SalonModel');


router.post('/signup', async (req, res) => {
    const { firstName, lastName, emailAddress, businessName, phone, password } = req.body;

    try {
        
        const existingSalon = await SalonModel.findOne({ emailAddress });

        if (existingSalon) {
            return res.status(400).json({ message: 'Salon with this email already exists' });
        }

        const newSalon = await SalonModel.create({
            firstName,
            lastName,
            emailAddress,
            businessName,
            phone,
            password,
            selection: { options: [] } // Initialize with an empty options array
        });

        res.status(201).json({ message: 'Salon created successfully', salonId: newSalon._id  });
    } catch (error) {
        console.error('Error creating salon:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route for adding options
router.post('/add-options', async (req, res) => {
    const { salonId, options } = req.body;

    if (!salonId || !options || !Array.isArray(options)) {
        return res.status(400).json({ message: 'Invalid data' });
    }

    try {
      
        const salon = await SalonModel.findById(salonId);

        if (!salon) {
            return res.status(404).json({ message: 'Salon not found' });
        }

        // Update the options
        salon.selection.options = options;
        await salon.save();

        res.status(200).json({ message: 'Options updated successfully', salonId });
    } catch (error) {
        console.error('Error updating options:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
router.post('/address', async (req, res) => {
    const { salonId, address,street,city,state,postalcode } = req.body;
    try{
        const salon = await SalonModel.findById(salonId);
        if(!salon){
            return res.status(404).json({message:'salon not found'});
        }
        //updated the address,city,state,postalcode
        salon.address = address;
        salon.street = street;
        salon.city = city;
        salon.state = state;
        salon.postalcode = postalcode;
        await salon.save();
        res.status(200).json({message:'Salon address added successfully',salonId});
    }
    catch (error) {
        console.error('Error updating options:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
