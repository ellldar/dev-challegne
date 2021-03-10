import React from 'react';

export const UserItem = props => {
    const { user, onUserRemove } = props;
    return <div className="user-item">
        <div>{user.firstName} {user.lastName}</div>
        <div className="button-bar">
            <button className="button button-edit">Edit</button>
            <button className="button button-remove" onClick={onUserRemove}>Remove</button>
        </div>
    </div>
};