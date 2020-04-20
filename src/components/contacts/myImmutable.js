export const MyImmutableJS = {
  Map(obj) {
    const clonedObj = Object.freeze({...obj})

    if (typeof obj !== 'object' || obj === null) {
      return obj
    }

    let definedProps = {
      toJS: {value: () => ({...clonedObj})},
      toJSON: {value: () => ({...clonedObj})},
      toString: {value: () => clonedObj.toString()},
      size: {value: () => this.Map(Object.keys(clonedObj).length)},
      get: {value: (key) => clonedObj[key]},
      set: {value: (key, value) => {
          return this.Map({
            ...clonedObj,
            [key]: value,
          })
        },
      }
    }

    return Object.create(
      Object.getPrototypeOf(obj),
      definedProps
    )
  },
  List(array) {
    const clonedArray = [...array]

    const toJS = () => [...clonedArray]
    const deleteFromIndex = index => ([...clonedArray].slice(0, index).concat([...clonedArray].slice(index + 1, clonedArray.length)))
    const push = number => ([...clonedArray, number])
    const unshift = number => ([number, ...clonedArray])
    const shift = () => clonedArray.slice(1)
    const pop = () => clonedArray.slice(0, clonedArray.length - 1)
    const reverse = () => ([...clonedArray].reverse())
    const splice = (elmt) => {
      const indexOldElement = clonedArray.findIndex(({ id }) => id == elmt.id)
      return Object.assign([...clonedArray], {[indexOldElement]: elmt})
    }
    const update = (index, fct) => {
      const elmt = [...clonedArray]
        elmt[index] = fct(elmt[index])
      return this.List(elmt)
    }

    return {
      clonedArray,
      deleteFromIndex,
      splice,
      update,
      toJS,
      push,
      unshift,
      shift,
      pop,
      reverse
    }
  }
}