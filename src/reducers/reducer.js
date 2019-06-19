export default function reducer (state = {}, action) {
  switch(action.type) {
    case "RECEIVE_DATA":
      return {
        ...state,
        data: action.data
    }

    case "CHANGE_NAME":
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
      }
    }
    default :
      return state
  }
}