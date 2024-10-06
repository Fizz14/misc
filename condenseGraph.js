function removeNode(index, graph) {
    for(let i = 0; i < graph.length; i++) {
        // Remove the column from the matrix
        if(index >= graph[i].length) {
            console.log("Error: Invalid index for removeNode().");
        }
        graph[i].splice(index, 1);
    }
    // Remove the row from the matrix
    if(index >= graph.length) {
        console.log("Error: Invalid index for removeNode().");
    }
    graph.splice(index, 1);
}

function mergeNodes(index1, index2, graph) {
    if(index1 >= graph.length || index2 >= graph.length) {
        console.log("Error: Invalid index for mergeNodes().");
    }
    if(graph[index1][index2] <= 0) {
        console.log("Error: Tried to merge unconnected nodes.");
    }
    for(let i = 0; i < graph[index1].length; i++) {
        if(i != index1 && i != index2 && graph[index1][i] != 0) {
            // Update edges from node which will be removed
            if(graph[index2][i] == 0) {
                // This edge doesn't exist, copy it from the node to remove
                graph[index2][i] = graph[index1][i];
                graph[i][index2] = graph[index1][i];
            } else {
                // Both nodes have edges, so average them
                var average = (graph[index2][i] + graph[index1][i]) / 2;
                graph[index2][i] = average;
                graph[i][index2] = average;
            }
        }
    }
    removeNode(index1, graph);
}

function findSmallestEdge(graph) {
    var smallest = Number.MAX_SAFE_INTEGER;
    var node1 = -1;
    var node2 = -1;
    for(let i = 0; i < graph.length; i++) {
        for(let j = 0; j < graph[0].length; j++) {
            if(j == i) { continue; }
            // If the edge exists and is shorter than the shortest we've seen...
            if(graph[i][j] < smallest && graph[i][j] > 0) {
                // Update the shortest and continue execution
                smallest = graph[i][j];
                node1 = i;
                node2 = j;
            }
        }
    }
    if(node1 == -1 || node2 == -1) {
        console.log("Error: No edges found in graph.");
    }
    return [node1, node2];
}

function condenseGraph(graph, factor) {
    var removalSteps = Math.round(graph.length * factor);
    // Merge the closest nodes `removalSteps` times
    for(let i = 0; i < removalSteps; i++) {
        const [index1, index2] = findSmallestEdge(graph);
        mergeNodes(index1, index2, graph);
        for(let j = 0; j < graph.length; j++) {
            console.log(graph[j]);
        }
        console.log("");
    }
}
             
let graph = [[0,0,4,6,7],
             [0,0,0,0,9],
             [4,0,0,5,0],
             [6,0,5,0,1],
             [7,9,0,1,0]];

condenseGraph(graph, 0.3);

console.log(graph[0]);
console.log(graph[1]);
console.log(graph[2]);
console.log(graph[3]);
console.log(graph[4]);
console.log("");
