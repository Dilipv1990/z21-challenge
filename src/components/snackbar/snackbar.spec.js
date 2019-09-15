import React from 'react';
import { shallow } from 'enzyme';
import CustomizedSnackbars from './snackbar';
import toJson from 'enzyme-to-json';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

const props = {
  variant: 'error',
  message: 'err message',
  handleClose: jest.fn()
 };
 const wrapper = shallow(<CustomizedSnackbars {...props}/>);

describe('Customized Snackbar component test with Enzyme', () => {

   it('renders without crashing', () => {
     expect(toJson(wrapper)).toMatchSnapshot();
    });

  it('contains Snackbar component from material-ui', () => {
    const snackbar = wrapper.find(Snackbar);
    expect(snackbar.length).toBe(1);
    });

  it('contains SnackbarContent component from material-ui', () => {
    const snackbarContent = wrapper.find('MySnackbarContentWrapper');
    expect(snackbarContent.length).toBe(1);
    });
});