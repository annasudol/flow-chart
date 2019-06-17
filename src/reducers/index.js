export default function reducer (state = {}, action) {
  switch(action.type) {
    case "RECEIVE_DATA":
      return {
        ...state,
        data: action.data
    }

    case "CHANGE_NAME":
    // const node = {...state.data[action.graphId].nodes[action.nodeId]}
    // console.log(node['name'], 'g')
    return {
      ...state,
      data: {...state.data,
        [action.graphId] : {
          ...state.data[action.graphId],
          nodes: {
            ...state.data[action.graphId].nodes,
            [action.nodeId] : {
              ...state.data[action.graphId].nodes[action.nodeId],
              name: action.text
            }
          }
        }
        // ...state.data[action.graphId].nodes[action.nodeId],
        // state.data[action.graphId].nodes[action.nodeId] : action.text
  
        // ...state.data[action.graphId].nodes[action.nodeId] : {
        //   name: action.text
        // }

      }
        // ...state.data[action.graphId],
        // ...state.data[action.graphId].nodes[action.nodeId],
        // ...state.data[action.graphId].nodes[action.nodeId][name] : [action.text]
      }

    //  ...state.data[action.graphId].nodes[action.nodeId].name : [action.name]
    
    // case ADD_QUESTION :
    //   return {
    //     ...state,
    //     [action.question.id]: action.question,
    // }
    // case SAVE_ANSWER :
    //   const question = {...state[action.qid]};
    //   return {
    //     ...state,
    //     [action.qid]: {
    //       ...question,
    //       [action.answer]: {
    //         ...question[action.answer],
    //         votes: question[action.answer].votes.concat([action.authedUser])
    //       }
    //     }
    //   }

    default :
      return state
  }
}