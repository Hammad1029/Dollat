import React, { useState } from 'react';
import MUIRichTextEditor from 'mui-rte';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const defaultTheme = createMuiTheme()
Object.assign(defaultTheme, {
    overrides: {
        MUIRichTextEditor: {
            root: {
                border: "1px solid gray",
                borderRadius: '8px',
                margin: 20,
            },
            editor: {
            }
        }
    }
})

const TestingPage = () => {
    return (
        <MuiThemeProvider theme={defaultTheme}>

            <MUIRichTextEditor
                inlineToolbar
            />
        </MuiThemeProvider>
    )
}
export default TestingPage;