import React from 'react';

import { Popover } from '@material-ui/core';

const CenterPopup = ({ state, handleClose, children }) => {
    return (
        <Popover
            style={{ overflow: 'hidden' }}
            open={state}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'center',
                horizontal: 'center',
            }}
        >
            {children}
        </Popover>
    )
}

export default CenterPopup;