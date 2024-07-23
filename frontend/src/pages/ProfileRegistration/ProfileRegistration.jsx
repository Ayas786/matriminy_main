// components/MultiStepForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfileRegistration = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Details
    name: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    address: '',
    bodyType: '',
    maritalStatus: '',
    religion: '',
    caste: '',
    motherTongue: '',
    // Hobbies and Preferences
    hobbies: '',
    preference: '',
    languagesKnown: '',
    familyType: '',
    horoscope: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNextStep = async () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8083/api/matrimony/profile/createProfile', formData);
      console.log('Profile created:', response.data);
      navigate('/success');
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold mb-5">Step 1: Personal Details</h2>
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full p-3 mb-3 bg-gray-100 rounded" />
            <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} className="w-full p-3 mb-3 bg-gray-100 rounded" />
            <input type="text" name="gender" placeholder="Gender" value={formData.gender} onChange={handleChange} className="w-full p-3 mb-3 bg-gray-100 rounded" />
            <input type="number" name="height" placeholder="Height" value={formData.height} onChange={handleChange} className="w-full p-3 mb-3 bg-gray-100 rounded" />
            <input type="number" name="weight" placeholder="Weight" value={formData.weight} onChange={handleChange} className="w-full p-3 mb-3 bg-gray-100 rounded" />
            <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="w-full p-3 mb-3 bg-gray-100 rounded" />
            <input type="text" name="bodyType" placeholder="Body Type" value={formData.bodyType} onChange={handleChange} className="w-full p-3 mb-3 bg-gray-100 rounded" />
            <input type="text" name="maritalStatus" placeholder="Marital Status" value={formData.maritalStatus} onChange={handleChange} className="w-full p-3 mb-3 bg-gray-100 rounded" />
            <input type="text" name="religion" placeholder="Religion" value={formData.religion} onChange={handleChange} className="w-full p-3 mb-3 bg-gray-100 rounded" />
            <input type="text" name="caste" placeholder="Caste" value={formData.caste} onChange={handleChange} className="w-full p-3 mb-3 bg-gray-100 rounded" />
            <input type="text" name="motherTongue" placeholder="Mother Tongue" value={formData.motherTongue} onChange={handleChange} className="w-full p-3 mb-3 bg-gray-100 rounded" />
            <button onClick={handleNextStep} className="w-full py-3 bg-blue-500 text-white rounded">Next</button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold mb-5">Step 2: Hobbies and Preferences</h2>
            <input type="text" name="hobbies" placeholder="Hobbies" value={formData.hobbies} onChange={handleChange} className="w-full p-3 mb-3 bg-gray-100 rounded" />
            <input type="text" name="preference" placeholder="Preference" value={formData.preference} onChange={handleChange} className="w-full p-3 mb-3 bg-gray-100 rounded" />
            <input type="text" name="languagesKnown" placeholder="Languages Known" value={formData.languagesKnown} onChange={handleChange} className="w-full p-3 mb-3 bg-gray-100 rounded" />
            <input type="text" name="familyType" placeholder="Family Type" value={formData.familyType} onChange={handleChange} className="w-full p-3 mb-3 bg-gray-100 rounded" />
            <input type="text" name="horoscope" placeholder="Horoscope" value={formData.horoscope} onChange={handleChange} className="w-full p-3 mb-3 bg-gray-100 rounded" />
            <button onClick={handleSubmit} className="w-full py-3 bg-green-500 text-white rounded">Submit</button>          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileRegistration;
