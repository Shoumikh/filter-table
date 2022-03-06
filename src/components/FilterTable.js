import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import "./FilterTable.css";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import axios from 'axios';

const columns = [
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 160 },
    { field: 'foundedOn', headerName: 'Founded On', width: 120 },
    { field: 'industry', headerName: 'Industry', width: 120 },
    { field: 'location', headerName: 'Location', width: 120 },
    { field: 'Type', headerName: 'Type', width: 120 },
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
  ];

  const rows = [
    { id: 1, name: 'Snow White', email: 'snow@gmail.com', foundedOn: 1992, industry: 2, location: "DA", Type:"Jilla", firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

function FilterTable() {

    const [locations, setLocations] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [location, setLocation] = useState('');
    const [industry, setIndustry] = useState('');



    useEffect(() => {
        importLocations();
      }, []);

      
    const importLocations = async () => {
        setLoading(true);

        try {
            const result = await axios.get(
              "https://faker-companies.dk-dev.leadbook.com/api/v1/industries/?format=json", {mode: 'no-cors'}
            );
            setLocations(result.data);
            console.log("Dataaa: ", result.data);
          } catch (err) {
            setError(err.message || "Unexpected Error!");
          } finally {
            setLoading(false);
          }
    }

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    const handleIndustryChange = (event) => {
        setIndustry(event.target.value);
    };


    const handleLocationDelete = () => {
        console.info('You clicked the delete icon.');
        setLocation("");
    };

    const handleIndustryDelete = () => {
        console.info('You clicked the delete icon.');
        setIndustry("");
    };

  return (
    <div className='container'>

        <div className='header'>
            <div className='header__left' >
                <h2>Build A List</h2>
            </div>
            <div className='header__right' >
                <p> 0 companies found </p>
            </div>
        </div>

        <div className='table__contianer'>
            <div className='table__left'>
            <div className='dropdown'>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Location</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={location}
                        label="Location"
                        onChange={handleLocationChange}
                    >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <div className='dropdown'>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Industry</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={industry}
                        label="Industry"
                        onChange={handleIndustryChange}
                    >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </div>

            </div>
            <div className='table__right'>
                <div className="table__tags">
                    <p>Includued</p>
                    <div className=''>
                    <Stack direction="row" spacing={1}>
                        { location !== "" ? <Chip label={location} onDelete={handleLocationDelete} /> : "" }
                        { industry !== "" ? <Chip label={industry} onDelete={handleIndustryDelete} /> : "" }
                    </Stack>
                    </div>
                </div>
                {/* mat ui table */}
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    />
                </div>
            </div>

        </div>



    </div>
  )
}

export default FilterTable