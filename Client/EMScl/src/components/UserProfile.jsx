import React, { useState, useEffect } from 'react';
import { GetProfile } from '../APIs/FetchApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

function UserProfile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const token=sessionStorage.getItem('token');
    const headers={
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    };

    GetProfile(headers)
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        console.error('Error fetching profile:', err);
        toast.error('Failed to fetch profile');
      });
  }, []);

  return (
    <div className="container mt-5">
      {profile ? (
        <div className="profile-card text-center">
          <div className="profile-img-container mb-4">
            <img
              src={
        profile.image
            ? `http://127.0.0.1:8000${profile.image}`
            : "/path/to/default/profile_image.jpg"
            }
              className="rounded-circle"
              style={{
                width: '130px',
                height: '130px',
                objectFit: 'cover',
                border: '2px solid #007bff',
              }}
            />
          </div>
          {/* Bio */}
          <div className="bio-section my-2 p-2 bg-light text-dark text-start">
            <p className="lead">{profile.bio}</p>
          </div>

          {/* Edit Profile Button */}
          <div className="buttons mt-3">
            <Link to="/changepass" className="btn btn-secondary btn-sm me-2">
              Change Password
            </Link>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => {
                sessionStorage.removeItem('token');
                window.location.href = '/'; // Redirect to login after logout
              }}
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default UserProfile;
