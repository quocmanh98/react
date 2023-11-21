import React, { useState, useEffect } from 'react';
import Button from './Button';
import "../index.css";
import Swal from 'sweetalert2';

const Header = ({ showForm, changeTextAndColor }) => {
    const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const christmasDate = new Date('2023-12-25T00:00:00');

        const updateCountdown = () => {
            const now = new Date();
            const timeDifference = christmasDate - now;

            if (timeDifference > 0) {
                const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

                setCountdown({ days, hours, minutes, seconds });
            } else {
                setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        const countdownInterval = setInterval(updateCountdown, 1000);
        updateCountdown(); // Update immediately on load

        // Clear the interval when the user clicks anywhere on the page
        document.addEventListener('click', () => {
            clearInterval(countdownInterval);
        });

        return () => clearInterval(countdownInterval);

    }, []);

    // Show countdown modal when the component renders
    useEffect(() => {
        Swal.fire({
            title: 'Countdown to Christmas',
            html: `<p>${countdown.days} days ${countdown.hours} hours ${countdown.minutes} minutes ${countdown.seconds} seconds</p>`,
            showConfirmButton: false
        });

        // Display fireworks
        setTimeout(() => {
            createFireworks();
        }, 2000); // Adjust the delay as needed

    }, [countdown]);

    // Function to create a single firework
    const createFirework = () => {
        const firework = document.createElement('div');
        firework.classList.add('firework');
        document.body.appendChild(firework);

        // Remove the firework element after the animation completes
        firework.addEventListener('animationend', () => {
            firework.remove();
        });
    };

    // Function to create multiple fireworks
    const createFireworks = () => {
        const numFireworks = 10; // Adjust the number of fireworks
        for (let i = 0; i < numFireworks; i++) {
            setTimeout(() => {
                createFirework();
            }, i * 500); // Adjust the delay between fireworks
        }
    };

    return (
        <header className="header text-center">
            <h2 className="app-header">Quốc Mạnh - ReactJS</h2>
            <Button onClick={showForm} color="white" text={changeTextAndColor ? 'Close' : 'Add'} />
            
        </header>
    );
};

export default Header;
