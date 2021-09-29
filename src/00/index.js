import { createMachine } from 'xstate';

const elOutput = document.querySelector('#output');

function output(object) {
  elOutput.innerHTML = JSON.stringify(object, null, 2);
}

console.log('Welcome to the XState workshop!');

const user = {
  name: 'Roberto Martinez',
  company: 'Ancient/Dominion',
  interests: ['music', 'state machines'],
};

output(user);

const machine = {
  initial: "init",
  states: {
    init: {
      on: {
        FETCH: "pending",
      },
    },
    pending: {
      on: {
        RESOLVE: "resolved",
        REJECT: "rejected",
      },
    },
    resolved: {},
    rejected: {},
  },
};

const transition = (state, event) => {
  return machine.states[state]?.on?.[event] || state;
};

// track the current state (init)
let currentState = machine.initial;

// Receive events
const send = (event) => {

  // Determining the next state
  const nextState = transition(currentState, event);

  // Update the current state
  return currentState = nextState;
};

window.send = send;

// Sending an event
//send('CLICK');

//console.log('send fetch', send('FETCH'));