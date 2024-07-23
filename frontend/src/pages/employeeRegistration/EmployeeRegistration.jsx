import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeRegistration = () => {
    const { userRefId_EeR } = useParams();
    const navigate= useNavigate()
    const [formData, setFormData] = useState({
        userIdRef: userRefId_EeR,
        name: '',
        designation: '',
        currentSalary: '',
        currentlyWorking: true,
        previousSalary: '',
        lastWorkingDate: '',
        quitReason: '',
        email: '',
        phone: '',
    });
    console.log(formData);
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'radio' && name === 'currentlyWorking') {
            setFormData({
                ...formData,
                [name]: value === 'true',
                quitReason: value === 'true' ? '' : formData.quitReason, 
                lastWorkingDate: value === 'true' ? '' : formData.lastWorkingDate,
                previousSalary: value === 'true' ? '' : formData.previousSalary,
            });
        } else {
            // Handle other input changes
            setFormData({
                ...formData,
                [name]: type === 'checkbox' ? checked : value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8083/api/employee/createEmployee', formData);
            console.log('Employee registered:', response.data);
            navigate('/LongTermShortTermSelection')
        } catch (error) {
            console.error('Error registering employee:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen text-white">
            <form 
                onSubmit={handleSubmit} 
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-black"
            >
                <h1 className="text-2xl font-bold mb-5 text-center">Employee Registration</h1>
                <input
                    type="text"
                    name="designation"
                    placeholder="Designation"
                    required
                    value={formData.designation}
                    onChange={handleChange}
                    className="w-full p-3 mb-3 bg-gray-100 text-black rounded"
                />
                <input
                    type="number"
                    name="currentSalary"
                    placeholder="Current Salary"
                    value={formData.currentSalary}
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
                <div className="flex items-center mb-4">
                    <label className="mr-4">Currently Working:</label>
                    <label className="mr-2">
                        <input
                            type="radio"
                            name="currentlyWorking"
                            value="true"
                            checked={formData.currentlyWorking === true}
                            onChange={handleChange}
                            className="mr-1"
                        />
                        Yes
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="currentlyWorking"
                            value="false"
                            checked={formData.currentlyWorking === false}
                            onChange={handleChange}
                            className="mr-1"
                        />
                        No
                    </label>
                </div>
                {!formData.currentlyWorking && (
                    <>
                        <input
                            type="number"
                            name="previousSalary"
                            placeholder="Previous Salary"
                            value={formData.previousSalary}
                            onChange={handleChange}
                            className="w-full p-3 mb-3 bg-gray-100 text-black rounded"
                        />
                        <input
                            type="date"
                            name="lastWorkingDate"
                            value={formData.lastWorkingDate}
                            onChange={handleChange}
                            className="w-full p-3 mb-3 bg-gray-100 text-black rounded"
                        />
                        <input
                            type="text"
                            name="quitReason"
                            placeholder="Reason for Quitting"
                            value={formData.quitReason}
                            onChange={handleChange}
                            className="w-full p-3 mb-3 bg-gray-100 text-black rounded"
                        />
                    </>
                )}
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

export default EmployeeRegistration;
