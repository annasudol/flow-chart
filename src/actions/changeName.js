export function changeName(text, nodeId, graphId) {
    return {
      type: "CHANGE_NAME",
      text,
      nodeId,
      graphId
    }
  }
  export default changeName