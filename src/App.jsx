import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import {FaUser, FaCalendarAlt, FaFileUpload } from "react-icons/fa";

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PageContainer = styled.div`
  font-family: "Quicksand", sans-serif;
  color: #2c3e50;
  background-color: #eef9f7;
  min-height: 100vh;  
  display: flex;
  flex-direction: column; 
`;

const Header = styled.header`
  background: linear-gradient(135deg, #ff7e5f, #feb47b);
  color: white;
  text-align: center;
  padding: 20px 10px;
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 1s ease-in-out;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: -20px;
    width: 100px;
    height: 100px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    z-index: 0;
  }
`;

const HeaderContent = styled.div`
  position: relative;
  z-index: 1;
`;

const HeaderTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 5px;
  font-weight: bold;
`;

const HeaderSubtitle = styled.p`
  font-size: 1rem;
  margin-bottom: 15px;
`;


const FormContainer = styled.div`
  max-width: 500px;
  margin: auto;
  margin-top: 50px;
  background: #fff;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 1s ease-in-out;
`;

const StyledInputGroup = styled.div`
  position: relative;
  margin-bottom: 15px;
`;

const StyledInputIcon = styled.span`
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  color: #6a11cb;
  font-size: 1.2rem;
`;

const StyledInput = styled.input`
  width: 71%;
  padding: 12px 40px;
  border: 2px solid #e4e4e4;
  border-radius: 10px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease-in-out;

  &:focus {
    border-color: #6a11cb;
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 10px 15px;
  border: 2px solid #e4e4e4;
  border-radius: 10px;
  font-size: 16px;
  background: white;
  appearance: none;
  position: relative;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%23767d8b'%3E%3Cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 01.02-1.06z' clip-rule='evenodd'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: calc(100% - 10px) center;
  background-size: 15px;
  outline: none;
  transition: border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    border-color: #feb47b;
  }

  &:focus {
    border-color: #ff7e5f;
    box-shadow: 0 0 5px rgba(255, 126, 95, 0.5);
  }
`;

const FileInput = styled.input`
  display: none;
`;

const FileLabel = styled.label`
  display: block;
  padding: 12px;
  margin: 15px 0;
  background-color: #feb47b;
  color: #fff;
  text-align: center;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #ff7e5f;
  }
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 15px;
  background: linear-gradient(135deg, #43cea2, #185a9d);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0px 4px 10px rgba(67, 206, 162, 0.3);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0px 6px 15px rgba(67, 206, 162, 0.5);
  }
`;

const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 38%;
  transform: translate(-50%, -50%) translateX(100%);
  padding: 20px;
  background: #e74c3c; 
  color: white;
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  animation: ${slideIn} 0.5s ease-in-out forwards;
`;

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    file: null,
  });
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileName, setFileName] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [formValid, setFormValid] = useState(true);
  const [missingFields, setMissingFields] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        file,
      }));
      setFileUploaded(true);
      setFileName(file.name); 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const incompleteFields = [];
    if (!formData.name) incompleteFields.push("Name");
    if (!formData.age) incompleteFields.push("Age");
    if (!formData.file) incompleteFields.push("File");

    if (incompleteFields.length > 0) {
      setMissingFields(incompleteFields);
      setFormValid(false);
      return;
    }

    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  const ageOptions = [];
  for (let i = 1; i <= 100; i++) {
    ageOptions.push(<option key={i} value={i}>{i}</option>);
  }

  return (
    <PageContainer>
      <Header>
        <HeaderContent>
          <HeaderTitle>Healthcare Dashboard</HeaderTitle>
          <HeaderSubtitle>Manage your medical data efficiently</HeaderSubtitle>
        </HeaderContent>
      </Header>

      <FormContainer>
        <h2>Upload Your Medical File</h2>
        <form onSubmit={handleSubmit}>
          <StyledInputGroup>
            <StyledInputIcon>
              <FaUser />
            </StyledInputIcon>
            <StyledInput
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </StyledInputGroup>
          <StyledInputGroup>
            <StyledInputIcon>
              <FaCalendarAlt />
            </StyledInputIcon>
            <StyledSelect
              name="age"
              value={formData.age}
              onChange={handleInputChange}
            >
              <option value="">Select your age</option>
              {ageOptions}
            </StyledSelect>
          </StyledInputGroup>

          <FileLabel htmlFor="fileInput">
            <FaFileUpload /> Upload Medical File
          </FileLabel>
          <FileInput
            id="fileInput"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
          />
          {fileUploaded && <p>{fileName}</p>} 

          {!formValid && (
            <div style={{ color: "red" }}>
              <p>Please fill out the following fields:</p>
              <ul>
                {missingFields.map((field, index) => (
                  <li key={index}>{field}</li>
                ))}
              </ul>
            </div>
          )}
          <StyledButton type="submit">Submit</StyledButton>
        </form>
      </FormContainer>

      {showPopup && (
        <Popup>
          <p>Your form has been submitted successfully!</p>
        </Popup>
      )}
    </PageContainer>
  );
};

export default App;
