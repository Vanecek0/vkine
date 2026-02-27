import { useEffect } from 'react'
import PropTypes from 'prop-types';
import { useAutocomplete } from '@mui/material';
import { CheckLg, XLg } from 'react-bootstrap-icons';
import { styled } from '@mui/material/styles';
import tagInputStyle from "./TagInput.module.css"


const Root = styled('div')(
  () => `
    color: rgba(255,255,255,0.65);
    font-size: 14px;
  `,
);

const InputWrapper = styled('div')(
  () => `
    width: 300px;
    border: 1px solid #434343;
    background-color: #141414;
    border-radius: 4px;
    padding: 5pt;
    display: flex;
    flex-wrap: wrap;
  
    &:hover {
      border-color: #177ddc;
    }
  
    &.focused {
      border-color: #177ddc;
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    }
  
    & input {
      background-color: #141414;
      color: rgba(255,255,255,0.65);
      height: 30px;
      box-sizing: border-box;
      padding: 4px 6px;
      width: 0;
      min-width: 30px;
      flex-grow: 1;
      border: 0;
      margin: 0;
      outline: 0;
    }
  `,
);

function Tag(props) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <XLg color='white' onClick={onDelete} />
    </div>
  );
}

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const StyledTag = styled(Tag)(
  ({ theme }) => `
    display: flex;
    align-items: center;
    height: 24px;
    margin: 2px;
    line-height: 22px;
    background-color: #0b5ed7;
    border: 1px solid #303030;
    border-radius: 2px;
    box-sizing: content-box;
    padding: 0 4px 0 10px;
    outline: 0;
    overflow: hidden;
  
    &:focus {
      border-color: #177ddc;
      background-color: #003b57;
    }
  
    & span {
      overflow: hidden;
      white-space: nowrap;
      color: #fff;
      padding-right: 2px;
      text-overflow: ellipsis;
    }
  
    & svg {
      font-size: 12px;
      cursor: pointer;
      padding: 1px;
    }
  `,
);

const Listbox = styled('ul')(
  ({ theme }) => `
    width: 300px;
    margin: 2px 0 0;
    padding: 0;
    position: absolute;
    list-style: none;
    background-color: #141414;
    overflow: auto;
    max-height: 250px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 1;
  
    & li {
      padding: 5px 12px;
      display: flex;
  
      & span {
        color: #fff;
        flex-grow: 1;
      }
  
      & svg {
        color: transparent;
      }
    }
  
    & li[aria-selected='true'] {
      background-color: #2b2b2b;
      font-weight: 600;
  
      & svg {
        color: #1890ff;
      }
    }
  
    & li.Mui-focused {
      background-color: #003b57;
      cursor: pointer;
  
      & svg {
        color: #fff;
      }
    }
  `,
);

const TagInput = (props) => {

  const {
    getRootProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: 'tagInput',
    onInputChange: (e, value) => props.setOnChangeInput(value),

    multiple: true,
    options: props.items,
    getOptionLabel: (option) => option.name,
  });

  useEffect(() => {
    props.setTags(value);
  }, [value])

  return (
    <Root>
      <div {...getRootProps()}>
        <InputWrapper ref={setAnchorEl} className={`${tagInputStyle.tagInput} ${focused ? 'focused' : ''}`}>
          {value.map((option, index) => (
            <StyledTag key={index} label={option.name} {...getTagProps({ index })} />
          ))}
          <input {...getInputProps()} />
        </InputWrapper>
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li key={index} {...getOptionProps({ option, index })}>
              <span>{option.name}</span>
              <CheckLg />
            </li>
          ))}
        </Listbox>
      ) : null}
    </Root>
  );
}


export default TagInput