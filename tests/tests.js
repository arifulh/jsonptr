(function() {

  var obj =  {
      "foo": ["bar", "baz"],
      "": 0,
      "a/b": 1,
      "c%d": 2,
      "e^f": 3,
      "g|h": 4,
      "i\\j": 5,
      "k\"l": 6,
      " ": 7,
      "m~n": 8,
      "test": {
        "tfoo": ["tbar", "tbaz"],
        "a": "nothing",
        "0": "okay",
        "": "empty"
      }
   };

  console.assert(jsonptr(obj, "", 'whole document'))
  console.assert(jsonptr(obj, "/foo") == obj.foo)
  console.assert(jsonptr(obj, "/foo/0") == obj.foo[0] )
  console.assert(jsonptr(obj, "/") == 0)
  console.assert(jsonptr(obj, "/a~1b") == 1)
  console.assert(jsonptr(obj, "/c%d" ) == 2)
  console.assert(jsonptr(obj, "/e^f") ==  3)
  console.assert(jsonptr(obj, "/g|h" ) ==   4)
  console.assert(jsonptr(obj, "/i\\j" ) ==  5)
  console.assert(jsonptr(obj, "/k\"l" ) == 6)
  console.assert(jsonptr(obj, "/ " ) ==  7)
  console.assert(jsonptr(obj, "/m~0n") ==   8)

}());