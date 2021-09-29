const elBox = document.querySelector("#box");

// Pure function that returns the next state,
// given the current state and sent event
function transition(state, event) {
  console.log("in transition", state, event);
  switch (state) {
    // Add your state/event transitions here
    // to determine and return the next state
    case "inactive":
      switch (event) {
        case "CLICK":
          return "active";
        default:
          return state;
      }
    case "active":
      switch (event) {
        case "CLICK":
          return "inactive";
        default:
          return state;
      }
    case "inactive":
    case "active":
    default:
      return state;
  }
}

// creeate machine with object
const transitionMachine = {
  initial: "inactive",
  states: {
    inactive: {
      on: {
        CLICK: 'active'
      }
    },
    active: {
      on:{
        CLICK: 'inactive'
      }
    },
  },
};

const objectTransition = (state, event) => {
  console.log('objectTransition', state, event)
  return transitionMachine.states[state]?.on?.[event] || state;
};

// Keep track of your current state (switch)
//let currentState = transition("pending", "inactive");

let currentState = 'inactive';

function send(event) {
  console.log("send evenet", event);
  // Determine the next value of `currentState`
  //let nextState = transition(currentState, event) (switch);
  let nextState = objectTransition(currentState, event);
  console.log("send nextState", nextState);

  currentState = nextState;
  console.log("currentState in send", currentState);
  //return currentState = nextState;
  elBox.dataset.state = currentState;
}

window.send = send;

elBox.addEventListener("click", () => {
  send('CLICK');
});
