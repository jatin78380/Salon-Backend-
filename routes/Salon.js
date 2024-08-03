const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Salon = require('../models/Salon');
const Step0 = require('../models/Step0');
const Step1 = require('../models/Step1');
const Step2 = require('../models/Step2');
const Step3 = require('../models/Step3');
const Step4 = require('../models/Step4');
const Step5 = require('../models/Step5');
const Step6 = require('../models/Step6');

// Route to create or update salon data
router.post('/salon', async (req, res) => {
  const { currentStep, step0, step1, step2, step3, step4, step5, step6, salonId } = req.body;

  try {
    let salon;

    if (salonId) {
      salon = await Salon.findById(salonId);
      if (!salon) {
        return res.status(404).json({ message: 'Salon not found' });
      }
    } else {
      salon = new Salon();
    }

    if (currentStep !== undefined) salon.currentStep = currentStep;
    if (step0) {
      const newStep0 = new Step0(step0);
      await newStep0.save();
      salon.step0 = newStep0._id;
    }
    if (step1) {
      const newStep1 = new Step1(step1);
      await newStep1.save();
      salon.step1 = newStep1._id;
    }
    if (step2) {
      const newStep2 = new Step2(step2);
      await newStep2.save();
      salon.step2 = newStep2._id;
    }
    if (step3) {
      const newStep3 = new Step3(step3);
      await newStep3.save();
      salon.step3 = newStep3._id;
    }
    if (step4) {
      const newStep4 = new Step4(step4);
      await newStep4.save();
      salon.step4 = newStep4._id;
    }
    if (step5) {
      const newStep5 = new Step5(step5);
      await newStep5.save();
      salon.step5 = newStep5._id;
    }
    if (step6) {
      const newStep6 = new Step6(step6);
      await newStep6.save();
      salon.step6 = newStep6._id;
    }

    await salon.save();
    return res.status(200).json({ message: 'Salon saved successfully', salon });
  } catch (error) {
    console.error('Error handling salon data:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to get salon data with population
router.get('/salon/:id', async (req, res) => {
  try {
    const salon = await Salon.findById(req.params.id)
      .populate('step0')
      .populate('step1')
      .populate('step2')
      .populate('step3')
      .populate('step4')
      .populate('step5')
      .populate('step6');

    if (!salon) {
      return res.status(404).json({ message: 'Salon not found' });
    }
    return res.status(200).json(salon);
  } catch (error) {
    console.error('Error retrieving salon data:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
module.exports = router;
