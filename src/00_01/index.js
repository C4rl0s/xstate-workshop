import { createMachine, interpret } from 'xstate';

//console.log('createMachine', createMachine);

/*
//With shorthad
const feedBackMAchine = createMachine({
  initial: 'question',
  states: {
    question: {
      on: {
        CLICK_GOOD: {
          // shorthand to form L:16
          target: 'thanks'
        },
      },
    },
    form: {},
    thanks: {},
    closed: {},
  }
});*/

const feedBackMAchine = createMachine({
  initial: 'question',
  states: {
    question: {
      on: {
        CLICK_GOOD: 'thanks',
        CLICK_BAD: 'form',
      },
    },
    form: {
      on: {
        SUBMIT: {
          target: 'thanks',
        }
      }
    },
    thanks: {
      on: {
        CLOSE: 'closed',
      }
    },
    closed: {
      type: 'final',
    },
  }
});
console.log('feedbackMachine', feedBackMAchine);
console.log('feedbackMachine initialState', feedBackMAchine.initialState);

//Event Transition slide
const clickGoodEvent = {
  type: 'CLICK_GOOD',
  time: Date.now(),
};

//Event transitions slide
const nextState = feedBackMAchine.transition(
  feedBackMAchine.initialState,
  clickGoodEvent,
);

console.log('nextState', nextState);

//Interpreting Machines & Creating services
//interpreter needs two arguments.
const feedBackService = interpret(feedBackMAchine);

feedBackService.onTransition(state => {
  //Current finate state value
  console.log(state.value);
}).start();

//give you the latest state
//seen as singletone
feedBackService.start();

//You cand send events trhough the service
feedBackService.send({
  type: 'CLCK_GOOD'
});

//If there is no payload, 
// only the event type is necessary
feedBackService.send('CLOSE');

// When the the service no longer needs to run
// stop it for dsposal/cleanup
feedBackService.stop();
console.log('feedbackService', feedBackService);