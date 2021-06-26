import React from 'react';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import MUIRichTextEditor from 'mui-rte';
import { convertToRaw } from 'draft-js';

const defaultTheme = createMuiTheme();
Object.assign(defaultTheme, {
    overrides: {
        MUIRichTextEditor: {
            root: {
                border: "1px solid gray",
                borderRadius: '8px',
                padding: '10px 20px 40px 20px',
            },
            editor: {
                padding: '10px 0px 0px 20px',
                height: '200px',
                overflowY: 'scroll'
            }
        }
    }
})

const RichTextEditor = ({ handleChange }) => {
    return (
        <MuiThemeProvider theme={defaultTheme}>
            <MUIRichTextEditor onChange={handleChange} label='Enter Details' inlineToolbar
                controls={['bold', 'italic', 'underline', 'strikethrough', 'highlight', 'numberList',
                    'bulletList']} />
        </MuiThemeProvider>
    )
}

export default RichTextEditor;