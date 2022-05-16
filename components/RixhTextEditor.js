import React, {useState} from 'react';
import RichTextEditor from 'react-rte';

const Editor = (props) => {
  const [value, setValue] = useState(RichTextEditor.createEmptyValue(props.initialValue));
  const onChange = (value) => {
    setValue(value);
    if (props.onChange) {
      props.onChange(value.toString('html'));
    }
  };

  return <RichTextEditor {...props} value={value} onChange={onChange}/>;
};

export default Editor;
