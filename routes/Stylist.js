// const { Router } = require('express');
// const router = Router();
// const StylistModel = require('../models/StylistModel');
// // const uploadRouter = require('./service');
// // Use the upload router for handling file uploads
// router.use('/upload', uploadRouter);


// router.post('/signup', async (req, res) => {
//     const { firstName, lastName, emailAddress, businessName, phone, password } = req.body;

//     try {
        
//         const existingStylist = await StylistModel.findOne({ emailAddress });

//         if (existingStylist) {
//             return res.status(400).json({ message: 'Stylist with this email already exists' });
//         }

//         const newStylist = await StylistModel.create({
//             firstName,
//             lastName,
//             emailAddress,
//             businessName,
//             phone,
//             password,
//             selection: { options: [] } // Initialize with an empty options array
//         });

//         res.status(201).json({ message: 'Stylist created successfully', stylistId: newStylist._id  });
//     } catch (error) {
//         console.error('Error creating stylist:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// // Route for adding options
// router.post('/add-options', async (req, res) => {
//     const { stylistId, options } = req.body;

//     if (!stylistId || !options || !Array.isArray(options)) {
//         return res.status(400).json({ message: 'Invalid data' });
//     }

//     try {
//         // Find the stylist by ID
//         const stylist = await StylistModel.findById(stylistId);

//         if (!stylist) {
//             return res.status(404).json({ message: 'Stylist not found' });
//         }

//         // Update the options
//         stylist.options = options;
//         await stylist.save();

//         res.status(200).json({ message: 'Options updated successfully', stylistId });
//     } catch (error) {
//         console.error('Error updating options:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });
// router.post('/address', async (req, res) => {
//     const { salonId, address,street,city,state,postalcode } = req.body;
//     try{
//         const salon = await StylistModel.findById(stylistId);
//         if(!salon){
//             return res.status(404).json({message:'stylist not found'});
//         }
//         //updated the address,city,state,postalcode
//         stylist.address = address;
//         stylist.street = street;
//         stylist.city = city;
//         stylist.state = state;
//         stylist.postalcode = postalcode;
//         stylist.country= country;
//         await stylist.save();
//         res.status(200).json({message:'Stylist address added successfully',salonId});
//     }
//     catch (error) {
//         console.error('Error updating options:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// module.exports = router;
