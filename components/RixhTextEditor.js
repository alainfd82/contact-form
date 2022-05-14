import React, {useState, useEffect} from "react";
import MUIRichTextEditor from "mui-rte";
import {convertToRaw, EditorState} from 'draft-js'
import {stateFromHTML} from "draft-js-import-html";
import {ThemeProvider, useTheme} from "@mui/material/styles";

const local_theme_overrides = {
  overrides: {
    MUIRichTextEditor: {
      root: {
        marginBottom: 30
      },
      editorContainer: {
        border: "1px solid #C4C4C4",
        borderRadius: 4,
        width: "100%"
      },
    }
  }
};

export default function RichTextEditor(props) {
  const {initialValue, onChange, ...rest} = props;
  const [initial, setInitial] = useState('');

  useEffect(() => {
    const init_state = EditorState.createWithContent(stateFromHTML(initialValue));
    setInitial(JSON.stringify(convertToRaw(init_state.getCurrentContent())));
    onChange(init_state);
  }, []);

  const theme = useTheme();
  const [localTheme, setLocalTheme] = useState(theme);

  useEffect(() => {
    setLocalTheme(Object.assign({...theme}, local_theme_overrides));
  }, []);

  return (
    <ThemeProvider theme={localTheme}>
      <MUIRichTextEditor
        onChange={onChange}
        value={initial}
        {...rest}
      >
      </MUIRichTextEditor>
    </ThemeProvider>
  );
}
