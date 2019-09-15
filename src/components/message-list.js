import Api from '../api'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button'
import CustomizedSnackbars from './snackbar/snackbar';
import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

const priorityToMessageVariant = {
  1: 'error',
  2: 'warning',
  3: 'info'
}
class MessageList extends Component {
  constructor(...args) {
    super(...args)
    this.state = {
      messages: [],
      openSnackBar: false,
      snackBarVariant: null,
      snackBarMessage: null
    }
  }

  api = new Api({
    messageCallback: (message) => {
      this.messageCallback(message)
    },
  })

  componentDidMount() {
    this.api.start()
  }

  getMsgCount(msgType) {
    return this.state.messages
      .filter(msg => priorityToMessageVariant[msg.priority] === msgType)
      .length;
  }

  messageCallback(message) {
    const { messages } = this.state
    this.setState({
      messages: [
        ...messages.slice(),
        message,
      ],
    }, () => {
      this.setState({
        openSnackBar: true,
        snackBarVariant: priorityToMessageVariant[message.priority],
        snackBarMessage: message.message
      })
    });
    
  }

  renderStartButton() {
    const isApiStarted = this.api.isStarted()
    return (
      <Button
        variant='contained'
        color='primary'
        onClick={() => {
          if (isApiStarted) {
            this.api.stop()
          } else {
            this.api.start()
          }
          this.setState({openSnackBar: true});
          this.forceUpdate()
        }}
        className='btn-action'
      >
        {isApiStarted ? 'Stop Messages' : 'Start Messages'}
      </Button>
    )
  }

  renderClearButton() {
    return (
      <Button
        variant="contained" 
        color="secondary"
        className='btn-action'
        onClick={() => {
          this.setState({
            messages: []
          })
        }}>
          Clear
      </Button>
    )
  }

  renderAppBar() {
    return (<AppBar position="static">
        <Typography variant="h6">
            Help.com coding challenge
        </Typography>
      </AppBar>);
  }

  render() {
    let {snackBarVariant, openSnackBar, snackBarMessage} = this.state;
    return (
      <div>
        {this.renderAppBar()}
        <div className='action-box'>
          {this.renderStartButton()}
          {this.renderClearButton()}
        </div>
        <Grid container spacing={3} justify="center" className='message-container'>
          {
            ['error', 'warning', 'info'].map((variant, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Typography variant='subtitle1'>
                  {
                    `${variant[0].toUpperCase()}${variant.substring(1)} Type 1`
                  }
                </Typography>
                <Typography variant='subtitle2'>
                  {
                    `Count ${this.getMsgCount(variant)}`
                  }
                </Typography>
                {
                  this.state.messages && this.state.messages
                    .filter(msg => priorityToMessageVariant[msg.priority] === variant)
                    .reverse()
                    .map((message, index) =>( 
                      <div key={index}>
                        <Grid container spacing={1} className={`msg-box ${priorityToMessageVariant[message.priority]}`}>
                          <Grid item xs={9}>
                            <Typography component='p'>
                              {
                                `${message.message}`
                              }
                            </Typography>
                          </Grid>
                          <Grid item xs={3}>
                            <Button onClick={
                              () => this.setState({
                                messages: this.state.messages.filter(msg => msg !== message)
                                })
                            }>
                              Clear
                            </Button>
                          </Grid>
                        </Grid>
                        
                      </div>)
                    )
                  }
              </Grid>
            ))
          } 
        </Grid>
        <CustomizedSnackbars
          variant={snackBarVariant}
          handleClose={() => this.setState({openSnackBar: false})} 
          open={openSnackBar}
          message={snackBarMessage}>

        </CustomizedSnackbars>
      </div>
    )
  }
}

export default MessageList
