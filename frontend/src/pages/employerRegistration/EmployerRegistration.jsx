import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EmployerRegistration = () => {
    const { userRefId_EeR } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userIdRef: userRefId_EeR ,
        companyName: '',
        industry: '',
        contactPerson: '',
        contactEmail: '',
        contactPhone: '',
        location: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8083/api/employer/createEmployer', formData);
            console.log('Employer registered:', response.data);
            navigate('/LongTermShortTermSelection')
            // Optionally, you can redirect or show a success message here
        } catch (error) {
            console.error('Error registering employer:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen text-white">
            <form 
                onSubmit={handleSubmit} 
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-black"
            >
                <h1 className="text-2xl font-bold mb-5 text-center">Employer Registration</h1>
                <input
                    type="text"
                    name="companyName"
                    placeholder="Company Name"
                    required
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full p-3 mb-3 bg-gray-100 text-black rounded"
                />
                <input
                    type="text"
                    name="industry"
                    placeholder="Industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className="w-full p-3 mb-3 bg-gray-100 text-black rounded"
                />
                <input
                    type="text"
                    name="contactPerson"
                    placeholder="Contact Person"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    className="w-full p-3 mb-3 bg-gray-100 text-black rounded"
                />
                <input
                    type="email"
                    name="contactEmail"
                    placeholder="Contact Email"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    className="w-full p-3 mb-3 bg-gray-100 text-black rounded"
                />
                <input
                    type="tel"
                    name="contactPhone"
                    placeholder="Contact Phone"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    className="w-full p-3 mb-3 bg-gray-100 text-black rounded"
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full p-3 mb-6 bg-gray-100 text-black rounded"
                />
                <button 
                    type="submit" 
                    className="w-full py-3 bg-black hover:bg-gray-800 rounded text-white font-semibold"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default EmployerRegistration;
