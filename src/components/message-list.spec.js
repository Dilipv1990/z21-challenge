import React from 'react';
import { shallow } from 'enzyme';
import MessageList from './message-list';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

const wrapper = shallow(<MessageList />);
const component = wrapper.instance();
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

    it('contains start and clear buttons', () => {
      const [startButton, clearButton, ...others] = wrapper.find(Button);

      expect(Object.keys(startButton.props).sort()).toEqual(['children','className', 'color', 'onClick', 'variant']);
      expect(Object.keys(clearButton.props).sort()).toEqual(['children','className', 'color', 'onClick', 'variant']);

      expect(startButton.props.children).toEqual('Stop Messages');
      expect(clearButton.props.children).toEqual('Clear');
      });

    it('contains AppBar from material-ui', () => {
      const appBar = wrapper.find(AppBar);
      expect(appBar.length).toBe(1);

      const heading = appBar.find(Typography);
      expect(heading.length).toBe(1);
      expect(heading.props().children).toBe('Help.com coding challenge')
    });

    it('verifies getMsgCount method', () => {
      let messages = [
        {
          message: 'error 1',
          priority: '1'
        }, {
          message: 'error 1',
          priority: '1'
        }, {
          message: 'info 1',
          priority: '3'
        }, {
          message: 'info 1',
          priority: '3'
        }, {
          message: 'info 1',
          priority: '3'
        }, {
          message: 'warn 1',
          priority: '2'
        }
      ];
      component.setState({
        messages
      })
      expect(component.getMsgCount('error')).toBe(2);
      expect(component.getMsgCount('info')).toBe(3);
      expect(component.getMsgCount('warning')).toBe(1);
    });
});