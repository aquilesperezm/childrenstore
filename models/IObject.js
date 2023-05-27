class IObject {

    constructor() {

    }


    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
    }

    noRepeatDataUsers(targetList, valueToFind) {
        return targetList.find((value) => {
            return value.nombre_usuario == valueToFind
        })
    }

    paginate(arr, size) {
        return arr.reduce((acc, val, i) => {
            let idx = Math.floor(i / size)
            let page = acc[idx] || (acc[idx] = [])
            page.push(val)

            return acc
        }, [])
    }


}

module.exports = IObject