import React from "react";
import Gym_Logo from './Gymlogo.jpg';

export const MemberHome = () => {
  return (
    <div style={styles.container}>
      <h2 style={{ ...styles.heading, textDecoration: 'underline' }}>
        Welcome to the Members Home Page of Fitness Club. Start Your Journey and Stay Fit.
      </h2>
      <h4 style={styles.subHeading}>
        These are the time slots that are available in our gym:
      </h4>
      <ul style={styles.list}>
        <li>5 AM to 6 AM</li>
        <li>6 AM to 7 AM</li>
        <li>7 AM to 8 AM</li>
        <li>6 PM to 7 PM</li>
        <li>7 PM to 8 PM</li>
        <li>8 PM to 9 PM</li>
      </ul>
      <p style={styles.paragraph}>
        <u> Note</u>: You can find the details of the trainers in different time slots in the "Trainers" tab in the top.
      </p>
      <img src={Gym_Logo} alt="Gym Logo" style={styles.image} />
      <h3 style={styles.subHeading}>
        Train insane or remain the same
      </h3>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '10px',
    marginTop: '0', // Set marginTop to 0 to remove the gap at the top
  },
  heading: {
    fontSize: '24px',
    marginBottom: '10px',
  },
  subHeading: {
    fontSize: '18px',
    marginTop: '10px',
    marginBottom: '10px',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  paragraph: {
    fontSize: '16px',
    marginTop: '10px',
    marginBottom: '10px',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    marginTop: '10px',
    marginBottom: '0px',
  },
};
