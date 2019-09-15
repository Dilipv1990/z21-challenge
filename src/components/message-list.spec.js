import React from 'react';
import { shallow } from 'enzyme';
import MessageList from './message-list';
import toJson from 'enzyme-to-json';

const wrapper = shallow(<MessageList />);
describe('MessageList component test with Enzyme', () => {
   it('renders without crashing', () => {
    expect(wrapper.length).toBe(1);
   });

   it('contains CustomizedSnackbars component from material-ui', () => {
    const snackbar = wrapper.find('CustomizedSnackbars');
    expect(snackbar.length).toBe(1);
    let snackBarProps = snackbar.props();
    expect(Object.keys(snackBarProps).sort()).toEqual(['handleClose', 'message', 'open', 'variant']);

    });

});