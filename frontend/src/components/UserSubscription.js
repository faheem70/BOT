import React, { useState, } from 'react';
import axios from 'axios';

const UserSubscription = ({ userId, isSubscribed }) => {
    const [subscriptionStatus, setSubscriptionStatus] = useState(isSubscribed);

    const toggleSubscription = () => {
        axios.post('https://bot-backend-sg1l.onrender.com/api/users/subscribe', { userId })
            .then((response) => {
                setSubscriptionStatus(response.data.isSubscribed);
            })
            .catch((error) => {
                console.error('Error toggling subscription:', error);
            });
    };

    return (
        <div>
            <h2>Weather Updates Subscription</h2>
            <p>Subscription Status: {subscriptionStatus ? 'Subscribed' : 'Not Subscribed'}</p>
            <button onClick={toggleSubscription}>
                {subscriptionStatus ? 'Unsubscribe' : 'Subscribe'}
            </button>
        </div>
    );
};

export default UserSubscription;
