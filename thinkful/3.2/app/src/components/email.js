import React from 'react';
import Sidebar from './sidebar';
import SingleEmail from './single-email';
import EmailList from './email-list';
import './email.css';

export default function Email() {
    return (
        <div className="email">
            <Sidebar />
            <main>
                <EmailList folderId="inbox" />
                {/* <SingleEmail folderId="inbox" emailId="1" /> */}
            </main>
        </div>
    );
}
