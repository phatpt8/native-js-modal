(function () {

    function Stack() {
        this._items = [];
    }

    Object.assign(Stack.prototype, {
        push: function(element) {
            this._items.push(element);
        },
        pop: function() {
            return this._items.pop();
        },
        peek: function() {
            return this._items[this._items.length - 1];
        },
        isEmpty: function() {
            return this._items.length == 0;
        },
        clear: function() {
            this._items = [];
        },
        size: function() {
            return this._items.length;
        },
        print: function() {
            return this._items.toString();
        }
    })

    function Queue() {
        this._itens = [];
    }

    Object.assign(Queue.prototype, {
        enqueue: function(element) {
            this._items.push(element);
        },
        dequeue: function() {
            this._items.shift();
        },
        front: function() {
            return this._items[0];
        },
        isEmpty: function() {
            return this._items.length == 0;
        },
        size: function() {
            return this._items.length;
        },
        print: function() {
            return this._items.toString();
        }
    })

    function PriorityQueue() {
        this._items = [];
        this._queueElement = function QueueElement(element, priority) {
            this.element = element;
            this.priority = priority;
        }
    }

    Object.assign(PriorityQueue.prototype, {
        enqueue: function(element, priority) {
            var queueElement = new this._queueElement(element, priority);
            var added = false;
            for (var i = 0, len = this._items.length, item = this._items[i]; i < len;item = this._items[++i]) {
                if (queueElement.priority < item.priority) {
                    this._items.splice(i, 0, queueElement);
                    added = true;
                    break;
                }
            }
            if (!added) {
                this._items.push(queueElement);
            }
        },
        print: function() {
            console.log(this._items);
        }
    });

    Object.assign(Queue.prototype, {
        enqueue: function(element) {
            this._items.push(element);
        },
        dequeue: function() {
            this._items.shift();
        },
        front: function() {
            return this._items[0];
        },
        isEmpty: function() {
            return this._items.length == 0;
        },
        size: function() {
            return this._items.length;
        },
        print: function() {
            return this._items.toString();
        }
    });

    function BinaryTreeSearch() {
        this._root = null
    }

    Object.assign(BinaryTreeSearch.prototype, {
       add: function (value) {
           var node = {
               value: value,
               left: null,
               right: null
           }, current;

           if (this._root == null) {
               this._root = node;
           } else {
               current = this._root;

               while (true) {
                   if (value < current.value) {

                       if (current.left == null) {
                           current.left = node;
                           break;
                       } else {
                           current = current.left;
                       }
                   } else if (value > current.value) {

                       if (current.right == null) {
                           current.right = node;
                           break;
                       } else {
                           current = current.right;
                       }
                   } else {
                       break;
                   }
               }
           }
       },
        
        traverse: function (process) {
            
            function inOrder(node) {
                if (node) {

                    if (node.left != null) {
                        inOrder(node.left);
                    }

                    process.call(this, node);

                    if (node.right != null) {
                        inOrder(node.right);
                    }
                }
            }

            inOrder(this._root);
        }
    });

    function QuickSort(arr) {
        quick(arr, 0, arr.length - 1);
    }

    var quick = function(array, left, right) {
        var index; //{1}
        if (array.length > 1) {
            index = partition(array, left, right);
            if (left < index - 1) {
                quick(array, left, index - 1);
            }
            if (index < right) {
                quick(array, index, right);
            }
        }
    };

    var partition = function(array, left, right) {
        var pivot = array[Math.floor((right + left) / 2)],
            i = left,

            j = right;

        while (i <= j) {

            while (array[i] < pivot) {
                i++;
            }
            while (array[j] > pivot) {
                j--;
            }
            if (i <= j) {
                swap(array, i, j);
                i++;
                j--;
            }
        }
    };

    var swap = function (arr, idx1, idx2) {
        var s = arr[idx1];
        arr[idx1] = arr[idx2];
        arr[idx2] = s;
    };

    function arrSum(arr) {
        return arr.reduce(function fn(a, b) {
            if (Array.isArray(b)) {
                return b.reduce(fn, a);
            } else if (b === Math.round(b)) {
                return a + b;
            }

            return a;
        }, 0);
     }

    //BinaryGap
    // function solution(N) {
    //     // write your code in JavaScript (Node.js 6.4.0)
    //     var bnr = (+N).toString(2);
    //     console.log(bnr);
    //     var result = 0;
    //     for (var i=0,arr = bnr.split('1'),arrLen=arr.length,res=arr[i];i<arrLen;res=arr[++i]){
    //
    //         if (!!res && res.length > result) {
    //             result = res.length;
    //         }
    //     }
    //     console.log(result);
    //     return result;
    // }
    // solution(561892);

    // OddOccurrencesInArray
    // function solution(arr) {
    //     var counts = {};
    //     var result;
    //     arr = arr.sort(function (a, b) {
    //         return b > a;
    //     });
    //     arr.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
    //     for (k in counts) {
    //         if (counts[k] % 2 !== 0) {
    //             result = k
    //         }
    //     }
    //     return result
    // }
    // solution([9,3,9,3,9,7,9])

    //CyclicRotation
    // function solution(arr, idx) {
    //     if (arr.length <= idx) {
    //         idx = idx % arr.length;
    //     }
    //     var first = arr.splice(arr.length - idx, idx);
    //     first = first.concat(arr);
    //     return first;
    // }
    // solution([1, 1, 2, 3, 5], 42)

    //PermMissingElem -- check again
    // function solution(arr) {
    //     var res;
    //     arr = arr.sort();
    //     arr.sort(function (a, b) {
    //         if (a + 1 !== b) {
    //             res = a + 1
    //         }
    //     });
    //     return res
    // }
    // solution([])

    //FrogJmp
    // function solution(x, y, d) {
    //     if (x == y) return 0;
    //     if (x > y || x + d >= y) {
    //         return 1
    //     }
    //
    //     return Math.floor(((y - x) % d == 0) ? (y-x)/d : (y-x)/d + 1)
    // }
    // console.log(solution(10, 85, 30));

    //TapeEquilibrium
    // function sum(arr) {
    //     return arr.reduce(function (a, b) {
    //         return a + b
    //     }, 0)
    // }
    // function solution(arr) {
    //     if (arr.length < 2) {
    //         if (arr.length == 0) {
    //             return 0
    //         }
    //         if (arr.length == 1) {
    //             return arr[0]
    //         }
    //     }
    //     var res = [];
    //     for(var i = 1;i < arr.length; i++) {
    //         var first = arr.slice(0, i);
    //         var second = arr.slice(i, arr.length);
    //         var resultSum = Math.abs(sum(first) - sum(second));
    //         res.push(resultSum);
    //     }
    //     return Math.min.apply(null, res);
    // }
    // console.log(solution([3, 1, 2, 4, 3]));
    // better solution
    // function tapeEquilibrium(A) {
    //     var p, idx;
    //     var leftSum = 0, rightSum = 0;
    //     var totalSum = 0;
    //     var lastMin, currentMin;
    //     var N = A.length;
    //
    //     if (N == 2) { return Math.abs(A[0] - A[1]); }
    //     if (N == 1) { return Math.abs(A[0]); }
    //
    //     for (idx=0; idx < N; idx++) {
    //         totalSum = totalSum + A[idx];
    //     }
    //
    //     lastMin = Math.abs(totalSum - A[0] - A[0]);
    //
    //     for (p = 1; p <= N-1; p++) {
    //         leftSum += A[p - 1];
    //         rightSum = totalSum - leftSum;
    //         currentMin = Math.abs(leftSum - rightSum);
    //         lastMin = (currentMin < lastMin) ? currentMin : lastMin;
    //     }
    //
    //     return lastMin;
    // }

    //FrogRiverOne
    // function solution(x, arr) {
    //     var count = 0;
    //     var jumps = [];
    //     for(var i=0;i<arr.length;i++){
    //         if(arr[i] <= x && jumps[arr[i]] === undefined){
    //             jumps[arr[i]] = i;
    //             if(++count == x) return i;
    //         }
    //     }
    //
    //     return -1;
    // }
    // console.log(solution(5, [1,3,1,4,2,3,5,4]))

    //
    function solution() {

    }
    console.log(solution())
})();