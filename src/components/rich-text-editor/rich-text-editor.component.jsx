import React from 'react';
import { convertFromRaw } from 'draft-js';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import MUIRichTextEditor from 'mui-rte';

const fixedHeight = createMuiTheme();
Object.assign(fixedHeight, {
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
                overflowY: 'auto'
            }
        }
    }
})

const fitContent = createMuiTheme();
Object.assign(fitContent, {
    overrides: {
        MUIRichTextEditor: {
            root: {
                border: "1px solid gray",
                borderRadius: '8px',
                padding: '10px 20px 40px 20px',
            },
            editor: {
                padding: '10px 0px 0px 20px',
                overflowY: 'auto'
            }
        }
    }
})

const RichTextEditor = ({ handleChange, richDetails }) => {
    if (richDetails) {
        return (
            <MuiThemeProvider theme={fitContent}>
                <MUIRichTextEditor controls={[]} readOnly defaultValue={richDetails} />
            </MuiThemeProvider>
        )
    } else {
        return (
            <MuiThemeProvider theme={fixedHeight}>
                <MUIRichTextEditor onChange={handleChange} label='Enter Details' inlineToolbar
                    controls={['bold', 'italic', 'underline', 'strikethrough', 'highlight', 'numberList',
                        'bulletList']} />
            </MuiThemeProvider>
        )
    }
}

export default RichTextEditor;