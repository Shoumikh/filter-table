import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./FilterTable.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import axios from "axios";

const columns = [
  { field: "company_name", headerName: "Name", width: 130 },
  { field: "company_email", headerName: "Email", width: 160 },
  { field: "founded_on", headerName: "Founded On", width: 120 },
  { field: "company_industry", headerName: "Industry", width: 120 },
  { field: "company_location", headerName: "Location", width: 120 },
  { field: "company_type", headerName: "Type", width: 120 },
];

let rows = [];

function FilterTable() {
  const [locations, setLocations] = useState([]);
  const [companies, setCompanies] = useState([]);

  const [location, setLocation] = useState("");
  const [industry, setIndustry] = useState("");

  useEffect(() => {
    importIndustries();
    importCompanies();
    importLocations();
  }, [locations.length, companies.length]);

  const importIndustries = () => {
    const result = axios.get(`/industries/?format=json`).then((res) => {
      setLocations(res.data);
    });
  };

  const importCompanies = () => {
    axios.get(`/companies/?format=json`).then((res) => {
      setCompanies(res.data);
    });

    //  mat table rows data insert
    if (companies.results) {
      rows = companies.results;
    }
  };

  const importLocations = () => {
    if (companies.results) {
      companies.results.map((c) => {});
    }
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
    alert("Location API is not provided");
  };

  const handleIndustryChange = (event) => {
    setIndustry(event.target.value);

    axios.get(`/companies/?format=json`, { params: { company_industry: event.target.value } }).then((res) => {
      setCompanies(res.data);
    });
    if (companies.results) {
      rows = companies.results;
    }
  };

  const handleLocationDelete = () => {
    setLocation("");
  };

  const handleIndustryDelete = () => {
    setIndustry("");
  };

  return (
    <div className="container">
      <div className="header">
        <div className="header__left">
          <h2>Build A List</h2>
        </div>
        <div className="header__right">
          <p> {companies.results ? companies.results.length : 0} companies found </p>
        </div>
      </div>

      <div className="table__contianer">
        <div className="table__left">
          <div className="dropdown">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Location</InputLabel>
              <Select labelId="demo-simple-select-label" id="demo-simple-select" value={location} label="Location" onChange={handleLocationChange}>
                <MenuItem value={"Set"}>Set</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="dropdown">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Industry</InputLabel>
              <Select labelId="demo-simple-select-label" id="demo-simple-select" value={industry} label="Industry" onChange={handleIndustryChange}>
                {Object.values(locations)?.map((loc, index) => {
                  return (
                    <MenuItem key={index} value={index}>
                      {loc}
                    </MenuItem>
                  );
                })}
                ;
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="table__right">
          <div className="table__tags">
            <p>Includued</p>
            <div className="">
              <Stack direction="row" spacing={1}>
                {location !== "" ? <Chip label={location} onDelete={handleLocationDelete} /> : ""}
                {industry !== "" ? <Chip label={industry} onDelete={handleIndustryDelete} /> : ""}
              </Stack>
            </div>
          </div>

          <div style={{ height: 700, width: "100%" }}>
            <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]} checkboxSelection getRowId={(row) => row._id} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterTable;
