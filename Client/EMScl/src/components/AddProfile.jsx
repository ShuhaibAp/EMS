import React, { useState } from "react";
import { CreateProfile } from "../APIs/FetchApi"; // Import your API function
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Button, Container } from "react-bootstrap";

const AddProfile = () => {
  const [formData, setFormData] = useState({
    bio: "", 
    image: null // Initialize image as null
  });

  const navigate = useNavigate();

  // Function to handle profile form submission
  const handleSaveProfile = async () => {
    const token = sessionStorage.getItem("token");
    const headers = {
      Authorization: `Token ${token}`,
    };

    // Prepare FormData object
    const profileFormData = new FormData();
    profileFormData.append("bio", formData.bio);
    if (formData.image) {
      profileFormData.append("image", formData.image);
    }

    try {
      // Send the form data to the API
      await CreateProfile(profileFormData, headers); // Sending FormData directly
      toast.success("Profile added successfully!");
      navigate("/home");
    } catch (error) {
      toast.error("Error adding profile. Please try again.");
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Add Profile</h2>
      <Form>
        {/* Bio Field */}
        <Form.Group controlId="bio">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Tell us about yourself..."
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          />
        </Form.Group>

        {/* Image Upload Field */}
        <Form.Group controlId="image" className="mt-3">
          <Form.Label>Upload Profile Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
          />
        </Form.Group>

        {/* Submit Button */}
        <Button
          variant="primary"
          className="mt-4"
          onClick={handleSaveProfile} // onClick function moved to the top
        >
          Save Profile
        </Button>
      </Form>
    </Container>
  );
};

export default AddProfile;
