import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const JobSeekerRegistration = () => {
    const{userRefId_EeR}=useParams()
    const navigate = useNavigate();
    console.log(userRefId_EeR);
    const [formData, setFormData] = useState({
        userIdRef: userRefId_EeR,
        skills: [], 
        locationPreference: '',
        salaryExpectation: '',
        email: '',
        phone: '',
    });

    console.log(formData);
    const handleChange = (e) => {
        const { name, value, type } = e.target;

        if (name === 'skills') {
           
            setFormData({
                ...formData,
                skills: value.split(',').map(skill => skill.trim()), // Split by comma and trim spaces
            });
        } else {
            setFormData({
                ...formData,
                [name]: type === 'checkbox' ? !formData[name] : value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8083/api/jobseeker/createJobSeeker', formData);
            console.log('Job seeker registered:', response.data);
            navigate('/LongTermShortTermSelection')

        } catch (error) {
            console.error('Error registering job seeker:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen text-white">
            <form 
                onSubmit={handleSubmit} 
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-black"
            >
                <h1 className="text-2xl font-bold mb-5 text-center">Job Seeker Registration</h1>
                <input
                    type="text"
                    name="skills"
                    placeholder="Skills (comma separated)"
                    value={formData.skills.join(', ')} // Use join method to display skills as comma-separated string
                    onChange={handleChange}
                    className="w-full p-3 mb-3 bg-gray-100 text-black rounded"
                />
                <input
                    type="text"
                    name="locationPreference"
                    placeholder="Location Preference"
                    value={formData.locationPreference}
                    onChange={handleChange}
                    className="w-full p-3 mb-3 bg-gray-100 text-black rounded"
                />
                <input
                    type="number"
                    name="salaryExpectation"
                    placeholder="Salary Expectation"
                    value={formData.salaryExpectation}
                    onChange={handleChange}
                    className="w-full p-3 mb-3 bg-gray-100 text-black rounded"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 mb-3 bg-gray-100 text-black rounded"
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
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

export default JobSeekerRegistration;
