import React, { useState } from 'react';
import SearchList from '../../components/searchList/SearchList';
import "./filterPage.css"
import Header from '../../components/header/Header';
import axios from 'axios';
const FilterPage = () => {
  const [filters, setFilters] = useState({
    minAge: '',
    maxAge: '',
    state: '',
    district: '',
    profession: '',
    education: '',
    qualification: ''
  });
  const [listedData, setListedData] = useState([])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const sortedData = async (e) => {
    e.preventDefault();
    try {
      const filterData = await axios.get(`http://localhost:8083/api/matrimony/profile/searchProfiles?minAge=${filters.minAge}&maxAge=${filters.maxAge}&state=${filters.state}&district=${filters.district}&profession=${filters.profession}&qualification=${filters.qualification}`, filters)
      console.log('filtered successfully done', filterData.data);
      setListedData(filterData.data)
    } catch (error) {
      console.log(error);
    }
  };
  console.log(listedData);

  return (
    <div>
      <Header />
      <div className="p-4 bg-grey shadow-md rounded-md">
        <form onSubmit={sortedData} className="flex flex-wrap items-center space-x-4">
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1">Age Min:</label>
            <input
              type="number"
              name="minAge"
              placeholder="Min"
              value={filters.minAge}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1">Age Max:</label>
            <input
              type="number"
              name="maxAge"
              placeholder="Max"
              value={filters.maxAge}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1">State:</label>
            <input
              type="text"
              name="state"
              value={filters.state}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1">District:</label>
            <input
              type="text"
              name="district"
              value={filters.district}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1">Profession:</label>
            <input
              type="text"
              name="profession"
              value={filters.profession}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1">Education:</label>
            <input
              type="text"
              name="education"
              value={filters.education}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1">qualification:</label>
            <input
              type="text"
              name="qualification"
              value={filters.qualification}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
            />
          </div>
          <button type="submit" className="p-2 bg-blue-500 text-white rounded mt-4">
            Apply Filters
          </button>
        </form>
      </div>
      <div className='card-container'>
        {listedData.length > 0 ? (
          listedData.map((profile, index) => (
           
              <SearchList key={index} profile={profile} />
           
          ))) : (
          <>
            <p>No profile is to display</p>
          </>
        )}

      </div>
    </div>
  );
};

export default FilterPage